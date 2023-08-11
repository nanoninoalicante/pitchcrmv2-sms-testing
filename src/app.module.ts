import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HelloModule } from "./hello/hello.module";
import { ConfigModule } from "@nestjs/config";
import { PinpointModule } from './pinpoint/pinpoint.module';
import { EmailModule } from './email/email.module';
import { PinpointSimpleModule } from './pinpoint-simple/pinpoint-simple.module';

@Module({
    imports: [
        HelloModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: false,
        }),
        PinpointModule,
        EmailModule,
        PinpointSimpleModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
