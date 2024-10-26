<script setup lang="ts">
import { ref, reactive, shallowRef } from 'vue';
import StepIndicator from './StepIndicator.vue';
import AccountSetupStep from './AccountSetupStep.vue';
import PersonalInfoStep from './PersonalInfoStep.vue';
import type { RegistrationState } from '../types/registration';

const steps = ['Account Setup', 'Personal Info', 'Profile', 'Review'];
const currentStep = ref(0);
const currentStepComponent = shallowRef<any>(null);

const registrationData = reactive<RegistrationState>({
  currentStep: 0,
  steps: {
    accountSetup: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    personalInfo: {
      fullName: '',
      phoneNumber: '',
      dateOfBirth: '',
    },
    profilePreferences: {
      avatar: null,
      bio: '',
      interests: [],
    },
  },
});

const isLoading = ref(false);

const validateCurrentStep = async (): Promise<boolean> => {
  if (!currentStepComponent.value?.validateForm) {
    return true;
  }
  
  return currentStepComponent.value.validateForm();
};

const nextStep = async () => {
  if (await validateCurrentStep()) {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++;
    }
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-8">Create Account</h1>
    
    <StepIndicator
      :current-step="currentStep"
      :steps="steps"
    />
    
    <div class="bg-white shadow-md rounded-lg p-6">
      <AccountSetupStep
        v-if="currentStep === 0"
        v-model:data="registrationData.steps.accountSetup"
        ref="currentStepComponent"
      />
      
      <PersonalInfoStep
        v-if="currentStep === 1"
        v-model:data="registrationData.steps.personalInfo"
        ref="currentStepComponent"
      />
      
      <div class="flex justify-between mt-8">
        <button
          v-if="currentStep > 0"
          @click="previousStep"
          :disabled="isLoading"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        
        <button
          @click="nextStep"
          :disabled="isLoading"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-auto"
        >
          {{ currentStep === steps.length - 1 ? 'Submit' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>