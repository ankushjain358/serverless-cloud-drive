/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getFile = /* GraphQL */ `query GetFile($id: ID!) {
  getFile(id: $id) {
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
` as GeneratedQuery<APITypes.GetFileQueryVariables, APITypes.GetFileQuery>;
export const getFolder = /* GraphQL */ `query GetFolder($id: ID!) {
  getFolder(id: $id) {
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
` as GeneratedQuery<APITypes.GetFolderQueryVariables, APITypes.GetFolderQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listFiles = /* GraphQL */ `query ListFiles(
  $filter: ModelFileFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listFiles(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      extension
      fileName
      fileType
      folderId
      id
      owner
      s3Key
      size
      thumbnailS3Key
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListFilesQueryVariables, APITypes.ListFilesQuery>;
export const listFolders = /* GraphQL */ `query ListFolders(
  $filter: ModelFolderFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listFolders(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      folderName
      id
      owner
      parentFolderId
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFoldersQueryVariables,
  APITypes.ListFoldersQuery
>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      email
      id
      owner
      profileOwner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
