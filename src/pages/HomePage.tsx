import type { LeverId } from '@/types/content';
import {
  business,
  clients,
  clientsIntro,
  footer,
  footerNav,
  hero,
  levers,
  navCta,
  navItems,
  problems,
  processIntro,
  processSteps,
  services,
  statement,
  trust,
  who,
} from '@/content';
import { useSingleSelect } from '@/hooks';
import { Footer, Header } from '@/components/layout';
import { Clients, Hero, Process, Services, Statement, TrustStrip, WhoWeAre } from '@/sections';

export const MAIN_CONTENT_ID = 'main-content';

/**
 * Composition root for the home page: content in, sections out. The one piece
 * of shared state lives here — picking a problem in the hero also opens the
 * matching lever in the services accordion further down.
 */
export function HomePage() {
  const problem = useSingleSelect<string>(problems[0].id);
  const lever = useSingleSelect<LeverId>(problems[0].lever);

  const toggleProblem = (id: string) => {
    const choosing = !problem.isSelected(id);
    problem.toggle(id);
    const match = problems.find((candidate) => candidate.id === id);
    if (choosing && match) lever.select(match.lever);
  };

  return (
    <>
      <main>
        <Hero
          header={<Header nav={navItems} cta={navCta} />}
          content={hero}
          problems={problems}
          levers={levers}
          selectedProblem={problem.selected}
          onToggleProblem={toggleProblem}
          contentId={MAIN_CONTENT_ID}
        />
        <TrustStrip content={trust} />
        <Clients content={clientsIntro} clients={clients} />
        <WhoWeAre content={who} />
        <Statement content={statement} />
        <Services
          content={services}
          levers={levers}
          openId={lever.selected}
          onToggle={lever.toggle}
        />
        <Process intro={processIntro} steps={processSteps} />
      </main>
      <Footer content={footer} business={business} nav={footerNav} />
    </>
  );
}
