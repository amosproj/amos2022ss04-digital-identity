package didentity.amos.digitalIdentity.Services;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import didentity.amos.digitalIdentity.model.CreateConnectionResponse;

@Service
public class LissiApiService {
    
    private final RestTemplate restTemplate;

    public LissiApiService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    /**
	 * Creates new connection and returns invitation url.
	 */
    public String getConnection() {
        String baseUrl = "https://onboardingad.ddns.net";
        String endpoint = "/ctrl/api/v1.0/connections/create-invitation";
        String url = baseUrl + endpoint;

        ResponseEntity<CreateConnectionResponse> response = this.restTemplate.getForEntity(url, CreateConnectionResponse.class);

        if(response.getStatusCode() == HttpStatus.OK) {
            return response.getBody().getInvitationUrl();
        } else {
            return null;
        }
    }
}
