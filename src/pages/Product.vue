<template>
  <div class="q-pa-md">
      <q-carousel style="height:300px"
        animated
        v-model="slide"
        arrows
        navigation

      >
        <q-carousel-slide :name="1" v-bind:img-src="produto.img" />
        <q-carousel-slide :name="2" v-bind:img-src="produto.img2" />
        <q-carousel-slide :name="3" v-bind:img-src="produto.img3" />
        <q-carousel-slide :name="4" v-bind:img-src="produto.img4" />
        <q-carousel-slide :name="4" v-bind:img-src="produto.img5" />
      </q-carousel>
      <br/>
      <h4>R${{produto.preco}}</h4>
      <span>{{produto.create_at}}</span>
      <hr/>
      <br/>
      <span>Descricao</span>
      <p>{{produto.descricao}}</p>
      <br>
      <hr>
      <br>
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">Sobre vendedor</div>
          <div class="text-subtitle2">** Nome Vendedor **</div>
        </q-card-section>

        <q-card-section>
          {{ produto.descricao }}
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn flat>Lojinha!</q-btn>
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
      slide: 1
    }
  },
  created () {
    axios.get(`http://192.168.0.101:8000/api/product/${this.product}/`)
      .then(response => {
        this.produto = response.data
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/Error404')
      })
  }
}
</script>

<style lang="scss">
</style>
