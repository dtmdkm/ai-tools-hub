"use client";

import { Tool } from '@/types';
import { useState } from 'react';

export default function ProductCard({ tool }: { tool: Tool }) {
    const [upvotes, setUpvotes] = useState(tool.upvotes);
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleUpvote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (hasUpvoted) {
            setUpvotes(prev => prev - 1);
            setHasUpvoted(false);
        } else {
            setUpvotes(prev => prev + 1);
            setHasUpvoted(true);
        }
    };

    const getPricingColor = (pricing: string) => {
        switch (pricing) {
            case 'Free': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Freemium': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Paid': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 bg-[#111113]/80 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 hover:bg-[#16161A] transition-all duration-300 hover:shadow-[0_0_30px_rgba(162,89,255,0.06)] relative overflow-hidden">

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex-shrink-0 w-[72px] h-[72px] relative rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                    {tool.thumbnailUrl && !imageError ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={tool.thumbnailUrl}
                            alt={tool.name}
                            className="w-full h-full object-cover bg-white/5"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="text-3xl font-bold bg-gradient-to-br from-[#2A2A2A] to-[#0A0A0B] w-full h-full flex items-center justify-center text-white border border-white/5">{tool.name.charAt(0)}</div>
                    )}
                </div>

                <div className="flex-grow min-w-0 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white truncate group-hover:text-[#A259FF] transition-colors">{tool.name}</h3>
                        {tool.verified && (
                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        )}
                        <span className={`ml-2 hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPricingColor(tool.pricing)}`}>
                            {tool.pricing}
                        </span>
                    </div>

                    <p className="text-[14px] text-gray-400 line-clamp-1 mb-3">{tool.tagline}</p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {tool.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 text-gray-300 border border-white/5 hover:bg-white/10 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium hidden sm:flex">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {(tool.views / 1000).toFixed(1)}k
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 sm:ml-4 sm:self-center absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto">
                    <button
                        onClick={handleUpvote}
                        className={`flex flex-col items-center justify-center w-14 h-16 border rounded-xl transition-all duration-300 ${hasUpvoted ? 'border-[#A259FF] bg-[#A259FF]/10 shadow-[0_0_15px_rgba(162,89,255,0.2)]' : 'border-white/10 bg-[#0A0A0B] hover:border-white/30 hover:bg-[#1A1A1A]'}`}
                    >
                        <svg className={`w-5 h-5 mb-1 transition-transform duration-300 ${hasUpvoted ? 'text-[#A259FF] transform -translate-y-0.5' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4L4 12h5v8h6v-8h5L12 4z" />
                        </svg>
                        <span className={`text-[13px] font-bold leading-none ${hasUpvoted ? 'text-[#A259FF]' : 'text-gray-300'}`}>{upvotes}</span>
                    </button>
                </div>
            </div>
        </a>
    );
}
