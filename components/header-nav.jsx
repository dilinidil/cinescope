import Link from "next/link";
import { Logo } from "./logo";
import ModeToggle from "./mode-toggle";

export default function HeaderNav({ isAuthenticated }) {
  return (
    <header className="border-primary/20 bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-1">
          <Logo className="h-8 w-8" fill="fill-primary" />
          <div className="text-primary text-xl font-bold">CineScope.lk</div>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link
            href="/movies"
            className="font-medium text-sm transition-colors"
          >
            Movies
          </Link>
          <Link
            href="/genres"
            className="font-medium text-sm transition-colors"
          >
            Genres
          </Link>
          <Link href="/about" className="font-medium text-sm transition-colors">
            About
          </Link>
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="font-medium text-sm transition-colors"
            >
              Dashboard
            </Link>
          )}
          {!isAuthenticated && (
            <Link
              href="/login"
              className="font-medium text-sm transition-colors"
            >
              Login
            </Link>
          )}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
