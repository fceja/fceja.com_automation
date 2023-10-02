import { PageObject } from "../../../framework/frontEnd/PageObject";

export class ProjectsPageObject extends PageObject {
  async getGreetingText() {
    return await this.getElementText("greeting-text");
  }
}
