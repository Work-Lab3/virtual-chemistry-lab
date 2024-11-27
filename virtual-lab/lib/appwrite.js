import { Client, Databases, Query } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67456ab700055c60e01d")

const databases = new Databases(client);

export async function DataBring(collectionId,chemical1){
 let promise= await databases.listDocuments(
    '67456ae700165699b208',
    collectionId,
    [
        Query.equal('Chemical', chemical1)
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
  
