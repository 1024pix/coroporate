<template>
  <div v-if="isOpen && hotNews" class="hot-news">
    <prismic-rich-text :field="hotNews" />
    <img
      class="close"
      src="/images/close-icon.svg"
      alt="Fermer"
      @click.stop="closeBanner"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HotNewsBanner',
  data() {
    return {
      isOpen: true,
    }
  },
  computed: mapState(['hotNews']),
  methods: {
    closeBanner() {
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss">
.hot-news {
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;

  color: $grey-200;
  background-color: $yellow;
  padding: 2px;

  display: flex;
  flex-direction: row;

  div {
    text-align: center;
    line-height: 1rem;
    font-size: 0.875rem;
    margin: 0 auto;
    align-self: center;
  }

  a {
    color: $grey-200;
    text-decoration: underline;
  }
}
.close {
  margin-right: 20px;
  opacity: 0.5;
  transition: 0.5s;
  cursor: pointer;
  height: 20px;

  @media (min-width: 769px) {
    margin-right: 32px;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
