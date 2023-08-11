aws pinpoint-sms-voice-v2 create-event-destination \
--event-destination-name prodTransactionalSMSConfigurationSet \
--configuration-set-name prodTransactionalSMSConfigurationSet \
--matching-event-types ALL \
--sns-destination TopicArn=arn:aws:sns:us-east-1:912068501224:prod-v3-SMSPinpoint-TransactionalNotifications \
--profile pitchcrmv2-sms-sending-testing --region us-east-1