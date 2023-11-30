# Description
Automation tests using TypeScript, Selenium WebDriver, and Jest framework.

Automation tests for -> [fceja.com](https://fceja.com).
</br>
</br>

# Installation
![](https://img.shields.io/badge/OS-Linux-informational?style=flat&logo=linux&logoColor=white&color=eaeaea)
![](https://shields.io/badge/OS-MacOS-informational?style=flat&logo=Apple&logoColor=white&color=eaeaea)
1. Clone repo
2. Install Node
   - ```https://nodejs.org/en/download```
3. At project root, in terminal run:
   - ```npm install```
   - This will install all project package dependencies
4. Make adjustments to - ```fceja.com_automation/src/configs/local.jest.setup.ts```
   - Replace ```{path_to_repo}``` to actual path where repo is located.
      - ```
        process.env.CONFIG_FILE_PATH_ARG = "{path_to_repo}/fceja.com_automation/src/configs/local.config.json";
        ```

# Test Execution
1. To execute all tests:
   - at project root, in terminal run:
      - ```tsc && npx jest  --config={path_to_repo}/fceja.com_automation/src/configs/local.jest.config.ts --maxWorkers=1```
      - Note, make sure to replace ```{path_to_repo}``` with actual path to repo (same as step #4 in Installation section)

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
     />
   </a>
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
     />
   </a>
   <a href="https://jestjs.io/" target="_blank" rel="noreferrer">
     <img
       src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg"
       alt="jest"
       width="40"
       height="40"
     />
   </a>
</p>
