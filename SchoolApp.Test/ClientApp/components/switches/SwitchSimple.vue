<template>
    <div class="switch-simple">
        <input type="checkbox"
               id="switch-simple"
               :value="value"
               :required="required"
               v-on:input="updateValue($event.target.value)" />
        <label for="switch-simple"></label>
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: String
            },
            required: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            updateValue: function (value) {
                this.$emit('input', value)
            }
        }
    }
</script>
<style>
    .switch-simple {
        transform: scale(1.1);
        display: flex;
        align-items: center;
    }

    .switch-simple input {
        display: none;
    }

    .switch-simple label {
        display: block;
        height: 28px;
        width: 50px;
        border-radius: 50px;
        background: #EBEBEB; 
        cursor: pointer;
        transition: 0.2s;
    }

        .switch-simple label:before {
        content: "";
        position: absolute;
        top: 4px;
        left: 5px;
        height: 21px;
        width: 21px;
        background: #A4A4A4; /*false*/
        border-radius: 50%;
        border-radius: 16px;
        z-index: 1;
        animation: off 0.5s ease-out;
        transform-origin: 0 0;
    }

    .switch-simple input:checked + label {
        background: #EBEBEB;
    }

    .switch-simple input:checked + label:before {
        transform: translateX(18px);
        animation: on 0.5s ease-out;
        transform-origin: 100% 0;
        background: #20C125;
    }

    @keyframes off {
        0% {
            transform: translateX(18px);
        }

        20% {
            transform: translateX(13px) scaleX(1.1);
        }

        40% {
            transform: translateX(2px) scaleX(0.9);
        }

        70% {
            transform: translateX(6px) scaleX(1);
        }

        100% {
            transform: translateX(2px);
        }
    }

    @keyframes on {
        0% {
            -webkit-transform: translateX(2px);
        }

        20% {
            -webkit-transform: translateX(13px) scaleX(1.1);
        }

        40% {
            -webkit-transform: translateX(20px) scaleX(0.9);
        }

        70% {
            -webkit-transform: translateX(16px) scaleX(1);
        }

        100% {
            -webkit-transform: translateX(18px);
        }
    }

    p:nth-of-type(1) {
        font-weight: bold;
        font-size: 3em;
    }

    p:nth-of-type(2) {
        font-size: 1.3em;
    }
</style>
