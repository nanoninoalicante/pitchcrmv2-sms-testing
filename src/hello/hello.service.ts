import { Injectable } from "@nestjs/common";

@Injectable()
export class HelloService {
    async getWorld() {
        return { message: "world" };
    }
}
