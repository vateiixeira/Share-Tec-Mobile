<template>
  <q-page class="q-pa-md" >
    <div v-if="submit" class="container1" >
      <q-form class="q-gutter-md"  @submit="onSubmit"  @reset="onReset">
        <q-select standout="bg-teal text-white" v-model="categoria" :options="list_categoria" label="Tipo" />
        <q-select standout="bg-teal text-white" v-model="marca" :options="list_marca" label="Marca" />
        <q-select standout="bg-teal text-white" v-model="modelo" :options="list_modelo" label="Modelo" />
        <div class="q-pa-sm doc-container">
          <div class="row items-start" style="max-width: 300px">
            <div class="col" style="margin-top : -22px; margin-right: 0px">
            <h6 id="valor" class="valor">Valor:</h6>
            </div>
            <div class="col" style="margin-left:0%">
            <q-input v-model="de" label="De" style="width:50px"/>
            </div>
            <div class="col">
            <q-input v-model="ate" label="Ate" style="width:50px"/>
            </div>
            <div class="col"></div>
          </div>
          <q-btn color="black" label="Filtrar" class="btnFiltrar" type="submit" />
          <q-btn label="Reset" type="reset" color="btnFiltrar" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>

    <div v-else class="container1" >
      <q-list v-bind:key="i.id" v-for="i in result" bordered padding>
      <q-item-label header>{{ i.categoria }}</q-item-label>
      <q-item clickable>
        <q-item-section top thumbnail class="q-ml-none">
          <img :src="i.img">
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ i.nome }}</q-item-label>
          <q-item-label caption>
            R${{ i.preco}}
            <br/>
            {{ i.modelo}}
            <br/>
            <span v-if="i.aceita_cartao">Aceita Cartao</span>
            <span v-else>Nao aceita cartao</span>
            <br>
            ** lugar para colocar mais coisas
          </q-item-label>
        </q-item-section>
        <!-- <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section> -->
      </q-item>
    </q-list>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PageFiltro',
  data () {
    return {
      model: null,
      list_categoria: [],
      list_marca: [],
      list_modelo: [],
      itens: {},
      de: 0,
      ate: 0,
      categoria: null,
      marca: null,
      modelo: null,
      submit: true,
      result: null
    }
  },
  created () {
    axios.get(`http://localhost:8000/api/product/`)
      .then(response => {
        this.itens = response.data
        const keys = Object.values(this.itens)
        // insere os valores na lista de opcoes
        for (const key of keys) {
          this.list_categoria.push(key.categoria)
          this.list_marca.push(key.marca)
          this.list_modelo.push(key.modelo)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    itensFiltrados () {
      // object com todos os itens
      const items = this.itens
      const result = items.filter(item => item.categoria === this.categoria || item.marca === this.marca || item.modelo === this.modelo)
      return result
    },
    onSubmit () {
      this.submit = false
      this.result = this.itensFiltrados()
    },
    onReset () {
      this.categoria = []
      this.marca = []
      this.modelo = []
      this.itens = {}
      this.de = 0
      this.ate = 0
    }

  }
}
</script>

<style lang="stylus" scoped>
</style>
