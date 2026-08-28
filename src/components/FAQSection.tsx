'use client';

import { useTranslations, useMessages } from 'next-intl';

type FaqItem = { q: string; a: string };

export default function FAQSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items: FaqItem[] = messages?.faq?.items || [];

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border"
              style={{
                borderColor: 'var(--border-color)',
                background: 'var(--bg-tertiary)',
              }}
            >
              <summary
                className="cursor-pointer list-none p-5 sm:p-6 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <h3
                    className="font-display text-lg sm:text-xl font-semibold leading-snug"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.q}
                  </h3>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-1 flex-shrink-0 transition-transform group-open:rotate-180"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div
                className="px-5 sm:px-6 pb-6 pl-16 sm:pl-[4.25rem] text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
