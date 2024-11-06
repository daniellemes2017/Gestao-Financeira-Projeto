<template>
  <router-view />
</template>

<script setup>
defineOptions({
  name: "App",
});
</script>

<style>
.q-input .q-field__control {
  height: 55px !important;
  align-items: center;
}

.q-input .q-field__native {
  color: #ffffff !important;
}

.q-field__label {
  color: #ffffff !important;
  font-size: 16px !important;
}


</style>
