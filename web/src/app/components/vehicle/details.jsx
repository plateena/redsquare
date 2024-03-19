'use client'
import { useState, useEffect } from 'react'
import brandModelData from '../../../data/brand-model.json'
import colorData from '../../../data/color.json'

const VehicleDetails = ({ vehicleId, type = 'view' }) => {
    const [vehicle, setVehicle] = useState(null)
    const [selectedBrand, setSelectedBrand] = useState('')
    const [selectedModel, setSelectedModel] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const currentYear = new Date().getFullYear()

    useEffect(() => {
        // Fetch vehicle details
        if(vehicleId) {
        fetch(`http://localhost:8000/api/v1/vehicle/${vehicleId}`)
            .then((response) => response.json())
            .then((data) => {
                setVehicle(data)
                setSelectedBrand(data.brand)
                setSelectedModel(data.model)
                setSelectedColor(data.color)
                setSelectedYear(data.year)
            })
            .catch((error) => console.error('Error fetching vehicle details:', error))
        }
    }, [vehicleId])

    // Event handler for selecting brand
    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value)
        // Reset selected model when brand changes
        setSelectedModel('')
    }

    // Event handler for selecting model
    const handleModelChange = (event) => {
        setSelectedModel(event.target.value)
    }

    // Event handler for selecting color
    const handleColorChange = (event) => {
        setSelectedColor(event.target.value)
    }

    // Event handler for selecting year
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value)
    }

    // Event handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault()
        // Process form data or make API calls here
        // Construct the payload
        const formData = {
            brand: selectedBrand,
            model: selectedModel,
            color: selectedColor,
            year: selectedYear,
            plateNumber: vehicle ? vehicle.plateNumber : '',
        }

        if (type == 'edit') {
            editVehicle(formData)
        } else if (type == 'create') {
            createVehicle(formData)
        }
    }

    const createVehicle = (formData) => {
        return fetch(`http://localhost:8000/api/v1/vehicle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                // Assuming you want to handle the response somehow
                window.location = "/vehicle"
                // return response.json()
            })
            .then((data) => {
                console.log('Success:', data)
                // Do something with the response data if needed
            })
            .catch((error) => {
                console.error('Error:', error)
                // Handle errors here
            })

    }

    const editVehicle = (formData) => {
        return fetch(`http://localhost:8000/api/v1/vehicle/${vehicleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                // Assuming you want to handle the response somehow
                return response.json()
            })
            .then((data) => {
                console.log('Success:', data)
                // Do something with the response data if needed
            })
            .catch((error) => {
                console.error('Error:', error)
                // Handle errors here
            })
    }

    return (
        <>
            <hr />
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold my-4">Vehicle Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Brand selection */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="text-lg font-semibold">Brand:</p>
                            <select
                                className="border border-gray-300 px-3 py-2 w-full rounded-md"
                                value={selectedBrand}
                                disabled={type == 'view'}
                                onChange={handleBrandChange}
                            >
                                <option value="">Select Brand</option>
                                {brandModelData.brands.map((brand) => (
                                    <option key={brand.name} value={brand.name}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Model selection */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="text-lg font-semibold">Model:</p>
                            <select
                                className="border border-gray-300 px-3 py-2 w-full rounded-md"
                                value={selectedModel}
                                onChange={handleModelChange}
                                disabled={!selectedBrand || type == 'view'} // Disable model selection until a brand is selected
                            >
                                <option value="">Select Model</option>
                                {selectedBrand &&
                                    brandModelData.brands.find((brand) => brand.name === selectedBrand)
                                        .models.map((model) => (
                                            <option key={model} value={model}>
                                                {model}
                                            </option>
                                        ))}
                            </select>
                        </div>

                        {/* Color selection */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="text-lg font-semibold">Color:</p>
                            <select
                                className="border border-gray-300 px-3 py-2 w-full rounded-md"
                                disabled={type == 'view'}
                                value={selectedColor}
                                onChange={handleColorChange}
                            >
                                <option value="">Select Color</option>
                                {colorData.colors.map((color) => (
                                    <option key={color} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year selection */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="text-lg font-semibold">Year:</p>
                            <select
                                className="border border-gray-300 px-3 py-2 w-full rounded-md"
                                disabled={type == 'view'}
                                value={selectedYear}
                                onChange={handleYearChange}
                            >
                                <option value="">Select Year</option>
                                {Array.from({ length: currentYear - 1949 }, (_, index) => currentYear - index).map(
                                    (year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {/* Plate Number input field */}
                        <div className="col-span-2 sm:col-span-1">
                            <p className="text-lg font-semibold">Plate Number:</p>
                            <input
                                type="text"
                                disabled={type == 'view'}
                                className="border border-gray-300 px-3 py-2 w-full rounded-md"
                                value={vehicle ? vehicle.plateNumber : ''}
                                onChange={(event) =>
                                    setVehicle((prevState) => ({ ...prevState, plateNumber: event.target.value }))
                                }
                            />
                        </div>
                    </div>
                    {/* Submit button */}
                    {['edit', 'create'].includes(type) && (
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                            {type === 'edit' ? 'Edit' : type === 'create' ? 'Save' : ''}
                        </button>
                    )}
                </form>
            </div>
            <hr />
        </>
    )
}

export default VehicleDetails