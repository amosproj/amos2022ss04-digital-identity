package didentity.amos.digitalIdentity.services;

import java.io.File;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.data.util.Pair;
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

import didentity.amos.digitalIdentity.messages.responses.CreateConnectionResponse;

@Service
public class LissiApiService {

    private final RestTemplate restTemplate;

    @Autowired
    private HttpService httpService;

    @Value("${lissi.api.url}")
    private String baseUrl;

    public LissiApiService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    /**
     * Creates new connection and returns invitation url.
     */
    public String createConnectionInvitation(String alias) {
        String url = baseUrl + "/ctrl/api/v1.0/connections/create-invitation";

        // build headers
        HttpHeaders headers = httpService.createHttpHeader(
                MediaType.APPLICATION_JSON,
                Collections.singletonList(MediaType.APPLICATION_JSON));

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
    @SuppressWarnings("unchecked") // TODO: if someone wants to bother with generic arrays, feel free :)
    public boolean createSchema(String alias, String imageUri, String version, String attributes, File file) {

        String baseUrl = "https://onboardingad.ddns.net";
        String endpoint = "/ctrl/api/v1.0/schemas/create";
        String url = baseUrl + endpoint;

        // build headers
        HttpHeaders headers = httpService.createHttpHeader(MediaType.MULTIPART_FORM_DATA);

        // build body
        Pair<String, File>[] fileParams = new Pair[] { Pair.of("image", file) };
        LinkedMultiValueMap<String, Object> body = httpService.createHttpBody(
                fileParams,
                Pair.of("alias", alias),
                Pair.of("imageUri", imageUri),
                Pair.of("version", version),
                Pair.of("attributes", attributes));
        if (body == null) {
            return false;
        }

        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        String response = "";
        try {
            response = restTemplate.postForObject(url, requestEntity, String.class);
        } catch (HttpStatusCodeException e) {
            logHttpException(response, e);
            return e.getStatusCode().equals(HttpStatus.CREATED);
        }
        return true;
    }

    public boolean createCredential(String alias, String comment, String imageUri, String schemaId) {
        String url = baseUrl + "/ctrl/api/v1.0/credential-definitions/create";
        String revocable = "false";

        HttpHeaders headers = httpService.createHttpHeader(MediaType.MULTIPART_FORM_DATA);

        // build body
        LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("alias", alias);
        body.add("comment", comment);
        body.add("imageUri", imageUri);
        body.add("revocable", revocable);
        body.add("schemaId", schemaId);

        // add file to body
        // This nested HttpEntiy is important to create the correct
        // Content-Disposition entry with metadata "name" and "filename"
        MultiValueMap<String, String> fileMap = new LinkedMultiValueMap<>();
        ContentDisposition contentDisposition = ContentDisposition.builder("form-data").name("image")
                .filename("dummy")
                .build();
        fileMap.add(HttpHeaders.CONTENT_DISPOSITION, contentDisposition.toString());

        return false;
    }

    /**
     * Handles logging in case of a HttpStatusCodeException
     * 
     * @param response
     * @param e
     */
    private void logHttpException(String response, HttpStatusCodeException e) {
        e.printStackTrace();
        HttpStatus httpStatus = HttpStatus.valueOf(e.getStatusCode().value());
        response = e.getResponseBodyAsString();
        System.err.println(httpStatus);
        System.err.println("response: ");
        System.err.println(response);
    }
}
