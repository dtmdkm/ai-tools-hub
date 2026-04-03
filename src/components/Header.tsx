"use client";

import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toolsData } from '@/data/tools';

type DropdownItem = {
    label: string;
    href: string;
};

const NavItem = ({ label, items }: { label: string, items?: DropdownItem[] }) => {
    const hasDropdown = items && items.length > 0;
    return (
        <div className="relative group/nav cursor-pointer py-5 px-3 flex items-center text-[15px] font-medium text-gray-200 hover:text-white transition-colors">
            {hasDropdown ? <span>{label}</span> : <Link href="/#results">{label}</Link>}
            {hasDropdown && (
                <svg className="w-4 h-4 ml-1 text-gray-500 group-hover/nav:text-gray-300 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
            )}

            {/* Dropdown Menu */}
            {hasDropdown && (
                <div className="absolute top-[90%] left-0 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200 transform translate-y-1 group-hover/nav:translate-y-0 w-56 bg-[#121212] border border-gray-800 rounded-xl shadow-2xl py-2 z-[100]">
                    <div className="absolute inset-x-0 -top-4 h-4 bg-transparent" />
                    {items.map((item, idx) => (
                        <Link key={idx} href={item.href} className="block px-5 py-3 text-sm text-gray-400 hover:text-white hover:bg-[#1E1E1E] transition-colors rounded-lg mx-2">
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Header() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsFocused(false);
            router.push(`/?q=${encodeURIComponent(searchQuery.trim())}#results`);
        }
    };

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const suggestions = normalizedQuery
        ? toolsData.filter(tool =>
            tool.name.toLowerCase().includes(normalizedQuery)
        ).slice(0, 5)
        : [];

    return (
        <header className="sticky top-0 z-50 bg-black border-b border-gray-900 text-white shadow-md">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                {/* Left Side: Logo */}
                <div className="flex shrink-0 lg:w-[250px] justify-start">
                    <Link href="/" className="flex items-center py-4">
                        {/* Imitating TopMediAi Logo style */}
                        <span className="font-bold text-[22px] tracking-wide flex items-baseline">
                            AITools<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A259FF] to-[#FF4E8D] italic font-serif -ml-0.5">Ai</span>
                            <span className="text-[10px] align-super text-gray-500 ml-1">&reg;</span>
                        </span>
                    </Link>
                </div>

                {/* Center: Mega Menu Navigation */}
                <div className="flex flex-1 justify-center shrink-0">
                    <nav className="hidden xl:flex items-center gap-2">
                        <NavItem
                            label="Categories"
                            items={[
                                { label: 'Text & Writing', href: '/?q=Text%20%26%20Writing#results' },
                                { label: 'Video Generation', href: '/?q=Video%20Generation#results' },
                                { label: '3D & Art', href: '/?q=3D%20%26%20Art#results' },
                                { label: 'Developer Tools', href: '/?q=Developer%20Tools#results' },
                                { label: 'Productivity', href: '/?q=Productivity#results' }
                            ]}
                        />
                        <NavItem
                            label="Top Picks"
                            items={[
                                { label: 'Best of 2026', href: '/?q=best#results' },
                                { label: 'Editor\'s Choice', href: '/?q=editor#results' },
                                { label: 'Trending New', href: '/#results' }
                            ]}
                        />
                        <NavItem
                            label="Use Cases"
                            items={[
                                { label: 'For Marketing', href: '/?q=marketing#results' },
                                { label: 'For Developers', href: '/?q=code#results' },
                                { label: 'For Design', href: '/?q=design#results' },
                                { label: 'For Students', href: '/?q=education#results' }
                            ]}
                        />
                        <NavItem
                            label="Resources"
                            items={[
                                { label: 'Blog & News', href: '#' },
                                { label: 'Submit a Tool', href: '#' },
                                { label: 'API Access', href: '#' }
                            ]}
                        />
                        <NavItem label="All Tools" />
                    </nav>
                </div>

                {/* Right Side: Actions & Socials */}
                <div className="flex justify-end items-center gap-3 shrink-0">
                    <div className="hidden lg:flex items-center gap-3 mr-2 border-r border-white/10 pr-5">
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors" title="Twitter / X">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors" title="Discord Community">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                            </svg>
                        </Link>
                    </div>

                    <button className="hidden md:flex items-center gap-2 bg-[#1A1A1F] hover:bg-[#25252D] text-white px-4 py-2 rounded-lg text-[13px] font-semibold border border-white/5 transition-colors">
                        <svg className="w-4 h-4 text-[#A259FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Submit Tool
                    </button>

                    {/* Expanding Quick Search */}
                    <form
                        ref={searchRef}
                        onSubmit={handleSearch}
                        className="relative hidden sm:flex flex-col items-end z-50"
                    >
                        <div className="relative group">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                placeholder="Search tools..."
                                autoComplete="off"
                                className="w-9 h-9 bg-transparent border border-transparent rounded-lg pl-3 pr-9 text-sm text-transparent placeholder-transparent transition-all duration-300 outline-none focus:w-[260px] focus:bg-[#121215] focus:border-white/10 focus:text-white focus:placeholder-gray-500 hover:bg-white/5 cursor-pointer focus:cursor-text"
                            />
                            <button type="submit" className="absolute right-0 top-0 bottom-0 w-9 flex items-center justify-center text-gray-400 group-hover:text-white group-focus-within:text-[#A259FF] transition-colors pointer-events-none group-focus-within:pointer-events-auto">
                                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Auto-suggest Dropdown */}
                        {isFocused && normalizedQuery && suggestions.length > 0 && (
                            <div className="absolute top-[calc(100%+8px)] right-0 w-[300px] bg-[#0A0A0B]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-[100] text-left">
                                {suggestions.map((tool) => (
                                    <div
                                        key={tool.id}
                                        className="px-4 py-3 hover:bg-white/10 cursor-pointer flex items-center gap-3 border-b border-white/5 last:border-0 transition-colors"
                                        onClick={() => {
                                            setSearchQuery(tool.name);
                                            setIsFocused(false);
                                            router.push(`/?q=${encodeURIComponent(tool.name)}#results`);
                                        }}
                                    >
                                        <div className="w-8 h-8 rounded-md bg-black flex-shrink-0 border border-white/10 flex items-center justify-center overflow-hidden">
                                            {tool.thumbnailUrl ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img src={tool.thumbnailUrl} alt={tool.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-[10px] font-bold text-white">{tool.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="text-[13px] font-semibold text-white truncate">{tool.name}</div>
                                            <div className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{tool.category}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </header>
    );
}
