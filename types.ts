export type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
};

export type File = {
  id: string;
  userId: string;
  name: string;
  size: number;
  type: string;
  imagekitUrl: string;
  imagekitId: string;
  uploadedAt: Date;
};
