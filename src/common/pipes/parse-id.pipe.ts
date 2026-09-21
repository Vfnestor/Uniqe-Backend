import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class ParseIdPipe
  implements PipeTransform<string, string>
{
  transform(value: string): string {
    const id =
      value?.trim();

    if (!id) {
      throw new BadRequestException(
        "Invalid ID",
      );
    }

    return id;
  }
}