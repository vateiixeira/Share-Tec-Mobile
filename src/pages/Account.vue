<template>
<div class="q-pa-md">
    <q-btn color="white" text-color="green" label="Salvar" @click="enviar" />

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
  computed: {
    id: {
      get () {
        return this.$store.state.logado.id
      }

    }
  },
  created () {
    axios.get(`http://192.168.1.5:8000/api/user/${this.id}/`)
      .then(response => {
        this.cep = response.data.cep
        this.nome = response.data.first_name
        this.email = response.data.email
        this.phone = response.data.fone
        this.numero = response.data.num_rua
        this.nick = response.data.username
        this.data.logradouro = response.data.rua
        this.data.bairro = response.data.bairro
        this.data.localidade = response.data.cidade
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    searchCep () {
      if (this.cep.length === 8) {
        axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
          .then(response => {
            this.data = response.data
          })
          .catch(error => console.log(error))
      }
    },
    enviar () {
      var formData = new FormData()
      formData.append('cep', this.cep)
      formData.append('first_name', this.nome)
      formData.append('email', this.email)
      formData.append('fone', this.phone)
      formData.append('num_rua', this.numero)
      formData.append('username', this.nick)
      formData.append('rua', this.data.logradouro)
      formData.append('bairro', this.data.bairro)
      formData.append('cidade', this.data.localidade)
      axios.put(`http://192.168.1.5:8000/api/user/${this.id}/`, formData)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.$q.notify('Dados alterados com sucesso!')
          }
        })
        .catch(error => {
          console.log(error)
        })
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
