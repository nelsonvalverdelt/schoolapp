export const  state = () => ({
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
      }
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

      }
    ],
    variants: [
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'dark'
    ]
});

export const mutations = {
  addGuest(state, email) {
    let userTemp = {
      Names: '',
      LastName: '',
      Email: email
    };
    let user = state.Guests.find(x => x.Email === email);
    if (!user && email.length > 0) {
      user = state.Users.find(x => x.Email === email);
      if (user) state.Guests.push(user);
      else state.Guests.push(userTemp);
    }
  },
  addQuestion(state, data) {
    let currentQuestion = state.Questions[state.Questions.length - 1];
    currentQuestion.btnAdd.isShow = false;
    currentQuestion.btnRemove.isShow = true;
    state.Questions.push(data);
  },
  addOption(state, { data, questionId }) {
    let question = state.Questions.find(x => x.id === questionId);
    let currentOption = question.options[question.options.length - 1];
    currentOption.btnAdd.isShow = false;
    currentOption.btnRemove.isShow = true;
    question.options.push(data);
  },
  removeGuest(state, id) {
    state.Guests.splice(id, 1);
  },
  removeQuestion(state, id) {
    let index = state.Questions.findIndex(x => x.id === id);
    if (index > -1) state.Questions.splice(index, 1);
  },
  removeOption(state, { id, questionId }) {
    let question = state.Questions.find(x => x.id === questionId);
    let index = question.options.findIndex(x => x.id === id);
    if (index > -1) question.options.splice(index, 1);
  },
  validateQuestion(state, id) {
    let currentLength = state.Questions.length;
    let question = null;
    if (currentLength === 1)
    {
      question = state.Questions[0];
      question.btnAdd.isShow = true;
      question.btnRemove.isShow = false;
    }
    if (currentLength >= 2)
    {
      let beforeLength = state.Questions.length - 1;
      let questionId = state.Questions[currentLength - 1].id;
      if (questionId === id) {
        question = state.Questions[beforeLength - 1];
        question.btnRemove.isShow = true;
        question.btnAdd.isShow = true;
      }
    }
  },
  validateOption(state, { id, questionId }) {
    let question = state.Questions.find(x => x.id === questionId);
    let currentLength = question.options.length;
    let option = null;
    if (currentLength === 1) {
      option = question.options[0];
      option.btnAdd.isShow = true;
      option.btnRemove.isShow = false;
    }
    if (currentLength >= 2) {
      let beforeLength = question.options.length - 1;
      let optionId = question.options[currentLength - 1].id;
      if (optionId === id) {
        option = question.options[beforeLength - 1];
        option.btnRemove.isShow = true;
        option.btnAdd.isShow = true;
      }
    }
  },
  updateQuestionType(state, { id, value }) {
    let question = state.Questions.find(x => x.id === id);
    question.questionType = value;
  },
  updateQuestionTime(state, { id, value}) {
    let question = state.Questions.find(x => x.id === id);
    question.time = value;
  },
  updateQuestionPoints(state, { id, value}) {
    let question = state.Questions.find(x => x.id === id);
    question.points = value;
  },
};

export const actions = {
  //async
  addGuest: function ({ commit }, email) {
    commit('addGuest', email);
  },
  addQuestion: function ({ commit }) {
    let data = {
      id: 'question_' + Math.random().toString(36).substr(2, 9),
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
    };
    commit('addQuestion', data);
  },
  addOption: function ({ commit }, questionId) {
    let data =
    {
      id: 'option_' + Math.random().toString(36).substr(2, 9),
      value: '',
      title: '',
      btnAdd: {
        isShow: true
      },
      btnRemove: {
        isShow: true
      }
    };
    commit('addOption', { data, questionId });
  },
  removeGuest: function ({ commit }, id) {
    commit('removeGuest', id);
  },
  removeQuestion: function ({ commit }, id) {
    commit('removeQuestion', id);
    commit('validateQuestion', id);
  },
  removeOption: function ({ commit }, { id, questionId }) {
    commit('removeOption', { id, questionId });
    commit('validateOption', { id, questionId });
  }
};
