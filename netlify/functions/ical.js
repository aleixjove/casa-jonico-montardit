// ─────────────────────────────────────────────────────────────────────────────
// ⚠️ AVÍS IMPORTANT — cobertura parcial d'overbooking
// ─────────────────────────────────────────────────────────────────────────────
// Aquesta funció NOMÉS bloqueja al calendari de la web les dates ocupades a
// AIRBNB (via l'exportació iCal gratuïta del propi Airbnb).
//
// Booking.com NO està cobert per aquesta sincronia. Booking és actualment el
// canal amb més volum (~17 reserves reals), per tant queda SENSE protecció
// automàtica contra overbooking:
//   → Cal revisar MANUALMENT el calendari de Booking.com al panell de
//     l'extranet abans de confirmar qualsevol sol·licitud rebuda per la web.
//
// Fins fa poc utilitzàvem Smoobu (channel manager) que unificava Booking i
// Airbnb en un únic iCal, però era de pagament i s'ha acabat la prova gratuïta.
// Si algun dia es reactiva, es pot posar SMOOBU_ICAL_URL i tornarà a ser
// prioritari (mira la lògica del fallback a sota).
// ─────────────────────────────────────────────────────────────────────────────

function parseICalDates(text) {
  const dates = new Set();
  const events = text.split('BEGIN:VEVENT');

  for (let i = 1; i < events.length; i++) {
    const event = events[i];

    // Match DTSTART and DTEND in either DATE or DATETIME format
    const startMatch = event.match(/DTSTART(?:;[^:]*)?:(\d{8})/);
    const endMatch   = event.match(/DTEND(?:;[^:]*)?:(\d{8})/);

    if (!startMatch || !endMatch) continue;

    const parseYMD = (s) => new Date(
      Date.UTC(+s.slice(0,4), +s.slice(4,6) - 1, +s.slice(6,8))
    );
    const toStr = (d) =>
      d.getUTCFullYear() + '-' +
      String(d.getUTCMonth() + 1).padStart(2,'0') + '-' +
      String(d.getUTCDate()).padStart(2,'0');

    const start = parseYMD(startMatch[1]);
    const end   = parseYMD(endMatch[1]);

    // Add every night (start inclusive, end exclusive — checkout day is free)
    const cur = new Date(start);
    while (cur < end) {
      dates.add(toStr(cur));
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
  }

  return Array.from(dates);
}

export const handler = async () => {
  // Font principal: AIRBNB_ICAL_URL (iCal gratuït d'Airbnb).
  // Fallback: SMOOBU_ICAL_URL, per si algun dia es torna a activar Smoobu
  // (que cobriria també Booking i unificaria fonts).
  const icalUrl = process.env.AIRBNB_ICAL_URL || process.env.SMOOBU_ICAL_URL;

  if (!icalUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'AIRBNB_ICAL_URL not configured' }),
    };
  }

  try {
    const res = await fetch(icalUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const blockedDates = parseICalDates(text);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // cache 1h
      },
      body: JSON.stringify({ blockedDates }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
