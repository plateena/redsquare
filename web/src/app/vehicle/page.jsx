"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from './../components/Modal';

const Vehicle = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/v1/vehicle');
            const data = await res.json();
            setVehicles(data.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
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
            // Perform delete action using selectedVehicleId
            await fetch(`http://localhost:8000/api/v1/vehicle/${selectedVehicleId}`, {
                method: 'DELETE',
            });
            // Update the list of vehicles
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        } finally {
            // Close modal and reset state
            closeModal();
        }
    };

    return (
        <>
            <h1>Vehicle</h1>
            <table>
                <thead>
                    <tr>
                        <th>Plate Number</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((item, index) => (
                        <tr key={index}>
                            <td>{item.plateNumber}</td>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.color}</td>
                            <td>{item.year}</td>
                            <td>
                                <Link href={'/vehicle/' + item._id}>
                                    <FontAwesomeIcon icon={faFileLines} size={'sm'} />
                                </Link>
                                <Link href={'/vehicle/' + item._id + '/edit'}>
                                    <FontAwesomeIcon icon={faPencil} size={'sm'} />
                                </Link>
                                <a href="#" onClick={() => openModal(item._id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} size={'sm'} />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={closeModal}>
                    <>
                        <h1 className="text-2xl font-bold mb-4">Confirm Deletion</h1>
                        <p>Are you sure you want to delete this vehicle?</p>
                        <div className="mt-4 flex justify-center">
                            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">
                                Confirm
                            </button>
                            <button onClick={closeModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                                Cancel
                            </button>
                        </div>
                    </>
            </Modal>
        </>
    );
};

export default Vehicle;