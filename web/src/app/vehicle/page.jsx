'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from './../components/Modal';
import './../styles/vehicle-list.scss';

const Vehicle = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVehicles = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/v1/vehicle');
            const data = await res.json();
            setVehicles(data.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const openModal = (vehicleId) => {
        setIsOpen(true);
        setSelectedVehicleId(vehicleId);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedVehicleId(null);
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:8000/api/v1/vehicle/${selectedVehicleId}`, {
                method: 'DELETE',
            });
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        } finally {
            closeModal();
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-6">
        Vehicle List
                <Link href="/vehicle/new" passHref>
                    <span data-tip="Create New Vehicle" className="ml-2 cursor-pointer">
                        <FontAwesomeIcon icon={faPlus} size="sm" className="text-blue-500 hover:text-blue-700" />
                    </span>
                </Link>
        </h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {vehicles.map((vehicle, index) => (
                        <Link href={`/vehicle/${vehicle._id}`} passHref key={index}>
                            <span>
                                <div className="vehicle-card bg-white shadow-md rounded-md p-4 relative">
                                    <div className="flex justify-between mb-2 cursor-pointer">
                                        <h2 className="text-lg font-semibold">{vehicle.plateNumber}</h2>
                                        <div className="flex">
                                            <Link href={'/vehicle/' + vehicle._id + '/edit'}>
                                                <span className="edit-icon text-gray-600 hover:text-gray-900 cursor-pointer ml-2">
                                                    <FontAwesomeIcon icon={faPencilAlt} size={'lg'} />
                                                </span>
                                            </Link>
                                            <span className="delete-icon text-red-600 hover:text-red-900 cursor-pointer ml-2">
                                                <FontAwesomeIcon icon={faTrashAlt} size={'lg'} onClick={(e) => { e.stopPropagation(); openModal(vehicle._id); }} />
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">{vehicle.brand} - {vehicle.model}</p>
                                    <p className="text-sm text-gray-600 mb-1">{vehicle.color}</p>
                                    <p className="text-sm text-gray-600 mb-1">{vehicle.year}</p>
                                </div>
                            </span>
                        </Link>
                    ))}
                </div>
            )}

            {/* Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="bg-white rounded-lg p-8">
                    <h1 className="text-2xl font-bold mb-4">Confirm Deletion</h1>
                    <p>Are you sure you want to delete this vehicle?</p>
                    <div className="mt-6 flex justify-center">
                        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600">
                            Confirm
                        </button>
                        <button onClick={closeModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Vehicle;
