import { startCase } from "lodash";
import addConsoleColorCode from "./ConsoleColorsCodes";

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
          `${addConsoleColorCode(
            "red",
            "Invalid 'logLevel' value provided"
          )}` +
            `\n${addConsoleColorCode("magenta", "logLevel")} -> '${logLevel}`
        );
    }
  }

  info(message: string) {
    if (this.logLevel >= LogLevel.Info) {
      console.log(`[${addConsoleColorCode("cyan", "Info")}]: ${message}`);
    }
  }

  debug(message: string) {
    if (this.logLevel >= LogLevel.Debug) {
      console.log(`[${addConsoleColorCode("yellow", "Debug")}]: ${message}`);
    }
  }
}
