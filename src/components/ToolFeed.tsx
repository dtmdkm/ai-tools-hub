"use client";

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Tool } from '@/types';

export default function ToolFeed({ tools }: { tools: Tool[] }) {
    const INITIAL_COUNT = 6;
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    // Reset pagination if the tools array changes entirely (like doing a search)
    useEffect(() => {
        setVisibleCount(INITIAL_COUNT);
    }, [tools]);

    const visibleTools = tools.slice(0, visibleCount);
    const hasMore = visibleCount < tools.length;

    return (
        <>
            <div className="flex flex-col gap-4">
                {visibleTools.map(tool => (
                    <ProductCard key={tool.id} tool={tool} />
                ))}
            </div>

            {hasMore && (
                <div className="mt-12 py-6 text-center">
                    <button
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="inline-flex items-center gap-2 group text-white font-medium hover:text-[#A259FF] transition-colors border border-white/10 px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10"
                    >
                        Load More Tools
                        <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}
