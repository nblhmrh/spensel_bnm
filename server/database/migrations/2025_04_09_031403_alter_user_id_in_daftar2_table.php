<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('daftar2', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable()->change();
        });

        // Schema::table('dataortu', function (Blueprint $table) {
        //     $table->unsignedBigInteger('user_id')->nullable()->change();
        // });
    }

    public function down()
    {
        Schema::table('daftar2', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable(false)->change();
        });
        // Schema::table('dataortu', function (Blueprint $table) {
        //     $table->unsignedBigInteger('user_id')->nullable(false)->change();
        // });
    }
};
