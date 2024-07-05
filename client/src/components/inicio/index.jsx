import React, { useState, useEffect } from "react";
import Card from "./components/productos";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

function Index() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cart, setCart] = useState([]);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [isCartVisible, setCartVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/productos") {
            const sectionProductos = document.getElementById("Section-Productos");
            if (sectionProductos) {
                const alturaP = sectionProductos.offsetTop - 120;
                window.scrollTo({ top: alturaP, behavior: "smooth" });
            }
        } else if (location.pathname === "/conocenos") {
            const sectionConocenos = document.getElementById("Section-Conocenos");
            if (sectionConocenos) {
                const alturaC = sectionConocenos.offsetTop - 120;
                window.scrollTo({ top: alturaC, behavior: "smooth" });
            }
        } else if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [location.pathname]);

    useEffect(() => {
        fetch('http://localhost:3000/productos')
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(error => console.error('Error al obtener productos:', error));
    }, []);

    useEffect(() => {
        const filtered = productos.filter(producto => producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredProducts(filtered);
    }, [searchTerm, productos]);

    useEffect(() => {
        const datosJSON = localStorage.getItem('carrito');
        if (datosJSON) {
            const cartDecoded = JSON.parse(datosJSON);
            setCart(cartDecoded);            
        } else {
            setCart([]);
        }
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

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? 1 : prevSlide - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 1 ? 0 : prevSlide + 1));
    };

    const handleToggleProducts = () => {
        setShowAllProducts((prevShowAll) => !prevShowAll);
    };

    const addToCart = (id, product) => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            alert('Debes iniciar sesión para poder agregar productos al carrito.')
        } else {            

            let existingProductIndex = cart.findIndex(cartProduct => cartProduct.id === id);
        
            if (existingProductIndex >= 0) {
                const updatedCart = [...cart];
                updatedCart[existingProductIndex].cantidad++;
                setCart(updatedCart);
            } else {
                setCart(prevCart => [...prevCart, { ...product, cantidad: 1, talla: "" }]);
            }
        }
    };
    
    const cleanCart = () => {
        const newCart = [];
        setCart(newCart);
        localStorage.setItem('carrito', JSON.stringify(newCart));
    }
    
    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const updateProductSize = (index, size) => {
        const updatedCart = [...cart];
        updatedCart[index].talla = size;
        setCart(updatedCart);
    };

    const handleSubmit = (carrito) => {
        const allSizesSelected = carrito.every(product => product.talla !== "");
        
        if (!allSizesSelected) {
            alert("Por favor, selecciona la talla para todos los productos.");
            return;

        } else {
            var datosJSON = JSON.stringify(carrito);
            localStorage.setItem('carrito', datosJSON);
            navigate('/pay-process');
        }
    }

    const handleQuantityChange = (event, index) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            const newCart = [...cart];
            newCart[index].cantidad = newQuantity;
            setCart(newCart);
        }
    };
    
    const productosBd = filteredProducts.map(p => {
        return (
            <Card id={p.producto_id} title={p.nombre} description={p.descripcion} price={p.precio} img={p.img} key={p.producto_id} addToCart={addToCart}/>
        );
    });
    
    return(
    <>
        <Header onInputChange={handleInputChange}></Header>
        <section className="w-full px-2" id="Section-Inicio">
            <div className="container max-w-7xl py-16 mx-auto">
                <div className="relative overflow-hidden w-full mb-3">
                    
                    <div className="flex transition-transform ease-in-out duration-300 transform" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        <div className="w-full flex-shrink-0">
                            <img src="/img/slide1.jpg" alt="slide1" className="w-10/12	mx-auto"/>
                        </div>
                        <div className="w-full flex-shrink-0">
                            <img src="https://static.vecteezy.com/system/resources/previews/007/301/684/non_2x/pet-shop-banner-design-template-cartoon-illustration-of-cats-dogs-house-food-vector.jpg" alt="slide2" className="w-10/12 mx-auto"/>
                        </div>
                    </div>

                    <button className="absolute bg-white rounded-full shadow duration-300 text-2xl size-[45px] md:size-[55px] hover:bg-gray-100 inset-y-2/4 left-0" onClick={handlePrevSlide}><i className="fa-solid fa-angle-left"></i></button>
                    <button className="absolute bg-white rounded-full shadow duration-300 text-2xl size-[45px] md:size-[55px] hover:bg-gray-100 inset-y-2/4 right-0" onClick={handleNextSlide}><i className="fa-solid fa-angle-right"></i></button>
                                
                </div>
                <div className="flex justify-center gap-3">
                    <div className={`size-3 rounded-full  ${ currentSlide === 0 ? "bg-gray-800" : "bg-gray-300" }`} ></div>
                    <div className={`size-3 rounded-full  ${ currentSlide === 1 ? "bg-gray-800" : "bg-gray-300" }`} ></div>
                </div>
            </div>
        </section>
        <section className="w-full bg-white px-3" id="Section-Productos">
            <div className="container flex flex-col justify-center items-center max-w-7xl py-16 mx-auto relative">
                <div className="w-full text-center my-5">            
                    <h1 className="text-4xl font-bold pb-2 tracking-tight text-gray-800 uppercase">Productos</h1>
                    <p className="text-lg">Diseños únicos y exclusivos que encajan perfectamente en cualquier raza</p>
                </div>
                {productosBd.length === 0 ? ( 
                    <div className="text-center">
                        <h1 className="text-9xl font-black text-gray-300">404</h1>                    
                        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
                        <p className="mt-4 text-gray-500">No pudimos encontrar ningún producto.</p>
                    </div>
                ) : ( 
                    <div className="my-10 container mx-auto flex flex-wrap justify-center gap-5"> 
                        {showAllProducts ? productosBd : productosBd.slice(0, 4)} 
                    </div> 
                )}
                {productosBd.length > 4 && ( 
                    <button onClick={handleToggleProducts} className="bg-amber-500 px-6 py-1 shadow-lg text-white rounded-lg hover:bg-amber-600 duration-300 font-bold text-lg"> 
                        {showAllProducts ? "Ver menos" : "Ver más"} 
                    </button> 
                )}                
                {localStorage.getItem('token')  && (
                    <button className="rounded-full border-2 border-orange-400 text-orange-400 size-14 absolute bottom-10 right-10 duration-300 hover:bg-black/[0.1]" onClick={() => setCartVisible(true)}><i className="fa-solid fa-cart-shopping"></i></button>
                )}
            </div>
        </section>
        <section className="w-full px-3" id="Section-Conocenos">
            <div className="container flex flex-col sm:flex-row justify-between max-w-7xl py-16 mx-auto gap-10">                
                <div className="w-full sm:w-8/12 flex flex-col gap-4">
                    <div className="pb-2 flex flex-col">
                        <h1 className="text-4xl font-bold  tracking-tight text-gray-800 uppercase">Conócenos</h1>
                        <span className="w-[130px] h-[5px] mt-2 bg-gray-800"></span>
                    </div>         
                    <p className="text-lg">Rosmari Hurtado y Alexandra Hurtado, fundadoras de Pets Hoddies, iniciaron esta empresa 
                    inspiradas por su adopción de Tommy.</p>

                    <p className="text-lg">Tommy estaba fue dado en adopción después de haber sido rescatado del abandono en el 
                    piso subterráneo del centro comercial El Ensueño y pronto se convirtió en una parte fundamental de sus vidas.</p>

                    <p className="text-lg">Eventualmente notaron la dificultad para encontrar ropa para Tommy que se adaptara a 
                    sus gustos y estilo de vida, gracias a esto decidieron empezar a diseñar prendas para esta mascota, y así 
                    nació Pets Hoddies, una marca dedicada a proporcionar moda canina de alta calidad, diseñada con amor y atención a cada detalle.</p>

                </div>
                <div className="w-full sm:w-4/12 overflow-hidden max-h-[450px] px-8">
                    <img src="/img/Tommy-adoptado.jpg" alt="Tommy" className="w-full" />
                </div>
            </div>
        </section>        
        <Footer />
        
        {isCartVisible && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                <span className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 backdrop-blur-[1.5px]" onClick={() => setCartVisible(false)}></span>
                <div className="bg-white w-full sm:w-11/12 md:10/12 mx-auto rounded-md shadow-lg px-0 sm:px-10 py-5 z-50">
                    <div className="flex justify-between items-center pb-3">
                        <h1 className="text-lg font-bold">Carrito de compra: </h1>
                        <button className="rounded-full border-2 border-black size-10" onClick={() => setCartVisible(false)}><i className="fa-solid fa-x "></i></button>
                    </div>
                    <hr />
                    {cart.length == 0 ? (
                        <p className="text-center py-5 text-lg font-bold">No hay productos aún...</p>
                    ) : (
                    <table className="w-full my-4 text-sm sm:text-lg">
                        <thead className="font-bold">
                            <tr>
                            <th>Nombre</th>
                            <th>talla</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th className="hidden sm:table-cell	">Precio Total</th>
                            <th className="hidden sm:table-cell	">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {cart.map((item, index) => (
                                <tr className="" key={index}>
                                    <td>{item.title}</td> 
                                    <td>
                                        <select id="selectedSize" className="sm:px-3 sm:py-1 rounded-md border border-black bg-slate-100" onChange={(e) => updateProductSize(index, e.target.value)} value={item.talla} required>
                                            <option value="">-- seleccione --</option>
                                            <option value="talla-0-2">Talla 0-2</option>
                                            <option value="talla-4">Talla 4</option>
                                            <option value="talla-6">Talla 6</option>
                                            <option value="talla-8">Talla 8</option>
                                            <option value="talla-10">Talla 10</option>
                                            <option value="talla-12">Talla 12</option>
                                            <option value="talla-14">Talla 14</option>
                                            <option value="talla-16">Talla 16</option>
                                            <option value="talla-18">Talla 18</option>
                                            <option value="talla-20">Talla 20</option>
                                            <option value="talla-22">Talla 22</option>
                                        </select>
                                    </td>
                                    <td>{item.price.toLocaleString('en-CO') } COP </td> 
                                       <td><input type="number" className='border px-3 py-1 rounded-md inline-block w-fit max-w-16' min="1" max="20" onKeyDown={(e) =>{e.preventDefault()}} defaultValue={item.cantidad} onChange={(event) => handleQuantityChange(event, index)} /></td> 
                                    <td className="hidden sm:table-cell	">{(item.price * item.cantidad).toLocaleString('en-CO') } COP </td> 
                                    <td>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-md my-1 hidden sm:table-cell	" onClick={ () =>  removeFromCart(index)}> Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                    {cart.length > 0 && (
                        <>
                            <hr />
                            <div className="flex gap-5 justify-between items-center pt-5">
                                <button className="border-2 border-red-500 text-red-500 font-bold px-2 py-1 rounded-md my-1" onClick={cleanCart}>Vaciar Carrito</button>
                                <button className="border-2 border-green-500 text-green-500 px-2 font-bold py-1 rounded-md my-1" onClick={() => handleSubmit(cart)}>Comprar</button>
                            </div>
                        </>
                    )}

                </div>        
            </div>
        )}
    </>
    );
}

export default Index;