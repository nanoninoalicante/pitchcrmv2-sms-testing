import { Global, Module } from "@nestjs/common";
import { PostmarkService } from "./postmark.service";
import { PostmarkController } from "./postmark.controller";
@Global()
@Module({
    providers: [PostmarkService],
    controllers: [PostmarkController],
})
export class PostmarkModule {}
