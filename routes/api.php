<?php

use App\Http\Controllers\CarController;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Log::info('API routes file loaded');

file_put_contents(base_path('api_routes_included.txt'), 'API routes included');

// Temporarily remove auth:sanctum middleware
Route::get('/cars', [CarController::class, 'index']);
Route::post('/cars', [CarController::class, 'store']);

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});