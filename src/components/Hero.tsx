"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toolsData } from '@/data/tools';

export default function Hero({ initialQuery = '' }: { initialQuery?: string }) {
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Sync with URL changes
    useEffect(() => {
        setSearchQuery(initialQuery);
    }, [initialQuery]);

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
        } else {
            router.push('/#results');
        }
    };

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const suggestions = normalizedQuery
        ? toolsData.filter(tool =>
            tool.name.toLowerCase().includes(normalizedQuery)
        ).slice(0, 5)
        : [];

    return (
        <section className="relative overflow-hidden pt-20 pb-24">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#A259FF]/15 to-transparent blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#FF4E8D]/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[#38bdf8]/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Premium Animated Badge */}
                <div className="inline-flex items-center gap-3 px-2 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm mb-10 shadow-2xl backdrop-blur-xl transition-transform hover:scale-105 cursor-pointer ring-1 ring-white/5">
                    <span className="flex items-center gap-2 bg-gradient-to-r from-[#A259FF] to-[#FF4E8D] text-white px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-inner">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </span>
                        New Update
                    </span>
                    <span className="text-gray-300 pr-3 font-medium text-[13px]">Over 500+ tools added this week &rarr;</span>
                </div>

                {/* Premium Typography Heading */}
                <h1 className="flex flex-col items-center justify-center font-extrabold tracking-tighter mb-8 max-w-5xl mx-auto">
                    <span className="text-[40px] sm:text-[55px] md:text-[70px] text-white leading-[1.1]">
                        Discover the
                    </span>
                    <span
                        className="text-[48px] sm:text-[68px] md:text-[88px] text-white leading-[1.1] pb-2 sm:pb-4 uppercase font-black relative z-10"
                        style={{
                            textShadow: `
                                0 1px 0px #EAE0F8,
                                0 2px 0px #D0AFFE,
                                0 3px 0px #B57DFF,
                                0 4px 0px #A259FF,
                                0 5px 0px #8B30E6,
                                0 6px 0px #6A1AA5,
                                0 7px 0px #470D73,
                                0 12px 15px rgba(0,0,0,0.8),
                                0 25px 40px rgba(162, 89, 255, 0.6)
                            `,
                            WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.9)'
                        }}
                    >
                        Next Generation
                    </span>
                    <span className="text-[26px] sm:text-[36px] md:text-[46px] text-gray-400 font-bold mix-blend-plus-lighter opacity-90 leading-[1.2] mt-1 sm:mt-2">
                        of Artificial Intelligence.
                    </span>
                </h1>

                {/* Premium Subtext */}
                <p className="text-[17px] md:text-[22px] text-gray-400 mb-12 max-w-3xl mx-auto leading-[1.6] font-medium">
                    The ultimate directory of the world's most powerful AI tools, platforms, and models. Find the perfect AI for any workflow.
                </p>

                {/* Hero Search */}
                <div ref={searchRef} className="relative max-w-2xl mx-auto group z-50">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#A259FF] to-[#FF4E8D] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>

                    <form onSubmit={handleSearch} className="relative flex items-center bg-[#111113]/80 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-1.5 focus-within:border-white/20 transition-colors">
                        <span className="pl-4 text-gray-400">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearchQuery(val);
                                if (val.trim() === '') {
                                    router.push('/#results');
                                }
                            }}
                            onFocus={() => setIsFocused(true)}
                            placeholder="Search by name, category, description..."
                            className="w-full bg-transparent text-white px-4 py-3 placeholder-gray-500 focus:outline-none"
                        />
                        <button type="submit" className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors whitespace-nowrap">
                            Search
                        </button>

                        {/* Auto-suggest Dropdown */}
                        {isFocused && normalizedQuery && suggestions.length > 0 && (
                            <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-[#0A0A0B]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-[100] text-left">
                                {suggestions.map((tool) => (
                                    <div
                                        key={tool.id}
                                        className="px-5 py-4 hover:bg-white/10 cursor-pointer flex items-center gap-4 border-b border-white/5 last:border-0 transition-colors"
                                        onClick={() => {
                                            setSearchQuery(tool.name);
                                            setIsFocused(false);
                                            router.push(`/?q=${encodeURIComponent(tool.name)}#results`);
                                        }}
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-black flex-shrink-0 border border-white/10 flex items-center justify-center overflow-hidden">
                                            {tool.thumbnailUrl ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img src={tool.thumbnailUrl} alt={tool.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-sm font-bold text-white">{tool.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="text-[15px] font-semibold text-white truncate">{tool.name}</div>
                                            <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{tool.tagline}</div>
                                        </div>
                                        <div className="ml-4 text-xs font-semibold text-[#A259FF] bg-[#A259FF]/10 px-2.5 py-1 rounded-md hidden sm:block whitespace-nowrap">
                                            {tool.category}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* No Results Suggestion */}
                        {isFocused && normalizedQuery && suggestions.length === 0 && (
                            <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-[#0A0A0B]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-[100] p-4 text-center text-sm text-gray-400">
                                No tools found for "{searchQuery}". Try pressing Enter to run a deep search.
                            </div>
                        )}
                    </form>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mt-16 pt-8 border-t border-white/5">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">10,000+</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">AI Tools Listed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">2.5M+</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Monthly Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">85+</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Categories</div>
                    </div>
                </div>

            </div>
        </section>
    );
}
