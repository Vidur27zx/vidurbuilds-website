// Refraction map supplied with the user's glass component. Only backdrop pixels
// are filtered; foreground text and icons retain their original sharpness.
export function GlassEffects() {
  return <svg aria-hidden="true" focusable="false" width="0" height="0" className="glass-filter-defs" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="portfolio-glass" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
        <feImage href="/glass/displacement.png" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="-6" xChannelSelector="R" yChannelSelector="G" result="refracted" />
        <feGaussianBlur in="refracted" stdDeviation="0.35" />
      </filter>
    </defs>
  </svg>;
}
