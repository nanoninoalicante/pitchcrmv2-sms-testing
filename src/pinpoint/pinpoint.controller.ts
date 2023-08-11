import { Controller, Post, UseInterceptors } from "@nestjs/common";
import { ErrorsInterceptor } from "src/interceptors/exception.interceptor";
import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { PinpointService } from "./pinpoint.service";
@UseInterceptors(new LoggingInterceptor())
@UseInterceptors(new ResponseInterceptor())
@UseInterceptors(new ErrorsInterceptor())
@Controller("pinpoint")
export class PinpointController {
    constructor(protected service: PinpointService) {}
    @Post("v3")
    async sendSMSV3() {
        return await this.service.sendSMSV3();
    }
}
