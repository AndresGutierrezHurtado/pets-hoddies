import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Footer() {
  return (
//     <footer className="w-full bg-black/80">
//         <div className="container flex flex-col sm:flex-row justify-between max-w-7xl py-5 mx-auto text-white"> 
//         <div className="w-full sm:w-4/12 p-5 flex flex-col gap-2">
//             <img src="/img/Logo-circular.png" alt="Pet's Hoddies" className="size-[120px] mx-auto"/>
//             <p className="leading-5 p-1 mb-2">Pet's Hoddies - Fabricantes de moda para mascotas</p>
//             <div className="flex gap-3 items-center"><i className="fa-brands fa-whatsapp"></i>(+57) 312 4852078</div>
//             <div className="flex gap-3 items-center"><i className="fa-solid fa-location-dot"></i> Dg 68 D Sur 70 C 31 <br /> ( T - 14, Apto - 104 )</div>
//         </div> 
//         <div className="w-full sm:w-4/12 p-5 flex flex-col justify-center items-center">
//             <h1 className="text-2xl font-bold pb-2 tracking-tight text-gray-200 uppercase text-center">Pago Seguro</h1>
//             <img src="/img/payu.png" alt="" />
//         </div> 
//         <div className="w-full sm:w-4/12 p-5 flex flex-col items-center">
//             <h1 className="text-2xl font-bold pb-2 tracking-tight text-gray-200 uppercase text-center">100% Colombiano</h1>
//             <img src="/img/producto-colombiano.png" alt="Producto Colombiano" className="size-[200px] mt-5"/>
//         </div> 
//         </div>                
//   </footer>
    <footer className="relative z-10 bg-zinc-900 px-5 py-10 text-white" >
        <div className="container mx-auto">
            <div className="flex flex-wrap mx-4">
                <div className="w-full px-4 sm:w-2/3 lg:w-3/12">
                    <div className="flex flex-col items-center text-center gap-2">
                        <Link to="/" className="inline-block max-w-[160px]" >
                            <img src="/img/logo-circular.png" alt="logo" className="size-32" />
                        </Link>
                        <p className='text-zinc-200 text-base'> Empresa dedicada a la creación de ropa y accesorios para mascotas. </p>
                        <p className="flex items-center gap-2 text-sm text-dark font-medium">
                            <i className="fa-solid fa-phone text-lg"></i>
                            <span>+57 312 4852078</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm text-dark font-medium">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Tv. 69c #68b Sur-98 a 68b Sur-14</span>
                        </p>
                    </div>
                </div>
                <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
                    <div className="w-full mb-10">
                    <h4 className="text-lg font-semibold mb-9">
                        Resources
                    </h4>
                    <ul className="space-y-3">
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            SaaS Development
                            </a>
                        </li>
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            Our Products
                            </a>
                        </li>
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            User Flow
                            </a>
                        </li>
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            User Strategy
                            </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
                    <div className="w-full mb-10">
                    <h4 className="text-lg font-semibold text-dark dark:text-white mb-9">
                        Company
                    </h4>
                    <ul className="space-y-3">
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            About TailGrids
                            </a>
                        </li>
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            Contact & Support
                            </a>
                        </li>
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            Success History
                            </a>
                        </li>
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            Setting & Privacy
                            </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
                    <div className="w-full mb-10">
                    <h4 className="text-lg font-semibold text-dark dark:text-white mb-9">
                        Quick Links
                    </h4>
                    <ul className="space-y-3">
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            Premium Support
                            </a>
                        </li>
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            Our Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            Know Our Team
                            </a>
                        </li>
                        <li>
                            <a
                                href="javascript:void(0)"
                                className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                                >
                            Download App
                            </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
                    <div className="w-full mb-10">
                    <h4 className="text-lg font-semibold text-dark dark:text-white mb-9">
                        Contáctanos por
                    </h4>
                    <div className="flex items-center mb-6">
                        <a href="javascript:void(0)" className="flex items-center justify-center w-8 h-8 mr-3 border rounded-full text-dark hover:border-primary hover:bg-primary border-stroke dark:border-dark-3 dark:hover:border-primary dark:text-white hover:text-white sm:mr-4 lg:mr-3 xl:mr-4">
                            <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a
                            href="javascript:void(0)"
                            className="flex items-center justify-center w-8 h-8 mr-3 border rounded-full text-dark hover:border-primary hover:bg-primary border-stroke dark:border-dark-3 dark:hover:border-primary dark:text-white hover:text-white sm:mr-4 lg:mr-3 xl:mr-4"
                            >
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                        <a
                            href="javascript:void(0)"
                            className="flex items-center justify-center w-8 h-8 mr-3 border rounded-full text-dark hover:border-primary hover:bg-primary border-stroke dark:border-dark-3 dark:hover:border-primary dark:text-white hover:text-white sm:mr-4 lg:mr-3 xl:mr-4"
                            >
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                    </div>
                    <p className="text-base text-body-color dark:text-dark-6">
                        &copy; Pet's Hoddies 2024
                    </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer