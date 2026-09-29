import {
  HealthController,
} from "./health.controller";

describe("HealthController", () => {
  let controller: HealthController;

  beforeEach(() => {
    controller =
      new HealthController();
  });

  it("should return healthy status", () => {
    const result =
      controller.check();

    expect(result.status).toBe(
      "ok",
    );

    expect(result.service).toBe(
      "Uniqe Backend",
    );

    expect(
      result.timestamp,
    ).toBeDefined();
  });
});