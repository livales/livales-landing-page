import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Embrace } from "@/components/brand/Embrace";
import ProductList from "@/components/ProductList";
import PostList from "@/components/PostList";
import TextLink from "@/components/TextLink";
import { sortedPosts } from "@/content/posts";
import { ROUTES } from "@/lib/seo";

/** Soft green field: every Livales app in one list. */
export const Lineup = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-livales-green-soft">
      <div className="page py-20 sm:py-28">
        <h2 className="heading-lg max-w-[20ch]">{t("lineup.title")}</h2>
        <p className="prose-copy mt-6">{t("lineup.body")}</p>
        <ProductList className="mt-12" />
        <Link to={ROUTES.products} className="btn-ink mt-10">
          {t("lineup.more")}
        </Link>
      </div>
    </section>
  );
};

/** The company's reason for existing, in two sentences, with the way to the full story. */
export const Why = () => {
  const { t } = useLanguage();

  return (
    <section>
      <div className="page grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <Embrace group="family" className="max-w-[9rem]" />
          <h2 className="heading-lg mt-8">{t("why.title")}</h2>
        </div>
        <div className="space-y-6 text-[1.15rem] leading-[1.75] sm:text-[1.3rem]">
          <p className="max-w-[38rem]">{t("why.p1")}</p>
          <p className="max-w-[38rem]">{t("why.p2")}</p>
          <p className="pt-2 text-[1.05rem]">
            <TextLink to={ROUTES.about}>{t("why.more")}</TextLink>
          </p>
        </div>
      </div>
    </section>
  );
};

/** The newest articles, so the home page links into the blog. */
export const BlogTeaser = () => {
  const { t } = useLanguage();

  return (
    <section className="border-t border-ink/10">
      <div className="page grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="heading-lg">{t("blogTeaser.title")}</h2>
          <p className="mt-6 text-[1.05rem]">
            <TextLink to={ROUTES.blog}>{t("blogTeaser.more")}</TextLink>
          </p>
        </div>
        <PostList posts={sortedPosts.slice(0, 3)} compact />
      </div>
    </section>
  );
};
