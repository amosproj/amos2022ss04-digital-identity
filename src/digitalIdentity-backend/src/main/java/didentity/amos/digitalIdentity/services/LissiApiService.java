package didentity.amos.digitalIdentity.services;

import java.io.File;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClientException;
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
    public CreateConnectionResponse createConnectionInvitation(String alias) throws RestClientException {
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
            return response.getBody();
        } else {
            return null;
        }
    }

    public String deleteConnectionInvitation(String alias) {
        // TODO:
        return "Deleted.";
    }

    /**
     * Creates a new schema and returns schema
     *
     * @param attributes should be a String in form: ["attrib1", "attrib2"]
     */
    @SuppressWarnings("unchecked") // TODO: if someone wants to bother with generic arrays, feel free :)
    public String createSchema(String alias, String imageUri, String version, String attributes, File file) {
        String url = baseUrl + "/ctrl/api/v1.0/schemas/create";

        // build headers
        HttpHeaders headers = httpService.createHttpHeader(MediaType.MULTIPART_FORM_DATA);

        // build body
        Pair<String, File>[] fileParams = zip("image", file);
        LinkedMultiValueMap<String, Object> body = httpService.createHttpBody(
                fileParams,
                Pair.of("alias", alias),
                Pair.of("imageUri", imageUri),
                Pair.of("version", version),
                Pair.of("attributes", attributes));
        if (body == null) {
            return null;
        }

        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        String response = "";
        try {
            response = restTemplate.postForObject(url, requestEntity, String.class);
        } catch (HttpStatusCodeException e) {
            logHttpException(response, e);
            return null;
        }
        return response;
    }

    @SuppressWarnings("unchecked") // TODO: if someone wants to bother with generic arrays, feel free :)
    public ResponseEntity<String> provideExistingSchemas(String activeState, String searchText) {
        String url = baseUrl + "/ctrl/api/v1.0/schemas";

        activeState = activeState != null ? activeState : "";
        searchText = searchText != null ? searchText : "";

        // build headers
        // build headers
        HttpHeaders headers = httpService.createHttpHeader(
                MediaType.APPLICATION_JSON,
                Collections.singletonList(MediaType.APPLICATION_JSON));

        LinkedMultiValueMap<String, Object> body = httpService.createHttpBody(
                Pair.of("activeState", activeState),
                Pair.of("searchText", searchText));

        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // send POST request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity,
                String.class);

        // check response status code
        if (response.getStatusCode() == HttpStatus.OK) {
            return response;
        } else {
            return null;
        }
    }

    @SuppressWarnings("unchecked") // TODO: if someone wants to bother with generic arrays, feel free :)
    public String createCredentialDefinition(String alias, String comment, String imageUri, String schemaId,
            File file, String revocable) {
        String url = baseUrl + "/ctrl/api/v1.0/credential-definitions/create";

        HttpHeaders headers = httpService.createHttpHeader(MediaType.MULTIPART_FORM_DATA);

        // build body
        Pair<String, File>[] fileParams = zip("image", file);
        LinkedMultiValueMap<String, Object> body = httpService.createHttpBody(
                fileParams,
                Pair.of("alias", alias),
                Pair.of("comment", comment),
                Pair.of("imageUri", imageUri),
                Pair.of("revocable", revocable),
                Pair.of("schemaId", schemaId));
        if (body == null) {
            return null;
        }

        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        String response = "";
        try {
            response = restTemplate.postForObject(url, requestEntity, String.class);
        } catch (HttpStatusCodeException e) {
            logHttpException(response, e);
            return null;
        }
        return response;
    }

    @SuppressWarnings("unchecked") // TODO: if someone wants to bother with generic arrays, feel free :)
    public ResponseEntity<String> provideExistingCredDefs(String activeState, String searchText) {
        String url = baseUrl + "/ctrl/api/v1.0/credential-definitions";
        
        activeState = activeState != null ? activeState : "";
        searchText = searchText != null ? searchText : "";
        
        // build headers
        // build headers
        HttpHeaders headers = httpService.createHttpHeader(
                MediaType.APPLICATION_JSON,
                Collections.singletonList(MediaType.APPLICATION_JSON));

        LinkedMultiValueMap<String, Object> body = httpService.createHttpBody(
                Pair.of("activeState", activeState),
                Pair.of("searchText", searchText));

        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // send POST request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity,
                String.class);

        // check response status code
        if (response.getStatusCode() == HttpStatus.OK) {
            return response;
        } else {
            return null;
        }
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

    private Pair<String, File>[] zip(String name, File file) {
        return zip(
                new String[] { name },
                new File[] { file });
    }

    /**
     * zip names and files to Pair<String, File>[]
     * usefull for parameterCreation
     */
    @SuppressWarnings("unchecked") // TODO: if someone wants to bother with generic arrays, feel free :)
    private Pair<String, File>[] zip(String[] names, File[] files) {
        if (names == null || files == null || names.length != files.length) {
            throw new IllegalArgumentException("neither of the following shall be passed to this function" +
                    "names == null   || files == null || names.length != files.length");
        }
        Pair<String, File>[] pairs = new Pair[names.length];
        for (int i = 0; i < pairs.length; i++) {
            pairs[i] = Pair.of(names[i], files[i]);
        }
        return pairs;
    }
}
