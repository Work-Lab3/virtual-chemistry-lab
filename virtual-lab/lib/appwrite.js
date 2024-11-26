import { Client, Databases, Query } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67456ab700055c60e01d")

const databases = new Databases(client);

export async function DataBring(){
 let promise= databases.listDocuments(
    "67456ae700165699b208",
    "6745c4e700317a9005db",
    [
        Query.equal('ChemicalName', 'Water')
    ]
);
return promise
}

