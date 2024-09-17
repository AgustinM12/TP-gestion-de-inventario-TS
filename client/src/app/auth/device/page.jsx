"use client"
import Link from "next/link"
import { Layout } from "@/components/layout/Layout"
import Container from "@/components/ui/Container"
import { useState, useEffect } from "react"
import useFetch from "@/hooks/useFetch"
import Button from "@/components/ui/Button"


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


    return (

        <Layout>
            <h1 className="text-center text-2xl font-semibold">Gestion de dispositivos</h1>


            <Link href="/auth/device/add">
                <Button message={"Agregar dispositivos"} />
            </Link>

            <div className="p-10 grid grid-cols-2 grid-rows-1 w-full">
                <Container list={devices} />
            </div>
        </Layout>
    )
}

export default page
