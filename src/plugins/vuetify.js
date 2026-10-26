import Vue from 'vue'
// Framework only: vuetify-loader adds the components each template uses,
// so the bundle carries just those components and their styles
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      // Expose theme colors as CSS variables (e.g. var(--v-accent-base)) for component styles
      customProperties: true
    },
    // Brand colors from the Tru Lawns logo (green #1E8C5B) and the gold of
    // their old site. These are the source values for the --color-* variables
    // in src/styles/theme.css; change a color here, not there.
    themes: {
      light: {
        // Primary color: a darker shade of the logo green, dark enough for
        // white text (6.4:1) and green headings on light backgrounds (6.1:1)
        primary: '#166C46',
        // Accent color: brand gold; borders, underlines, stars, the Free Estimate
        // button (with dark text, 9.5:1). Never text on white: only 1.9:1
        accent: '#F9AE29',
        // Call-to-action color: brand green for buttons with white text
        // (white text 5.3:1, WCAG AA)
        cta: '#187A4F',
        // Secondary color: deep green for the footer and dark panels
        secondary: '#0F4A30',
        // Success color: Green for positive feedback (white text 5.1:1)
        success: '#2E7D32',
        // Warning color: Amber for important notices
        warning: '#FF9800',
        // Error color: Red for errors and alerts (white text 5.6:1)
        error: '#C62828',
        // Info color: Blue for informational content
        info: '#2196F3'
      }
    }
  },
  // Configure icons
  icons: {
    iconfont: 'mdi'
  }
})
