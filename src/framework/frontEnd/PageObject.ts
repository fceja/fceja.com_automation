import { By, WebDriver } from "selenium-webdriver";

import addConsoleColorCode from "../utils/ConsoleColorsCodes";
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

  private formatLocator(locatorToFormat: string, ...args: string[]): string {
    return locatorToFormat.replace(/{(\d+)}/g, (_, index) => args[index] || "");
  }

  private getByLocator(locatorType: string, locator: string): By {
    switch (locatorType) {
      case "className":
        return By.className(locator);
      case "css":
        return By.css(locator);
      case "id":
        return By.id(locator);
      case "name":
        return By.name(locator);
      case "linkText":
        return By.linkText(locator);
      case "partialLinkText":
        return By.partialLinkText(locator);
      case "xpath":
        return By.xpath(locator);

      default:
        throw new Error(`Invalid 'locator' value -> ${locatorType}`);
    }
  }

  private getLocatorDataByJsonKey(jsonKey: string) {
    const locatorData = this.pageObjectJsonData[jsonKey];

    return [locatorData.locatorType, locatorData.locator];
  }

  private getDynamicLocatorDataByJsonKey(jsonKey: string) {
    try {
      const locatorData = this.pageObjectJsonData[jsonKey];

      return [locatorData.locatorType, locatorData.locator];
    } catch (error) {
      const jsonKeyColor = addConsoleColorCode("magenta", '"jsonKey"');
      const locatorDataColor = addConsoleColorCode("magenta", '"locatorData"');

      throw new Error(
        `\n${jsonKeyColor} -> "${jsonKey}"\n${locatorDataColor} -> "${this.pageObjectJsonData[jsonKey]}"\n"errorMessage" -> "${error}"`
      );
    }
  }

  /**
   *  getters - single element
   */
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

  /**
   * getters - single dynamic element
   */
  protected async getDynamicElement(jsonKey: string, ...locatorArgs: string[]) {
    const [locatorType, locatorToFormat] =
      this.getDynamicLocatorDataByJsonKey(jsonKey);

    const formattedLocator = this.formatLocator(
      locatorToFormat,
      ...locatorArgs
    );

    try {
      const elem = await this.webDriver.findElement(
        this.getByLocator(locatorType, formattedLocator)
      );

      return elem;
    } catch (error) {
      const jsonKeyColored = addConsoleColorCode("magenta", '"jsonKey"');
      const locatorArgsColored = addConsoleColorCode(
        "magenta",
        '"locatorArgs"'
      );
      const locatorToFormatColored = addConsoleColorCode(
        "magenta",
        '"locatorToFormat"'
      );
      const formattedLocatorColored = addConsoleColorCode(
        "magenta",
        '"formattedLocator"'
      );

      throw new Error(
        `\n${jsonKeyColored} -> "${jsonKey}"\n${locatorArgsColored} -> "${locatorArgs}"\n${locatorToFormatColored} -> ${locatorToFormat}\n${formattedLocatorColored} -> "${formattedLocator}"\n"errorMessage" -> "${error}"\n"`
      );
    }
  }

  protected async getDynamicElementText(
    jsonKey: string,
    ...locatorArgs: string[]
  ) {
    try {
      const elem = await this.getDynamicElement(jsonKey, ...locatorArgs);

      return elem.getText();
    } catch (error) {
      console.error(`${error}`);

      const failedMessage = addConsoleColorCode("red", "Failed to execute");
      const erroredMethod = addConsoleColorCode(
        "magenta",
        "PageObject.getDynamicElementText(...)"
      );

      throw new Error(`${failedMessage} -> ${erroredMethod}`);
    }
  }
}
