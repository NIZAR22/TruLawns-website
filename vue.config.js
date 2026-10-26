const { defineConfig } = require('@vue/cli-service')
const business = require('./src/config/business')
const { formatPhone, formatHours } = require('./src/utils/format')

/**
 * Vue CLI configuration for the Tru Lawns website
 * Optimized for production deployment with performance and SEO considerations
 */

// The estimate form needs these at build time: from .env for local builds,
// from repository variables in GitHub Actions. A production build without them
// would ship a form that can't send, so stop the build instead.
const requiredEnv = [
  'VUE_APP_EMAILJS_PUBLIC_KEY',
  'VUE_APP_EMAILJS_SERVICE_ID',
  'VUE_APP_EMAILJS_TEMPLATE_ID',
  'VUE_APP_RECAPTCHA_SITE_KEY'
]
if (process.env.NODE_ENV === 'production') {
  const missing = requiredEnv.filter(name => !process.env[name])
  if (missing.length) {
    throw new Error(`Missing ${missing.join(', ')}. Add them to .env (local builds) or the repository variables (GitHub Actions).`)
  }
}

/**
 * Schema.org LocalBusiness data for search engines, built from the business
 * config and inserted into public/index.html
 * @returns {string} JSON for the <script type="application/ld+json"> block
 */
function structuredData () {
  const { phone, address, hours } = business
  const data = {
    '@context': 'https://schema.org',
    // LandscapingBusiness is the LocalBusiness type for lawn care companies
    '@type': 'LandscapingBusiness',
    name: business.legalName,
    url: `${business.siteUrl}/`,
    image: `${business.siteUrl}/og-image.png`,
    telephone: `+1-${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: 'US'
    },
    areaServed: business.serviceArea.map(town => ({
      '@type': 'City',
      name: `${town}, ${address.state}`
    })),
    sameAs: [business.facebookUrl, business.googleReviewsUrl].filter(Boolean)
  }
  if (hours) {
    data.openingHoursSpecification = [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.days,
      opens: hours.open,
      closes: hours.close
    }]
  }
  if (business.foundedYear) {
    data.foundingDate = String(business.foundedYear)
  }
  // Escape "<" so no value can close the <script> tag early
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

/**
 * Business details for the <noscript> fallback in public/index.html,
 * shown to visitors and crawlers that don't run JavaScript
 */
const noscriptDetails = {
  phone: formatPhone(business.phone),
  address: `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`,
  serviceArea: business.serviceArea.join(', '),
  hours: business.hours
    ? `Open ${business.hours.days.join(', ')}, ${formatHours(business.hours)}`
    : ''
}

/**
 * Webpack plugin that writes robots.txt and sitemap.xml into the build,
 * using the site address from the business config
 */
class SearchEngineFilesPlugin {
  apply (compiler) {
    const { RawSource } = compiler.webpack.sources
    compiler.hooks.thisCompilation.tap('SearchEngineFilesPlugin', compilation => {
      compilation.hooks.processAssets.tap(
        { name: 'SearchEngineFilesPlugin', stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL },
        () => {
          const home = `${business.siteUrl}/`
          compilation.emitAsset('robots.txt', new RawSource(
            `User-agent: *\nAllow: /\n\nSitemap: ${business.siteUrl}/sitemap.xml\n`
          ))
          compilation.emitAsset('sitemap.xml', new RawSource(
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            `  <url>\n    <loc>${home}</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n  </url>\n` +
            '</urlset>\n'
          ))
        }
      )
    })
  }
}

module.exports = defineConfig({
  // Production build configuration
  // The site is served from a sub-folder on GitHub Pages
  // (nizar22.github.io/TruLawns-website/) until the custom domain is set up;
  // the deploy workflow sets PUBLIC_PATH, local builds default to /
  publicPath: process.env.PUBLIC_PATH || '/',

  // Output directory for production build
  outputDir: 'dist',

  // Assets directory
  assetsDir: 'assets',

  // Enable source maps for debugging (disabled in production for security)
  productionSourceMap: false,

  // Configure webpack for optimization
  configureWebpack: {
    // Performance optimizations
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 6,
        cacheGroups: {
          vuetify: {
            name: 'chunk-vuetify',
            test: /[\\/]node_modules[\\/]vuetify[\\/]/,
            priority: 20,
            chunks: 'initial'
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      }
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },

    // robots.txt and sitemap.xml for search engines
    plugins: [new SearchEngineFilesPlugin()]
  },

  // Development server configuration
  devServer: {
    // Host configuration
    host: 'localhost',
    port: 8080,

    // Open browser automatically
    open: true
  },

  // Chain webpack for additional optimizations
  chainWebpack: config => {
    // HTML optimization
    config.plugin('html').tap(args => {
      // Values public/index.html reads as htmlWebpackPlugin.options.*
      args[0].business = business
      args[0].structuredData = structuredData()
      args[0].noscriptDetails = noscriptDetails

      args[0].minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      }
      return args
    })

    // Performance optimizations
    if (process.env.NODE_ENV === 'production') {
      // Strip console.log/info/debug in production but keep console.error and console.warn,
      // so unexpected errors still leave a trace in the browser console
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.pure_funcs = ['console.log', 'console.info', 'console.debug']
        return args
      })
    }
  }
})
