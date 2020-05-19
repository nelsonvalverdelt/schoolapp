<template>
  <div
    class="group-list"
    v-bind:class="selected"
    style="cusor:pointer"
    @click="setData"
  >
    <div class="item-selected"></div>
    <div class="group-element">
      <b-avatar
        size="2em"
        class="avatar-title"
        rounded
        :variant="bgColor"
        :text="iconText"
      ></b-avatar>
      <span class="title">{{ data.Title }}</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["data", "index"],
  computed: {
    iconText() {
      let { Id, Title } = this.data;
      return Title.charAt(0).toUpperCase();
    },
    selected() {
      if (this.group) {
        if (this.group.Id === this.data.Id) return "selected";
        else return "";
      }
      return "";
    },
    bgColor() {
      let i = this.index % this.variants.length;
      return this.variants[i];
    },
    ...mapState({
      variants: state => state.common.variants,
      group: state => state.test.Group
    })
  },
  methods: {
    setData() {
      this.setGroupAct(this.data.Id);
    },
    ...mapActions({
      setGroupAct: "test/setGroup"
    })
  }
};
</script>
<style lang="scss" scoped>
.group-list {
  font-size: 14px;
  height: 44px;
  display: flex;
  margin-bottom: 10px;
  &.selected {
    background-color: #e5eaf0;
  }
  .item-selected {
    width: 4px;
    background-color: #004085;
  }
  .group-element {
    padding: 8px 10px;
    width: 100%;
    display: flex;
    cursor: pointer;
    .title {
      padding: 0 6px;
      display: inline-block;
      width: 240px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: auto;
    }
  }
}
</style>
