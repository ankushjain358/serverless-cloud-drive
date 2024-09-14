/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateFile = /* GraphQL */ `subscription OnCreateFile(
  $filter: ModelSubscriptionFileFilterInput
  $owner: String
) {
  onCreateFile(filter: $filter, owner: $owner) {
    createdAt
    extension
    fileName
    fileType
    folder {
      createdAt
      folderName
      id
      owner
      parentFolderId
      updatedAt
      userId
      __typename
    }
    folderId
    id
    owner
    s3Key
    size
    thumbnailS3Key
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFileSubscriptionVariables,
  APITypes.OnCreateFileSubscription
>;
export const onCreateFolder = /* GraphQL */ `subscription OnCreateFolder(
  $filter: ModelSubscriptionFolderFilterInput
  $owner: String
) {
  onCreateFolder(filter: $filter, owner: $owner) {
    childFolders {
      nextToken
      __typename
    }
    createdAt
    files {
      nextToken
      __typename
    }
    folderName
    id
    owner
    parentFolder {
      createdAt
      folderName
      id
      owner
      parentFolderId
      updatedAt
      userId
      __typename
    }
    parentFolderId
    updatedAt
    user {
      createdAt
      email
      id
      owner
      profileOwner
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFolderSubscriptionVariables,
  APITypes.OnCreateFolderSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
  $profileOwner: String
) {
  onCreateUser(filter: $filter, owner: $owner, profileOwner: $profileOwner) {
    createdAt
    email
    folders {
      nextToken
      __typename
    }
    id
    owner
    profileOwner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onDeleteFile = /* GraphQL */ `subscription OnDeleteFile(
  $filter: ModelSubscriptionFileFilterInput
  $owner: String
) {
  onDeleteFile(filter: $filter, owner: $owner) {
    createdAt
    extension
    fileName
    fileType
    folder {
      createdAt
      folderName
      id
      owner
      parentFolderId
      updatedAt
      userId
      __typename
    }
    folderId
    id
    owner
    s3Key
    size
    thumbnailS3Key
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFileSubscriptionVariables,
  APITypes.OnDeleteFileSubscription
>;
export const onDeleteFolder = /* GraphQL */ `subscription OnDeleteFolder(
  $filter: ModelSubscriptionFolderFilterInput
  $owner: String
) {
  onDeleteFolder(filter: $filter, owner: $owner) {
    childFolders {
      nextToken
      __typename
    }
    createdAt
    files {
      nextToken
      __typename
    }
    folderName
    id
    owner
    parentFolder {
      createdAt
      folderName
      id
      owner
      parentFolderId
      updatedAt
      userId
      __typename
    }
    parentFolderId
    updatedAt
    user {
      createdAt
      email
      id
      owner
      profileOwner
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFolderSubscriptionVariables,
  APITypes.OnDeleteFolderSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
  $profileOwner: String
) {
  onDeleteUser(filter: $filter, owner: $owner, profileOwner: $profileOwner) {
    createdAt
    email
    folders {
      nextToken
      __typename
    }
    id
    owner
    profileOwner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onUpdateFile = /* GraphQL */ `subscription OnUpdateFile(
  $filter: ModelSubscriptionFileFilterInput
  $owner: String
) {
  onUpdateFile(filter: $filter, owner: $owner) {
    createdAt
    extension
    fileName
    fileType
    folder {
      createdAt
      folderName
      id
      owner
      parentFolderId
      updatedAt
      userId
      __typename
    }
    folderId
    id
    owner
    s3Key
    size
    thumbnailS3Key
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFileSubscriptionVariables,
  APITypes.OnUpdateFileSubscription
>;
export const onUpdateFolder = /* GraphQL */ `subscription OnUpdateFolder(
  $filter: ModelSubscriptionFolderFilterInput
  $owner: String
) {
  onUpdateFolder(filter: $filter, owner: $owner) {
    childFolders {
      nextToken
      __typename
    }
    createdAt
    files {
      nextToken
      __typename
    }
    folderName
    id
    owner
    parentFolder {
      createdAt
      folderName
      id
      owner
      parentFolderId
      updatedAt
      userId
      __typename
    }
    parentFolderId
    updatedAt
    user {
      createdAt
      email
      id
      owner
      profileOwner
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFolderSubscriptionVariables,
  APITypes.OnUpdateFolderSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
  $profileOwner: String
) {
  onUpdateUser(filter: $filter, owner: $owner, profileOwner: $profileOwner) {
    createdAt
    email
    folders {
      nextToken
      __typename
    }
    id
    owner
    profileOwner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
