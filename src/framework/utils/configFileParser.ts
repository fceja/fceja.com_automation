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
      throw Error(
        `${addColorCodeToString(
          "red",
          "Please provide 'CONFIG_FILE_PATH_ARG' command line argument"
        )}`
      );
    }

    // store config file path
    this.CONFIG_FILE_PATH = configFilePathArg.split("=")[1];

    // validate file exists
    if (!fs.existsSync(this.CONFIG_FILE_PATH)) {
      throw Error(
        `${addColorCodeToString(
          "red",
          "Provided config file path does not exist"
        )}` +
          `\n${addColorCodeToString("magenta", "CONFIG_FILE_PATH_ARG")} -> '${
            this.CONFIG_FILE_PATH
          }'`
      );
    }
  }
}
