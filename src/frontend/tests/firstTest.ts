import { TestObject } from "../../framework/frontEnd/TestObject";

class FirstTest extends TestObject {
  constructor() {
    super();
  }

  async main() {
    await firstTest.webDriver.get("https://google.com");

    await firstTest.tearDown();

    this.logger.info("...done");
  }
}

const firstTest = new FirstTest();
firstTest.main();
