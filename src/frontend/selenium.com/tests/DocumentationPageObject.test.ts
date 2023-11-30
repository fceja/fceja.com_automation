import { TestObject } from "@framework/frontEnd/TestObject";
import { TestPageObjectMethods } from "@selenium.com/pageObjects/DocumentationPageObject";

const envPropsJson = require(`@properties/${process.env.ENVIRONMENT}.json`);

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

  testing.webDriver.get(envPropsJson.selenium.url);
});

afterAll(async () => {
  await testing.tearDown();
});

describe("Test PageObject methods", () => {
  test("getElementText(...) -  jsonKey 'title'", async () => {
    const expectedText = "The Selenium Browser Automation Project";

    const actualText = await testPageObjectMethods.getTitleText();
    expect(actualText).toBe(expectedText);
  });

  test("getElementsText(...) - jsonKey 'firstParagraph'", async () => {
    const expectedResults =
      "Selenium is an umbrella project for a range of tools and libraries that enable and support the automation of web browsers.";

    const actualResults = await testPageObjectMethods.getFirstParagraphsText();

    expect(actualResults[0]).toBe(expectedResults);
  });

  test("getDynamicElementText(...) - jsonKey 'subTitleParagraph", async () => {
    const subTitle = "Test Practices";
    const expectedText =
      "Some guidelines and recommendations on testing from the Selenium project.";

    const actualText = await testPageObjectMethods.getSubTitleParagraphText(
      subTitle
    );
    expect(actualText).toBe(expectedText);
  });

  test("getElementAttribute(...) - jsonKey 'documentationLink'", async () => {
    const expectedAttributeValue = "https://www.selenium.dev/documentation/";
    const attribute = "href";

    const actualAttributeValue =
      await testPageObjectMethods.getDocumentationLinkAttribute(attribute);

    expect(actualAttributeValue).toBe(expectedAttributeValue);
  });

  test("clickElement(...) - jsonKey 'pythonTabBtn'", async () => {
    await testPageObjectMethods.clickPythonTabButton();
  });

  test("clickElement(...) - jsonKey 'pythonTabBtn'", async () => {
    await testPageObjectMethods.clickPythonTabButton();
  });

  test("waitForElementvisible(...) - jsonKey 'alertHeading'", async () => {
    const result = await testPageObjectMethods.isAlertHeadingVisible();
    expect(result).not.toBeNull();
  });

  test("moveToElement(...) - jsonKey 'aboutThisDocumentationSubTitleLink'", async () => {
    await testPageObjectMethods.scrollToAboutThisDoc();
  });
});
