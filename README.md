# Digital Identity (AMOS SS 2022)

![team logo](https://raw.githubusercontent.com/amosproj/amos2022ss04-digital-identity/main/Deliverables/sprint-01/logo/DIdentity_transparent_black.png)


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

#### Run Backend
```
cd src/digitalIdentity-backend/
./mvnw spring-boot:run
```
