'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function PhotoSpotsSection() {
  const t = useTranslations('photoSpots');
  const messages = useMessages() as any;
  const spots = (messages?.photoSpots?.spots || []) as Array<{ title: string; description: string; image?: string; location?: string }>;

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {spots.map((spot, index) => (
            <PhotoSpotCard
              key={index}
              title={spot.title}
              description={spot.description}
              image={spot.image}
              location={spot.location}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoSpotCard({ title, description, image, location, index }: { title: string; description: string; image?: string; location?: string; index: number }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      {/* Image area */}
      <div
        className="aspect-video relative flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))' }}
      >
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform hover:scale-105" loading="lazy" />
        ) : (
          <div className="text-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="mx-auto mb-2 opacity-50">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <span className="text-4xl font-bold opacity-20" style={{ color: 'var(--accent)' }}>
              {index}
            </span>
          </div>
        )}
        {location && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-white text-xs font-medium">{location}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold mb-2 text-lg" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
