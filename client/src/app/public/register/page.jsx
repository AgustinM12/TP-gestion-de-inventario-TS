"use client"
import Link from "next/link";
import useForm from "@/hooks/useForm";
import useToggle from "@/hooks/useToggle";
import useFetch from "@/hooks/useFetch"
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const register = () => {

    const router = useRouter()

    const formValues = {
        name: "",
        email: "",
        dni: "",
        password: "",
        role: 2
    }

    const { toggle: passInput, handleToggle: handlePassInput } = useToggle()
    const { values, errors, handleChange, handleSubmit } = useForm(formValues);

    const inputs = [
        {
            label: "Nombre de usuario",
            value: values.name,
            handleChange: handleChange,
            errors: errors.name,
            id: "name"
        },
        {
            label: "Email",
            value: values.email,
            handleChange: handleChange,
            errors: errors.email,
            id: "email",
            type: "email"
        },
        {
            label: "DNI",
            value: values.dni,
            handleChange: handleChange,
            errors: errors.dni,
            id: "dni",
        },
        {
            label: "Contraseña",
            value: values.password,
            handleChange: handleChange,
            errors: errors.password,
            id: "password",
            toggle: passInput,
            handleInput: handlePassInput
        },
    ]

    const onSubmit = async () => {
        const response = await useFetch("/user", "POST", values)

        console.log(response);

        if (response?.status !== "success") {
            alert(JSON.stringify(response?.errors))
        } else {
            alert("Registro exitoso")
            router.push("/")
        }
    };

    return (
        <div className="flex justify-center items-center min p-10 flex-col">

            <h1 className="font-bold text-slate-200 text-2xl pb-10">Formotex</h1>

            <div className={` border-slate-900 flex flex-col w-full max-w-md border-2 bg-gray-800 p-4 rounded-lg text-gray-200`}>

                <p className="text-center text-2xl font-bold mb-1">Registro de usuarios</p>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* //! NAME - LASTNAME */}
                    {inputs?.map((input, key) => (
                        <div className="flex flex-col" key={key}>
                            <label htmlFor={input.id} className="text-gray-400 mb-1">{input.label}</label>
                            <input
                                type={key === inputs.length - 1 && passInput ? "password" : "text"}
                                name={input.id}
                                id={input.id}
                                className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                                value={input.name}
                                onChange={input.handleChange}
                                required
                            />

                            {/* Si es el último elemento del array, muestra el botón */}
                            {key === inputs.length - 1 && (
                                <div className="pt-2">
                                    <button
                                        type="button"
                                        className="border p-2 rounded hover:bg-slate-300 transition-colors duration-300 hover:text-black w-fit"
                                        onClick={input.handleInput}  // Utilizamos input del map actual
                                    >
                                        {input.toggle ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="relative w-full px-5 py-2.5 text-gray-200 font-semibold text-sm uppercase overflow-hidden  transform bg-blue-900 border border-blue-900 rounded-md hover:bg-blue-700 hover:shadow-lg hover:ring-10 hover:ring-blue-800 hover:scale-105 transition-all duration-300"
                    >
                        Registrar
                    </button>

                </form>

                <p className="text-center text-sm text-gray-400 mt-4">¿Ya tienes una cuenta?
                    <Link href="/">
                        <span className="hover:underline hover:text-blue-400 text-blue-800 transition-colors duration-300"> Iniciar sesión</span>
                    </Link>
                </p>
            </div>
        </div >
    );
}

export default register