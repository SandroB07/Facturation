<template>
  <tr>
    <td>{{ invoice.id + 1 }}</td>
    <td>{{ clientFullName(invoice) }}</td>
    <td>{{ invoice.date }}</td>
    <td></td>
  </tr>
</template>

<script lang="ts">
  export default {
    props: ['invoice'],

    computed: {
      clientFullName: (invoice) => {
        return `${invoice.client.firstname} ${invoice.client.lastname}`
      }
    }
  }
</script>