<template>
<q-page class="q-pa-md">
        <loading :active.sync="loading"
        :can-cancel="true"
        :on-cancel="onCancel"
        :is-full-page="fullPage">
        </loading>
    <q-list v-bind:key="i.id" v-for="i in listItens" bordered padding>
      <q-item-label header>{{ i.categoria }}</q-item-label>
      <router-link :to= "{ name: 'produto', params: {product: i.id } }" class="tive">
      <q-item clickable>
        <q-item-section top thumbnail class="q-ml-none">
          <img :src="i.img1">
        </q-item-section>

        <q-item-section>
          <q-item-label><h6>{{ i.nome }}</h6></q-item-label>
          <q-item-label caption>
            <h6>R${{ i.preco}}</h6>
            <br/>
            Marca | Modelo:{{ i.marca_modelo}}<br/>
            <span v-if="i.aceita_cartao"> Aceita cartao!! </span>
          </q-item-label>
        </q-item-section>
        <!-- <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section> -->
      </q-item>
      </router-link>
    </q-list>
  </q-page>
</template>

<script>
import axios from 'axios'
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  props: ['idUser'],
  data () {
    return {
      itens: [],
      listItens: [],
      loading: false,
      fullPage: true
    }
  },
  components: {
    Loading
  },
  computed: {
    id: {
      get () {
        return this.$store.state.logado.id
      }

    }
  },
  created () {
    // GET PARA RETORNAR USUARIO LOGADO E A LISTAGEM DOS FAVORITOS (APENAS ID DO PRODUTO É RETORNADO NO PRIMEIRO GET.)
    this.loading = true
    axios.get(`https://share-tech.herokuapp.com/api/loja/${this.id}`)
      .then(response => {
        this.listItens = response.data
        this.loading = false
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/Error404')
      })
  }
}
</script>
