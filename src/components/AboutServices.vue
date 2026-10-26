<script>
import business from '@/config/business'
import services from '@/config/services'

export default {
  name: 'AboutServices',

  // Component data - reactive properties
  data: () => ({
    // Services offered (edit in src/config/services.js; the estimate form uses the same list)
    // Each service has name, description, and Material Design icon
    servicesOffered: services,

    // Towns served, shown as chips on the service area card
    serviceArea: business.serviceArea,

    // Array of business benefits/value propositions
    // Highlights why customers should choose this business
    benefits: [
      {
        icon: 'mdi-shield-check',
        title: 'Licensed & Insured',
        description: 'A licensed and insured lawn care company rooted in Florida'
      },
      {
        icon: 'mdi-clock-check',
        title: 'Reliable & On Time',
        description: 'Reliability and consistency have been a priority since day one'
      },
      {
        icon: 'mdi-account-group',
        title: 'Professional Crews',
        description: 'Uniformed, professional crews running up-to-date equipment'
      },
      {
        icon: 'mdi-message-text',
        title: 'Clear Communication',
        description: 'We keep you posted on schedules and anything we notice on your property'
      }
    ]
  })
}
</script>

<style scoped>
/*
  Scoped styles - only apply to this component
  Custom styling to enhance Vuetify defaults
*/

/*
  Services section background
  Light gray creates visual separation from hero section
  Provides contrast for white cards
*/
.services-section {
  background-color: var(--color-background); /* Light neutral background */
}

/*
  Service image card styling
  Adds rounded corners and shadow for modern look
*/
.service-image-card {
  border-radius: 12px !important; /* Rounded corners */
  overflow: hidden; /* Ensures image respects border radius */
}

/*
  Services list styling
  Removes default list styling for cleaner look
*/
.services-list {
  background: transparent !important;
}

/*
  Individual service item styling
  Adds background and padding for card-like appearance
  No hover effect: the items are information, not links
*/
.service-item {
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 16px !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle shadow */
}

/*
  Show the full service name and description
  Vuetify's list items cut text to one line with "…", which hides what's
  offered on phones (and the items can't be tapped to see the rest)
*/
.service-item ::v-deep .v-list-item__title,
.service-item ::v-deep .v-list-item__subtitle {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  line-height: 1.4;
}

