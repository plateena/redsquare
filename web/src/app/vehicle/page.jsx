import axios from 'axios'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const getVehilce = async () => {
    // const vehicles = await axios.get('https:/localhost:8000/api/v1/vehicle')
    // console.log(vehicles)
}

const Vehicle = async () => {
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
                                <Link href={"/vehicle/"+item._id}>
                                    <FontAwesomeIcon icon={faFileLines} size={'1em'} />
                                </Link>
                                <a href="">
                                    <FontAwesomeIcon icon={faPencil} size={'1em'} />
                                </a>
                                <a href="">
                                    <FontAwesomeIcon icon={faTrashCan} size={'1em'} />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Vehicle