<template>
  <div class="q-pa-md">
      <q-carousel style="height:300px"
        animated
        v-model="slide"
        arrows
        navigation
        control-color="black"
        infinite

      >
        <q-carousel-slide :name="1" v-bind:img-src="produto.img1" />
        <q-carousel-slide :name="2" v-bind:img-src="produto.img2" />
        <q-carousel-slide :name="3" v-bind:img-src="produto.img3" />
        <q-carousel-slide :name="4" v-bind:img-src="produto.img4" />
      </q-carousel>
      <br/>
      <h4>R${{produto.preco}} </h4>

      <q-item v-if="!favorito" active clickable v-ripple class="tive" @click="favoritar">
        <h4><span class="heart"><q-icon name="far fa-heart"  /></span></h4>
      </q-item>

      <span>Anunciado em: {{produto.create_at}}</span>
      <hr/>
      <br/>
      <span>Descricao</span>
      <p>{{produto.descricao}}</p>
      <br>
      <hr>
      <br>
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6"> -- Sobre vendedor -- </div>
          <div class="text-subtitle2">{{ user.first_name}}</div>
          <div class="text-subtitle2">Localizado: {{ user.bairro}}</div>
        </q-card-section>

        <q-card-section>
          Cell / WhatsApp: {{ user.fone}}
          <br>
          {{ user.email }}
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn flat>Veja mais produtos do {{ user.first_name}}!!</q-btn>
        </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['product'],
  data () {
    return {
      produto: {},
      slide: 1,
      user: {},
      favorito: false
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
    axios.get(`https://share-tech.herokuapp.com/api/product/${this.product}/`)
      .then(response => {
        this.produto = response.data
        // GET DENTRO DO GET PARA PEGAR O DATA E PASSAR ID DO VENDEDOR NA URL
        axios.get(`https://share-tech.herokuapp.com/api/user/${this.produto.vendedor}/`)
          .then(response => {
            this.user = response.data
          })
          .catch(error => {
            console.log(error)
            this.$router.push('/Error404')
          })
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/Error404')
      })
    axios.get(`https://share-tech.herokuapp.com/api/favoritos/${this.id}`)
      .then(response => {
        var result = response.data
        for (var i = 0; i < response.data.length; i++) {
          if (result[i].produto === this.product) { this.favorito = true; break } else { this.favorito = false }
        }
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/Error404')
      })
  },
  methods: {
    favoritar () {
      let form = new FormData()
      form.append('user', this.id)
      form.append('produto', this.product)
      axios.post(`https://share-tech.herokuapp.com/api/favorito/`, form)
        .then(response => {
          this.$q.notify('Adicionado aos favoritos')
          this.favorito = true
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .tive {
    margin-left: -19px;
    width: 50px;
  }
  .heart {
    color: red;
    text-shadow: 1px 1px 1px #ccc;
  }
</style>
