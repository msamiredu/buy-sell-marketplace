public function up()
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