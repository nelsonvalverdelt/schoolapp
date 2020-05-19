export const state = () => ({
  menu: {
    active: true,
  },
  variants: [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark'
  ],
});
export const mutations = {
  setMenuState(state, value) {
    state.menu.active = value;
  }
}
