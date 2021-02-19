<template>
  <div>
    <div>
      <div><strong>ItemById</strong> functional getter</div>
      <div v-for="id in ids" :key="id">
        {{ (itemById(id) || {}).title }}
      </div>
    </div>
    <hr>
    <div>
      <div><strong>ItemsByIds</strong> map getter</div>
      <div v-for="id in ids" :key="id">
        {{ (itemsByIds[id] || {}).title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('example3', {
      itemById: 'itemById',
      itemsByIds: 'itemsByIds'
    }),
    ids () {
      return this.$store.state.example3.items.map(item => item.id)
    }
  },
  created () {
    this.$store.dispatch('example3/initializeItems')
  }
}
</script>
