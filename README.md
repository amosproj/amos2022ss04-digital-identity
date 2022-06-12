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

## How to run:

(Development on Linux or WSL highly recommended)

### Frontend (Angular)

```
cd src/digitalIdentity-frontend/
npm install
ng serve --open
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

```
lissi.api.url= <to be filled>
```

#### Set up authentification and credential for accessing lissi api:

- In `src/digitalIdentity-backend/src/main/resources/application.properties` you have to the Credential and the URL, which will authenticate you.
- You can find the Credential in the screenshot in the mail "Links and Information" (19.05.2022) (Field: Client Secret).

```
lissi.auth.url= <to be filled>
lissi.auth.client.id= <to be filled>
lissi.auth.client.secret= <to be filled>
```

#### Run Backend

```
cd src/digitalIdentity-backend/
./mvnw spring-boot:run
```
