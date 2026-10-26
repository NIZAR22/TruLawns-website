<script>
/**
 * Photos of properties TruLawns maintains, in src/assets/gallery/
 * To add one: put the photo (4:3, about 1080x810, under 300 KB) in that
 * folder and add a line here with a short description for screen readers
 */
const photos = [
  { file: 'palm-front-yard.jpg', alt: 'Front lawn with mulched beds, red cordylines and two trimmed palms' },
  { file: 'curbside-lawn.jpg', alt: 'Two-story home with a mowed lawn, edged sidewalk and mulched tree rings' },
  { file: 'hedges-and-magnolia.jpg', alt: 'Trimmed hedge row under palms beside a magnolia tree' },
  { file: 'river-rock-bed.jpg', alt: 'River rock bed with rounded shrubs along the front of a home' },
  { file: 'trimmed-hedge-row.jpg', alt: 'Neatly trimmed hedges and a magnolia in a brick-edged bed' },
  { file: 'front-walk-beds.jpg', alt: 'River rock beds with shrubs along a front walkway' },
  { file: 'mulched-backyard-bed.jpg', alt: 'New planting bed with fresh mulch, roses and shrubs in a backyard' },
  { file: 'lakeside-planting.jpg', alt: 'Mulched planting bed with palms and stepping stones by a lake' },
  { file: 'rock-garden-bed.jpg', alt: 'Rock garden bed with round boxwoods and a stone border' },
  { file: 'side-yard-shrubs.jpg', alt: 'Side yard bed with river rock and shrubs next to a garage' },
  { file: 'fire-pit-gravel.jpg', alt: 'Backyard gravel area with a stone fire pit and a porch swing' }
]

export default {
  name: 'GallerySection',

  // Component data - reactive properties
  data: () => ({
    // Photos with their built URLs (webpack resolves each file in src/assets/gallery)
    photos: photos.map(photo => ({
      ...photo,
      src: require(`@/assets/gallery/${photo.file}`)
    })),

    // Index of the photo open in the enlarged view; null when closed
    openIndex: null
  }),

  computed: {
    /**
     * Whether the enlarged view is open; closing the dialog clears the index
     */
    dialogOpen: {
      get () {
        return this.openIndex !== null
      },
      set (open) {
        if (!open) {
          this.openIndex = null
        }
      }
    },

    /**
     * Photo shown in the enlarged view
     * @returns {object|null} The open photo, or null when closed
     */
    openPhoto () {
      return this.openIndex === null ? null : this.photos[this.openIndex]
    }
  },

  methods: {
    /**
     * Opens a photo in the enlarged view
     * @param {number} index - Position in the photos list
     */
    open (index) {
      this.openIndex = index
    },

    /**
     * Shows the next or previous photo, wrapping around at either end
     * @param {number} step - 1 for next, -1 for previous
     */
    move (step) {
      const count = this.photos.length
      this.openIndex = (this.openIndex + step + count) % count
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
  Gallery section background
  White, between the light Services and Reviews sections
*/
.gallery-section {
  background-color: var(--color-white);
}

/*
  Photo tile: a button, so it can be opened with the keyboard too
  Lifts slightly on hover and keyboard focus to show it can be opened
*/
.gallery-tile {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  cursor: zoom-in;
  background-color: var(--color-primary-tint);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-tile:hover,
.gallery-tile:focus-visible {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/*
  Enlarged view: photo on a dark background with previous/next and close buttons
*/
.lightbox {
  background-color: var(--color-dark) !important;
  position: relative;
}

.lightbox-btn {
  position: absolute !important;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.55) !important;
}

.lightbox-close {
  top: 12px;
  right: 12px;
}

.lightbox-prev,
.lightbox-next {
  top: 50%;
  transform: translateY(-50%);
}

.lightbox-prev {
  left: 12px;
}

.lightbox-next {
  right: 12px;
}

.lightbox-caption {
  color: var(--color-light);
}
</style>

<template>
  <!--
    GALLERY SECTION
    Grid of photos from TruLawns jobs; any photo opens larger in a dialog
  -->
  <v-container
    fluid
    class="gallery-section py-16 pa-0 ma-0"
  >
    <v-container>
      <!--
        SECTION HEADER
        Large, centered title to introduce the gallery
      -->
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold primary--text mb-4 brand-underline">
            Our Work
          </h2>
          <p class="text-h6 grey--text text--darken-2">
            Lawns and landscapes we take care of around Brevard County
          </p>
        </v-col>
      </v-row>

      <!--
        PHOTO GRID
        3 columns on desktop, 2 on tablets, 1 on phones
        v-img loads each photo only when it nears the screen
      -->
      <v-row>
        <v-col
          v-for="(photo, index) in photos"
          :key="photo.file"
          cols="12"
          sm="6"
          md="4"
        >
          <button
            type="button"
            class="gallery-tile"
            :aria-label="`View larger: ${photo.alt}`"
            @click="open(index)"
          >
            <v-img
              :src="photo.src"
              :alt="photo.alt"
              :aspect-ratio="4 / 3"
            ></v-img>
          </button>
        </v-col>
      </v-row>
    </v-container>

    <!--
      ENLARGED VIEW
      Arrow keys move between photos; Escape or the close button closes it
    -->
    <v-dialog
      v-model="dialogOpen"
      max-width="1100"
    >
      <v-card
        v-if="openPhoto"
        class="lightbox"
        @keydown.left="move(-1)"
        @keydown.right="move(1)"
      >
        <v-btn
          icon
          large
          dark
          class="lightbox-btn lightbox-close"
          aria-label="Close"
          @click="dialogOpen = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          icon
          large
          dark
          class="lightbox-btn lightbox-prev"
          aria-label="Previous photo"
          @click="move(-1)"
        >
          <v-icon large>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          icon
          large
          dark
          class="lightbox-btn lightbox-next"
          aria-label="Next photo"
          @click="move(1)"
        >
          <v-icon large>mdi-chevron-right</v-icon>
        </v-btn>

        <v-img
          :src="openPhoto.src"
          :alt="openPhoto.alt"
          :aspect-ratio="4 / 3"
          contain
        ></v-img>
        <p class="lightbox-caption text-body-1 text-center pa-3 mb-0">
          {{ openPhoto.alt }} ({{ openIndex + 1 }} of {{ photos.length }})
        </p>
      </v-card>
    </v-dialog>
  </v-container>
</template>
