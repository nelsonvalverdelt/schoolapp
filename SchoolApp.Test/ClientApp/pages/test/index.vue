<template>
  <b-container class="home">
    <b-row>
      <b-col cols="12">
        <b-form-input
          class="dashed mb-2"
          placeholder="INGRESAR TÍTULO DE LA EVALUACIÓN"
        ></b-form-input>
        <div class="detail d-flex flex-wrap">
          <div class="d-flex flex-wrap align-items-center">
            <div
              class="question-info users d-flex mr-5"
              v-if="guests.length > 0"
            >
              <label class="mr-2 my-auto">Usuarios: </label>
              <div class="mt-lg-0 mt-2">
                <div>
                  <component
                    is="guest-horizontal"
                    v-for="(item, index) in limitguests"
                    :data="item"
                    :index="index"
                    :key="index"
                  >
                  </component>
                  <b-avatar
                    button
                    size="2em"
                    text="..."
                    v-b-modal.modal-user-search
                  ></b-avatar>
                </div>
              </div>
            </div>
            <div class="question-info users d-flex mr-5" v-else>
              <label class="mr-2 my-auto text-danger">Sin invitados </label>
            </div>
            <div class="question-totals d-flex flex-wrap">
              <div class="question-info mr-5">
                <label class="mr-1 my-auto">Puntos Total: </label>
                <label class="mb-0">{{ totalPoints }}</label>
              </div>
              <div class="question-info mr-5">
                <label class="mr-1 my-auto">Tiempo Total: </label>
                <label class="mb-0">{{ totalTime }} min</label>
              </div>
              <div class="question-info">
                <label class="mr-1 my-auto">Preguntas: </label>
                <label class="mb-0">{{ totalquestions }}</label>
              </div>
            </div>
          </div>
          <div class="question-status ml-auto">
            <label>Estado: </label>
            <switch-simple class="ml-3"></switch-simple>
          </div>
        </div>
        <div class="scroll-y scroll-style-1">
          <component
            is="question"
            v-for="item in questions"
            :data="item"
            :key="item.id"
          >
          </component>
        </div>
        <b-avatar
          button
          icon="person-plus-fill"
          size="3.5em"
          class="float-button"
          variant="primary"
          v-b-modal.modal-user-register
        ></b-avatar>

        <!--Bootstrap User List-->
        <b-modal
          id="modal-user-search"
          size="lg"
          centered
          title="Invitados"
          cancel-title="Cerrar"
          ok-title="Aceptar"
        >
          <div v-if="guests.length > 0" id="guest-vertical">
            <component
              is="guest-vertical"
              v-for="(item, index) in guests"
              :data="item"
              :index="index"
              :key="index"
            >
            </component>
          </div>
          <b-form-text v-else class="my-3 text-center">
            No hay usuarios invitados
          </b-form-text>
        </b-modal>
        <!--Bootstrap User Register-->
        <b-modal
          id="modal-user-register"
          size="lg"
          centered
          :title="titleUserRegister"
          cancel-title="Cerrar"
          ok-title="Aceptar"
        >
          <b-form-tags no-outer-focus class="mb-2 border-0">
            <template
              v-slot="{
                tags,
                inputAttrs,
                inputHandlers,
                tagVariant,
                addTag,
                removeTag
              }"
            >
              <b-input-group class="mb-2">
                <b-form-input
                  v-bind="inputAttrs"
                  v-model="guestEmail"
                  v-on="inputHandlers"
                  :formatter="formatEmail"
                  placeholder="usuario@correo.com"
                  class="form-control"
                >
                </b-form-input>
                <b-input-group-append>
                  <b-button
                    @click="addGuest(guestEmail)"
                    variant="primary"
                    :disabled="disableBtnAdd"
                    >+</b-button
                  >
                </b-input-group-append>
                <b-form-invalid-feedback :state="state">
                  Ya existe un invitado con este correo
                </b-form-invalid-feedback>
              </b-input-group>
              <div v-if="guests.length > 0" id="guest-vertical">
                <component
                  is="guest-vertical"
                  class="w-100"
                  v-for="(item, index) in guests"
                  :data="item"
                  :index="index"
                  :key="index"
                >
                </component>
              </div>
              <b-form-text v-else class="my-4 text-center">
                No hay usuarios invitados
              </b-form-text>
            </template>
          </b-form-tags>
        </b-modal>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import SwitchSimple from "@/components/switches/SwitchSimple.vue";
