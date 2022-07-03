package didentity.amos.digitalIdentity.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.data.util.Pair;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import didentity.amos.digitalIdentity.messages.answers.Accesstoken;

/**
 * Helps creating headers and bodys
 */
@Service
public class HttpService {

    private final RestTemplate restTemplate;

    public HttpService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Value("${lissi.auth.url}")
    private String authenticationUrl;
    @Value("${lissi.auth.client.id}")
    private String clientID;
    @Value("${lissi.auth.client.secret}")
    private String clientSecret;

    private String getOAuth2Authorization() {
        String bodyAsString = "grant_type=client_credentials&scope=openid"
                + "&client_id=" + clientID
                + "&client_secret=" + clientSecret;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

        HttpEntity<String> request = new HttpEntity<String>(bodyAsString, headers);

        ResponseEntity<Accesstoken> response = this.restTemplate.postForEntity(authenticationUrl, request,
                Accesstoken.class);

        String token = "Bearer " + response.getBody().getAccessToken();

        return token;
    }

    public <T> ResponseEntity<T> executeMediaRequest(String url, HttpMethod method, Class<T> responseType,
            Pair<String, Object>... params) {
        // logging
        System.out.println("--");
        System.out.println("Sending request to:\t" + method + " " + url);
        System.out.println("responseType:\t\t" + responseType);
        System.out.println("With params:\t\t " + Arrays.toString(params));
        // bulild header
        HttpHeaders headers = createDefaultHttpHeader(MediaType.MULTIPART_FORM_DATA);

        // build body
        LinkedMultiValueMap<String, Object> body = createHttpBody(params);

        // build requestEntity
        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // execute
        ResponseEntity<T> response = null;
        try {
            response = restTemplate.exchange(url, method, requestEntity,
                    responseType);
        } catch (RestClientException e) {
            e.printStackTrace();
            return null;
        }
        // log response
        System.out.println("<<");
        System.out.println("Response:\t" + response.getStatusCodeValue() + " - " + response.getStatusCode());
        System.out.println("Response body:" + response.getBody());
        return response;
    }

    public <T> ResponseEntity<T> executeJsonRequest(String url, HttpMethod method, Class<T> responseType, String json) {
        // logging
        System.out.println("--");
        System.out.println("Sending request to:\t" + method + " " + url);
        System.out.println("responseType:\t\t" + responseType);
        System.out.println("With body:\t\t " + json);

        // bulild header
        HttpHeaders headers = createDefaultHttpHeader(MediaType.APPLICATION_JSON);

        String body = json;

        // build requestEntity
        HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);

        // execute
        ResponseEntity<T> response = null;
        try {
            response = restTemplate.exchange(url, method, requestEntity,
                    responseType);
        } catch (RestClientException e) {
            e.printStackTrace();
            return null;
        }

        // log response
        System.out.println("<<");
        System.out.println("Response:\t" + response.getStatusCodeValue() + " - " + response.getStatusCode());
        System.out.println("Response body:" + response.getBody());
        return response;
    }

    public <T> ResponseEntity<T> executeUriRequest(String url, HttpMethod method, Class<T> responseType,
            Pair<String, String>... params) {
        char prefix = '?';
        for (Pair<String, String> param : params) {
            url += prefix + param.getFirst() + "=" + param.getSecond();
            prefix = '&';
        }

        // logging
        System.out.println("--");
        System.out.println("Sending request to:\t" + method + " " + url);
        System.out.println("responseType:\t\t" + responseType);

        // bulild header
        HttpHeaders headers = createDefaultHttpHeader();

        // build requestEntity
        HttpEntity<String> requestEntity = new HttpEntity<>(null, headers);

        // execute
        ResponseEntity<T> response = null;
        try {
            response = restTemplate.exchange(url, method, requestEntity,
                    responseType);
        } catch (RestClientException e) {
            e.printStackTrace();
            return null;
        }

        // log response
        System.out.println("<<");
        System.out.println("Response:\t" + response.getStatusCodeValue() + " - " + response.getStatusCode());
        System.out.println("Response body:" + response.getBody());
        return response;
    }

    /**
     * @returns authorized http header with contentType MULTIPART_FORM_DATA and
     *          accepting APPLICATION_JSON
     */
    private HttpHeaders createDefaultHttpHeader(MediaType mediaType) {
        HttpHeaders headers = createDefaultHttpHeader();
        headers.setContentType(mediaType);
        return headers;
    }

    /**
     * @returns authorized http header accepting APPLICATION_JSON
     */
    private HttpHeaders createDefaultHttpHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("Authorization", getOAuth2Authorization());

        return headers;
    }

    private LinkedMultiValueMap<String, Object> createHttpBody(Pair<String, Object>[] params) {
        LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        for (Pair<String, Object> param : params) {
            String key = param.getFirst();
            Object value;

            if (param.getSecond() instanceof String) {
                value = param.getSecond();
            } else if (param.getSecond() instanceof File) {
                try {
                    File file = (File) param.getSecond();
                    value = buildFileEntity(key, file);
                } catch (IOException e) {
                    e.printStackTrace();
                    return null;
                }
            } else {
                throw new IllegalArgumentException("Object of " + param.getSecond()
                        + " is not supported within a request body. Only Strings and Files are supported");
            }

            body.add(key, value);
        }
        return body;
    }

    private HttpEntity<byte[]> buildFileEntity(String paramName, File file) throws IOException {
        // create an object to add a file to a http body
        // This nested HttpEntiy is important to create the correct
        // Content-Disposition entry with metadata "name" and "filename"
        MultiValueMap<String, String> fileMap = new LinkedMultiValueMap<>();
        ContentDisposition contentDisposition = ContentDisposition.builder("form-data").name(paramName)
                .filename("filename-" + paramName)
                .build();
        fileMap.add(HttpHeaders.CONTENT_DISPOSITION, contentDisposition.toString());

        // read image and write it into the body
        byte[] content;
        try {
            content = Files.readAllBytes(file.toPath());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        HttpEntity<byte[]> fileEntity = new HttpEntity<>(content, fileMap);
        return fileEntity;
    }
}