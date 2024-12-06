import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, FlaskRoundIcon as Flask, Atom } from 'lucide-react';

export default function Navbar() {
    return (<nav className="w-full p-6 bg-black bg-opacity-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-2"
            >
                <Flask className="h-8 w-8 text-yellow-400" />
                <span className="text-2xl font-bold text-white">VirtuaLLab</span>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex space-x-4"
            >
                <Link href="/about" className="text-white hover:text-yellow-400 transition-colors">About</Link>
                <Link href="#" className="text-white hover:text-yellow-400 transition-colors">Contact</Link>
            </motion.div>
        </div>
    </nav>);
}