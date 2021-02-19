<template>
  <div>
    <h1>
      Vue.js Rerendering samples
    </h1>
    <div v-for="page in pages" :key="page.name">
      <h3>
        <router-link :to="page.name">
          {{ page.title }}
        </router-link>
      </h3>
      <div>
        {{ page.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { routes } from '@/router/routes'

export default {
  computed: {
    pages () {
      const examples = routes.find(route => route.name === 'examples')
      return ((examples || {}).children || []).map(route => ({
        ...(route.meta || {}),
        name: route.name
      }))
    }
  }
}
</script>
