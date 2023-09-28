import { TestObject } from "../../framework/frontEnd/TestObject";
import { SecondTestPageObject } from "../pageObjects/SecondTestPageObject";

class jestTests extends TestObject {
  constructor() {
    super();
  }
}

const testing = new jestTests();

beforeAll(async () => {
  await testing.startUp();
});

afterAll(async () => {
  await testing.tearDown();
});

describe("Jest Tests", () => {
  test("Jest test 1", async () => {
    const secondTestPageObject = new SecondTestPageObject(testing.webDriver);

    testing.webDriver.get(
      "https://react-bootstrap.github.io/docs/getting-started/introduction/"
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = await secondTestPageObject.getTitleText();
    console.log(`result -> ${result}`);
  });
});

