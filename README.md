# Vue 3 Datepicker

Documentation: https://icehaunter.github.io/vue3-datepicker/

This is a basic (at least for now) reimplementation of https://github.com/icehaunter/vuejs-datepicker in Vue 3 and with greatly cleaned up code.

All date manipulation and formatting are done via the amazing [`date-fns`](https://date-fns.org/) library, so it's a direct dependency of this picker.

## Installation

Package is available on NPM: https://www.npmjs.com/package/vue3-datepicker

```sh
npm i vue3-datepicker
```

The component is packaged mainly for use with bundlers, if you require a browser build - post an issue.

## Usage

For more examples see https://icehaunter.github.io/vue3-datepicker/examples.html

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

Full props documentation is available at https://icehaunter.github.io/vue3-datepicker/config.html#props

|ID|Type|Default|Description
|---|---|---|---|
|`upperLimit`|`Date`||Upper limit for available dates for picking|
|`lowerLimit`|`Date`||Lower limit for available dates for picking|
|`disabledDates`|`{ dates: Date[] }`||Dates not available for picking|
|`startingView`| `'day' \| 'month' \| 'year'` | `'day'` |View on which the date picker should open. Can be either `year`, `month`, or `day` |
|`minimumView`| `'day' \| 'month' \| 'year'` | `'day'` |If set, lower-level views won't show |
| `monthHeadingFormat` | `String` | `LLLL yyyy` | `date-fns`-type formatting for a month view heading
| `weekdayFormat` | `String` | `EE` | `date-fns`-type formatting for a line of weekdays on day view
| `inputFormat` | `String` | `yyyy-MM-dd` | `date-fns`-type format in which the string in the input should be both parsed and displayed |
| `locale` | [`Locale`](https://date-fns.org/v2.16.1/docs/I18n#usage) | `date-fns/locale/en` | [`date-fns` locale object](https://date-fns.org/v2.16.1/docs/I18n#usage). Used in string formatting (see default `monthHeadingFormat`)
| `weekStartsOn` | `Number` | 1 | Day on which the week should start. Number from 0 to 6, where 0 is Sunday and 6 is Saturday. Week starts with a Monday (1) by default |

## Compatibility

Package is transpiled and should be usable for everyone with ES6 and above, but the styling of the datepicker itself uses CSS Grid and CSS variables.
