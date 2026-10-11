import type { LegalDocumentContent } from '@/types/content';
import { business } from './business';

const UPDATED = 'Last updated 11 October 2026';

const contactBlock = `${business.name}, ${business.address}. Email ${business.email} or call ${business.phoneDisplay}.`;

/**
 * Privacy policy, written for this site as it is built today: no accounts, no forms and no
 * analytics or advertising cookies. Revisit it whenever one of those is added.
 */
export const privacyPolicy: LegalDocumentContent = {
  hero: {
    kicker: 'Legal',
    title: 'Privacy',
    titleAccent: 'Policy.',
    intro:
      'What we collect when you visit hiranmayedigital.com or get in touch, and what we do with it.',
  },
  updated: UPDATED,
  sections: [
    {
      heading: 'Who we are',
      blocks: [
        `This website is run by ${business.name}, a digital marketing studio in Bengaluru, India ("we", "us"). We decide why and how the personal data described below is used. This policy follows India's Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.`,
      ],
    },
    {
      heading: 'What we collect',
      blocks: [
        'This site has no accounts, sign-up forms or comment boxes, so we collect very little.',
        [
          'Messages you send us. When you email us, message us on WhatsApp or Instagram, or call, we receive what you choose to share: usually your name, contact details, business and message.',
          'Technical logs. Like any website, the servers that deliver it record standard request details such as IP address, browser and device type, pages requested and timestamps. These are kept by our hosting provider for security and reliability.',
          'Embedded content. The map in the footer is loaded from Google Maps. Loading it sends your IP address and browser details to Google, which may set its own cookies under its own policy.',
        ],
        'We do not use advertising, tracking or analytics cookies, and we do not build profiles of visitors. If that changes, we will update this policy and ask for your consent where the law requires it.',
      ],
    },
    {
      heading: 'How we use it',
      blocks: [
        [
          'To reply to your enquiry and discuss working together.',
          'To send you a proposal, quote or follow-up you have asked for.',
          'To keep the site secure, fix faults and understand how it performs.',
          'To meet legal, tax and accounting obligations if we do work together.',
        ],
        'We do not sell your personal data, and we do not send marketing messages to people who have only visited this site.',
      ],
    },
    {
      heading: 'Who we share it with',
      blocks: [
        'Only with people who need it to run the site or serve you: our hosting provider, the email, messaging and communication tools we use to reply to you, and professional advisers where needed. They may only use it for those purposes. We will also disclose data if a court, regulator or law enforcement body lawfully requires it.',
        'Links to WhatsApp, Instagram, LinkedIn, YouTube and Facebook take you to those services. Anything you share there is handled under their own privacy policies, not this one.',
      ],
    },
    {
      heading: 'How long we keep it',
      blocks: [
        'Enquiries that do not lead to work are deleted after 12 months. If we work together, we keep project and billing records for as long as the law requires, which can be several years for financial records in India. Server logs are kept by the hosting provider for a short period only.',
      ],
    },
    {
      heading: 'Cookies',
      blocks: [
        'This site does not set cookies of its own. Fonts and images are served from the site itself. The only third-party content is the embedded map described above, which is outside our control. You can block or delete cookies in your browser settings.',
      ],
    },
    {
      heading: 'Your rights',
      blocks: [
        'Under the Digital Personal Data Protection Act you may:',
        [
          'ask for a summary of the personal data we hold about you and how it is used;',
          'ask us to correct or complete it;',
          'ask us to erase it when it is no longer needed;',
          'withdraw consent you have given, and name someone to exercise these rights on your behalf; and',
          'make a complaint about how we handle your data.',
        ],
        `To use any of these rights, contact us using the details below. We aim to reply within 30 days. If we have not resolved your complaint, you may approach the Data Protection Board of India.`,
      ],
    },
    {
      heading: 'Security',
      blocks: [
        'The site is served over HTTPS and we limit who can access messages and records. No method of transmission or storage is completely secure, so we cannot guarantee absolute security. If a breach affects your data, we will notify you and the authorities as the law requires.',
      ],
    },
    {
      heading: 'Children',
      blocks: [
        'This site is meant for businesses and adults. We do not knowingly collect personal data from anyone under 18. If you believe a child has sent us personal data, tell us and we will delete it.',
      ],
    },
    {
      heading: 'Changes to this policy',
      blocks: [
        'We may update this policy as the site or the law changes. The date at the top shows the latest version, and we will point out significant changes on this page.',
      ],
    },
    {
      heading: 'Contact us',
      blocks: ['For privacy questions or requests:', contactBlock],
    },
  ],
};

