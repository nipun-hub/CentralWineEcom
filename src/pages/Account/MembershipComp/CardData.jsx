import React, { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext';

const CardData = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <>

            <div className="mt-10 flex flex-col gap-3 w-[538px] overflow-y-scroll pb-10 hide-scrollbar" style={{ color: theme.textColor }}>
                <div className="w-full my-2">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full px-4 py-4 border-0 focus:outline-none peer placeholder:text-sm bg-transparent"
                            placeholder="Jenn Jiang"
                        />
                        <div className="absolute inset-x-4 -top-2 flex w-fit z-10">
                            <span className="px-2 text-xs " style={{ backgroundColor: theme.background }}>
                                Cardholder Name
                            </span>
                        </div>
                        <div className="absolute inset-0 border rounded-md pointer-events-none" style={{ borderColor: theme.textColor }} />
                    </div>
                </div>
                <div className="w-full my-2">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full px-4 py-4 text-gray-700  border-0 focus:outline-none peer placeholder:text-sm bg-transparent"
                            placeholder="1234456778901234"
                        />
                        <div className="absolute inset-x-4 -top-2 flex w-fit z-10">
                            <span className="px-2 text-xs " style={{ backgroundColor: theme.background }}>
                                Card Number
                            </span>
                        </div>
                        <div className="absolute inset-0 border rounded-md pointer-events-none" style={{ borderColor: theme.textColor }} />
                    </div>
                </div>

                <div className='flex gap-4'>
                    <div className="w-full max-w-md my-2">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full px-4 py-4 text-gray-700  border-0 focus:outline-none peer placeholder:text-sm bg-transparent"
                                placeholder="01/01"
                            />
                            <div className="absolute inset-x-4 -top-2 flex w-fit z-10">
                                <span className="px-2 text-xs " style={{ backgroundColor: theme.background }}>
                                    Exp.Date
                                </span>
                            </div>
                            <div className="absolute inset-0 border rounded-md pointer-events-none" style={{ borderColor: theme.textColor }} />
                        </div>
                    </div>
                    <div className="w-full max-w-md my-2">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full px-4 py-4 text-gray-700  border-0 focus:outline-none peer placeholder:text-sm bg-transparent"
                                placeholder="435"
                            />
                            <div className="absolute inset-x-4 -top-2 flex w-fit z-10">
                                <span className="px-2 text-xs " style={{ backgroundColor: theme.background }}>
                                    CCV
                                </span>
                            </div>
                            <div className="absolute inset-0 border rounded-md pointer-events-none" style={{ borderColor: theme.textColor }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardData