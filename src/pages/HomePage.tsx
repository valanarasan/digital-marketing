import { useRef } from 'react';
import type { LeverId } from '@/types/content';
import {
  business,
  clients,
  clientsIntro,
  footer,
  footerNav,
  growthCheck,
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
import { Clients, GrowthCheck, Hero, Process, Services, Statement, TrustStrip } from '@/sections';
import type { ServicesHandle } from '@/sections';
import { MAIN_CONTENT_ID } from './ids';

/**
 * Composition root for the home page: content in, sections out. The open lever
 * and the picked problem are independent: scrolling through the services opens each
 * lever in turn, spinning the growth wheel only changes the problem, and the wheel's
 * "Start with …" link is the one bridge, gliding down to the lever that answers it.
 */
export function HomePage() {
  const problem = useSingleSelect<string>(problems[0].id);
  const lever = useSingleSelect<LeverId>(levers[0].id);
  const servicesRef = useRef<ServicesHandle>(null);

  return (
    <>
      <main>
        <Hero
          header={<Header nav={navItems} cta={navCta} current="home" />}
          content={hero}
          contentId={MAIN_CONTENT_ID}
          // Glide to the first lever: landing on the section's top edge would already be
          // partway through the scroll steps, and open the fourth.
          onExplore={() => servicesRef.current!.showLever(levers[0].id)}
        />
        <GrowthCheck
          content={growthCheck}
          problems={problems}
          levers={levers}
          selectedProblem={problem.selected}
          onSelectProblem={problem.select}
          onShowLever={(id) => servicesRef.current!.showLever(id)}
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
