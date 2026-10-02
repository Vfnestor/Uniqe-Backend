import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import {
  Request,
  Response,
} from "express";

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: unknown,
    host: ArgumentsHost,
  ) {
    const context =
      host.switchToHttp();

    const response =
      context.getResponse<Response>();

    const request =
      context.getRequest<Request>();

    const status =
      exception instanceof
      HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof
      HttpException
        ? exception.getResponse()
        : null;

    let message =
      "Internal server error";

    if (
      typeof exceptionResponse ===
      "string"
    ) {
      message =
        exceptionResponse;
    }

    if (
      typeof exceptionResponse ===
      "object" &&
      exceptionResponse !== null &&
      "message" in
        exceptionResponse
    ) {
      const value =
        (
          exceptionResponse as {
            message?:
              | string
              | string[];
          }
        ).message;

      if (Array.isArray(value)) {
        message =
          value.join(", ");
      } else if (
        typeof value === "string"
      ) {
        message = value;
      }
    }

    // Log unexpected errors so the
    // real cause is visible in Render.
    if (
      !(
        exception instanceof
        HttpException
      )
    ) {
      console.error(
        "===== UNHANDLED EXCEPTION =====",
      );

      if (
        exception instanceof Error
      ) {
        console.error(
          "Name:",
          exception.name,
        );

        console.error(
          "Message:",
          exception.message,
        );

        console.error(
          "Stack:",
          exception.stack,
        );
      } else {
        console.error(
          "Exception:",
          exception,
        );
      }

      console.error(
        "Method:",
        request.method,
      );

      console.error(
        "Path:",
        request.url,
      );

      console.error(
        "===== END UNHANDLED EXCEPTION =====",
      );
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp:
        new Date().toISOString(),
    });
  }
}