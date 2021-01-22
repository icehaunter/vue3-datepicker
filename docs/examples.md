<script setup>
import Datepicker from '../src/datepicker/Datepicker.vue'
import { ref } from 'vue'
import { add } from 'date-fns'

// Ex 1
const picked = ref(new Date())

// Ex 2
const example2 = ref(new Date())
const example2_from = ref(add(new Date(), { days: -7 }))
const example2_to = ref(add(new Date(), { days: 7 }))

// Ex 3
const example3 = ref(new Date())
const startingView = ref('day')

</script>

# Examples

## Styling
For styling examples, see [Configuration section](/config#styling-example-and-playground).

## Basic usage

<datepicker v-model="picked" />

<details>
  <summary>Code for this example</summary>
  
  ```vue
  <script setup>
  import Datepicker from '../src/datepicker/Datepicker.vue'
  import { ref } from 'vue'
  const picked = ref(new Date())

  </script>

  <template>
    <datepicker v-model="picked" />
  </template>
  ```
</details>


## Upper and lower limits
:::tip
If limit is within the current "view" (e.g. a month), then view changing will be prohibited.
:::

Settings: 

- Upper limit: <datepicker v-model="example2_from" />
- Lower limit: <datepicker v-model="example2_to" />

Result:

<datepicker v-model="example2" :upper-limit="example2_to" :lower-limit="example2_from" />

<details>
  <summary>Code for this example</summary>
  
  ```vue
  <script setup>
  import Datepicker from '../src/datepicker/Datepicker.vue'
  import { ref } from 'vue'
  const example2 = ref(new Date())
  const example2_from = ref(new Date())
  const example2_to = ref(new Date())

  </script>

  <template>
    <datepicker
      v-model="example2"
      :upper-limit="example2_to"
      :lower-limit="example2_from"
    />
  </template>
  ```
</details>

## Starting view
Settings: 

- <label>Starting view: <code>day</code> <input type="radio" v-model="startingView" value="day"></label>
- <label>Starting view: <code>month</code> <input type="radio" v-model="startingView" value="month"></label>
- <label>Starting view: <code>year</code> <input type="radio" v-model="startingView" value="year"></label>

Result:
<datepicker v-model="example3" :starting-view="startingView" />