<template>
  <div v-if="item" class="rr-item">
    <div class="rr-item__check">
      <input
        :checked="isChecked"
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
    item: {
      type: Object,
      required: true
    },
    isChecked: {
      type: Boolean,
      required: true
    }
  },
  updated () {
    console.log('ItemWithRename')
    this.$emit('updated')
  }
}
</script>
