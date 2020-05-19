<template>
  <b-avatar
    button
    size="2em"
    :variant="bgColor"
    :text="iconText"
    v-b-tooltip.hove
    :title="fullName"
  ></b-avatar>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["data", "index"],
  computed: {
    iconText() {
      let text = this.data.Names.charAt(0) + "" + this.data.LastName.charAt(0);
      return text.toUpperCase();
    },
    fullName() {
      return this.data.Names + " " + this.data.LastName;
    },
    bgColor() {
      let i = this.index % this.variants.length;
      return this.variants[i];
    },
    ...mapState({
      variants: state => state.common.variants
    })
  }
};
</script>
