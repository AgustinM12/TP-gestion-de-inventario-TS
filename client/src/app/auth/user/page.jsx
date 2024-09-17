"use client"
import Link from "next/link"
import { Layout } from "@/components/layout/Layout"
import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import useFetch from "@/hooks/useFetch"
import { useEffect, useState } from "react"

const usersMain = () => {

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

    console.log(users);


    return (
        <Layout>
            <h1 className="text-center text-2xl font-semibold py-2">Gestion de usuarios</h1>

            <Link href="/auth/organization"><Button message={"Registrar usuario"} /></Link>

            <div className="py-5 px-10">
                <h2>Usuarios registrados</h2>
                <Container list={users} />
            </div>

        </Layout>
    )
}

export default usersMain