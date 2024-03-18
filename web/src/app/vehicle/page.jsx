import axios from 'axios'
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Vehicle