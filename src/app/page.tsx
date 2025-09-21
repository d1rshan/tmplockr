import { Hero } from "@/features/home/components/hero";
import { HomeBento } from "@/features/home/components/home-bento";

export default function Home() {
  return (
    <div className="min-h-screen pt-20 max-w-6xl mx-auto">
      <Hero />
      <HomeBento />
    </div>
  );
}
