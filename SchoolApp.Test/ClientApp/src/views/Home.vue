<template>
    <b-container class="home">
        <b-row>
            <b-col cols="12">
                <b-form-input class="dashed mb-2" placeholder="INGRESAR TÍTULO DE LA EVALUACIÓN"></b-form-input>
                <div class="detail d-flex flex-wrap">
                    <div class="d-flex flex-wrap align-items-center">
                        <div class="question-info users d-flex mr-5" v-if="Guests.length > 0">
                            <label class="mr-2 my-auto">Usuarios: </label>
                            <div class="mt-lg-0 mt-2">
                                <div>
                                    <component is="guest-horizontal"
                                               v-for="(item, index) in limitGuests"
                                               :data="item"
                                               :index="index"
                                               :key="index">
                                    </component>
                                    <b-avatar button size="2em" text="..." v-b-modal.modal-user-search></b-avatar>
                                </div>
                            </div>
                        </div>
                        <div class="question-info users d-flex mr-5" v-else>
                            <label class="mr-2 my-auto text-danger">Sin invitados </label>
                        </div>
                        <div class="question-totals d-flex flex-wrap">
                            <div class="question-info mr-5">
                                <label class="mr-1 my-auto">Puntos Total: </label>
                                <label class="mb-0">{{totalPoints}}</label>
                            </div>
                            <div class="question-info mr-5">
                                <label class="mr-1 my-auto">Tiempo Total: </label>
                                <label class="mb-0">{{totalTime}} min</label>
                            </div>
                            <div class="question-info">
                                <label class="mr-1 my-auto">Preguntas: </label>
                                <label class="mb-0">{{totalQuestions}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="question-status ml-auto">
                        <label>Estado: </label>
                        <switch-simple class="ml-3"></switch-simple>
                    </div>
                </div>
                <div class="scroll-y scroll-style-1">
                    <component is="question"
                               v-for="item in Questions"
                               :data="item"
                               :key="item.id">
                    </component>
                </div>
                <b-avatar button icon="person-plus-fill" size="3.5em" class="float-button" variant="primary" v-b-modal.modal-user-register></b-avatar>

                <!--Bootstrap User List-->
                <b-modal id="modal-user-search" centered title="Invitados" cancel-title="Cerrar" ok-title="Aceptar">
                    <div v-if="Guests.length > 0">
                        <component is="guest-vertical"
                                   v-for="(item, index) in Guests"
                                   :data="item"
                                   :index="index"
                                   :key="index">
                        </component>
                    </div>
                    <b-form-text v-else>
                        No hay usuarios invitados
                    </b-form-text>
                </b-modal>
                <!--Bootstrap User Register-->
                <b-modal id="modal-user-register" centered :title="titleUserRegister" cancel-title="Cerrar" ok-title="Aceptar">
                    <b-form-tags no-outer-focus class="mb-2">
                        <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
                            <b-input-group class="mb-2">
                                <b-form-input v-bind="inputAttrs"
                                              v-model="guestEmail"
                                              v-on="inputHandlers"
                                              placeholder="usuario@correo.com"
                                              class="form-control">
                                </b-form-input>
                                <b-input-group-append>
                                    <b-button @click="addGuest()" variant="primary" :disabled="disableBtnAdd">+</b-button>
                                </b-input-group-append>
                                <b-form-invalid-feedback :state="state">
                                    Ya existe un invitado con este correo
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback :state="inputEmail">
                                    Formato de email incorrecto
                                </b-form-invalid-feedback>
                            </b-input-group>
                            <div v-if="Guests.length > 0" id="guest-vertical">
                                <component is="guest-vertical"
                                           v-for="(item, index) in Guests"
                                           :data="item"
                                           :index="index"
                                           :key="index">
                                </component>
                            </div>
                            <b-form-text v-else>
                               No hay usuarios invitados
                            </b-form-text>
                        </template>
                    </b-form-tags>
                </b-modal>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>// @ is an alias to /src
    import SwitchSimple from '@/components/addons/switches/SwitchSimple.vue';
    import Question from '@/components/Question.vue';
    import GuestHorizontal from '@/components/GuestHorizontal.vue';
    import GuestVertical from '@/components/GuestVertical.vue';
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                guestEmail: ""
              }
        },
        computed: {
            totalPoints() {
                let total = 0;
                this.Questions.forEach(function (item) {
                    total += item.points;
                });
                return total;
            },
            totalTime() {
                let total = 0;
                this.Questions.forEach(function (item) {
                    total += item.time;
                });
                return total;
            },
            totalQuestions() {
                return this.Questions.length;
            },
            limitGuests() {
                if (this.Guests.length >= 4)
                    return this.Guests.slice(0, 4);
                else return this.Guests;
            },
            guestEmails() {
                return this.Guests.map((item) => item.Email);
            },
            state() {
                // Return false (invalid) if new tag is a duplicate
                return this.guestEmails.indexOf(this.guestEmail.trim()) > -1 ? false : null
            },
            inputEmail() {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.guestEmail) || this.guestEmail.length === 0)
                      return true
                  else return false;
            },
            disableBtnAdd() {
                  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.guestEmail)  && this.guestEmails.indexOf(this.guestEmail.trim()) === -1)
                      return false
                  else return true;
            },
            titleUserRegister() {
                return `Lista de Invitados (${this.Guests.length})`;
            },
            ...mapState(['Questions','Guests','Users'])
        },
        methods: {
            addGuest() {
                let userTemp = {
                    Names: '',
                    LastName: '',
                    Email: this.guestEmail
                };
                let user = this.Guests.find(x => x.Email === this.guestEmail);
                if (!user && this.guestEmail.length > 0) {
                    user = this.Users.find(x => x.Email === this.guestEmail);
                    if (user) this.Guests.push(user);
                    else this.Guests.push(userTemp);
                    this.guestEmail = "";
                }
            }
        },
        components: {
            SwitchSimple,
            Question,
            GuestHorizontal,
            GuestVertical
        }
    }
