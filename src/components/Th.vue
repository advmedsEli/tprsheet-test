<template>
  <th class="tprsheet-thwrap">
    <div class="tprsheet-th">
      <span class="tprsheet-th-title">{{ label }}</span>
      <div v-if="children.length" class="tprsheet-th-children">
        <span v-for="sublabel of children" :key="sublabel" class="tprsheet-th-children-label">
          {{ sublabel }}
        </span>
      </div>
    </div>
  </th>
</template>

<script>
export default {
  name: 'Th',
  props: {
    label: {
      type: String,
      required: true
    },
    children: {
      type: Array,
      default: () => []
    }
  }
}
</script>
