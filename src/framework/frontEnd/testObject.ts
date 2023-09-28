import { Builder, WebDriver } from "selenium-webdriver";

import ConfigJsonParser, { ConfigJsonData } from "../utils/ConfigJsonParser";
import Logger from "../utils/Logger";

export class TestObject {
  private webDriverBuilder!: Builder;

  webDriver!: WebDriver;
  configData!: ConfigJsonData;
  logger!: Logger;

  constructor() {
    this.getConfigFileData();
    this.initLogger();
    this.configureWebDriverBuilder();
  }

  private async buildWebDriver(): Promise<void> {
    this.webDriver = await this.webDriverBuilder.build();
  }

  private configureWebDriverBuilder() {
    /*
     * ref: https://www.selenium.dev/documentation/legacy/json_wire_protocol/#capabilities-json-object
     */

    const webDriverConfig = this.configData.webDriver;
    const capabilities = {
      browserName: webDriverConfig.browserName,
      platform: webDriverConfig.platform,
    };

    this.webDriverBuilder = new Builder().withCapabilities(capabilities);
  }

  private getConfigFileData() {
    this.configData = ConfigJsonParser.getConfigJsonData();
  }

  private initLogger() {
    const loggerConfig = this.configData.logger;
    this.logger = new Logger(loggerConfig.logLevel);
  }

  async startUp() {
    await this.buildWebDriver();
  }

  async tearDown() {
    await this.webDriver.quit();
  }
}
