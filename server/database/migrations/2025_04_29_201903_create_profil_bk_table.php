<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profilbk', function (Blueprint $table) {
            $table->id();
            $table->text('visi');
            $table->text('misi');
            $table->text('intro_text');
            $table->string('teacher_name');
            $table->string('teacher_birth');
            $table->string('teacher_education');
            $table->string('teacher_instagram');
            $table->string('teacher_photo');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profilbk');
    }
};
