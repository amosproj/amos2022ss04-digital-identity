# Prerequisits 

In order to test Angular you can use *Jasmine* as a testing framework. Additionally, you can use karma to manage tests in a browser.<br >
Luckily, basic Angular projects are initialized with both *Jasmine* and *Karma*.

This is only a summary. Please read into e.g. the [documentation](https://jasmine.github.io/pages/docs_home.html) for more information.

# How to Start Tests

```
ng test 
```

# How to Write a Test

There are two options on where to store the test files. Either you create a separate *test* folder or you put them into the component folder. In this project, we will store the test file within the component folder. This fits the behavior of the Angular CLI, as it already creates basic tests when creating a new module/component. <br >
Test files are useally called \<component-name\>.spec.ts.

Tests constructed with Jasmine are behavior-driven tests. Therefore, you will first describe the environment in which you will run your tests. Then, you can add specifications on how the module/component should behave. To ensure proper behavior, you will use assertions.

## Test Suits

First, you start with an suite group. This is a set of specs or test cases and be created by calling the function ``describe(String, function())``. The first argument is the title of the test suite and should describe it briefly. This will be displayed later on. The second argument is a callback function within which the behavior will go.<br >
For example
```
describe('String Utils', () => {
    /* here go your tests */
}
```
Note: You can nest test suits.

## Specs

The specs and test cases are definded within the callback function. This is done by calling the function ``it(String, function)``. The first argument describes the title of the spec/test case and will be displayed later on. The second is a function which contains the acutal test:<br >
```
describe('String Utils', () => {
    it('should be able to look for a substring', () => {...}); 
    it('should be able to upper case', () => {...}); 
    it('should be able to lower case', () => {...}); 
}
```

## Expectations

Expectations are like assertions and created using the global ``expect()`` function. To define an assertion, you have to combine it with matchers. There are some build in matchers: 
- toBe() for testing for identity,
- toBeNull() for testing for null,
- toBeUndefined()/toBeDefined() for testing for undefined/not undefined,
- toBeNaN() for testing for NaN (Not A Number)
- toEqual() for testing for equality,
- toBeFalsy()/toBeTruthy() for testing for falseness/truthfulness etc.


```
describe('String Utils', () => {
    it('should be able to check whether a string contains a char', () => {
        expect(utils.contains).toBeDefined();
        expect(utils.contains("Hello", 'e')).toBeTruthy();
        expect(utils.contains("Hello", 'E')).toBeFalsy();
        expect(utils.contains("Hello", 'x')).toBeFalsy();
    }); 

    it('should be able to upper case', () => {
        expect(utils.toLowerCase).toBeDefined();
        expect(utils.toLowerCase("HelLO WorLD")).toEqual("hello world");
    });

    it('should be able to lower case', () => {
        expect(utils.toUpperCase).toBeDefined();
        expect(utils.toUpperCase("HelLO WorLD")).toEqual("HELLO WORLD");
    }); 
}
```
See the [documentation](https://jasmine.github.io/api/edge/matchers.html) for a detailed explanation/list of the matchers. <br >
You can create additional custom matchers within the ``beforeEach()`` function using ``jasmine.addMatchers()`` funcition.

## beforeEach() and afterEach()

It is kind of common to need the same variables or initialzation within each test. For this you can use:
- The ``beforeEach()`` function is called once before each spec in the suite where it is called.
- The ``afterEach()`` function is called once after each spec in the suite where it's called.

Additionally, there are functions to execute code before and after all tests:
- The ``beforeAll()`` function is called once before all specs in the suite where it is called.
- The ``afterAll()`` function is called once after all specs in the suite where it's called.


```
describe('String Utils', () => {

    beforeAll(function(){
        /* init something for all tests */
    });
    beforeEach(function(){
        /* init something for each test */
    });
    afterEach(function(){
        /* clean up after each test */
    });

    afterAll(function(){
        /* clean up after all tests
         might be usefull if global values have been touched */
    }); 

    /* ... */
}
```

## Failing a Test

If you want to fail a test due to reasons, you can use the global fail() function. 

```
describe('String Utils', () => {
    it("should explicitly fail", function () { 
        fail('Forced to fail'); 
    });
}
```

## Testing for Exceptions

If you want to check, whether certain exceptions are thrown, you can use the Methods 
- ``toThrow()`` to check whether an exception was thrown and
- ``toThrowError(ErrorType)`` to check whether an exception of a specific type was thrown.

E.g. you want to test the following function:
```
function throwsError() { 
    throw new TypeError("A type error");
}
```
Then you could test it like this:
```
it('it should throw an exception', function () {
    expect(throwsError).toThrow();
    expect(throwsError).toThrowError(TypeError);
});

```

## Spys


Spys are a usefull tool to mock and oberserve calls of other methods. To create a spy you can use ``createSpy()``. To spy on a function you can use ``spyOn()``
By default a spy will only report if a call was done without calling through the spied function. The spied function is therefore not called. You can change the default behavior using these methods:
- ``and.callThrough()``: call through the original function
- ``and.returnValue(value)``: return the specified value
- ``and.callFake(fn)``: call the fake function instead of the original function
- ``and.throwError(err)``: throw an error
- ``and.stub()``: resets the default stubbing behavior

See the [documentation](https://jasmine.github.io/api/edge/Spy.html) for more information.

```
describe('String Utils', () => {
    it('should be able to upper case', () => {
        var spytoUpperCase = spyOn(String.prototype, 'toUpperCase') 
        expect(utils.toUpperCase).toBeDefined();                            // will succeed
        expect(utils.toUpperCase("hello world")).toEqual("HELLO WORLD");    // will fail
    });

    it('should be able to upper case', () => {
        var spytoUpperCase = spyOn(String.prototype, 'toUpperCase').and.callThrough()
        expect(utils.toUpperCase).toBeDefined();                            // will succeed
        expect(utils.toUpperCase("hello world")).toEqual("HELLO WORLD");    // will succeed
    });

    it('should be able to upper case', () => {
        var faker = function(){
            return "HELLO WORLD";
        }
        var spytoUpperCase = spyOn(String.prototype, 'toUpperCase')
            .and.callFake(faker))

        expect(utils.toUpperCase).toBeDefined();                            // will succeed
        expect(utils.toUpperCase("hello world")).toEqual("HELLO WORLD");    // will succeed
        expect(utils.toUpperCase("my World")).toEqual("MY WORLD");          // will fail
    });


}
```

## Other Stuff Jasmin Can Do
### HTTP Requests

There is a proper testing envoirment for testing HTTP Requests. It creates a mocked module simulating a server, which can be easily setup for each individual test/spec. See the docu for more info:
- [HTTPClient](https://angular.io/api/common/http/HttpClient)
- [HTTPErrorResponse](https://angular.io/api/common/http/HttpErrorResponse)
- [HTTPTestingController](https://angular.io/api/common/http/testing/HttpTestingController): this is the component used to mock/simulate the server.


### Async and Clock

By default, Jasmine waits for any asynchronous operation, defined by a callback, promise or the async keyword, to be finished. Aside form this you can ensure to wait for *N* internal ticks. See Jasmin Clock for this. TODO: add links to it


# Credits

This guide was created using
https://www.freecodecamp.org/news/jasmine-unit-testing-tutorial-4e757c2cbf42/