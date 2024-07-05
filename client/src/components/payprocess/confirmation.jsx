import React from 'react';

function Confirmation({transactionData}) {
  console.log(transactionData);
  const { reference_sale, value, nickname_seller, nickname_buyer, billing_address } = transactionData;

  const handleViewShippingInfo = () => {
    console.log("Ver información del envío");
  };

  return (
    <main className='bg-gray-200 min-h-screen w-full flex items-center justify-center'>
      <div className="w-5/12 mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Información de la compra:</h2>
          <hr className="my-5" />
          <span className='flex justify-between'>
            <p className='font-bold'> Referencia de venta:</p>
            <p>{reference_sale}</p>
          </span>
          <span className='flex justify-between'>
            <p className='font-bold'> Precio:</p>
            <p>{parseFloat(value).toLocaleString("es-CO", { style: "currency", currency: "COP" })} COP</p>
          </span>
          <span className='flex justify-between'>
            <p className='font-bold'> Vendedor:</p>
            <p>{nickname_seller}</p>
          </span>
          <span className='flex justify-between'>
            <p className='font-bold'> Comprador:</p>
            <p>{nickname_buyer}</p>
          </span>
          <span className='flex justify-between'>
            <p className='font-bold'> Dirección de facturación:</p>
            <p>{billing_address}</p>
          </span>

          <button onClick={handleViewShippingInfo} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Ver información del envío</button>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold">¡Gracias por realizar tu compra!</h3>
        </div>
      </div>
    </main>
  );
}

export default Confirmation;
