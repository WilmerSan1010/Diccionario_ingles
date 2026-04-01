<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('words', function (Blueprint $table) {
            $table->id();
            $table->string('word');                  // Palabra en inglés
            $table->string('translation');            // Traducción al español
            $table->string('type')->nullable();       // noun, verb, adjective, adverb...
            $table->text('example')->nullable();      // Oración de ejemplo
            $table->text('notes')->nullable();        // Notas personales
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('words');
    }
};
