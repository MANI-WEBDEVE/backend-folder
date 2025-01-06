import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-neutral-900/10 text-white py-4  w-full bottom-0">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center hover:text-gray-300 transition-colors">
            <Github className="w-6 h-6 mr-2 animate-pulse" />
            <span className="text-sm sm:text-base">Developed by Inam</span>
        </div>
        <div className="text-center">
            <span className="text-sm sm:text-base opacity-80">© {new Date().getFullYear()} My Theme</span>
        </div>
    </div>
</footer>    );
};

export default Footer;