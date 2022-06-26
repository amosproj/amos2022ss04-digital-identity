package didentity.amos.digitalIdentity.services;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import didentity.amos.digitalIdentity.messages.responses.CreateConnectionResponse;
import didentity.amos.digitalIdentity.model.ConnectionsResponse;

@Service
@SuppressWarnings("unchecked") // TODO: if someone wants to bother with generic arrays, feel free :)
public class LissiApiService {

    @Autowired
    private HttpService httpService;

    @Value("${lissi.api.url}")
    private String baseUrl;

    /**
     * Creates new connection and returns invitation url.
     */
    public ResponseEntity<ConnectionsResponse> provideExistingConnections() {
        String url = baseUrl + "/ctrl/api/v1.0/connections";

        ResponseEntity<ConnectionsResponse> response = httpService.executeRequest(url, HttpMethod.GET,
                ConnectionsResponse.class);

        // check response status code
        return handleResponse(response);
    }

    /**
     * Creates new connection and returns invitation url.
     */
    public ResponseEntity<CreateConnectionResponse> createConnectionInvitation(String alias)
            throws RestClientException {
        String url = baseUrl + "/ctrl/api/v1.0/connections/create-invitation";

        ResponseEntity<CreateConnectionResponse> response = httpService.executeRequest(url, HttpMethod.POST,
                CreateConnectionResponse.class);

        // check response status code
        return handleResponse(response);
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
    public ResponseEntity<String> createSchema(String alias, String imageUri, String version, String attributes,
            File file) {
        String url = baseUrl + "/ctrl/api/v1.0/schemas/create";

        ResponseEntity<String> response = httpService.executeRequest(url, HttpMethod.POST,
                String.class,
                Pair.of("image", file),
                Pair.of("alias", alias),
                Pair.of("imageUri", imageUri),
                Pair.of("version", version),
                Pair.of("attributes", attributes));

        // check response status code
        return handleResponse(response);
    }

    public ResponseEntity<String> provideExistingSchemas(String activeState, String searchText) {
        String url = baseUrl + "/ctrl/api/v1.0/schemas";

        activeState = activeState != null ? activeState : "";
        searchText = searchText != null ? searchText : "";

        // build headers
        // build headers

        ResponseEntity<String> response = httpService.executeRequest(url, HttpMethod.GET, String.class,
                Pair.of("activeState", activeState),
                Pair.of("searchText", searchText));

        // check response status code
        return handleResponse(response);
    }

    public ResponseEntity<String> createCredentialDefinition(String alias, String comment, String imageUri,
            String schemaId,
            File file, String revocable) {
        String url = baseUrl + "/ctrl/api/v1.0/credential-definitions/create";

        ResponseEntity<String> response = httpService.executeRequest(url, HttpMethod.POST, String.class,
                Pair.of("image", file),
                Pair.of("alias", alias),
                Pair.of("comment", comment),
                Pair.of("imageUri", imageUri),
                Pair.of("revocable", revocable),
                Pair.of("schemaId", schemaId));

        // check response status code
        return handleResponse(response);
    }

    public ResponseEntity<String> provideExistingCredDefs(String activeState, String searchText) {
        String url = baseUrl + "/ctrl/api/v1.0/credential-definitions";

        activeState = activeState != null ? activeState : "";
        searchText = searchText != null ? searchText : "";

        ResponseEntity<String> response = httpService.executeRequest(url, HttpMethod.GET, String.class,
                Pair.of("activeState", activeState),
                Pair.of("searchText", searchText));

        // check response status code
        return handleResponse(response);
    }

    /**
     * 
     * Issue a credential to an existing connection
     * 
     * @param connectionId           connectionId of existing connection
     * @param credentialDefinitionId credentialDefinitionId of existing credential
     * @param attributes             in form: [{\"name\": \"Name\",\"value\":
     *                               \"Max\"},{\"name\": \"Wohnort\",\"value\":
     *                               \"Berlin\"}]
     * @return response
     */
    public ResponseEntity<String> issueCredential(String connectionId, String credentialDefinitionId,
            String attributes) {
        String url = baseUrl + "/ctrl/api/v1.0/credentials/issue";

        ResponseEntity<String> response = httpService.executeRequest(url, HttpMethod.GET, String.class,
                Pair.of("connectionId", connectionId),
                Pair.of("credentialDefinitionId", credentialDefinitionId),
                Pair.of("attributes", attributes));

        // check response status code
        return handleResponse(response);
    }

    public <T> ResponseEntity<T> handleResponse(ResponseEntity<T> response) {
        if (response == null || response.getStatusCode().is2xxSuccessful() == false) {
            return null;
        } else {
            return response;
        }
    }
}
