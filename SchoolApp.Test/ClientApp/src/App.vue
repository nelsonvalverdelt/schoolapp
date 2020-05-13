<template>
  <div id="app">
      <div id="nav">
          <div>
              <b-navbar toggleable="lg" class="navbar-bg">
                  <b-navbar-brand href="#" class="text-white">SchoolApp</b-navbar-brand>

                  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                  <b-collapse id="nav-collapse" is-nav>
                      <b-navbar-nav>
                          <b-link to="/">Crear</b-link>
                          <b-link to="/about">Mis Evaluaciones</b-link>
                      </b-navbar-nav>

                      <!-- Right aligned nav items -->
                      <b-navbar-nav class="ml-auto">
                          <b-nav-item-dropdown right>
                              <!-- Using 'button-content' slot -->
                              <template v-slot:button-content>
                                  <em>User</em>
                              </template>
                              <b-dropdown-item href="#">Perfil</b-dropdown-item>
                              <b-dropdown-item href="#">Desconectar</b-dropdown-item>
                          </b-nav-item-dropdown>
                      </b-navbar-nav>
                  </b-collapse>
              </b-navbar>
          </div>
      </div>
        <router-view />
  </div>
</template>

<script>
   
</script>
<style>


#nav a {
    padding-right: .5rem;
    padding-left: .5rem;
    color: #84a2c1;
}
#nav a.router-link-exact-active {
  color: #fff;
}
.navbar-bg{
    background-color: #004085 !important;
}
</style>
