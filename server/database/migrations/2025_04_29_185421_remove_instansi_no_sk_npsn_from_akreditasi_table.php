<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('akreditasi', function (Blueprint $table) {
            $table->dropColumn(['instansi', 'no_sk', 'npsn']);
        });
    }

    public function down(): void
    {
        Schema::table('akreditasi', function (Blueprint $table) {
            $table->string('instansi')->nullable();
            $table->string('no_sk')->nullable();
            $table->string('npsn')->nullable();
        });
    }
};
