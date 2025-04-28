"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VisiMisiAdmin() {
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [editing, setEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/visi-misi");
      if (res.data) {
        setVisi(res.data.visi);
        setMisi(res.data.misi);
        setIsNew(false);
      } else {
        setIsNew(true);
      }
    } catch (err) {
      console.error(err);
      setIsNew(true);
    }
  };

  const formatContent = (content: string) => {
    // Split content by newlines and filter out empty lines
    const lines = content.split("\n").filter((line) => line.trim());

    // Format each line with proper indentation and styling
    const formattedLines = lines.map((line) => {
      const trimmedLine = line.trim();

      // Check if line starts with a number followed by dot (e.g., "1.", "2.", etc)
      const numberMatch = trimmedLine.match(/^(\d+)\.\s*(.*)/);
      // Check if line starts with a letter followed by dot or parenthesis (e.g., "a.", "b)", etc)
      const letterMatch = trimmedLine.match(/^([a-z])[.)\s]\s*(.*)/i);

      if (numberMatch) {
        // Format numbered points with proper indentation
        const [, number, text] = numberMatch;
        return `
          <div class="flex mb-4">
            <span class="w-8 flex-shrink-0 font-medium">${number}.</span>
            <div class="flex-grow text-justify leading-relaxed text-base">${text}</div>
          </div>
        `;
      } else if (letterMatch) {
        // Format lettered sub-points with proper indentation
        const [, letter, text] = letterMatch;
        return `
          <div class="flex mb-2 ml-8">
            <span class="w-6 flex-shrink-0 font-medium">${letter}.</span>
            <div class="flex-grow text-justify leading-relaxed text-base">${text}</div>
          </div>
        `;
      } else {
        // Regular paragraph without numbering
        return `<p class="text-justify mb-4 leading-relaxed text-base">${trimmedLine}</p>`;
      }
    });

    // Join all paragraphs and wrap in a container with proper spacing
    return `
      <div class="prose prose-sm max-w-none space-y-2">
        ${formattedLines.join("\n      ")}
      </div>
    `;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const method = isNew ? "post" : "put";
      const formattedVisi = formatContent(visi.trim());
      const formattedMisi = formatContent(misi.trim());

      const response = await axios[method](
        "http://localhost:8000/api/visi-misi",
        {
          visi: formattedVisi,
          misi: formattedMisi,
        }
      );

      console.log("Server response:", response.data);
      alert("Data berhasil diperbarui!");
      setEditing(false);
      fetchData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Server response error:", err.response?.data);
        alert(
          `Gagal memperbarui data: ${
            err.response?.data?.message || err.message
          }`
        );
      } else {
        console.error("An error occurred:", err);
        alert("Gagal memperbarui data");
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      await axios.delete("http://localhost:8000/api/visi-misi");
      alert("Data berhasil dihapus!");
      setVisi("");
      setMisi("");
      setIsNew(true);
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Gagal menghapus data");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-blue-100">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Edit Visi & Misi
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-lg font-medium text-blue-800 block">
              Visi
            </label>
            <textarea
              value={visi}
              onChange={(e) => setVisi(e.target.value)}
              disabled={!editing}
              className="w-full border-2 border-blue-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-blue-100 text-gray-700"
              rows={5}
              placeholder="Masukkan visi sekolah..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium text-blue-800 block">
              Misi
            </label>
            <textarea
              value={misi}
              onChange={(e) => setMisi(e.target.value)}
              disabled={!editing}
              className="w-full border-2 border-blue-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-blue-50 text-gray-700"
              rows={8}
              placeholder="Masukkan misi sekolah..."
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              onClick={() => setEditing(!editing)}
              type="button"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              {editing ? "Cancel" : "Edit"}
            </button>
            {editing && (
              <button
                type="submit"
                className="flex-1 bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors duration-200 font-medium"
              >
                {isNew ? "Create" : "Update"}
              </button>
            )}
            {!isNew && !editing && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// Copy all the current content from page.tsx and paste it here
// The content remains exactly the same, just in a new file
