import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../config/config";

export class Services {
    Client = new Client();
    database;
    bucket;

    constructor() {
        this.Client
            .setEndpoint(config.APPWRITE_ENDPOINT) // Set Appwrite Endpoint
            .setProject(config.APPWRITE_PROJECT_ID); // Set Appwrite Project ID
        this.database = new Databases(this.Client); // Initialize the Databases service
        this.bucket = new Storage(this.Client); // Initialize the Storage service
    }

    // Create a new document 
    async createDocument(slug, { title, content, featuredImage, status, userId }) {
        try {
            const response = await this.database.createDocument(
                config.DATABASE_ID,
                config.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
            return response;
        } catch (error) {
            console.error("Error creating document:", error);
            throw error;
        }
    }
    
    // Create a new post (alias for createDocument)
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.createDocument(slug, { title, content, featuredImage, status, userId });
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    // Update an existing document
    async updateDocument({ title, slug, content, featuredImage, status, userId }) {
        try {
            const response = await this.database.updateDocument(
                config.DATABASE_ID,
                config.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
            return response;
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }
    
    // Update a post (alias for updateDocument, with different parameter structure)
    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            const response = await this.database.updateDocument(
                config.DATABASE_ID,
                config.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            return response;
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    }

    //delete the document
    async deleteDocument(slug) {
        try {
            const response = await this.database.deleteDocument(
                config.DATABASE_ID,
                config.COLLECTION_ID,
                slug
            )
            return true;
        } catch (error) {
            throw error;
            console.error("Error deleting document:", error);
            return false;
        }
    }

    //get document by slug
    async getDocument(slug) {
        try {
            const response = await this.database.getDocument(
                config.DATABASE_ID,
                config.COLLECTION_ID,
                slug
            )
            return response;
        } catch (error) {
            throw error;
            console.error("Error getting document:", error);
        }
    }

    //listing the documents  with the status query to show active documents
    async checkstatus(queries = [Query.equal("status", "active")]) {
        try {
            const response = await this.database.listDocuments(
                config.DATABASE_ID,
                config.COLLECTION_ID,
                queries,
            )
            return response;
        } catch (error) {
            console.error("Error checking status:", error);
        }
    }
    
    // Get all posts - method added for better naming
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const response = await this.database.listDocuments(
                config.DATABASE_ID,
                config.COLLECTION_ID,
                queries,
            )
            return response;
        } catch (error) {
            console.error("Error getting posts:", error);
            throw error;
        }
    }

    //uploading the file 
    async uploadFile(file){
        try {
            const response = await this.bucket.createFile(
                config.BUCKET_ID,
                file,
                ID.unique(),
            )
            return response;
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    //deleting the file
    async deleteFile(fileId) {
        try {
            const response = await this.bucket.deleteFile(
                config.BUCKET_ID,
                fileId            // file should be deleted using the ID
            )
            return response;
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    }

    // to get the file preview
     GetFilePreview(fileId){
        const response = this.bucket.getFilePreview(
            config.BUCKET_ID,
            fileId
        )
        return response;
    }
};

const services = new Services();

export default services;