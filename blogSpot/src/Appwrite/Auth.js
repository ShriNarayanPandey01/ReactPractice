import config from "../config";
import {Client ,Account,ID} from "appwrite"

export class AuthService{
    client = new Client()
    account
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async CreateAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
              return await this.Login({email,password})  
            }
            else{
                return userAccount
            }
            
        } catch (error) {
            throw error
        }
    }

    async Login({email,password}){
        try {
            return this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }

    async CurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Can't fetch user session",error)
        }
        return null;
    }

    async Logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("failed to logout",error)
        }
    }
}

const authService  = new AuthService();
export default authService
