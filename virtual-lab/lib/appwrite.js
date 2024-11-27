import { Client, Databases, Query } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67456ab700055c60e01d")

const databases = new Databases(client);

export async function DataBring(collectionId){
 let promise= databases.listDocuments(
    collectionId,
    "6745c4e700317a9005db",
    [
        Query.equal('Chemical1', Chemical1)
    ]
);
return promise
}

export async function listDocuments(collectionId) {
    try {
      const response = await databases.listDocuments('67456ae700165699b208',collectionId);
      console.log('Documents:', response.documents);
      return response
    } catch (error) {
      console.error('Error retrieving documents:', error);
    }
  }
  
