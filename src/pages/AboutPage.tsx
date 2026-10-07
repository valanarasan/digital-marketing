import {
  aboutHero,
  aboutIndex,
  aboutIndexLabel,
  aboutWho,
  business,
  clients,
  clientsIntro,
  footer,
  footerNav,
  navCta,
  navItems,
  partners,
  quote,
  story,
  team,
  visionMission,
} from '@/content';
import { Footer, Header } from '@/components/layout';
import { Clients, PageHero, Quote, Story, Team, VisionMission, WhoWeAre } from '@/sections';
import { MAIN_CONTENT_ID } from './ids';

/** Inside Hiranmaye: who we are, our story, vision and mission, the team, clients and partners. */
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
        <WhoWeAre content={aboutWho} />
        <Story content={story} />
        <Quote content={quote} />
        <VisionMission content={visionMission} />
        <Team content={team} />
        <Clients content={clientsIntro} clients={clients} partners={partners} />
      </main>
      <Footer content={footer} business={business} nav={footerNav} />
    </>
  );
}
