import { Link, useParams } from "react-router-dom";
import { useLanguage, HL_TESTER_URL } from "@/contexts/LanguageContext";
import { formatDate, getPost, sortedPosts, type Block } from "@/content/posts";
import { products } from "@/content/products";
import { ProductMark } from "@/components/brand/ProductMark";
import PostList from "@/components/PostList";
import { ROUTES } from "@/lib/seo";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

const renderBlock = (block: Block, i: number) => {
  switch (block.type) {
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    default:
      return <p key={i}>{block.text}</p>;
  }
};

const BlogPost = () => {
  const { slug = "" } = useParams();
  const { t, language } = useLanguage();
  const post = getPost(slug);
  if (!post) return <NotFound />;

  const copy = post.copy[language];
  const product = products.find((p) => p.key === post.product);
  const others = sortedPosts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <article className="page pb-20 pt-10 sm:pb-28 sm:pt-14">
        <nav aria-label={t("blog.breadcrumb")} className="text-[0.98rem]">
          <Link to={ROUTES.blog} className="inline-flex items-center gap-2 font-semibold text-ink/75 hover:text-ink">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-livales-rose" />
            {t("blog.back")}
          </Link>
        </nav>

        <header className="mt-10 max-w-[46rem]">
          <h1 className="font-display text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[2.9rem]">
            {copy.title}
          </h1>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[0.98rem] text-ink/65">
            <span>
              {t("blog.published")} <time dateTime={post.date}>{formatDate(post.date, language)}</time>
            </span>{" "}
            <span>
              {post.readMinutes} {t("blog.readTime")}
            </span>
          </p>
          <p className="mt-8 text-[1.2rem] leading-[1.7] text-ink/85 sm:text-[1.3rem]">{copy.description}</p>
        </header>

        <div className="article mt-12 max-w-[40rem]">{copy.body.map(renderBlock)}</div>

        {product && (
          <aside
            aria-label={t("blog.related")}
            className={cn(
              "mt-16 flex max-w-[40rem] flex-col gap-6 rounded-[2rem] p-7 sm:flex-row sm:items-center sm:p-8",
              product.key === "hl" ? "bg-livales-rose-soft" : "bg-livales-green-soft"
            )}
          >
            <ProductMark product={product.key} className="h-16 w-16" />
            <div>
              <p className="font-display text-[1.2rem] font-semibold">{t(`product.${product.key}.name`)}</p>{" "}
              <p className="mt-1 text-[1.02rem] text-ink/75">{t(`product.${product.key}.short`)}</p>{" "}
              <a
                href={product.key === "hl" ? HL_TESTER_URL[language] : product.url[language]}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink mt-5 h-11 px-5 text-[0.95rem]"
              >
                {t(product.key === "hl" ? "product.hl.tester" : `product.${product.key}.cta`)}
                <span className="sr-only"> {t("common.newTab")}</span>
              </a>
            </div>
          </aside>
        )}
      </article>

      {others.length > 0 && (
        <section aria-labelledby="more-title" className="border-t border-ink/10">
          <div className="page grid gap-10 py-20 sm:py-24 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
            <h2 id="more-title" className="heading-lg">
              {t("blog.more")}
            </h2>
            <PostList posts={others} compact />
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPost;
