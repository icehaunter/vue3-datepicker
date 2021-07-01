<template>
  <div class="v3dp__datepicker" :style="variables($attrs.style)">
    <div class="v3dp__input_wrapper">
      <input
        type="text"
        ref="inputRef"
        :readonly="!typeable"
        v-model="input"
        v-bind="$attrs"
        :placeholder="placeholder"
        :disabled="disabled"
        :tabindex="disabled ? -1 : 0"
        @keyup="keyUp"
        @blur="renderView()"
        @focus="renderView(initialView)"
        @click="renderView(initialView)"
      />
      <div class="v3dp__clearable" v-show="clearable && modelValue">
        <slot name="clear" :onClear="clearModelValue">
          <i @click="clearModelValue()">x</i>
        </slot>
      </div>
    </div>
    <year-picker
      v-show="viewShown === 'year'"
      v-model:pageDate="pageDate"
      :selected="modelValue"
      :lowerLimit="lowerLimit"
      :upperLimit="upperLimit"
      @select="selectYear"
    />
    <month-picker
      v-show="viewShown === 'month'"
      v-model:pageDate="pageDate"
      :selected="modelValue"
      @select="selectMonth"
      :lowerLimit="lowerLimit"
      :upperLimit="upperLimit"
      :format="monthListFormat"
      :headingFormat="monthHeadingFormat"
      :locale="locale"
      @back="viewShown = 'year'"
    />
    <day-picker
      v-show="viewShown === 'day'"
      v-model:pageDate="pageDate"
      :selected="modelValue"
      :weekStartsOn="weekStartsOn"
      :lowerLimit="lowerLimit"
      :upperLimit="upperLimit"
      :disabledDates="disabledDates"
      :locale="locale"
      :weekdayFormat="weekdayFormat"
      @select="selectDay"
      @back="viewShown = 'month'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, PropType } from 'vue'
import { parse, isValid, setYear, format } from 'date-fns'
import YearPicker from './YearPicker.vue'
import MonthPicker from './MonthPicker.vue'
import DayPicker from './DayPicker.vue'

const TIME_RESOLUTIONS = ['day', 'month', 'year']

