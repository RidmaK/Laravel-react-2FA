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
        Schema::create('security_data', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->text('description');
            $table->decimal('value', 8, 2)->nullable();
            $table->string('severity')->nullable();
            $table->timestamp('detected_at')->nullable();
            $table->string('status')->default('open');
            $table->timestamp('resolved_at')->nullable();
            $table->string('assigned_to')->nullable();
            $table->timestamp('response_time')->nullable();
            $table->string('threat_source')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('security_data');
    }
};
