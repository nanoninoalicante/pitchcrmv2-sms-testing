import { Test, TestingModule } from "@nestjs/testing";
import { PinpointSimpleService } from "./pinpoint-simple.service";
import { ConfigService } from "@nestjs/config";

describe("PinpointSimpleService", () => {
    let service: PinpointSimpleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PinpointSimpleService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue("test-value"),
                    },
                },
            ],
        }).compile();

        service = module.get<PinpointSimpleService>(PinpointSimpleService);
    });

    describe("sendSMSV3", () => {
        it("should send an SMS message", async () => {
            const params = {
                destinationPhone: "+16504415689",
            };
            const response: any = await service.sendSMSV3(params);
            expect(response).toBeDefined();
            expect(response.MessageResponse).toBeDefined();
            expect(response.MessageResponse.FinalStatus).toBeDefined();
        });
    });
});
