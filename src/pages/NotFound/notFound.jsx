import React, { useContext } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ThemeContext } from '../../context/ThemeContext';

const NotFound = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <section
                className="flex items-center justify-center min-h-screen"
                style={{ backgroundColor: theme.background }}
            >
                <div className="text-center">
                    <h1 className={`text-6xl font-bold ${theme.name === 'light' ? 'text-black' : 'text-[#FF0040]'}`}>
                        404
                    </h1>
                    <h2 className={`text-4xl font-semibold mt-4 ${theme.name === 'light' ? 'text-black' : 'text-[#FF0040]'}`}>
                        Page Not Found
                    </h2>
                    <p className="mt-4 text-lg" style={{ color: theme.textColor }}>
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <a
                        href="/"
                        className={`inline-block mt-8 px-6 py-2 rounded-lg ${theme.name === 'light'
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-[#FF0040] text-white hover:bg-[#CC0033]'
                            } transition-colors duration-300`}
                    >
                        Go Home
                    </a>
                </div>
            </section>
        </>
    );
};

export default NotFound;