package didentity.amos.digitalIdentity.services;

import java.io.File;
import didentity.amos.digitalIdentity.messages.responses.CreateConnectionResponse;
import didentity.amos.digitalIdentity.model.ConnectionsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import didentity.amos.digitalIdentity.messages.responses.ConnectionsResponse;
import didentity.amos.digitalIdentity.messages.answers.credentials.CredentialInstanceAnswer;
import didentity.amos.digitalIdentity.messages.answers.credentials.PagedCredentialAnswer;
import didentity.amos.digitalIdentity.messages.answers.credentials.PagedCredentialLogAnswer;
import didentity.amos.digitalIdentity.messages.responses.CreateConnectionResponse;

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

        ResponseEntity<ConnectionsResponse> response = httpService.executeMediaRequest(url, HttpMethod.GET,
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

        ResponseEntity<CreateConnectionResponse> response = httpService.executeMediaRequest(url, HttpMethod.POST,
                CreateConnectionResponse.class,
                Pair.of("alias", alias));

        // check response status code
        return handleResponse(response);
    }

    public ResponseEntity<String> removeConnection(String connectionID, boolean removeCreds, boolean removeProofs) {
        String url = baseUrl + "/ctrl/api/v1.0/connections/" + connectionID + "/remove";

        ResponseEntity<String> response = httpService.executeMediaRequest(url, HttpMethod.POST,
                String.class,
                Pair.of("removeCreds", "false"),
                Pair.of("removeProofs", "false"));

        // check response status code
        return handleResponse(response);
    }

    /**
     * Creates a new schema and returns schema
     *
     * @param attributes should be a String in form: ["attrib1", "attrib2"]
     */
    public ResponseEntity<String> createSchema(String alias, String imageUri, String version, String attributes,
            File file) {
        String url = baseUrl + "/ctrl/api/v1.0/schemas/create";

        ResponseEntity<String> response = httpService.executeMediaRequest(url, HttpMethod.POST,
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

        ResponseEntity<String> response = httpService.executeMediaRequest(url, HttpMethod.GET, String.class,
                Pair.of("activeState", activeState),
                Pair.of("searchText", searchText));

        // check response status code
        return handleResponse(response);
    }

    public ResponseEntity<String> createCredentialDefinition(String alias, String comment, String imageUri,
    String schemaId, File file, String revocable) {
        String url = baseUrl + "/ctrl/api/v1.0/credential-definitions/create";
        String revocableS = "false";
        /*if(revocable){
            revocableS = "true";
        }*/

        ResponseEntity<String> response = httpService.executeMediaRequest(url, HttpMethod.POST, String.class,
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

        ResponseEntity<String> response = httpService.executeMediaRequest(url, HttpMethod.GET, String.class,
                Pair.of("activeState", activeState),
                Pair.of("searchText", searchText));

        // check response status code
        return handleResponse(response);
    }

    public ResponseEntity<PagedCredentialAnswer> getAllCredentials(String credentialDefinitionId, String page,
            String size) {
        String url = baseUrl + "/ctrl/api/v1.0/credentials";

        ResponseEntity<PagedCredentialAnswer> response = httpService.executeUriRequest(url, HttpMethod.GET,
                PagedCredentialAnswer.class,
                Pair.of("credDefId", credentialDefinitionId),
                Pair.of("page", page),
                Pair.of("size", size));
        return handleResponse(response);
    }

    public ResponseEntity<CredentialInstanceAnswer> getCredentialInstance(String id) {
        String url = baseUrl + "/ctrl/api/v1.0/credentials/" + id;

        ResponseEntity<CredentialInstanceAnswer> response = httpService.executeUriRequest(url, HttpMethod.GET,
                CredentialInstanceAnswer.class);

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

        // build body
        String body = "{\"connectionId\": \"" + connectionId + "\",\"credentialDefinitionId\": \""
                + credentialDefinitionId + "\",\"attributes\": " + attributes + "}";

        ResponseEntity<String> response = httpService.executeJsonRequest(url, HttpMethod.POST, String.class,
                body);

        // check response status code
        return handleResponse(response);
    }

    public ResponseEntity<PagedCredentialLogAnswer> getCredentialLog(String credDefId, String connectionSearchText,
            String page, String size) {
        String url = baseUrl + "/ctrl/api/v1.0/credentials/log";

        ResponseEntity<PagedCredentialLogAnswer> response = httpService.executeUriRequest(url, HttpMethod.GET,
                PagedCredentialLogAnswer.class,
                Pair.of("credDefId", credDefId),
                Pair.of("connectionSearchText", connectionSearchText),
                Pair.of("page", page),
                Pair.of("size", size));

        return handleResponse(response);
    }

    // proof templates:

    public ResponseEntity<String> createProofTemplate(String name, String version, String imageUrl,
            File file) {
        String url = baseUrl + "/ctrl/api/v1.0/proof-templates/create";

        ResponseEntity<String> response = httpService.executeMediaRequest(url, HttpMethod.GET, String.class,
                Pair.of("name", name),
                Pair.of("version", version),
                Pair.of("imageUrl", imageUrl),
                Pair.of("file", file));

        // check response status code
        return handleResponse(response);
    }

    public ResponseEntity<String> provideExistingProofTemplates(String activeState, String searchText) {
        String url = baseUrl + "/ctrl/api/v1.0/proof-templates";

        activeState = activeState != null ? activeState : "";
        searchText = searchText != null ? searchText : "";

        ResponseEntity<String> response = httpService.executeUriRequest(url, HttpMethod.GET, String.class,
                Pair.of("activeState", activeState),
                Pair.of("searchText", searchText));

        // check response status code
        return handleResponse(response);
    }

    public ResponseEntity<String> sendProofTemplateToConnection(String connectionId, String proofTemplateId) {
        String url = baseUrl + "/ctrl/api/v1.0/presentation-proof/send";

        ResponseEntity<String> response = httpService.executeUriRequest(url, HttpMethod.POST, String.class,
                Pair.of("connectionId", connectionId),
                Pair.of("proofTemplateId", proofTemplateId));

        // check response status code
        return handleResponse(response);
    }

    private <T> ResponseEntity<T> handleResponse(ResponseEntity<T> response) {
        if (response == null || response.getStatusCode().is2xxSuccessful() == false) {
            return null;
        } else {
            return response;
        }
    }

}
