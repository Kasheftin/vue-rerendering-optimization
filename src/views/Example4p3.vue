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
      :value="extendedItemsNested"
      @change="updateItemsOrder"
    >
      <ItemWithRename
        v-for="extendedItem in extendedItemsNested"
        :key="extendedItem.id"
        :item="extendedItem.data"
        :is-checked="extendedItem.isChecked"
        :class="{
          'rr-item--highlight': highlightedItems[extendedItem.id] && (highlightedItems[extendedItem.id] + 1000 > currentTime)
        }"
        @set-checked="setCheckedItemById({ id: extendedItem.id, isChecked: $event })"
        @rename="renameItem({ id: extendedItem.id, title: $event })"
        @updated="highlightItem(extendedItem.id)"
      />
    </draggable>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import uniqid from 'uniqid'
import draggable from 'vuedraggable'
import ItemWithRename from '@/components/ItemWithRename'

export default {
  components: {
    draggable,
    ItemWithRename
  },
  data () {
    return {
      highlightedItems: {},
      currentTime: (new Date()).getTime()
    }
  },
  computed: {
    ...mapState('example4', ['checkedIds']),
    ...mapGetters('example4', {
      extendedItemsNested: 'extendedItemsNested'
    })
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
