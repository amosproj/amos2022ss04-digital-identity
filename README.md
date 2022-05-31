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

#### Run Backend
```
cd src/digitalIdentity-backend/
./mvnw spring-boot:run
```

#### Project Mission
```
Adorsys wants to implement Digital identities for all employees, guests and partners working for the company,
to digitalize and simplify the identification and authentication process at adorsys. 
Starting with the creating digital identities for all stakeholders that are stored in the lissi app,
defining authentication schemas and allowing access to its workers are the key
goals for this project. In the future, adosys envisions unlimited possibilities 
of using the digital identities for example as doorkeys and is keen to build
up this network of partners within the lissi network.
```

