const COLOR_CODES: { [key: string]: string } = {
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  MAGENTA: "\x1b[35m",
  CYAN: "\x1b[36m",
};

const RESET = "\x1b[0m";

export default function addColorCodeToString(
  color: string,
  inputString: string
) {
  /*
   * - Wraps a string with color code for terminal output.
   * - It uses the following format -> `{color}{inputString}{reset}`
   * - note:
   *    - {color} identifies the start of color application for text in terminal
   *    - {reset} identifies the end of color application for text in terminal
   *    - if {color} is applied and {reset} is not, all terminal text after start point will have color applied
   */
  const wrappedString = `${
    COLOR_CODES[color.toUpperCase()]
  }${inputString}${RESET}`;

  return wrappedString;
}
