import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseInterceptors,
} from "@nestjs/common";
import { ErrorsInterceptor } from "src/interceptors/exception.interceptor";
import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { ItemsService } from "./items.service";
@UseInterceptors(new LoggingInterceptor())
@UseInterceptors(new ResponseInterceptor())
@UseInterceptors(new ErrorsInterceptor())
@Controller("items")
export class ItemsController {
    constructor(protected service: ItemsService) {}
    @Post("/:itemName")
    async create(@Param("itemName") itemName: string, @Body() body: any) {
        return this.service.create(itemName, body);
    }
    @Get("/")
    async getAll() {
        return this.service.getAll();
    }
    @Get("/:itemName")
    async get(@Param("itemName") itemName: string) {
        return this.service.get(itemName);
    }
}
