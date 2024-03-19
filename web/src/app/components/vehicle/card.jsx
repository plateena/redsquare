import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const VehicleCard = ({ vehicle, onEdit, onDelete }) => {
    return (
        <div className="vehicle-card bg-white shadow-md rounded-md p-4 relative">
            <div className="flex justify-between mb-2">
                <h2 className="text-lg font-semibold">{vehicle.plateNumber}</h2>
                <div className="flex">
                    <span className="edit-icon text-gray-600 hover:text-gray-900 cursor-pointer ml-2" onClick={onEdit}>
                        <FontAwesomeIcon icon={faPencilAlt} size={'lg'} />
                    </span>
                    <span className="delete-icon text-red-600 hover:text-red-900 cursor-pointer ml-2" onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrashAlt} size={'lg'} />
                    </span>
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">
                {vehicle.brand} - {vehicle.model}
            </p>
            <p className="text-sm text-gray-600 mb-1">{vehicle.color}</p>
            <p className="text-sm text-gray-600 mb-1">{vehicle.year}</p>
        </div>
    );
};

export default VehicleCard;