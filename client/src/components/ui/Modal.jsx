"use client"
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useForm from "@/hooks/useForm";

const Modal = ({ btnIcon, message, title, btnText, children, form, onSubmit, submitFunction, otherClass, tip, }) => {

    const [isOpen, setOpen] = useState(false);
    const [animation, setAnimation] = useState(true);
    const { handleSubmit } = useForm()

    const openModal = () => {
        setAnimation(true);
        setTimeout(() => {
            setOpen(true);
        }, 100);
    }

    const closeModal = () => {
        setAnimation(false);
        setTimeout(() => {
            setOpen(false);
        }, 100);
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-scree">
                <button
                    onClick={openModal}
                    className={`${otherClass} group relative flex items-center justify-center p-1 rounded-md border-none transition-all duration-450 ease-in-out transform`}
                    title={tip}
                >
                    <span className="relative z-10 transition-all duration-450 ease-in-out group-hover:text-white">
                        {btnText}
                    </span>
                    <span className="relative z-10 transition-all duration-800 ease-in-out group-hover:fill-white group-hover:scale-120 text-2xl">
                        {btnIcon}
                    </span>
                </button>
            </div>

            {isOpen && (
                <div className={`fixed inset-0 flex justify-center items-center transition-all bg-black/30 opacity-0
                    duration-200 ease-in-out z-50 backdrop-blur-sm ${animation ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`}
                >
                    {/* CONTENIDO */}
                    <div
                        className={` "bg-slate-700 rounded-lg text-left overflow-hidden shadow-lg transition-all mx-8 sm:max-w-lg duration-300 text-slate-800
                            ${animation ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}
                            `}>

                        <div className="py-2 flex  justify-end pr-1 cursor-pointer">
                            <i onClick={closeModal} className={`text-neutral-200 text-2xl hover:text-blue-700 overflow-hidden`}>
                                <IoIosCloseCircleOutline />
                            </i>
                        </div>

                        {form ? (
                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

                                <div className={`bg-slate-600 px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                                    <div className="sm:flex sm:items-start">

                                        <div className={`border-blue-600 bg-blue-400 mx-auto flex items-center justify-center rounded-full sm:mx-0 h-10 w-10 border-2`}>
                                            {btnIcon}
                                        </div>

                                        <div className="text-center mt-3 sm:mt-0 sm:ml-4 sm:text-left">

                                            <h3 className={`text-neutral-100 text-lg font-medium`}>{title}</h3>

                                            <div className="flex flex-col">
                                                {children}
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className={`bg-slate-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2 mx-auto gap-y-2`}>

                                    <button type="button" onClick={closeModal} className="w-full px-4 py-2 my-2 rounded-md hover:bg-gray-400 bg-slate-200 font-medium sm:text-sm transition-all duration-300">
                                        Cancelar
                                    </button>

                                    <button type="submit" onClick={closeModal} className="w-full px-4 py-2 my-2 rounded-md bg-blue-700 hover:bg-blue-600 font-medium sm:text-sm text-white transition-all duration-300">
                                        Confirmar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className={`bg-slate-600 px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                                    <div className="sm:flex sm:items-start">

                                        <div className={`bg-blue-400 border-blue-600 border-2 mx-auto text-black flex items-center justify-center rounded-full sm:mx-0 h-10 w-10`}>
                                            {btnIcon}
                                        </div>

                                        <div className="text-center mt-3 sm:mt-0 sm:ml-4 sm:text-left">

                                            <h3 className={`text-neutral-100 text-lg font-medium`}>{title}</h3>

                                            <div className="mt-2">
                                                <p className={`text-neutral-200 text-sm`}>{message}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className={`bg-slate-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2 mx-auto gap-y-2`}>

                                    <button type="button" onClick={closeModal} className="w-full px-4 py-2 my-2 rounded-md hover:bg-gray-400 bg-slate-200 font-medium sm:text-sm transition-all duration-300">
                                        Cancelar
                                    </button>

                                    <button type="submit" onClick={submitFunction} className="w-full px-4 py-2 my-2 rounded-md bg-blue-700 hover:bg-blue-600 font-medium sm:text-sm text-white transition-all duration-300">
                                        Confirmar
                                    </button>

                                </div>
                            </>
                        )}
                    </div >
                </div >)}

        </>
    );
};
export default Modal