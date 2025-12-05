import { Link } from "../components/Link.jsx";
export function Header() {
  return (
    <header>
      <h1>
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        DevJobs
      </h1>

      <nav>
        <Link href="/search">Buscar</Link>
        <Link href="/">Empleos</Link>
        <Link href="">Empresas</Link>
        <Link href="">Salarios</Link>
      </nav>

      <div>
        <Link href="">Publicar Empleos</Link>
        <Link href="">Iniciar Sesión</Link>
      </div>
    </header>
  );
}
