import { Builder, WebDriver } from "selenium-webdriver";

import ConfigFileParser from "../utils/configFileParser";

interface TestObjectInterface {
  driver: WebDriver;
}
export class TestObject implements TestObjectInterface {
  configFile!: ConfigFileParser;
  driver!: WebDriver;

  constructor() {
    this.startUp();
  }

  startUp() {
    this.initConfigFile();
    this.initDriver();
  }

  tearDown() {
    this.driver.quit();
  }

  initConfigFile() {
    this.configFile = new ConfigFileParser();
  }

  initDriver() {
    this.driver = new Builder()
      .forBrowser(this.configFile.CONFIG_JSON_DATA.browserName)
      .build();
  }
}
