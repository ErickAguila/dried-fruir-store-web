import HeroSection from "../components/HeroSection"
import FeaturedProducts from "../components/FeaturedProducts"
import CategorySection from "../components/CategorySection"
import TestimonialSection from "../components/TestimonialSection"

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <TestimonialSection />
    </div>
  )
}

