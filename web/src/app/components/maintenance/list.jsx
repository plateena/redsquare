'use client'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal';
import MaintenanceForm from './form'; // Assuming you have a MaintenanceForm component
import { formatDateDifference } from '../../util';

const MaintenanceList = ({ vehicleId, hideVehicle }) => {
    const [maintenanceData, setMaintenanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sort, setSort] = useState(''); // State to track sorting order ('', 'asc', 'desc')

    useEffect(() => {
        const fetchMaintenanceData = async () => {
            try {
                let url = `http://localhost:8000/api/v1/maintenance?filter[vehicle]=${vehicleId}&populate=vehicle`;
                if (sort) {
                    url += `&sort=${sort === 'asc' ? 'date' : '-date'}`; // Append sorting parameter to URL
                }
                const res = await fetch(url);
                const { data } = await res.json();
                setMaintenanceData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching maintenance data:', error);
                setLoading(false);
            }
        };

        fetchMaintenanceData();
    }, [vehicleId, sort]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSort = () => {
        // Toggle sorting order between 'asc', 'desc', and reset ('')
        setSort((prevSort) => {
            if (prevSort === 'asc') return 'desc';
            if (prevSort === 'desc') return '';
            return 'asc';
        });
    };

    return (
        <div>
            <h2 className="font-bold my-6">
                Maintenance List{' '}
                <a
                    id="a-show-modal-add-maintenance"
                    href={''}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        openModal();
                    }}
                >
                    <FontAwesomeIcon icon={faPlusCircle} size="sm" className="text-blue-500 hover:text-blue-700" />
                </a>
            </h2>
            {loading ? (
                <p>Loading...</p>
            ) : maintenanceData.length === 0 ? (
                <p>No maintenance data found for this vehicle.</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                onClick={handleSort} // Handle sorting on click
                                style={{ cursor: 'pointer' }}
                            >
                                Date {sort === 'asc' && <FontAwesomeIcon icon={faSortUp} />}
                                {sort === 'desc' && <FontAwesomeIcon icon={faSortDown} />}
                                {sort === '' && <FontAwesomeIcon icon={faSort} />} {/* Default sort icon */}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Description
                            </th>
                            {/* Add more columns if needed */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {maintenanceData.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDateDifference(item.date)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                                {/* Add more columns if needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Maintenance Form Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <MaintenanceForm vehicleId={vehicleId} closeModal={closeModal} />
            </Modal>
        </div>
    );
};

export default MaintenanceList;