<template>
  <component v-bind:is="linkProps(to)">
    <slot/>
  </component>
</template>

<script>

import { isExternalLink } from '@/utils/resolvePath';
export default {
  props: {
    to: {
        type: String,
        required: true
    }
  },
  methods: {
    linkProps(url) {
      if (isExternalLink(url)) {
        return {
            is: 'a',
            href: url,
            target: '_blank'
        };
      }
      return {
        is: 'router-link',
        to: url
      };
    }
  }
};
</script>


