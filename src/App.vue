<script>
// Import all section components
// These will be rendered in order in the template above
import HeroSection from './components/HeroSection.vue'
import AboutServices from './components/AboutServices.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/Footer.vue'
import business from './config/business'
import { formatPhone } from './utils/format'

export default {
  name: 'App',

  // Register imported components so they can be used in template
  // The estimate form loads in its own file after the page shows: it's
  // further down and brings the form components
  components: {
    HeroSection,
    AboutServices,
    ReviewsSection,
    EstimateForm: () => import('./components/EstimateForm.vue'),
    ContactSection,
    AppFooter
  },

  // Component data - reactive properties
  data: () => ({
    // Controls mobile navigation drawer open/closed state
    drawer: false,

    // Tracks which section is currently visible in viewport
    // Used to highlight active navigation item
    activeSection: 'hero',

    // Business phone number for floating call button
    phoneNumber: business.phone,

    // Navigation items for mobile drawer
    // Each item maps to a section id
    navItems: [
      {
        id: 'hero',
        title: 'Home',
        icon: 'mdi-home'
      },
      {
        id: 'services',
        title: 'Services',
        icon: 'mdi-mower'
      },
      {
        id: 'reviews',
        title: 'Reviews',
        icon: 'mdi-star'
      },
      {
        id: 'estimate',
        title: 'Free Estimate',
        icon: 'mdi-clipboard-text-outline'
      },
      {
        id: 'contact',
        title: 'Contact',
        icon: 'mdi-phone'
      }
    ]
  }),

  computed: {
    /**
     * Phones and tablets (below 960px) get the menu button instead of the
     * row of navigation buttons, which doesn't fit next to the business name
     * Vuetify's breakpoint service keeps this up to date on resize
     * @returns {boolean} True below 960px
     */
    isMobile () {
      return this.$vuetify.breakpoint.smAndDown
    },

    /**
     * Screen reader label for the icon-only call button
     * @returns {string} e.g. Call us at (321) 549-7011
     */
    callLabel () {
      return `Call us at ${formatPhone(this.phoneNumber)}`
    },

    /**
     * The floating call button hides over the estimate and contact sections:
     * both show the phone number with their own call button, and on phones
     * it covered the form's submit button
     * @returns {boolean} True when the floating call button should show
     */
    showFloatingCall () {
      return !['estimate', 'contact'].includes(this.activeSection)
    }
  },

  // Lifecycle hook - runs after component is mounted to DOM
  mounted () {
    // Scroll listener tracks active section
    window.addEventListener('scroll', this.onScroll)

    // Initial check for active section on page load
    this.onScroll()
  },

  // Lifecycle hook - runs before component is destroyed
  beforeDestroy () {
    // Remove scroll listener to prevent memory leaks
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    /**
     * Smooth scroll to a specific section
     * @param {string} sectionId - The id of the section to scroll to
     */
    scrollToSection (sectionId) {
      // Find the target section element by id
      const element = document.getElementById(sectionId)

      if (element) {
        // Get navbar height to offset scroll position
        // This prevents the navbar from covering the section title
        // (64px on desktop, 56px on phones and tablets)
        const navbarHeight = document.querySelector('.v-app-bar').offsetHeight

        // Calculate exact scroll position
        // getBoundingClientRect gives position relative to viewport
        // window.pageYOffset adds current scroll position
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset

        // Subtract navbar height plus extra padding (20px) for breathing room
        const offsetPosition = elementPosition - navbarHeight - 20

        // Perform smooth scroll animation, unless the visitor asked for less motion
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({
          top: offsetPosition,
          behavior: reduceMotion ? 'auto' : 'smooth'
        })
      }
    },

    /**
     * Scroll to section from mobile drawer
     * Same as scrollToSection but also closes the drawer
     * @param {string} sectionId - The id of the section to scroll to
     */
    scrollToSectionMobile (sectionId) {
      // Close the mobile drawer first
      this.drawer = false

      // Small delay to let drawer close animation complete
      // This creates smoother user experience
      setTimeout(() => {
        this.scrollToSection(sectionId)
      }, 300) // 300ms matches Vuetify's drawer animation duration
    },

    /**
     * Scroll event handler - updates active section indicator
     * Tracks which section is currently in viewport
     */
    onScroll () {
      // Get all section elements
      const sections = document.querySelectorAll('section[id]')

      // Current scroll position plus offset for navbar
      // (navbar height plus the 20px breathing room scrollToSection leaves, plus a little slack)
      const scrollPosition = window.scrollY + 100

      // Loop through sections to find which one is currently visible
      sections.forEach(section => {
        // Get section's position and height
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute('id')

        // Check if current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Update active section for navigation highlighting
          this.activeSection = sectionId
        }
      })
    }
  }
}
</script>

