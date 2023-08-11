import { Global, Module } from "@nestjs/common";
import { PinpointService } from "./pinpoint.service";
import { PinpointController } from "./pinpoint.controller";
@Global()
@Module({
    providers: [PinpointService],
    controllers: [PinpointController],
})
export class PinpointModule {}
