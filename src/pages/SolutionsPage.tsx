import { business, footer, footerNav, navCta, navItems, solutions, solutionsPage } from '@/content';
import { Footer, Header } from '@/components/layout';
import { PageHero, SolutionsList } from '@/sections';
import { MAIN_CONTENT_ID } from './ids';

/** Solutions: every service in full, with an index of all thirteen under the title. */
export function SolutionsPage() {
  const index = solutions.map((solution) => ({ label: solution.name, href: `#${solution.id}` }));

  return (
    <>
      <main>
        <PageHero
          header={<Header nav={navItems} cta={navCta} current="solutions" />}
          content={solutionsPage.hero}
          contentId={MAIN_CONTENT_ID}
          index={index}
          indexLabel={solutionsPage.indexLabel}
        />
        <SolutionsList content={solutionsPage} solutions={solutions} />
      </main>
      <Footer content={footer} business={business} nav={footerNav} />
    </>
  );
}
