import { TestObject } from "../../framework/frontEnd/testObject";

const testObject = new TestObject();

beforeAll(() => {});

afterAll(() => {});

describe("secondTestJest", () => {
  test("testing jest", () => {
    testObject.tearDown();
  });
});
