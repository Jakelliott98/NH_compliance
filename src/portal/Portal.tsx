import Header from "./components/Header"
import { Outlet } from "react-router"
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"

export default function Portal () {

    return (
        <>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <div className="h-full w-full">
                    <Header />
                        <div className='rounded-xl p-2 bg-gray-100 min-h-full flex-1'>
                            <Outlet />
                        </div>
                </div>
            </SignedIn>
        </>
    )
}