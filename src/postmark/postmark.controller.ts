import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ErrorsInterceptor } from "src/interceptors/exception.interceptor";
import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { PostmarkService } from "./postmark.service";
@UseInterceptors(new LoggingInterceptor())
@UseInterceptors(new ResponseInterceptor())
@UseInterceptors(new ErrorsInterceptor())
@Controller("postmark")
export class PostmarkController {
    constructor(protected service: PostmarkService) {}
    @Post()
    async sendEmail(@Body() body: any = {}) {
        return await this.service.sendEmail({ ...body });
    }
}
