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
  const icalUrl = process.env.AIRBNB_ICAL_URL;

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
