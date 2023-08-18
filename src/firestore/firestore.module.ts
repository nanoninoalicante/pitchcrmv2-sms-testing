import { Module } from "@nestjs/common";
import { FirestoreService } from "./firestore.service";
import { FirestoreController } from "./firestore.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    providers: [FirestoreService],
    controllers: [FirestoreController],
})
export class FirestoreModule {}
