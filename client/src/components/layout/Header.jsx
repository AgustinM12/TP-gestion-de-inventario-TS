"use client"
import Link from "next/link";

export const Header = () => {

    return (
        <header>
            <nav className='bg-cyan-600 border-black text-white'>
                <section className='flex justify-around h-16 items-center mx-auto container'>

                    {/*logo */}
                    <div className='flex items-center -mr-10 font-gta space-x-1'>

                        <h2 className='text-lg font-bold '>
                            FORMOTEX
                        </h2>

                    </div>

                    {/* // * MODO OSCURO */}
                    <div className='flex items-center'>

                        {/* // * AVATAR */}
                        <button onClick={() => nav("/profile")} title="Perfil">
                            <img
                                className='h-6 w-6 rounded-full'
                                src="https://ui-avatars.com/api?background=random&name=Agustin+Mazza" alt="Agustin Mazza" />
                        </button>
                    </div>
                </section>
            </nav>
            {/* LINKS */}
            <section className={`bg-cyan-700 text-start py-1 pb-1 border-t transition duration-300 "translate-x-0" md:translate-x-0 md:duration-0 w-full z-40 static md:static`}>

                <ul className="grid-cols-4 grid-rows-1 grid text-center">

                    <Link href="/auth/main" className="py-2">
                        <span className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-indigo-700 before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100  px-3">

                            <span className="relative text-white group-hover:text-border font-semibold">Home</span>

                        </span>
                    </Link>

                    <Link href="/auth/device" className="py-2">
                        <span className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-indigo-700 before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100  px-3">

                            <span className="relative text-white group-hover:text-border font-semibold">Devices</span>

                        </span>
                    </Link>

                    <Link href="/auth/organization" className="py-2">
                        <span className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-indigo-700 before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100  px-3">

                            <span className="relative text-white group-hover:text-border font-semibold">Organizations</span>

                        </span>
                    </Link>

                    <Link href="/auth/register/user" className="py-2">
                        <span className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-indigo-700 before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100  px-3">

                            <span className="relative text-white group-hover:text-border font-semibold">Users</span>

                        </span>
                    </Link>
                </ul>

            </section>

        </header >
    )
}