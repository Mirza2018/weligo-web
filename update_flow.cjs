const fs = require('fs');
let code = fs.readFileSync('src/components/familiesPage/marketingContent.ts', 'utf8');

// Replace titleA in flow
code = code.replace(
  'titleA: pick(lang, {\n        de: "Von der Anmeldung zur ersten",\n        en: "From signup to first",\n      }),',
  'titleA: pick(lang, {\n        de: "Von der Anmeldung zur ersten",\n        en: "From registration to your first",\n      }),'
);
code = code.replace(
  'titleA: pick(lang, {\r\n        de: "Von der Anmeldung zur ersten",\r\n        en: "From signup to first",\r\n      }),',
  'titleA: pick(lang, {\r\n        de: "Von der Anmeldung zur ersten",\r\n        en: "From registration to your first",\r\n      }),'
);

// Replace titleB in flow
code = code.replace(
  'titleB: pick(lang, {\n        de: "Buchung in einer Woche.",\n        en: "booking in a week.",\n      }),',
  'titleB: pick(lang, {\n        de: "Buchung am selben Tag.",\n        en: "booking on the same day.",\n      }),'
);
code = code.replace(
  'titleB: pick(lang, {\r\n        de: "Buchung in einer Woche.",\r\n        en: "booking in a week.",\r\n      }),',
  'titleB: pick(lang, {\r\n        de: "Buchung am selben Tag.",\r\n        en: "booking on the same day.",\r\n      }),'
);

// Replace step 2 sub in flow
code = code.replace(
  'title: pick(lang, { de: "Verifiziert werden", en: "Get verified" }),\n          sub: pick(lang, { de: "2-3 Werktage", en: "2-3 Business Days" }),',
  'title: pick(lang, { de: "Verifiziert werden", en: "Get verified" }),\n          sub: pick(lang, {\n            de: "Verifizierung am selben Tag",\n            en: "Same-day verification",\n          }),'
);
code = code.replace(
  'title: pick(lang, { de: "Verifiziert werden", en: "Get verified" }),\r\n          sub: pick(lang, { de: "2-3 Werktage", en: "2-3 Business Days" }),',
  'title: pick(lang, { de: "Verifiziert werden", en: "Get verified" }),\r\n          sub: pick(lang, {\r\n            de: "Verifizierung am selben Tag",\r\n            en: "Same-day verification",\r\n          }),'
);

fs.writeFileSync('src/components/familiesPage/marketingContent.ts', code, 'utf8');
console.log('src/components/familiesPage/marketingContent.ts updated');

