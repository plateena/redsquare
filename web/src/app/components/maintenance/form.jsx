import { useState } from 'react';

const MaintenanceForm = ({ vehicleId, closeModal }) => {
    const [scheduleDate, setScheduleDate] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/v1/maintenance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vehicle: vehicleId,
                    date: scheduleDate,
                    description: description,
                    status: status,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to schedule maintenance');
            }
            closeModal();
            // Reset form fields
            setScheduleDate('');
            setDescription('');
            setStatus('Pending');
        } catch (error) {
            console.error('Error scheduling maintenance:', error);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Maintenance Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700">
                        Schedule Date
                    </label>
                    <input
                        type="date"
                        id="scheduleDate"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                {/* Hidden input for vehicleId */}
                <input type="hidden" name="vehicleId" value={vehicleId} />
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Schedule
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MaintenanceForm;