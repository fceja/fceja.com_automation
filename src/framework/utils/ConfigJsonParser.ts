import fs from "fs";
import addConsoleColorCode from "./ConsoleColorsCodes";

export interface ConfigJsonData {
  logger: {
    logLevel: string;
  };
  webDriver: {
    browserName: string;
    platform: string;
  };
}

export default class ConfigJsonParser {
  /*
   * Creates an instance with parsed config file data.
   */

  private CONFIG_FILE_PATH = "";
  private CONFIG_JSON_DATA: ConfigJsonData = {
    logger: {
      logLevel: "",
    },
    webDriver: {
      browserName: "",
      platform: "",
    },
  };

  constructor() {
    // this.startUp();
    this.getConfigFilePathArg();
    this.validateConfigFilePathArg();
    this.parseConfigFile();
  }
  static getConfigJsonData() {
    const configFileParser = new ConfigJsonParser();

    return configFileParser.CONFIG_JSON_DATA;
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
      throw new Error(
        `${addConsoleColorCode(
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
      throw new Error(
        `${addConsoleColorCode(
          "red",
          "Provided 'CONFIG_FILE_PATH_ARG' file path does not exist"
        )}` +
          `\n${addConsoleColorCode("magenta", "CONFIG_FILE_PATH_ARG")} -> '${
            this.CONFIG_FILE_PATH
          }'`
      );
    }
  }
}
