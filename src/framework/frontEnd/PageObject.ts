import { By, WebDriver, WebElementPromise } from "selenium-webdriver";

import {
  LoadPageObjectJsonData,
  PageObjectJsonData,
} from "../utils/LoadPageObjectJsonData";

export class PageObject {
  private pageObjectJsonData!: PageObjectJsonData;
  private webDriver!: WebDriver;

  constructor(webDriver: WebDriver) {
    this.webDriver = webDriver;

    this.pageObjectJsonData = LoadPageObjectJsonData.loadPageObjectJsonData();
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

  private async getLocatorData(jsonKey: string) {
    const locatorData = this.pageObjectJsonData[jsonKey];

    return [locatorData.locator, locatorData.argument];
  }
}
