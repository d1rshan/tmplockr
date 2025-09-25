import { HeroSection } from "../sections/hero-section";
import { MainSection } from "../sections/main-section";

export function HomeView() {
  return (
    <div className="min-h-screen pt-20 max-w-6xl mx-auto">
      <HeroSection />
      <MainSection />
    </div>
  );
}
