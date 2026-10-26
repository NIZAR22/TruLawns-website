/**
 * Business details shown across the site: page sections, the page's
 * meta tags and the structured data search engines read.
 * Edit them here only.
 *
 * CommonJS so vue.config.js can read the same file for the HTML template.
 */
module.exports = Object.freeze({
  name: 'Tru Lawns',
  legalName: 'Tru Lawns',
  // Address the site will have once trulawnsfl.com points here; used for the
  // canonical link, link previews, robots.txt and sitemap.xml
  siteUrl: 'https://trulawnsfl.com',

  // Digits only; formatPhone() turns it into (321) 549-7011 for display
  phone: '3215497011',
  email: 'trulawnsfl@gmail.com',
  // Social profile; leave empty to hide the footer button
  facebookUrl: 'https://www.facebook.com/p/TruLawns-Turf-And-Landscape-100054260558104/',
  // Google Business Profile (Maps listing with the reviews)
  // TODO: confirm with TruLawns; this searches Maps for the business by name and address
  googleReviewsUrl: 'https://www.google.com/maps/search/?api=1&query=Tru+Lawns+256+Wavecrest+Ave+NE+Palm+Bay+FL',

  // Towns served, shown on the services section and given to search engines
  serviceArea: Object.freeze([
    'Palm Bay',
    'West Melbourne',
    'Melbourne',
    'Bayside Lakes',
    'Malabar',
    'Lockmar Estates'
  ]),
  // Office address for the map, the directions links and search engines
  address: Object.freeze({
    street: '256 Wavecrest Ave NE',
    city: 'Palm Bay',
    state: 'FL',
    zip: '32907'
  }),

  // Opening hours, the same on each listed day (24-hour clock), e.g.
  // { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], open: '08:00', close: '17:00' }
  // TODO: ask TruLawns; while null, the site and search-engine data leave hours out
  hours: null,

  // Year the business opened; when set, the footer reads "since <year>"
  foundedYear: null
})
