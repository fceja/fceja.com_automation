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
    this.webDriver = await new Builder()
      .forBrowser(this.config.CONFIG_JSON_DATA.browserName)
      .build();
  }
}
