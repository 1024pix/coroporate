<template>
  <section
    :class="[
      'banner row-block',
      { ' banner-with-background': hasBackgroundImage },
    ]"
  >
    <div class="row-block__main-content">
      <prismic-rich-text :field="title" class="title--big" />
      <prismic-rich-text :field="textContent" class="text--normal" />
      <slot></slot>
      <div class="banner__button-group">
        <div v-for="(link, index) in links" :key="`item-${index}`">
          <pix-link
            v-if="!isVideo(link)"
            :field="link.banner_link_url"
            class="button"
            :class="videoClass(link)"
          >
            {{ link.banner_link_text }}
          </pix-link>
          <template v-if="isVideo(link)">
            <button class="button button-video" @click="openVideoModal()">
              <fa icon="play-circle" />
              {{ link.banner_link_text }}
            </button>
            <modal ref="modal" name="videoModal" height="auto">
              <media-player :video-url="link.banner_link_url.url" />
            </modal>
          </template>
        </div>
      </div>
    </div>
    <prismic-image
      v-if="hasImage"
      :field="imageUrl"
      class="row-block__side-content"
    />
  </section>
</template>

<script>
import MediaPlayer from '../MediaPlayer'
import { DESKTOP_MIN_WIDTH } from '~/config/breakpoints'

export default {
  name: 'PageBanner',
  components: { MediaPlayer },
  props: {
    slice: {
      type: Object,
      default: null,
    },
  },
  computed: {
    title() {
      return this.slice.primary.banner_title
    },
    textContent() {
      return this.slice.primary.banner_content
    },
    links() {
      return this.slice.items
    },
    hasImage() {
      return (
        this.slice.primary.banner_image && this.slice.primary.banner_image.url
      )
    },
    hasBackgroundImage() {
      return (
        this.slice.primary.banner_background &&
        this.slice.primary.banner_background.url
      )
    },
    imageUrl() {
      return this.slice.primary.banner_image
    },
  },
  mounted() {
    if (this.hasBackgroundImage) {
      this.changeBackgroundImage()
      window.addEventListener('resize', this.changeBackgroundImage)
    }
  },
  beforeDestroy() {
    if (this.bannerWithBackgroundImageClass) {
      window.removeEventListener('resize', this.changeBackgroundImage)
    }
  },
  methods: {
    openVideoModal() {
      this.$modal.show('videoModal')
    },
    isVideo(link) {
      return link.banner_link_url.url.includes('pix-videos/')
    },
    videoClass(link) {
      return this.isVideo(link) ? 'banner__video' : ''
    },
    changeBackgroundImage() {
      const banner = document.getElementsByClassName(
        'banner-with-background'
      )[0]
      if (screen.width <= DESKTOP_MIN_WIDTH) {
        banner.style.background = `no-repeat url(${this.slice.primary.banner_background.url})`
        banner.style.backgroundSize = '100%'
        banner.style.backgroundPosition = 'top right'
      } else {
        banner.style.background = 'none'
      }
    },
  },
}
</script>

<style lang="scss">
.banner {
  text-align: center;

  .text--normal p {
    margin: 16px 0 24px;
  }

  .banner__button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .button {
      margin: 5px 0;
    }
  }

  &.row-block {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      'a a a a'
      'b b b b';
    grid-gap: 16px;

    font-family: 'Open Sans', Arial, sans-serif;
    padding: 64px 0;
    margin: 0 16px;

    & > * {
      max-width: 100%;
    }

    .row-block__main-content {
      grid-area: a;
    }

    .row-block__side-content {
      grid-area: b;
      display: none;
    }
  }
}

@include device-is('tablet') {
  .banner {
    padding: 80px 0;

    .banner__button-group {
      flex-direction: row;

      .button {
        width: initial;
        margin: 0 10px;
      }
    }

    &.row-block {
      margin: 0 32px;
      grid-template-columns: repeat(8, 1fr);
      grid-template-areas:
        'a a a a a a a a'
        'b b b b b b b b';
    }
  }
}

@include device-is('desktop') {
  .banner.row-block {
    margin: 0 32px;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      'a a a a a a a a a a a a'
      '. . . b b b b b b . . .';

    .row-block__side-content {
      margin-top: 48px;
      display: initial;
      width: 100%;
      box-sizing: border-box;
    }
  }
}

@include device-is('large-screen') {
  .banner.row-block {
    margin: 0 auto;
    grid-template-columns: 1.2fr repeat(12, 1fr) 1.2fr;
    grid-template-areas: '. a a a a a a . b b b b b .';
    grid-gap: 24px;

    .row-block__main-content {
      text-align: left;
      align-self: center;

      .banner__button-group {
        justify-content: flex-start;

        .button {
          margin: 0 20px 0 0;
        }
      }
    }
  }
}
</style>