import React from 'react';
import Link from 'next/link'
import VehicleDetail from '../../components/vehicle/details'

const VehicleDetailsPage = async (req) => {
    const { id, type } = req.params

    return (
        <div>
        <VehicleDetail vehicleId={id} type={type} />

        <Link href={"/maintenance/"+id+"/add"}>Maintenance</Link>
        </div>
    );
};

export default VehicleDetailsPage;