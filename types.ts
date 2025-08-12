export type User = {
  id: string;
  storageUsed: number;
  notesUsed: number;
};

export type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
};

export type File = {
  id?: string;
  userId?: string;
  name: string;
  size: number;
  type: string;
  imagekitUrl: string;
  imagekitId: string;
  uploadedAt?: Date;
};

export type FileUser = {
  file: File | undefined;
  files: File[] | undefined;
  user: User;
};

export type NoteUser = {
  note: Note;
  user: User;
};
