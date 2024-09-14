import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { postConfirmation } from '../functions/post-confirmation/resource';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
// By default, the Cognito user pool's user information is populated into the owner field. 
// The value saved includes sub and username in the format <sub>::<username>. 
// The API will authorize against the full value of <sub>::<username> or sub / username separately and return username.

const schema = a.schema({
  FileType: a.enum( [
    'PHOTO',
    'VIDEO',
    'AUDIO',
    'DOCUMENT'
  ]),
  User: a.model({
    id: a.id().required(),
    email: a.string().required(),
    profileOwner: a.string(),
    folders: a.hasMany('Folder', 'userId') // ensure this creates a GSI in Folder table
  })
    .authorization(allow => [allow.owner(), allow.ownerDefinedIn("profileOwner")]), // Per-user/per-owner data access
  File: a
    .model({
      id: a.id().required(),
      fileType: a.ref('FileType'),
      fileName: a.string().required(),
      extension: a.string().required(),
      folderId: a.string().required(),
      s3Key: a.string().required(),
      thumbnailS3Key: a.string(),
      size: a.integer().required(),
      folder: a.belongsTo('Folder', 'folderId'),
    })
    // The "owner" of a File is allowed to create, read, update, and delete their own Files
    .authorization(allow => [allow.owner()]), // Per-user/per-owner data access
  Folder: a
    .model({
      id: a.id().required(),
      userId: a.string().required(),
      folderName: a.string().required(),
      parentFolderId: a.string().required(),
      files: a.hasMany('File', 'folderId'),
      childFolders: a.hasMany('Folder', 'parentFolderId'),
      parentFolder: a.belongsTo('Folder', 'parentFolderId'),
      user: a.belongsTo('User', 'userId'),
    })
    .authorization(allow => [allow.owner()]) // Per-user/per-owner data access
}).authorization((allow) => [allow.resource(postConfirmation)]); // Grant Lambda to access AppSync API

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', // AppSync API default authorization mode 
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
