'use client'
import Link from 'next/link'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from './../components/Modal'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import './../styles/vehicle-list.scss'

const Vehicle = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch vehicles from the API
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

    // Open the deletion modal for the selected vehicle
    const openModal = (vehicleId) => {
        setIsOpen(true);
        setSelectedVehicleId(vehicleId);
    };

    // Close the deletion modal
    const closeModal = () => {
        setIsOpen(false);
        setSelectedVehicleId(null);
    };

    // Handle the delete action for the selected vehicle
    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:8000/api/v1/vehicle/${selectedVehicleId}`, {
                method: 'DELETE',
            });
            fetchVehicles();
            toast.success('Delete successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            })
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
                    <span data-tooltip-id="create-new-tooltip" data-tooltip-content="Create New Vehicle" className="ml-2 cursor-pointer">
                        <FontAwesomeIcon icon={faPlus} size="sm" className="text-blue-500 hover:text-blue-700" />
                    </span>
                </Link>
                <ReactTooltip id="create-new-tooltip" />
            </h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {vehicles.length === 0 ? (
                        <p>No data found for vehicles.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {vehicles.map((vehicle, index) => (
                                <div key={index} onClick={() => window.location.href=`/vehicle/${vehicle._id}`} style={{ cursor: 'pointer' }}>
                                    <div className="vehicle-card bg-white shadow-md rounded-md p-4 relative">
                                        <div className="flex justify-between mb-2">
                                            <h2 className="text-lg font-semibold">{vehicle.plateNumber}</h2>
                                            <div className="flex">
                                                <span className="edit-icon text-gray-600 hover:text-gray-900 cursor-pointer ml-2" onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.location.href = `/vehicle/${vehicle._id}/edit`;
                                                }}>
                                                    <FontAwesomeIcon icon={faPencilAlt} size={'lg'} />
                                                </span>
                                                <span className="delete-icon text-red-600 hover:text-red-900 cursor-pointer ml-2">
                                                    <FontAwesomeIcon
                                                        icon={faTrashAlt}
                                                        size={'lg'}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openModal(vehicle._id);
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            {vehicle.brand} - {vehicle.model}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-1">{vehicle.color}</p>
                                        <p className="text-sm text-gray-600 mb-1">{vehicle.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="bg-white rounded-lg p-8">
                    <h1 className="text-2xl font-bold mb-4">Confirm Deletion</h1>
                    <p>Are you sure you want to delete this vehicle?</p>
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default Vehicle;