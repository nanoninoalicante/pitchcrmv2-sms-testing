import { Global, Module } from "@nestjs/common";
import { MessagebirdService } from "./messagebird.service";
import { MessagebirdController } from "./messagebird.controller";
import { ConfigModule } from "@nestjs/config";
@Global()
@Module({
    imports: [ConfigModule],
    providers: [MessagebirdService],
    controllers: [MessagebirdController],
    exports: [MessagebirdService],
})
export class MessagebirdModule {}
