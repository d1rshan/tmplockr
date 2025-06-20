"use client";

import { useState } from "react";

export default function FileUpload({
  storageUsedByUser,
}: {
  storageUsedByUser: number;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [publicIds, setPublicIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Simulated available storage (100MB)
  const userStorageLeftBytes = 100 * 1024 * 1024 - storageUsedByUser;

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file");
      return;
    }

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > userStorageLeftBytes) {
      setError(
        `Total file size exceeds your available storage (${(
          userStorageLeftBytes /
          (1024 * 1024)
        ).toFixed(1)}MB).
        Total Size: ${(totalSize / (1024 * 1024)).toFixed(1)}`
      );
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    setUploading(true);
    setError(null);
    setPublicIds([]);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setPublicIds(data.publicIds);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Upload Files to Cloudinary</h1>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {publicIds.length > 0 && (
        <div className="mt-4 text-green-600">
          <p>Uploaded Files:</p>
          <ul className="list-disc list-inside">
            {publicIds.map((id) => (
              <li key={id}>
                <code>{id}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}
    </div>
  );
}
