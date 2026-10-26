<script>
import business from '@/config/business'
import { formatPhone, formatHours, splitEmail } from '@/utils/format'

export default {
  name: 'AppFooter',

  // Component data - reactive properties
  data: () => ({
    // Social media link
    facebookUrl: business.facebookUrl,

    // Business contact information for footer
    contact: {
      phone: business.phone,
      email: business.email,
      location: `${business.address.city}, ${business.address.state}`
    },

    // Opening days and hours, e.g. Monday - Friday / 8:00 AM - 5:00 PM (null until set in the config)
    hours: business.hours && {
      days: `${business.hours.days[0]} - ${business.hours.days[business.hours.days.length - 1]}`,
      times: formatHours(business.hours)
    },

    // Towns served, as one line
    serviceArea: business.serviceArea.join(' · '),

    // Year the business opened (null until set in the config)
    foundedYear: business.foundedYear
  }),

  computed: {
    /**
     * Gets current year dynamically
     * Updates automatically each year without code changes
     * Used in copyright notice
     * @returns {number} Current year (e.g., 2024)
     */
    currentYear () {
      return new Date().getFullYear()
    },

    /**
     * Formats phone number for display
     * Converts 3215497011 to (321) 549-7011
     * @returns {string} Formatted phone number
     */
    formattedPhone () {
      return formatPhone(this.contact.phone)
    },

    /**
     * Email split before the @ so it wraps cleanly on phones
     * @returns {string[]} [name, '@domain']
     */
    emailParts () {
      return splitEmail(this.contact.email)
    }
  }
}
</script>

<style scoped>
/*
  Scoped styles - only apply to this component
  Custom styling to enhance Vuetify defaults
*/

/*
  Footer background styling
  Charcoal gray, with a gold top edge
*/
.footer-section {
  background-color: var(--color-gray-dark) !important; /* Charcoal gray */
  border-top: 4px solid var(--color-accent);
  color: var(--color-light) !important;
  width: 100%;
  position: relative !important;
  bottom: 0;
}

/*
  All footer text in off-white (11.8:1 on the charcoal gray)
*/
.footer-section .white--text {
  color: var(--color-light) !important;
}

/*
  Contact icons in gold (6.6:1 on the charcoal gray)
*/
.footer-icon {
  color: var(--color-accent-on-dark) !important;
}

/*
  Footer link styling
  Off-white text; underlined on hover and keyboard focus
*/
.footer-link {
  color: var(--color-light) !important;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
}

/*
  Plain footer details (the location): laid out like the links,
  but no underline on hover since there's nothing to click
*/
.footer-info {
  color: var(--color-light);
  display: inline-flex;
  align-items: center;
}

.footer-link:hover span,
.footer-link:focus-visible span {
  text-decoration: underline;
  text-decoration-color: var(--color-accent);
  text-underline-offset: 4px;
}

/*
  Let long values (the email address) wrap onto a second line
  instead of pushing the page wider than a phone screen
*/
.footer-link span {
  min-width: 0;
  overflow-wrap: anywhere;
}

/*
  Social icon button styling
  Circular buttons with off-white icons
  Hover effect changes background
*/
.social-icon {
  background-color: transparent !important;
  border: 2px solid var(--color-light) !important;
  color: var(--color-light) !important;
}

/*
  Social icon hover effect
  Changes background to the button green
*/
.social-icon:hover {
  background-color: var(--color-button) !important; /* Button green */
  border-color: var(--color-button) !important;
}

/*
  Divider styling in footer
  White divider for visual separation
*/
.footer-divider {
  border-color: rgba(255, 255, 255, 0.3) !important;
}

/*
  RESPONSIVE DESIGN - Mobile adjustments
  Optimizes layout for smaller screens
*/

/* Mobile phones */
@media (max-width: 600px) {
  .footer-section {
    margin-top: 24px;
  }
}
</style>

