import { Builder, WebDriver } from "selenium-webdriver";

import ConfigFileParser from "../utils/configFileParser";
import Logger from "../utils/logger";

interface TestObjectInterface {
  webDriver: WebDriver;
}
export class TestObject implements TestObjectInterface {
  config!: ConfigFileParser;
  webDriver!: WebDriver;
  logger!: Logger;

  constructor() {
    this.startUp();
  }

  startUp() {
    this.initConfigFile();
    this.initWebDriver();
    this.initLogger();
  }

  tearDown() {
    this.webDriver.quit();
  }

  initConfigFile() {
    this.config = new ConfigFileParser();
  }

  initWebDriver() {
    this.webDriver = new Builder()
      .forBrowser(this.config.CONFIG_JSON_DATA.browserName)
      .build();
  }

  initLogger() {
    this.logger = new Logger(this.config.CONFIG_JSON_DATA.logLevel);
  }
}
