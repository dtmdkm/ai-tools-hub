import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-white/5 mt-20 pt-16 pb-8">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-baseline mb-4">
                            <span className="font-bold text-2xl tracking-wide text-white">
                                AITools<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A259FF] to-[#FF4E8D] italic font-serif">Ai</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            The premier destination for discovering, reviewing, and launching the world's most innovative AI tools and models.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer text-gray-400 hover:text-white transition-colors">𝕏</div>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer text-gray-400 hover:text-white transition-colors">in</div>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer text-gray-400 hover:text-white transition-colors">GH</div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">Browse Tools</Link></li>
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">Submit Tool</Link></li>
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">Categories</Link></li>
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">Collections</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">API Documentation</Link></li>
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">Community Forum</Link></li>
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#A259FF] transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
                    <p>© 2026 AI Tools Hub Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 sm:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Status</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
