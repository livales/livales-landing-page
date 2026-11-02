import { useLanguage } from "@/contexts/LanguageContext";
import { sortedPosts } from "@/content/posts";
import PageHeader from "@/components/layout/PageHeader";
import PostList from "@/components/PostList";

const Blog = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader title={t("blog.title")} lead={t("blog.lead")} />
      <div className="page pb-24 sm:pb-32">
        <PostList posts={sortedPosts} />
      </div>
    </>
  );
};

export default Blog;
