import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class authservices {   //creating the authservices class and then it will handle all the authentication related tasks and further it will be used by other parts of the application
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.APPWRITE_ENDPOINT) // Set Appwrite Endpoint
            .setProject(config.APPWRITE_PROJECT_ID); // Set Appwrite Project ID
        this.account = new Account(this.client); //here the account is initialized and ready to use

    }

    async createAccount({ email, password, name }) { //this is create the account of the user by entering the email, password and name
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (user) {
                //here the method will call 
                return this.login({ email, password });  //if user is created successfully, then login the user
            } else {
                return user;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getcurrentUser() {
        try {
            // If successful, user is authenticated
            const user = await this.account.get();
            console.log("User is authenticated:", user);
            // Proceed with your authenticated app flow
            return user;
        } catch (error) {
            // If an error occurs, user is not authenticated
            console.error("User is not authenticated:", error);
            throw error;  // Propagate the error for further handling
        }
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
};

const authservice = new authservices();  //creating an instance of the authservices class

export default authservice;