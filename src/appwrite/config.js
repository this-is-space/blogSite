import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.projectID);

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userID }) {
        try {
            return await this.database.createDocument(conf.databaseID, conf.collectionID, slug, {
                title,
                content,
                featuredImage,
                status,
                userID
            });
        } catch (error) {
            console.log("Appwrite Error:: createPost::  ", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(conf.databaseID, conf.collectionID, slug, {
                title,
                content,
                featuredImage,
                status,
            });
        } catch (error) {
            console.log("Appwrite Error:: updatePost::  ", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(conf.databaseID, conf.collectionID, slug);
            return true;
        } catch (error) {
            console.log("Appwrite Error:: deletePost::  ", error)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(conf.databaseID, conf.collectionID, slug);
        } catch (error) {
            console.log("Appwrite Error:: getPost::  ", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(conf.databaseID, conf.collectionID, queries);
        } catch (error) {
            console.log("Appwrite Error:: getPosts::  ", error)
            return false
        }
    }
    // file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.bucketID, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite Error:: uploadFile::  ", error)
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(conf.bucketID, fileID);
            return true;
        } catch (error) {
            console.log("Appwrite Error:: deleteFile::  ", error)
            return false
        }
    }

    getFilePreview(fileID) {
        return this.bucket.getFilePreview(conf.bucketID, fileID);
    }
}

const service = new Service();
export default service;