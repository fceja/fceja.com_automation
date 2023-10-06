import { ProjectsPageObject } from "../pageObjects/ProjectsPageObject";
import { TestObject } from "../../../framework/frontEnd/TestObject";

const envPropsJson = require(`../../../properties/${process.env.ENVIRONMENT}.json`);

class TestProjectsPage extends TestObject {
  constructor() {
    super();
  }
}

const testProjectPage = new TestProjectsPage();
let projectPageObject: ProjectsPageObject;

beforeAll(async () => {
  await testProjectPage.startUp();

  projectPageObject = new ProjectsPageObject(testProjectPage.webDriver);

  testProjectPage.webDriver.get(envPropsJson.fceja.url);
});

afterAll(async () => {
  await testProjectPage.tearDown();
});

describe("Test projects page", () => {
  test("Validate greetings text", async () => {
    const exectedText = "Greetings, FC projects down below.";

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const resultHere = await projectPageObject.getGreetingText();

    expect(resultHere).toBe(exectedText);
  });
});
