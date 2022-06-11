package didentity.amos.digitalIdentity.services;

import java.io.File;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import didentity.amos.digitalIdentity.messages.answers.Accesstoken;
import didentity.amos.digitalIdentity.messages.responses.CreateConnectionResponse;

@Service
public class LissiApiService {

    private final RestTemplate restTemplate;

    @Value("${lissi.api.url}")
    private String baseUrl;

    @Value("${lissi.auth.url}")
    private String authentificationUrl;
    @Value("${lissi.auth.client.id}")
    private String clientID;
    @Value("${lissi.auth.client.secret}")
    private String clientSecret;

    public LissiApiService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    /**
     * Creates new connection and returns invitation url.
     */
    public String createConnectionInvitation(String alias) {
        String url = baseUrl + "/ctrl/api/v1.0/connections/create-invitation";

        // build headers
        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("Authorization", getOAuth2Authorization());
        headers.add("alias", alias);

        // build the request
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        // send POST request
        ResponseEntity<CreateConnectionResponse> response = this.restTemplate.postForEntity(url, entity,
                CreateConnectionResponse.class);

        // check response status code
        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody().getInvitationUrl();
        } else {
            return null;
        }
    }

    /**
     * Creates a new schema.
     *
     * @param attributes should be a String in form: ["attrib1", "attrib2"]
     */
    public boolean createSchema(String alias, String imageUri, String version, String attributes) {
        String baseUrl = "https://onboardingad.ddns.net";
        String endpoint = "/ctrl/api/v1.0/schemas/create";
        String url = baseUrl + endpoint;
        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = null;
        String response = "empty";
        HttpStatus httpStatus = HttpStatus.CREATED;

        // build headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.add("Authorization", getOAuth2Authorization());
        headers.add("alias", alias);

        // build body
        LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("alias", alias);
        body.add("imageUri", imageUri);
        body.add("version", version);
        body.add("attributes", attributes);

        // add file to body
        // This nested HttpEntiy is important to create the correct
        // Content-Disposition entry with metadata "name" and "filename"
        MultiValueMap<String, String> fileMap = new LinkedMultiValueMap<>();
        ContentDisposition contentDisposition = ContentDisposition.builder("form-data").name("image")
                .filename("dummy")
                .build();
        fileMap.add(HttpHeaders.CONTENT_DISPOSITION, contentDisposition.toString());
        try {

            // read image and write it into the body
            File file = new ClassPathResource("img/logo.png").getFile();
            byte[] content = Files.readAllBytes(file.toPath());
            HttpEntity<byte[]> fileEntity = new HttpEntity<>(content, fileMap);
            body.add("image", fileEntity);

            requestEntity = new HttpEntity<>(body, headers);
            response = restTemplate.postForObject(url, requestEntity, String.class);
        } catch (HttpStatusCodeException e) {
            httpStatus = HttpStatus.valueOf(e.getStatusCode().value());
            response = e.getResponseBodyAsString();
        } catch (Exception e) {
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            e.printStackTrace();
            response = e.getMessage();
        } finally {
            System.err.println(httpStatus);
            System.err.println("response: ");
            System.err.println(response);
        }
        return httpStatus.equals(HttpStatus.CREATED);
    }

    private String getOAuth2Authorization() {
        String bodyAsString = "grant_type=client_credentials&scope=openid"
                + "&client_id=" + clientID
                + "&client_secret=" + clientSecret;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

        HttpEntity<String> request = new HttpEntity<String>(bodyAsString, headers);

        ResponseEntity<Accesstoken> response = this.restTemplate.postForEntity(authentificationUrl, request,
                Accesstoken.class);

        String token = "Bearer " + response.getBody().getAccessToken();

        return token;
    }
}
