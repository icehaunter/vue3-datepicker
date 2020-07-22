<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <datepicker v-model="selected" />
</template>

<script>
import Datepicker from './components/Datepicker.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    Datepicker
  },
  data () {
    return {
      selected: null
    }
  },
  watch: {
    selected: (value) => console.log(value)
  }
})
</script>
