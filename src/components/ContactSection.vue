<script>
import business from '@/config/business'
import { formatPhone, formatHours, splitEmail } from '@/utils/format'

export default {
  name: 'ContactSection',
  data: () => ({
    // Business contact information (edit in src/config/business.js)
    contact: {
      phone: business.phone,
      email: business.email,
      city: business.address.city
    },

    // Business hours - same hours on each open day; empty (card hidden) until set in business.js
    businessHours: business.hours
      ? business.hours.days.map(day => ({ day, hours: formatHours(business.hours) }))
      : [],

    // Social media link
    // Facebook page for the business; the button is hidden while it's empty
    facebookUrl: business.facebookUrl
  }),

  computed: {
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
    },

    /**
     * Office address as one line for the map search
     * @returns {string} e.g. 256 Wavecrest Ave NE, Palm Bay, FL 32907
     */
    mapQuery () {
      const { street, city, state, zip } = business.address
      return `${street}, ${city}, ${state} ${zip}`
    },

    /**
     * Gets the embedded Google Maps URL for the office location
     */
    mapEmbedUrl () {
      return `https://www.google.com/maps?q=${encodeURIComponent(this.mapQuery)}&output=embed`
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
  Contact section background
  White background for clean, professional look
*/
.contact-section {
  background-color: var(--color-white);
  margin-bottom: 64px; /* Add space for footer */
}

/*
  Contact info card styling
  White card with shadow and rounded corners
  Contains all contact information
*/
.contact-card {
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
}

/*
  Contact item styling
  Individual contact info items (phone, email, location)
  Large text and icons for senior-friendly design
*/
.contact-item {
  padding: 24px;
  border-radius: 12px;
  background-color: var(--color-background); /* Light neutral background */
  transition: all 0.3s ease;
  overflow-wrap: anywhere;
}

/*
  Contact item hover effect
  Only on the items that are links (Call Us, Email Us), so the
  location card doesn't look clickable
*/
a:hover .contact-item,
a:focus-visible .contact-item {
  background-color: var(--color-primary-tint); /* Faint green on hover */
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/*
  Hours card styling
  Separate card for business hours
  Consistent with other cards throughout site
*/
.hours-card {
  border-radius: 12px !important;
  border-left: 4px solid var(--color-primary);
  margin-bottom: 24px;
  height: auto !important; /* Ensure card expands to content */
  overflow: visible !important; /* Prevent content clipping */
}

/*
  Hours list item styling
  Each day/hours pair in the list
*/
.hours-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border); /* Light divider between items */
  height: auto !important;
}

/*
  Remove border from last item
  Cleaner look without bottom border on last day
*/
.hours-item:last-child {
  border-bottom: none;
}

/*
  Social media button styling
  Large, prominent button for Facebook link
*/
.social-btn {
  min-height: 60px !important;
  transition: all 0.3s ease;
}

/*
  Social button hover effect
  Scales up slightly on hover
*/
.social-btn:hover {
  transform: scale(1.05);
}

/*
  RESPONSIVE DESIGN - Mobile adjustments
  Optimizes layout for smaller screens
*/

/* Mobile phones */
@media (max-width: 600px) {
  /* Reduce padding on contact items for mobile */
  .contact-item {
    padding: 16px;
  }

  /* Stack hours more compactly on mobile */
  .hours-item {
    padding: 12px 0;
  }

  /* Ensure list items are fully visible */
  .v-list {
    max-height: none;
    overflow: visible;
  }

  .contact-section {
    margin-bottom: 0; /* Reduce bottom margin on mobile */
    padding-bottom: 24px !important; /* Add padding instead */
  }

  .hours-card {
    margin-bottom: 16px;
    padding: 16px !important;
  }

  .v-list-item {
    min-height: auto !important;
    padding: 8px 0 !important;
  }
}
</style>

<template>
  <!--
    CONTACT SECTION
    Displays business contact information and hours
    Final section before footer
  -->
  <v-container
    fluid
    class="contact-section py-16 pa-0 ma-0"
    style="min-height: auto !important; overflow: visible !important;"
  >
    <!--
      Main container with max width for readability
      Centers content on large screens
    -->
    <v-container>
      <!--
        SECTION HEADER
        Large, centered title to introduce contact section
      -->
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold primary--text mb-4 brand-underline">
            Contact Us
          </h2>
          <p class="text-h6 grey--text text--darken-2">
            Get in touch with <strong>Tru Lawns</strong>
          </p>
        </v-col>
      </v-row>

      <!--
        CONTACT INFORMATION GRID
        Three column layout on desktop, stacked on mobile
        Phone, Email, Location
      -->
      <v-row class="mb-12">
        <!--
          PHONE CONTACT
          Clickable tel: link opens phone dialer
          Large icon and text for visibility
        -->
        <v-col
          cols="12"
          md="4"
          class="mb-4 mb-md-0"
        >
          <a
            :href="'tel:' + contact.phone"
            class="text-decoration-none"
          >
            <div class="contact-item text-center">
              <v-icon
                color="primary"
                size="56"
                class="mb-4"
              >
                mdi-phone
              </v-icon>
              <h3 class="text-h5 font-weight-bold mb-2 primary--text">
                Call Us
              </h3>
              <p class="text-h6 grey--text text--darken-2 mb-0">
                {{ formattedPhone }}
              </p>
              <p class="text-body-1 grey--text text--darken-2 mt-2">
                Click to call
              </p>
            </div>
          </a>
        </v-col>

        <!--
          EMAIL CONTACT
          Clickable mailto: link opens email client
        -->
        <v-col
          cols="12"
          md="4"
          class="mb-4 mb-md-0"
        >
          <a
            :href="'mailto:' + contact.email"
            class="text-decoration-none"
          >
            <div class="contact-item text-center">
              <v-icon
                color="primary"
                size="56"
                class="mb-4"
              >
                mdi-email
              </v-icon>
              <h3 class="text-h5 font-weight-bold mb-2 primary--text">
                Email Us
              </h3>
              <p class="text-h6 grey--text text--darken-2 mb-0">
                {{ emailParts[0] }}<wbr>{{ emailParts[1] }}
              </p>
              <p class="text-body-1 grey--text text--darken-2 mt-2">
                Click to email
              </p>
            </div>
          </a>
        </v-col>

        <!--
          LOCATION
          Where TruLawns is based, with a map; crews come to the customer
        -->
        <v-col
          cols="12"
          md="4"
        >
          <div class="contact-item text-center">
            <v-icon
              color="primary"
              size="56"
              class="mb-4"
            >
              mdi-map-marker
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-2 primary--text">
              Based in {{ contact.city }}
            </h3>
            <p class="text-h6 grey--text text--darken-2 mb-0">
              We come to you
            </p>
            <p class="text-body-1 grey--text text--darken-2 mt-2">
              Serving Palm Bay, Melbourne and nearby communities
            </p>
            <!--
              Embedded map on all viewports
              title names the map for screen readers; loading="lazy" waits
              until it's near the screen before loading Google Maps
            -->
            <div class="mt-4">
              <iframe
                title="Map showing where Tru Lawns is based in Palm Bay"
                loading="lazy"
                width="100%"
                height="200"
                frameborder="0"
                style="border:0"
                :src="mapEmbedUrl"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </v-col>
      </v-row>

      <!--
        BUSINESS HOURS SECTION
        Displays operating hours for each open day
        Hidden until hours are set in src/config/business.js
      -->
      <v-row v-if="businessHours.length" justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="hours-card pa-6" elevation="4">
            <!-- Card header -->
            <div class="text-center mb-6">
              <v-icon
                color="primary"
                size="48"
                class="mb-3"
              >
                mdi-clock-outline
              </v-icon>
              <h3 class="text-h4 font-weight-bold primary--text">
                Business Hours
              </h3>
            </div>

            <!--
              Hours list
              Displays each day with corresponding hours
              v-for loops through businessHours array
            -->
            <v-list class="transparent">
              <v-list-item
                v-for="(schedule, index) in businessHours"
                :key="index"
                class="hours-item"
              >
                <v-list-item-content>
                  <v-row align="center">
                    <!-- Day name -->
                    <v-col cols="5" sm="4">
                      <span class="text-h6 font-weight-bold">
                        {{ schedule.day }}
                      </span>
                    </v-col>
                    <!-- Hours -->
                    <v-col cols="7" sm="8" class="text-right text-sm-left">
                      <span class="text-h6 grey--text text--darken-2">
                        {{ schedule.hours }}
                      </span>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <!--
        SOCIAL MEDIA SECTION
        Link to Facebook business page, shown once facebookUrl is set
      -->
      <v-row v-if="facebookUrl" justify="center" class="mt-12">
        <v-col cols="12" class="text-center">
          <h3 class="text-h5 font-weight-bold mb-4">
            Connect With Us
          </h3>
          <v-btn
            :href="facebookUrl"
            target="_blank"
            rel="noopener noreferrer"
            color="#1877F2"
            dark
            x-large
            class="social-btn px-8"
          >
            <v-icon left large>mdi-facebook</v-icon>
            <!-- Bold so the white text on Facebook blue counts as large text (WCAG AA) -->
            <span class="text-h6 font-weight-bold">Visit Us on Facebook</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
