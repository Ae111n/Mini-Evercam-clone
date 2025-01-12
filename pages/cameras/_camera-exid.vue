<template>
<div>


</div>
</template>

<script>
import { camerasStore } from '~/store/cameras';
export default {
     computed: {
          cameras() {
               return camerasStore()
          }
     },
}
</script>

<style></style>