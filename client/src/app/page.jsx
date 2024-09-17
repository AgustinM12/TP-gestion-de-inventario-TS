"use client"
import Link from "next/link";
import useForm from "@/hooks/useForm"
import useToggle from "@/hooks/useToggle";
import useFetch from "@/hooks/useFetch";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import setTokenCookie from "@/utils/setToken";

export default function Home() {

  const { toggle, handleToggle } = useToggle(false)

  const formValues = {
    user: "",
    password: "",
  }

  const { values, errors, handleChange, handleSubmit } = useForm(formValues);

  const onSubmit = async () => {
    const response = await useFetch("/login", "POST", values)

    if (response.status !== "success") {
      alert(response.message)
    } else {
      setTokenCookie(response.data, 1)
    }
  }

  return (

    <div className="flex justify-center items-center min-h-screen p-10 flex-col">

      <h1 className="font-bold text-slate-200 text-2xl pb-10">Formotex</h1>

      <div className={`border-slate-900 bg-gray-800 p-6 rounded-lg w-full max-w-md text-gray-200 border-2`}>
        <p className="text-center text-2xl font-bold mb-1">Login</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          <div className="flex flex-col">
            <label htmlFor="user" className="text-gray-400 mb-1">Username o Email</label>
            <input
              type="text"
              name="user"
              id="user"
              className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
              value={values.user}
              onChange={handleChange}
              required
            />
            {errors.user && (<span className="text-red-500 font-semibold text-center underline">{errors.user}</span>)}
          </div>

          < div className="flex flex-col">
            <label htmlFor="password" className="text-gray-400 mb-1">Contraseña</label>

            <div className="flex">
              <input
                type={!toggle ? "text" : "password"}
                name="password"
                id="password"
                className="bg-gray-700 border border-gray-600 p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700 rounded-s w-full"
                value={values.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="border-r border-y p-2 rounded-e hover:bg-slate-300 transition-colors duration-300 hover:text-black" onClick={handleToggle}>{toggle ? (<FaRegEye />) : (<FaRegEyeSlash />)}</button>
            </div>

            {errors.password && (<span className="text-red-500 font-semibold text-center underline">{errors.password}</span>)}

          </div>

          <button
            type="submit"
            className="relative w-full px-5 py-2.5 text-gray-200 font-semibold text-sm uppercase overflow-hidden  transform bg-blue-900 border border-blue-900 rounded-md hover:bg-blue-700 hover:shadow-lg hover:ring-10 hover:ring-blue-800 hover:scale-105 transition-all duration-300"
          >
            Iniciar sesión
          </button>

        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-600"></div>
          <p className="mx-2 text-sm text-gray-400">Inicia sesión con otras cuentas</p>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">¿Todavia no tienes una cuenta?
          <Link href="/auth/register/user">
            <span className="hover:underline hover:text-blue-400 transition-colors duration-300 text-blue-800">  Registrate</span>
          </Link>
        </p>
      </div>
    </div >

  );
}
