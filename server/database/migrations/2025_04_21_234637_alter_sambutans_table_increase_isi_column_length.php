<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterSambutansTableIncreaseIsiColumnLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sambutans', function (Blueprint $table) {
            $table->text('isi')->change(); // Mengubah tipe data menjadi TEXT
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sambutans', function (Blueprint $table) {
            $table->string('isi', 255)->change(); // Kembalikan ke VARCHAR jika diperlukan
        });
    }
}
