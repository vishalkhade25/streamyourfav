import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-neutral-950 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight">
                            Stream<span className="text-red-600">YourFav</span>
                        </h2>
                        <p className="text-neutral-500 text-sm mt-1">
                            Stream the Stories You Love
                        </p>
                    </div>

                    <div className="flex gap-6 text-sm text-neutral-400">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/profile" className="hover:text-white transition-colors">My Profile</Link>
                    </div>
                </div>

                <div className="border-t border-neutral-800 mt-8 pt-6 text-center">
                    <p className="text-neutral-600 text-xs">
                        © {new Date().getFullYear()} StreamYourFav. Built for learning purposes — content used is royalty-free or self-uploaded.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
