import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  lastModified?: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  readTime: string;
  coverImage?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faqs?: BlogFAQ[];
  published: boolean;
  scheduledDate?: string;
  isFlagship?: boolean;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Normalizes author data from either an object or a legacy string.
 */
function normalizeAuthor(rawAuthor: unknown): BlogAuthor {
  if (
    typeof rawAuthor === 'object' &&
    rawAuthor !== null &&
    'name' in rawAuthor &&
    typeof (rawAuthor as { name: unknown }).name === 'string'
  ) {
    const authorObj = rawAuthor as {
      name: string;
      role?: string;
      avatar?: string;
      bio?: string;
    };
    return {
      name: authorObj.name,
      role: authorObj.role || 'Operations Lead',
      avatar: authorObj.avatar || '/images/leadership/sweety-j.jpg',
      bio: authorObj.bio,
    };
  }
  if (typeof rawAuthor === 'string') {
    const match = rawAuthor.match(/^([^(]+)(?:\((.+)\))?$/);
    const name = match ? match[1].trim() : rawAuthor.trim();
    const role = match && match[2] ? match[2].trim() : 'Operations Lead';
    let avatar = '/images/leadership/sweety-j.jpg';
    if (name.toLowerCase().includes('devadoss')) {
      avatar = '/images/leadership/major-ar-devadoss.jpg';
    } else if (name.toLowerCase().includes('steve') || name.toLowerCase().includes('daniel')) {
      avatar = '/images/leadership/r-jan-steve-daniel.jpg';
    }
    return { name, role, avatar };
  }
  return {
    name: 'Sweety J',
    role: 'Proprietor & Managing Director',
    avatar: '/images/leadership/sweety-j.jpg',
  };
}

/**
 * Normalizes date into YYYY-MM-DD string format.
 */
function normalizeDate(rawDate: unknown): string {
  if (!rawDate) return new Date().toISOString().split('T')[0];
  if (rawDate instanceof Date) {
    return rawDate.toISOString().split('T')[0];
  }
  return String(rawDate).trim();
}

/**
 * Converts heading text to an anchor slug.
 */
export function slugifyHeading(text: string): string {
  return text
    .replace(/&[a-z0-9#]+;/gi, '') // remove HTML entities like &amp;
    .replace(/<[^>]+>/g, '') // remove HTML tags
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Calculates estimated reading time in minutes based on word count.
 */
export function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Extracts Table of Contents (H2 and H3 headings) from raw markdown.
 */
export function extractTableOfContents(markdown: string): TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      // Strip markdown formatting like bold/italics
      const rawText = match[2].trim().replace(/\*\*|__|\*|_/g, '');
      const id = slugifyHeading(rawText);
      headings.push({ id, text: rawText, level });
    }
  }

  return headings;
}

/**
 * Compiles raw markdown into clean semantic HTML with anchor IDs on headings.
 */
export async function renderMarkdown(content: string): Promise<string> {
  const rawHtml = await marked.parse(content, { gfm: true, breaks: true });

  // Ensure all <h2> and <h3> have an id attribute matching slugifyHeading
  return rawHtml.replace(/<(h[23])(\s+[^>]*)?>(.*?)<\/\1>/gi, (match, tag, attrs, innerText) => {
    if (attrs && attrs.includes('id=')) {
      return match;
    }
    const cleanText = innerText.replace(/<[^>]+>/g, '');
    const id = slugifyHeading(cleanText);
    const restAttrs = attrs ? ` ${attrs.trim()}` : '';
    return `<${tag} id="${id}"${restAttrs}>${innerText}</${tag}>`;
  });
}

/**
 * Parses a single markdown file into a BlogPost object.
 */
function parsePostFile(filePath: string): BlogPost | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = data.slug || path.basename(filePath, '.md');

    const published = data.published !== false;
    const date = normalizeDate(data.date);
    const lastModified = data.lastModified ? normalizeDate(data.lastModified) : date;
    const author = normalizeAuthor(data.author);
    const readTime = data.readTime || calculateReadingTime(content);

    return {
      slug,
      title: data.title || 'Untitled Article',
      excerpt: data.excerpt || data.metaDescription || '',
      content,
      date,
      lastModified,
      author,
      category: data.category || 'Commercial Security',
      tags: Array.isArray(data.tags) ? data.tags : [],
      readTime,
      coverImage: data.coverImage || '/images/real_jsm_airport_terminal_platoon.jpg',
      metaTitle: data.metaTitle || `${data.title || 'Article'} | JSM Integrated`,
      metaDescription: data.metaDescription || data.excerpt || '',
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      faqs: Array.isArray(data.faqs) ? data.faqs : [],
      published,
      scheduledDate: data.scheduledDate ? normalizeDate(data.scheduledDate) : undefined,
      isFlagship: Boolean(data.isFlagship),
    };
  } catch (error) {
    console.error(`Error parsing blog post at ${filePath}:`, error);
    return null;
  }
}

/**
 * Returns all blog posts sorted by date descending.
 */
export function getAllPosts(options?: { includeUnpublished?: boolean }): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(CONTENT_DIR, file);
      const post = parsePostFile(filePath);
      if (post) {
        if (options?.includeUnpublished || post.published) {
          posts.push(post);
        }
      }
    }
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Fetches a single blog post by its URL slug.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  if (!slug) return null;

  // Try direct file path first
  const directPath = path.join(CONTENT_DIR, `${slug}.md`);
  if (fs.existsSync(directPath)) {
    const post = parsePostFile(directPath);
    if (post && post.published) return post;
  }

  // Fallback: search all posts in case filename differs from frontmatter slug
  const allPosts = getAllPosts();
  return allPosts.find((p) => p.slug === slug) || null;
}

/**
 * Returns a distinct, sorted list of all categories present across published posts.
 */
export function getCategories(): string[] {
  const posts = getAllPosts();
  const categorySet = new Set<string>();

  for (const post of posts) {
    if (post.category) {
      categorySet.add(post.category);
    }
  }

  return Array.from(categorySet).sort();
}

/**
 * Returns a distinct, sorted list of all tags present across published posts.
 */
export function getTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags) {
      if (tag) tagSet.add(tag);
    }
  }

  return Array.from(tagSet).sort();
}

/**
 * Returns up to `limit` related posts sharing the same category or tags.
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);

  // Score posts by category match (2 pts) and tag matches (1 pt each)
  const scored = allPosts.map((post) => {
    let score = 0;
    if (post.category === currentPost.category) score += 2;
    for (const tag of post.tags) {
      if (currentPost.tags.includes(tag)) score += 1;
    }
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
