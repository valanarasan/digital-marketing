import {
  aboutHero,
  aboutIndex,
  aboutIndexLabel,
  business,
  clients,
  clientsIntro,
  footer,
  footerNav,
  navCta,
  navItems,
  quote,
  story,
  team,
  visionMission,
  who,
  whyUs,
} from '@/content';
import { Footer, Header } from '@/components/layout';
import { Clients, PageHero, Quote, Story, Team, VisionMission, WhoWeAre, WhyUs } from '@/sections';
import { MAIN_CONTENT_ID } from './ids';

/** Inside Hiranmaye: who we are, our story, why us, vision and mission, the team and advisors, and clients. */
export function AboutPage() {
  return (
    <>
      <main>
        <PageHero
          header={<Header nav={navItems} cta={navCta} current="about" />}
          content={aboutHero}
          contentId={MAIN_CONTENT_ID}
          index={aboutIndex}
          indexLabel={aboutIndexLabel}
        />
        <WhoWeAre content={who} />
        <VisionMission content={visionMission} />
        <Team content={team} />
        <Story content={story} />
        <WhyUs content={whyUs} />
        <Quote content={quote} />
        <Clients content={clientsIntro} clients={clients} />
      </main>
      <Footer content={footer} business={business} nav={footerNav} />
    </>
  );
}
