<template>
  <div id="app">
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
    <v-dialog :click-to-close="false" />
  </div>
</template>
