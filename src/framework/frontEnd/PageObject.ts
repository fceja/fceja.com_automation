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

  protected async getElement(jsonKey: string) {
    const [locator, argument] = await this.getLocatorDataByJsonKey(jsonKey);

    const webDriverElement = this.webDriver.findElement(
      this.getByLocatorArg(locator, argument)
    );

    return webDriverElement;
  }

  protected async getElements(jsonKey: string) {
    const [locator, argument] = await this.getLocatorDataByJsonKey(jsonKey);

    const webDriverElements = this.webDriver.findElements(
      this.getByLocatorArg(locator, argument)
    );

    return webDriverElements;
  }

  protected async getElementText(jsonKey: string) {
    try {
      const webDriverElement = await this.getElement(jsonKey);

      return webDriverElement.getText();
    } catch (error) {
      console.error(`${error}`);

      throw new Error(`Element text retrieval failed. 'jsonKey' -> ${jsonKey}`);
    }
  }

  private async getLocatorDataByJsonKey(jsonKey: string) {
    const locatorData = this.pageObjectJsonData[jsonKey];

    return [locatorData.locator, locatorData.argument];
  }
}
