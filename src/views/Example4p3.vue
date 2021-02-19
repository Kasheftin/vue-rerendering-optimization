<template>
  <div>
    <div>
      <button @click="addItems">Add 10 items</button>
      <button @click="reset">Reset store</button>
    </div>
    <draggable
      :value="extendedItemsNested"
      @change="updateItemsOrder"
    >
      <ItemWithRename
        v-for="extendedItem in extendedItemsNested"
        :key="extendedItem.id"
        :item="extendedItem.item"
        :is-checked="extendedItem.isChecked"
        @set-checked="setCheckedItemById({ id: extendedItem.id, isChecked: $event })"
        @rename="renameItem({ id: extendedItem.id, title: $event })"
      />
    </draggable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uniqid from 'uniqid'
import draggable from 'vuedraggable'
import ItemWithRename from '@/components/ItemWithRename'

export default {
  components: {
    draggable,
    ItemWithRename
  },
  computed: {
    ...mapGetters('example4', {
      extendedItemsNested: 'extendedItemsNested'
    })
  },
  methods: {
    updateItemsOrder (event) {
      if (event.moved) {
        this.$store.commit('example4/updateItemsOrder', event.moved)
      }
    },
    setCheckedItemById ({ id, isChecked }) {
      this.$store.commit('example4/setCheckedItemById', { id, isChecked })
    },
    renameItem ({ id, title }) {
      this.$store.commit('example4/renameItem', { id, title })
    },
    addItems () {
      this.$store.commit('example4/addItems', Array(10).fill().map(() => this.createHeavyItem(2)))
    },
    reset () {
      this.$store.commit('example4/reset')
    },
    createHeavyItem (it, childrenCount = 10) {
      const id = uniqid()
      return {
        id,
        title: `Item ${id}`,
        hashes: Array(10).fill('Lorem ipsum dolor sit amet.'),
        children: it ? Array(childrenCount).fill().map(() => this.createHeavyItem(it - 1, childrenCount)) : []
      }
    }
  }
}
</script>
