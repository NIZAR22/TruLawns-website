<script>
import business from '@/config/business'
import { formatPhone } from '@/utils/format'

export default {
  name: 'HeroSection',

  // Component data - reactive properties
  data: () => ({
    // Business phone number
    phoneNumber: business.phone
  }),

  // Computed properties - derived reactive data
  computed: {
    /**
     * Formats phone number for display
     * Converts 3215497011 to (321) 549-7011
     * Makes number more readable and professional
     * @returns {string} Formatted phone number
     */
    formattedPhoneNumber () {
      return formatPhone(this.phoneNumber)
    }
  },

  methods: {
    /**
     * Emits event to parent component (App.vue) to scroll to the estimate form
     * Using emit pattern keeps components decoupled and reusable
     * Parent handles the actual scrolling logic
     */
    scrollToEstimate () {
      this.$emit('scroll-to', 'estimate')
    }
  }
}
</script>

<style scoped>
/*
  Scoped styles - only apply to this component
  Hero section requires custom styling beyond Vuetify defaults
*/

/*
  Hero container - full viewport height
  Creates dramatic first impression
  Ensures hero takes up entire screen on load
*/
.hero-container {
  min-height: 100vh; /* Minimum 100% of viewport height */
  position: relative; /* Needed for absolute positioning of children */
  overflow: hidden; /* Prevents content overflow */
}

/*
  Background image container
  Holds the hero background image with overlay
  Uses background-image for easy replacement
*/
.hero-background {
  /*
    Background image - a front lawn TruLawns maintains
    Served from src/assets (also used by the navbar in App.vue);
    replace hero.jpg with your own wide photo to change it
  */
  background-image: url('~@/assets/hero.jpg');

  /* Background image settings for optimal display */
  background-size: cover; /* Scale to cover entire container */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Don't repeat image */
  background-attachment: fixed; /* Parallax effect on scroll (optional) */

  /* Make background fill entire container */
  min-height: 100vh;
  width: 100%;

  /* Position for overlay */
  position: relative;

  /* Flexbox for vertical centering of content */
  display: flex;
  align-items: center;
  justify-content: center;
}

/*
  Dark overlay on background image
  Ensures white text is readable
  Semi-transparent deep green layer
*/
.hero-overlay {
  position: absolute; /* Position over background */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(8, 38, 24, 0.66); /* Very dark green tint, keeps white text readable */
  z-index: 1; /* Layer above background, below content */
}

/*
  Content container positioning
  Ensures content appears above overlay
  Centers content vertically and horizontally
*/
.hero-content {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 88px; /* 64px navbar + 24px breathing room */
}

/* Phones and tablets: the navbar is 56px there */
@media (max-width: 960px) {
  .hero-content {
    padding-top: 80px; /* 56px navbar + 24px breathing room */
  }
}

/*
  Hero title styling
  Extra large, bold text for maximum impact
  Text shadow improves readability on image background
*/
.hero-title {
  font-size: 3.5rem !important; /* 56px - very large for visibility */
  line-height: 1.2 !important;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8); /* Strong shadow for readability */
  letter-spacing: 0.5px;
}

/*
  Tagline styling
  Key message - needs to be clearly readable
*/
.hero-tagline {
  font-size: 1.75rem !important; /* 28px */
  line-height: 1.4 !important;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  font-weight: 400 !important;
}

/*
  Subtext styling
  Supporting information
*/
.hero-subtext {
  font-size: 1.5rem !important; /* 24px */
  line-height: 1.5 !important;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  font-weight: 300 !important;
  opacity: 0.95;
}

/*
  Logo
  The light version of the logo (off-white with the gold sun) sits straight
  on the dark green overlay; the shadow keeps it crisp over brighter spots
  in the photo
*/
.hero-logo {
  display: inline-block;
  width: 100%;
  max-width: 460px;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5));
}

/*
  CTA button customization
  Makes buttons extra prominent and clickable
*/
.hero-cta-btn {
  min-height: 70px !important; /* Tall buttons for easy clicking */
  font-size: 1.25rem !important; /* 20px */
  letter-spacing: 0.5px;
  transition: all 0.3s ease; /* Smooth hover animation */
}

/*
  Button hover effect
  Provides visual feedback on interaction
  Transform scales button slightly larger
*/
.hero-cta-btn:hover {
  transform: translateY(-3px); /* Lift effect */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important; /* Stronger shadow */
}

/* Dark text on the gold Free Estimate button (9.5:1; white on gold is only 1.9:1) */
.hero-estimate-btn {
  color: var(--color-dark) !important;
}

/*
  Bounce animation for scroll indicator
  Draws attention to arrow, suggests scrolling
*/
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.bounce {
  animation: bounce 2s infinite; /* Continuous gentle bounce */
}

/*
  RESPONSIVE DESIGN - Mobile adjustments
  Reduces text sizes on smaller screens for better fit
  Maintains readability while preventing overflow
*/

/* Tablets and smaller */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.75rem !important; /* 44px */
  }

  .hero-tagline {
    font-size: 1.5rem !important; /* 24px */
  }

  .hero-subtext {
    font-size: 1.25rem !important; /* 20px */
  }

  .hero-cta-btn {
    min-height: 65px !important;
  }
}

