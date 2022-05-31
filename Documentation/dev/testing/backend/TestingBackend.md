# Testing Backend

Testing is the process of checking the functionality of an application to ensure it runs as per requirements. Unit testing comes into picture at the developers’ level; it is the testing of single entity (class or method). Unit testing plays a critical role in helping a software company deliver quality products to its customers.

Unit testing can be done in two ways − manual testing and automated testing.

## Why we should have tests

Unit testing ensures that all code meets quality standards before it’s deployed. This ensures a reliable engineering environment where quality is paramount. Over the course of the product development life cycle, unit testing saves time and helps developers write better code, more efficiently.

## Testing Framework: JUnit

### General

JUnit is a unit testing framework for Java programming language. It plays a crucial role test-driven development, and is a family of unit testing frameworks collectively known as xUnit.

JUnit promotes the idea of "first testing then coding", which emphasizes on setting up the test data for a piece of code that can be tested first and then implemented. This approach is like "test a little, code a little, test a little, code a little." It increases the productivity of the programmer and the stability of program code, which in turn reduces the stress on the programmer and the time spent on debugging.

### Features

- JUnit is an open source framework, which is used for writing and running tests.
- Provides annotations to identify test methods.
- Provides assertions for testing expected results.
- Provides test runners for running tests.
- JUnit tests allow you to write codes faster, which increases quality.
- JUnit is elegantly simple. It is less complex and takes less time.
- JUnit tests can be run automatically and they check their own results and provide immediate feedback. There's no need to manually comb through a report of test results.
- JUnit tests can be organized into test suites containing test cases and even other test suites.
- JUnit shows test progress in a bar that is green if the test is running smoothly, and it turns red when a test fails.

### How to install

No installation needed. Just import: import org.junit.jupiter.api.\*

## General concept for testing

### Concept

A Unit Test Case is a part of code, which ensures that another part of code (method) works as expected. To achieve the desired results quickly, a test framework is required. JUnit is a perfect unit test framework for Java programming language.

A formal written unit test case is characterized by a known input and an expected output, which is worked out before the test is executed. The known input should test a precondition and the expected output should test a post-condition.

There must be at least two unit test cases for each requirement − one positive test and one negative test. If a requirement has sub-requirements, each sub-requirement must have at least two test cases as positive and negative.

### Structure of tests: Arrange, Act and Assert (AAA) Pattern

The AAA (Arrange-Act-Assert) pattern has become almost a standard across the industry. It suggests that you should divide your test method into three sections: arrange, act and assert. Each one of them only responsible for the part in which they are named after.

So the arrange section you only have code required to setup that specific test. Here objects would be created, mocks setup (if you are using one) and potentially expectations would be set. Then there is the Act, which should be the invocation of the method being tested. And on Assert you would simply check whether the expectations were met.

```java
@Test
public void testSave() {
  // arrange
  var repository = Substitute.For<IClientRepository>();
  var client = new Client(repository);

  // act
  client.Save();

  // assert
  mock.Received.SomeMethod();
}
```

## Testing scenarios

All methods should be tested (getter- and setter-methods don't have to be tested necessarily). Therefore all possible input parameter combinations should be tested.

For example:

1. First parameter can be null. It should throw Invalid parameter exception.
2. Second parameter can be null. It should throw Invalid parameter exception.
3. Both can be null. It should throw Invalid parameter exception.
4. Finally, test the valid output of function. It should return valid pre-determined output.

## Example tests

Here I wrote some tests for our authentification. Of course you can write many more tests, but this should be the most important ones.

Authorization input: passing

```java
 @Test
    void testAuthentification_withPassing_shouldBeAccepted() {
        // Arrange
        boolean expected = true;
        ConnectionController connectionController = new ConnectionController();
        String authorization = "passing";

        // Act
        boolean result = connectionController.authentification(authorization);

        //Assert
        assertEquals(expected, result);
    }
```

Authorization input: admin

```java
    @Test
    void testAuthentification_withAdmin_shouldBeAccepted() {
        // Arrange
        boolean expected = true;
        ConnectionController connectionController = new ConnectionController();
        String authorization = "admin";

        // Act
        boolean result = connectionController.authentification(authorization);

        //Assert
        assertEquals(expected, result);
    }
```

Authorization input: random String

```java
    @Test
    void testAuthentification_withoutFalseAuthorization_shouldBeDenied() {
        // Arrange
        boolean expected = false;
        ConnectionController connectionController = new ConnectionController();
        String authorization = "hacker";

        // Act
        boolean result = connectionController.authentification(authorization);

        //Assert
        assertEquals(expected, result);
    }
```

Authorization input: empty String

```java
    @Test
    void testAuthentification_withEmptyAuthorization_shouldBeDenied() {
        // Arrange
        boolean expected = false;
        ConnectionController connectionController = new ConnectionController();
        String authorization = "";

        // Act
        boolean result = connectionController.authentification(authorization);

        //Assert
        assertEquals(expected, result);
    }
```

## Test connection to the Lissi backend

### HTTP request

Lissi backend is not tested with our unit tests because it is not our software. You can access the Lissi endpoints by HTTP requests.

The base-url of adorsys lissi backend is: https://onboardingad.ddns.net/

You can see all available endpoints in our [API documentation](https://github.com/amosproj/amos2022ss04-digital-identity/blob/main/Documentation/dev/LissiAPI.md).

### Authorization

For accessing the lissi backend you need authorization in order not to get a error 401 Unauthorized.

Here you can see the authorization in Postman. The Client secret is blackened, it was send by adorsys via e-mail.

![authorization](https://user-images.githubusercontent.com/93184461/171035325-cb9030a4-d179-45da-91d7-beaa0674e05b.png)

Access Token URL: https://onboardingad.ddns.net/auth/realms/lissi-cloud/protocol/openid-connect/token