/*
  Info card styling
  White cards with rounded corners and consistent spacing
  Equal height ensures aligned grid
  No hover effect: the cards are information, not links
*/
.info-card {
  border-radius: 12px !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/*
  Benefit item styling
  Centers content and adds consistent spacing
*/
.benefit-item {
  padding: 20px;
  text-align: center;
}

/* Town chips on the service area card: light green with dark green text (7.6:1) */
.area-chip {
  background-color: var(--color-primary-tint) !important;
  color: var(--color-primary-dark) !important;
  font-size: 1rem !important;
  font-weight: 500;
}

/*
  RESPONSIVE DESIGN - Mobile adjustments
  Optimizes layout and spacing for smaller screens
*/

/* Tablets and smaller */
@media (max-width: 960px) {
  /* Add spacing between stacked columns */
  .order-1 {
    margin-bottom: 32px;
  }
}

/* Mobile phones */
@media (max-width: 600px) {
  /* Reduce service item padding on mobile */
  .service-item {
    padding: 12px !important;
  }

  /* Reduce icon sizes on mobile for better fit */
  .service-item .v-icon {
    font-size: 32px !important;
  }

  /* Stack info cards with spacing */
  .info-card {
    margin-bottom: 16px;
  }

  /* Reduce benefit item padding on mobile */
  .benefit-item {
    padding: 12px;
  }
}
</style>

<template>
  <!--
    ABOUT/SERVICES SECTION
    Displays services offered, service area, and business information
    Uses alternating light gray background for visual separation
  -->
  <v-container
    fluid
    class="services-section py-16"
  >
    <!--
      Main container with max width for readability
      Centers content on large screens
    -->
    <v-container>
      <!--
        SECTION HEADER
        Large, centered title to introduce the services section
      -->
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold primary--text mb-4 brand-underline">
            Our Services
          </h2>
          <p class="text-h6 grey--text text--darken-2">
            Professional Lawn Care and Landscape Maintenance in Palm Bay and Brevard County, FL
          </p>
        </v-col>
      </v-row>

      <!--
        CONTENT ROW - Two column layout on desktop, stacked on mobile
        Left: Service image
        Right: Service list and details
      -->
      <v-row align="center" class="mb-8">
        <!--
          SERVICE IMAGE COLUMN
          A front yard TruLawns maintains: fresh mulch, trimmed shrubs, striped lawn
          order-2 on mobile puts image below text for better flow
          Shown whole at its own 4:3 aspect ratio on every screen size
        -->
        <v-col
          cols="12"
          md="5"
          class="order-md-1 order-2"
        >
          <v-card elevation="8" class="service-image-card">
            <v-img
              src="@/assets/gallery/palm-front-yard.jpg"
              alt="Freshly mowed front lawn with mulched beds and trimmed palms"
              :aspect-ratio="4 / 3"
            >
              <!--
                Loading spinner shown until the photo has loaded
              -->
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>

        <!--
          SERVICES LIST COLUMN
          Lists all lawn and landscape services
          order-1 on mobile puts text above image
        -->
        <v-col
          cols="12"
          md="7"
          class="order-md-2 order-1"
        >
          <!--
            Services list with icons
            Each service type gets an icon and description
            Large text for senior-friendly readability
          -->
          <v-list class="services-list transparent">
            <!--
              Individual service items
              v-for loops through servicesOffered array
              Each item has icon, title, and is clickable for expansion
            -->
            <v-list-item
              v-for="(service, index) in servicesOffered"
              :key="index"
              class="mb-4 service-item"
            >
              <!-- Icon for each service type -->
              <v-list-item-icon class="mr-4">
                <v-icon
                  color="primary"
                  size="40"
                >
                  {{ service.icon }}
                </v-icon>
              </v-list-item-icon>

              <!-- Service name and description -->
              <v-list-item-content>
                <v-list-item-title class="text-h5 font-weight-bold mb-2">
                  {{ service.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-h6 grey--text text--darken-2">
                  {{ service.description }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <!--
        BUSINESS DETAILS SECTION
        Three column layout with key business information
        Service type, location, and availability
      -->
      <v-row justify="center" class="mt-12">
        <!--
          INFO CARDS - Three cards with business details
          Each card uses v-card for elevation and styling
          Icons make information scannable for senior users
        -->

        <!-- RESIDENTIAL & COMMERCIAL CARD -->
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="info-card pa-6 text-center"
            elevation="4"
            height="100%"
          >
            <v-icon
              color="primary"
              size="64"
              class="mb-4"
            >
              mdi-home-city
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3 primary--text">
              Residential &amp; Commercial
            </h3>
            <p class="text-h6 grey--text text--darken-2">
              Lawn care for homes and business properties across Brevard County
            </p>
          </v-card>
        </v-col>

        <!-- SERVICE AREA CARD -->
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="info-card pa-6 text-center"
            elevation="4"
            height="100%"
          >
            <v-icon
              color="primary"
              size="64"
              class="mb-4"
            >
              mdi-map-marker-radius
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3 primary--text">
              Service Area
            </h3>
            <div class="d-flex flex-wrap justify-center">
              <v-chip
                v-for="town in serviceArea"
                :key="town"
                class="area-chip ma-1"
              >
                {{ town }}
              </v-chip>
            </div>
          </v-card>
        </v-col>

        <!-- FREE ESTIMATES CARD -->
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="info-card pa-6 text-center"
            elevation="4"
            height="100%"
          >
            <v-icon
              color="primary"
              size="64"
              class="mb-4"
            >
              mdi-clipboard-check
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3 primary--text">
              Free Estimates
            </h3>
            <p class="text-h6 grey--text text--darken-2">
              Tell us about your property and we'll get back to you with a free estimate
            </p>
          </v-card>
        </v-col>
      </v-row>

      <!--
        WHY CHOOSE US SECTION
        Highlights business strengths and value proposition
        Builds trust with potential customers
      -->
      <v-row justify="center" class="mt-16">
        <v-col cols="12" md="10" lg="8" class="text-center">
          <h3 class="text-h4 font-weight-bold primary--text mb-6">
            Why Choose Tru Lawns?
          </h3>

          <!--
            Benefits/Features Grid
            2 column layout on tablet+, single column on mobile
          -->
          <v-row class="mt-8">
            <!--
              Individual benefit items
              v-for loops through benefits array
              Each has an icon and description
            -->
            <v-col
              v-for="(benefit, index) in benefits"
              :key="index"
              cols="12"
              sm="6"
              class="mb-6"
            >
              <div class="benefit-item">
                <v-icon
                  color="primary"
                  size="48"
                  class="mb-3"
                >
                  {{ benefit.icon }}
                </v-icon>
                <h4 class="text-h5 font-weight-bold mb-2">
                  {{ benefit.title }}
                </h4>
                <p class="text-h6 grey--text text--darken-2">
                  {{ benefit.description }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
