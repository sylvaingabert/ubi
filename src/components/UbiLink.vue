<template>
  <router-link
    :to="to"
    :class="mainClass"
    data-testid="ubilink"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Route } from 'vue-router';
import Modifier from '@/mixins/UIMixin';

@Component
export default class UbiLink extends Mixins(Modifier) {
    @Prop({ required: false, default: 'button' }) readonly to!: Route;

    get mainClass() {
      return this.computedClass('btn', this.modifier);
    }
}
</script>
