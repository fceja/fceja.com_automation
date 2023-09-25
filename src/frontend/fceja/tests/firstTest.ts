import { TestObject } from "../../../framework/frontEnd/testObject";

class FirstTest extends TestObject {
  constructor() {
    super();
  }
}

const firstTest = new FirstTest();

console.log("FirstTest1");
console.dir(firstTest);
console.log("FirstTest2");
console.dir(firstTest.driver.get("https://google.com"));
