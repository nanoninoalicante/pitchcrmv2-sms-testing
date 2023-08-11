import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
    PinpointSMSVoiceV2Client,
    SendTextMessageCommand,
    SendTextMessageCommandInput,
} from "@aws-sdk/client-pinpoint-sms-voice-v2";
// Set up AWS Pinpoint client

@Injectable()
export class PinpointSimpleService {
    pinpoint: any;
    pinpointV3: PinpointSMSVoiceV2Client;
    constructor(protected config: ConfigService) {
        this.pinpointV3 = new PinpointSMSVoiceV2Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: this.config.get("GREATKNOX_AWS_ACCESS_KEY_ID"),
                secretAccessKey: this.config.get(
                    "GREATKNOX_AWS_SECRET_ACCESS_KEY",
                ),
            },
        });
    }
    async sendSMSV3(params: any) {
        const OriginationNumber = "+18449892713";
        // Specify the phone number you want to send the SMS to
        const toPhoneNumber = params.destinationPhone || "+16504415689"; // Replace with the phone number you want to send SMS to

        // Specify the message you want to send
        const message = `Hello, this is a test message from Great Knox! to: ${toPhoneNumber}`;

        const input: SendTextMessageCommandInput = {
            // SendTextMessageRequest
            OriginationIdentity: OriginationNumber,
            DestinationPhoneNumber: toPhoneNumber, // required
            MessageBody: message,
            // MessageType: "TRANSACTIONAL" or "PROMOTIONAL"
            MessageType: "TRANSACTIONAL",
            // Optional Message Context - you can attach any custom data which will be returned in the events webhook
            Context: {
                accountId: "1234",
                campaignId: "5678",
                customerId: "9012",
                propertyId: "3456",
                ts: new Date().toISOString(),
            },
        };
        const command = new SendTextMessageCommand(input);
        const response = await this.pinpointV3.send(command);
        console.log("response: ", response);
        return response;
    }
}
