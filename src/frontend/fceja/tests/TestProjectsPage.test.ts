import { TestObject } from "../../../framework/frontEnd/TestObject";
import { ProjectsPageObject } from "../pageObjects/ProjectsPageObject";

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
  testProjectPage.webDriver.get("http://localhost:3000");

  await new Promise((resolve) => setTimeout(resolve, 5000));
});

afterAll(async () => {
  await testProjectPage.tearDown();
  await new Promise((resolve) => setTimeout(resolve, 5000));
});

describe("Test projects page", () => {
  test("Validate greetings text", async () => {
    const exectedText = "Greetings, FC projects down below.";

    const result = await projectPageObject.getGreetingText();

    expect(result).toBe(exectedText);
  });
});
