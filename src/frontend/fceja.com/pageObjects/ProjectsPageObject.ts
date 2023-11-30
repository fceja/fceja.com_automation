import { PageObject } from "@framework/frontEnd/PageObject";

export class ProjectsPageObject extends PageObject {
  async getGreetingText() {
    return await this.getElementText("greeting_text");
  }

  async getCardLength() {
    return (await this.getElements("cards")).length;
  }

  async getCardDataByIndex(index: number) {
    return {
      cardTitle: await this.getDynamicElementText("cardTitle", index),
      cardDescription: await this.getDynamicElementText(
        "cardDescription",
        index
      ),
      cardUrlLink: await this.getDynamicElementAttribute(
        "cardUrlLink",
        "href",
        index
      ),
      cardGitHubLink: await this.getDynamicElementAttribute(
        "cardGitHubLink",
        "href",
        index
      ),
    };
  }
}
