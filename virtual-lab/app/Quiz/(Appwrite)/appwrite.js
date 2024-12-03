import { Client, Databases, Query } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("674960ee002006cc82ee")

const databases = new Databases(client);


export async function getQuestions(collectionId) {
    try {
      const response = await databases.listDocuments('67496106003d79a71ff1',collectionId);
      console.log('Documents:', response.documents);
      return response
    } catch (error) {
      console.error('Error retrieving documents:', error);
    }
  }
  
