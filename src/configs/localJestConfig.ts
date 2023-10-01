export default {
  roots: ["<rootDir>/../"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testTimeout: 15000,
  moduleFileExtensions: ["ts", "js"],
  verbose: true,
};
