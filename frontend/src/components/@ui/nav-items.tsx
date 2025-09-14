import React from "react";

interface NavItemProps {
    label: string;
    href: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, href }) => {
    return (
        <a
            href={href}
            className="text-gray-700 hover:text-gray-900 transition-colors duration-200 px-4 py-2"
        >
            {label}
        </a>
    );
};

export default NavItem;