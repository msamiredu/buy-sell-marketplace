<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CarController extends Controller
{
    public function index()
    {
        Log::info('CarController@index called', [
            'user_id' => auth()->id(),
            'is_authenticated' => auth()->check(),
        ]);

        $cars = Car::with('user')->get();
        Log::info('Cars fetched', ['cars' => $cars->toArray()]);

        return response()->json($cars);
    }

    public function store(Request $request)
    {
        Log::info('CarController@store called', [
            'user_id' => auth()->id(),
            'is_authenticated' => auth()->check(),
            'request_data' => $request->all()
        ]);

        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $car = Car::create([
            'make' => $validated['make'],
            'model' => $validated['model'],
            'year' => $validated['year'],
            'price' => $validated['price'],
            'description' => $validated['description'],
            'user_id' => $request->user()->id,
        ]);

        Log::info('Car created', ['car' => $car->toArray()]);

        return response()->json($car, 201);
    }
}