/** Terms of use for the website. Client work is covered by a separate written agreement. */
export const termsAndConditions: LegalDocumentContent = {
  hero: {
    kicker: 'Legal',
    title: 'Terms &',
    titleAccent: 'Conditions.',
    intro: 'The ground rules for using this website.',
  },
  updated: UPDATED,
  sections: [
    {
      heading: 'About these terms',
      blocks: [
        `These terms cover your use of this website, operated by ${business.name} ("we", "us"), Bengaluru, India. By using the site you agree to them. If you do not agree, please do not use it. See our Privacy Policy for how we handle personal data.`,
      ],
    },
    {
      heading: 'Our services',
      blocks: [
        'The site describes what we offer. It is not an offer capable of acceptance, and nothing on it is a quote. Services, fees, timelines and responsibilities for any project are set out in a written proposal or agreement that both sides accept. If that agreement conflicts with these terms, the agreement wins for that project.',
      ],
    },
    {
      heading: 'General information, not advice',
      blocks: [
        'Content here is general information about digital marketing. It does not take your circumstances into account and is not legal, financial or professional advice. Examples, client names and descriptions of results show what is possible; they do not promise that you will achieve the same outcomes. Marketing results depend on many factors, including your market, budget and execution.',
      ],
    },
    {
      heading: 'Intellectual property',
      blocks: [
        `The site's text, design, graphics, code, brand name, logo and other material belong to ${business.name} or its licensors and are protected by copyright and trademark law. You may view the site and print or share a page for personal or internal business reference. You may not copy, republish, sell, modify or build on our material without our written permission.`,
        'Client and partner names and logos shown on the site belong to their owners and appear with their knowledge. Their appearance does not give you any right to use them.',
      ],
    },
    {
      heading: 'Acceptable use',
      blocks: [
        'You agree not to:',
        [
          'use the site unlawfully or in a way that harms others;',
          'try to gain unauthorised access to the site, its servers or related systems;',
          'introduce malware, or send automated traffic that burdens or disrupts the site;',
          'scrape the site at scale or use it to train a product without our permission; or',
          'imply that we endorse you or your business without our written agreement.',
        ],
      ],
    },
    {
      heading: 'Linking to us, and our links',
      blocks: [
        'You are welcome to link to the site if the link is fair, accurate and does not suggest endorsement or partnership. Please do not frame our pages or present them as your own. We may ask you to remove a link at any time.',
        'The site links to third-party websites and services such as Google Maps, WhatsApp and social networks. We do not control them and are not responsible for their content, availability or practices.',
      ],
    },
    {
      heading: 'Availability and accuracy',
      blocks: [
        'We work to keep the site accurate and available, but it is provided "as is". We do not promise that it will be free of errors, interruptions or inaccuracies, and we may change or remove content at any time without notice.',
      ],
    },
    {
      heading: 'Limit of liability',
      blocks: [
        'To the fullest extent the law allows, we are not liable for any indirect or consequential loss, or any loss of profit, revenue, data or opportunity, arising from your use of, or inability to use, the site or from relying on its content. Nothing in these terms limits liability that cannot be limited by law, including liability for fraud or wilful misconduct.',
      ],
    },
    {
      heading: 'Governing law',
      blocks: [
        'These terms are governed by the laws of India. The courts at Bengaluru, Karnataka have exclusive jurisdiction over any dispute arising from them, subject to any dispute resolution process set out in a separate client agreement.',
      ],
    },
    {
      heading: 'Changes to these terms',
      blocks: [
        'We may update these terms from time to time. The date at the top shows the latest version. Continuing to use the site after a change means you accept the updated terms.',
      ],
    },
    {
      heading: 'Contact us',
      blocks: ['Questions about these terms:', contactBlock],
    },
  ],
};
