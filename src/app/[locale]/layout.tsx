import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

const SITE_CONFIG = {
  domain: 'valleyofthemillspark.com',
  baseUrl: 'https://valleyofthemillspark.com',
  heroImage: 'https://valleyofthemillspark.com/gallery/valley-of-the-mills-park-1.jpg',
  latitude: 47.0185658,
  longitude: 28.8193709,
  mapsShareUrl: 'https://maps.app.goo.gl/nLipr7g9VhagY7TQA',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4838.101444181921!2d28.819370899999996!3d47.0185658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dd38906c799%3A0x76d700055d8f840e!2sMills&#39;%20Valley%20Park!5e1!3m2!1sro!2s!4v1787901367459!5m2!1sro!2s',
  govtTourismUrl: 'https://turism.gov.md/',
  countryCode: 'MD',
  postalCode: 'MD-2012',
  streetAddress: 'Strada Grigore Alexandrescu',
  nearbyLandmark1: {
    ro: 'Parcul „Ștefan cel Mare și Sfânt”',
    en: 'Ștefan cel Mare Central Park',
    zh: '斯特凡大帝中央公园',
  },
  nearbyLandmark2: {
    ro: 'Grădina Botanică din Chișinău',
    en: 'Chișinău Botanical Garden',
    zh: '基希讷乌植物园',
  },
};

const LOCALE_INFO: Record<
  string,
  {
    ogLocale: string;
    htmlLang: string;
    fullName: string;
    shortName: string;
    city: string;
    state: string;
    country: string;
    titleTemplate: string;
    descTemplate: string;
    ogTitle: string;
    ogDesc: string;
    alternateName2: string;
  }
