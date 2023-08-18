import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { initClient } from "messagebird";
@Injectable()
export class MessagebirdService {
    messagebird: any;
    private smsOriginatorChannelId: any;
    constructor(protected config: ConfigService) {
        this.messagebird = initClient(this.config.get("MESSAGEBIRD_API_KEY"));
        this.smsOriginatorChannelId = this.config.get("MESSAGEBIRD_CHANNEL_ID");
    }
    private async sendSMSMessage(input: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const params = {
                type: "text",
                from: input.from || this.smsOriginatorChannelId,
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
