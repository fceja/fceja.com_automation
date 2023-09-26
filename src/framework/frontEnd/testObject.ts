import { Builder, WebDriver } from "selenium-webdriver";

import ConfigFileParser from "../utils/ConfigFileParser";
import Logger from "../utils/Logger";

export class TestObject {
  config!: ConfigFileParser;
  logger!: Logger;
  webDriver!: WebDriver;

  constructor() {
    this.initConfigFile();
    this.initLogger();
  }

  async startUp() {
    await this.initWebDriver();
  }

  async tearDown() {
    await this.webDriver.quit();
  }

  initConfigFile() {
    this.config = new ConfigFileParser();
  }

  initLogger() {
    this.logger = new Logger(this.config.CONFIG_JSON_DATA.logLevel);
  }

  async initWebDriver() {
    // ref: https://www.selenium.dev/documentation/legacy/json_wire_protocol/#capabilities-json-object
    const capabilities = {
      browserName: this.config.CONFIG_JSON_DATA.webDriver.browserName,
      platform: this.config.CONFIG_JSON_DATA.webDriver.platform,
    };

    this.webDriver = await new Builder().withCapabilities(capabilities).build();
  }
}
