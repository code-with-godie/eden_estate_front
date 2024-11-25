// export const appwriteConfig = {
//   appWriteEndPoint: 'http://localhost/v1',
//   appWriteProject: '667d0f0100169bc91b77',
//   appWriteDatabase: '667d0f770001f5deb49d',
//   appWriteMessegesCollectionID: '66a676d0002445841081',
//   appWriteRoomsCollectionID: '66a683b10002786dff2e',
// };
export const appwriteConfig = {
  appWriteEndPoint: String(process.env.REACT_APP_APPWRITE_END_POINT),
  appWriteProject: String(process.env.REACT_APP_APPWRITE_PROJECT),
  appWriteDatabase: String(process.env.REACT_APP_APPWRITE_DATABASE),
  appWriteMessegesCollectionID: String(
    process.env.REACT_APP_APPWRITE_MESSEGES_COLLECTION_ID
  ),
  appWriteRoomsCollectionID: String(
    process.env.REACT_APP_APPWRITE_ROOMS_COLLECTION_ID
  ),
};
