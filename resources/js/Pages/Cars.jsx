import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Cars({ auth }) {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        description: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios
                .get('/api/cars', {
                    headers: {
                        'Accept': 'application/json',
                    },
                })
                .then((response) => {
                    setCars(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching cars:', error);
                    setError('Failed to load cars. Check server logs.');
                    setLoading(false);
                });
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .get('/sanctum/csrf-cookie')
            .then(() => {
                axios
                    .post('/api/cars', formData, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((response) => {
                        setCars([...cars, response.data]);
                        setFormData({
                            make: '',
                            model: '',
                            year: '',
                            price: '',
                            description: '',
                        });
                        setError(null);
                    })
                    .catch((error) => {
                        console.error('Error posting car:', error);
                        setError('Failed to post car. Check server logs.');
                    });
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Car Listings</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : cars.length > 0 ? (
                                <ul>
                                    {cars.map((car) => (
                                        <li key={car.id} className="mb-4">
                                            {car.make} {car.model} ({car.year}) - EGP {car.price}
                                            <br />
                                            <small>{car.description}</small>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No cars listed yet.</p>
                            )}
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-lg font-semibold">Post a Car</h3>
                            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Make</label>
                                    <input
                                        type="text"
                                        name="make"
                                        value={formData.make}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price (EGP)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700"
                                >
                                    Post Car
                                </button>
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}