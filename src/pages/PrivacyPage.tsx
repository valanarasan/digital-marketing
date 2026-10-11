import { business, footer, footerNav, navCta, navItems, privacyPolicy } from '@/content';
import { Footer, Header } from '@/components/layout';
import { LegalDocument, PageHero } from '@/sections';
import { MAIN_CONTENT_ID } from './ids';

export function PrivacyPage() {
  return (
    <>
      <main>
        <PageHero
          header={<Header nav={navItems} cta={navCta} current="privacy" />}
          content={privacyPolicy.hero}
          contentId={MAIN_CONTENT_ID}
        />
        <LegalDocument content={privacyPolicy} />
      </main>
      <Footer content={footer} business={business} nav={footerNav} />
    </>
  );
}
