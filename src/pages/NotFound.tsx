import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ROUTES } from "@/lib/seo";
import Logo from "@/components/brand/Logo";

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="page flex flex-col items-start py-24 sm:py-32">
      <Logo markOnly className="h-16" />
      <h1 className="heading-lg mt-10 max-w-[18ch]">{t("notFound.title")}</h1>
      <p className="mt-4 text-[1.1rem] text-ink/75">{t("notFound.body")}</p>
      <Link to={ROUTES.home} className="btn-ink mt-10">
        {t("notFound.cta")}
      </Link>
    </div>
  );
};

export default NotFound;
