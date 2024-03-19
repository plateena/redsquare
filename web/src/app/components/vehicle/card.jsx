import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const VehicleCard = ({ vehicle, openModal }) => {
    const handleEditClick = (e) => {
        e.stopPropagation()
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        openModal(vehicle._id)
    }

    return (
        <Link href={`/vehicle/${vehicle._id}`} passHref>
            <div className="vehicle-card bg-white shadow-md rounded-md p-4 relative cursor-pointer">
                <div className="flex justify-between mb-2">
                    <h2 className="text-lg font-semibold">{vehicle.plateNumber}</h2>
                    <div className="flex">
                        <Link href={`/vehicle/${vehicle._id}/edit`} passHref>
                            <span
                                className="edit-icon text-gray-600 hover:text-gray-900 cursor-pointer ml-2"
                                onClick={handleEditClick}
                            >
                                <FontAwesomeIcon icon={faPencilAlt} size={'sm'} />
                            </span>
                        </Link>
                        <span
                            className="delete-icon text-red-600 hover:text-red-900 cursor-pointer ml-2"
                            onClick={handleDeleteClick}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} size={'sm'} />
                        </span>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                    {vehicle.brand} - {vehicle.model}
                </p>
                <p className="text-sm text-gray-600 mb-1">{vehicle.color}</p>
                <p className="text-sm text-gray-600 mb-1">{vehicle.year}</p>
            </div>
        </Link>
    )
}

export default VehicleCard