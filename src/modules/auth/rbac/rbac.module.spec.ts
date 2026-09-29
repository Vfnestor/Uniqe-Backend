import {
  Test,
} from "@nestjs/testing";

import {
  ConfigModule,
} from "@nestjs/config";

import {
  JwtModule,
} from "@nestjs/jwt";

import {
  RbacModule,
} from "./rbac.module";

import {
  RbacService,
} from "./rbac.service";

import {
  RbacController,
} from "./rbac.controller";

describe("RbacModule", () => {
  it("should compile successfully", async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            ignoreEnvFile: true,
            load: [
              () => ({
                JWT_ACCESS_SECRET:
                  "test-secret",
              }),
            ],
          }),

          JwtModule.register({
            secret: "test-secret",
          }),

          RbacModule,
        ],
      }).compile();

    expect(
      moduleRef.get(
        RbacService,
      ),
    ).toBeDefined();

    expect(
      moduleRef.get(
        RbacController,
      ),
    ).toBeDefined();
  });
});