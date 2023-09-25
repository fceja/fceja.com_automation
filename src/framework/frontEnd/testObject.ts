import { Builder, WebDriver } from "selenium-webdriver";

interface TestObjectInterface {
  driver: WebDriver;
}
export class TestObject implements TestObjectInterface {
  driver!: WebDriver;

  constructor() {
    this.startUp();
  }

  startUp() {
    this.driver = new Builder().forBrowser("chrome").build();
  }

  tearDown() {
    this.driver.quit();
  }
}
