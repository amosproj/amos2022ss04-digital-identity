# Lissi API

## General

- Issue [#28](https://github.com/amosproj/amos2022ss04-digital-identity/issues/28)

## Useful links

[FrontEnd for Lissi](https://onboardingad.ddns.net/)

[Swagger URL](http://18.198.19.241:9080/ctrl/v2/api-docs?group=lissi-cloud-api-all)

[Swagger Editor](https://editor.swagger.io)

[API Doc from Lissi](https://lissi-docs.azurewebsites.net/api-explanation/)

[KeyCloak Identity Provider](http://18.198.19.241:8080/auth/) (For the Authenticating in Lissi Backend using OAuth 2.0)

## Postman

Postman is a possible tool to trigger the endpoints.

<img width="1212" alt="Auth Config and curling endpoints" src="https://user-images.githubusercontent.com/93184461/169884903-27faf624-1309-4e78-b7c3-2e35ef48eb52.png">

Postman is an API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs—faster.

## Generating a QR-Code

In the connections-controller there is an endpoint ["POST /ctrl/api/v1.0/connections/create-invitation"](#post-ctrlapiv10connectionscreate-invitation), which returns an "invitationUrl": "string". This invitationURL can be transformed to a QR-Code.

## Endpoints we will likely need

### connections-controller

POST /ctrl/api/v1.0/connections/create-invitation

POST /ctrl/api/v1.0/connections/accept-invitation

GET /ctrl/api/v1.0/connections

GET /ctrl/api/v1.0/connections/{id}

### common-controller

GET /ctrl/api/v1.0/common/dashboard

### credential-definitions-controller

GET /ctrl/api/v1.0/credentials

GET /ctrl/api/v1.0/credentials/{id}

### credential-definitions-controller

GET /ctrl/api/v1.0/credential-definitions

POST /ctrl/api/v1.0/credential-definitions/create

POST /ctrl/api/v1.0/credential-definitions/delete

GET /ctrl/api/v1.0/credential-definitions/{id}

### credential controller

GET /ctrl/api/v1.0/credentials

GET /ctrl/api/v1.0/credentials/{id}

POST /ctrl/api/v1.0/credentials/delete

### schemas-controller

GET /ctrl/api/v1.0/schemas

POST /ctrl/api/v1.0/schemas/create

POST /ctrl/api/v1.0/schemas/delete

GET /ctrl/api/v1.0/schemas/{id}

## Definition of endpoints

### connections-controller

Operations about agent-to-agent connections

#### POST /ctrl/api/v1.0/connections/create-invitation

Create a new connection invitation. Returns a connection invitation with an invitation_url.

```json
{
  "alias": "string",
  "connectionId": "string",
  "invitation": {
    "@id": "string",
    "@type": "string",
    "did": "string",
    "imageUrl": "string",
    "label": "string",
    "recipientKeys": ["string"],
    "routingKeys": ["string"],
    "serviceEndpoint": "string"
  },
  "invitationUrl": "string"
}
```

#### POST /ctrl/api/v1.0/connections/accept-invitation

Accepts an incoming connection invitation from a third-party agent.

```json
{
  "alias": "string",
  "connectionId": "string",
  "invitation": {
    "@id": "string",
    "@type": "string",
    "did": "string",
    "imageUrl": "string",
    "label": "string",
    "recipientKeys": ["string"],
    "routingKeys": ["string"],
    "serviceEndpoint": "string"
  },
  "invitationUrl": "string"
}
```

#### GET /ctrl/api/v1.0/connections

Queries agent-to-agent connections with the given optional parameters

```json
{
  "content": [
    {
      "accept": "string",
      "alias": "string",
      "createdAt": "string",
      "id": "string",
      "imageUri": "string",
      "myDid": "string",
      "myLabel": "string",
      "state": "COMPLETED",
      "theirDid": "string",
      "theirLabel": "string",
      "theirRole": "INVITEE",
      "updatedAt": "string"
    }
  ],
  "number": 0,
  "size": 0,
  "totalElements": 0,
  "totalPages": 0
}
```

#### GET /ctrl/api/v1.0/connections/{id}

Returns details of agent-to-agent connection

```json
{
  "accept": "string",
  "alias": "string",
  "createdAt": "string",
  "id": "string",
  "imageUri": "string",
  "myDid": "string",
  "myLabel": "string",
  "state": "COMPLETED",
  "theirDid": "string",
  "theirLabel": "string",
  "theirRole": "INVITEE",
  "updatedAt": "string"
}
```

### common-controller

Operations to get common data

#### GET /ctrl/api/v1.0/common/dashboard

Returns the dashboard data (summary of connections and credentials)

```json
{
  "connections": {
    "countAll": 0,
    "countCompleted": 0,
    "countInvited": 0,
    "countRequested": 0,
    "countResponded": 0,
    "pendingConnections": [
      {
        "accept": "string",
        "alias": "string",
        "createdAt": "string",
        "id": "string",
        "imageUri": "string",
        "myDid": "string",
        "myLabel": "string",
        "state": "COMPLETED",
        "theirDid": "string",
        "theirLabel": "string",
        "theirRole": "INVITEE",
        "updatedAt": "string"
      }
    ]
  },
  "credentials": {
    "countIssued": 0,
    "pendingCredentialIssuances": [
      {
        "connectionAlias": "string",
        "connectionId": "string",
        "connectionImageUri": "string",
        "connectionTheirLabel": "string",
        "createdAt": "string",
        "credDefActive": true,
        "credDefAlias": "string",
        "credDefId": "string",
        "credDefImageUri": "string",
        "id": "string",
        "schemaId": "string",
        "state": "CREDENTIAL_ISSUED",
        "updatedAt": "string"
      }
    ]
  },
  "proofs": {
    "countProofsReceived": 0,
    "pendingProofs": [
      {
        "connectionAlias": "string",
        "connectionId": "string",
        "connectionImageUri": "string",
        "connectionTheirLabel": "string",
        "createdAt": "string",
        "deviceBindingVerificationStatus": "FAILED",
        "deviceBindingVerified": true,
        "exchangeId": "string",
        "indyVerified": true,
        "state": "PRESENTATION_RECEIVED",
        "templateActive": true,
        "templateId": "string",
        "templateImageUrl": "string",
        "templateName": "string",
        "updatedAt": "string",
        "verified": true
      }
    ]
  }
}
```

### credential-definitions-controller

Operations about the issuance or revocation of credentials

#### GET /ctrl/api/v1.0/credentials

Queries agent-to-agent credentials with the given parameters

```json
{
  "content": [
    {
      "connectionAlias": "string",
      "connectionId": "string",
      "connectionImageUri": "string",
      "connectionTheirLabel": "string",
      "createdAt": "string",
      "credDefActive": true,
      "credDefAlias": "string",
      "credDefId": "string",
      "credDefImageUri": "string",
      "id": "string",
      "schemaId": "string",
      "state": "CREDENTIAL_ISSUED",
      "updatedAt": "string"
    }
  ],
  "number": 0,
  "size": 0,
  "totalElements": 0,
  "totalPages": 0
}
```

#### GET /ctrl/api/v1.0/credentials/{id}

Queries agent-to-agent credential details with the given id

```json
{
  "attributes": [
    {
      "name": "string",
      "value": "string"
    }
  ],
  "issuance": {
    "connectionAlias": "string",
    "connectionId": "string",
    "connectionImageUri": "string",
    "connectionTheirLabel": "string",
    "createdAt": "string",
    "credDefActive": true,
    "credDefAlias": "string",
    "credDefId": "string",
    "credDefImageUri": "string",
    "id": "string",
    "schemaId": "string",
    "state": "CREDENTIAL_ISSUED",
    "updatedAt": "string"
  }
}
```

### credential-definitions-controller

Operations about credential definition

#### GET /ctrl/api/v1.0/credential-definitions

Returns a list of the stored credential definitions

```json
[
  {
    "active": true,
    "alias": "string",
    "comment": "string",
    "id": "string",
    "imageUri": "string",
    "imported": true,
    "revocable": true,
    "schemaId": "string",
    "version": "string"
  }
]
```

#### POST /ctrl/api/v1.0/credential-definitions/create

creates a new credential definition and writes it to the ledger

```json
{
  "active": true,
  "alias": "string",
  "comment": "string",
  "id": "string",
  "imageUri": "string",
  "imported": true,
  "revocable": true,
  "schemaId": "string",
  "version": "string"
}
```

#### POST /ctrl/api/v1.0/credential-definitions/delete

deletes a given credential definition by ID from the DB

Required parameter: id

#### GET /ctrl/api/v1.0/credential-definitions/{id}

Returns the details of a schema definition with the given ID

```json
{
  "credentialDefinition": {
    "active": true,
    "alias": "string",
    "comment": "string",
    "id": "string",
    "imageUri": "string",
    "imported": true,
    "revocable": true,
    "schemaId": "string",
    "version": "string"
  },
  "dependentProofTemplates": [
    {
      "active": true,
      "imageUrl": "string",
      "name": "string",
      "requestedAttributes": {
        "additionalProp1": {
          "attributeNames": [
            {
              "attributeName": "string"
            }
          ],
          "revocationFilterTimes": {
            "endTime": 0,
            "startTime": 0
          },
          "revocationFilterType": "CURRENT"
        },
        "additionalProp2": {
          "attributeNames": [
            {
              "attributeName": "string"
            }
          ],
          "revocationFilterTimes": {
            "endTime": 0,
            "startTime": 0
          },
          "revocationFilterType": "CURRENT"
        },
        "additionalProp3": {
          "attributeNames": [
            {
              "attributeName": "string"
            }
          ],
          "revocationFilterTimes": {
            "endTime": 0,
            "startTime": 0
          },
          "revocationFilterType": "CURRENT"
        }
      },
      "requestedPredicates": {
        "additionalProp1": [
          {
            "predicateName": "string",
            "predicateType": "string",
            "predicateValue": 0
          }
        ],
        "additionalProp2": [
          {
            "predicateName": "string",
            "predicateType": "string",
            "predicateValue": 0
          }
        ],
        "additionalProp3": [
          {
            "predicateName": "string",
            "predicateType": "string",
            "predicateValue": 0
          }
        ]
      },
      "requestedSelfAttestedAttributes": [
        {
          "attributeName": "string"
        }
      ],
      "revocationFilterTimes": {
        "endTime": 0,
        "startTime": 0
      },
      "revocationFilterType": "CURRENT",
      "templateId": "string",
      "timestamp": "string",
      "version": "string"
    }
  ],
  "schema": {
    "active": true,
    "alias": "string",
    "attributes": ["string"],
    "id": "string",
    "imageUri": "string",
    "imported": true,
    "timestamp": "string",
    "version": "string"
  }
}
```

### credential controller

Operations about the issuance or revocation of credentials

#### GET /ctrl/api/v1.0/credentials

Queries agent-to-agent credentials with the given parameters

```json
{
  "content": [
    {
      "connectionAlias": "string",
      "connectionId": "string",
      "connectionImageUri": "string",
      "connectionTheirLabel": "string",
      "createdAt": "string",
      "credDefActive": true,
      "credDefAlias": "string",
      "credDefId": "string",
      "credDefImageUri": "string",
      "id": "string",
      "schemaId": "string",
      "state": "CREDENTIAL_ISSUED",
      "updatedAt": "string"
    }
  ],
  "number": 0,
  "size": 0,
  "totalElements": 0,
  "totalPages": 0
}
```

#### GET /ctrl/api/v1.0/credentials/{id}

Queries agent-to-agent credential details with the given id

```json
{
  "attributes": [
    {
      "name": "string",
      "value": "string"
    }
  ],
  "issuance": {
    "connectionAlias": "string",
    "connectionId": "string",
    "connectionImageUri": "string",
    "connectionTheirLabel": "string",
    "createdAt": "string",
    "credDefActive": true,
    "credDefAlias": "string",
    "credDefId": "string",
    "credDefImageUri": "string",
    "id": "string",
    "schemaId": "string",
    "state": "CREDENTIAL_ISSUED",
    "updatedAt": "string"
  }
}
```

#### POST /ctrl/api/v1.0/credentials/delete

Revoke and delete a credential exchange record from the wallet

Required parameter: id

### schemas-controller

#### GET /ctrl/api/v1.0/schemas

Returns a list of the stored schema definitions

```json
[
  {
    "active": true,
    "alias": "string",
    "attributes": ["string"],
    "id": "string",
    "imageUri": "string",
    "imported": true,
    "timestamp": "string",
    "version": "string"
  }
]
```

#### POST /ctrl/api/v1.0/schemas/create

creates a new schema and writes it to the ledger

```json
{
  "active": true,
  "alias": "string",
  "attributes": ["string"],
  "id": "string",
  "imageUri": "string",
  "imported": true,
  "timestamp": "string",
  "version": "string"
}
```

#### POST /ctrl/api/v1.0/schemas/delete

deletes a given schema from the DB

Required parameter: id

#### GET /ctrl/api/v1.0/schemas/{id}

Returns the details of a schema definition with the given ID
'''json
{
"active": true,
"alias": "string",
"attributes": [
"string"
],
"id": "string",
"imageUri": "string",
"imported": true,
"timestamp": "string",
"version": "string"
}
'''

### More Controllers:

- agent-proxy
- did-controller
- images-controller
- presentation-proof-controller
- proof-template-controller
