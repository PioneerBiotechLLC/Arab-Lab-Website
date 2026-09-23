import { rssFeed } from '@/lib/rss'

export const dynamic = 'force-static'

// RSS 2.0 feed of published Arabic posts.
export function GET() { return rssFeed('ar') }
