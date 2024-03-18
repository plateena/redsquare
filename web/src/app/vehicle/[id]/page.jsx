import React from 'react';
import Link from 'next/link'
import VehicleDetail from '../../components/vehicle/details'

const VehicleDetailsPage = async (req) => {
    const { id } = req.params

    return (
        <div>
        <VehicleDetail vehicleId={id} />

        <Link href={"/maintenance/"+id+"/add"}>Maintenance</Link>
        </div>
    );
};

export default VehicleDetailsPage;