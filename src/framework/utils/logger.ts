import { startCase } from "lodash";
import * as consoleTextColors from "./consoleTextColors";

enum LogLevel {
  Info,
  Debug,
}

export default class Logger {
  logLevel: LogLevel;

  constructor(logLevel: string) {
    this.logLevel = this.mapLogLevel(logLevel);
  }

  private mapLogLevel(logLevel: string): LogLevel {
    switch (startCase(logLevel)) {
      case "Info":
        return LogLevel.Info;
      case "Debug":
        return LogLevel.Debug;
      default:
        throw new Error(
          `${consoleTextColors.RED}Invalid logLevel provided.${consoleTextColors.RESET}` +
            `\n${consoleTextColors.MAGENTA}logLevel${consoleTextColors.RESET} -> '${logLevel}`
        );
    }
  }

  info(message: string) {
    if (this.logLevel >= LogLevel.Info) {
      console.log(`[Info]: ${message}`);
    }
  }

  debug(message: string) {
    if (this.logLevel >= LogLevel.Debug) {
      console.log(`[Debug]: ${message}`);
    }
  }
}
