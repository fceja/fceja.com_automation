import { startCase } from "lodash";
import addColorCodeToString from "./consoleTextColors";

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
          `${addColorCodeToString(
            "red",
            "Invalid 'logLevel' value provided"
          )}` +
            `\n${addColorCodeToString("magenta", "logLevel")} -> '${logLevel}`
        );
    }
  }

  info(message: string) {
    if (this.logLevel >= LogLevel.Info) {
      console.log(`[${addColorCodeToString("cyan", "Info")}]: ${message}`);
    }
  }

  debug(message: string) {
    if (this.logLevel >= LogLevel.Debug) {
      console.log(`[${addColorCodeToString("yellow", "Debug")}]: ${message}`);
    }
  }
}
