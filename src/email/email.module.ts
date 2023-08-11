import { Global, Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { EmailController } from "./email.controller";
import { ConfigModule } from "@nestjs/config";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [EmailService],
    controllers: [EmailController],
})
export class EmailModule {}
