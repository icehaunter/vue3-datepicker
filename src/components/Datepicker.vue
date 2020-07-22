<template>
  <div class="v3dp__datepicker">
    <input
      type="text"
      v-model="input"
      :placeholder="placeholder"
      @focus="viewShown = startingView"
    />
    <year-picker
      v-show="viewShown === 'year'"
      v-model:pageDate="pageDate"
      :selected="modelValue"
      @select="selectYear"
    />
    <month-picker
      v-show="viewShown === 'month'"
      v-model:pageDate="pageDate"
      :selected="modelValue"
      @select="selectMonth"
      @back="viewShown = 'year'"
    />
    <day-picker
      v-show="viewShown === 'day'"
      v-model:pageDate="pageDate"
      :selected="modelValue"
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
      default: 'day',
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
      validator: (value: any) => [0, 1, 2, 3, 4, 5, 6].includes(value),
    },
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
.v3dp__datepicker {
  --popout-bg-color: var(--vdp-bg-color, #fff);
  --box-shadow: var(
    --vdp-box-shadow,
    0 4px 10px 0 rgba(128, 144, 160, 0.1),
    0 0 1px 0 rgba(128, 144, 160, 0.81)
  );
  --border-radius: var(--vdp-border-radius, 3px);
  --heading-size: var(--vdp-heading-size, 2.5em); /* 40px for 16px font */
  --heading-weight: var(--vdp-heading-weight, bold);
  --heading-hover-color: var(--vpd-heading-hover-color, #eeeeee);
  --arrow-color: var(--vdp-arrow-color, currentColor);

  --elem-color: var(--vpd-elem-color, currentColor);
  --elem-disabled-color: var(--vpd-disabled-color, #d5d9e0);
  --elem-hover-color: var(--vdp-hover-color, #fff);
  --elem-hover-bg-color: var(--vdp-hover-bg-color, #0baf74);
  --elem-selected-color: var(--vdp-selected-color, #fff);
  --elem-selected-bg-color: var(--vdp-selected-bg-color, #0baf74);

  --elem-font-size: var(--vpd-elem-font-size, 0.8em);
  --elem-border-radius: var(--vdp-elem-border-radius, 3px);

  --divider-color: var(--vpd-divider-color, var(--elem-disabled-color));
}
</style>
