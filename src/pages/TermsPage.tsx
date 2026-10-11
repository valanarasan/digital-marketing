import { business, footer, footerNav, navCta, navItems, termsAndConditions } from '@/content';
import { Footer, Header } from '@/components/layout';
import { LegalDocument, PageHero } from '@/sections';
import { MAIN_CONTENT_ID } from './ids';

export function TermsPage() {
  return (
    <>
      <main>
        <PageHero
          header={<Header nav={navItems} cta={navCta} current="terms" />}
          content={termsAndConditions.hero}
          contentId={MAIN_CONTENT_ID}
        />
        <LegalDocument content={termsAndConditions} />
      </main>
      <Footer content={footer} business={business} nav={footerNav} />
    </>
  );
}
