<template>
  <q-page class="q-pa-md">
    <q-list v-bind:key="i.id" v-for="i in itens" bordered padding>
      <q-item-label header>{{ i.categoria }}</q-item-label>
      <router-link :to= "{ name: 'produto', params: {product: i.id } }" class="tive">
      <q-item clickable>
        <q-item-section top thumbnail class="q-ml-none">
          <img :src="i.img">
        </q-item-section>

        <q-item-section>
          <q-item-label><h6>{{ i.nome }}</h6></q-item-label>
          <q-item-label caption>
            <h6>R${{ i.preco}}</h6>
            <br/>
            Modelo:{{ i.modelo}}<br/>
            Marca:{{ i.marca}}<br/>
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

export default {
  name: 'PageIndex',
  data () {
    return {
      itens: [],
      listItens: []
    }
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
    axios.get(`http://192.168.1.5:8000/api/favoritos/${this.id}`)
      .then(response => {
        this.listItens = response.data
        // FAZ O LOOP PARA INSTANCIAR TODOS OS PRODUTOS FAVORITOS DAQUELE USUARIO QUE FEZ O PRIMEIRO GET
        for (var i = 0; i < this.listItens.length; i++) {
          axios.get(`http://192.168.1.5:8000/api/product/${this.listItens[i].produto}/`)
            .then(response => {
              this.itens.push(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/Error404')
      })
  }
}
</script>
