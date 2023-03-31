import { Injectable } from "@nestjs/common";

@Injectable()
export class HelloService {
    async getWorld(body: any = {}, params: any = {}) {
        return { message: "world", ...body, ...params };
    }
}
