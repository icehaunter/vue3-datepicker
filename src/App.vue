<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <datepicker class="picker" v-model="selected" :locale="locale" :upperLimit="to" :lowerLimit="from" />
  </div>
  <div>
    <datepicker class="picker" v-model="from" :locale="locale" placeholder="from" />
  </div>
  <div>
    <datepicker class="picker" v-model="to" :locale="locale" placeholder="to" />
  </div>
</template>

<script>
import Datepicker from './components/Datepicker.vue'
import { defineComponent } from 'vue'
import { ru } from 'date-fns/locale'

export default defineComponent({
  name: 'App',
  components: {
    Datepicker,
  },
  data() {
    return {
      selected: null,
      from: null,
      to: null
    }
  },
  computed: {
    locale: () => ru,
  },
  watch: {
    selected: (value) => console.log(value),
  },
})
</script>

<style>
.picker {
  color: #3c4a5a;
}
</style>
