import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Cars({ auth }) {
    const { props } = usePage();
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        description: '',
    });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get('/api/cars');
            console.log('Fetched cars:', response.data);
            setCars(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching cars:', err.response || err);
            setError('Failed to load cars. Check server logs.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/cars', formData);
            console.log('Car posted successfully:', response.data);
            setCars([...cars, response.data]);
            setFormData({
                make: '',
                model: '',
                year: '',
                price: '',
                description: '',
            });
            setError(null);
        } catch (err) {
            console.error('Error posting car:', err.response || err);
            setError('Failed to post car. Check server logs.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cars</h2>}
        >
            <Head title="Cars" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {error && <div className="text-red-500 mb-4">{error}</div>}

                            <h3 className="text-lg font-semibold mb-4">Add a New Car</h3>
                            <form onSubmit={handleSubmit} className="mb-8">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Make</label>
                                        <input
                                            type="text"
                                            name="make"
                                            value={formData.make}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Model</label>
                                        <input
                                            type="text"
                                            name="model"
                                            value={formData.model}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Year</label>
                                        <input
                                            type="number"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                >
                                    Post Car
                                </button>
                            </form>

                            <h3 className="text-lg font-semibold mb-4">Car Listings</h3>
                            {cars.length > 0 ? (
                                <ul className="space-y-4">
                                    {cars.map((car) => (
                                        <li key={car.id} className="border p-4 rounded-md">
                                            <h4 className="text-md font-semibold">
                                                {car.make} {car.model} ({car.year})
                                            </h4>
                                            <p>Price: ${car.price}</p>
                                            <p>{car.description}</p>
                                            <p>Posted by: {car.user?.name || 'Unknown'}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No cars available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}