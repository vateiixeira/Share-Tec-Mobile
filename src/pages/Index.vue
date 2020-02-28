<template>
  <q-page class="q-pa-md">
    <div class="row ">
      <div class="col-grow">
      <q-select
      rounded outlined
      v-model="select"
      use-input
      use-chips
      multiple
      hide-dropdown-icon
      input-debounce="0"
      new-value-mode="add-unique"
      style="margin-bottom: 10px"
      label="Digite as palavras chaves para buscar o produto:"
      @input="upperCase(select)"
      /></div>
      <div class="col-shrink">
        <q-btn round color="secondary" icon="directions" style="margin-top: 10px; margin-left: 5px"
        @click="filtrar"
        />
      </div>
    </div>

    <q-list v-bind:key="i.id" v-for="i in filtrados" bordered padding>
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
            <br>
            ** lugar para colocar mais coisas
          </q-item-label>
        </q-item-section>
        <!-- <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section> -->
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PageIndex',
  data () {
    return {
      itens: null,
      filtrados: null,
      select: null,
      buscar: null
    }
  },
  created () {
    axios.get(`http://192.168.0.101:8000/api/product/`)
      .then(response => {
        this.itens = response.data
        this.filtrados = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    filtrar () {
      const items = this.itens
      if (this.buscar === null) {
        this.filtrados = this.itens
        return this.filtrados
      } else if (this.buscar.length === 0) {
        this.filtrados = this.itens
        return this.filtrados
      } else {
        const result = items.filter(item => this.buscar.includes(item.categoria) || this.buscar.includes(item.modelo) || this.buscar.includes(item.marca))
        this.filtrados = result
        return result
      }
    },
    upperCase (value) {
      value = value.toString()
      value = value.toUpperCase()
      this.buscar = value
    }
  }

}
</script>
