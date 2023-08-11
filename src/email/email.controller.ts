import { Controller, Post, UseInterceptors } from "@nestjs/common";
import { ErrorsInterceptor } from "src/interceptors/exception.interceptor";
import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { EmailService } from "./email.service";

@UseInterceptors(new LoggingInterceptor())
@UseInterceptors(new ResponseInterceptor())
@UseInterceptors(new ErrorsInterceptor())
@Controller("email")
export class EmailController {
    constructor(protected service: EmailService) {}
    @Post("v3")
    async sendEmailV3() {
        return await this.service.sendEmailV3();
    }
}
