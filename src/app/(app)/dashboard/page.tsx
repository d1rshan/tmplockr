"use client";
import FileUpload from "@/components/FileUpload";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";

interface File {
  id: string;
  clerkUserId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  publicId: string;
  uploadedAt: Date;
}

interface User {
  id: string;
  clerkUserId: string;
  storageUsed: number;
}
export default function DashboardPage() {
  const [files, setFiles] = useState<File[]>();
  const [user, setUser] = useState<User>();

  const getUsageDetails = async () => {
    const res = await axios.get("/api/usage-details");
    console.log(res);
    setUser(res.data);
  };
  const fetchFiles = async () => {
    const res = await axios.get("/api/fetch-files");
    setFiles(res.data);
    console.log(res);
  };
  useEffect(() => {
    fetchFiles();
    getUsageDetails();
  }, []);
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="flex flex-col justify-center items-center">
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
      </div>
    </div>
  );
}
