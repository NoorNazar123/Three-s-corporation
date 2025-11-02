import { useState } from 'react';

const OrderModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  variant: string;
}> = ({ isOpen, onClose, productId, variant }) => {
  const [quantity, setQuantity] = useState(1);
  const [userName, setUsername] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productId', String(productId));
    formData.append('variant', variant);
    formData.append('quantity', String(quantity));
    formData.append('userName', userName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);

    const filesInput = document.getElementById('fileInput') as HTMLInputElement;
    if (filesInput?.files?.length) {
      for (const file of Array.from(filesInput.files)) {
        formData.append('files', file);
      }
    }

    try {
      const response = await fetch('/api/orderConfirm', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setOrderPlaced(true);

        setTimeout(() => {
          setOrderPlaced(false);
          onClose();
        }, 1000);
      } else {
        alert('Failed to place your order. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-[#fff4f4]/50 backdrop-blur-sm z-50 flex justify-center items-center ${
        !isOpen ? 'hidden' : ''
      }`}
      onClick={onClose}
    >
      <div
        className="shadow-lg text-gray-900 rounded-lg p-6 w-96 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {!orderPlaced ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Place Your Order</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full rounded-md p-3 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                  min={1}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Username</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-md p-3 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-md p-3 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-md p-3 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Attach Files (optional)</label>
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  className="w-full rounded-md p-3 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="border border-gray-300 hover:bg-green-600 hover:text-white py-2 px-6 rounded"
                >
                  Place Order
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-gray-300 hover:bg-red-600 hover:text-white py-2 px-6 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
            <p>We have received your order. We will contact you soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
