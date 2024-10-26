<script setup lang="ts">
import { ref, watch } from 'vue';
import FormInput from './common/FormInput.vue';
import type { PersonalInfoData } from '../types/registration';

const props = defineProps<{
  data: PersonalInfoData;
}>();

const emit = defineEmits<{
  'update:data': [data: PersonalInfoData];
}>();

const formData = ref({ ...props.data });
const errors = ref<Record<string, string>>({});

watch(formData.value, (newValue) => {
  emit('update:data', newValue);
  validateForm();
});

const validateForm = () => {
  const newErrors: Record<string, string> = {};
  
  if (!formData.value.fullName.trim()) {
    newErrors.fullName = 'Full name is required';
  }

  if (!formData.value.phoneNumber) {
    newErrors.phoneNumber = 'Phone number is required';
  } else if (!/^\+?[\d\s-]{10,}$/.test(formData.value.phoneNumber)) {
    newErrors.phoneNumber = 'Invalid phone number format';
  }

  if (!formData.value.dateOfBirth) {
    newErrors.dateOfBirth = 'Date of birth is required';
  } else {
    const age = calculateAge(new Date(formData.value.dateOfBirth));
    if (age < 18) {
      newErrors.dateOfBirth = 'You must be at least 18 years old';
    }
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

defineExpose({ validateForm });
</script>

<template>
  <div class="space-y-6">
    <FormInput
      id="fullName"
      label="Full Name"
      v-model="formData.fullName"
      :error="errors.fullName"
      required
    />
    
    <FormInput
      id="phoneNumber"
      label="Phone Number"
      v-model="formData.phoneNumber"
      type="tel"
      :error="errors.phoneNumber"
      required
    />
    
    <FormInput
      id="dateOfBirth"
      label="Date of Birth"
      v-model="formData.dateOfBirth"
      type="date"
      :error="errors.dateOfBirth"
      required
    />
  </div>
</template>