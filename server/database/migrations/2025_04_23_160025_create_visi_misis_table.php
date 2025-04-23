<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVisiMisiTable extends Migration
{
    public function up()
    {
        Schema::create('visi_misi', function (Blueprint $table) {
            $table->id();
            $table->text('visi');
            $table->json('tujuan');
            $table->json('misi');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('visi_misi');
    }
}
