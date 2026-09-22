import {
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

import type {
  Request,
} from "express";

type CurrentUserPayload = {
  sub: string;
  email?: string;
  role?: string;
  type?: string;
};

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
              user?: CurrentUserPayload;
            }
          >();

      return request.user;
    },
  );