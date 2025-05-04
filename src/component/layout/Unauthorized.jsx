import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="bg-gradient-to-br from-blue-400 to-purple-400">
            <div className="min-h-screen flex flex-col justify-center items-center">
                <div className="relative">
                    <h1
                        className="text-[13rem] font-[900] bg-clip-text text-transparent max-[768px]:text-[10rem] max-[540px]:text-[8rem] max-[403px]:text-[6rem]"
                        style={{
                            backgroundImage: "url('https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770800/e7xelg4lkioyvgxc3pxe.webp')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        Oops!
                    </h1>
                </div>
                <p className='text-2xl font-bold mb-5 text-white'>404 - PAGE NOT FOUND</p>
                <p className='text-center mb-5 text-lg font-semibold max-[403px]:text-sm'>The page you're seeking has vanished into thin air.<br /> Maybe it’s been renamed, relocated, or hidden in the shadows.</p>
                <Link to={"/"} className='px-5 py-2 max-[426px]:px-4 max-[426px]:py-[6px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full font-semibold shadow-lg hover:from-orange-600 hover:to-yellow-600 transition duration-200'>
                    GO TO HOMEPAGE
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;