"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function AdminDetailBerkas({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/api/admin/berkas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => setData(res.data));
  }, [id]);

  if (!data) return <div>Loading...</div>;

  const backendUrl = "http://127.0.0.1:8000";
  const getFullUrl = (url: string | undefined) => {
    if (!url) return "";
    // Jika sudah http, langsung return
    if (url.startsWith("http")) return url;
    // Jika sudah diawali /storage, tambahkan backendUrl saja
    if (url.startsWith("/storage")) return backendUrl + url;
    // Jika diawali /, tambahkan backendUrl
    if (url.startsWith("/")) return backendUrl + url;
    // Selain itu, tambahkan backendUrl + /storage/ + url
    return backendUrl + "/storage/" + url;
  };

  // Helper untuk preview file
  const renderPreview = (url: string | undefined) => {
    if (!url) return null;
    const fullUrl = getFullUrl(url);
    const ext = fullUrl.split('.').pop()?.toLowerCase();
    if (ext === "pdf") {
      return (
        <iframe src={fullUrl} width="100%" height={300} className="border my-2" title="Preview PDF" />
      );
    }
    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext || "")) {
      return (
        <img src={fullUrl} alt="Preview" className="my-2 max-h-60 rounded shadow" />
      );
    }
    return <span className="text-gray-400">Preview tidak tersedia</span>;
  };

  const renderFileRow = (label: string, url: string | undefined) => {
    const fullUrl = getFullUrl(url);
    return (
      <tr>
        <td className="font-semibold text-black align-top">{label}</td>
        <td>
          {url ? (
            <div>
              {renderPreview(url)}
              <div className="flex gap-2 mt-2">
                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Lihat
                </a>
                <a
                  href={fullUrl}
                  download
                  className="text-green-600 underline"
                >
                  Download
                </a>
              </div>
            </div>
          ) : (
            <span className="text-gray-400">Tidak ada file</span>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4 text-[#154472]">Detail Berkas</h1>
      <table className="w-full text-left">
        <tbody>
          {renderFileRow("Surat Lulus", data.surat_lulus)}
          {renderFileRow("Surat Baik", data.surat_baik)}
          {renderFileRow("Kartu Keluarga", data.kartu_keluarga)}
          {renderFileRow("Akta Lahir", data.akta_lahir)}
          {renderFileRow("Foto", data.foto)}
        </tbody>
      </table>
        <button
        onClick={() => router.push("/BerandaAdmin")}
        className="px-4 py-2 bg-[#154472] text-white rounded hover:bg-[#10365a] transition duration-200"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
}