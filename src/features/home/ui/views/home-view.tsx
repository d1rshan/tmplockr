import { HeroSection } from "../sections/hero-section";
import { HomeBentoSection } from "../sections/home-bento";

export default function HomeView() {
  return (
    <div className="min-h-screen pt-20 max-w-6xl mx-auto">
      <HeroSection />
      <HomeBentoSection />
    </div>
  );
}