import Question from "@/components/Question.vue";
import GuestHorizontal from "@/components/GuestHorizontal.vue";
import GuestVertical from "@/components/GuestVertical.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  layout: "test",
  data() {
    return {
      guestEmail: ""
    };
  },
  computed: {
    totalPoints() {
      let total = 0;
      this.questions.forEach(function(item) {
        total += item.points;
      });
      return total;
    },
    totalTime() {
      let total = 0;
      this.questions.forEach(function(item) {
        total += item.time;
      });
      return total;
    },
    totalquestions() {
      return this.questions.length;
    },
    limitguests() {
      if (this.guests.length >= 4) return this.guests.slice(0, 4);
      else return this.guests;
    },
    guestEmails() {
      return this.guests.map(item => item.Email);
    },
    state() {
      // Return false (invalid) if new tag is a duplicate
      return this.guestEmails.indexOf(this.guestEmail.trim()) > -1
        ? false
        : null;
    },
    disableBtnAdd() {
      if (
        this.guestEmails.indexOf(this.guestEmail.trim()) === -1 &&
        this.guestEmail.length > 0
      )
        return false;
      else return true;
    },
    titleUserRegister() {
      return `Lista de Invitados (${this.guests.length})`;
    },
    ...mapState({
      questions: state => state.test.Questions,
      guests: state => state.test.Guests,
      users: state => state.test.Users
    })
  },
  methods: {
    addGuest() {
      this.addGuestAction(this.guestEmail);
      this.guestEmail = "";
    },
    formatEmail(value) {
      return String(value).substring(0, 60);
    },
    ...mapActions({
      addGuestAction: "test/addGuest"
    })
  },
  components: {
    SwitchSimple,
    Question,
    GuestHorizontal,
    GuestVertical
  }
};
</script>

<style scoped>
.home {
  margin-top: 1rem;
}

.detail {
  margin-top: 2.5rem;
}

.scroll-y {
  overflow-y: auto;
  padding: 0 1.5rem;
}

.dashed {
  border-bottom: dashed !important;
  border: hidden;
  border-width: 1px !important;
  border-color: #a4a4a4;
}

.scroll-style-1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 10px;
}

.scroll-style-1::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.scroll-style-1::-webkit-scrollbar-thumb {
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

.members {
  margin-top: 1rem;
}

.members-list {
  overflow-y: auto;
  max-height: 50vh;
}

.members-actions {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

#member-add {
  margin-left: auto;
}

#member-title {
  color: #707070;
  font-size: 20px;
}

#member-add > #user-add {
  background-image: url(~assets/icons/account-plus.png);
  background-size: cover;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.question-status {
  width: auto;
  display: flex;
  flex-wrap: wrap;
}

.question-info {
  width: auto;
  display: flex;
  flex-wrap: wrap;
}

.question-info > label {
  font-size: 16px;
}

.float-button {
  right: 0;
  bottom: 0;
  margin: 2rem;
  position: fixed;
}
/*
        Esto evita buscar hijo por hijo desde #modal-user-search hasta el último hijo del modal
        Modal: modal-user-search
    */
#modal-user-search div[id="guest-vertical"] {
  max-height: 75vh;
  overflow-y: auto;
}

#modal-user-search div[id="guest-vertical"]::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 10px;
}

#modal-user-search div[id="guest-vertical"]::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f5f5f5;
}

#modal-user-search div[id="guest-vertical"]::-webkit-scrollbar-thumb {
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
/*
        Esto evita buscar hijo por hijo desde #modal-user-search hasta el último hijo del modal
        Modal: modal-user-register
    */
#guest-vertical {
  display: flex;
  flex-wrap: wrap;
}

#modal-user-register div[id="guest-vertical"] {
  max-height: 35vh;
  overflow-y: auto;
}

#modal-user-register div[id="guest-vertical"]::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 10px;
}

#modal-user-register div[id="guest-vertical"]::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f5f5f5;
}

#modal-user-register div[id="guest-vertical"]::-webkit-scrollbar-thumb {
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

@media (max-width: 575.98px) {
  .detail {
    padding: 0 2rem;
  }

  .question-info {
    width: 100%;
    margin-bottom: 0.7rem;
  }

  .question-status {
    width: 100%;
    margin-top: auto !important;
  }

  .question-info + .users {
    margin-top: 0.4rem !important;
  }

  .question-totals {
    margin-top: 0.2rem !important;
  }
}

/* Small devices (landscape phones, less than 768px)*/
@media (max-width: 767.98px) {
  .question-info {
    width: 100%;
    margin-bottom: 0.7rem;
  }

  .question-info + .users {
    margin-bottom: 0.7rem !important;
  }

  .question-status {
    margin-top: 0.5rem !important;
  }

  .question-totals {
    margin-top: 0.2rem !important;
  }
}

/* Medium devices (tablets, less than 992px) */
@media (max-width: 991.98px) {
  .question-info + .users {
    margin-top: 1rem;
  }

  .question-status {
    margin-right: auto;
    margin-left: 0 !important;
    margin-top: 1rem;
  }

  .question-totals {
    margin-top: 1rem;
  }
}

/* Large devices (desktops, less than 1200px) */
@media (max-width: 1199.98px) {
}
</style>
