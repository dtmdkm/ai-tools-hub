import Link from 'next/link';
import { toolsData } from '@/data/tools';

const CATEGORIES = [
    'Text & Writing',
    'Video Generation',
    '3D & Art',
    'Productivity',
    'Developer Tools',
    'Research',
    'Images'
];

export default function Sidebar() {
    return (
        <aside className="hidden lg:flex flex-col w-[320px] sticky top-24 h-fit gap-6 text-white min-w-[320px]">

            {/* Submit CTA */}
            <div className="relative group rounded-2xl p-px overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF4E8D] to-[#A259FF] opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-[#0A0A0B] rounded-[15px] p-6 text-center h-full flex flex-col items-center justify-center">
                    <h3 className="text-lg font-bold text-white mb-2">Build something cool?</h3>
                    <p className="text-sm text-gray-400 mb-5 leading-relaxed">Launch your AI tool on our directory and reach thousands of daily users instantly.</p>
                    <button className="w-full py-2.5 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
                        Submit Tool
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div className="bg-[#111113]/80 backdrop-blur-sm rounded-2xl border border-white/5 p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                    Top Categories
                </h3>
                <div className="space-y-3">
                    {CATEGORIES.map(cat => {
                        const count = toolsData.filter(t => t.category === cat).length;
                        return (
                            <Link href={`/?q=${encodeURIComponent(cat)}#results`} key={cat} className="flex items-center justify-between group cursor-pointer">
                                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{cat}</span>
                                <span className="text-[11px] font-bold text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full group-hover:bg-[#A259FF]/20 group-hover:text-[#A259FF] group-hover:border-[#A259FF]/30 transition-all">
                                    {count}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#111113]/80 backdrop-blur-sm rounded-2xl border border-white/5 p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white mb-2">Join the Community</h3>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">Top AI news, tools, and tutorials delivered straight to your inbox every week.</p>
                <div className="flex flex-col gap-3">
                    <input type="email" placeholder="Your email address" className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#A259FF] transition-colors shadow-inner" />
                    <button className="w-full bg-[#1A1A1F] border border-white/5 text-white hover:text-[#A259FF] hover:border-[#A259FF]/50 py-2.5 rounded-lg text-sm font-semibold transition-all">
                        Subscribe
                    </button>
                </div>
            </div>

        </aside>
    );
}
