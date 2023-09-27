import { Builder, WebDriver } from "selenium-webdriver";

import ConfigFileParser from "../utils/ConfigFileParser";
import Logger from "../utils/Logger";

export class TestObject {
  private webDriverBuilder!: Builder;

  webDriver!: WebDriver;
  config!: ConfigFileParser;
  logger!: Logger;

  constructor() {
    this.initConfigFile();
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

    const capabilities = {
      browserName: this.config.CONFIG_JSON_DATA.webDriver.browserName,
      platform: this.config.CONFIG_JSON_DATA.webDriver.platform,
    };

    this.webDriverBuilder = new Builder().withCapabilities(capabilities);
  }

  private initConfigFile() {
    this.config = new ConfigFileParser();
  }

  private initLogger() {
    this.logger = new Logger(this.config.CONFIG_JSON_DATA.logLevel);
  }

  async startUp() {
    await this.buildWebDriver();
  }

  async tearDown() {
    await this.webDriver.quit();
  }
}
