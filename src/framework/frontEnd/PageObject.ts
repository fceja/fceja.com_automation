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

  private getByLocatorArg(locator: string, arg: string): By {
    switch (locator) {
      case "className":
        return By.className(arg);
      case "css":
        return By.css(arg);
      case "id":
        return By.id(arg);
      case "name":
        return By.name(arg);
      case "linkText":
        return By.linkText(arg);
      case "partialLinkText":
        return By.partialLinkText(arg);
      case "xpath":
        return By.xpath(arg);

      default:
        throw new Error(`Invalid 'locator' value -> ${locator}`);
    }
  }

  private getLocatorDataByJsonKey(jsonKey: string) {
    const locatorData = this.pageObjectJsonData[jsonKey];

    return [locatorData.locator, locatorData.arg];
  }

  private async getElement(jsonKey: string) {
    const [locator, arg] = this.getLocatorDataByJsonKey(jsonKey);

    const elem = await this.webDriver.findElement(
      this.getByLocatorArg(locator, arg)
    );

    return elem;
  }

  private async getElements(jsonKey: string) {
    const [locator, arg] = this.getLocatorDataByJsonKey(jsonKey);

    const elems = await this.webDriver.findElements(
      this.getByLocatorArg(locator, arg)
    );

    return elems;
  }

  protected async getElementText(jsonKey: string) {
    try {
      const elem = await this.getElement(jsonKey);

      return elem.getText();
    } catch (error) {
      console.error(`${error}`);

      throw new Error(`Element text retrieval failed. 'jsonKey' -> ${jsonKey}`);
    }
  }

  protected async getElementsText(jsonKey: string) {
    try {
      const elems = await this.getElements(jsonKey);

      const stringPromises = elems.map(async (elem) => {
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

  protected async getDynamicElement(jsonKey: string, ...args: string[]) {
    const [locator, arg] = this.getDynamicLocatorDataByJsonKey(jsonKey, args);

    const elem = await this.webDriver.findElement(
      this.getByLocatorArg(locator, arg)
    );

    return elem;
  }

  protected async getDynamicElementText(jsonKey: string, ...args: string[]) {
    try {
      const elem = await this.getDynamicElement(jsonKey, ...args);

      return elem.getText();
    } catch (error) {
      console.error(`${error}`);

      throw new Error(
        `Elements text retrieval failed. 'jsonKey' -> ${jsonKey}`
      );
    }
  }

  private getDynamicLocatorDataByJsonKey(jsonKey: string, args: string[]) {
    const locatorData = this.pageObjectJsonData[jsonKey];

    const formattedArg = this.formatString(locatorData.arg, ...args);

    return [locatorData.locator, formattedArg];
  }

  private formatString(template: string, ...args: string[]): string {
    return template.replace(/{(\d+)}/g, (_, index) => args[index] || "");
  }
}
