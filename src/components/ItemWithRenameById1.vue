<template>
  <div v-if="item" class="rr-item">
    <div class="rr-item__check">
      <input
        :input-value="item.isChecked"
        type="checkbox"
        @change="$emit('set-checked', $event.target.checked)"
      >
    </div>
    <div class="rr-item__title">
      <input
        :value="item.title"
        @change="$emit('rename', $event.target.value)"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemId: {
      type: String,
      required: true
    }
  },
  computed: {
    item () {
      return this.$store.getters['example4/extendedItemsByIds'][this.itemId]
    }
  },
  updated () {
    console.count('ItemWithRenameById1 updated')
  }
}
</script>
