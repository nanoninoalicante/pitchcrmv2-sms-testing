import {
    PinpointSMSVoiceV2Client,
    SendTextMessageCommand,
    SendTextMessageCommandInput,
} from "@aws-sdk/client-pinpoint-sms-voice-v2";

const pinpointV3 = new PinpointSMSVoiceV2Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// const response = {
//     eventType: "TEXT_SUCCESSFUL",
//     eventVersion: "1.0",
//     eventTimestamp: 1686145646579,
//     isFinal: false,
//     originationPhoneNumber: "+18335000712",
//     destinationPhoneNumber: "+16504415689",
//     isoCountryCode: "US",
//     mcc: "310",
//     mnc: "800",
//     carrierName: "T-mobile USA Inc.",
//     messageId: "ce475b01-75f1-4173-b26d-c1ab10b2f17e",
//     messageRequestTimestamp: 1686145645693,
//     messageEncoding: "GSM",
//     messageType: "PROMOTIONAL",
//     messageStatus: "SUCCESSFUL",
//     messageStatusDescription: "Message has been accepted by phone carrier",
//     context: {
//         accountId: "1234",
//         campaignId: "5678",
//         customerId: "9012",
//         propertyId: "3456",
//         ts: "2023-06-07T13:47:24.870Z",
//     },
//     totalMessageParts: 1,
//     totalMessagePrice: 0.00581,
//     totalCarrierFee: 0.0025,
// };

async function sendSMSV3() {
    try {
        const OriginationNumber = "+18335000712";
        // Specify the phone number you want to send the SMS to
        const toPhoneNumber = "+16504415689"; // Replace with the phone number you want to send SMS to

        // Specify the message you want to send
        const message = `Hello, this is a test message! to: ${toPhoneNumber} from: ${OriginationNumber}`;

        const input: SendTextMessageCommandInput = {
            // SendTextMessageRequest
            DestinationPhoneNumber: toPhoneNumber, // required
            OriginationIdentity: OriginationNumber,

            // Configuration Set Names
            // Prod:
            // prodTransactionalSMSConfigurationSet
            //prodPromotionalSMSConfigurationSet
            // Dev:
            // devTransactionalSMSConfigurationSet
            // devPromotionalSMSConfigurationSet

            ConfigurationSetName: "prodTransactionalSMSConfigurationSet", // Replace with your Configuration Set name
            MessageBody: message,

            // MessageType: "TRANSACTIONAL" or "PROMOTIONAL"

            MessageType: "PROMOTIONAL",

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
        const response = await pinpointV3.send(command).catch((error) => {
            console.log("error: ", error);
            throw error;
        });
        console.log("response: ", response);
        return response;
    } catch (error) {
        console.log("error: ", error);
        throw error;
    }
}
