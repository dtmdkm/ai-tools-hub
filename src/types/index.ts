export interface Tool {
    id: string;
    name: string;
    description: string;
    tagline: string;
    url: string;
    thumbnailUrl: string;
    tags: string[];
    upvotes: number;
    pricing: 'Free' | 'Freemium' | 'Paid';
    category: string;
    verified: boolean;
    views: number;
}
