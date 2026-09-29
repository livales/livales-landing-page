import { Link } from "react-router-dom";
import Logo from "@/components/brand/Logo";

const NotFound = () => (
  <main className="page flex min-h-screen flex-col items-start justify-center py-20">
    <Logo markOnly className="h-16" />
    <h1 className="heading-lg mt-10 max-w-[18ch]">Halaman ini tidak ada.</h1>
    <p className="mt-4 text-[1.1rem] text-ink/75">This page doesn't exist.</p>
    <Link to="/" className="btn-ink mt-10">
      Kembali ke beranda
    </Link>
  </main>
);

export default NotFound;
