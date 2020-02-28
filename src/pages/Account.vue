<template>
<div class="q-pa-md">
    <q-btn color="white" text-color="green" label="Salvar" />

    <q-input v-model="nome" label="Nome" />
    <q-input v-model="nick" label="Apelido (Nickname)" />
    <q-input v-model="email" type="email" label="E-mail"/>
    <q-input v-model="phone" label="Telefone"
      mask="(##) #####-####"
     />
     <div class="row">
      <div class="col">
        <q-input v-model="cep" label="CEP"
        :loading="loadingState"
        @keyup="searchCep()"/>
    </div>
    </div>
    <q-input v-model="data.logradouro" label="Rua" />
    <q-input v-model="data.bairro" label="Bairro" />
    <div class="row">
      <div class="col-8">
        <q-input v-model="data.localidade" label="Cidade" />
      </div>
      <div class="col">
        <q-input v-model="numero" label="Numero" type="number"/>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PageAccount',
  data () {
    return {
      loadingState: false,
      cep: '',
      nome: '',
      nick: '',
      email: '',
      phone: '',
      numero: '',
      data: ''
    }
  },
  methods: {
    searchCep () {
      if (this.cep.length === 8) {
        axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
          .then(response => {
            this.data = response.data
            console.log(this.data)
          })
          .catch(error => console.log(error))
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .row {
    margin-top 20px;
    margin-right 10px;
  }
</style>
