<template>
  <div class="top">
    <ubi-link
      :to="prevRoute"
      modifier="secondary"
      class="back"
      data-testid="back"
    >
      Retour à la liste
    </ubi-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class Employee extends Vue {
  @Prop({ type: Object, required: true }) readonly prevRoute!: Route;
}
</script>

<style lang="scss" scoped>
.top {
  padding: 1rem 0;
  margin: 0 0 1rem 0;
}
</style>
