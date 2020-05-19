<template>
  <div id="app">
    <div id="nav">
        <b-navbar toggleable="lg" class="navbar-bg">
          <b-icon :icon="iconMenu" class="icon-menu" @click="toggleMenu"></b-icon>
          <b-navbar-brand href="#" class="text-white ml-auto">SchoolApp </b-navbar-brand>
        </b-navbar>
    </div>
    <nuxt />
  </div>
</template>