export default defineComponent({
  components: {
    YearPicker,
    MonthPicker,
    DayPicker,
  },
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * `v-model` for selected date
     */
    modelValue: {
      type: Date as PropType<Date>,
      required: false,
    },
    /**
     * Dates not available for picking
     */
    disabledDates: {
      type: Object as PropType<{ dates?: Date[] }>,
      required: false,
    },
    /**
     * Upper limit for available dates for picking
     */
    upperLimit: {
      type: Date as PropType<Date>,
      required: false,
    },
    /**
     * Lower limit for available dates for picking
     */
    lowerLimit: {
      type: Date as PropType<Date>,
      required: false,
    },
    /**
     * View on which the date picker should open. Can be either `year`, `month`, or `day`
     */
    startingView: {
      type: String as PropType<'year' | 'month' | 'day'>,
      required: false,
      default: 'day',
      validate: (v: unknown) =>
        typeof v === 'string' && TIME_RESOLUTIONS.includes(v),
    },
    /**
     * `date-fns`-type formatting for a month view heading
     */
    monthHeadingFormat: {
      type: String,
      required: false,
      default: 'LLLL yyyy',
    },
    /**
     * `date-fns`-type formatting for the month picker view
     */
    monthListFormat: {
      type: String,
      required: false,
      default: 'LLL',
    },
    /**
     * `date-fns`-type formatting for a line of weekdays on day view
     */
    weekdayFormat: {
      type: String,
      required: false,
      default: 'EE',
    },
    /**
     * `date-fns`-type format in which the string in the input should be both
     * parsed and displayed
     */
    inputFormat: {
      type: String,
      required: false,
      default: 'yyyy-MM-dd',
    },
    /**
     * [`date-fns` locale object](https://date-fns.org/v2.16.1/docs/I18n#usage).
     * Used in string formatting (see default `monthHeadingFormat`)
     */
    locale: {
      type: Object as PropType<Locale>,
      required: false,
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
    /**
     * Disables datepicker and prevents it's opening
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Clears selected date
     */
    clearable: {
      type: Boolean,
      required: false,
      default: false,
    },
    /*
     * Allows user to input date manually
     */
    typeable: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * If set, lower-level views won't show
     */
    minimumView: {
      type: String as PropType<'year' | 'month' | 'day'>,
      required: false,
      default: 'day',
      validate: (v: unknown) =>
        typeof v === 'string' && TIME_RESOLUTIONS.includes(v),
    },
  },
  emits: {
    'update:modelValue': (value: Date | null | undefined) =>
      value === null || value === undefined || isValid(value),
  },
  setup(props, { emit, attrs }) {
    const viewShown = ref('none' as 'year' | 'month' | 'day' | 'none')
    const pageDate = ref<Date>(new Date())
    const inputRef = ref(null as HTMLInputElement | null)

    const input = ref('')
    watchEffect(() => {
      const parsed = parse(input.value, props.inputFormat, new Date())
      if (isValid(parsed)) {
        pageDate.value = parsed
      }
    })

    watchEffect(
      () =>
        (input.value =
          props.modelValue && isValid(props.modelValue)
            ? format(props.modelValue, props.inputFormat, {
                locale: props.locale,
              })
            : '')
    )

    const renderView = (view: typeof viewShown.value = 'none') => {
      if (!props.disabled) viewShown.value = view
    }
    watchEffect(() => {
      if (props.disabled) viewShown.value = 'none'
    })
    const selectYear = (date: Date) => {
      pageDate.value = date

      if (props.minimumView === 'year') {
        viewShown.value = 'none'
        emit('update:modelValue', date)
      } else {
        viewShown.value = 'month'
      }
    }
    const selectMonth = (date: Date) => {
      pageDate.value = date

      if (props.minimumView === 'month') {
        viewShown.value = 'none'
        emit('update:modelValue', date)
      } else {
        viewShown.value = 'day'
      }
    }
    const selectDay = (date: Date) => {
      emit('update:modelValue', date)

      viewShown.value = 'none'
    }
    const clearModelValue = () => {
      if (props.clearable) {
        emit('update:modelValue', null)
      }
    }

    const keyUp = (event: KeyboardEvent) => {
      const code = event.keyCode ? event.keyCode : event.which
      // close calendar if escape or enter are pressed
      const closeButton = [
        27, // escape
        13, // enter
      ].includes(code)

      if (closeButton) {
        inputRef.value!.blur()
      }
      if (props.typeable) {
        const parsedDate = parse(
          inputRef.value!.value,
          props.inputFormat,
          new Date(),
          { locale: props.locale }
        )
        if (isValid(parsedDate)) {
          input.value = inputRef.value!.value
          emit('update:modelValue', parsedDate)
        }
      }
    }

    const initialView = computed(() => {
      const startingViewOrder = TIME_RESOLUTIONS.indexOf(props.startingView)
      const minimumViewOrder = TIME_RESOLUTIONS.indexOf(props.minimumView)

      return startingViewOrder < minimumViewOrder
        ? props.minimumView
        : props.startingView
    })

    const variables = (object: { style?: Record<string, string> }) =>
      Object.fromEntries(
        Object.entries(object ?? {}).filter(([key, _]) => key.startsWith('--'))
      )

    return {
      input,
      inputRef,
      pageDate,
      renderView,
      selectYear,
      selectMonth,
      selectDay,
      keyUp,
      viewShown,
      clearModelValue,
      initialView,
      log: (e: any) => console.log(e),
      variables,
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
  --text-color: var(--vdp-text-color, #000000);
  --border-radius: var(--vdp-border-radius, 3px);
  --heading-size: var(--vdp-heading-size, 2.5em); /* 40px for 16px font */
  --heading-weight: var(--vdp-heading-weight, bold);
  --heading-hover-color: var(--vdp-heading-hover-color, #eeeeee);
  --arrow-color: var(--vdp-arrow-color, currentColor);

  --elem-color: var(--vdp-elem-color, currentColor);
  --elem-disabled-color: var(--vdp-disabled-color, #d5d9e0);
  --elem-hover-color: var(--vdp-hover-color, #fff);
  --elem-hover-bg-color: var(--vdp-hover-bg-color, #0baf74);
  --elem-selected-color: var(--vdp-selected-color, #fff);
  --elem-selected-bg-color: var(--vdp-selected-bg-color, #0baf74);

  --elem-font-size: var(--vdp-elem-font-size, 0.8em);
  --elem-border-radius: var(--vdp-elem-border-radius, 3px);

  --divider-color: var(--vdp-divider-color, var(--elem-disabled-color));

  position: relative;
}

.v3dp__clearable {
  display: inline;
  position: relative;
  left: -15px;
  cursor: pointer;
}
</style>
