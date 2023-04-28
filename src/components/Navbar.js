import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [credits, setCredits] = useState()
    const router = useRouter()
    const { isSignedIn } = useUser()
    const { signOut } = useClerk()

    // toggle dropdown menu
    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState)
    }

    // fetch credits of current user
    useEffect(() => {
        const fetchCredits = async () => {
            if (isSignedIn) {
                const res = await fetch('/api/credits')
                const data = await res.json()
                setCredits(data.credits)
            }
        }
        fetchCredits()
    }, [isSignedIn])

    return (
        <header className="p-4 bg-base">
            {/* logo on wide screen*/}
            <div className="container flex justify-between h-16 mx-auto">
                <Link
                    href="/"
                    className="flex items-center p-2 font-extrabold text-5xl font-heading text-tertiary"
                >
                    dt
                </Link>
                {/* navbar links on wide screen*/}
                <ul className="hidden space-x-4 md:flex">
                    <li className="flex">
                        <Link
                            className={`flex items-center px-4 text-white opacity-het hover:opacity-100 ${
                                router.asPath === '/create'
                                    ? 'border-b-2 border-secondary'
                                    : ''
                            }`}
                            href="/create"
                        >
                            Create
                        </Link>
                    </li>
                    <li className="flex">
                        <Link
                            className={`flex items-center px-4 text-white opacity-het hover:opacity-100 ${
                                router.asPath === '/discover'
                                    ? 'border-b-2 border-secondary'
                                    : ''
                            }`}
                            href="/discover"
                        >
                            Discover
                        </Link>
                    </li>
                </ul>
                {/* buttons on wide screens */}
                <div className="flex-shrink-0 items-center hidden md:flex">
                    {isSignedIn ? (
                        <>
                            {/* buttons rendered when signed in */}
                            <button className="self-center w-56 py-3 rounded-lg bg-primary bg-opacity-het hover:bg-opacity-100 text-black text-opacity-het">
                                Add credits ({credits} left)
                            </button>
                            <Link onClick={() => signOut()} href="/">
                                <button className="self-center px-8 py-3 rounded-lg text-white opacity-het hover:opacity-100">
                                    Sign out
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* buttons rendered when signed out */}
                            <SignInButton mode="modal">
                                <button className="self-center px-8 py-3 rounded-lg text-white opacity-het hover:opacity-100">
                                    Sign in
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="self-center px-8 py-3 rounded-lg bg-primary bg-opacity-het hover:bg-opacity-100 text-black text-opacity-het">
                                    Sign up
                                </button>
                            </SignUpButton>
                        </>
                    )}
                </div>
                {/* dropdown menu on narrow screens*/}
                <button
                    className="p-4 md:hidden"
                    onClick={toggleDropdown}
                    aria-label="Toggle navigation"
                >
                    {!isDropdownOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 text-white text-opacity-het hover:text-opacity-100"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 text-white text-opacity-het hover:text-opacity-100"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    )}
                </button>
            </div>
            {/* dropdown menu items*/}
            {isDropdownOpen && (
                <ul className="container flex-col space-y-4 p-2 my-2 md:hidden mx-auto">
                    <li className="flex">
                        <Link
                            className="flex items-center text-white opacity-het hover:opacity-100"
                            href="/create"
                            onClick={toggleDropdown}
                        >
                            Create
                        </Link>
                    </li>
                    <li className="flex">
                        <Link
                            className="flex items-center text-white opacity-het hover:opacity-100"
                            href="/discover"
                            onClick={toggleDropdown}
                        >
                            Discover
                        </Link>
                    </li>
                    {isSignedIn ? (
                        <>
                            {/* items rendered when signed in*/}
                            <li className="flex">
                                <button className="flex items-center text-white opacity-het hover:opacity-100">
                                    Add credits ({credits} left)
                                </button>
                            </li>
                            <li className="flex">
                                <button
                                    className="flex items-center text-white opacity-het hover:opacity-100"
                                    onClick={() => {
                                        signOut()
                                        toggleDropdown()
                                    }}
                                >
                                    Sign out
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* items rendered when signed out*/}
                            <li className="flex">
                                <SignInButton mode="modal">
                                    <button className="flex items-center text-white opacity-het hover:opacity-100">
                                        Sign in
                                    </button>
                                </SignInButton>
                            </li>
                            <li className="flex">
                                <SignUpButton mode="modal">
                                    <button className="flex items-center text-white opacity-het hover:opacity-100">
                                        Sign up
                                    </button>
                                </SignUpButton>
                            </li>
                        </>
                    )}
                </ul>
            )}
        </header>
    )
}

export default Navbar
