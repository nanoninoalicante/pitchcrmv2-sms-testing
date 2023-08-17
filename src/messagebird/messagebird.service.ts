import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { initClient } from "messagebird";
@Injectable()
export class MessagebirdService {
    messagebird: any;
    constructor(protected config: ConfigService) {
        this.messagebird = initClient(this.config.get("MESSAGEBIRD_API_KEY"));
    }
    private async sendMessage(input: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.messagebird.messages.create(
                {
                    originator: input.from || "+12035477119",
                    recipients: [input.to || "+34644632342"],
                    body: input.message || "Hello world",
                },
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
        const response = await this.sendMessage(input);
        console.log("SMS sent", response);
        return response;
    }
}
