export class ConfigFileParser {
  /*
   * Creates an instance with parsed config file data.
   */

  CONFIG_FILE_PATH = "";

  constructor() {
    this.startUp();
  }

  startUp() {
    this.getConfigFilePathArg();
  }

  getConfigFilePathArg() {
    /*
     * - Parses 'CONFIG_FILE_PATH_ARG' from the command line arguments,
     *   and stores it in the 'CONFIG_FILE_PATH' property.
     * - Throws an error if not provided.
     *
     * - Example CLI usage:
     *   - tsc && node {path_to_test_file} CONFIG_FILE_PATH_ARG={path_to_config_file}
     *   - tsc && node dist/frontend/tests/firstTest.js CONFIG_FILE_PATH_ARG=configs/localConfig.json
     */

    const configFilePathArg = process.argv.find((arg) =>
      arg.startsWith("CONFIG_FILE_PATH_ARG")
    );

    if (!configFilePathArg) {
      throw Error("Please set 'CONFIG_FILE_PATH_ARG' in cli command");
    }

    this.CONFIG_FILE_PATH = configFilePathArg.split("=")[1];
  }
}
