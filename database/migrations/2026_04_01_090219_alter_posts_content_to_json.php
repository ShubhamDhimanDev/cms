<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // The posts.content column is stored as longText.
        // The array cast on the Post model handles JSON serialisation.
        // No schema change is required for the column to hold JSON data.
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
