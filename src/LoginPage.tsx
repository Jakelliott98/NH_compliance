import { useSignIn } from "@clerk/clerk-react";
import { useState } from "react";


function LoginPage () {

    const { isLoaded, signIn, setActive } = useSignIn()
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)

        const email = e.target.email.value;
        const password = e.target.password.value

        if (!password || !email) {
            setError(true)
            return;
        }

        try {  

            const attempt = await signIn.create({
                identifier: email,
                password: password,
            })

            if (attempt.status === 'complete') {
                await setActive({session: attempt.createdSessionId})
            } else {
                setError(true)
            }
        } catch {

            setError(true)

        }


    }

    if (!isLoaded) return null

    return (
        <div className="w-full h-full flex [&>*]:flex-1 p-5 md:p-15 lg:p-15 text-neutral">
            <div className="p-5 flex flex-col justify-center gap-5 md:gap-10 md:p-10 lg:p-20">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Welcome Back!</h1>
                    <p className="text-sm text-neutral-light">Enter your username and password to acces your account.</p>
                </div>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm md:text-base">Username</label>
                        <input name="email" type="text" className="rounded border border-neutral-light/75 p-2"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm md:text-base">Password</label>
                        <input name="password" type="password" className=" rounded border border-neutral-light/75 p-2"/>
                    </div>
                    { error && <p className="text-error text-sm">These details could not be found!</p>}
                    <button className="btn w-full py-2 md:py-3">Log in</button>
                </form>
                <div className="border-t border-neutral-light/50 pt-5 md:pt-10">
                    <p className="text-sm text-neutral-light text-center mb-5">Login with following username to view demo</p>
                    <p className="text-sm text-neutral-light text-center mb-2">Username: DemoVersion</p>
                    <p className="text-sm text-neutral-light text-center">Password: DemoVersion101</p>
                </div>
            </div>
            <div className="hidden bg-primary lg:flex flex-col justify-center gap-3 p-20 rounded-lg">
                <h1 className="text-primary-foreground text-2xl">Effortlessly manage your companies compliance and operations</h1>
                <p className="text-primary-foreground font-light">Login to input compliance results and manage your clinics compliance scores</p>
                <img src="#"/>
            </div>
        </div>
    )
}

export default LoginPage;