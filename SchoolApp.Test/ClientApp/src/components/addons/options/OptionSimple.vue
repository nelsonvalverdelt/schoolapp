<template>
    <div class="box-option" style="min-width:18rem">
        <div class="btn-options">
            <div class="btn-option-remove btn-rotate-360" @click="remove" v-show="data.btnRemove.isShow"></div>
            <div class="btn-option-add btn-rotate-180" @click="add" v-show="data.btnAdd.isShow"></div>
        </div>
        <div v-if="type == 2">
            <b-form-radio>
                <div v-if="isEdit">
                    <b-form-input class="dashed" size="sm" placeholder="Nombre de opción..." :value="data.value" style="width:calc(18rem - 4rem)"></b-form-input>
                </div>
                <div v-else>
                    {{data.title}}
                </div>
            </b-form-radio>
        </div>
        <div v-if="type == 3">
            <b-form-checkbox>
                <div v-if="isEdit">
                    <b-form-input class="dashed" size="sm" placeholder="Nombre de opción..." :value="data.value" style="width:calc(18rem - 4rem)"></b-form-input>
                </div>
                <div v-else>
                    {{data.title}}
                </div>
            </b-form-checkbox>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['data', 'options', 'isEdit','type'],
        methods: {
            add: function () {
                this.data.btnAdd.isShow = false;
                this.data.btnRemove.isShow = true;
                let id = this.getId();
                let data =
                {
                    id: id,
                    value: '',
                    title: '',
                    btnAdd: {
                        isShow: true
                    },
                    btnRemove: {
                        isShow: true
                    }
                };
                this.options.push(data);
            },
            remove: function () {
                this.validateLastOption();
                let index = this.options.findIndex(x => x.id === this.data.id);
                if (index > -1) this.options.splice(index, 1);
                this.validateFirstOption();
            },
            validateFirstOption: function () {
                if (this.options.length === 1) {
                    let option = this.options[0];
                    option.btnAdd.isShow = true;
                    option.btnRemove.isShow = false;
                }
            },
            validateLastOption: function () {
                let currentLength = this.options.length;
                let beforeLength = this.options.length - 1;
                if (currentLength >= 2) {
                    let option = this.options[currentLength - 1].id
                    if (option === this.data.id) {
                        option = this.options[beforeLength - 1];
                        option.btnRemove.isShow = true;
                        option.btnAdd.isShow = true;
                    }
                }
            },
            getId: function () {
                return 'option_' + Math.random().toString(36).substr(2, 9);
            },
        }
    }
</script>
<style lang="scss">
 .box-option {
    border-style: dashed;
    border-width: 1px;
    border-color: #A4A4A4;
    padding: .8rem;
    margin-right: 1.5rem;
    position: relative;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    .btn-options {
        position: absolute;
        display: flex;
        right: -1.10rem;
        top: -1.35rem;
        opacity: 0;
        transition: 1s;
        -webkit-transition: 1s;
        -o-transition: 1s;
        -moz-transition: 1s;

        .btn-option-add {
            height: 36px;
            width: 36px;
            background-color: #20C125;
            border-radius: 50% 50%;
            border-color: #fff;
            border-width: 2.5px;
            border-style: solid;
            background-image: url(../../../assets/icons/plus.png);
            background-position-x: center;
            background-position-y: center;
            background-repeat: no-repeat;
            background-size: 25px;
            cursor: pointer;
            transition: transform 1s;
        }

        .btn-option-remove {
            height: 36px;
            width: 36px;
            background-color: #F15252;
            border-radius: 50% 50%;
            border-color: #fff;
            border-width: 2.5px;
            border-style: solid;
            background-image: url(../../../assets/icons/delete-small-white.png);
            background-position-x: center;
            background-position-y: center;
            background-repeat: no-repeat;
            background-size: 20px;
            cursor: pointer;
            transition: transform 1s;
        }
    }

    &:hover {
        .btn-options {
            opacity: 1;
        }
    }
}

.btn-rotate-180:hover {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
}

.btn-rotate-360:hover {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
}

</style>