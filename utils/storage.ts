import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = '@notes_v1';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  color: string;
  lastModified: string;
}

export async function saveNote(note: Note) {
  try {
    const existingNotes = await loadNotes();
    const updatedNotes = [note, ...existingNotes];
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    console.log('Note saved successfully:', note);
    return true;
  } catch (error) {
    console.error('Error saving note:', error);
    return false;
  }
}

export async function loadNotes(): Promise<Note[]> {
  try {
    const notesJson = await AsyncStorage.getItem(NOTES_KEY);
    const notes = notesJson ? JSON.parse(notesJson) : [];
    console.log('Notes loaded:', notes.length);
    return notes;
  } catch (error) {
    console.error('Error loading notes:', error);
    return [];
  }
}

export async function deleteNote(id: string): Promise<boolean> {
  try {
    const notes = await loadNotes();
    const updatedNotes = notes.filter(note => note.id !== id);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    console.log('Note deleted:', id);
    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    return false;
  }
}

export async function updateNote(updatedNote: Note): Promise<boolean> {
  try {
    const notes = await loadNotes();
    const updatedNotes = notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    );
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    console.log('Note updated:', updatedNote.id);
    return true;
  } catch (error) {
    console.error('Error updating note:', error);
    return false;
  }
}

