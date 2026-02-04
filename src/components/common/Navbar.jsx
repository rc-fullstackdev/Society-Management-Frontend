// import React, { useState, useEffect } from "react";

// const Navbar = () => {
//     const [open, setOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 50) {
//                 setScrolled(true);
//             } else {
//                 setScrolled(false);
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     return (
//         <nav
//             className={`w-full fixed top-0 left-0 z-50 transition-all duration-300
//             ${scrolled
//                     ? "bg-white shadow-md"
//                     : "bg-white/20 backdrop-blur-2xl border-b border-white/30"
//                 }`}
//         >
//             <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

//                 {/* Logo */}
//                 <div className="text-2xl font-bold text-blue-600">
//                     Society<span className="text-black"> Saathi</span>
//                 </div>

//                 {/* Desktop Menu */}
//                 <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
//                     <li><a href="#home" className="hover:text-blue-600">Home</a></li>
//                     <li><a href="#about" className="hover:text-blue-600">About</a></li>
//                     <li><a href="#features" className="hover:text-blue-600">Features</a></li>
//                     <li><a href="#screenshots" className="hover:text-blue-600">Screenshots</a></li>
//                     <li><a href="#pricing" className="hover:text-blue-600">Pricing</a></li>
//                     <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
//                 </ul>

//                 {/* Mobile Menu Button */}
//                 <button
//                     className="md:hidden"
//                     onClick={() => setOpen(!open)}
//                 >
//                     <span className="text-3xl">☰</span>
//                 </button>
//             </div>

//             {/* Mobile Dropdown */}
//             {open && (
//                 <ul className="md:hidden bg-white w-full px-6 pb-4 shadow">
//                     <li className="py-2 border-b"><a href="#home">Home</a></li>
//                     <li className="py-2 border-b"><a href="#about">About</a></li>
//                     <li className="py-2 border-b"><a href="#features">Features</a></li>
//                     <li className="py-2 border-b"><a href="#screenshots">Screenshots</a></li>
//                     <li className="py-2 border-b"><a href="#pricing">Pricing</a></li>
//                     <li className="py-2 border-b"><a href="#contact">Contact</a></li>
//                 </ul>
//             )}
//         </nav>
//     );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (!element) return;

        const navbarHeight = 80;
        const targetPosition = element.offsetTop - navbarHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const progressRatio = Math.min(progress / duration, 1);
            window.scrollTo(0, startPosition + distance * progressRatio);
            if (progress < duration) window.requestAnimationFrame(step);
        };

        window.requestAnimationFrame(step);
    };


    const links = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Features", id: "features" },
        { name: "Screenshots", id: "screenshots" },
        { name: "Pricing", id: "pricing" },
        { name: "Contact", id: "contact" },
    ];

    return (
        <nav
            className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white shadow-md"
                : "bg-white/20 backdrop-blur-2xl border-b border-white/30"
                }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600">
                    Society<span className="text-black"> Saathi</span>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
                    {links.map((link) => (
                        <li
                            key={link.id}
                            className="cursor-pointer hover:text-blue-600"
                            onClick={() => scrollToSection(link.id)}
                        >
                            {link.name}
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    <span className="text-3xl">☰</span>
                </button>
            </div>

            {/* Mobile Dropdown */}
            {open && (
                <ul className="md:hidden bg-white w-full px-6 pb-4 shadow">
                    {links.map((link) => (
                        <li
                            key={link.id}
                            className="py-2 border-b cursor-pointer"
                            onClick={() => {
                                scrollToSection(link.id);
                                setOpen(false); // close mobile menu
                            }}
                        >
                            {link.name}
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
