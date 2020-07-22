<template>
  <div>
    <input
      type="text"
      v-model="input"
      :placeholder="placeholder"
      @focus="viewShown = startingView"
    />
    <year-picker
      v-show="viewShown === 'year'"
      v-model:pageDate="pageDate"
      @select="selectYear"
    />
    <month-picker
      v-show="viewShown === 'month'"
      v-model:pageDate="pageDate"
      @select="selectMonth"
      @back="viewShown = 'year'"
    />
    <day-picker
      v-show="viewShown === 'day'"
      v-model:pageDate="pageDate"
      :weekStartsOn="weekStartsOn"
      @select="selectDay"
      @back="viewShown = 'month'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, PropType } from 'vue'
import YearPicker from './YearPicker.vue'
import MonthPicker from './MonthPicker.vue'
import DayPicker from './DayPicker.vue'
import { parse, isValid, setYear, lightFormat } from 'date-fns'

export default defineComponent({
  components: {
    YearPicker,
    MonthPicker,
    DayPicker,
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Date as PropType<Date>,
      required: false,
    },
    upperLimit: {
      type: Date,
      required: false,
    },
    lowerLimit: {
      type: Date,
      required: false,
    },
    startingView: {
      type: String as PropType<'year' | 'month' | 'day'>,
      required: false,
      default: 'day'
    },
    /**
     * Day on which the week should start.
     * 
     * Number from 0 to 6, where 0 is Sunday and 6 is Saturday. 
     * Week starts with a Monday (1) by default
     */
    weekStartsOn: {
      type: Number,
      required: false,
      default: 1,
      validator: (value: any) => [0, 1, 2, 3, 4, 5, 6].includes(value)
    }
  },
  setup(props, { emit }) {
    const viewShown = ref('none' as 'year' | 'month' | 'day' | 'none')
    const pageDate = ref(new Date())

    const input = ref('')
    watchEffect(() => {
      const parsed = parse(input.value, 'yyyy-MM-dd', new Date())
      if (isValid(parsed)) {
        pageDate.value = parsed
      }
    })

    watchEffect(
      () =>
        (input.value =
          props.modelValue && isValid(props.modelValue)
            ? lightFormat(props.modelValue, 'yyyy-MM-dd')
            : '')
    )

    // const setActiveYear = (date: Date) => (pageDate.value = setYear(pageDate.value, date))
    const selectYear = (date: Date) => {
      pageDate.value = date
      viewShown.value = 'month'
    }
    const selectMonth = (date: Date) => {
      pageDate.value = date
      viewShown.value = 'day'
    }
    const selectDay = (date: Date) => {
      emit('update:modelValue', date)

      // viewShown.value = 'none'
    }

    return {
      input,
      pageDate,
      selectYear,
      selectMonth,
      selectDay,
      viewShown,
    }
  },
})
</script>

<style>
</style>