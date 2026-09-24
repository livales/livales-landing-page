import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/brand/Logo";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
    <Logo markOnly className="h-14" />
    <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-livales-green-deep">404</p>
    <h1 className="mt-3 font-display text-4xl font-semibold text-foreground">
      Halaman tidak ditemukan
    </h1>
    <p className="mt-3 text-muted-foreground">Page not found.</p>
    <Link
      to="/"
      className="mt-8 inline-flex h-10 items-center gap-2 rounded-full border border-ink/10 px-5 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-livales-green-deep"
    >
      <ArrowLeft className="h-4 w-4" />
      Livales
    </Link>
  </div>
);

export default NotFound;
