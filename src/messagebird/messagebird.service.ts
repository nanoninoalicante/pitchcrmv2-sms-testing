import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { initClient } from "messagebird";
@Injectable()
export class MessagebirdService {
    messagebird: any;
    constructor(protected config: ConfigService) {
        this.messagebird = initClient(this.config.get("MESSAGEBIRD_API_KEY"));
    }
    private async sendSMSMessage(input: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const params = {
                type: "text",
                from: input.from || "aa213b01b6ed4df3b0764d4c0ce23554",
                to: input.to || "+34644632342",
                content: {
                    text: input.message || "Hello world",
                },
            };
            this.messagebird.conversations.send(
                params,
                (err: any, response: any) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    console.log("SMS sent", response);
                    return resolve(response);
                },
            );
        });
    }
    async sendSms(input: any): Promise<any> {
        console.log(
            `Sending SMS to ${input.to} with message: ${input.message}`,
        );
        const response = await this.sendSMSMessage(input);
        console.log("SMS sent", response);
        return response;
    }
}