/* Mobile phones */
@media (max-width: 600px) {
  .hero-title {
    font-size: 2.25rem !important; /* 36px */
  }

  .hero-tagline {
    font-size: 1.25rem !important; /* 20px */
  }

  .hero-subtext {
    font-size: 1.125rem !important; /* 18px */
  }

  /* Smaller logo on phones */
  .hero-logo {
    max-width: 320px;
  }

  /* Stack buttons vertically on mobile with spacing */
  .hero-cta-btn {
    min-height: 60px !important;
    margin-bottom: 16px;
  }

  /* Disable parallax effect on mobile for better performance */
  .hero-background {
    background-attachment: scroll;
  }
}

/* Extra small phones */
@media (max-width: 400px) {
  .hero-title {
    font-size: 1.875rem !important; /* 30px */
  }
}
</style>

<template>
  <!--
    HERO SECTION - First thing visitors see
    Full viewport height with background image
    Contains business name, tagline, and main call-to-action buttons
  -->
  <v-container
    fluid
    class="hero-container pa-0 ma-0"
  >
    <!--
      Overlay div for background image and dark overlay
      Creates contrast for white text to be readable
      Uses CSS background-image for easy replacement
    -->
    <div class="hero-background">
      <!--
        Dark overlay to ensure text readability
        Semi-transparent deep green layer over background image
      -->
      <div class="hero-overlay"></div>

      <!--
        Content container - centered vertically and horizontally
        v-container with max-width keeps content readable on large screens
      -->
      <v-container class="hero-content">
        <v-row
          align="center"
          justify="center"
          class="fill-height"
        >
          <v-col
            cols="12"
            md="10"
            lg="8"
            class="text-center"
          >
            <!--
              BUSINESS LOGO
              The light version of the Tru Lawns Turf and Landscape logo for brand recognition
              Uses contain to preserve aspect ratio
            -->
            <div class="hero-logo mb-8">
              <v-img
                src="@/assets/logo-light.png"
                alt="Tru Lawns Turf and Landscape"
                contain
                :aspect-ratio="800 / 235"
              />
            </div>

            <!--
              MAIN HEADING
              What the business does and where, for visitors and search engines
              white--text ensures readability on dark background
            -->
            <h1 class="text-h2 font-weight-bold white--text mb-6 hero-title">
              Expert Lawn Care in Palm Bay, FL
            </h1>

            <!--
              TAGLINE
              Communicates value proposition and builds trust
              mb-8 adds larger spacing before the benefits line
            -->
            <p class="text-h5 white--text mb-8 hero-tagline">
              From precision mowing to full landscape maintenance, Tru Lawns delivers
              professional lawn care with results and consistency you can trust.
            </p>

            <!--
              Subtext with key benefits
              Reinforces trust and convenience
              mb-10 adds extra spacing before CTA buttons
            -->
            <p class="text-h6 white--text mb-10 hero-subtext">
              Licensed &amp; Insured • Residential &amp; Commercial • Free Estimates
            </p>

            <!--
              CALL-TO-ACTION BUTTONS
              Two main actions: Free Estimate and Call Now
              Large buttons with high contrast colors for visibility
            -->
            <v-row
              justify="center"
              class="mt-8"
            >
              <!--
                FREE ESTIMATE BUTTON
                Gold with dark text so it stands out from the green page
                @click emits event to parent (App.vue) to scroll to the form
              -->
              <v-col
                cols="12"
                sm="6"
                md="5"
                lg="4"
                class="px-2"
              >
                <v-btn
                  color="accent"
                  x-large
                  block
                  depressed
                  @click="scrollToEstimate"
                  class="hero-cta-btn hero-estimate-btn py-7"
                  elevation="4"
                >
                  <v-icon left large>mdi-clipboard-text-outline</v-icon>
                  <span class="text-h6 font-weight-bold">Free Estimate</span>
                </v-btn>
              </v-col>

              <!--
                CALL NOW BUTTON
                Direct phone call
                href with tel: link opens phone dialer on mobile
              -->
              <v-col
                cols="12"
                sm="6"
                md="5"
                lg="4"
                class="px-2"
              >
                <v-btn
                  color="cta"
                  x-large
                  block
                  depressed
                  :href="'tel:' + phoneNumber"
                  class="hero-cta-btn py-7"
                  elevation="4"
                >
                  <v-icon left large>mdi-phone</v-icon>
                  <span class="text-h6 font-weight-bold">Call Now</span>
                </v-btn>
              </v-col>
            </v-row>

            <!--
              PHONE NUMBER DISPLAY
              Shows phone number prominently for easy reference
              Even if user doesn't click button, they can see number
              Especially helpful for desktop users
            -->
            <div class="mt-8">
              <p class="text-h5 white--text font-weight-medium">
                <v-icon color="white" large class="mr-2">mdi-phone</v-icon>
                {{ formattedPhoneNumber }}
              </p>
            </div>

            <!--
              SCROLL DOWN INDICATOR
              Animated arrow suggests there's more content below
              Improves user experience by indicating scrollable content
              Hidden on mobile to save space
            -->
            <div class="mt-2 hidden-sm-and-down" style="pointer-events: none;">
              <v-icon
                color="white"
                x-large
                class="bounce"
              >
                mdi-chevron-down
              </v-icon>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>
