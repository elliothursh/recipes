import { cn } from "@/lib/cn";

export default function Header({ className }: { className?: string }) {
  return (
    <header className="flex flex-col p-4 font-title">
      <h1 className="text-5xl self-center">
        <a
          href="/"
          className={cn("hover:text-white transition duration-300", className)}
        >
          Recipes
        </a>
      </h1>
    </header>
  );
}
