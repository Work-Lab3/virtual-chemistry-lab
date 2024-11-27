"use client"

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, FlaskRoundIcon as Flask, Atom } from 'lucide-react';

export default function Visit() {
    return (
        <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
            <nav className="w-full p-6 bg-black bg-opacity-30 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center space-x-2"
                    >
                        <Flask className="h-8 w-8 text-yellow-400" />
                        <span className="text-2xl font-bold text-white">VirtuLab</span>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex space-x-4"
                    >
                        <Link href="#" className="text-white hover:text-yellow-400 transition-colors">About</Link>
                        <Link href="#" className="text-white hover:text-yellow-400 transition-colors">Contact</Link>
                    </motion.div>
                </div>
            </nav>
            
            <main className="flex-grow flex items-center justify-center px-4">
                <div className="max-w-4xl w-full text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6"
                    >
                        Welcome to the Future of Learning
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 mb-12"
                    >
                        Experience our cutting-edge Virtual Chemistry Lab and revolutionize your scientific journey.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link href="/home" className="inline-flex items-center px-8 py-4 bg-yellow-400 text-black rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl">
                            Enter the Lab
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </main>
            
            <footer className="w-full p-6 bg-black bg-opacity-30 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
                    <span>&copy; 2023 VirtuLab. All rights reserved.</span>
                    <div className="flex items-center space-x-4">
                        <Atom className="h-6 w-6 text-yellow-400 animate-spin-slow" />
                        <span>Powered by Team</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

