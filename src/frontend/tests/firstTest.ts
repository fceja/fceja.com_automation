import { TestObject } from "../../framework/frontEnd/testObject";

class FirstTest extends TestObject {
  constructor() {
    super();
  }

  async main() {
    await firstTest.driver.get("https://google.com");

    await firstTest.tearDown();
  }
}

const firstTest = new FirstTest();
firstTest.main();
