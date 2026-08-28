'use client';

import { useTranslations, useLocale } from 'next-intl';

const EMBED_SRC_BY_LOCALE: Record<string, string> = {
  ro: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4838.101444181921!2d28.819370899999996!3d47.0185658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dd38906c799%3A0x76d700055d8f840e!2sMills&#39;%20Valley%20Park!5e1!3m2!1sro!2s!4v1787901367459!5m2!1sro!2s',
  en: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4838.101444181921!2d28.819370899999996!3d47.0185658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dd38906c799%3A0x76d700055d8f840e!2sMills&#39;%20Valley%20Park!5e1!3m2!1sen!2s!4v1787901367459!5m2!1sen!2s',
  zh: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4838.101444181921!2d28.819370899999996!3d47.0185658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dd38906c799%3A0x76d700055d8f840e!2sMills&#39;%20Valley%20Park!5e1!3m2!1szh-CN!2s!4v1787901367459!5m2!1szh-CN!2s',
};

const IFRAME_TITLE: Record<string, string> = {
  ro: 'Hărți Google - Parcul „Valea Morilor”',
  en: 'Google Maps - Valley of the Mills Park',
  zh: 'Google 地图 - 风车谷公园',
};

type LinkLabels = { country: string; region: string; portal: string };

const LINK_LABELS: Record<string, LinkLabels> = {
  ro: { country: 'Republica Moldova', region: 'Municipiul Chișinău', portal: 'Portalul Oficial de Turism' },
  en: { country: 'Moldova', region: 'Chișinău Municipality', portal: 'Official Tourism Portal' },
  zh: { country: '摩尔多瓦共和国', region: '基希讷乌直辖市', portal: '官方旅游门户' },
};

export default function MapEmbed() {
  const t = useTranslations('mapSection');
  const tFooter = useTranslations('footer');
  const locale = useLocale();
  const src = EMBED_SRC_BY_LOCALE[locale] || EMBED_SRC_BY_LOCALE.en;
  const iframeTitle = IFRAME_TITLE[locale] || IFRAME_TITLE.en;
  const labels = LINK_LABELS[locale] || LINK_LABELS.en;

  return (
    <section id="map" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div
          className="map-container relative rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--map-border)' }}
        >
          <iframe
            src={src}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title={iframeTitle}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="https://maps.app.goo.gl/nLipr7g9VhagY7TQA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('openMaps')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        <div className="mt-10 p-5 sm:p-6 rounded-xl border border-dashed" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {tFooter('officialTourismLinkText')}{' '}
            <a
              href="https://turism.gov.md/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2 hover:no-underline"
              style={{ color: 'var(--accent)' }}
            >
              {labels.country} / {labels.region} {labels.portal}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
