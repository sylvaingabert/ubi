import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Modifier extends Vue {
  @Prop({ required: false, default: '' }) modifier!: string | string[];

  computedClass(base: string, modifier: string | string[]) {
    let res = base;
    if (Array.isArray(modifier)) {
      let modifiers = '';
      modifier.forEach((current, index, { length }) => {
        modifiers += `${base}--${current}`;
        modifiers += (index < length - 1) ? ' ' : '';
      });
      res = `${base} ${modifiers}`;
    } else {
      res = `${base} ${base}--${modifier}`;
    }
    return res;
  }
}
