import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-white text-gray-800 py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;