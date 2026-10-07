import { useRef } from 'react';
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
} from '@/content';
import { useSingleSelect } from '@/hooks';
import { Footer, Header } from '@/components/layout';
import { Clients, Hero, Process, Services, Statement, TrustStrip } from '@/sections';
import type { ServicesHandle } from '@/sections';
import { MAIN_CONTENT_ID } from './ids';

/**
 * Composition root for the home page: content in, sections out. The open lever
 * is shared state: scrolling through the services opens each lever in turn,
 * picking a problem in the hero opens the lever that answers it, and the hero's
 * "Start with …" link glides down to that lever.
 */
export function HomePage() {
  const problem = useSingleSelect<string>(problems[0].id);
  const lever = useSingleSelect<LeverId>(problems[0].lever);
  const servicesRef = useRef<ServicesHandle>(null);

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
          header={<Header nav={navItems} cta={navCta} current="home" />}
          content={hero}
          problems={problems}
          levers={levers}
          selectedProblem={problem.selected}
          onToggleProblem={toggleProblem}
          onShowLever={(id) => servicesRef.current!.showLever(id)}
          contentId={MAIN_CONTENT_ID}
        />
        <TrustStrip content={trust} />
        <Statement content={statement} />
        <Services
          content={services}
          levers={levers}
          openId={lever.selected}
          onToggle={lever.toggle}
          onStep={lever.select}
          ref={servicesRef}
        />
        <Process intro={processIntro} steps={processSteps} />
        <Clients content={clientsIntro} clients={clients} />
      </main>
      <Footer content={footer} business={business} nav={footerNav} />
    </>
  );
}
