import { auth } from "@/lib/auth";
import { HeaderNavBar, HeroBanner } from "@/components/LandingSections";
import { PricingSection } from "@/components/Pricing";

export default async function LandingPage() {
  const session = await auth();

  return (
    <main>
      <HeaderNavBar session={session} />
      <HeroBanner />
      <PricingSection />
    </main>
  );
}
