<template>
  <div class="question-content">
    <div
      class="btn-add btn-rotate-180 question-btn-right-top"
      @click="add"
      v-show="data.btnAdd.isShow"
    ></div>
    <div
      class="btn-remove btn-rotate-360 question-btn-right-bottom"
      @click="remove(data.id)"
      v-show="data.btnRemove.isShow"
    ></div>
    <div class="question-detail">
      <b-form-group label="Tipo de Pregunta:" class="mr-5">
        <b-form-radio-group v-model="questionType" class="mt-2">
          <b-form-radio value="1">Pregunta Abierta</b-form-radio>
          <b-form-radio value="2">Pregunta Cerrada</b-form-radio>
          <b-form-radio value="3">Opción múltiple</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group label="Tiempo (min):" label-for="time" class="mr-5">
        <b-form-spinbutton
          v-model="time"
          id="time"
          min="1"
          max="120"
        ></b-form-spinbutton>
      </b-form-group>
      <b-form-group label="Puntos:" label-for="points">
        <b-form-spinbutton
          v-model="points"
          id="points"
          min="1"
          max="120"
        ></b-form-spinbutton>
      </b-form-group>
    </div>
    <div class="question">
      <b-form-group label="Pregunta:" label-for="question">
        <b-form-textarea
          id="question"
          class="dashed"
          rows="2"
          max-rows="5"
        ></b-form-textarea>
      </b-form-group>
    </div>
    <div class="options">
      <div v-if="questionType != 1">
        <b-form-group :label="labelOpciones" label-for="question">
          <b-form-radio-group
            name="radio-sub-component"
            class="options-group scroll-x scroll-h-style-1"
          >
            <component
              name="radio"
              is="option-simple"
              v-for="item in options"
              :parent="data"
              :data="item"
              :key="item.id"
              :type="questionType"
              :isEdit="1"
            >
            </component>
          </b-form-radio-group>
        </b-form-group>
      </div>
    </div>
  </div>
</template>
<script>
import OptionSimple from "@/components/options/OptionSimple.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  props: ["data"],
  data() {
    return {
      options: this.data.options,
      questionType: 1,
      time: 1,
      points: 1
    };
  },
  computed: {
    labelOpciones() {
      return `Opciones (${this.data.options.length})`;
    },
    ...mapState({
      questions: state => state.test.Questions
    })
  },
  watch: {
    questionType(value) {
      let id = this.data.id;
      this.updateQuestionTimeMut({ id, value });
    },
    time(value) {
      let id = this.data.id;
      this.updateQuestionTimeMut({ id, value });
    },
    points(value) {
      let id = this.data.id;
      this.updateQuestionPointsMut({ id, value });
    }
  },
  methods: {
    add() {
      this.addAct();
    },
    remove(id) {
      this.removeAct(id);
    },
    ...mapActions({
      addAct: "test/addQuestion",
      removeAct: "test/removeQuestion"
    }),
    ...mapMutations({
      updateQuestionTypeMut: "test/updateQuestionType",
      updateQuestionTimeMut: "test/updateQuestionTime",
      updateQuestionPointsMut: "test/updateQuestionPoints"
    })
  },
  components: {
    OptionSimple
  }
};
</script>
<style>
.question-btn-right-top {
  position: absolute;
  top: -1.35rem;
  right: -1.5rem;
}
.question-btn-right-bottom {
  position: absolute;
  top: 2rem;
  right: -1.5rem;
}
.btn-add {
  height: 48px;
  width: 48px;
  background-color: #20c125;
  border-radius: 50% 50%;
  border-color: #fff;
  border-width: 2.5px;
  border-style: solid;
  background-image: url(~assets/icons/plus.png);
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: transform 1s;
}
.btn-remove {
  height: 48px;
  width: 48px;
  background-color: #f15252;
  border-radius: 50% 50%;
  border-color: #fff;
  border-width: 2.5px;
  border-style: solid;
  background-image: url(~assets/icons/delete-small-white.png);
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: transform 1s;
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
.dashed {
  border-bottom: dashed !important;
  border: hidden;
  border-width: 1px !important;
  border-color: #a4a4a4;
}
.question-content {
  margin: 2rem 0;
  padding: 2rem 2rem 1.5rem 2rem;
  border-width: 1px;
  border-style: solid;
  border-color: #a4a4a4;
  border-radius: 1rem;
  position: relative;
}

.question-content > .btn-add,
.btn-remove {
  opacity: 0;
  transition: 1s;
  -webkit-transition: 1s;
  -o-transition: 1s;
  -moz-transition: 1s;
}

.question-content:hover > .btn-add {
  opacity: 1;
}

.question-content:hover > .btn-remove {
  opacity: 1;
}

.question-content > .options {
  overflow-x: auto;
}
.options-group {
  /*margin-top: 2rem;*/
  display: flex;
}
.question-detail {
  display: flex;
  flex-wrap: wrap;
}
.scroll-x {
  overflow-x: auto;
}
.scroll-h-style-1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 10px;
}

.scroll-h-style-1::-webkit-scrollbar {
  height: 10px;
  background-color: #f5f5f5;
}

.scroll-h-style-1::-webkit-scrollbar-thumb {
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
</style>
