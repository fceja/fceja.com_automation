import { Builder, WebDriver } from "selenium-webdriver";

export async function initWebDriver() {
  const driver: WebDriver = await new Builder().forBrowser("chrome").build();

  return driver;
}
