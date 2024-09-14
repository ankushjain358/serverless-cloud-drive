/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createFile = /* GraphQL */ `mutation CreateFile(
  $condition: ModelFileConditionInput
  $input: CreateFileInput!
) {
  createFile(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateFileMutationVariables,
  APITypes.CreateFileMutation
>;
export const createFolder = /* GraphQL */ `mutation CreateFolder(
  $condition: ModelFolderConditionInput
  $input: CreateFolderInput!
) {
  createFolder(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateFolderMutationVariables,
  APITypes.CreateFolderMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteFile = /* GraphQL */ `mutation DeleteFile(
  $condition: ModelFileConditionInput
  $input: DeleteFileInput!
) {
  deleteFile(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteFileMutationVariables,
  APITypes.DeleteFileMutation
>;
export const deleteFolder = /* GraphQL */ `mutation DeleteFolder(
  $condition: ModelFolderConditionInput
  $input: DeleteFolderInput!
) {
  deleteFolder(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteFolderMutationVariables,
  APITypes.DeleteFolderMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const updateFile = /* GraphQL */ `mutation UpdateFile(
  $condition: ModelFileConditionInput
  $input: UpdateFileInput!
) {
  updateFile(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateFileMutationVariables,
  APITypes.UpdateFileMutation
>;
export const updateFolder = /* GraphQL */ `mutation UpdateFolder(
  $condition: ModelFolderConditionInput
  $input: UpdateFolderInput!
) {
  updateFolder(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateFolderMutationVariables,
  APITypes.UpdateFolderMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
