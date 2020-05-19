<template>
  <div id="app">
    <b-navbar toggleable="lg" class="navbar-bg">
      <b-icon :icon="iconMenu" class="icon-menu" @click="toggleMenu"></b-icon>
      <b-navbar-brand href="#" class="text-white ml-auto"
        >SchoolApp
      </b-navbar-brand>
    </b-navbar>
    <div class="app-content">
      <menu-vertical :active="active"></menu-vertical>
      <div class="content">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import MenuVertical from "@/components/MenuVertical.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      iconMenu: "list-nested"
    };
  },
  computed: {
    ...mapState({
      active: state => state.common.menu.active
    })
  },
  methods: {
    toggleMenu() {
      this.setMenuState(!this.active);
      if (this.active) this.iconMenu = "list-nested";
      else this.iconMenu = "list";
    },
    ...mapMutations({
      setMenuState: 'common/setMenuState'
    })
  },
  components: {
    MenuVertical
  }
};
</script>
<style lang="scss">
$padding: 2rem;
.app-content {
  display: flex;
  .content {
    padding: $padding $padding - 0.5;
    width: 100%;
  }
}
.icon-menu {
  margin-bottom: 0;
  cursor: pointer;
  color: #fff;
  font-size: 28px;
}

#nav a {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  color: #84a2c1;
}

#nav a.router-link-exact-active {
  color: #fff;
}

.navbar-bg {
  background-color: #004085 !important;
}
</style>
