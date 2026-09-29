import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";

import {
  Reflector,
} from "@nestjs/core";

import {
  IS_PUBLIC_KEY,
} from "../decorators";

import {
  JwtAuthGuard,
} from "../../modules/auth/guards";

@Injectable()
export class GlobalAuthGuard
  implements CanActivate
{
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtAuthGuard: JwtAuthGuard,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const isPublic =
      this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    if (isPublic) {
      return true;
    }

    return this.jwtAuthGuard.canActivate(
      context,
    );
  }
}