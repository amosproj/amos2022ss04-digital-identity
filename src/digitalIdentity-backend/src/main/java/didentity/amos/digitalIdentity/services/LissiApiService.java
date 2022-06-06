package didentity.amos.digitalIdentity.services;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.*;

import didentity.amos.digitalIdentity.messages.Accesstoken;
import didentity.amos.digitalIdentity.model.CreateConnectionResponse;

@Service
public class LissiApiService {

    private final RestTemplate restTemplate;

    @Value("${lissi.client.id}")
    private String clientID;
    @Value("${lissi.client.secret}")
    private String clientSecret;

    public LissiApiService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    /**
     * Creates new connection and returns invitation url.
     */
    public String createConnectionInvitation(String alias) {
        String baseUrl = "https://onboardingad.ddns.net";
        String endpoint = "/ctrl/api/v1.0/connections/create-invitation";
        String url = baseUrl + endpoint;

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

    private String getOAuth2Authorization() {
        String bodyAsString = "grant_type=client_credentials&scope=openid"
                + "&client_id=" + clientID
                + "&client_secret=" + clientSecret;
        String access_token_url = "https://onboardingad.ddns.net/auth/realms/lissi-cloud/protocol/openid-connect/token";

        Map<String, String> body = new HashMap<>();
        body.put("grant_type", "client_credentials");
        body.put("scope", "openid");
        body.put("client_id", clientID);
        body.put("client_secret", clientSecret);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

        HttpEntity<String> request = new HttpEntity<String>(bodyAsString, headers);

        ResponseEntity<Accesstoken> response = this.restTemplate.postForEntity(access_token_url, request,
                Accesstoken.class);

        String token = "Bearer " + response.getBody().getAccessToken();

        return token;
    }
}
