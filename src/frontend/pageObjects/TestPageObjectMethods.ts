import { WebDriver } from "selenium-webdriver";

import { PageObject } from "../../framework/frontEnd/PageObject";

export class TestPageObjectMethods extends PageObject {
  constructor(webDriver: WebDriver) {
    super(webDriver);
  }

  async getTitleText() {
    const elemText = await this.getElementText("title");
    return elemText;
  }

  async getParagraphsText() {
    const elements = await this.getElementsText("paragraphs");
    return elements;
  }

  async getSubTitleParagraphText(subTitle: string) {
    const elemText = await this.getDynamicElementText(
      "subTitleParagraph",
      subTitle
    );
    return elemText;
  }
}
