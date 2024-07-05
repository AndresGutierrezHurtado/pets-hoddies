import React, {useState, useEffect} from "react";
import SizesList from "./Components/tallas.js"
import Header from "../header";
import Footer from "../footer";

function Tallas() {
    useEffect(() => {
        if (location.pathname === "/tallas") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [location.pathname]);  

    const [selectedSize, setSelectedSize] = useState("Talla 0-2");

    const sizesList = SizesList.map((T, index) => {
        return (
            <div key={ index } onClick={() => handleClick(T.talla)} className={`px-1 sm:px-4 py-2 border border-gray-500 cursor-pointer hover:bg-gray-200  duration-300 ${selectedSize === T.talla ? "hover:bg-gray-800 bg-gray-500 text-white" : ""}`} >{T.talla}</div>
        );
    });

    const detailsList = SizesList.map((T, index) => {
        return(
            <div key={ index } className={selectedSize === T.talla ? "" : "hidden"}>
                <li><span className="font-bold text-xl">Tronco:</span> {T.tamaños.cuello} CM</li>
                <li><span className="font-bold text-xl">Pecho:</span> {T.tamaños.pecho} CM</li>
                <li><span className="font-bold text-xl">Cuello:</span> {T.tamaños.cuello} CM</li>
                <li><span className="font-bold text-xl">Razas que utilizan esta talla:</span> {razasList(T.razas)}.</li>
                <br />
            </div>
        );
    });

    
    function razasList(array){
        let lista = array[0];
        for (let i = 1 ; i < array.length ; i++) {
            lista = lista + ", " + array[i]  ;
        }
        return lista;
    }
    function handleClick(size){
        setSelectedSize(size);
    }
    return(
        <>
            <Header></Header>
            <section className="w-full px-3">
                <div className="container max-w-7xl py-16 mx-auto">
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="w-full md:w-5/12"><img src="/img/talla-mascota.png" alt="Talla-Mascotas" className="h-full"/></div>
                        
                        <div className="w-full md:w-7/12 flex flex-col gap-5 text-lg">
                            <h1 className="text-3xl font-bold pb-1 tracking-tight text-gray-800 uppercase">¿cuál es la talla de mi mascota?</h1>
                            <p>Pet's Hoddies ha ajustado las razas de perritos a sus medidas, por eso fue importante crear tallas intermedias dando 
                                como resultado 12 tallas diferentes para que encajen a la perfección en nuestros perritos.
                            </p>
                            <p>Esta lista de razas va de acuerdo al promedio de medidas de los perritos según van creciendo la talla va aumentando por eso se recomienda tomar 
                                las medidas basicas para escojer la talla correcta. </p>
                        </div>
                    </div>

                </div>
            </section>
            <section className="w-full bg-white px-3">
                <div className="container max-w-7xl py-16 mx-auto">
                    <div className="flex gap-5 text-lg w-full">
                        <div className="flex flex-col gap-1 w-2/12 text-center">
                            {sizesList}
                        </div>
                        <div className="w-9/12 flex flex-col gap-1 border border-gray-500 p-5 px-12">
                            <ul className="list-disc text-lg ">
                                {detailsList}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Tallas;