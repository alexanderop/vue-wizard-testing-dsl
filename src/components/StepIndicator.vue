<script setup lang="ts">
defineProps<{
  currentStep: number;
  steps: string[];
}>();
</script>

<template>
  <div class="mb-8">
    <div class="flex justify-between">
      <div
        v-for="(step, index) in steps"
        :key="step"
        class="flex items-center"
      >
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center"
          :class="{
            'bg-blue-500 text-white': index <= currentStep,
            'bg-gray-200 text-gray-600': index > currentStep
          }"
        >
          {{ index + 1 }}
        </div>
        <div
          v-if="index < steps.length - 1"
          class="flex-1 h-1 mx-4"
          :class="{
            'bg-blue-500': index < currentStep,
            'bg-gray-200': index >= currentStep
          }"
        ></div>
      </div>
    </div>
    <div class="flex justify-between mt-2">
      <div
        v-for="(step, index) in steps"
        :key="step"
        class="text-sm"
        :class="{
          'text-blue-500 font-medium': index <= currentStep,
          'text-gray-500': index > currentStep
        }"
      >
        {{ step }}
      </div>
    </div>
  </div>
</template>