"use client"
import Link from "next/link"
import { Layout } from "@/components/layout/Layout"
import Button from "@/components/ui/Button"
import useFetch from "@/hooks/useFetch"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Modal from "@/components/ui/Modal"
import { MdDeleteForever } from "react-icons/md"
import getCookie from "@/utils/getToken"

const page = () => {

    const role = getCookie('role')

    const router = useRouter()

    const [organizations, setOrganizations] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            if (role == 2) {

                const response = await useFetch(role == 2 ? ("/organizations", "GET") : ("/organization", "GET", 12))

                if (response.data) {
                    setOrganizations(response.data)
                }
            }

        }

        fetchData()
    }, [])

    const handleDelete = async (id) => {
        console.log(id);


        const deleted = await useFetch(`/organization/`, "DELETE", id)

        if (deleted.status === "success") {
            router.refresh
        }

    }

    return (
        <Layout>
            <h1 className="text-center text-2xl font-semibold py-2">Gestion de organizaciones</h1>

            <Link href="/auth/organization/add"><Button message={"Agregar organizacion"} /></Link>

            <div className="py-5 px-10">

                <div className="border-2 rounded-md">
                    <h2>Organizaciones registrados</h2>
                    {
                        organizations.length > 0 &&

                        <div className="border-t-2 border-slate-300 w-full">

                            <ul className="grid grid-cols-4">
                                {organizations.map((item, key) => (
                                    <>
                                        <li className="flex flex-wrap justify-center items-center w-full border-b-2 border-slate-500 pt-2 flex-col border-x-2">
                                            <h3 className="font-semibold border-b-2 w-full">Nombre de la organizacion</h3>

                                            <div className="flex space-x-2">
                                                <p className="text-center" key={key}>{item.name}</p>
                                                <Modal submitFunction={() => handleDelete(item._id)} btnIcon={<MdDeleteForever />} otherClass={"bg-red-600"} message={"¿Desea eliminar la organizacion?"}
                                                />
                                            </div>
                                        </li>

                                        <li className="flex flex-col flex-wrap justify-center items-center w-full border-b-2 border-slate-500 space-x-2  border-x-2">
                                            <h3 className="font-semibold border-b-2 w-full">Ubicacion</h3>

                                            <p className="text-center" key={key}>{item.location}</p>
                                        </li>

                                        <li className="flex flex-col flex-wrap justify-center items-center w-full border-b-2 border-slate-500 space-x-2  border-x-2">
                                            <h3 className="font-semibold border-b-2 w-full">Manager de la empresa</h3>

                                            <p className="text-center" key={key}>{item.manager.name}</p>
                                        </li>

                                        <li className="flex flex-col flex-wrap justify-center items-center w-full border-b-2 border-slate-500 space-x-2 border-x-2">
                                            <h3 className="font-semibold border-b-2 w-full">Delegado a cargo de la empresa</h3>
                                            <p className="text-center" key={key}>{item.delegate.name}</p>
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