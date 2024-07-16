import { Client , Databases ,ID ,Storage ,Query } from "appwrite";
import config from "../config";

export class Service {
    client = new Client()
    databases
    bucket
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async CreateDoc({title,content,featuredImage,status,slug}){
        try {
            console.log("called Create Doc :",{title,content,featuredImage,status,slug})
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {Title:title,Content:content,FeatureImg:featuredImage,Status:status,UserId:slug}
            );

        } catch (error) {
            console.log("can't add to dataBase",error)
        }
    }
    async UpdateDoc(id , {title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id,
                {title,content,featuredImage,status}
            )
        } catch (error) {
            console.log("cant update database",error)
        }
    }
    async DeleteDoc(id){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id
            )
            return true
        } catch (error) {
            console.log("cant delete document",error)
            return false
        }
    }
    async GetDoc(id){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id
            )
        } catch (error) {
            console.log("cant fetch documnet",error)
            false
        }
    }
    async ListDoc(query = [Query.equal("Status","active")]){
        try {
            const ret =await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                query,
            )
            console.log("listDoc called",ret.documents)
            return ret
        } catch (error) {
            console.log("cant list Documents ",error)
            return false
        }   
    }
    async UploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )    
        } catch (error) {
            console.log("cant upload file ",error)
            return false
        }

    }
    async DeleteFile(id){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                id
            )
            return true
        } catch (error) {
            console.log("cant delete file ",error)
            return false
        }
    }
    async FilePreview(id){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            id
        )
    }

}
const service = new Service();
export default service;