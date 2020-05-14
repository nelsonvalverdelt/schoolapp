<template>
    <b-list-group-item class="d-flex align-items-center">
        <b-avatar class="mr-3" :text="iconText" :variant="bgColor(index)"></b-avatar>
        <span class="mr-auto">{{data.Email}}</span>
        <span class="user-delete" @click="remove"></span>
    </b-list-group-item>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
    export default {
        props: ['data', 'index'],
        computed: {
            iconText() {
                let text = "";
                let { Names, LastName } = this.data;
                if (Names.length > 0 && LastName.length > 0) {
                    text = Names.charAt(0) + '' + LastName.charAt(0);
                    text.toUpperCase();
                }
                return text;
          },
          ...mapState({
              guests: state => state.test.Guests,
              variants: state => state.test.variants
          })
        },
        methods: {
          remove() {
            this.removeGuestAct(this.index);
          },
          bgColor(index) {
              index = index % this.variants.length;
              return this.variants[index];
          },
          ...mapActions({
            removeGuestAct: 'test/removeGuest'
          }),
        }
            
    }
</script>
<style>
    .user-delete{
        background-color: #F15252;
        background-image: url(~assets/icons/less.png);
        background-size: 20px;
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
        width: 24px;
        height: 24px;
        cursor:pointer;
        border-radius: 50% 50%;
        display: inline-block;
        padding: .25em .4em;
        vertical-align: baseline;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
</style>
