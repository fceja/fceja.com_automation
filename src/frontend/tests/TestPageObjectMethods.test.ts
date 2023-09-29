import { TestObject } from "../../framework/frontEnd/TestObject";
import { TestPageObjectMethods } from "../pageObjects/TestPageObjectMethods";

class jestTests extends TestObject {
  constructor() {
    super();
  }
}

const testing = new jestTests();
let testPageObjectMethods: TestPageObjectMethods;

beforeAll(async () => {
  await testing.startUp();

  testPageObjectMethods = new TestPageObjectMethods(testing.webDriver);

  testing.webDriver.get("https://www.selenium.dev/documentation/");
  await new Promise((resolve) => setTimeout(resolve, 2000));
});

afterAll(async () => {
  await testing.tearDown();
});

describe("Testing PageObject methods on Selenium Documentation page", () => {
  test("Get title text", async () => {
    const result = await testPageObjectMethods.getTitleText();
    console.log(`result -> ${result}`);
  });
});
