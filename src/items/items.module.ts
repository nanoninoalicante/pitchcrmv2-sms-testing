import { Module } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Item, ItemSchema } from "src/schema/items.schema";

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature(
            [{ name: Item.name, schema: ItemSchema }],
            "primary",
        ),
    ],
    providers: [ItemsService],
    controllers: [ItemsController],
    exports: [ItemsService],
})
export class ItemsModule {}
