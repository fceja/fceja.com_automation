import { By, WebDriver } from "selenium-webdriver";

interface LocatorData {
  locator: string;
  argument: string;
}

type PageObjectJsonData = Record<string, LocatorData>;

export class PageObject {
  private pageObjectJsonData!: PageObjectJsonData;
  private webDriver!: WebDriver;

  constructor(webDriver: WebDriver) {
    this.webDriver = webDriver;

    this.loadPageObjectJsonData();
  }

  private loadPageObjectJsonData() {
    const pageObjectJsonFilePath = this.getJsonFilePath();

    if (pageObjectJsonFilePath) {
      try {
        const jsonData = require(pageObjectJsonFilePath);
        this.pageObjectJsonData = jsonData;
      } catch (error) {
        console.error(`${error}`);
      }
    } else {
      throw Error();
    }
  }

  private getJsonFilePath() {
    const stackData = this.getCallStackData();
    const pageObjectFilePath = this.parseFilePathFromStackData(stackData);

    const pageObjectJsonFilePath = pageObjectFilePath
      ?.split(":")[0]
      .replace(".ts", ".json");

    return pageObjectJsonFilePath;
  }

  private getCallStackData() {
    const callStack = {} as any;

    Error.captureStackTrace(callStack, this.getCallStackData);

    const stackData = callStack.stack.split("\n");

    return stackData;
  }

  private parseFilePathFromStackData(callStack: string) {
    // hardcoded call stack value - may fail
    // todo - make dynamic
    const callerLine = callStack[4].trim();
    const matchResult = callerLine.match(/\(([^)]+)\)/);

    if (matchResult && matchResult[1]) {
      const pageObjectFileName = matchResult[1];
      return pageObjectFileName;
    } else {
      console.error("File name not found.");
      return null;
    }
  }

  private async getLocatorData(jsonKey: string) {
    const locatorData = this.pageObjectJsonData[jsonKey];

    return [locatorData.locator, locatorData.argument];
  }

  protected async getElement(jsonKey: string) {
    const [_locator, argument] = await this.getLocatorData(jsonKey);

    // todo - need to add locator functionality
    const webDriverElement = await this.webDriver.findElement(
      By.xpath(argument)
    );

    return webDriverElement;
  }

  protected async getElementText(jsonKey: string) {
    try {
      const webDriverElement = await this.getElement(jsonKey);

      return webDriverElement.getText();
    } catch (error) {
      console.error(`${error}`);

      throw Error(`Element text retrieval failed. 'jsonKey' -> ${jsonKey}`);
    }
  }
}
