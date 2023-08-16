import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TemplatedMessage, ServerClient } from "postmark";
@Injectable()
export class PostmarkService {
    protected postmarkApiKey: any;
    constructor(private configService: ConfigService) {
        this.postmarkApiKey = this.configService.get("POSTMARK_API_KEY");
    }
    async sendEmail(input: any) {
        const params: TemplatedMessage = {
            TemplateModel: {},
            From: "hello@greatknox.com",
            TemplateAlias: "email-verification",
            To: input.email,
        };
        const client = new ServerClient(this.postmarkApiKey);
        const response = await client.sendEmailWithTemplate(params);

        console.log("Sending email...: ", response);
        return response;
    }
}
