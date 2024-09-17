"use client"
import Link from "next/link"
import { Layout } from "@/components/layout/Layout"
import Button from "@/components/ui/Button"
import Modal from "@/components/ui/Modal"
import useFetch from "@/hooks/useFetch"
import { useEffect, useState } from "react"
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation"

const usersMain = () => {

    const router = useRouter()
    const [users, setUsers] = useState([])

    useEffect(() => {

        const fetchUsers = async () => {
            const response = await useFetch("/users", "GET")
            console.log(response);

            if (response.data) {
                setUsers(response.data)
            }
            return response
        }

        fetchUsers()
    }, [])

    const handleDelete = async (id) => {
        console.log(id);


        const deleted = await useFetch(`/user/`, "DELETE", id)

        if (deleted.status === "success") {
            router.refresh
        }

    }

    const roles = [1, 2, 3]

    return (
        <Layout>
            <h1 className="text-center text-2xl font-semibold py-2">Gestion de usuarios</h1>

            <Link href="/auth/register/user"><Button message={"Registrar usuario"} /></Link>

            <div className="py-5 px-10">

                <div className="border-2 rounded-md">
                    <h2>Usuarios registrados</h2>
                    {
                        users.length > 0 &&

                        <div className="border-t-2 border-slate-300 w-full grid grid-cols-3">
                            {roles.map((role, key) => (
                                <ul key={key} className="border-x-2 space-y-2">
                                    <h3 className="border-b-2">{role === 1 ? "Delegados" : role === 2 ? "Managers" : "Mantenimiento"}</h3>

                                    {users.filter(item => item.role._id === role).map((item, key) => (
                                        <div className="flex flex-wrap justify-center items-center w-full border-b-2 border-slate-500 space-x-2 pb-2">

                                            <li className="text-center" key={key}>{item.name} - {item.email}</li>

                                            <Modal submitFunction={() => handleDelete(item._id)} btnIcon={<MdDeleteForever />} otherClass={"bg-red-600"} message={"¿Desea eliminar al usuario?"} />

                                        </div>
                                    ))}
                                </ul>
                            ))}
                        </div>

                    }
                </div>
            </div>

        </Layout>
    )
}

export default usersMain