<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <datepicker
      @opened="log('opened')"
      @closed="log('closed')"
      @pageChanged="
        (view, date) =>
          log(`Page changed on view ${view} to include date ${date}`)
      "
      class="picker"
      v-model="selected"
      :locale="locale"
      :upperLimit="to"
      :lowerLimit="from"
      :clearable="true"
      :typeable="true"
      :input-format="'dd/MM/yyyy'"
      :mask="true"
      dayFormat="d"
      :disabledDates="{ predicate: isToday }"
    >
      <template v-slot:clear="{ onClear }">
        <button @click="onClear">x</button>
      </template>
    </datepicker>
  </div>
  <div>
    <datepicker
      @opened="log('opened')"
      @closed="log('closed')"
      class="picker"
      v-model="time"
      :locale="locale"
      starting-view="time"
      minimum-view="time"
      inputFormat="HH:mm"
      placeholder="selectTime"
      :disabledTime="{ predicate: isMorning }"
    />
  </div>
  <div>
    <datepicker
      @opened="log('opened')"
      @closed="log('closed')"
      class="picker"
      v-model="full"
      :locale="locale"
      minimum-view="time"
      inputFormat="HH:mm dd.MM.yyyy"
      placeholder="date & time"
      :disabledTime="{ dates: disabledTime }"
    />
  </div>
  <div>
    <datepicker
      @opened="log('opened')"
      @closed="log('closed')"
      class="picker"
      v-model="selected"
      :locale="locale"
      :upperLimit="to"
      :lowerLimit="from"
      :clearable="true"
      :disabledDates="{ predicate: isToday }"
      :allow-outside-interval="true"
      placeholder="allow outside interval"
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
    <datepicker
      @opened="log('opened')"
      @closed="log('closed')"
      class="picker"
      v-model="to"
      placeholder="to"
    />
  </div>
  <div>
    <datepicker
      @opened="log('opened')"
      @closed="log('closed')"
      class="picker"
      v-model="to"
      :locale="locale"
      disabled
      placeholder="disabled"
    />
  </div>
  <div>
    <datepicker
      @opened="log('opened')"
      @closed="log('closed')"
      class="picker"
      v-model="yearSelected"
      :locale="locale"
      minimum-view="year"
      placeholder="selectYear"
    />
  </div>
  <div>
    <datepicker
      @opened="log('opened')"
      @closed="log('closed')"
      class="picker"
      v-model="monthSelected"
      :locale="locale"
      minimum-view="month"
      starting-view="month"
      placeholder="selectMonth"
      :starting-view-date="new Date(0)"
      input-format="yyyy-MM"
    />
  </div>
</template>

<script>
import Datepicker from './datepicker/Datepicker.vue'
import { defineComponent } from 'vue'
import { enUS } from 'date-fns/locale'
import { isSameDay, set } from 'date-fns'

export default defineComponent({
  name: 'App',
  components: {
    Datepicker,
  },
  data() {
    return {
      time: null,
      full: null,
      selected: null,
      from: null,
      to: null,
      yearSelected: null,
      monthSelected: null,
      disabledTime: [
        set(new Date(), { hours: 11, minutes: 12 }),
        set(new Date(), { hours: 12, minutes: 30 }),
      ],
    }
  },
  computed: {
    locale: () => enUS,
  },
  watch: {
    selected: (value) => console.log(value),
  },
  methods: {
    isToday(date) {
      return isSameDay(date, new Date())
    },
    isMorning(date) {
      const newDate = set(new Date(date.getTime()), { hours: 11, minutes: 0 })
      return date < newDate
    },
    log(data) {
      console.log(data)
    },
  },
})
</script>

<style>
.picker {
  color: #3c4a5a;
}
</style>
