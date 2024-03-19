import React from 'react';
import Link from 'next/link'
import VehicleDetail from '../../components/vehicle/details'

const VehicleCreateNewPage = async (req) => {

    return (
        <div>
        <VehicleDetail type={"create"} />

        </div>
    );
};

export default VehicleCreateNewPage;