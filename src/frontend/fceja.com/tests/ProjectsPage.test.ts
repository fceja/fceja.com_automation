import { CardCarouselCardData as expectedCardData } from "./CardData";

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

  test("Validate actual card data matches expected card data", async () => {
    const actualCardsData = await projectPageObject.getCardData();

    expectedCardData.forEach((expectedCardData, index) => {
      const actualCardData = actualCardsData[index].split("\n");

      const actualTitle = actualCardData[0];
      const actualDescription = actualCardData[1];

      expect(actualTitle).toBe(expectedCardData.title);
      expect(actualDescription).toBe(expectedCardData.description);
    });
  });
});
