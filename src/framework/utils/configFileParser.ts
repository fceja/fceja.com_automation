import fs from "fs";
import addColorCodeToString from "./consoleTextColors";

interface ConfigJsonData {
  browserName: string;
  logLevel: string;
}

export default class ConfigFileParser {
  /*
   * Creates an instance with parsed config file data.
   */

  CONFIG_FILE_PATH = "";
  CONFIG_JSON_DATA: ConfigJsonData = {
    browserName: "",
    logLevel: "",
  };

  constructor() {
    this.startUp();
  }

  startUp() {
    this.getConfigFilePathArg();
    this.validateConfigFilePathArg();
    this.parseConfigFile();
  }

  getConfigFilePathArg() {
    /*
     * - Parses 'CONFIG_FILE_PATH_ARG' from the command line arguments,
     *   and stores it in the 'CONFIG_FILE_PATH' property.
     * - Throws an error if not provided.
     *
     * - Example cli usage:
     *   - tsc && node {path_to_test_file} CONFIG_FILE_PATH_ARG={path_to_config_file}
     *   - tsc && node dist/frontend/tests/firstTest.js CONFIG_FILE_PATH_ARG=configs/localConfig.json
     */
    // get 'testEnvironmentOptions' cli argument
    const configFilePathArg = process.argv.find((arg) =>
      arg.startsWith("--testEnvironmentOptions=")
    );

    // parse argument for config file path
    const configFilePath = configFilePathArg?.split("CONFIG_FILE_PATH_ARG:")[1];

    // validate 'CONFIG_FILE_PATH_ARG' arg was set in cli command
    if (!configFilePath) {
      throw Error(
        `${addColorCodeToString(
          "red",
          "Please provide '--testEnvironmentOptions=\"CONFIG_FILE_PATH_ARG:{path_to_config}\"' in command line"
        )}`
      );
    }

    // store config file path
    this.CONFIG_FILE_PATH = configFilePath;
  }

  parseConfigFile() {
    /*
     * - Parse and stores config file json props in instance
     */
    const configDataJson = require(this.CONFIG_FILE_PATH);

    this.CONFIG_JSON_DATA = {
      ...this.CONFIG_JSON_DATA,
      ...configDataJson,
    };
  }

  validateConfigFilePathArg() {
    /*
     * - Validates 'CONFIG_FILE_PATH_ARG' file path exists
     */
    if (!fs.existsSync(this.CONFIG_FILE_PATH)) {
      throw Error(
        `${addColorCodeToString(
          "red",
          "Provided 'CONFIG_FILE_PATH_ARG' file path does not exist"
        )}` +
          `\n${addColorCodeToString("magenta", "CONFIG_FILE_PATH_ARG")} -> '${
            this.CONFIG_FILE_PATH
          }'`
      );
    }
  }
}
