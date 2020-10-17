import { extend } from 'vee-validate';
import { required, min_value } from 'vee-validate/dist/rules';
import isImageUrl from 'is-image-url';

extend('required', {
  ...required,
  message: '',
});

extend('min_value', {
  ...min_value,
  message: '',
});

extend('image_url', {
  validate: (value) => isImageUrl(value.trim()),
  message: '',
});
