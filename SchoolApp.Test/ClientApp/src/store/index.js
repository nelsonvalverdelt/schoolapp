import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Questions: [
            {
                id: 1,
                isOptionEdit: true,
                questionType: 1,
                time: 1,
                points: 1,
                btnAdd: {
                    isShow: true
                },
                btnRemove: {
                    isShow: false
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
        ],
        Guests: [
            {
                Names: 'Nelson',
                LastName: 'Valverde La Torre',
                Email: 'nelsonvalverdelt@gmail.com'
            },
            {
                Names: 'Cristian Eduardo',
                LastName: 'Mendoza Valverde',
                Email: 'cristian.mendoza@outlook.com'
            },
            {
                Names: 'Jorge',
                LastName: 'Castillo Leiva',
                Email: 'jorge123@gmail.com'
            },
            {
                Names: 'Roberto',
                LastName: 'Perez Rojas',
                Email: 'roboert.perez@outlook.com'
            },
        ],
        Users: [
            {
                Names: 'Nelson',
                LastName: 'Valverde La Torre',
                Email: 'nelsonvalverdelt@gmail.com'
            },
            {
                Names: 'Cristian Eduardo',
                LastName: 'Mendoza Valverde',
                Email: 'cristian.mendoza@outlook.com'
            },
            {
                Names: 'Jorge',
                LastName: 'Castillo Leiva',
                Email: 'jorge123@gmail.com'
            },
            {
                Names: 'Roberto',
                LastName: 'Perez Rojas',
                Email: 'roboert.perez@outlook.com'

            },
            {
                Names: 'Pedro',
                LastName: 'Arjona rodriguez',
                Email: 'arjona123@outlook.com'

            },
            {
                Names: 'Luis Alberto',
                LastName: 'Perez Roncada',
                Email: 'perez.roncada123@outlook.com'

            },
            {
                Names: 'Luis',
                LastName: 'Ascope Perez',
                Email: 'ascope.perezl@gmail.com'

            },
            {
                Names: 'Junior',
                LastName: 'Juarez Velarde',
                Email: 'velarde123@gmail.com'

            },
            {
                Names: 'Jose Luis',
                LastName: 'Infantez quiroz',
                Email: 'infatez.quitoz2020@gmail.com'

            },
            {
                Names: 'Jorge pablo',
                LastName: 'Alcantara Suarez',
                Email: 'suarez.alcantara123@hotmail.com'

            },
            {
                Names: 'Roberto',
                LastName: 'Perez Rojas',
                Email: 'roboert.perez@outlook.com'

            },
            {
                Names: 'Cristian luis',
                LastName: 'Asná perez',
                Email: 'cris.asna@outlook.com'

            },
            {
                Names: 'Pedro',
                LastName: 'Infantes Rodriguez',
                Email: 'pedro_infantes123@gmail.com'

            },
            {
                Names: 'Diego ',
                LastName: 'Paz perez',
                Email: 'paz.perez@outlook.com'

            },
        ],
        variants: [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'dark',
        ],
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
