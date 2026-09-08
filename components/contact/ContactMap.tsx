export function ContactMap() {
  const mapSrc =
    "https://maps.google.com/maps?q=Centre+Commercial+Ch%C3%A9raga%2C+Alger&hl=fr&z=15&output=embed";

  return (
    <div className="overflow-hidden border border-navy/10 bg-white">
      <div className="border-b border-navy/10 px-4 py-3">
        <p className="font-display text-sm font-semibold text-navy">
          Localisation — Chéraga, Alger
        </p>
        <p className="mt-1 text-xs text-slate-text">
          Centre Commercial Chéraga, Qods Étage R
        </p>
      </div>
      <div className="relative aspect-[16/11] w-full sm:aspect-[16/9]">
        <iframe
          title="Carte Google Maps — LEAGB Chéraga Alger"
          src={mapSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
