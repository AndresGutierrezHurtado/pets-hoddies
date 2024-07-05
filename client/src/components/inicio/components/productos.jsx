import React from "react";

function Card(props){

    const handleAddToCart = () => {
        props.addToCart(props.id, props);
    }

    return(
        <>
            <div className="border rounded-lg h-[320px] w-[290px] p-3 md:p-5 flex flex-col justify-between items-center shadow-md hover:scale-[1.02] hover:shadow-lg duration-300">
                <div className="h-[130px] w-11/12 mx-auto flex justify-center items-center overflow-hidden">
                <img src={props.img} alt="" className=" max-w-full max-h-full"/>
                </div>

                <div className="w-full">
                    <h1 className="text-xl">{props.title}</h1>
                    <p>{props.description}</p>
                    <p className="text-md font-semibold">{Intl.NumberFormat().format(props.price)} COP</p>
                </div>
                <button className="bg-amber-500 px-5 py-1 text-white rounded-lg hover:bg-amber-600 duration-300" onClick={handleAddToCart}><i className="fa-solid fa-cart-plus"></i></button>
            </div>
        </>
    );
}

export default Card;
