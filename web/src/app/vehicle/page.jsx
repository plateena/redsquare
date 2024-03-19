"use client"
import './../styles/vehicle-list.scss'
import Link from 'next/link'
import Modal from './../components/Modal'
import VehicleCard from '../components/vehicle/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { apiConfig } from '../config'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { toastOptions } from '../config'
import { useState, useEffect } from 'react'
import ConfirmationModal from '../components/ConfirmModal'

const Vehicle = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedVehicleId, setSelectedVehicleId] = useState(null)
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

    // Fetch vehicles from the API
    const fetchVehicles = async () => {
        try {
            const res = await fetch(`${apiConfig.url}/vehicle`)
            const data = await res.json()
            setVehicles(data.data)
        } catch (error) {
            console.error('Error fetching vehicles:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVehicles()
    }, [])

    // Open the deletion modal for the selected vehicle
    const openConfirmationModal = (vehicleId) => {
        setSelectedVehicleId(vehicleId)
        setIsConfirmationOpen(true)
    }

    // Close the confirmation modal
    const closeConfirmationModal = () => {
        setIsConfirmationOpen(false)
        setSelectedVehicleId(null)
    }

    // Handle the delete action for the selected vehicle
    const handleDelete = async () => {
        try {
            await fetch(`${apiConfig.url}/vehicle/${selectedVehicleId}`, {
                method: 'DELETE',
            })
            fetchVehicles()
            toast.success('Delete successful!', toastOptions)
        } catch (error) {
            console.error('Error deleting vehicle:', error)
        } finally {
            closeConfirmationModal()
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-6">
                Vehicle List
                <Link href="/vehicle/new" passHref>
                    <span
                        data-tooltip-id="create-new-tooltip"
                        data-tooltip-content="Create New Vehicle"
                        className="ml-2 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faPlusCircle} size="sm" className="text-blue-500 hover:text-blue-700" />
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
    )
}

export default Vehicle
