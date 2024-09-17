"use client"
import Link from "next/link"
import { Layout } from "@/components/layout/Layout"
import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import useFetch from "@/hooks/useFetch"
import { useEffect, useState } from "react"

const page = () => {

    const [organizations, setOrganizations] = useState([])

    useEffect(() => {

        const fetch = async () => {
            const response = await useFetch("/organizations", "GET")

            return response
        }

        if (fetch.data) {
            setOrganizations(fetch.data)
        }

        fetch()
    }, [])

    return (
        <Layout>
            <h1 className="text-center text-2xl font-semibold py-2">Gestion de organizaciones</h1>

            <Link href="/auth/organization"><Button message={"Agregar organizacion"} /></Link>

            <div className="py-5 px-10">
                <h2>Organizaciones registradas</h2>
                <Container list={organizations} />
            </div>

        </Layout>
    )
}

export default page