</script>

<style>
    .home{
        margin-top: 1rem;
    }
    .detail{
        margin-top: 2.5rem;
    }
    .scroll-y{
        overflow-y: auto;
        padding: 0 1.5rem;
        /*max-height: 85vh;*/
    }
     .dashed{
        border-bottom:dashed !important;
        border:hidden;
        border-width: 1px !important;
        border-color: #A4A4A4;
    }
    .scroll-style-1::-webkit-scrollbar-track
    {
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
        -moz-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
	    background-color: #F5F5F5;
	    border-radius: 10px;
    }

    .scroll-style-1::-webkit-scrollbar
    {
	    width: 10px;
	    background-color: #F5F5F5;
    }

    .scroll-style-1::-webkit-scrollbar-thumb
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
    .members{
       margin-top: 1rem;
     
    }
    .members-list{
        overflow-y: auto;
        max-height: 50vh;
    }
    .members-actions{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
    }
    #member-add{
        margin-left: auto;
    }
    #member-title{
        color: #707070;
        font-size: 20px;
    }
    #member-add > #user-add{
        background-image: url(../assets/icons/account-plus.png);
        background-size: cover;
        background-repeat: no-repeat;
        width: 24px;
        height: 24px;
        cursor:pointer;
    }

    .question-status{
        width: auto;
        display: flex;
        flex-wrap: wrap;
    }
    .question-info{
        width: auto;
        display: flex;
        flex-wrap: wrap;
    }
    .question-info > label{
        font-size: 16px;
    }
    .float-button
    {
        right: 0;
        bottom: 0;
        margin: 2rem;
        position: fixed;
    }
    /*
        Esto evita buscar hijo por hijo desde #modal-user-search hasta el último hijo del modal
        Modal: modal-user-search
    */
    #modal-user-search div[class="modal-body"]{
        max-height:75vh;
        overflow-y: auto;
    }

    #modal-user-search div[class="modal-body"]::-webkit-scrollbar-track
    {
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
        -moz-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
	    background-color: #F5F5F5;
	    border-radius: 10px;
    }

    #modal-user-search div[class="modal-body"]::-webkit-scrollbar
    {
	    width: 10px;
	    background-color: #F5F5F5;
    }

    #modal-user-search div[class="modal-body"]::-webkit-scrollbar-thumb
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
    /*
        Esto evita buscar hijo por hijo desde #modal-user-search hasta el último hijo del modal
        Modal: modal-user-register
    */
     #modal-user-register div[id="guest-vertical"]{
        max-height:35vh;
        overflow-y: auto;
    }

    #modal-user-register div[id="guest-vertical"]::-webkit-scrollbar-track
    {
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
        -moz-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
	    background-color: #F5F5F5;
	    border-radius: 10px;
    }

    #modal-user-register div[id="guest-vertical"]::-webkit-scrollbar
    {
	    width: 10px;
	    background-color: #F5F5F5;
    }

    #modal-user-register div[id="guest-vertical"]::-webkit-scrollbar-thumb
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
@media (max-width: 575.98px) { 
    .detail{
        padding: 0 2rem;
    }
    .question-info{
        width: 100%;
        margin-bottom: .7rem;
    }
    .question-status{
        width: 100%;
        margin-top: auto !important;
    }
     .question-info + .users{
        margin-top: .4rem !important;
    }
    .question-totals{
       margin-top: .2rem !important;
   }
}

/* Small devices (landscape phones, less than 768px)*/
@media (max-width: 767.98px) { 
    .question-info{
        width: 100%;
        margin-bottom: .7rem;
    }
    .question-info + .users{
        margin-bottom: .7rem !important;
    }
    .question-status{
        margin-top: .5rem !important;
    }
    .question-totals{
       margin-top: .2rem !important;
   }
}

/* Medium devices (tablets, less than 992px) */
@media (max-width: 991.98px) {
    .question-info + .users{
        margin-top: 1rem;
    }
     .question-status{
        margin-right: auto;
        margin-left: 0 !important;
        margin-top: 1rem;
    }
    .question-totals{
       margin-top: 1rem;
   }
}

/* Large devices (desktops, less than 1200px) */
@media (max-width: 1199.98px) { 


}
</style>