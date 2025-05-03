
import { HeroSection } from "@/components/ui/hero-section";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div className="container text-center py-12">
        <Link to="/predictions" className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Try It Now - View Predictions
        </Link>
      </div>
    </div>
  );
}
