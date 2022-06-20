# Digital Identity (AMOS SS 2022)

![team logo](https://raw.githubusercontent.com/amosproj/amos2022ss04-digital-identity/main/Deliverables/sprint-01/logo/DIdentity_transparent_black.png)

### Project Mission

Adorsys wants to implement Digital identities for all employees, guests and partners working for the company,
to digitalize and simplify the identification and authentication process at adorsys.
Starting with the creating digital identities for all stakeholders that are stored in the lissi app,
defining authentication schemas and allowing access to its workers are the key
goals for this project. In the future, adosys envisions unlimited possibilities
of using the digital identities for example as doorkeys and is keen to build
up this network of partners within the lissi network.

## How to run with docker:
You easily build the docker images with docker compose: <https://docs.docker.com/compose/install/>

In the `docker-compose.yml` file you have to configure the hostname, mail relay host and the connection to the lissi API from line 24.

```
docker-compose up

docker-compose up -d # (For running in the background)
```

### Development
After setting up the three containers you can handle them with the normal docker command. 
To rebuild the backend you just need to restart the specific container. `docker ps`, `docker restart CONTAINER-ID`

## How to run manually:

(Development on Linux or WSL highly recommended)

### Frontend (Angular)

#### Run Frontend
```
cd src/digitalIdentity-frontend/
npm install
npm start
```

#### Run tests
```
npm test
```

### Backend (Springboot)

#### Init mysql database

```
sudo apt install mysql-common # or similar
sudo mysql --password  # type in your root password of linux machine
create database digital_identity;
create user 'didentity'@'%' identified by 'aosai6aH';
grant all on digital_identity.* to 'didentity'@'%';
quit;
```

#### Set up mail relay:

- In `src/digitalIdentity-backend/src/main/resources/application.properties` you have to define the mail settings.
- For a gmail adress you need to create an app password, which you need to enter in the application.properties file. (<https://support.google.com/accounts/answer/185833>)
- A valid section in application.properties could look like this:

```
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=myemail@gmail.com
spring.mail.password=wajorjsyogivfugt
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

#### Set up the url of your lissi api:

- In `src/digitalIdentity-backend/src/main/resources/application.properties` you have to define the URL where the lissi api is being hosted.
- A valid entry could look like this:

```
# Lissi API 
lissi.api.url=https://my.lissiapi.com
```

#### Set up authentification and credential for accessing lissi api:

- In `src/digitalIdentity-backend/src/main/resources/application.properties` you have to specify the credentials and the URL to the LissiAPI

- A valid entry could look like this:
```
# Authentification:
lissi.auth.url= https://my.lissiapi.com/auth/realms/lissi-cloud/protocol/openid-connect/token
lissi.auth.client.id=springboot-client
lissi.auth.client.secret=SoDqHhwBI4AfrxUf9GM7Fq8Y7hKWKiFD
```

#### Run Backend

```
cd src/digitalIdentity-backend/
./mvnw spring-boot:run
```

#### Run tests
```
./mvnw test
```
