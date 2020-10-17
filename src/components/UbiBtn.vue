<template>
  <button
    :type="type"
    :class="mainClass"
    data-testid="ubibtn"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import Modifier from '@/mixins/UIMixin';

@Component
export default class UbiBtn extends Mixins(Modifier) {
    @Prop({
      required: false,
      default: 'button',
      validator: (v) => {
        if (!(v === 'button' || v === 'submit')) {
          throw new Error('Type must be "button" or "submit"');
        }
        return true;
      },
    }) readonly type!: string;

    get mainClass() {
      return this.computedClass('link', this.modifier);
    }
}
</script>
