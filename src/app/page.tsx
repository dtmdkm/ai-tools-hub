import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ToolFeed from '@/components/ToolFeed';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { toolsData } from '@/data/tools';
import Link from 'next/link';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === 'string' ? searchParams.q : '';
  const query = q.toLowerCase();

  const filteredTools = query
    ? toolsData.filter(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.tags.some(tag => tag.toLowerCase().includes(query)) ||
      tool.category.toLowerCase().includes(query)
    )
    : toolsData;

  const isSearching = query.length > 0;

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero initialQuery={query} />

        <div id="results" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10 scroll-mt-6">

          {/* Main Feed */}
          <div className="flex-grow min-w-0 xl:max-w-none">
            <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  {!isSearching ? (
                    <>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A259FF] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A259FF]"></span>
                      </span>
                      Trending Today
                    </>
                  ) : (
                    <>
                      Search Results
                    </>
                  )}
                </h2>
                <p className="text-[15px] text-gray-400 mt-2">
                  {isSearching
                    ? `Found ${filteredTools.length} tools for "${query}"`
                    : "The most upvoted AI innovations of the week."}
                </p>
              </div>

              {!isSearching && (
                <div className="hidden sm:flex gap-2">
                  <button className="px-5 py-2 rounded-full bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors">Top</button>
                  <button className="px-5 py-2 rounded-full text-gray-400 text-sm font-semibold hover:text-white transition-colors">New</button>
                </div>
              )}
            </div>

            {filteredTools.length > 0 ? (
              <ToolFeed tools={filteredTools} />
            ) : (
              <div className="text-center py-20 bg-[#111113]/50 rounded-2xl border border-white/5">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-bold text-white mb-2">No tools found</h3>
                <p className="text-gray-400 mb-6">We couldn't find any tools matching "{query}".</p>
                <Link href="/" className="inline-flex items-center gap-2 bg-white/10 text-white hover:bg-white/20 px-6 py-2.5 rounded-xl font-medium transition-colors">
                  Clear Search
                </Link>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <Sidebar />

        </div>
      </main>
      <Footer />
    </>
  );
}
