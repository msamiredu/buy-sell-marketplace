<?php

use App\Http\Controllers\CarController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cars', [CarController::class, 'index']);
    Route::post('/cars', [CarController::class, 'store']);
});

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});