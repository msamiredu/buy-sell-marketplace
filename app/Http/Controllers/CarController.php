<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Car::with('user')->get();
        return response()->json($cars);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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

        return response()->json($car, 201);
    }
}