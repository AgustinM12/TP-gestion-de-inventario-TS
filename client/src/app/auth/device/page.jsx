"use client"
import Link from "next/link"
import { Layout } from "@/components/layout/Layout"
import { useState, useEffect } from "react"
import useFetch from "@/hooks/useFetch"
import Button from "@/components/ui/Button"
import Modal from "@/components/ui/Modal"
import { MdDeleteForever } from "react-icons/md"
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const page = () => {
    const [devices, setDevices] = useState([])

    useEffect(() => {
        const fetchDevices = async () => {
            const response = await useFetch("/devices", "GET")

            if (response.data) {
                setDevices(response.data)
            } else {
                console.log(devices);
            }
        }

        fetchDevices()
    }, [])

    const handleDelete = async (id) => {
        console.log(id);


        const deleted = await useFetch(`/device/`, "DELETE", id)

        if (deleted.status === "success") {
            router.refresh
        }

    }

    console.log(devices);

    return (

        <Layout>
            <h1 className="text-center text-2xl font-semibold">Gestion de dispositivos</h1>


            <Link href="/auth/device/add">
                <Button message={"Agregar dispositivos"} />
            </Link>

            <div className="py-5 px-10">

                <div className="border-2 rounded-md">
                    <h2>Dispositivos registrados</h2>
                    {
                        devices.length > 0 &&

                        <div className="border-t-2 border-slate-300 w-full">

                            <ul className="grid grid-cols-4">
                                {devices.map((item, key) => (
                                    <>
                                        <li className="flex flex-wrap justify-center items-center w-full border-b-2 border-slate-500 pt-2 flex-col border-x-2">

                                            {
                                                key === 0 &&
                                                <h3 className="font-semibold border-b-2 w-full">Nombre del dispositivo</h3>
                                            }

                                            <div className="flex space-x-2 py-2">
                                                <p className="text-center" key={key}>{item.name}</p>
                                                <Modal submitFunction={() => handleDelete(item._id)} btnIcon={<MdDeleteForever />} otherClass={"bg-red-600"} message={"¿Desea eliminar la organizacion?"}
                                                />

                                                <Link href={"/auth/device/details/" + item._id}>
                                                    <button className="p-2 rounded-md bg-blue-400" title="Ver mas detalles">
                                                        <i><FaArrowUpRightFromSquare /></i>
                                                    </button>
                                                </Link >

                                                <Link href={"/auth/device/edit/" + item._id}>
                                                    <button className="p-2 rounded-md bg-yellow-400" title="Actualizar detalles">
                                                        <i className="text-white"><FaEdit /></i>
                                                    </button>
                                                </Link >
                                            </div>
                                        </li>

                                        <li className="flex flex-col flex-wrap justify-center items-center w-full border-b-2 border-slate-500 space-x-2  border-x-2">
                                            {
                                                key === 0 &&
                                                <h3 className="font-semibold border-b-2 w-full">Marca</h3>
                                            }

                                            <p className="text-center py-2" key={key}>{item.tradeMark}</p>
                                        </li>

                                        <li className="flex flex-col flex-wrap justify-center items-center w-full border-b-2 border-slate-500 space-x-2  border-x-2">
                                            {
                                                key === 0 &&
                                                <h3 className="font-semibold border-b-2 w-full">Organizacion propietaria</h3>
                                            }

                                            <p className="text-center py-2" key={key}>{item.organization.name}</p>
                                        </li>

                                        <li className="flex flex-col flex-wrap justify-center items-center w-full border-b-2 border-slate-500 space-x-2 border-x-2">
                                            {
                                                key === 0 &&
                                                <h3 className="font-semibold border-b-2 w-full">Tecnico a cargo</h3>
                                            }
                                            <p className="text-center py-2" key={key}>{!item.technician?.name ? "No asignado aun" : item.technician?.name}</p>
                                        </li>
                                    </>
                                ))}
                            </ul>

                        </div>

                    }
                </div>
            </div>

        </Layout>
    )
}

export default page
