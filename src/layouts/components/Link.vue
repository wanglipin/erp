<template>
<!-- {is: "router-link", to: "/home/Monitor/platform"} -->
  <components v-bind="linkProps(to)">
    <slot/>
  </components>
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
        console.log({
            is: 'a',
            href: url,
            target: '_blank'
        })
        return {
            is: 'a',
            href: url,
            target: '_blank'
        };
      }
      console.log({is: 'router-link', to: url}, '1231313123123')
      console.log(url,'11111')
      return {
        is: 'router-link',
        to: url
      };
    }
  }
};
</script>


