import { Footer } from "./Footer"
import { Header } from "./Header"

export const Layout = ({ children }) => {

    return (

        <div className={`flex flex-col min-h-screen bg-slate-800`}>
            <Header />
            <main className={`flex-grow mx-auto text-center overflow-hidden min-w-full text-slate-200`}>
                {children}
            </main>
            <Footer />
        </div>
    )
}