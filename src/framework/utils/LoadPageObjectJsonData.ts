interface LocatorData {
  locator: string;
  argument: string;
}

export type PageObjectJsonData = Record<string, LocatorData>;

export class LoadPageObjectJsonData {
  static loadPageObjectJsonData() {
    const loadPageObject = new LoadPageObjectJsonData();

    const childPageObjectJsonFilePath =
      loadPageObject.getChildPageObjectJsonFilePath();

    if (!childPageObjectJsonFilePath) {
      throw Error(
        `Invalid 'pageObjectJsonFilePath' -> ${childPageObjectJsonFilePath}`
      );
    }

    const jsonData = require(childPageObjectJsonFilePath);

    return jsonData;
  }

  private getChildPageObjectJsonFilePath() {
    const callStackData = this.getCallStackData();
    const childPageObjectFilePath =
      this.parseChildPageObjectFilePathFromCallStackData(callStackData);

    const childPageObjectJsonFilePath = childPageObjectFilePath
      ?.split(":")[0]
      .replace(".ts", ".json");

    return childPageObjectJsonFilePath;
  }

  private getCallStackData() {
    const callStack = {} as any;

    Error.captureStackTrace(callStack, this.getCallStackData);

    const callStackData = callStack.stack.split("\n");

    return callStackData;
  }

  private parseChildPageObjectFilePathFromCallStackData(callStackData: string) {
    /*
     * TODO - need to verify this does not break when multiple child page objects are called
     */
    const childPageObjectCallStackLine = Object.values(callStackData).find(
      (elem) => {
        return elem.indexOf("pageObjects") !== -1;
      }
    );

    const matchResult = childPageObjectCallStackLine?.match(/\(([^)]+)\)/);

    const childPageObjectFilePath = Object.values(matchResult as string[]).find(
      (elem) => {
        return elem.indexOf("(") === -1;
      }
    );

    if (!childPageObjectFilePath) {
      throw Error(
        `Invalid 'childPageObjectFilePath' -> ${childPageObjectFilePath}`
      );
    }

    return childPageObjectFilePath;
  }
}
