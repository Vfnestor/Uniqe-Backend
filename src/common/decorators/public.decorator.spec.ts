import {
  IS_PUBLIC_KEY,
  Public,
} from "./public.decorator";

describe("Public Decorator", () => {
  it("should mark a route as public", () => {
    class TestController {
      @Public()
      test() {}
    }

    const metadata =
      Reflect.getMetadata(
        IS_PUBLIC_KEY,
        TestController.prototype.test,
      );

    expect(metadata).toBe(true);
  });
});