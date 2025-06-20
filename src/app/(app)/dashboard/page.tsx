"use client";
// import FileUpload from "@/components/FileUpload";
// import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Note } from "@/lib/db/schema";
// import { File, User, Note } from "@/lib/db/schema";

export default function DashboardPage() {
  // const [files, setFiles] = useState<File[]>();
  // const [user, setUser] = useState<User>();
  const [notes, setNotes] = useState<Note[]>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const fetchUserDetails = async () => {
  //   const res = await axios.get("/api/usage-details");
  //   console.log(res);
  //   setUser(res.data);
  // };
  // const fetchFiles = async () => {
  //   const res = await axios.get("/api/fetch-files");
  //   setFiles(res.data);
  //   console.log(res);
  // };
  const fetchNotes = async () => {
    const res = await axios.get("/api/notes");
    setNotes(res.data);
    console.log(res);
  };

  const createNote = async () => {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }
    const res = await axios.post("/api/notes", {
      title,
      content,
    });
    setNotes((prev) => [...(prev || []), res.data]);
    setTitle("");
    setContent("");
  };
  useEffect(() => {
    // fetchUserDetails();
    // fetchFiles();
    fetchNotes();
  }, []);
  return (
    <div className="flex flex-col h-full justify-center items-center">
      {/* <div className="flex flex-col justify-center items-center">
        {user && (
          <div>
            USAGE DETAILS: {(user?.storageUsed / (1024 * 1024)).toFixed(2)}MB /
            100MB
          </div>
        )}
        <UserButton />
        {user && <FileUpload storageUsedByUser={user?.storageUsed} />}
        <div className="grid grid-cols-3 max-w-lg gap-3">
          {files &&
            files.map((file) => {
              return (
                <div
                  key={file.id}
                  className="bg-black rounded-lg text-white p-5 cursor-pointer"
                >
                  {file.fileName} | {file.publicId} |{" "}
                  {(file.fileSize / (1024 * 1024)).toFixed(1)}MB
                </div>
              );
            })}
        </div>
      </div> */}
      <h1>NOTES:</h1>
      <input
        type="text"
        placeholder="Enter title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-black text-white p-2 rounded-lg"
        onClick={createNote}
      >
        Submit
      </button>
      <div>
        {notes && notes.map((note) => <div key={note.id}>{note.title}</div>)}
      </div>
    </div>
  );
}
