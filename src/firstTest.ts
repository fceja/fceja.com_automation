import { initWebDriver } from "./framework/frontEnd/testObject";

async function main() {
  const driver = await initWebDriver();

  await driver.get("https://www.google.com");

  await driver.quit();
}

main();
