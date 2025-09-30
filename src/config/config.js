//this file is created to hold all the configuration variables and this helps to keep the code clean and organized and maintainable
//it also makes it easier to update configuration values in the future

const config = {
    APPWRITE_PROJECT_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    APPWRITE_PROJECT_NAME: String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
    APPWRITE_ENDPOINT: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    DATABASE_ID: String(import.meta.env.VITE_DATABASE_ID),
    COLLECTION_ID: String(import.meta.env.VITE_COLLECTION_ID),
    BUCKET_ID: String(import.meta.env.VITE_BUCKET_ID)
}

export default config;