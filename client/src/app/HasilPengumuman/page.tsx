"use client";
import { useRouter } from "next/router";

export default function Hasil() {
  const router = useRouter();
  const { status, nama } = router.query;

  let bg = "bg-gray-300";
  let message = "Pengumuman belum tersedia";
  let note = "";

  if (status === "lulus") {
    bg = "bg-green-500";
    message = "SELAMAT ANDA LULUS!";
    note = `anda dinyatakan LULUS di UPT SMP 9 BINAMU JENEPONTO`;
  } else if (status === "tidak_lulus") {
    bg = "bg-red-500";
    message = "Maaf anda tidak lulus";
    note = `anda dinyatakan TIDAK LULUS di UPT SMP 9 BINAMU JENEPONTO`;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className={`p-8 rounded shadow-md w-full max-w-xl text-white ${bg}`}>
        <h1 className="text-2xl font-bold text-center mb-4">{message}</h1>
        <div className="bg-gray-200 w-24 h-24 mx-auto rounded-md mb-4" />
        <p className="text-center font-medium text-lg text-white">{nama}</p>
        <p className="text-center mt-2">{note}</p>
        <button
          onClick={() => router.back()}
          className="mt-6 bg-white text-black px-4 py-2 rounded-md shadow"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