<style scoped>
/*
  Scoped styles - only apply to this component
  Additional styling to enhance Vuetify's defaults
*/

/*
  Fix for mobile viewport - ensure full width content
  Remove default Vuetify container padding on mobile
*/
::v-deep .v-application {
  overflow-x: hidden; /* Prevent horizontal scroll */
}

::v-deep .v-main {
  padding: 0 !important; /* Remove default padding */
}

::v-deep section {
  width: 100%;
  overflow-x: hidden; /* Prevent horizontal overflow */
}

/*
  Navbar text: off-white on the deep green bar
*/
.v-app-bar .v-btn,
.v-toolbar__title {
  color: var(--color-light) !important;
}

/*
  Active navigation button styling
  Makes it obvious which section user is currently viewing
  Bold off-white text with a gold underline (the bold weight and
  underline mark it too, not just the color)
*/
.nav-active {
  font-weight: 700 !important;
  box-shadow: inset 0 -3px 0 var(--color-accent) !important;
}

/*
  Floating call button positioning and animation
  Ensures it doesn't overlap with content on mobile
*/
.floating-call-btn {
  /* Bottom offset increased on mobile to avoid gesture areas */
  margin-bottom: 16px !important;
  margin-right: 16px !important;

  /* Pulse animation to draw attention */
  animation: pulse 2s infinite;
}

/*
  Pulse animation keyframes
  Creates subtle pulsing effect to draw eye to call button
  Color is the call-to-action green (--color-button, #187A4F) with transparency
*/
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(24, 122, 79, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(24, 122, 79, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(24, 122, 79, 0);
  }
}

/*
  Section spacing
  Keeps section headings clear of the fixed navbar when jumping to them
*/
section {
  scroll-margin-top: 84px; /* 64px navbar + 20px breathing room */
}

/*
  Navigation button hover effects
  Provides visual feedback on interaction: a faint gold glow
*/
.v-btn--text:hover {
  background-color: rgba(249, 174, 41, 0.18) !important;
}

/*
  Ensure logo and title are vertically centered in the navbar
*/
.v-toolbar__title {
  display: flex !important;
  align-items: center !important;
}

/*
  Mobile-specific adjustments
  Increases touch targets and spacing on small screens
*/
@media (max-width: 960px) {
  .floating-call-btn {
    margin-bottom: 80px !important; /* More clearance on mobile */
  }

  section {
    scroll-margin-top: 76px; /* 56px mobile navbar + 20px breathing room */
  }
}

/*
  Smooth transitions for all interactive elements
  Improves perceived performance and user experience
*/
.v-btn {
  transition: all 0.3s ease !important;
}
</style>

