import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ErrorsInterceptor } from "src/interceptors/exception.interceptor";
import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { PinpointSimpleService } from "./pinpoint-simple.service";
@UseInterceptors(new LoggingInterceptor())
@UseInterceptors(new ResponseInterceptor())
@UseInterceptors(new ErrorsInterceptor())
@Controller("pinpoint-simple")
export class PinpointSimpleController {
    constructor(protected service: PinpointSimpleService) {}
    @Post("v3")
    async sendSMSV3(@Body("destinationPhone") destinationPhone: string) {
        return await this.service.sendSMSV3({ destinationPhone });
    }
}
