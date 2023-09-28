import { By, WebDriver } from "selenium-webdriver";

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

  private getByLocatorArg(locator: string, argument: string): By {
    switch (locator) {
      case "className":
        return By.className(argument);
      case "css":
        return By.css(argument);
      case "id":
        return By.id(argument);
      case "name":
        return By.name(argument);
      case "linkText":
        return By.linkText(argument);
      case "partialLinkText":
        return By.partialLinkText(argument);
      case "xpath":
        return By.xpath(argument);

      default:
        throw new Error(`Invalid 'locator' value -> ${locator}`);
    }
  }

  private getLocatorDataByJsonKey(jsonKey: string) {
    const locatorData = this.pageObjectJsonData[jsonKey];

    return [locatorData.locator, locatorData.argument];
  }

  private async getElementByJsonKey(jsonKey: string) {
    const [locator, argument] = this.getLocatorDataByJsonKey(jsonKey);

    const element = await this.webDriver.findElement(
      this.getByLocatorArg(locator, argument)
    );

    return element;
  }

  private async getElementsByJsonKey(jsonKey: string) {
    const [locator, argument] = this.getLocatorDataByJsonKey(jsonKey);

    const elements = await this.webDriver.findElements(
      this.getByLocatorArg(locator, argument)
    );

    return elements;
  }

  protected async getElementText(jsonKey: string) {
    try {
      const element = await this.getElementByJsonKey(jsonKey);

      return element.getText();
    } catch (error) {
      console.error(`${error}`);

      throw new Error(`Element text retrieval failed. 'jsonKey' -> ${jsonKey}`);
    }
  }

  protected async getElementsText(jsonKey: string) {
    try {
      const elements = await this.getElementsByJsonKey(jsonKey);

      const stringPromises = elements.map(async (elem) => {
        return await elem.getText();
      });

      const stringOutput = await Promise.all(stringPromises);

      return stringOutput;
    } catch (error) {
      console.error(`${error}`);

      throw new Error(
        `Elements text retrieval failed. 'jsonKey' -> ${jsonKey}`
      );
    }
  }
}
