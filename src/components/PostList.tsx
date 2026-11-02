import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate, type Post } from "@/content/posts";
import { postPath } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Articles as a plain list: date and reading time, the title, and its summary. */
const PostList = ({ posts, compact = false }: { posts: Post[]; compact?: boolean }) => {
  const { t, language } = useLanguage();

  return (
    <ul className="border-t border-ink/15">
      {posts.map((post) => {
        const copy = post.copy[language];
        return (
          <li key={post.slug} className="border-b border-ink/15">
            <Link to={postPath(post.slug)} className={cn("group block", compact ? "py-7" : "py-9")}>
              <span className="flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem] text-ink/65">
                <time dateTime={post.date}>{formatDate(post.date, language)}</time>{" "}
                <span>
                  {post.readMinutes} {t("blog.readTime")}
                </span>
              </span>{" "}
              <span
                className={cn(
                  "mt-3 block max-w-[34ch] font-display font-semibold leading-snug tracking-[-0.01em] decoration-livales-rose decoration-[3px] underline-offset-[6px] group-hover:underline",
                  compact ? "text-[1.2rem] sm:text-[1.35rem]" : "text-[1.35rem] sm:text-[1.7rem]"
                )}
              >
                {copy.title}
              </span>{" "}
              {!compact && (
                <span className="mt-3 block max-w-[40rem] text-[1.05rem] leading-relaxed text-ink/75">
                  {copy.description}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
