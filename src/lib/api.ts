// MongoDB _id can come as a plain string, an ObjectId toString, or { $oid: "..." }
export function getArticleId(article: any): string {
  const id = article?._id ?? article?.id;
  if (!id) return "";
  if (typeof id === "object" && id.$oid) return id.$oid;
  return String(id);
}

export interface Article {
  _id: string;
  label: string;
  readTime: string;
  title: string;
  description: string;
  img: string;
  featured: boolean;
  filter?: string;
  tags: string[];
  date: string;
  author: { name: string; bio: string; initial: string };
  content: Array<{
    heading: string;
    paragraphs: string[];
    blockquote?: string;
  }>;
}

// Raw shape returned by the admin-panel backend
interface RawArticle {
  id?: string;
  _id?: string;
  title: string;
  slug?: string;
  status?: string;
  publishedAt?: string;
  author?: string;
  excerpt?: string;
  coverImage?: string;
  content?: string;
  tags?: string;
  createdAt?: string;
  [key: string]: unknown;
}

function estimateReadTime(text: string): string {
  const words = text?.trim().split(/\s+/).length ?? 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function parseMarkdownToSections(
  markdown: string
): Article["content"] {
  if (!markdown?.trim()) return [{ heading: "", paragraphs: [] }];

  const sections: Article["content"] = [];
  let current: Article["content"][0] | null = null;

  for (const line of markdown.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const h2 = trimmed.match(/^##\s+(.+)/);
    const h3 = trimmed.match(/^###\s+(.+)/);
    const bq = trimmed.match(/^>\s+(.*)/);

    if (h2) {
      if (current) sections.push(current);
      current = { heading: h2[1], paragraphs: [] };
    } else if (h3) {
      // Treat ### as a bold lead-in paragraph inside the current section
      if (!current) current = { heading: "", paragraphs: [] };
      current.paragraphs.push(h3[1]);
    } else if (bq) {
      if (!current) current = { heading: "", paragraphs: [] };
      current.blockquote = bq[1];
    } else if (!trimmed.startsWith("#")) {
      if (!current) current = { heading: "", paragraphs: [] };
      current.paragraphs.push(trimmed);
    }
  }

  if (current) sections.push(current);
  return sections.length ? sections : [{ heading: "", paragraphs: [markdown.trim()] }];
}

function transformArticle(raw: RawArticle): Article {
  const authorName = raw.author ?? "XG Labs";
  const tagsRaw = raw.tags ?? "";
  const tagArray = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const firstTag = tagArray[0]?.toUpperCase() ?? "";

  return {
    _id: (raw.id ?? raw._id ?? "") as string,
    label: firstTag || raw.slug?.replace(/-/g, " ").toUpperCase() || "ARTICLE",
    readTime: estimateReadTime(raw.content ?? ""),
    title: raw.title ?? "",
    description: raw.excerpt ?? "",
    img: raw.coverImage ?? "",
    featured: false,
    filter: firstTag,
    tags: tagArray,
    date: raw.publishedAt ?? raw.createdAt?.slice(0, 10) ?? "",
    author: {
      name: authorName,
      bio: "",
      initial: authorName.charAt(0).toUpperCase(),
    },
    content: parseMarkdownToSections(raw.content ?? ""),
  };
}

export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch("/api/articles");
  if (!res.ok) throw new Error(`Error ${res.status}`);
  const raw: RawArticle[] = await res.json();
  return raw.map(transformArticle);
}

export interface ContactSubmission {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export async function subscribeEmail(email: string): Promise<void> {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Error ${res.status}`);
  }
}

export async function submitContactForm(data: ContactSubmission): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Error ${res.status}`);
  }
}

export async function fetchArticle(id: string): Promise<Article> {
  const res = await fetch(`/api/articles/${id}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  const raw: RawArticle = await res.json();
  return transformArticle(raw);
}
