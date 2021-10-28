<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <datepicker
      class="picker"
      v-model="selected"
      :locale="locale"
      :upperLimit="to"
      :lowerLimit="from"
      :clearable="true"
			:disabledDates="{ predicate: isToday }"
    >
      <template v-slot:clear="{ onClear }">
        <button @click="onClear">x</button>
      </template>
    </datepicker>
  </div>
  <div>
    <datepicker
      class="picker"
      v-model="selected"
      :locale="locale"
      :upperLimit="to"
      :lowerLimit="from"
      :clearable="true"
			:disabledDates="{ predicate: isToday }"
      :allow-outside-interval="true"
    />
  </div>
  <div>
    <datepicker
      class="picker"
      weekday-format="iiiiii"
      month-list-format="LLLL"
      v-model="from"
      :locale="locale"
      placeholder="from"
    />
  </div>
  <div>
    <datepicker class="picker" v-model="to" placeholder="to" />
  </div>
  <div>
    <datepicker
      class="picker"
      v-model="to"
      :locale="locale"
      disabled
      placeholder="disabled"
    />
  </div>
  <div>
    <datepicker
      class="picker"
      v-model="yearSelected"
      :locale="locale"
      minimum-view="year"
      placeholder="selectYear"
    />
  </div>
  <div>
    <datepicker
      class="picker"
      v-model="monthSelected"
      :locale="locale"
      minimum-view="month"
      starting-view="year"
      placeholder="selectMonth"
    />
  </div>
</template>

<script>
import Datepicker from './datepicker/Datepicker.vue'
import { defineComponent } from 'vue'
import { enUS } from 'date-fns/locale'
import { isSameDay } from 'date-fns'

export default defineComponent({
  name: 'App',
  components: {
    Datepicker,
  },
  data() {
    return {
      selected: null,
      from: null,
      to: null,
      yearSelected: null,
      monthSelected: null,
    }
  },
  computed: {
    locale: () => enUS,
  },
  watch: {
    selected: (value) => console.log(value),
  },
	methods: {
		isToday (date) {
			return isSameDay(date, new Date())
		}
	}
})
</script>

<style>
.picker {
  color: #3c4a5a;
}
</style>
