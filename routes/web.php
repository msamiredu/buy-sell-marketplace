<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Cars', [
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->middleware('auth');