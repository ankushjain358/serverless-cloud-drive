/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type File = {
  __typename: "File",
  createdAt: string,
  extension: string,
  fileName: string,
  fileType?: FileType | null,
  folder?: Folder | null,
  folderId: string,
  id: string,
  owner?: string | null,
  s3Key: string,
  size: number,
  thumbnailS3Key?: string | null,
  updatedAt: string,
};

export enum FileType {
  AUDIO = "AUDIO",
  DOCUMENT = "DOCUMENT",
  PHOTO = "PHOTO",
  VIDEO = "VIDEO",
}


export type Folder = {
  __typename: "Folder",
  childFolders?: ModelFolderConnection | null,
  createdAt: string,
  files?: ModelFileConnection | null,
  folderName: string,
  id: string,
  owner?: string | null,
  parentFolder?: Folder | null,
  parentFolderId: string,
  updatedAt: string,
  user?: User | null,
  userId: string,
};

export type ModelFolderConnection = {
  __typename: "ModelFolderConnection",
  items:  Array<Folder | null >,
  nextToken?: string | null,
};

export type ModelFileConnection = {
  __typename: "ModelFileConnection",
  items:  Array<File | null >,
  nextToken?: string | null,
};

export type User = {
  __typename: "User",
  createdAt: string,
  email: string,
  folders?: ModelFolderConnection | null,
  id: string,
  owner?: string | null,
  profileOwner?: string | null,
  updatedAt: string,
};

