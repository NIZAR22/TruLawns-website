<script>
import business from '@/config/business'
import reviews from '@/config/reviews'

export default {
  name: 'ReviewsSection',

  // Component data - reactive properties
  data: () => ({
    // Selected customer reviews (edit in src/config/reviews.js)
    reviews,

    // Google Business Profile with all the reviews
    googleReviewsUrl: business.googleReviewsUrl
  })
}
</script>

<style scoped>
/*
  Scoped styles - only apply to this component
  Custom styling to enhance Vuetify defaults
*/

/*
  Reviews section background
  White, between the light gray Services and Estimate sections
*/
.reviews-section {
  background-color: var(--color-white);
}

/*
  Review card styling
  White card with a gold top edge
  No hover effect: the cards are information, not links
*/
.review-card {
  border-radius: 12px !important;
  border-top: 4px solid var(--color-accent);
  height: 100%; /* Equal height cards in grid */
  display: flex;
  flex-direction: column;
}

/*
  Review text
  Grows so the reviewer names line up at the bottom of each row
*/
.review-text {
  flex-grow: 1;
  color: var(--color-dark);
}

/*
  Large quote mark in faint green behind the start of the text
*/
.quote-mark {
  color: var(--color-primary-tint) !important;
}

/*
  "Read all reviews" button: Vuetify buttons don't wrap their text, which
  pushes this long label past the edge of a phone screen; let it wrap
*/
.reviews-link {
  max-width: 100%;
  height: auto !important;
  min-height: 52px;
  padding-top: 12px !important;
  padding-bottom: 12px !important;
}

.reviews-link ::v-deep .v-btn__content {
  white-space: normal;
  flex-shrink: 1;
}

/*
  Reviewer name
*/
.review-source {
  color: var(--color-primary);
}
</style>

<template>
  <!--
    REVIEWS SECTION
    Real customer reviews, plus a link to all of them on Google
    Builds trust before visitors reach the contact details
  -->
  <v-container
    fluid
    class="reviews-section py-16 pa-0 ma-0"
  >
    <v-container>
      <!--
        SECTION HEADER
        Large, centered title to introduce the reviews
      -->
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold primary--text mb-4 brand-underline">
            What Our Customers Say
          </h2>
          <p class="text-h6 grey--text text--darken-2">
            Homeowners and businesses across Brevard County trust Tru Lawns
          </p>
        </v-col>
      </v-row>

      <!--
        REVIEW CARDS
        3 columns on desktop, 2 on tablets, 1 on phones
        Stars are announced as "5 out of 5 stars" for screen readers
      -->
      <v-row>
        <v-col
          v-for="(review, index) in reviews"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          class="mb-4"
        >
          <v-card
            class="review-card pa-6"
            elevation="4"
          >
            <div class="d-flex align-center justify-space-between mb-3">
              <div
                role="img"
                :aria-label="`${review.rating} out of 5 stars`"
              >
                <v-icon
                  v-for="star in review.rating"
                  :key="star"
                  color="accent"
                >
                  mdi-star
                </v-icon>
              </div>
              <v-icon size="40" class="quote-mark">mdi-format-quote-open</v-icon>
            </div>

            <p class="text-h6 font-weight-regular review-text">
              {{ review.text }}
            </p>

            <p class="text-body-1 font-weight-bold mb-0 review-source">
              {{ review.name }}
            </p>
          </v-card>
        </v-col>
      </v-row>

      <!--
        LINK TO ALL REVIEWS
        Opens the Google Business Profile in a new tab
        Outlined green: the secondary button style
      -->
      <v-row justify="center" class="mt-8">
        <v-col cols="12" class="text-center">
          <v-btn
            :href="googleReviewsUrl"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            outlined
            x-large
            class="reviews-link"
          >
            <v-icon left>mdi-google</v-icon>
            <span class="font-weight-bold">Read All Our Reviews on Google</span>
            <v-icon right small>mdi-open-in-new</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
