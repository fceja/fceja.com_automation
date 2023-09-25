import fs from "fs";
import * as consoleTextColors from "./consoleTextColors";

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
    this.validateConfigFilePathArg();
    this.parseConfigFile();
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
     * - Parses 'CONFIG_FILE_PATH_ARG' from the command line arguments,
     *   and stores it in the 'CONFIG_FILE_PATH' property.
     * - Throws an error if not provided.
     *
     * - Example CLI usage:
     *   - tsc && node {path_to_test_file} CONFIG_FILE_PATH_ARG={path_to_config_file}
     *   - tsc && node dist/frontend/tests/firstTest.js CONFIG_FILE_PATH_ARG=configs/localConfig.json
     */

    // parse cli arguments
    const configFilePathArg = process.argv.find((arg) =>
      arg.startsWith("CONFIG_FILE_PATH_ARG")
    );

    // validate 'CONFIG_FILE_PATH_ARG' arg was set in cli command
    if (!configFilePathArg) {
      throw Error("Please set 'CONFIG_FILE_PATH_ARG' in CLI command");
    }

    // store config file path
    this.CONFIG_FILE_PATH = configFilePathArg.split("=")[1];

    // validate file exists
    if (!fs.existsSync(this.CONFIG_FILE_PATH)) {
      throw Error(
        `${consoleTextColors.RED}Provided file path does not exist.${consoleTextColors.RESET}` +
          `\n${consoleTextColors.MAGENTA}CONFIG_FILE_PATH_ARG${consoleTextColors.RESET} -> '${this.CONFIG_FILE_PATH}'`
      );
    }
  }
}
