package didentity.amos.digitalIdentity.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.data.util.Pair;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
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

    /*
     * @returns authorized http header
     */
    public HttpHeaders createHttpHeader(MediaType contentType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(contentType);
        headers.add("Authorization", getOAuth2Authorization());

        return headers;
    }

    /*
     * @returns authorized http header
     */
    public HttpHeaders createHttpHeader(MediaType contentType, List<MediaType> accepted) {
        HttpHeaders headers = createHttpHeader(contentType);
        headers.setAccept(accepted);

        return headers;
    }

    /*
     * params should be an Pair<String,String>{paramName, paramValue}
     */
    public LinkedMultiValueMap<String, Object> createHttpBody(Pair<String, String>... params) {
        LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        for (Pair<String, String> param : params) {
            body.add(param.getFirst(), param.getSecond());
        }

        return body;
    }

    /*
     * params should be an Pair<String,String>{paramName, paramValue}
     * 
     * @returns null, if a file could not be read.
     */
    public LinkedMultiValueMap<String, Object> createHttpBody(Pair<String, File>[] fileParams,
            Pair<String, String>... params) {
        LinkedMultiValueMap<String, Object> body = createHttpBody(params);
        for (Pair<String, File> fileParam : fileParams) {
            String paramName = fileParam.getFirst();
            File file = fileParam.getSecond();

            // add file to body
            // This nested HttpEntiy is important to create the correct
            // Content-Disposition entry with metadata "name" and "filename"
            MultiValueMap<String, String> fileMap = new LinkedMultiValueMap<>();
            ContentDisposition contentDisposition = ContentDisposition.builder("form-data").name(paramName)
                    .filename("dummy")
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

            body.add(paramName, fileEntity);
        }

        return body;
    }

}