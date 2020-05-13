<template>
    <div class="question-content">
        <div class="btn-add btn-rotate-180 question-btn-right-top" @click="add" v-show="data.btnAdd.isShow"></div>
        <div class="btn-remove btn-rotate-360 question-btn-right-bottom" @click="remove" v-show="data.btnRemove.isShow"></div>
        <div class="question-detail">
            <b-form-group label="Tipo de Pregunta:" class="mr-5">
                <b-form-radio-group v-model="data.questionType" class="mt-2">
                    <b-form-radio value="1">Pregunta Abierta</b-form-radio>
                    <b-form-radio value="2">Pregunta Cerrada</b-form-radio>
                    <b-form-radio value="3">Opción múltiple</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
            <b-form-group label="Tiempo (min):" label-for="time" class="mr-5">
                <b-form-spinbutton v-model="data.time" id="time" min="1" max="120"></b-form-spinbutton>
            </b-form-group>
            <b-form-group label="Puntos:" label-for="points">
                <b-form-spinbutton v-model="data.points" id="points" min="1" max="120"></b-form-spinbutton>
            </b-form-group>
        </div>
        <div class="question">
            <b-form-group label="Pregunta:" label-for="question">
                <b-form-textarea id="question" class="dashed" rows="2" max-rows="5"></b-form-textarea>
            </b-form-group>
        </div>
        <div class="options">
            <div v-if="data.questionType != 1">
                <b-form-group :label="labelOpciones" label-for="question">
                    <b-form-radio-group name="radio-sub-component" class="options-group scroll-x scroll-h-style-1">
                        <component
                            name="radio"
                            is="option-simple" 
                            v-for="item in options"
                            :options="options"
                            :data="item"
                            :key="item.id"
                            :type=data.questionType
                            :isEdit= data.isOptionEdit>
                        </component>
                    </b-form-radio-group>
                </b-form-group>
            </div>
        </div>
    </div>
</template>
<script>
    import OptionSimple from '@/components/addons/options/OptionSimple.vue';
    import { mapState } from 'vuex';
    export default {
        props: ['data'],
        computed: {
            labelOpciones() {
                return  `Opciones (${this.data.options.length})`;
            },
            ...mapState(['Questions'])
        },
        data() {
            return {
                options: this.data.options
            }
        },
        methods: {
            add: function () {
                this.data.btnAdd.isShow = false;
                this.data.btnRemove.isShow = true;
                let id = this.getId();
                let data = {
                    id: id,
                    isOptionEdit: true,
                    questionType: 1,
                    time: 1,
                    points: 1,
                    btnAdd: {
                        isShow: true
                    },
                    btnRemove: {
                        isShow: true
                    },
                    options: [
                        {
                            value: '',
                            title: '',
                            btnAdd: {
                                isShow: true
                            },
                            btnRemove: {
                                isShow: false
                            }
                        }
                    ]
                }
                this.Questions.push(data);
            },
            remove: function () {
                this.validateLastQuestion();
                let index = this.Questions.findIndex(x => x.id === this.data.id);
                if (index > -1) this.Questions.splice(index, 1);
                this.validateFirstQuestion();
            },
            validateFirstQuestion: function () {
                if (this.Questions.length === 1) {
                    let question = this.Questions[0];
                    question.btnAdd.isShow = true;
                    question.btnRemove.isShow = false;
                }
            },
            validateLastQuestion: function () {
                let currentLength = this.Questions.length;
                let beforeLength = this.Questions.length - 1;
                if (currentLength >= 2) {
                    let question = this.Questions[currentLength - 1].id
                    if (question === this.data.id) {
                        question = this.Questions[beforeLength - 1];
                        question.btnRemove.isShow = true;
                        question.btnAdd.isShow = true;
                    }
                }
            },
            getId: function () {
              return 'question_' + Math.random().toString(36).substr(2, 9);
            },
        },
        components: {
            OptionSimple
        }
    }
</script>
<style lang="scss" scoped>
     .question-btn-right-top{
        position:absolute;
        top: -1.35rem;
        right: -1.5rem;
    }
    .question-btn-right-bottom{
        position:absolute;
        top: 2rem;
        right: -1.5rem;
    }
    .btn-add{
        height: 48px;
        width: 48px;
        background-color: #20C125;
        border-radius: 50% 50%;
        border-color: #fff;
        border-width: 2.5px;
        border-style: solid;
        background-image: url(../assets/icons/plus.png);
        background-position-x:center;
        background-position-y: center;
        background-repeat: no-repeat;
        cursor: pointer;
        transition: transform 1s;
    }
    .btn-remove{
        height: 48px;
        width: 48px;
        background-color: #F15252;
        border-radius: 50% 50%;
        border-color: #fff;
        border-width: 2.5px;
        border-style: solid;
        background-image: url(../assets/icons/delete-small-white.png);
        background-position-x:center;
        background-position-y: center;
        background-repeat: no-repeat;
        cursor: pointer;
        transition: transform 1s;
    }
    .btn-rotate-180:hover{
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
    }
    .btn-rotate-360:hover{
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
    }
    .dashed{
        border-bottom:dashed !important;
        border:hidden;
        border-width: 1px !important;
        border-color: #A4A4A4;
    }
    .question-content {
        margin: 2rem 0;
        padding: 2rem 2rem 1.5rem 2rem;
        border-width: 1px;
        border-style: solid;
        border-color: #A4A4A4;
        border-radius: 1rem;
        position: relative;
    }
    
    .question-content > .btn-add, .btn-remove{
        opacity: 0;
        transition: 1s;
        -webkit-transition: 1s;
        -o-transition: 1s;
        -moz-transition: 1s;
    }

    .question-content:hover > .btn-add{
        opacity: 1;
    }

    .question-content:hover > .btn-remove{
        opacity: 1;
    }

    .question-content > .options{
        overflow-x: auto;
    }
    .options-group{
        /*margin-top: 2rem;*/
        display: flex;
    }
    .question-detail {
        display: flex;
        flex-wrap: wrap;
    }
    .scroll-x{
        overflow-x: auto;
    }
     .scroll-h-style-1::-webkit-scrollbar-track
    {
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
        -moz-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
	    background-color: #F5F5F5;
	    border-radius: 10px;
    }

    .scroll-h-style-1::-webkit-scrollbar
    {
        height: 10px;
	    background-color: #F5F5F5;
    }

    .scroll-h-style-1::-webkit-scrollbar-thumb
    {
	    border-radius: 10px;
	    background-color: #FFF;
	    background-image: -webkit-gradient(linear,
									       40% 0%,
									       75% 84%,
									       from(#DEDEDE),
									       to(#DEDEDE),
									       color-stop(.9,#DEDEDE))
    }
</style>