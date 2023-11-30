import { CarouselCardData as expectedCardData } from "./CardData";

import { ProjectsPageObject } from "@fceja.com/pageObjects/ProjectsPageObject";
import { TestObject } from "@framework/frontEnd/TestObject";

const envPropsJson = require(`@properties/${process.env.ENVIRONMENT}.json`);

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
  test("Validate actual greetings text matches expected text", async () => {
    const exectedText = "Greetings, fceja projects down below.";

    const actualText = await projectPageObject.getGreetingText();
    expect(actualText).toBe(exectedText);
  });

  test("Validate actual card data populated matches expected card data", async () => {
    for (const [index, expected] of expectedCardData.entries()) {
      const actualCardsData = await projectPageObject.getCardDataByIndex(index);
      expect(actualCardsData.cardDescription).toBe(
        expected.cardDetails.description
      );
      expect(actualCardsData.cardTitle).toBe(expected.cardDetails.title);
      expect(actualCardsData.cardGitHubLink).toBe(expected.webLinks.gitHubLink);
      expect(actualCardsData.cardUrlLink).toBe(expected.webLinks.urlLink);
    }
  });
});
