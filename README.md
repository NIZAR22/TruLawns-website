# Tru Lawns Website

A single-page website for Tru Lawns, a lawn care company in Palm Bay and Brevard County, Florida, built with Vue.js 2.7 and Vuetify 2.6. Served by GitHub Pages at [nizar22.github.io/TruLawns-website](https://nizar22.github.io/TruLawns-website/) until [trulawnsfl.com](https://trulawnsfl.com) points here.

## 🚀 Features

- **Easy to Read**: Large text and buttons, colors chosen for WCAG AA contrast
- **Responsive Layout**: Works on phones, tablets and desktops; phones and tablets get a menu button
- **Services**: Lawn care, mulch, hedge and tree trimming, yard cleanups and sod, with the towns served
- **Customer Reviews**: Reviews from customers, with a link to the Google listing
- **Free Estimate Form**: Sends requests by email through EmailJS, protected by reCAPTCHA
- **Contact Information**: Phone, email, map with directions, and call buttons throughout
- **SEO and Link Previews**: Meta description, Open Graph tags with a preview image, Schema.org LandscapingBusiness data, robots.txt and sitemap.xml
- **Accessibility**: Labels on icon-only buttons, keyboard-reachable navigation, reduced motion respected

## 🛠️ Technology Stack

- **Vue.js 2.7**: Progressive JavaScript framework (Options API)
- **Vuetify 2.6**: Material Design components, loaded à la carte by vuetify-loader so only the components in use are bundled
- **EmailJS + reCAPTCHA v2**: Free estimate form delivery and spam protection
- **Vue CLI 5**: Build tool and development server
- **Jest + Vue Test Utils**: Unit tests
- **GitHub Actions + GitHub Pages**: Automatic deployment

## 📁 Project Structure

```
TruLawns Website/
├── .github/workflows/
│   └── deploy.yml           # Lint, test, build and publish on every push to main
├── public/
│   ├── index.html           # HTML shell: meta tags, link previews, structured data
│   ├── favicon.ico          # Browser tab icon
│   ├── apple-touch-icon.png # Phone home-screen icon
│   └── og-image.png         # Link preview image (Facebook, text messages)
├── src/
│   ├── assets/              # Logo, hero photo, services photo
│   ├── components/          # One component per page section
│   │   ├── HeroSection.vue
│   │   ├── AboutServices.vue
│   │   ├── ReviewsSection.vue
│   │   ├── EstimateForm.vue
│   │   ├── ContactSection.vue
│   │   └── Footer.vue
│   ├── config/
│   │   ├── business.js      # Phone, email, address, hours, service area: edit business details here
│   │   ├── services.js      # Services listed on the page and offered in the estimate form
│   │   └── reviews.js       # Customer reviews
│   ├── styles/
│   │   └── theme.css        # Brand color variables, focus outline, reduced motion
│   ├── plugins/
│   │   └── vuetify.js       # Vuetify setup and theme colors
│   ├── utils/
│   │   └── format.js        # Phone, email and opening-hours formatting
│   ├── App.vue              # Page layout, navigation and scrolling
│   └── main.js              # Application entry point
├── tests/unit/              # Jest unit tests
├── package.json             # Dependencies and scripts
├── vue.config.js            # Vue CLI configuration
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 22 (the version the deploy workflow uses)
- npm 10

### Installation

1. **Clone the project** and open its folder

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run serve
   ```
   The site opens at `http://localhost:8080`. The development server uses Google's reCAPTCHA test key, so the form works without your own keys (sending still needs the EmailJS ones).

### Production Build

The estimate form needs four keys at build time. Put them in a `.env` file in the project folder (it's ignored by git):

```
VUE_APP_EMAILJS_PUBLIC_KEY=...
VUE_APP_EMAILJS_SERVICE_ID=...
VUE_APP_EMAILJS_TEMPLATE_ID=...
VUE_APP_RECAPTCHA_SITE_KEY=...
```

Then:

```bash
npm run build
```

The built files go to `dist/`. The build stops with an error if any key is missing, rather than shipping a form that can't send.

## ⚙️ Configuration

### Business Details

The phone number, email, Facebook URL, Google reviews link, service area, office address, opening hours and founding year live in **`src/config/business.js`**. Every page section, the link-preview tags and the search-engine data read from that file, so change them there only.

- Leaving `facebookUrl` empty hides the footer's Facebook button.
- While `hours` is `null`, the site and the search-engine data leave opening hours out.
- Setting `foundedYear` adds "since <year>" to the footer and the search-engine data.

Services are in **`src/config/services.js`** (the services section and the estimate form's choices) and reviews in **`src/config/reviews.js`**.

### Styling

- **Colors**: The brand palette comes from the Tru Lawns logo green and the gold of their old site. Brand colors are set once in `src/plugins/vuetify.js` (`primary` green `#166C46`, `secondary` deep green `#0F4A30`, `accent` gold `#F9AE29`, `cta` button green `#187A4F`). `src/styles/theme.css` maps them to `--color-*` variables and adds the grays and neutrals (`--color-gray-dark` charcoal `#2F3539` for the footer, `--color-background` light gray `#ECEFEF` for alternating sections, `--color-light` off-white, `--color-border`, …). Components use the variables or Vuetify classes (`primary--text`, `color="cta"`), never hex values. Use `accent` for borders, stars and indicators, or with dark text: gold text on white is only 1.9:1, below WCAG AA. Check that a new color keeps text at 4.5:1 contrast or more.
- **Photos**: Replace `src/assets/hero.jpg` (the wide photo behind the header and hero) or `src/assets/services.jpg` (the photo in the services section).
- **Icons**: Material Design Icons 7.4.47 from jsDelivr, pinned with an integrity hash in `public/index.html`. To change the version, update both the URL and the hash.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 600px
- **Tablet**: 600px - 960px (menu button instead of the navigation buttons)
- **Desktop**: > 960px

## ♿ Accessibility Features

- **Contrast**: Text and button colors chosen to meet WCAG AA (4.5:1 for normal text)
- **Large Text**: Most text is 20px or larger
- **Touch Targets**: Large buttons throughout
- **Screen Readers**: Labels on icon-only buttons and form fields, a titled map, and the current section marked in the navigation

## 🔧 Development

### Available Scripts

- `npm run serve` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Check code style (reports problems, changes nothing)
- `npm run lint:fix` - Fix the code-style problems that can be fixed automatically
- `npm run test:unit` - Run unit tests (`npm run test:watch` reruns them on changes)
- `npm run deploy` - Manual deploy to GitHub Pages (normally not needed, see [Deployment](#-deployment))

### Code Style

- **Vue 2 Options API**: Using data, methods, computed, mounted
- **Vuetify Components**: Proper component usage and theming
- **ESLint**: Standard style with Vue rules
- **Comments**: JSDoc comments on methods

## 📈 SEO Features

- **Meta Tags**: Title, description and canonical link
- **Link Previews**: Open Graph and Twitter tags with a 1200x630 preview image
- **Structured Data**: Schema.org LandscapingBusiness (name, phone, email, address, service area, hours), generated from `src/config/business.js` at build time
- **robots.txt and sitemap.xml**: Generated at build time from `siteUrl`
- **Performance**: Only the Vuetify components in use are bundled; the estimate form and map load after the page shows

## 🚀 Deployment

Pushing to `main` deploys the site. The GitHub Actions workflow (`.github/workflows/deploy.yml`) installs dependencies, runs lint and unit tests, builds, and publishes `dist/` to the `gh-pages` branch, which GitHub Pages serves at `nizar22.github.io/TruLawns-website/`.

The workflow reads the four form keys from repository variables (Settings > Secrets and variables > Actions > Variables), using the same names as in `.env`. They end up in the public JavaScript anyway, so they're variables rather than secrets.

**Custom domain**: To serve the site at `trulawnsfl.com`, add a `public/CNAME` file containing `trulawnsfl.com`, change `PUBLIC_PATH` in the workflow to `/`, and point the domain's DNS at GitHub Pages.

**Manual fallback**: `npm run deploy` builds on your machine (with the keys from `.env`) and publishes to `gh-pages`. It refuses to run with uncommitted changes, so what goes live always matches git. For the project-page address, run it with `PUBLIC_PATH=/TruLawns-website/` set.

## 🔍 Performance Optimization

- **Code Splitting**: Vue, Vuetify and app code in separate chunks for better caching; the estimate form in its own
- **Tree-shaking**: vuetify-loader bundles only the Vuetify components in use
- **Lazy Loading**: The map loads when it nears the screen
- **Minification**: JavaScript, CSS and HTML minified in production; `console.log` removed, errors kept

## 🐛 Troubleshooting

1. **Build stops with "Missing VUE_APP_…"**: Add the listed keys to `.env` (local builds) or the repository variables (GitHub Actions).

2. **Port already in use**:
   ```bash
   npm run serve -- --port 8081
   ```

3. **Dependencies issues**:
   ```bash
   rm -rf node_modules
   npm ci
   ```

## 📞 Contact

- **Email**: trulawnsfl@gmail.com
- **Phone**: (321) 549-7011

## 📄 License

This project is proprietary software for Tru Lawns.

## 🔄 Updates

To update the website:

1. **Update content** in `src/config/` (contact details, hours, services, reviews) or in the section components (text, photos)
2. **Test changes** with `npm run serve`, `npm run lint` and `npm run test:unit`
3. **Commit and push to `main`**; the site deploys automatically

---

*Professional lawn care in Palm Bay and Brevard County, Florida*
