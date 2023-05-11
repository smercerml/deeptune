import Navbar from '../components/Navbar'
import Link from 'next/link'

export default function Home() {
    return (
        <main className="font-body font-semibold min-h-screen w-full bg-gradient-to-b from-gray-800 via-gray-950 to-gray-950">
            <Navbar />
            <div className="mt-24 flex flex-col justify-center items-center">
                {/* hero section */}
                <h1 className="flex font-extrabold md:text-8xl sm:text-7xl text-6xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary animate-title">
                    deeptune.ai
                </h1>
                <h2 className="font-bold p-4 mb-12 md:text-3xl sm:text-2xl text-xl text-white text-opacity-het text-center">
                    The Home of AI Music
                </h2>
                {/* CTA section */}
                <div className="w-screen py-14 px-20">
                    <h2 className="md:text-xl sm:text-lg text-md text-white text-opacity-met text-center font-medium">
                        Create and Discover AI Song Covers From Your Favorite
                        Celebrities
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:space-x-8 space-y-8 sm:space-y-0">
                        <Link href="/create">
                            <div className="relative">
                                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary via-secondary to-tertiary animate-button"></div>
                                <button className="relative md:w-56 sm:52 w-48 py-4 px-2 rounded-lg text-opacity-het hover:text-black hover:bg-opacity-0 bg-gray-950 text-white md:text-xl sm:text-lg text-sm">
                                    Create
                                </button>
                            </div>
                        </Link>
                        <Link href="/discover">
                            <div className="relative">
                                <div className="absolute -inset-0.5 rounded-lg bg-white opacity-het animate-button"></div>
                                <button className="relative md:w-56 sm:52 w-48 py-4 px-2 rounded-lg text-opacity-het text-black hover:text-white bg-opacity-0 hover:bg-opacity-100 bg-gray-950 md:text-xl sm:text-lg text-sm">
                                    Discover
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
