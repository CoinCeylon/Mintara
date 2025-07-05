import FaqAccordion from "@/components/faq-accordion";

import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <Hero />
      <FaqAccordion />
    </main>
  );
}
