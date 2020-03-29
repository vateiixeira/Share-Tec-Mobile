<template>
<div v-if="status">
  <q-layout view="lHh Lpr lFf">
     <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title></q-toolbar-title>
          <!-- <router-link to="filtro" class="btnFiltro">
          <q-btn flat round dense icon="fas fa-sort" />
          </router-link> -->
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

       <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >

    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>

          <router-link to="/" class="tive">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="fas fa-search" />
              </q-item-section>

              <q-item-section>
                Pesquisar
              </q-item-section>
            </q-item>
          </router-link>

          <router-link to="account" class="tive">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="fas fa-cog" />
              </q-item-section>

              <q-item-section>
                Conta
              </q-item-section>
            </q-item>
          </router-link>

        <router-link to="favoritos" class="tive" >
            <q-item active clickable v-ripple class="tive">
              <q-item-section avatar>
                <q-icon name="far fa-heart" />
              </q-item-section>

              <q-item-section>
                Favoritos
              </q-item-section>
            </q-item>
        </router-link>

        <router-link to="publish" class="tive" >
            <q-item active clickable v-ripple class="tive">
              <q-item-section avatar>
                <q-icon name="fas fa-arrow-up"  />
              </q-item-section>

              <q-item-section>
                Anunciar!
              </q-item-section>
            </q-item>
        </router-link>

        <!-- <router-link to="login" class="tive" >
            <q-item active clickable v-ripple class="tive">
              <q-item-section avatar>
                <q-icon name="fas fa-times" />
              </q-item-section>

              <q-item-section>
                Sair!
              </q-item-section>
            </q-item>
        </router-link> -->

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Vinicius Alexandre</div>
            <div>Membro Vip</div>
          </div>
        </q-img>
      </q-drawer>
      <!-- CONTEUDO DA PAGINA -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  </div>
<div v-else>
   <Login />
</div>
</template>

<script>
import Login from 'pages/Login.vue'
import { mapState } from 'vuex'

export default {
  name: 'MainLayout',
  components: {
    Login
  },
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapState('logado', ['status'])
  }
}
</script>

<style>

.tive {
  color: black;
  text-decoration: none;
}
.btnFiltro {
  color: white;
  text-decoration: none;
}

</style>
