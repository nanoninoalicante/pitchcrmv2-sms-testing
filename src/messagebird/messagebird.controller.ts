import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ErrorsInterceptor } from "src/interceptors/exception.interceptor";
import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { MessagebirdService } from "./messagebird.service";
@UseInterceptors(new LoggingInterceptor())
@UseInterceptors(new ResponseInterceptor())
@UseInterceptors(new ErrorsInterceptor())
@Controller("messagebird")
export class MessagebirdController {
    constructor(protected service: MessagebirdService) {}
    @Post()
    async sendSms(@Body() body: any = {}) {
        return await this.service.sendSms({ ...body });
    }
}
