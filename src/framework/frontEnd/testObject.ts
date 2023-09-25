import { Builder, WebDriver } from "selenium-webdriver";

interface TestObjectInterface {
  driver: WebDriver;
}
export class TestObject implements TestObjectInterface {
  driver: WebDriver;

  constructor() {
    this.driver = new Builder().forBrowser("chrome").build();
  }
}
