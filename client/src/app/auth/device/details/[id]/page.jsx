"use client"
import Link from "next/link"
import { Layout } from "@/components/layout/Layout"
import { useState, useEffect } from "react"
import useFetch from "@/hooks/useFetch"
import { FaEdit } from "react-icons/fa";

const page = ({ params }) => {
    const [device, setDevice] = useState([])

    const { id } = params

    useEffect(() => {
        const fetchDevices = async () => {

            const response = await useFetch("/device/", "GET", id)

            if (response?.data) {
                setDevice([response?.data])
            }
        }

        fetchDevices()
    }, [])

    return (

        <Layout>
            <div className="flex space-x-2 justify-center pt-5">
                <h1 className="text-center text-2xl font-bold">Detalles del dispositivo: {device[0]?.name}</h1>

                <Link href={"/auth/device/edit/" + device[0]?._id}>
                    <button className="p-2 rounded-md bg-yellow-400" title="Actualizar detalles">
                        <i className="text-white"><FaEdit /></i>
                    </button>
                </Link >
            </div>

            <div className="py-5 px-10">

                {
                    device.length > 0 &&

                    <div className="border-t-2 border-slate-300 w-full">

                        <ul className="grid grid-cols-4 grid-rows-2">
                            {device.map((item, key) => (
                                <>
                                    <li className="flex justify-start items-center w-full border-b-2 border-slate-500 flex-col border-x-2">

                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Estado del dispositivo</h3>
                                        }

                                        <div className="flex space-x-2">
                                            <p className="py-4 text-center" key={key}>{item?.state?.name}</p>
                                        </div>
                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2  border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Tipo de dispositivo</h3>
                                        }

                                        <p className="py-4 text-center" key={key}>{item.type.name}</p>
                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2  border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Marca</h3>
                                        }

                                        <p className="py-4 text-center" key={key}>{item.tradeMark}</p>
                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2  border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Organizacion propietaria</h3>
                                        }

                                        <p className="py-4 text-center" key={key}>{item.organization.name}</p>
                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2 border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Tecnico a cargo</h3>
                                        }
                                        <p className="py-4 text-center" key={key}>{!item.technician?.name ? "No asignado aun" : item.technician?.name}</p>
                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2 border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Detalles de funcionamiento</h3>
                                        }
                                        <p className="py-4 text-center flex flex-col" key={key}>{item.defectiveDetails.map((detail, key) => (
                                            <span key={key}>{detail}</span>
                                        ))}</p>

                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2 border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Observaciones de la reparacion</h3>
                                        }
                                        <p className="py-4 text-center flex flex-col" key={key}>
                                            {item?.observationsRepair?.length > 0 ?
                                                item?.observationsRepair?.map((detail, key) => (
                                                    <span key={key}>{detail}</span>
                                                )) : "aun no asignado"}</p>

                                    </li>

                                    <li className="flex flex-col justify-start items-center w-full border-b-2 border-slate-500 space-x-2 border-x-2">
                                        {
                                            key === 0 &&
                                            <h3 className="font-bold border-b-2 w-full">Costos de reparacion</h3>
                                        }
                                        <p className="py-4 text-center" key={key}>{!item.reparationCost ? "No asignado aun" : item.reparationCost}</p>
                                    </li>
                                </>
                            ))}
                        </ul>

                    </div>

                }
            </div>

        </Layout>
    )
}

export default page
