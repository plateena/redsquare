'use client'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown, faPlusCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from '../Modal'
import MaintenanceForm from './form'
import { formatDateDifference } from '../../util'

const MaintenanceList = ({ vehicleId, hideVehicle, hideActions }) => {
    const [maintenanceData, setMaintenanceData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedMaintenanceId, setSelectedMaintenanceId] = useState(null)
    const [selectedVehicleId, setSelectedVehicleId] = useState(vehicleId)
    const [sort, setSort] = useState('asc')

    useEffect(() => {
        fetchData()
    }, [vehicleId, sort])

    const fetchData = async () => {
        try {
            let url = 'http://localhost:8000/api/v1/maintenance?populate=vehicle'
            if (vehicleId) url += `&filter[vehicle]=${vehicleId}`
            if (sort) url += `&sort=${sort === 'asc' ? 'date' : '-date'}`
            const res = await fetch(url)
            const { data } = await res.json()
            setMaintenanceData(data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching maintenance data:', error)
            setLoading(false)
        }
    }

    const handleSort = () => {
        setSort((prevSort) => {
            if (prevSort === 'asc') return 'desc'
            if (prevSort === 'desc') return ''
            return 'asc'
        })
    }

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleEdit = (maintenance) => {
        const { _id, vehicle } = maintenance
        setSelectedMaintenanceId(_id)
        const { _id: vehicleId } = vehicle
        setSelectedVehicleId(vehicleId)
        openModal()
    }

    const handleDelete = (index) => {
        console.log('Delete action for index:', index)
    }

    return (
        <div>
            <h2 className="font-bold my-6">
                Maintenance List{' '}
                {vehicleId && (
                    <a
                        href="#"
                        onClick={() => {
                            setSelectedMaintenanceId(null)
                            openModal()
                        }}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} size="sm" className="text-blue-500 hover:text-blue-700" />
                    </a>
                )}
            </h2>
            {loading ? (
                <p>Loading...</p>
            ) : maintenanceData.length === 0 ? (
                <p>No maintenance data found for this vehicle.</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {!hideVehicle && (
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vehicle
                                </th>
                            )}
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                onClick={handleSort}
                                style={{ cursor: 'pointer' }}
                            >
                                Date {sort === 'asc' && <FontAwesomeIcon icon={faSortUp} />}
                                {sort === 'desc' && <FontAwesomeIcon icon={faSortDown} />}
                                {sort === '' && <FontAwesomeIcon icon={faSort} />}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            {!hideActions && (
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {maintenanceData.map((item, index) => (
                            <tr key={index}>
                                {!hideVehicle && (
                                    <td className="px-6 py-4 whitespace-nowrap align-top">
                                        <div>
                                            <span className="text-lg font-bold">{item.vehicle.plateNumber}</span> <br />
                                            <span>
                                                {item.vehicle.brand} - {item.vehicle.model}
                                            </span>{' '}
                                            <br />
                                            <span>
                                                {item.vehicle.year} | {item.vehicle.color}
                                            </span>
                                        </div>
                                    </td>
                                )}
                                <td className="px-6 py-4 whitespace-nowrap align-top">
                                    {formatDateDifference(item.date)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap align-top">
                                    Status: {item.status}
                                    <hr/>
                                    <br />
                                    {item.description}
                                    <br />
                                </td>
                                {!hideActions && (
                                    <td className="px-6 py-4 whitespace-nowrap align-top">
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            className="text-blue-500 hover:text-blue-700 cursor-pointer mr-2"
                                            onClick={() => handleEdit(item)}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                            onClick={() => handleDelete(index)}
                                        />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <MaintenanceForm
                    reloadList={fetchData}
                    vehicleId={selectedVehicleId}
                    maintenanceId={selectedMaintenanceId}
                    closeModal={closeModal}
                />
            </Modal>
        </div>
    )
}

export default MaintenanceList