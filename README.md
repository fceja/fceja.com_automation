# Description
Automation tests using TypeScript, Selenium WebDriver, and Jest framework.

Automation tests for -> [fceja.com v1](http://dev.client.fceja.s3-website-us-west-1.amazonaws.com/).
</br>
</br>

# Installation
![](https://img.shields.io/badge/OS-Linux%20%7C%20MacOS%20%7C%20Windows-eaeaea)
1. Install Node
   - ```
     https://nodejs.org/en/download
     ```
2. Clone repo
3. Install dependencies, at project root run:
   - ```
     npm install
     ```
4. Navigate to and open ```fceja.com_automation/src/configs/local.jest.setup.ts```
   - ```
     process.env.CONFIG_FILE_PATH_ARG = "{path_to_repo}/fceja.com_automation/src/configs/local.config.json";
     ```
   - Replace ```{path_to_repo}``` to actual path to repo.

# Test Execution
1. To execute all tests, at project root run:
   - ```
     tsc && npx jest  --config={path_to_repo}/fceja.com_automation/src/configs/local.jest.config.ts --maxWorkers=1
     ```
   - Replace ```{path_to_repo}``` to actual path to repo.

# Technologies & Tools
<p>
   <a
     href="https://www.typescriptlang.org/"
     target="_blank"
     rel="noreferrer"
     style="text-decoration: none"
   >
     <img
       src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
       alt="typescript"
       width="40"
       height="40"
     /></a>
   <a
     href="https://www.selenium.dev/documentation/webdriver/"
     target="_blank"
     rel="noreferrer"
   >
     <img
       src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg"
       alt="selenium"
       width="40"
       height="40"
     /></a>
   <a href="https://jestjs.io/" target="_blank" rel="noreferrer">
     <img
       src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg"
       alt="jest"
       width="40"
       height="40"
     /></a>
</p>
