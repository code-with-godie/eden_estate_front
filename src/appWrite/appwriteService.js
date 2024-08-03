import { Client, Databases, ID, Query } from 'appwrite';
import { appwriteConfig } from './appConfig';

class AppWriteService {
  client = new Client();
  #_database;
  constructor() {
    this.client
      .setEndpoint(appwriteConfig.appWriteEndPoint)
      .setProject(appwriteConfig.appWriteProject);
    this.#_database = new Databases(this.client);
  }
  async sendMessage(messege) {
    try {
      let newMessege = await this.#_database.createDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteMessegesCollectionID,
        ID.unique(),
        messege
      );
      return newMessege;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getRoomMesseges(roomID) {
    try {
      let messeges = await this.#_database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteMessegesCollectionID,
        [Query.equal('room', roomID)]
      );
      return messeges.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUserRooms(userID) {
    try {
      let rooms = await this.#_database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteRoomsCollectionID,
        [Query.contains('members', userID)]
      );
      return rooms.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createRoom(members) {
    try {
      let room = await this.#_database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteRoomsCollectionID,
        [
          Query.contains('members', members[0]),
          Query.contains('members', members[1]),
        ]
      );
      if (room.total === 0) {
        room = await this.#_database.createDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteRoomsCollectionID,
          ID.unique(),
          { members }
        );
        console.log('created a new room');
        return room;
      } else {
        console.log('room alreday exists');
        return room.documents[0];
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const appwriteService = new AppWriteService();
