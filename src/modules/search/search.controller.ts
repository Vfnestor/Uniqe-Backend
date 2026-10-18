import {
  Controller,
  Get,
  Query,
} from "@nestjs/common";

import {
  Public,
} from "../../common/decorators";

import {
  SearchQueryDto,
} from "./dto/search-query.dto";

import {
  SearchService,
} from "./search.service";

@Controller("search")
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
  ) {}

  @Get()
  @Public()
  async search(
    @Query()
    query: SearchQueryDto,
  ) {
    return this.searchService.search(
      query,
    );
  }
}