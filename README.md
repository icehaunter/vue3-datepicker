# Vue 3 Datepicker

This is a basic (at least for now) reimplementation of https://github.com/icehaunter/vuejs-datepicker in Vue 3 and with greatly cleaned up code.

All date manipulation and formatting are done via the amazing [`date-fns`](https://date-fns.org/) library, so it's a direct dependency of this picker.

## Installation

(To be done when package is published on NPM)

## Usage

```vue
<template>
  <datepicker
    v-model="selected"
    :locale="locale"
    :upperLimit="to"
    :lowerLimit="from"
  />
</template>
```

## Props and attributes
Attribute fallthrough is enabled, so any attribute you apply to the component will be passed down to the input.

All props which accept formatting strings for dates use [`date-fns` formatting function](https://date-fns.org/docs/format) under the hood, so see that function's documentation for patterns.

Main interaction to date selection is done via `v-model` with `Date` as expected type of the value passed.

|ID|Type|Default|Description
|---|---|---|---|
|`upperLimit`|`Date`||Upper limit for available dates for picking|
|`lowerLimit`|`Date`||Lower limit for available dates for picking|
|`startingView`| `'day' | 'month' | 'year'` | `'day'` |View on which the date picker should open. Can be either `year`, `month`, or `day` |
| `monthHeadingFormat` | `String` | `LLLL yyyy` | `date-fns`-type formatting for a month view heading
| `weekdayFormat` | `String` | `EE` | `date-fns`-type formatting for a line of weekdays on day view
| `inputFormat` | `String` | `yyyy-MM-dd` | `date-fns`-type format in which the string in the input should be both parsed and displayed |
| `locale` | [`Locale`](https://date-fns.org/v2.16.1/docs/I18n#usage) | `date-fns/locale/en` | [`date-fns` locale object](https://date-fns.org/v2.16.1/docs/I18n#usage). Used in string formatting (see default `monthHeadingFormat`)
| `weekStartsOn` | `Number` | 1 | Day on which the week should start. Number from 0 to 6, where 0 is Sunday and 6 is Saturday. Week starts with a Monday (1) by default |
