import {
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

import type {
  Request,
} from "express";

import type {
  JwtAccessPayload,
} from "../auth.types";

export const CurrentUser =
  createParamDecorator(
    (
      _data: unknown,
      context: ExecutionContext,
    ) => {
      const request =
        context
          .switchToHttp()
          .getRequest<
            Request & {
              user?: JwtAccessPayload;
            }
          >();

      return request.user;
    },
  );