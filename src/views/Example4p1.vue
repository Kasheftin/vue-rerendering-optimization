<template>
  <div>
    <div>
      <button @click="addItems">Add 10 items</button>
      <button @click="reset">Reset store</button>
      <button v-if="checkedIds.length" @click="deleteCheckedItems">
        Delete {{ checkedIds.length }} checked item{{ checkedIds.length === 1 ? '' : 's' }}
      </button>
    </div>
    <draggable
      :value="ids"
      @change="updateItemsOrder"
    >
      <ItemWithRenameById1
        v-for="id in ids"
        :key="id"
        :item-id="id"
        :class="{
          'rr-item--highlight': highlightedItems[id] && (highlightedItems[id] + 1000 > currentTime)
        }"
        @set-checked="setCheckedItemById({ id, isChecked: $event })"
        @rename="renameItem({ id, title: $event })"
        @updated="highlightItem(id)"
      />
    </draggable>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import uniqid from 'uniqid'
import draggable from 'vuedraggable'
import ItemWithRenameById1 from '@/components/ItemWithRenameById1'

export default {
  components: {
    draggable,
    ItemWithRenameById1
  },
  data () {
    return {
      highlightedItems: {},
      currentTime: (new Date()).getTime()
    }
  },
  computed: {
    ...mapState('example4', ['ids', 'checkedIds'])
  },
  mounted () {
    this._interval = setInterval(() => {
      this.currentTime = (new Date()).getTime()
    }, 100)
  },
  beforeDestroy () {
    this.reset()
    this._interval && clearInterval(this._interval)
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
    deleteCheckedItems () {
      this.$store.commit('example4/deleteCheckedItems')
    },
    createHeavyItem (it, childrenCount = 10) {
      const id = uniqid()
      return {
        id,
        title: `Item ${id}`,
        hashes: Array(10).fill('Lorem ipsum dolor sit amet.'),
        children: it ? Array(childrenCount).fill().map(() => this.createHeavyItem(it - 1, childrenCount)) : []
      }
    },
    highlightItem (id) {
      this.highlightedItems = {
        ...this.highlightedItems,
        [id]: (new Date()).getTime()
      }
    }
  }
}
</script>
