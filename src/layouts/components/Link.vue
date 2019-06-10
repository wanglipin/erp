<template>
  <div>
    <component :is="linkProps(to)">
      <slot/>
    </component>
  </div>
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
      console.log(url,'url')
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


