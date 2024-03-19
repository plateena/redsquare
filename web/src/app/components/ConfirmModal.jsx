import Modal from "./Modal";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-white rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-4">Confirm Deletion</h1>
                <p>{message}</p>
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;