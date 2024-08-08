import React from 'react';
import { Button } from '@/components/ui/button'; // Adjust the import according to your project structure
import { saveAs } from 'file-saver'; // Ensure this is installed
import { CheckCircle2 } from 'lucide-react';


const Modal = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen) return null;

  const downloadOrderDetails = () => {
    const blob = new Blob([JSON.stringify(orderDetails, null, 2)], { type: 'application/json' });
    saveAs(blob, 'order-details.json');
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
      <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center justify-center w-24 h-24 bg-green-100 rounded-full shadow-lg">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <h2 className="font-medium text-3xl text-primary mt-4">Order Placed</h2>
          <p className="text-lg text-gray-700 mt-2">Thank You for Your Order</p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        
        {/* User Information */}
        <div className="mb-4">
          <h3 className="font-semibold">User Information:</h3>
          <p><strong>Name:</strong> {orderDetails.username}</p>
          <p><strong>Email:</strong> {orderDetails.email}</p>
          <p><strong>Phone:</strong> {orderDetails.phone}</p>
          <p><strong>Address:</strong> {orderDetails.address}</p>
        </div>

        {/* Order Details Table */}
        <div className="mb-4">
          <h3 className="font-semibold">Order Items:</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Item</th>
                <th className="border p-2 text-left">Quantity</th>
                <th className="border p-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderItemList.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-center">{item.quantity || 1}</td>
                  <td className="border p-2 text-right">{item.amount} Rs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="mb-4">
          <h3 className="font-semibold">Order Summary:</h3>
          <div className="flex justify-between py-2">
            <span>SubTotal:</span>
            <span>{orderDetails.subtotal} Rs</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Delivery:</span>
            <span>{orderDetails.deliveryCharge || '40'} Rs</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Tax(9%):</span>
            <span>{orderDetails.taxAmount} Rs</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold py-2">
            <span>Total:</span>
            <span>{orderDetails.totalOrderAmount} Rs</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex space-x-4">
          <Button onClick={downloadOrderDetails}>Download</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
