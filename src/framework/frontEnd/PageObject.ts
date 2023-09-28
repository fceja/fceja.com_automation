import { By, WebDriver, WebElementPromise } from "selenium-webdriver";

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
    const childPageObjectJsonFilePath = this.getChildPageObjectJsonFilePath();

    if (!childPageObjectJsonFilePath) {
      throw Error(
        `Invalid 'pageObjectJsonFilePath' -> ${childPageObjectJsonFilePath}`
      );
    }

    const jsonData = require(childPageObjectJsonFilePath);
    this.pageObjectJsonData = jsonData;
  }

  private getChildPageObjectJsonFilePath() {
    const callStackData = this.getCallStackData();
    const childPageObjectFilePath =
      this.parseChildPageObjectFilePathFromCallStackData(callStackData);

    const childPageObjectJsonFilePath = childPageObjectFilePath
      ?.split(":")[0]
      .replace(".ts", ".json");

    return childPageObjectJsonFilePath;
  }

  private getCallStackData() {
    const callStack = {} as any;

    Error.captureStackTrace(callStack, this.getCallStackData);

    const callStackData = callStack.stack.split("\n");

    return callStackData;
  }

  private parseChildPageObjectFilePathFromCallStackData(callStackData: string) {
    /*
     * TODO - need to verify this does not break when multiple child page objects are called
     */
    const childPageObjectCallStackLine = Object.values(callStackData).find(
      (elem) => {
        return elem.indexOf("pageObjects") !== -1;
      }
    );

    const matchResult = childPageObjectCallStackLine?.match(/\(([^)]+)\)/);

    const childPageObjectFilePath = Object.values(matchResult as string[]).find(
      (elem) => {
        return elem.indexOf("(") === -1;
      }
    );

    if (!childPageObjectFilePath) {
      throw Error(
        `Invalid 'childPageObjectFilePath' -> ${childPageObjectFilePath}`
      );
    }

    return childPageObjectFilePath;
  }

  private async getLocatorData(jsonKey: string) {
    const locatorData = this.pageObjectJsonData[jsonKey];

    return [locatorData.locator, locatorData.argument];
  }

  protected async getElement(jsonKey: string) {
    const [locator, argument] = await this.getLocatorData(jsonKey);

    const locatorMap: {
      [key: string]: (argument: string) => WebElementPromise;
    } = {
      className: (argument) => {
        return this.webDriver.findElement(By.className(argument));
      },
      css: (argument) => {
        return this.webDriver.findElement(By.css(argument));
      },
      id: (argument) => {
        return this.webDriver.findElement(By.id(argument));
      },
      name: (argument) => {
        return this.webDriver.findElement(By.name(argument));
      },
      linkText: (argument) => {
        return this.webDriver.findElement(By.linkText(argument));
      },
      partialLinkText: (argument) => {
        return this.webDriver.findElement(By.partialLinkText(argument));
      },
      xpath: (argument) => {
        return this.webDriver.findElement(By.xpath(argument));
      },
    };

    const webDriverElement = locatorMap[locator](argument);

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
