import ContentCard from '@/components/ContentCard';
import { MOCK_CONTENT } from '@/lib/mock-data';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const approvedContent = MOCK_CONTENT.filter(c => c.status === 'approved');

  // Mock selection for different sections
  const heroContent = approvedContent[0];
  const trendingContent = approvedContent.slice(1, 5);
  const latestContent = approvedContent.slice(5);

  return (
    <div className="space-y-12 pb-10">
      {/* Hero Section */}
      {heroContent && (
        <section className="relative">
          <ContentCard content={heroContent} variant="featured" />
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-12">
          {/* Trending Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b pb-4">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              <h2 className="text-xl font-bold tracking-tight">Trending Now</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {trendingContent.map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </section>

          {/* Latest Feed */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-bold tracking-tight">Latest Stories</h2>
              <Link href="/explore" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-6">
              {latestContent.length > 0 ? (
                latestContent.map((content) => (
                  <ContentCard key={content.id} content={content} variant="compact" />
                ))
              ) : (
                <p className="text-muted-foreground">No more content to load.</p>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Newsletter / CTA */}
          <div className="rounded-xl bg-primary-50 p-6 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/20">
            <h3 className="font-serif text-xl font-bold mb-2">Subscribe to Haqiqa</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest Islamic insights and updates delivered directly to your inbox.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <button className="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                Subscribe
              </button>
            </div>
          </div>

          {/* Categories / Topics */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">Discover Topics</h3>
            <div className="flex flex-wrap gap-2">
              {['Theology', 'History', 'Spirituality', 'Lifestyle', 'Quran', 'Hadith', 'Family'].map((topic) => (
                <Link
                  key={topic}
                  href={`/explore?topic=${topic.toLowerCase()}`}
                  className="rounded-full border bg-background px-3 py-1 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>

          {/* Top Creators */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">Featured Creators</h3>
            <div className="space-y-4">
              {/* Mock featured creators list */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                  <p className="text-sm font-medium">Sheikh Ahmed</p>
                  <p className="text-xs text-muted-foreground">Scholar</p>
                </div>
                <button className="ml-auto text-xs font-medium text-primary-600">Follow</button>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                  <p className="text-sm font-medium">Sister Fatima</p>
                  <p className="text-xs text-muted-foreground">Educator</p>
                </div>
                <button className="ml-auto text-xs font-medium text-primary-600">Follow</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
