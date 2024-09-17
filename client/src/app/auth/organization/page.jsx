"use client"
import Link from "next/link"
import { Layout } from "@/components/layout/Layout"
import Button from "@/components/ui/Button"

const page = () => {
    return (
        <Layout>
            <h1 className="text-center text-2xl font-semibold">Gestion de organizaciones</h1>

            <Link href="/auth/register/organization"><Button message={"Agregar organizacion"} /></Link>

        </Layout>
    )
}

export default page