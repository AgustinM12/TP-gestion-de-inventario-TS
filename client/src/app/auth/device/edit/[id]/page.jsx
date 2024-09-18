"use client"
import { Layout } from "@/components/layout/Layout"
import { useState, useEffect } from "react"
import useFetch from "@/hooks/useFetch"
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation"
import useForm from "@/hooks/useForm"

const editDevice = ({ params }) => {
    const router = useRouter()

    const goBack = () => {
        router.back()
    }

    const [device, setDevice] = useState([])
    const [technician, setTechnician] = useState([])
    const [state, setState] = useState([])
    const [type, setType] = useState([])
    const [organization, setOrganization] = useState([])

    const { id } = params

    const formValues = {
        name: "",
        state: "",
        defectiveDetails: "",
        observationsRepair: "",
        tradeMark: "",
        reparationCost: "",
        type: "",
        technician: "",
        organization: "",
    }

    const { values, handleChange, handleSubmit, setValues } = useForm(formValues)

    useEffect(() => {
        const fetchDevices = async () => {

            const device = await useFetch("/device/", "GET", id)
            const technician = await useFetch("/role/", "GET", 3)
            const states = await useFetch("/states", "GET")
            const types = await useFetch("/types", "GET")
            const organizations = await useFetch("/organizations", "GET")

            if (device?.data) {
                setDevice([device?.data])
            }

            if (technician?.data) {
                setTechnician(technician?.data)
            }

            if (states?.data) {
                setState(states?.data)
            }

            if (types?.data) {
                setType(types?.data)
            }

            if (organizations?.data) {
                setOrganization(organizations?.data)
            }

            setValues(prevValues => ({
                ...prevValues,
                name: device.data.name || [],
                tradeMark: device.data.tradeMark,
                defectiveDetails: device.data.defectiveDetails,
                observationsRepair: device.data.observationsRepair,
                state: device.data.state,
                reparationCost: device.data.reparationCost,
                type: device.data.type,
                technician: device.data.technician,
                organization: device.data.organization
            }));
        }
        fetchDevices()
    }, [])

    const onSubmit = async () => {

        console.log("intente");

        // const res = await useFetch("/device/" + id, "PUT", values)

        // if (res.status !== "success") {
        //     alert(JSON.stringify(res))
        // }
        // router.push("/auth/device/details/" + id)
    }

    console.log(values);

    return (

        <Layout>
            <div className="flex space-x-2 justify-center pt-5">
                <h1 className="text-center text-2xl font-bold">Editar detalles del dispositivo: {device[0]?.name}</h1>

                <button className="p-2 rounded-md bg-blue-400" title="Volver atras" onClick={goBack}>
                    <i className="text-white"><IoIosArrowBack /></i>
                </button>
            </div>

            <label>Cambiar nombre: </label>
            <input name="name" value={values.name} onChange={handleChange} className="mt-2 pl-2 rounded bg-slate-700" type="text" />

            <div className="py-5 px-10">

                <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>

                    <div className="border-t-2 border-slate-300 w-full">
                        <ul className="grid grid-cols-4 grid-rows-2 text-slate-200">
                            {device.map((item, key) => (
                                <>
                                    <li className="flex justify-start items-center w-full border-b-2 border-slate-500 flex-col border-x-2">

                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Estado del dispositivo</h3>
                                        }

                                        <div className="py-4">
                                            <select
                                                value={values.state}
                                                name="state"
                                                className="bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-700"
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>
                                                    {item.state.name}
                                                </option>

                                                {state.map((option, key) => (
                                                    <option key={key} value={option._id}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2  border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Tipo de dispositivo</h3>
                                        }

                                        <div className="py-4">
                                            <select
                                                value={values.type}
                                                name="type"
                                                className="bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-700"
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>
                                                    {item.type.name}
                                                </option>

                                                {type.map((option, key) => (
                                                    <option key={key} value={option._id}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2  border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Marca</h3>
                                        }

                                        <input name="tradeMark" className="my-4 pl-2 rounded bg-slate-700" type="text" value={values.tradeMark} onChange={handleChange} />
                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2  border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Organizacion propietaria</h3>
                                        }

                                        <div className="py-4">
                                            <select
                                                value={values.organization}
                                                name="organization"
                                                onChange={handleChange}
                                                className="bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-700"
                                            >
                                                <option value="" disabled>
                                                    {item.organization.name}
                                                </option>

                                                {organization.map((option, key) => (
                                                    <option key={key} value={option._id}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2 border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Tecnico a cargo</h3>
                                        }

                                        <div className="py-4">
                                            <select
                                                value={values.technician}
                                                name="technician"
                                                onChange={handleChange}
                                                className="bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-700"
                                            >
                                                <option value="" disabled>
                                                    {item.technician?.name}
                                                </option>

                                                {technician.map((option, key) => (
                                                    <option key={key} value={option._id}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2 border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Detalles de funcionamiento</h3>
                                        }

                                        <textarea
                                            value={values?.defectiveDetails?.join('\n')}
                                            name="defectiveDetails"
                                            rows={4}
                                            onChange={handleChange}
                                            className="bg-gray-700 border border-gray-600 rounded my-4 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                                        />

                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2 border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Observaciones de la reparacion</h3>
                                        }

                                        <textarea
                                            value={values?.observationsRepair?.join('\n')}
                                            name="observationsRepair"
                                            rows={4}
                                            onChange={handleChange}
                                            className="bg-gray-700 border border-gray-600 rounded my-4 text-gray-200 focus:outline-none focus:ring focus:ring-blue-700"
                                        />

                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2 border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Costos de reparacion</h3>
                                        }
                                        <input value={values.reparationCost} name="reparationCost" onChange={handleChange} className="my-4 pl-2 rounded bg-slate-700" type="number" />

                                    </li>
                                </>
                            ))}
                        </ul>

                    </div>

                    <button type="submit" className="p-1 border-2 rounded bg-green-600 hover:bg-green-800 transition-colors duration-300">Confirmar cambios</button>
                </form>
            </div>

        </Layout>
    )
}

export default editDevice