<template>
  <!--
    FOOTER COMPONENT
    Bottom of page with copyright, links, and contact info
    Charcoal gray background for visual closure
  -->
  <v-footer
    class="footer-section py-8"
    padless
    dark
  >
    <v-container>
      <!--
        TOP SECTION
        Business info and quick links
      -->
      <v-row>
        <!--
          BUSINESS NAME AND TAGLINE
          Left column on desktop, centered on mobile
        -->
        <v-col
          cols="12"
          md="4"
          class="mb-6 mb-md-0"
        >
          <h3 class="text-h5 font-weight-bold mb-3 white--text">
            Tru Lawns
          </h3>
          <p class="text-h6 font-weight-bold white--text mb-3">
            Licensed &amp; Insured Lawn Care
          </p>
          <p class="text-body-1 white--text">
            Professional lawn care and landscape maintenance in Brevard County, Florida
          </p>
        </v-col>

        <!--
          QUICK CONTACT LINKS
          Center column on desktop
          Clickable phone and email links
        -->
        <v-col
          cols="12"
          md="4"
          class="mb-6 mb-md-0"
        >
          <h4 class="text-h6 font-weight-bold mb-3 white--text">
            Quick Contact
          </h4>

          <!-- Phone link -->
          <div class="mb-3">
            <a
              :href="'tel:' + contact.phone"
              class="footer-link"
            >
              <v-icon class="mr-2 footer-icon">mdi-phone</v-icon>
              <span class="text-h6">{{ formattedPhone }}</span>
            </a>
          </div>

          <!-- Email link -->
          <div class="mb-3">
            <a
              :href="'mailto:' + contact.email"
              class="footer-link"
            >
              <v-icon class="mr-2 footer-icon">mdi-email</v-icon>
              <span class="text-h6">{{ emailParts[0] }}<wbr>{{ emailParts[1] }}</span>
            </a>
          </div>

          <!-- Location -->
          <div>
            <div class="footer-info">
              <v-icon class="mr-2 footer-icon">mdi-map-marker</v-icon>
              <span class="text-h6">{{ contact.location }}</span>
            </div>
          </div>
        </v-col>

        <!--
          SERVICE AREA, HOURS AND SOCIAL MEDIA
          Right column on desktop
          Hours and the Facebook button appear once set in src/config/business.js
        -->
        <v-col
          cols="12"
          md="4"
        >
          <h4 class="text-h6 font-weight-bold mb-3 white--text">
            Service Area
          </h4>
          <p class="text-body-1 white--text mb-4">
            {{ serviceArea }}
          </p>

          <template v-if="hours">
            <h4 class="text-h6 font-weight-bold mb-3 white--text">
              Hours
            </h4>
            <p class="text-h6 white--text mb-1">
              {{ hours.days }}
            </p>
            <p class="text-h6 white--text mb-4">
              {{ hours.times }}
            </p>
          </template>

          <!-- Social media link -->
          <template v-if="facebookUrl">
            <h4 class="text-h6 font-weight-bold mb-3 white--text">
              Follow Us
            </h4>
            <v-btn
              :href="facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              icon
              x-large
              class="social-icon"
              color="white"
              aria-label="Tru Lawns on Facebook (opens in a new tab)"
            >
              <v-icon size="32">mdi-facebook</v-icon>
            </v-btn>
          </template>
        </v-col>
      </v-row>

      <!-- Divider between sections -->
      <v-divider class="footer-divider my-6"></v-divider>

      <!--
        BOTTOM SECTION
        Copyright and legal info
      -->
      <v-row>
        <v-col
          cols="12"
          md="6"
          class="text-center text-md-left"
        >
          <!--
            Copyright notice with dynamic year
            currentYear computed property automatically updates
          -->
          <p class="text-body-1 white--text mb-0">
            © {{ currentYear }} <strong>Tru Lawns</strong>. All rights reserved.
          </p>
        </v-col>

        <v-col
          cols="12"
          md="6"
          class="text-center text-md-right"
        >
          <!--
            Service area tagline
            "since <year>" appears once foundedYear is set in src/config/business.js
          -->
          <p class="text-body-1 white--text mb-0">
            Proudly serving Brevard County<template v-if="foundedYear"> since {{ foundedYear }}</template>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
