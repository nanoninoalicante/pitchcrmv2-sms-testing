import { Injectable } from "@nestjs/common";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
    sesv2Client: any;
    constructor(protected config: ConfigService) {
        this.sesv2Client = new SESv2Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: this.config.get("AWS_ACCESS_KEY_ID"),
                secretAccessKey: this.config.get("AWS_SECRET_ACCESS_KEY"),
            },
        });
    }
    async sendEmailV3() {
        const params = {
            FromEmailAddress: "test@pitchcrm.com",
            Destination: {
                ToAddresses: ["cjameshill@gmail.com"],
            },
            Content: {
                Simple: {
                    Subject: {
                        Data: "Testing Sending From V3",
                    },
                    Body: {
                        Text: {
                            Data: "EMAIL_BODY",
                        },
                    },
                },
            },
            ConfigurationSetName: "prod-v3-Green-PitchCRM-DynamicCampaigns",
        };

        const sendEmailCommand = new SendEmailCommand(params);
        try {
            const response = await this.sesv2Client.send(sendEmailCommand);
            console.log("Email sent successfully:", response);
            return response;
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}
