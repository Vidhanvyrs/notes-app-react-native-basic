import { create } from "react-test-renderer";
import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

//appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  //Get Notes
  async getNotes(userId) {
    if (!userId) {
      console.error("Error: Missing UserId in getNotes()");
      return { data: [], error: "Missing UserId in getNotes()" };
    }

    try {
      const response = await databaseService.listDocuments(dbId, colId, [
        Query.equal("user_id", userId),
        Query.orderDesc("createdAt"),
      ]);
      return response;
    } catch (error) {
      console.log("Error Fetching notes", error.message);
      return { data: [], error: error.message };
    }
  },

  //Add new Note
  async addNote(user_id, text) {
    if (!text) return { error: "NoteText cannot be Empty!" };
    const data = {
      text: text,
      createdAt: new Date().toISOString(),
      user_id: user_id,
    };
    const response = await databaseService.createDocument(
      dbId,
      colId,
      data,
      ID.unique()
    );
    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  },

  //Update Note
  async updateNote(id, text) {
    const response = await databaseService.updateDocument(dbId, colId, id, {
      text: text,
    });
    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  },

  //Delete Note
  async deleteNote(id) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }

    return { success: true };
  },
};
export default noteService;
