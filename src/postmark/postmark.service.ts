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
            TemplateModel: {
                name: input.name || "Dinesh Kumar",
                verifyLink:
                    input.verifyLink ||
                    "https://greatknox-dev-dashboard-yjbc3ulisq-ue.a.run.app/auth/set/account/owfwejfwij11",
            },
            From: "GreatKnox<support@greatknox.com>",
            Cc: input.cc || "cjameshill@me.com",
            TemplateAlias: "email-verification",
            To: input.email,
            ReplyTo: "GreatKnox<support@greatknox.com>",
        };
        const client = new ServerClient(this.postmarkApiKey);
        const response = await client.sendEmailWithTemplate(params);

        console.log("Sending email...: ", response);
        return response;
    }
}
