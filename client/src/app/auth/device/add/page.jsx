"use client"
import { Layout } from "@/components/layout/Layout";
import useForm from "@/hooks/useForm";
import useFetch from "@/hooks/useFetch"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const addDevice = () => {

    const router = useRouter()
    const [types, setTypes] = useState([])
    const [organizations, setOrganization] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const type = await useFetch("/types", "GET")
            const organization = await useFetch("/organizations", "GET")

            if (type.data) {
                setTypes(type.data);
            }
            if (organization.data) {
                setOrganization(organization.data);
            }
        }

        fetchUsers()
    }, [])

    const formValues = {
        name: "",
        tradeMark: "",
        organization: "",
        type: "",
        defectiveDetails: "",
    }

    const { values, errors, handleChange, handleSubmit } = useForm(formValues);

    const onSubmit = async () => {
        const response = await useFetch("/device", "POST", values)

        console.log(response);

        if (response?.status !== "success") {
            alert(JSON.stringify(response?.errors))
        } else {
            alert("Dispositivo añadido con exito")
            router.push("/auth/device")
        }
    };

    const inputs = [
        {
            label: "Nombre del dispositivo",
            value: values.name,
            handleChange: handleChange,
            errors: errors.name,
            id: "name"
        },
        {
            label: "Marca del dispositivo",
            value: values.tradeMark,
            handleChange: handleChange,
            errors: errors.tradeMark,
            id: "tradeMark",
            type: "tradeMark"
        },
        {
            label: "Defectos del dispositivo",
            value: values.defectiveDetails,
            handleChange: handleChange,
            errors: errors.defectiveDetails,
            id: "defectiveDetails",
            type: "defectiveDetails"
        },
    ]

    const select = [
        {
            label: "Tipo del dispositivo",
            value: values.type,
            handleChange: handleChange,
            errors: errors.type,
            id: "type",
        },
        {
            label: "Organizacion dueña del dispositivo",
            value: values.organization,
            handleChange: handleChange,
            errors: errors.organization,
            id: "organization",
        },
    ]

    return (
        <Layout>


            <div className="flex justify-center items-center min p-10">

                <div className={` border-slate-900 flex flex-col w-full max-w-md border-2 bg-gray-800 p-4 rounded-lg text-gray-200`}>

                    <p className="text-center text-2xl font-bold mb-1">Cargar un dispositivo</p>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                        {/* //! NAME - LASTNAME */}
                        {inputs?.map((input, key) => (
                            key !== inputs.length - 1 ? (
                                <div className="flex flex-col" key={key}>
                                    <label htmlFor={input.id} className="text-gray-400 mb-1">{input.label}</label>
                                    <input
                                        type="text"
                                        name={input.id}
                                        id={input.id}
                                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                                        value={input.name}
                                        onChange={input.handleChange}
                                        required
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col" key={key}>
                                    <label htmlFor={input.id} className="text-gray-400 mb-1">{input.label}</label>
                                    <textarea
                                        name={input.id}
                                        id={input.id}
                                        rows={4}
                                        className="bg-gray-700 border border-gray-600 rounded p-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                                        value={input.name}
                                        onChange={input.handleChange}
                                        required
                                    />
                                </div>
                            )
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
                                        {key === 0 ? "Tipos de dispositivos" : "Organizaciones"}
                                    </option>

                                    {key === 0
                                        ? (types.map((type, index) => (
                                            <option key={index} value={type._id}>{type.name}</option>
                                        ))) :
                                        (organizations.map((organization, index) => (
                                            <option key={index} value={organization._id}>{organization.name}</option>
                                        )))
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
                </div >
            </div >
        </Layout>
    );
}

export default addDevice