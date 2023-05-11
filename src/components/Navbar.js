import { SignInButton, SignUpButton } from '@clerk/nextjs'
import Modal from './CreditsModal'
import { useQuery } from 'react-query'
import { useAuth, useClerk } from '@clerk/clerk-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchCredits } from '@component/utils/fetchCredits'

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()
    const { isSignedIn } = useAuth()
    const { signOut } = useClerk()
    const credits = useQuery(
        ['credits', { isSignedIn: isSignedIn }],
        fetchCredits
    )?.data?.credits

    const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState)

    return (
        <header className="py-4 px-8">
            {/* logo on wide screen*/}
            <div className="container flex justify-between h-16 mx-auto">
                <Link
                    href="/"
                    className="flex items-center p-2 font-extrabold text-5xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary"
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
                            <div className="relative mr-6">
                                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary via-secondary to-tertiary animate-button"></div>
                                <button
                                    className="relative rounded-lg hover:text-black hover:bg-opacity-0 bg-gray-800 w-60 py-3 text-white text-opacity-het"
                                    onClick={() => setShowModal(true)}
                                    id="credits"
                                >
                                    Add credits ({credits} left)
                                </button>
                                <Modal
                                    onClose={() => setShowModal(false)}
                                    show={showModal}
                                    credits={credits}
                                ></Modal>
                            </div>
                            <Link onClick={() => signOut()} href="/">
                                <div className="relative mr-6">
                                    <div className="absolute -inset-0.5 rounded-lg bg-white opacity-het animate-button"></div>
                                    <button className="relative rounded-lg text-black hover:text-white bg-opacity-0 hover:bg-opacity-100 bg-gray-800 px-9 py-3 text-opacity-het">
                                        Sign out
                                    </button>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* buttons rendered when signed out */}
                            <SignInButton mode="modal">
                                <div className="relative mr-6">
                                    <div className="absolute -inset-0.5 rounded-lg bg-white opacity-het animate-button"></div>
                                    <button className="relative rounded-lg text-black hover:text-white bg-opacity-0 hover:bg-opacity-100 bg-gray-800 px-9 py-3 text-opacity-het">
                                        Sign in
                                    </button>
                                </div>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <div className="relative">
                                    <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary via-secondary to-tertiary animate-button"></div>
                                    <button
                                        className="relative rounded-lg hover:text-black hover:bg-opacity-0 bg-gray-800 px-9 py-3 text-white text-opacity-het"
                                        id="sign-up"
                                    >
                                        Sign up
                                    </button>
                                </div>
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
                                <button
                                    className="flex items-center text-white opacity-het hover:opacity-100"
                                    onClick={() => setShowModal(true)}
                                >
                                    Add credits ({credits} left)
                                </button>
                                <Modal
                                    onClose={() => setShowModal(false)}
                                    show={showModal}
                                    credits={credits}
                                ></Modal>
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
