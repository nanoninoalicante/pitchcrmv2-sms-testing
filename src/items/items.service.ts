import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Item, ItemDocument } from "src/schema/items.schema";
import { Model } from "mongoose";
@Injectable()
export class ItemsService {
    constructor(
        @InjectModel(Item.name, "primary")
        private readonly itemModel: Model<ItemDocument>,
    ) {}
    async create(itemName: string, data: any = {}) {
        await this.itemModel.updateOne({ name: itemName }, data, {
            upsert: true,
        });
        return { message: "create", ...data };
    }
    async get(itemName: string) {
        return await this.itemModel.find({ name: itemName });
    }
}
