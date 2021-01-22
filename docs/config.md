# Configuration

## Props

### `v-model`
- Type: `Date`
- Required: yes

The actual date that will be selected. The component behaves as close to Vue 3 documentation on custom component inputs as possible, using `modelValue` prop and `update:modelValue` event pair. Use those if you want to have more control over your model binding.

### `upperLimit`

- Type: `Date`
- Required: no

Upper limit (not inclusive) for available dates for picking. All dates above that limit will not be selectable.

### `lowerLimit`

- Type: `Date`
- Required: no

Lower limit (not inclusive) for available dates for picking. All dates below that limit will not be selectable.

### `startingView`

- Type: `'day' | 'month' | 'year'`
- Default: `'day'`

View on which the date picker should open. Can be either `year`, `month`, or `day`.

### `monthHeadingFormat`

- Type: `String` (date-fns [format string](https://date-fns.org/docs/format))
- Default: `LLLL yyyy`

`date-fns`-type formatting for a month view heading. By default prints full month as text and selected year (e.g. January 2021).

### `weekdayFormat`

- Type: `String` (date-fns [format string](https://date-fns.org/docs/format))
- Default: `EE`

`date-fns`-type formatting for a line of weekdays on day view. By default uses three-letter representation (e.g. Fri).

### `inputFormat`

- Type: `String` (date-fns [format string](https://date-fns.org/docs/format))
- Default: `yyyy-MM-dd`

`date-fns`-type format in which the string in the input should be both parsed and displayed. By default uses ISO format (e.g. 2021-01-01).

### `locale`

- Type: `Locale` [`date-fns` locale object](https://date-fns.org/v2.16.1/docs/I18n#usage)
- Default: `date-fns/locale/en`

Used in all date string formatting (e.g. see default `monthHeadingFormat`)

### `weekStartsOn`

- Type: `0 | 1 | 2 | 3 | 4 | 5 | 6`
- Default: `1`

Day on which the week should start. Number from 0 to 6, where 0 is Sunday and 6 is Saturday. Week starts with a Monday (1) by default.

## Styling

:::warning
Heavy restyling via variables has not been tested, as I am mostly using this component as-is. If you find any issues while adjusting the colors (e.g. some colors don't change or a setting is missing) please [file an issue on GitHub](https://github.com/icehaunter/vue3-datepicker/issues).
:::

### Variables

Style can be altered significantly without editing CSS files of the components. This is done via CSS variables. Following variables are available:

| Variable name               | Default value  | Type   |
| --------------------------- | -------------- | ------ |
| `--vdp-bg-color`            | `#fff`         | color  |
| `--vdp-text-color`          | `#000`         | color  |
| `--vdp-box-shadow`          | See source     | shadow |
| `--vdp-border-radius`       | `3px`          | size   |
| `--vdp-heading-size`        | `2.5em`        | size   |
| `--vdp-heading-weight`      | `bold`         | weight |
| `--vdp-heading-hover-color` | `#eeeeee`      | color  |
| `--vdp-arrow-color`         | `currentColor` | color  |
| `--vdp-elem-color`          | `currentColor` | color  |
| `--vdp-disabled-color`      | `#d5d9e0`      | color  |
| `--vdp-hover-color`         | `#fff`         | color  |
| `--vdp-hover-bg-color`      | `#0baf74`      | color  |
| `--vdp-selected-color`      | `#fff`         | color  |
| `--vdp-selected-bg-color`   | `#0baf74`      | color  |
| `--vdp-elem-font-size`      | `0.8em`        | size   |
| `--vdp-elem-border-radius`  | `3px`          | size   |
| `--vdp-divider-color`       | `#d5d9e0`      | color  |

### Styling example and playground

<script setup>
import Datepicker from '../src/datepicker/Datepicker.vue'
import { ref, reactive, computed } from 'vue'
const picked = ref(new Date())

const variables = reactive({
  '--vdp-bg-color': { value: '#ffffff', type: 'color' },
  '--vdp-text-color': { value: '#000000', type: 'color' },
  '--vdp-box-shadow': { value: '0 4px 10px 0 rgba(128, 144, 160, 0.1), 0 0 1px 0 rgba(128, 144, 160, 0.81)', type: 'shadow' },
  '--vdp-border-radius': { value: '3px', type: 'size' },
  '--vdp-heading-size': { value: '2.5em', type: 'size' },
  '--vdp-heading-weight': { value: 'bold', type: 'weight' },
  '--vdp-heading-hover-color': { value: '#eeeeee', type: 'color' },
  '--vdp-arrow-color': { value: 'currentColor', type: 'color' },
  '--vdp-elem-color': { value: 'currentColor', type: 'color' },
  '--vdp-disabled-color': { value: '#d5d9e0', type: 'color' },
  '--vdp-hover-color': { value: '#ffffff', type: 'color' },
  '--vdp-hover-bg-color': { value: '#0baf74', type: 'color' },
  '--vdp-selected-color': { value: '#ffffff', type: 'color' },
  '--vdp-selected-bg-color': { value: '#0baf74', type: 'color' },
  '--vdp-elem-font-size': { value: '0.8em', type: 'size' },
  '--vdp-elem-border-radius': { value: '3px', type: 'size' },
  '--vdp-divider-color': { value: '#d5d9e0', type: 'color' },
})

const styleObj = computed(() =>
  Object.entries(variables)
    .map(([k, { value }]) => [k, value])
    .reduce((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {})
)
</script>

<br />
<datepicker :style="styleObj" v-model="picked" />

<table>
<tr v-for="(value, variable) in variables" :key="variable">
<td>
<code>{{ variable }}</code>
</td>
<td v-if="value.type === 'color'">
  <label><code>currentColor</code> <input type="checkbox" v-model="value.value" true-value="currentColor" false-value="#000000"></label>
  &nbsp;

  <input v-if="value.value !== 'currentColor'" type="color" v-model="value.value" />
</td>
<td v-else>
  <input type="text" v-model="value.value">
</td>
</tr>
</table>

<details>
  <summary>Copy serialized object with these settings</summary>
  
  <div class="language-json">
    <pre><code>{{ styleObj }}</code></pre>
  </div>
</details>