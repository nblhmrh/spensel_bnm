<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('berkas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('surat_lulus');
            $table->string('surat_baik');
            $table->string('kartu_keluarga');
            $table->string('akta_lahir');
            $table->string('foto');
            $table->timestamps();
        });

        // Tabel terpisah untuk sertifikat (karena multiple)
        Schema::create('sertifikat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('berkas_id')->constrained()->onDelete('cascade');
            $table->string('file_path');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sertifikat');
        Schema::dropIfExists('berkas');
    }
};
