import { Injectable } from "@nestjs/common";

@Injectable()
export class HelloService {
    async getWorld(body: any = {}, params: any = {}) {
        return { message: "world", ...body, ...params };
    }
    async getWorldError(body: any = {}, params: any = {}) {
        try {
            throw new Error("testing error response");
        } catch (error) {
            throw error;
        }
    }
}
