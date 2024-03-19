import VehicleDetails from "@/app/components/vehicle/details"

const EditVehicle = (req) => {
    const { id } = req.params

    return (
    <>
        <VehicleDetails vehicleId={id} type="edit" />
    </>
    )
}

export default EditVehicle