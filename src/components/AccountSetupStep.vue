<script setup lang="ts">
import { ref, watch } from 'vue';
import FormInput from './common/FormInput.vue';
import type { AccountSetupData } from '../types/registration';

const props = defineProps<{
  data: AccountSetupData;
}>();

const emit = defineEmits<{
  'update:data': [data: AccountSetupData];
}>();

const formData = ref({ ...props.data });
const errors = ref<Record<string, string>>({});

watch(formData.value, (newValue) => {
  emit('update:data', newValue);
  validateForm();
});

const validateForm = () => {
  const newErrors: Record<string, string> = {};
  
  if (!formData.value.email) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    newErrors.email = 'Invalid email format';
  }

  if (!formData.value.password) {
    newErrors.password = 'Password is required';
  } else if (formData.value.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.value.password)) {
    newErrors.password = 'Password must contain at least one number and special character';
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

defineExpose({ validateForm });
</script>

<template>
  <div class="space-y-6">
    <FormInput
      id="email"
      label="Email"
      v-model="formData.email"
      type="email"
      :error="errors.email"
      required
    />
    
    <FormInput
      id="password"
      label="Password"
      v-model="formData.password"
      type="password"
      :error="errors.password"
      required
    />
    
    <FormInput
      id="confirmPassword"
      label="Confirm Password"
      v-model="formData.confirmPassword"
      type="password"
      :error="errors.confirmPassword"
      required
    />
  </div>
</template>