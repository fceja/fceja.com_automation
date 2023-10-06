import { TestObject } from "../../../framework/frontEnd/TestObject";
import { TestPageObjectMethods } from "../pageObjects/TestPageObjectMethods";

const envPropsJson = require(`../../../properties/${process.env.ENVIRONMENT}.json`);

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

  testing.webDriver.get(envPropsJson.testPageObject.url);
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

  test("getElementsText(...) - jsonKey 'paragraphs'", async () => {
    const expectedResults = [
      "Selenium is an umbrella project for a range of tools and libraries that enable and support the automation of web browsers.",
      "It provides extensions to emulate user interaction with browsers, a distribution server for scaling browser allocation, and the infrastructure for implementations of the W3C WebDriver specification that lets you write interchangeable code for all major web browsers.",
      "This project is made possible by volunteer contributors who have put in thousands of hours of their own time, and made the source code freely available for anyone to use, enjoy, and improve.",
      "Selenium brings together browser vendors, engineers, and enthusiasts to further an open discussion around automation of the web platform. The project organises an annual conference to teach and nurture the community.",
      "At the core of Selenium is WebDriver, an interface to write instruction sets that can be run interchangeably in many browsers. Once you’ve installed everything, only a few lines of code get you inside a browser. You can find a more comprehensive example in Writing your first Selenium script",
      "See the Overview to check the different project components and decide if Selenium is the right tool for you.",
      "You should continue on to Getting Started to understand how you can install Selenium and successfully use it as a test automation tool, and scaling simple tests like this to run in large, distributed environments on multiple browsers, on several different operating systems.",
    ];

    const actualResults = await testPageObjectMethods.getParagraphsText();
    expectedResults.forEach((expectedText: string, index: number) => {
      expect(actualResults[index]).toBe(expectedText);
    });
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