<template>
  <!--
    v-app: Root Vuetify component - required wrapper for all Vuetify apps
    Provides theme context and app-level functionality
  -->
  <v-app>
    <!--
      NAVIGATION BAR - Sticky header with background image
      app prop makes it part of v-app layout system (affects v-main padding)
      fixed keeps navbar always visible at top, at one height the whole time
      (64px on desktop, 56px on phones and tablets)
      src provides background image for the navbar
      color provides fallback color while the image loads
    -->
    <v-app-bar
      app
      fixed
      color="primary"
      dark
      src="@/assets/hero.jpg"
    >
      <!--
        Custom gradient overlay on navbar background image
        Creates professional look and ensures text readability
        v-slot:img gives us access to the image props
      -->
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(15, 74, 48, .95), rgba(22, 108, 70, .95)"
        ></v-img>
      </template>

      <!--
        MOBILE MENU BUTTON - Shows when navigation buttons would be too crowded
        Opens navigation drawer when clicked
        Shows below 960px (phones and tablets)
      -->
      <v-app-bar-nav-icon
        v-if="isMobile"
        @click="drawer = !drawer"
        large
        aria-label="Open menu"
      ></v-app-bar-nav-icon>

      <!-- LOGO AND BUSINESS NAME - Always visible -->
      <v-toolbar-title class="d-flex align-center pa-0" style="cursor: pointer;" @click="scrollToSection('hero')">
        <v-img
          src="@/assets/logo-mark.png"
          alt=""
          contain
          height="40"
          width="40"
          class="mx-2"
        />
        <div class="d-flex flex-column business-name">
          <div class="text-subtitle-2 font-weight-bold text-uppercase">Tru Lawns</div>
          <div class="text-caption font-weight-bold text-uppercase">Lawn Care · Palm Bay</div>
        </div>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!--
        DESKTOP NAVIGATION - Shows at 960px and wider
        Large clickable buttons for each section
        Hidden on smaller screens to prevent crowding
        aria-current tells screen readers which section is on screen
      -->
      <div v-if="!isMobile" class="d-flex align-center">
        <v-btn
          v-for="item in navItems"
          :key="item.id"
          text
          large
          @click="scrollToSection(item.id)"
          :class="{ 'nav-active': activeSection === item.id }"
          :aria-current="activeSection === item.id ? 'location' : null"
          class="mx-1"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </div>
    </v-app-bar>

    <!--
      MOBILE NAVIGATION DRAWER - Slides in from LEFT on mobile/tablet
      v-model syncs with drawer data property
      app prop integrates with v-app layout
      temporary closes when user clicks outside or selects item
      left positions drawer on LEFT side of screen (changed from right)
    -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      left
      width="280"
    >
      <!--
        Drawer header with business name and close button
        Uses primary color for consistency
      -->
      <v-list-item class="primary white--text px-4 py-3">
        <v-list-item-content>
          <v-list-item-title class="text-h6 font-weight-bold">
            Tru Lawns
          </v-list-item-title>
          <v-list-item-subtitle class="white--text font-weight-bold">
            Lawn Care · Palm Bay
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            icon
            @click="drawer = false"
            color="white"
            aria-label="Close menu"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider></v-divider>

      <!--
        Mobile navigation list
        Each item scrolls to section and closes drawer
        Large text and icons for senior-friendly mobile experience
      -->
      <v-list nav dense class="py-2">
        <v-list-item
          v-for="item in navItems"
          :key="item.id"
          @click="scrollToSectionMobile(item.id)"
          link
          class="my-1"
        >
          <v-list-item-icon>
            <v-icon size="28" color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!--
        Call button in drawer for easy access
        Large and prominent for senior users
      -->
      <v-list class="pa-4">
        <v-btn
          color="cta"
          large
          block
          :href="'tel:' + phoneNumber"
          class="py-6"
        >
          <v-icon left>mdi-phone</v-icon>
          Call Now
        </v-btn>
      </v-list>
    </v-navigation-drawer>

    <!--
      MAIN CONTENT AREA
      v-main is required container for app content
      Automatically adds padding for app-bar and other app-level components
      (removed in the styles above; the hero adds its own top padding)
    -->
    <v-main>
      <!--
        All section components rendered here
        Each section has an id for scroll navigation
        Sections are imported and registered in the components object below
      -->

      <!-- Hero Section - Top of page with logo and main CTAs -->
      <section id="hero">
        <HeroSection @scroll-to="scrollToSection" />
      </section>

      <!-- About/Services Section - Services offered and service area -->
      <section id="services">
        <AboutServices />
      </section>

      <!-- Reviews Section - Customer reviews and a link to all of them -->
      <section id="reviews">
        <ReviewsSection />
      </section>

      <!-- Estimate Section - Free estimate form with EmailJS -->
      <section id="estimate">
        <EstimateForm />
      </section>

      <!-- Contact Section - Hours, phone, email, location -->
      <section id="contact">
        <ContactSection />
      </section>

      <!-- Footer - Copyright and social links -->
      <AppFooter />
    </v-main>

    <!--
      FLOATING CALL NOW BUTTON - Always visible on screen
      Sticky button in bottom-right corner
      High visibility in the call-to-action green
      Opens phone dialer on click (tel: link)
      fab (floating action button) style
      fixed keeps it visible while scrolling
      bottom and right position it in corner
      x-large makes it very visible for seniors
      Hidden over the estimate and contact sections (see showFloatingCall)
    -->
    <v-fab-transition>
      <v-btn
        v-show="showFloatingCall"
        fab
        fixed
        bottom
        right
        color="cta"
        x-large
        :href="'tel:' + phoneNumber"
        :aria-label="callLabel"
        class="floating-call-btn"
        elevation="8"
      >
        <v-icon large>mdi-phone</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>
