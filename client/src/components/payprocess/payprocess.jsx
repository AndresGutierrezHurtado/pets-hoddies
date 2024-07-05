import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CryptoJS , {MD5} from 'crypto-js';

function PayProcess() {
    const [cart, setCart] = useState([]);
    const [formData, setFormData] = useState({
        merchantId: '508029',
        accountId: '512321',
        apiKey: '4Vj8eK4rloUd272L48hsrarnUA',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const datosJSON = localStorage.getItem('carrito');
        const cartDecoded = JSON.parse(datosJSON);
        setCart(cartDecoded)
    }, [])

    useEffect(() => {
        const saveCartToLocalStorage = async () => {
            try {
                await localStorage.setItem('carrito', JSON.stringify(cart));
            } catch (error) {
                console.error('Error al guardar el carrito en el local storage:', error);
            }
        };

        if (cart.length > 0) {
            saveCartToLocalStorage();
        }
    }, [cart]);

    const handleQuantityChange = (event, index) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            const newCart = [...cart];
            newCart[index].cantidad = newQuantity;
            setCart(newCart);
        }
    };

    const removeFromCart = (index) => {
        if (cart.length > 1) {
            const newCart = [...cart];
            newCart.splice(index, 1);
            setCart(newCart);

        } else {
            alert('Debe haber mínimo 1 producto.');
        }
    };
    

    const selectedProducts = cart.map((p, index) => ( // Añade el índice aquí
        <div key={p.id}>
            <span className='flex justify-between'>
            <h1 className='text-lg pb-1'>{p.title}</h1>
            <button className='hover:text-gray-500' onClick={() => removeFromCart(index)}><i className="fa-regular fa-trash-can"></i></button>
            </span>
            <span className='flex justify-between'>
                <input type="number" className='border px-3 py-1 rounded-md inline-block w-fit max-w-16' min="1" max="20" onKeyDown={(e) =>{e.preventDefault()}} defaultValue={p.cantidad} onChange={(event) => handleQuantityChange(event, index)} />
                <p>{(p.price * p.cantidad).toLocaleString("es-CO", { style: "currency", currency: "COP" })} COP</p>
            </span>
        </div>
    ));

    const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.cantidad, 0);
    const shipping = 7500; 
    const iva = subtotal * 0.19; 
    const total = subtotal + shipping + iva;

    const soloTitulos = cart.map(objeto => objeto.title);
    const description = soloTitulos.join(', ') + '.';


    function generateUniqueReferenceCode() {
        const timestamp = new Date().getTime().toString(36).slice(-5);     
        const randomString = Math.random().toString(36).substring(2, 8);    
        const referenceCode = timestamp + randomString;
    
        return referenceCode.toUpperCase();
    }
    
    const uniqueReferenceCode = generateUniqueReferenceCode();

    const signature = MD5(formData.apiKey + '~' +  formData.merchantId + '~' + uniqueReferenceCode  + '~' + total + '~' + 'COP').toString(CryptoJS.enc.Hex);

    return (
        <main className='min-h-screen w-full bg-gray-200 flex flex-col justify-center items-center'>
            <div className='w-full md:w-10/12 lg:w-7/12 my-5'>            
                <h1 onClick={() => {navigate('/productos')}} className='cursor-pointer text-lg text-gray-800 font-semibold'> <i className="fa-solid fa-angle-left"></i> Seguir comprando </h1> 
                <div className='flex flex-col md:flex-row items-start gap-5 my-5'>
                    <article className='w-full md:w-4/12 p-5 bg-white rounded-md shadow-lg'>
                        <div className='flex justify-between items-center'>
                            <h2 className='font-bold text-lg'>Resumen de la compra:</h2>
                            <p className='text-sm text-gray-500'> {cart.length} {cart.length <= 1 ? 'producto' : 'productos'}</p>
                        </div>
                        <hr className='my-2'/>

                        {selectedProducts}

                        <hr className='my-2'/>

                        <div className="group flex justify-between">
                            <p>Subtotal:</p>
                            <p>{subtotal.toLocaleString("es-CO", { style: "currency", currency: "COP" })} COP</p>
                        </div>
                        <div className="group flex justify-between">
                            <p>Envío:</p>
                            <p>{shipping.toLocaleString("es-CO", { style: "currency", currency: "COP" })} COP</p>
                        </div>
                        <div className="group flex justify-between">
                            <p>IVA:</p>
                            <p>{iva.toLocaleString("es-CO", { style: "currency", currency: "COP" })} COP</p>
                        </div>
                        <div className="group flex justify-between">
                            <p>Total:</p>
                            <p>{total.toLocaleString("es-CO", { style: "currency", currency: "COP" })} COP</p>
                        </div>

                    </article>
                    <article className='w-full md:w-8/12 p-5 bg-white rounded-md shadow-lg'>
                        <h2 className='font-bold text-lg'>Datos del pago:</h2>
                        <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">

                            <input name="merchantId" type="hidden" value={formData.merchantId} />
                            <input name="accountId" type="hidden" value={formData.accountId} />
                            <input name="apiKey" type="hidden" value={formData.apiKey} />
                            <input name="description" type="hidden" value={description} />
                            <input name="referenceCode" type="hidden" value={uniqueReferenceCode} />
                            <input name="amount" type="hidden" value={total} />
                            <input name="tax" type="hidden" value="0" />
                            <input name="currency" type="hidden" value="COP" />
                            <input name="signature" type="hidden" value={signature} />
                            <input name="test" type="hidden" value='1' />
                            <input name="confirmationUrl" type="hidden" value="http://localhost:5173/confirmation" />

                            <div className="my-4">
                                <label className="text-gray-700 text-sm font-bold my-1" htmlFor="email">Correo Electrónico <span className='text-red-500/[0.8]'>(*)</span></label>
                                <input name="buyerEmail" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="email" type="email" placeholder="Correo Electrónico" required></input>
                            </div>
                            <div className="mb-4">
                                <label className="text-gray-700 text-sm font-bold my-1" htmlFor="nombre">Nombre Completo <span className='text-red-500/[0.8]'>(*)</span></label>
                                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="nombre" type="text" placeholder="Nombre" required></input>
                            </div>
                            <div className="mb-4">
                                <label className="text-gray-700 text-sm font-bold my-1" htmlFor="telefono">Teléfono</label>
                                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="telefono" type="tel" placeholder="Teléfono"></input>
                            </div>
                            <div className="mb-4">
                                <label className="text-gray-700 text-sm font-bold my-1" htmlFor="pais">País <span className='text-red-500/[0.8]'>(*)</span></label>
                                <select name="" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="pais" required>
                                    <option value="">-- Selecciona --</option>
                                    <option value="COL">Colombia</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-gray-700 text-sm font-bold my-1" htmlFor="ciudad">Ciudad <span className='text-red-500/[0.8]'>(*)</span></label>
                                        <select name="" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="ciudad" required>
                                            <option value="">-- Selecciona --</option>
                                            <option value="BOG">Bogotá</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-gray-700 text-sm font-bold my-1" htmlFor="codigo-postal">Código Postal</label>
                                        <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="codigo-postal" type="text" placeholder="Código Postal"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="text-gray-700 text-sm font-bold my-1" htmlFor="direccion">Dirección <span className='text-red-500/[0.8]'>(*)</span></label>
                                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="direccion" type="text" placeholder="Dirección" required></input>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Enviar</button>
                            </div>
                        </form> 
                    </article>
                </div>
            </div>

        </main>
    )
}

export default PayProcess;