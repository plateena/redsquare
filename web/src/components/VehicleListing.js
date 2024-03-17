import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleListing = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/vehicle');
                setVehicles(response.data.data || []);
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
                setVehicles([]); // Set default value as empty array in case of error or empty response
            }
        };

        fetchData();
    }, []);

    // Log the vehicles state
    console.log('Vehicles:', vehicles);

    return (
        <div>
            <h2>List of Vehicles</h2>
            {vehicles.length === 0 ? (
                <p>No vehicles found</p>
            ) : (
                <ul>
                    {vehicles.map((vehicle, index) => (
                        <li key={index}>
                            <strong>{vehicle.make}</strong> - {vehicle.model} ({vehicle.year})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VehicleListing;