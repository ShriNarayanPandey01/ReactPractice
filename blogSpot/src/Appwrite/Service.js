import { Client, Databases, ID, Storage, Query } from "appwrite";
import config from "../config";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async CreateDoc({ title, content, FeatureImg, status, userId, slug }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                { 
                    Title: title, 
                    Content: content, 
                    FeatureImg, 
                    Status: status, 
                    UserId: userId 
                },
                ['read("any")'] // Grant public read access to new documents
            );
        } catch (error) {
            console.log("can't add to dataBase", error);
        }
    }

    async UpdateDoc(id, { title, content, FeatureImg, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id,
                { 
                    Title: title, 
                    Content: content, 
                    FeatureImg, 
                    Status: status 
                },
                ['read("any")'] // Ensure public read access is maintained after an update
            );
        } catch (error) {
            console.log("cant update database", error);
        }
    }

    async DeleteDoc(id) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id
            );
            return true;
        } catch (error) {
            console.log("cant delete document", error);
            return false;
        }
    }

    async GetDoc(id) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id
            );
        } catch (error) {
            console.log("cant fetch documnet", error);
            return false;
        }
    }

    async ListDoc(query = [Query.equal("Status", "active")]) {
        try {
            const ret = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                query
            );
            return ret;
        } catch (error) {
            console.log("cant list Documents ", error);
            return false;
        }
    }

    async UploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
                ['read("any")']
            );
        } catch (error) {
            console.log("cant upload file ", error);
            return false;
        }
    }

    async DeleteFile(id) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                id
            );
            return true;
        } catch (error) {
            console.log("cant delete file ", error);
            return false;
        }
    }

    FilePreview(id) {
        return `${config.appwriteUrl}/storage/buckets/${config.appwriteBucketId}/files/${id}/view?project=${config.appwriteProjectId}`;
    }
}

const service = new Service();
export default service;
