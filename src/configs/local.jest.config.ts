export default {
  roots: ["<rootDir>/../.."],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testTimeout: 15000,
  moduleFileExtensions: ["ts", "js"],
  setupFilesAfterEnv: ["./local.jest.setup.ts"],
  verbose: true,
  moduleNameMapper: {
    "^@fceja.com/(.*)$": "<rootDir>/../frontend/fceja.com/$1",
    "^@framework/(.*)$": "<rootDir>/../framework/$1",
    "^@properties/(.*)$": "<rootDir>/../properties/$1",
    "^@selenium.com/(.*)$": "<rootDir>/../frontend/selenium.com/$1",
    "^@utils/(.*)$": "<rootDir>/../utils/$1",
  },
};
