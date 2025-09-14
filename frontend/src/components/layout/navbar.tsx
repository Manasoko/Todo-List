import React from "react";
import NavItem from "../@ui/nav-items";

const Navbar: React.FC = () => {
    const navItems = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ];
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">Logo</div>
                <ul className="flex space-x-6">
                    {navItems.map((item, index) => (
                        <NavItem key={index} label={item.label} href={item.href} />
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;