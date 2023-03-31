import { Global, Module } from "@nestjs/common";
import { HelloService } from "./hello.service";
import { HelloController } from "./hello.controller";

@Global()
@Module({
    providers: [HelloService],
    controllers: [HelloController],
})
export class HelloModule {}
