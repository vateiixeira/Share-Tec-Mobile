<template>
<div class="q-pa-md">

  <q-avatar>
      <img v-if="!avatarNulo" :src="this.$store.state.logado.avatar">
    </q-avatar>
    <q-btn v-if="!avatarNulo" class="avatar-btn" color="white" text-color="black" label="Trocar! " @click="captureImage" />
    <q-btn v-if="avatarNulo" class="avatar-btn" color="white" text-color="black" label="Insira uma foto do perfil!" @click="captureImage" />
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
    <q-btn class="btn-salvar" color="white" text-color="green" label="Salvar" @click="enviar" />
</div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

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
      data: [],
      images: [],
      imgUpload: [],
      avatar: '',
      avatarNulo: false
    }
  },
  computed: {
    ...mapState('logado', ['status', 'avatar', 'username']),
    id: {
      get () {
        return this.$store.state.logado.id
      }

    }
  },
  created () {
    this.getAvatar()
    axios.get(`https://share-tech.herokuapp.com/api/user/${this.id}/`)
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
        console.log(response.data)
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
      axios.put(`https://share-tech.herokuapp.com/api/user/${this.id}/`, formData)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.$q.notify('Dados alterados com sucesso!')
            this.$store.state.logado.username = response.data.username
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    postImage (form) {
      axios.put(`https://share-tech.herokuapp.com/api/change_avatar/user/${this.id}`, form)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.$store.state.logado.avatar = response.data.avatar
            this.$q.notify('Foto alterada!')
          }
        })
        .catch(error => {
          console.log(error)
          this.$q.notify('Error!')
        })
    },
    criarAvatar (form) {
      axios.post(`https://share-tech.herokuapp.com/api/avatar/`, form)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.$store.state.logado.avatar = response.data.avatar
            this.$q.notify('Foto alterada!')
          }
        })
        .catch(error => {
          console.log(error)
          this.$q.notify('Error!')
        })
    },
    captureImage () {
      navigator.camera.getPicture(
        data => { // on success
          this.images.push('data:image/jpeg;base64,' + data)
          const blob = this.getBlob(data, 'image/jpeg')
          this.imgUpload.push(blob)
          let formData = new FormData()
          formData.append('avatar', blob, 'avatar.jpg')
          formData.append('user', this.id)
          // POSTA O AVATAR NA API
          if (this.avatarNulo === false) { this.postImage(formData) } else { this.criarAvatar(formData) }
          // ATUALIZA O AVATAR NA PAGINA APOS TER SALVO ELE NA LISTAGEM
          this.getAvatar()
        },
        () => { // on fail
          this.$q.notify('Nao foi possivel acessar a camera. Contate o administrador do sistema.')
        },
        {
          // camera options
          quality: 20,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
      )
    },
    getBlob (b64Data, contentType, sliceSize = 512) {
      // console.log(b64Data)
      contentType = contentType || ''
      sliceSize = sliceSize || 512

      let byteCharacters = atob(b64Data)
      let byteArrays = []

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize)

        let byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        let byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
      }

      let blob = new Blob(byteArrays, { type: contentType })
      return blob
    },
    getAvatar () {
      axios.get(`https://share-tech.herokuapp.com/api/avatar/${this.id}/`)
        .then(response => {
          this.avatar = response.data.avatar
        })
        .catch(error => {
          console.log(error)
          console.log('nao recuperou imagem')
          this.avatarNulo = true
        })
    }
  }
}
</script>

<style scoped>
  .row {
    margin-top : 20px;
    margin-right :10px;
  }
  .avatar {
    left: 240px;
    position: relative;
  }
  .avatar-btn {
    margin-left: 10px;
  }
  .btn-salvar {
    margin-top: 20px;
    align-content: center;
  }
</style>
