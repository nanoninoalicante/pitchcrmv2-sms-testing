import { Module } from "@nestjs/common";
import { PinpointSimpleService } from "./pinpoint-simple.service";
import { PinpointSimpleController } from "./pinpoint-simple.controller";

@Module({
    providers: [PinpointSimpleService],
    controllers: [PinpointSimpleController],
})
export class PinpointSimpleModule {}
