<template>
  <transition name="toggle-menu-vertical" class="toggle-menu-vertical">
    <div v-if="active" class="menu-vertical">
      <div class="group-search">
        <b-form-input v-model="search" placeholder="Buscar..."></b-form-input>
      </div>
      <div class="group-elements menu-scroll">
        <component
          is="menu-list-vertical"
          v-for="(item, index) in groups"
          :data="item"
          :index="index"
          :key="index"
        >
        </component>
      </div>
      <div class="d-flex mt-1 mx-3">
        <b-link size="sm" class="ml-auto" style="font-size:14px;"
          >Nuevo grupo</b-link
        >
      </div>
    </div>
  </transition>
</template>
<script>
import MenuListVertical from "@/components/MenuListVertical.vue";
import { mapState } from "vuex";
export default {
  props: ["active"],
  data() {
    return {
      search: ""
    };
  },
  computed: {
    searchIsValidated() {
      return !(this.search.length > 0);
    },
    ...mapState({
      groups: state => state.test.Groups
    })
  },
  components: {
    MenuListVertical
  }
};
</script>
<style lang="scss">
.menu-vertical {
  width: 300px;
  height: 94.2vh;
  background-color: #fff;
  -webkit-box-shadow: 7px 2px 12px -4px rgba(188, 188, 194, 1);
  -moz-box-shadow: 7px 2px 12px -4px rgba(188, 188, 194, 1);
  box-shadow: 7px 2px 12px -4px rgba(188, 188, 194, 1);
  .menu-scroll {
    overflow-y: auto;
    max-height: 70vh;
  }
  .menu-scroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  .menu-scroll::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  .menu-scroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fff;
    background-image: -webkit-gradient(
      linear,
      40% 0%,
      75% 84%,
      from(#dedede),
      to(#dedede),
      color-stop(0.9, #dedede)
    );
  }
  .group-search {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    .btn-new {
      margin-top: 1rem;
      margin-left: auto;
    }
  }
}
.toggle-menu-vertical-enter-active,
.toggle-menu-vertical-leave-active {
  -webkit-transition: transform 0.5s;
  -moz-transition: transform 0.5s;
  -o-transition: transform 0.5s;
  transition: transform 0.5s;
}

.toggle-menu-vertical-enter,
.toggle-menu-vertical-leave-to {
  transform: translateX(-300px);
}

.toggle-menu-vertical-enter-to,
.toggle-menu-vertical-leave {
  transform: translateX(0);
}
</style>
