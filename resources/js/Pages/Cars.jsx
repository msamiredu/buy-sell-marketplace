import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';

export default function Cars({ auth }) {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/api/cars', {
                headers: {
                    Authorization: `Bearer ${auth.user ? auth.user.api_token : ''}`,
                },
            })
            .then((response) => {
                setCars(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [auth.user]);

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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}