export type ModelFileFilterInput = {
  and?: Array< ModelFileFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  extension?: ModelStringInput | null,
  fileName?: ModelStringInput | null,
  fileType?: ModelFileTypeInput | null,
  folderId?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelFileFilterInput | null,
  or?: Array< ModelFileFilterInput | null > | null,
  owner?: ModelStringInput | null,
  s3Key?: ModelStringInput | null,
  size?: ModelIntInput | null,
  thumbnailS3Key?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelFileTypeInput = {
  eq?: FileType | null,
  ne?: FileType | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelFolderFilterInput = {
  and?: Array< ModelFolderFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  folderName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelFolderFilterInput | null,
  or?: Array< ModelFolderFilterInput | null > | null,
  owner?: ModelStringInput | null,
  parentFolderId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelUserFilterInput = {
  and?: Array< ModelUserFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserFilterInput | null,
  or?: Array< ModelUserFilterInput | null > | null,
  owner?: ModelStringInput | null,
  profileOwner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelFileConditionInput = {
  and?: Array< ModelFileConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  extension?: ModelStringInput | null,
  fileName?: ModelStringInput | null,
  fileType?: ModelFileTypeInput | null,
  folderId?: ModelStringInput | null,
  not?: ModelFileConditionInput | null,
  or?: Array< ModelFileConditionInput | null > | null,
  owner?: ModelStringInput | null,
  s3Key?: ModelStringInput | null,
  size?: ModelIntInput | null,
  thumbnailS3Key?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateFileInput = {
  extension: string,
  fileName: string,
  fileType?: FileType | null,
  folderId: string,
  id?: string | null,
  s3Key: string,
  size: number,
  thumbnailS3Key?: string | null,
};

export type ModelFolderConditionInput = {
  and?: Array< ModelFolderConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  folderName?: ModelStringInput | null,
  not?: ModelFolderConditionInput | null,
  or?: Array< ModelFolderConditionInput | null > | null,
  owner?: ModelStringInput | null,
  parentFolderId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateFolderInput = {
  folderName: string,
  id?: string | null,
  parentFolderId: string,
  userId: string,
};

export type ModelUserConditionInput = {
  and?: Array< ModelUserConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  not?: ModelUserConditionInput | null,
  or?: Array< ModelUserConditionInput | null > | null,
  owner?: ModelStringInput | null,
  profileOwner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserInput = {
  email: string,
  id?: string | null,
  profileOwner?: string | null,
};

export type DeleteFileInput = {
  id: string,
};

export type DeleteFolderInput = {
  id: string,
};

export type DeleteUserInput = {
  id: string,
};

export type UpdateFileInput = {
  extension?: string | null,
  fileName?: string | null,
  fileType?: FileType | null,
  folderId?: string | null,
  id: string,
  s3Key?: string | null,
  size?: number | null,
  thumbnailS3Key?: string | null,
};

export type UpdateFolderInput = {
  folderName?: string | null,
  id: string,
  parentFolderId?: string | null,
  userId?: string | null,
};

export type UpdateUserInput = {
  email?: string | null,
  id: string,
  profileOwner?: string | null,
};

export type ModelSubscriptionFileFilterInput = {
  and?: Array< ModelSubscriptionFileFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  extension?: ModelSubscriptionStringInput | null,
  fileName?: ModelSubscriptionStringInput | null,
  fileType?: ModelSubscriptionStringInput | null,
  folderId?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionFileFilterInput | null > | null,
  owner?: ModelStringInput | null,
  s3Key?: ModelSubscriptionStringInput | null,
  size?: ModelSubscriptionIntInput | null,
  thumbnailS3Key?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionFolderFilterInput = {
  and?: Array< ModelSubscriptionFolderFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  folderName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionFolderFilterInput | null > | null,
  owner?: ModelStringInput | null,
  parentFolderId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  owner?: ModelStringInput | null,
  profileOwner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetFileQueryVariables = {
  id: string,
};

export type GetFileQuery = {
  getFile?:  {
    __typename: "File",
    createdAt: string,
    extension: string,
    fileName: string,
    fileType?: FileType | null,
    folder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    folderId: string,
    id: string,
    owner?: string | null,
    s3Key: string,
    size: number,
    thumbnailS3Key?: string | null,
    updatedAt: string,
  } | null,
};

export type GetFolderQueryVariables = {
  id: string,
};

export type GetFolderQuery = {
  getFolder?:  {
    __typename: "Folder",
    childFolders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    folderName: string,
    id: string,
    owner?: string | null,
    parentFolder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    parentFolderId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      createdAt: string,
      email: string,
      id: string,
      owner?: string | null,
      profileOwner?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    createdAt: string,
    email: string,
    folders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    owner?: string | null,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type ListFilesQueryVariables = {
  filter?: ModelFileFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListFilesQuery = {
  listFiles?:  {
    __typename: "ModelFileConnection",
    items:  Array< {
      __typename: "File",
      createdAt: string,
      extension: string,
      fileName: string,
      fileType?: FileType | null,
      folderId: string,
      id: string,
      owner?: string | null,
      s3Key: string,
      size: number,
      thumbnailS3Key?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListFoldersQueryVariables = {
  filter?: ModelFolderFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListFoldersQuery = {
  listFolders?:  {
    __typename: "ModelFolderConnection",
    items:  Array< {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      createdAt: string,
      email: string,
      id: string,
      owner?: string | null,
      profileOwner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateFileMutationVariables = {
  condition?: ModelFileConditionInput | null,
  input: CreateFileInput,
};

export type CreateFileMutation = {
  createFile?:  {
    __typename: "File",
    createdAt: string,
    extension: string,
    fileName: string,
    fileType?: FileType | null,
    folder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    folderId: string,
    id: string,
    owner?: string | null,
    s3Key: string,
    size: number,
    thumbnailS3Key?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateFolderMutationVariables = {
  condition?: ModelFolderConditionInput | null,
  input: CreateFolderInput,
};

export type CreateFolderMutation = {
  createFolder?:  {
    __typename: "Folder",
    childFolders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    folderName: string,
    id: string,
    owner?: string | null,
    parentFolder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    parentFolderId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      createdAt: string,
      email: string,
      id: string,
      owner?: string | null,
      profileOwner?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    createdAt: string,
    email: string,
    folders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    owner?: string | null,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteFileMutationVariables = {
  condition?: ModelFileConditionInput | null,
  input: DeleteFileInput,
};

export type DeleteFileMutation = {
  deleteFile?:  {
    __typename: "File",
    createdAt: string,
    extension: string,
    fileName: string,
    fileType?: FileType | null,
    folder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    folderId: string,
    id: string,
    owner?: string | null,
    s3Key: string,
    size: number,
    thumbnailS3Key?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteFolderMutationVariables = {
  condition?: ModelFolderConditionInput | null,
  input: DeleteFolderInput,
};

export type DeleteFolderMutation = {
  deleteFolder?:  {
    __typename: "Folder",
    childFolders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    folderName: string,
    id: string,
    owner?: string | null,
    parentFolder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    parentFolderId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      createdAt: string,
      email: string,
      id: string,
      owner?: string | null,
      profileOwner?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    createdAt: string,
    email: string,
    folders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    owner?: string | null,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateFileMutationVariables = {
  condition?: ModelFileConditionInput | null,
  input: UpdateFileInput,
};

export type UpdateFileMutation = {
  updateFile?:  {
    __typename: "File",
    createdAt: string,
    extension: string,
    fileName: string,
    fileType?: FileType | null,
    folder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    folderId: string,
    id: string,
    owner?: string | null,
    s3Key: string,
    size: number,
    thumbnailS3Key?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateFolderMutationVariables = {
  condition?: ModelFolderConditionInput | null,
  input: UpdateFolderInput,
};

export type UpdateFolderMutation = {
  updateFolder?:  {
    __typename: "Folder",
    childFolders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    folderName: string,
    id: string,
    owner?: string | null,
    parentFolder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    parentFolderId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      createdAt: string,
      email: string,
      id: string,
      owner?: string | null,
      profileOwner?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    createdAt: string,
    email: string,
    folders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    owner?: string | null,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateFileSubscriptionVariables = {
  filter?: ModelSubscriptionFileFilterInput | null,
  owner?: string | null,
};

export type OnCreateFileSubscription = {
  onCreateFile?:  {
    __typename: "File",
    createdAt: string,
    extension: string,
    fileName: string,
    fileType?: FileType | null,
    folder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    folderId: string,
    id: string,
    owner?: string | null,
    s3Key: string,
    size: number,
    thumbnailS3Key?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateFolderSubscriptionVariables = {
  filter?: ModelSubscriptionFolderFilterInput | null,
  owner?: string | null,
};

export type OnCreateFolderSubscription = {
  onCreateFolder?:  {
    __typename: "Folder",
    childFolders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    folderName: string,
    id: string,
    owner?: string | null,
    parentFolder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    parentFolderId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      createdAt: string,
      email: string,
      id: string,
      owner?: string | null,
      profileOwner?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
  profileOwner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    createdAt: string,
    email: string,
    folders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    owner?: string | null,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteFileSubscriptionVariables = {
  filter?: ModelSubscriptionFileFilterInput | null,
  owner?: string | null,
};

export type OnDeleteFileSubscription = {
  onDeleteFile?:  {
    __typename: "File",
    createdAt: string,
    extension: string,
    fileName: string,
    fileType?: FileType | null,
    folder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    folderId: string,
    id: string,
    owner?: string | null,
    s3Key: string,
    size: number,
    thumbnailS3Key?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteFolderSubscriptionVariables = {
  filter?: ModelSubscriptionFolderFilterInput | null,
  owner?: string | null,
};

export type OnDeleteFolderSubscription = {
  onDeleteFolder?:  {
    __typename: "Folder",
    childFolders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    folderName: string,
    id: string,
    owner?: string | null,
    parentFolder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    parentFolderId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      createdAt: string,
      email: string,
      id: string,
      owner?: string | null,
      profileOwner?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
  profileOwner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    createdAt: string,
    email: string,
    folders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    owner?: string | null,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateFileSubscriptionVariables = {
  filter?: ModelSubscriptionFileFilterInput | null,
  owner?: string | null,
};

export type OnUpdateFileSubscription = {
  onUpdateFile?:  {
    __typename: "File",
    createdAt: string,
    extension: string,
    fileName: string,
    fileType?: FileType | null,
    folder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    folderId: string,
    id: string,
    owner?: string | null,
    s3Key: string,
    size: number,
    thumbnailS3Key?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateFolderSubscriptionVariables = {
  filter?: ModelSubscriptionFolderFilterInput | null,
  owner?: string | null,
};

export type OnUpdateFolderSubscription = {
  onUpdateFolder?:  {
    __typename: "Folder",
    childFolders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    folderName: string,
    id: string,
    owner?: string | null,
    parentFolder?:  {
      __typename: "Folder",
      createdAt: string,
      folderName: string,
      id: string,
      owner?: string | null,
      parentFolderId: string,
      updatedAt: string,
      userId: string,
    } | null,
    parentFolderId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      createdAt: string,
      email: string,
      id: string,
      owner?: string | null,
      profileOwner?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
  profileOwner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    createdAt: string,
    email: string,
    folders?:  {
      __typename: "ModelFolderConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    owner?: string | null,
    profileOwner?: string | null,
    updatedAt: string,
  } | null,
};
