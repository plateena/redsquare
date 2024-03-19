"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { apiConfig } from '../config';
import VehicleCard from '../components/vehicle/card';
import ConfirmationModal from '../components/ConfirmModal';

const Vehicle = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchPlate, setSearchPlate] = useState('');
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    // Function to debounce search input changes
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Function to fetch vehicles
    const fetchVehicles = async (searchQuery) => {
        try {
            let endpoint = `${apiConfig.url}/vehicle`;
            if (searchQuery) {
                endpoint += `?filter[plateNumber]=${encodeURIComponent(searchQuery)}`;
            }
            const res = await fetch(endpoint);
            const data = await res.json();
            setVehicles(data.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    // Debounce the fetchVehicles function with a delay of 500 milliseconds
    const debouncedFetchVehicles = debounce(fetchVehicles, 500);

    // Effect to fetch vehicles when searchPlate changes
    useEffect(() => {
        setLoading(true); // Set loading to true when fetching data
        debouncedFetchVehicles(searchPlate); // Call debouncedFetchVehicles with the current searchPlate
    }, [searchPlate]);

    // Open the deletion modal for the selected vehicle
    const openConfirmationModal = (vehicleId) => {
        setSelectedVehicleId(vehicleId);
        setIsConfirmationOpen(true);
    };

    // Close the confirmation modal
    const closeConfirmationModal = () => {
        setIsConfirmationOpen(false);
        setSelectedVehicleId(null);
    };

    // Handle the delete action for the selected vehicle
    const handleDelete = async () => {
        try {
            await fetch(`${apiConfig.url}/vehicle/${selectedVehicleId}`, {
                method: 'DELETE',
            });
            fetchVehicles(searchPlate); // Re-fetch vehicles with the current search query
            toast.success('Delete successful!');
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        } finally {
            closeConfirmationModal();
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-6">
                Vehicle List
                <Link href="/vehicle/new" passHref>
                    <span className="ml-2 cursor-pointer">
                        <FontAwesomeIcon icon={faPlusCircle} size="sm" className="text-blue-500 hover:text-blue-700" />
                    </span>
                </Link>
            </h1>
            <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search by Plate Number"
                    value={searchPlate}
                    onChange={(e) => setSearchPlate(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded-md w-full max-w-md"
                />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {vehicles.length === 0 ? (
                        <p>No data found for vehicles.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {vehicles.map((vehicle, index) => (
                                <div
                                    key={index}
                                    onClick={() => (window.location.href = `/vehicle/${vehicle._id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <VehicleCard vehicle={vehicle} openModal={openConfirmationModal} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={closeConfirmationModal}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this vehicle?"
            />

            <ToastContainer />
        </div>
    );
};

export default Vehicle;
