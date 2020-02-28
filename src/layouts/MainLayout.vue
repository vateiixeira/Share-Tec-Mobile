<template>
  <q-layout view="lHh Lpr lFf">
     <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Share Tech</q-toolbar-title>
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
            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="far fa-heart" />
              </q-item-section>

              <q-item-section>
                Favoritos
              </q-item-section>
            </q-item>
        </router-link>

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
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      drawer: false
    }
  }
}
</script>

<style lang="stylus">

.tive {
  color: black;
  text-decoration: none;
}
.btnFiltro {
  color: white;
  text-decoration: none;
}

</style>
