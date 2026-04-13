export type PageBuilderBlock =
        | {
                    id: string;
                    type: 'heading';
                    level: 1 | 2 | 3;
                    content: string;
            }
        | {
                    id: string;
                    type: 'text';
                    content: string;
            }
        | {
                    id: string;
                    type: 'image';
                    url: string;
                    content?: string;
            }
        | {
                    id: string;
                    type: 'button';
                    text: string;
                    url: string;
            };

export interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
        builder_data?: PageBuilderBlock[] | null;
    meta_title: string | null;
    meta_description: string | null;
    status: 'draft' | 'published';
    published_at: string | null;
    featured_image_url: string | null;
    created_at: string;
}

export type PostBlock =
    | { id: string; type: 'heading'; level: 1 | 2 | 3; content: string }
    | { id: string; type: 'paragraph'; content: string }
    | { id: string; type: 'image'; url: string; alt: string }
    | { id: string; type: 'list'; listType: 'ul' | 'ol'; items: string[] }
    | { id: string; type: 'quote'; content: string }
    | { id: string; type: 'divider' };

export interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: PostBlock[];
    status: 'draft' | 'published';
    published_at: string | null;
    featured_image_url: string | null;
    categories: Category[];
    author: { id: number; name: string };
    created_at: string;
    comments_enabled: boolean;
    comments_require_approval: boolean;
    comments_count?: number;
    pending_comments_count?: number;
    comments?: PostComment[];
}

export interface PostComment {
    id: number;
    parent_id: number | null;
    name: string;
    website: string | null;
    body: string;
    created_at: string;
    replies: PostComment[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

export interface MediaItem {
    id: number;
    name: string;
    file_name: string;
    url: string;
    mime_type: string;
    size: number;
    human_readable_size: string;
    created_at: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export interface Event {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    type: 'online' | 'in_person';
    starts_at: string;
    ends_at: string | null;
    registration_ends_at: string | null;
    timezone: string;
    location: string;
    location_url: string | null;
    status: 'draft' | 'published' | 'cancelled';
    max_registrants: number | null;
    confirmed_registrants_count?: number;
    created_at: string;
}

export interface EventRegistrant {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    status: 'pending' | 'confirmed' | 'cancelled';
    notes: string | null;
    created_at: string;
}
