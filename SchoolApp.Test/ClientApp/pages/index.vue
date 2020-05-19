<template>
  <div v-if="tests.length > 0">
    <div class="group-title">
      <h4>{{ group.Title }}</h4>
    </div>
    <b-container fluid>
      <b-row>
        <component
          is="card-list"
          v-for="(item, index) in tests"
          :data="item"
          :index="index"
          :key="index"
        >
        </component>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardList from "@/components/CardList.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.initMenu();
  },
  computed: {
    tests() {
      return this.group ? this.group.Tests : [];
    },
    ...mapState({
      group: state => state.test.Group,
      groups: state => state.test.Groups
    })
  },
  methods: {
    initMenu() {
      if (this.groups.length > 0) {
        this.setGroupMut(this.groups[0]);
      }
    },
    ...mapMutations({
      setGroupMut: "test/setGroup"
    })
  },
  components: {
    CardList
  }
};
</script>
<style lang="scss" scoped>
.group-title {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5rem 1.5rem;
  }
}
</style>
