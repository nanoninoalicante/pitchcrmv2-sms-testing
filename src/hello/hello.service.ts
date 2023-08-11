import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const crypto = require("crypto");
@Injectable()
export class HelloService {
    constructor(protected config: ConfigService) {}
    async getWorld(body: any = {}, params: any = {}) {
        const envExample = this.config.get<string>("ENV_EXAMPLE");
        return { message: "world", ...body, ...params, envExample };
    }
    async getWorldError(body: any = {}, params: any = {}) {
        try {
            throw new Error("testing error response");
        } catch (error) {
            throw error;
        }
    }
    generateHash() {
        function generateHmacWithRandomSalt(message: string) {
            const salt = crypto.randomBytes(16).toString("hex"); // Generate a random 16-byte salt
            const hmac = crypto.createHmac("sha256", salt);
            hmac.update(message);
            const hash = hmac.digest("hex");
            return {
                salt,
                hash,
            };
        }
        return generateHmacWithRandomSalt("hello world");
    }
}
