<template>
  <div>
    <draggable
      :value="items"
      @change="updateItemsOrder"
    >
      <Item
        v-for="item in items"
        :key="item.id"
        :item="item"
        @set-checked="setCheckedItemById({ id: item.id, isChecked: $event })"
      />
    </draggable>
    <p>
      <strong>
        Logs:
      </strong>
      <button @click="logs = []">
        Clear Logs
      </button>
    </p>
    <div v-for="log in logs" :key="log.id">
      {{ log.time }} - {{ log.text }}
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Item from '@/components/Item'

export default {
  components: {
    draggable,
    Item
  },
  data () {
    return {
      logs: []
    }
  },
  computed: {
    items () {
      return this.$store.getters['example1/extendedItems']
    },
    itemIds () {
      return this.items.map(item => item.id)
    },
    itemIdsTrigger () {
      return this.itemIds.join('-')
    }
  },
  watch: {
    itemIds () {
      this.log(`itemIds object-type watcher run for ${this.itemIds.join(', ')}`)
    },
    itemIdsTrigger () {
      this.log(`itemIdsTrigger string-type watcher run for ${this.itemIds.join(', ')}`)
    }
  },
  created () {
    this.$store.dispatch('example1/initializeItems')
  },
  methods: {
    updateItemsOrder (event) {
      if (event.moved) {
        this.$store.commit('example1/updateItemsOrder', event.moved)
      }
    },
    setCheckedItemById ({ id, isChecked }) {
      this.$store.commit('example1/setCheckedItemById', { id, isChecked })
    },
    log (text) {
      this.logs.push({
        id: this.logs.length,
        time: (new Date()).toLocaleTimeString(),
        text
      })
    }
  }
}
</script>
