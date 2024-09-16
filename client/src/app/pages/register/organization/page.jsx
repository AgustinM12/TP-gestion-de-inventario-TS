"use client"

import Link from "next/link";
import useForm from "@/hooks/useForm";
import useFetch from "@/hooks/useFetch"
import { useEffect, useState } from "react";

const register = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const managers = await useFetch("/role/", "GET", 1)
            const delegates = await useFetch("/role/", "GET", 2)
            const maintenance = await useFetch("/role/", "GET", 3)

            if (managers.data && (delegates.data || maintenance.data)) {
                const allUsers = [...managers.data, ...delegates.data, ...maintenance.data];
                setUsers(allUsers);
            }
        }

        fetchUsers()
    }, [])

    console.log(users);

    const formValues = {
        name: "",
        location: "",
        manager: "",
        delegate: "",
    }

    const { values, errors, handleChange, handleSubmit } = useForm(formValues);

    const onSubmit = async () => {
        const response = await useFetch("/organization", "POST", values)

        console.log(response);

        if (response?.status !== "success") {
            alert("ERROR", response?.errors)
        } else {
            alert("god")
        }
    };

    const inputs = [
        {
            label: "Nombre de la organizacion",
            value: values.name,
            handleChange: handleChange,
            errors: errors.name,
            id: "name"
        },
        {
            label: "Ubicacion de la organizacion",
            value: values.location,
            handleChange: handleChange,
            errors: errors.location,
            id: "location",
            type: "location"
        },
    ]

    const select = [
        {
            label: "Encargado de parte de la empresa",
            value: values.manager,
            handleChange: handleChange,
            errors: errors.manager,
            id: "manager",
        },
        {
            label: "Delegado de Formotex",
            value: values.delegate,
            handleChange: handleChange,
            errors: errors.delegate,
            id: "delegate",
        },
    ]

    return (
        <div className="flex justify-center items-center min p-10">

            <div className={` border-slate-900 flex flex-col w-full max-w-md border-2 bg-gray-800 p-4 rounded-lg text-gray-200`}>

                <p className="text-center text-2xl font-bold mb-1">Registro de Organizaciones</p>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* //! NAME - LASTNAME */}
                    {inputs?.map((input, key) => (
                        <div className="flex flex-col" key={key}>
                            <label htmlFor={input.id} className="text-gray-400 mb-1">{input.label}</label>
                            <input
                                type={"text"}
                                name={input.id}
                                id={input.id}
                                className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                                value={input.name}
                                onChange={input.handleChange}
                                required
                            />
                        </div>
                    ))}
                    {select.map((input, key) => (
                        <div className="flex flex-col" key={key}>
                            <label className="text-gray-400 mb-1">{input.label}</label>

                            <select
                                name={input.id}
                                id={input.id}
                                className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                                value={input.value}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Usuarios
                                </option>

                                {key === 0
                                    ? users.filter(user => user.role === 1).map((user, index) => (
                                        <option key={index} value={user._id}>{user.name + " - DELEGATE"}</option>
                                    ))
                                    : users.filter(user => user.role !== 1).map((user, index) => (
                                        <option key={index} value={user._id}>{`${user.name} - ${user.role === 2 ? "MANAGER" : "MAINTENANCE"}`}</option>
                                    ))
                                }

                            </select>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="relative w-full px-5 py-2.5 text-gray-200 font-semibold text-sm uppercase overflow-hidden  transform bg-blue-900 border border-blue-900 rounded-md hover:bg-blue-700 hover:shadow-lg hover:ring-10 hover:ring-blue-800 hover:scale-105 transition-all duration-300"
                    >
                        Registrar
                    </button>

                </form>
            </div>
        </div >
    );
}

export default register