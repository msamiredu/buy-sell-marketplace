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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('make');  // e.g., Toyota
            $table->string('model'); // e.g., Corolla
            $table->integer('year');
            $table->decimal('price', 8, 2); // e.g., 250000.00
            $table->text('description')->nullable();
            $table->foreignId('user_id')->constrained(); // Links car to the seller
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};