> = {
  ro: {
    ogLocale: 'ro_RO',
    htmlLang: 'ro',
    fullName: 'Parcul „Valea Morilor”',
    shortName: 'Valea Morilor',
    city: 'Chișinău',
    state: 'Municipiul Chișinău',
    country: 'Republica Moldova',
    titleTemplate: 'Parcul „Valea Morilor” (Chișinău) - Ghid de vizitare și Locație',
    descTemplate:
      'Descoperiți Parcul „Valea Morilor”, atracția emblematică din Chișinău, Republica Moldova. Consultați harta locației, programul, obiective din jur precum Parcul Ștefan cel Mare și Grădina Botanică, precum și sfaturi de călătorie.',
    ogTitle: 'Parcul „Valea Morilor” - Ghid de Călătorie Chișinău',
    ogDesc:
      'Ghid oficial al vizitatorilor pentru Parcul „Valea Morilor” din Chișinău, Municipiul Chișinău, Republica Moldova.',
    alternateName2: 'Chișinău Parcul „Valea Morilor”',
  },
  en: {
    ogLocale: 'en_US',
    htmlLang: 'en',
    fullName: 'Valley of the Mills Park',
    shortName: "Mills' Valley Park",
    city: 'Chișinău',
    state: 'Chișinău Municipality',
    country: 'Moldova',
    titleTemplate: 'Valley of the Mills Park (Chișinău) - Visitor Guide & Location',
    descTemplate:
      'Discover Valley of the Mills Park, the iconic landmark in Chișinău, Moldova. View location map, opening details, nearby Ștefan cel Mare Central Park and Chișinău Botanical Garden, and travel tips.',
    ogTitle: 'Valley of the Mills Park - Chișinău Travel Guide',
    ogDesc:
      'Official visitor guide to Valley of the Mills Park in Chișinău, Chișinău Municipality, Moldova.',
    alternateName2: 'Chișinău Valley of the Mills Park',
  },
  zh: {
    ogLocale: 'zh_CN',
    htmlLang: 'zh-CN',
    fullName: '风车谷公园',
    shortName: '风车谷',
    city: '基希讷乌',
    state: '基希讷乌直辖市',
    country: '摩尔多瓦共和国',
    titleTemplate: '风车谷公园 (基希讷乌) - 游览指南与位置地图',
    descTemplate:
      '探索摩尔多瓦首都基希讷乌的标志性地标风车谷公园（Parcul „Valea Morilor”）。查看位置地图、开放信息、周边斯特凡大帝中央公园与基希讷乌植物园，以及旅行实用建议。',
    ogTitle: '风车谷公园 - 基希讷乌旅游指南',
    ogDesc:
      '摩尔多瓦共和国基希讷乌直辖市风车谷公园（Parcul „Valea Morilor”）权威游客指南。',
    alternateName2: '基希讷乌风车谷公园',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const info = LOCALE_INFO[locale] || LOCALE_INFO.ro;
  const baseUrl = SITE_CONFIG.baseUrl;

  const roUrl = `${baseUrl}/ro`;
  const enUrl = `${baseUrl}/en`;
  const zhUrl = `${baseUrl}/zh`;

  const localeUrlMap: Record<string, string> = { ro: roUrl, en: enUrl, zh: zhUrl };
  const selfUrl = localeUrlMap[locale] || roUrl;

  return {
    title: info.titleTemplate,
    description: info.descTemplate,
    alternates: {
      canonical: selfUrl,
      languages: {
        ro: roUrl,
        en: enUrl,
        zh: zhUrl,
        'x-default': roUrl,
      },
    },
    openGraph: {
      title: info.ogTitle,
      description: info.ogDesc,
      url: selfUrl,
      siteName: info.fullName,
      locale: info.ogLocale,
      type: 'website',
      images: [
        {
          url: SITE_CONFIG.heroImage,
          width: 1920,
          height: 1080,
          alt: `${info.fullName} - Main view in ${info.city}, ${info.country}`,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const info = LOCALE_INFO[locale] || LOCALE_INFO.ro;

  const touristAttractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${SITE_CONFIG.baseUrl}/#attraction`,
    name: info.fullName,
    alternateName: [info.shortName, info.alternateName2, 'Parcul „Valea Morilor”', 'Valley of the Mills Park'],
    description: info.ogDesc,
    url: SITE_CONFIG.baseUrl,
    image: [SITE_CONFIG.heroImage],
    isAccessibleForFree: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.streetAddress,
      addressLocality: info.city,
      addressRegion: info.state,
      postalCode: SITE_CONFIG.postalCode,
      addressCountry: SITE_CONFIG.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.latitude,
      longitude: SITE_CONFIG.longitude,
    },
    hasMap: SITE_CONFIG.mapsShareUrl,
    sameAs: [SITE_CONFIG.mapsShareUrl, SITE_CONFIG.govtTourismUrl],
  };

  const faqQ1 =
    locale === 'zh'
      ? '风车谷公园位于哪里？'
      : locale === 'ro'
        ? 'Unde se află Parcul „Valea Morilor”?'
        : 'Where is Valley of the Mills Park located?';
  const faqA1 =
    locale === 'zh'
      ? '风车谷公园（Parcul „Valea Morilor”）位于摩尔多瓦共和国基希讷乌直辖市基希讷乌市，地址为 Strada Grigore Alexandrescu。'
      : locale === 'ro'
        ? 'Parcul „Valea Morilor” se află în Chișinău, Municipiul Chișinău, Republica Moldova, la adresa Strada Grigore Alexandrescu.'
        : 'Valley of the Mills Park (Parcul „Valea Morilor”) is located in Chișinău, Chișinău Municipality, Moldova, at Strada Grigore Alexandrescu.';

  const faqQ2 =
    locale === 'zh'
      ? '参观风车谷公园是否免费？'
      : locale === 'ro'
        ? 'Vizitarea Parculului „Valea Morilor” este gratuită?'
        : "Is Mills' Valley Park free to visit?";
  const faqA2 =
    locale === 'zh'
      ? '是的，风车谷公园为公共开放空间，全年免费对公众开放，入园无需购票。'
      : locale === 'ro'
        ? 'Da, Parcul „Valea Morilor” este un spațiu public și poate fi vizitat gratuit pe tot parcursul anului.'
        : 'Yes, Valley of the Mills Park is a public space and is free to visit year-round.';

  const faqQ3 =
    locale === 'zh'
      ? '风车谷公园附近有哪些主要景点？'
      : locale === 'ro'
        ? 'Ce atracții se află în apropierea Parculului „Valea Morilor”?'
        : 'What are the main attractions near Valley of the Mills Park?';
  const faqA3 =
    locale === 'zh'
      ? `风车谷公园周边可便捷前往斯特凡大帝中央公园（${SITE_CONFIG.nearbyLandmark1.en}）及基希讷乌植物园（${SITE_CONFIG.nearbyLandmark2.en}）等代表性景点。`
      : locale === 'ro'
        ? `În apropierea Parculului „Valea Morilor” se pot explora cu ușurință ${SITE_CONFIG.nearbyLandmark1.ro} și ${SITE_CONFIG.nearbyLandmark2.ro}, printre alte obiective emblematice.`
        : `When visiting Valley of the Mills Park, visitors can easily explore surrounding landmarks including ${SITE_CONFIG.nearbyLandmark1.en} and ${SITE_CONFIG.nearbyLandmark2.en}.`;

  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: faqQ1,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faqA1,
        },
      },
      {
        '@type': 'Question',
        name: faqQ2,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faqA2,
        },
      },
      {
        '@type': 'Question',
        name: faqQ3,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faqA3,
        },
      },
    ],
  };

  return (
    <html lang={info.htmlLang} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <link rel="canonical" href={`${SITE_CONFIG.baseUrl}/${locale}`} />
        <meta property="og:image" content={SITE_CONFIG.heroImage} />
        <meta property="og:image:alt" content={`${info.fullName} in ${info.city}`} />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
