'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Modal from './../components/Modal'

const getVehilce = async () => {
    // const vehicles = await axios.get('https:/localhost:8000/api/v1/vehicle')
    // console.log(vehicles)
}

const Vehicle = async () => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    getVehilce()
    const res = await fetch('http://localhost:8000/api/v1/vehicle')
    const vehicles = await res.json()

    return (
        <>
            <h1>Vehilce</h1>
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
                    {vehicles.data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.plateNumber}</td>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.color}</td>
                            <td>{item.year}</td>
                            <td>
                                <Link href={'/vehicle/' + item._id}>
                                    <FontAwesomeIcon icon={faFileLines} size={'1em'} />
                                </Link>
                                <Link href={'/vehicle/' + item._id + '/edit'}>
                                    <FontAwesomeIcon icon={faPencil} size={'1em'} />
                                </Link>
                                <Link href={'/vehicle/' + item._id + '/delete'}>
                                    <FontAwesomeIcon icon={faTrashCan} size={'1em'} />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center items-center h-screen">
                {/* Button to open modal */}
                <button
                    onClick={openModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Open Modal
                </button>

                {/* Modal component */}
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <h1 className="text-2xl font-bold mb-4">Modal Title</h1>
                    <p>Modal Content goes here...</p>
                </Modal>
            </div>
        </>
    )
}

export default Vehicle