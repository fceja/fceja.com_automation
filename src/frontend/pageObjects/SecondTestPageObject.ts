import { WebDriver } from "selenium-webdriver";

import { PageObject } from "../../framework/frontEnd/PageObject";

export class SecondTestPageObject extends PageObject {
  constructor(webDriver: WebDriver) {
    super(webDriver);
  }

  async getTitleText() {
    const elemText = await this.getElementText("title");
    return elemText;
  }
}
