import { TestObject } from "../../framework/frontEnd/testObject";

const testObject = new TestObject();

beforeAll(async () => {
  await testObject.startUp();
});

afterAll(async () => {
  await testObject.tearDown();
});

describe("Jest Tests", () => {
  test("Jest test 1", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
});
