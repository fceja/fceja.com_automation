import "jest-expect-message";
import { By, WebDriver, until } from "selenium-webdriver";

import addConsoleColorCode from "@framework/utils/ConsoleColorsCodes";
import {
  LoadPageObjectJsonData,
  PageObjectJsonData,
} from "@framework/utils/LoadPageObjectJsonData";

export class PageObject {
  private pageObjectJsonData!: PageObjectJsonData;
  private webDriver!: WebDriver;

  constructor(webDriver: WebDriver) {
    this.webDriver = webDriver;

    this.pageObjectJsonData = LoadPageObjectJsonData.loadPageObjectJsonData();
  }

  private formatLocator(
    locatorToFormat: string,
    ...args: (string | number)[]
  ): string {
    return locatorToFormat.replace(
      /{(\d+)}/g,
      (_, index) => String(args[index]) || ""
    );
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

  private async getElement(jsonKey: string) {
    const [locator, arg] = this.getLocatorDataByJsonKey(jsonKey);

    try {
      const elem = await this.webDriver.findElement(
        this.getByLocator(locator, arg)
      );

      return elem;
    } catch (error) {
      const jsonKeyColored = addConsoleColorCode("magenta", '"jsonKey"');
      const locatorColored = addConsoleColorCode("magenta", '"locatorArgs"');

      throw new Error(
        `\n${jsonKeyColored} -> "${jsonKey}"\n${locatorColored} -> "${locator}"\n"errorMessage" -> "${error}"\n"`
      );
    }
  }

  protected async getElementAttribute(jsonKey: string, attribute: string) {
    try {
      const elem = await this.getElement(jsonKey);

      return elem.getAttribute(attribute);
    } catch (error) {
      console.error(`${error}`);

      const failedMessage = addConsoleColorCode("red", "Failed to execute");
      const erroredMethod = addConsoleColorCode(
        "magenta",
        "PageObject.getElementAttribute(...)"
      );

      throw new Error(`${failedMessage} -> ${erroredMethod}`);
    }
  }

  protected async getDynamicElementAttribute(
    jsonKey: string,
    attribute: string,
    ...locatorArgs: (string | number)[]
  ) {
    try {
      const elem = await this.getDynamicElement(jsonKey, ...locatorArgs);

      return elem.getAttribute(attribute);
    } catch (error) {
      // TODO - use logging instead of console.error()
      // console.error(`${error}`);

      return null;
    }
  }

  protected async getElementText(jsonKey: string) {
    try {
      const elem = await this.getElement(jsonKey);

      return elem.getText();
    } catch (error) {
      console.error(`${error}`);

      const failedMessage = addConsoleColorCode("red", "Failed to execute");
      const erroredMethod = addConsoleColorCode(
        "magenta",
        "PageObject.getElementText(...)"
      );

      throw new Error(`${failedMessage} -> ${erroredMethod}`);
    }
  }

  protected async clickElement(jsonKey: string) {
    try {
      const elem = await this.getElement(jsonKey);

      return elem.click();
    } catch (error) {
      console.error(`${error}`);

      const failedMessage = addConsoleColorCode("red", "Failed to execute");
      const erroredMethod = addConsoleColorCode(
        "magenta",
        "PageObject.getElementText(...)"
      );

      throw new Error(`${failedMessage} -> ${erroredMethod}`);
    }
  }

  protected async clickDynamicElement(
    jsonKey: string,
    ...locatorArgs: string[]
  ) {
    try {
      const elem = await this.getDynamicElement(jsonKey, ...locatorArgs);

      return elem.click();
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

  protected async waitForElementVisible(
    jsonKey: string,
    waitTime: number = 1000
  ) {
    try {
      const [locatorType, locator] = this.getLocatorDataByJsonKey(jsonKey);

      const result = await this.webDriver.wait(
        until.elementIsVisible(
          await this.webDriver.findElement(
            this.getByLocator(locatorType, locator)
          )
        ),
        waitTime
      );

      return result;
    } catch (error) {
      console.error(`${error}`);

      const failedMessage = addConsoleColorCode("red", "Failed to execute");
      const erroredMethod = addConsoleColorCode(
        "magenta",
        "PageObject.getElementText(...)"
      );

      throw new Error(`${failedMessage} -> ${erroredMethod}`);
    }
  }

  protected async getElements(jsonKey: string) {
    const [locatorType, locator] = this.getLocatorDataByJsonKey(jsonKey);

    try {
      const elems = await this.webDriver.findElements(
        this.getByLocator(locatorType, locator)
      );

      expect(
        elems.length,
        "Expected webDriver elems returned to not be empty but was."
      ).toBeGreaterThan(0);

      return elems;
    } catch (error) {
      const jsonKeyColored = addConsoleColorCode("magenta", '"jsonKey"');
      const locatorColored = addConsoleColorCode("magenta", '"locatorArgs"');

      throw new Error(
        `\n${jsonKeyColored} -> "${jsonKey}"\n${locatorColored} -> "${locator}"\n"errorMessage" -> ${error}`
      );
    }
  }

  protected async getElementsText(jsonKey: string) {
    try {
      const elems = await this.getElements(jsonKey);

      let elemObjs: string[] = [];

      await Promise.all(
        elems.map(async (elem) => {
          const resultText = await elem.getText();
          elemObjs.push(resultText);
        })
      );

      return elemObjs;
    } catch (error) {
      console.error(`${error}`);

      const failedMessage = addConsoleColorCode("red", "Failed to execute");
      const erroredMethod = addConsoleColorCode(
        "magenta",
        "PageObject.getElementsText(...)"
      );

      throw new Error(`${failedMessage} -> ${erroredMethod}`);
    }
  }

  protected async scrollToElement(jsonKey: string) {
    try {
      const elem = await this.getElement(jsonKey);

      await this.webDriver.executeScript(
        "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})",
        elem
      );
    } catch (error) {
      console.error(`${error}`);

      const failedMessage = addConsoleColorCode("red", "Failed to execute");
      const erroredMethod = addConsoleColorCode(
        "magenta",
        "PageObject.getElementsText(...)"
      );

      throw new Error(`${failedMessage} -> ${erroredMethod}`);
    }
  }

  protected async getDynamicElement(
    jsonKey: string,
    ...locatorArgs: (string | number)[]
  ) {
    const [locatorType, locatorToFormat] =
      this.getLocatorDataByJsonKey(jsonKey);

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
    ...locatorArgs: string[] | number[]
  ) {
    try {
      const elem = await this.getDynamicElement(jsonKey, ...locatorArgs);

      return elem.getText();
    } catch (error) {
      // TODO - use logging instead of console.error()
      // console.error(`${error}`);

      return null;
    }
  }
}
