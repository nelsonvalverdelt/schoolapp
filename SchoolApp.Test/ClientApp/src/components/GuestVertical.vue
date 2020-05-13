<template>
    <b-list-group-item class="d-flex align-items-center">
        <b-avatar class="mr-3" :text="iconText" :variant="bgColor(index)"></b-avatar>
        <span class="mr-auto">{{data.Email}}</span>
        <span class="user-delete" @click="remove"></span>
    </b-list-group-item>
</template>
<script>
    import { mapState } from 'vuex';
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
            ...mapState(['Guests','variants'])
        },
        methods: {
            remove() {
                this.Guests.splice(this.index, 1);
            },
            bgColor(index) {
                index = index % this.variants.length;
                return this.variants[index];
            }
        }
            
    }
</script>
<style lang="scss" scoped>
    .user-delete{
        background-color: #F15252;
        background-image: url(../assets/icons/less.png);
        background-size: 20px;
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
        width: 24px;
        height: 24px;
        cursor:pointer;
        border-radius: 50% 50%;
    }
</style>