<template>
  <b-col cols="12" lg="4"  class="card-list">
    <div class="card-list-content">
      <div class="card-list-body">
        <b-avatar
          class="card-list-avatar"
          rounded
          :variant="bgColor"
          :text="iconText"
        ></b-avatar>
        <div class="card-list-title">
          <h6>{{ data.Title }}</h6>
        </div>
      </div>
      <div class="card-list-footer">
        <div class="users">
          <b-icon-people-fill></b-icon-people-fill>
           <span>5</span>
        </div>
        <div class="questions">
          <b-icon-layers-fill></b-icon-layers-fill>
          <span>5</span>
        </div>
      </div>
    </div>
  </b-col>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["data", "index"],
  computed: {
    cols() {
      if (this.stateMenu) return 6;
      else return 12;
    },
    iconText() {
      let { Title } = this.data;
      return Title.charAt(0).toUpperCase();
    },
    bgColor() {
      let i = this.index % this.variants.length;
      return this.variants[i];
    },
    ...mapState({
      group: state => state.test.Group,
      variants: state => state.common.variants
    })
  }
};
</script>
<style lang="scss" scoped>
$width: 400px;
$margin: 1.5rem;
.card-list {
  margin-top: 2rem;
  .card-list-content {
    border: 1px solid #c4c4c4;
    border-radius: 6px;
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    .card-list-body {
      display: flex;
      width: 100%;
      .card-list-avatar {
        min-width: 3em;
        min-height: 3em;
      }
      .card-list-title {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-left: $margin;
          line-height: $margin;
          height: $margin * 2;
        }
      }
    }
    .card-list-footer {
      display: flex;
      margin-left: auto;
      .users{
        margin-left: 1rem;
      }
      .questions{
        margin-left: 1rem;
      }
    }
  }
}

@media (max-width: 575.98px) {
  .col-12 {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
}
// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) and (orientation: landscape) { 
  .col-12 {
      flex: 0 0 100% !important;
      max-width: 100% !important;
  }
 }
// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) {
}

// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) {
}

// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) {
  .col-lg-4 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>
