import { TestObject } from "../../framework/frontEnd/testObject";

class FirstTest extends TestObject {
  constructor() {
    super();
  }

  async main() {
    // await firstTest.driver.get("https://google.com");

    console.log(`firstTest config -> ${firstTest.config_file.CONFIG_FILE_PATH}`);

    // await firstTest.tearDown();
  }
}

const firstTest = new FirstTest();
firstTest.main();
