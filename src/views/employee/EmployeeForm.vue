<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form
      class="form"
      novalidate
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <div class="photo">
        <figure>
          <img
            :src="avatar"
            alt=""
            class="img-responsive"
          >
        </figure>
      </div>

      <div class="content">
        <h1 class="title">
          <slot name="title" />
        </h1>
        <p
          v-if="displayId"
          class="input-container"
        >
          <label for="id">ID</label>
          <input
            id="id"
            v-model="employee.id"
            type="text"
            :disabled="true"
            data-testid="id"
          >
        </p>
        <p class="input-container">
          <label for="name">Nom</label>
          <validation-provider
            v-slot="{ classes }"
            rules="required"
          >
            <input
              id="name"
              v-model="employee.name"
              type="text"
              :disabled="fiedsDisabled"
              :class="classes"
              required
              data-testid="name"
            >
          </validation-provider>
        </p>
        <p class="input-container">
          <label for="salary">Salaire</label>
          <validation-provider
            v-slot="{ classes }"
            rules="required"
          >
            <input
              id="salary"
              v-model="employee.salary"
              type="number"
              min="0"
              step="500"
              :disabled="fiedsDisabled"
              :class="classes"
              data-testid="salary"
            > $
          </validation-provider>
        </p>
        <p class="input-container">
          <label for="age">Age</label>
          <validation-provider
            v-slot="{ classes }"
            rules="required|min_value:18"
          >
            <input
              id="age"
              v-model="employee.age"
              type="number"
              min="18"
              max="130"
              step="1"
              :class="classes"
              :disabled="fiedsDisabled"
              data-testid="age"
            > ans
          </validation-provider>
        </p>
        <p class="input-container">
          <label for="profile_image">Url de la photo</label>
          <validation-provider
            v-slot="{ classes }"
            rules="image_url"
          >
            <input
              id="profile_image"
              v-model="employee.photo"
              type="url"
              :class="classes"
              :disabled="fiedsDisabled"
              data-testid="profileimage"
            >
          </validation-provider>
        </p>

        <div class="footer">
          <slot name="buttons" />
        </div>
      </div>
    </form>
  </validation-observer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import EmployeeModel from '@/models/Employee';
import isImageUrl from 'is-image-url';
import defaultAvatar from '@/assets/images/avatar.png';

@Component
export default class Employee extends Vue {
  @Prop({ type: EmployeeModel, required: true }) readonly employee!: EmployeeModel;

  @Prop({ type: Boolean, required: false, default: false }) readonly fiedsDisabled!: boolean;

  @Prop({ type: Boolean, required: false, default: true }) readonly displayId!: boolean;

  get avatar(): string {
    if (this.employee) {
      const { photo } = this.employee;
      return (isImageUrl(photo)) ? photo : defaultAvatar;
    }
    return defaultAvatar;
  }

  onSubmit() {
    this.$emit('submit');
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;

  @media (max-width: $mobileBreakpoint) {
    flex-direction: column;
  }
}

.photo {
  padding: 2rem;
  width: 240px;
  height: 263px;

  @media (max-width: $mobileBreakpoint) {
    margin: 0 auto;
    width: 50%;
    height: auto;
  }
}

.content {
  display: flex;
  flex-direction: column;
}

.footer {
  padding-top: 1rem;
}

.title {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  padding: 0;
}

.input-container {
  margin: 0.5rem 0;
  padding: 0;
}

input[type=text] {
  width: 200px;

  @media (max-width: $mobileBreakpoint) {
    width: 100%;
  }
}
</style>
