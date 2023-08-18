import { Injectable } from "@nestjs/common";
import { Firestore } from "@google-cloud/firestore";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class FirestoreService {
    db: Firestore;
    constructor(private config: ConfigService) {
        this.db = new Firestore({
            projectId: this.config.get("FIRESTORE_PROJECT_ID"),
            keyFilename: "gservice-account.json",
        });
    }
    async list() {
        const usersListRef = this.db
            .collection("users")
            .orderBy("name")
            .limit(10);
        const snapshot = await usersListRef.get();
    }
}
