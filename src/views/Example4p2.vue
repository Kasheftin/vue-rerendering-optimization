<template>
  <div>
    <div>
      <button @click="addItems">Add 10 items</button>
      <button @click="reset">Reset store</button>
    </div>
    <draggable
      :value="ids"
      @change="updateItemsOrder"
    >
      <ItemWithRenameById2
        v-for="id in ids"
        :key="id"
        :item-id="id"
        @set-checked="setCheckedItemById({ id, isChecked: $event })"
        @rename="renameItem({ id, title: $event })"
      />
    </draggable>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import uniqid from 'uniqid'
import draggable from 'vuedraggable'
import ItemWithRenameById2 from '@/components/ItemWithRenameById2'

export default {
  components: {
    draggable,
    ItemWithRenameById2
  },
  computed: {
    ...mapState('example4', ['ids'])
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
