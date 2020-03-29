<template>
<div class="q-pa-md">
      <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      navigation
      padding
      arrows
      height="300px"
      class="bg-grey-1 shadow-2 rounded-borders"
    >
      <q-carousel-slide :name="1" class="column no-wrap">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-6 full-height" v-bind:src="images[0]" />
          <q-img class="rounded-borders col-6 full-height" v-bind:src="images[1]" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-6 full-height" v-bind:src="images[2]" />
          <q-img class="rounded-borders col-6 full-height" v-bind:src="images[3]" />
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="teste">    <q-btn color="primary" label="Inserir Foto" @click="captureImage" /> </div>

    <div class="row">
      <q-input
      v-model="nome"
      filled
      autogrow
      label="Nome"
      />
      <q-input
      v-model="modelo"
      filled
      autogrow
      label="Modelo"
      />
      <q-input
      v-model="marca"
      filled
      autogrow
      label="Marca"
      />
      <q-input
      v-model="preco"
      filled
      autogrow
      label="Preco"
      mask="#.##"
      fill-mask="0"
      reverse-fill-mask
      />
      <q-input
      v-model="descricao"
      filled
      autogrow
      label="Descricao"
      />
    </div>
    <q-toggle
        v-model="aceitaCartao"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        label="Aceita cartao?"
      />
    <img :src="imageSrc">

<div class="teste">    <q-btn color="primary" label="Publicar" @click="submit" /> </div>
<!-- <q-input v-model="id"/> -->

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PageAccount',
  data () {
    return {
      imageSrc: '',
      retorno: '',
      slide: 1,
      images: [],
      dense: false,
      aceitaCartao: false,
      nome: '',
      modelo: '',
      marca: '',
      descricao: '',
      preco: '',
      imgUpload: []
    }
  },
  methods: {
    captureImage () {
      navigator.camera.getPicture(
        data => { // on success
          this.images.push('data:image/jpeg;base64,' + data)
          const blob = this.getBlob(data, 'image/jpeg')
          this.imgUpload.push(blob)
          let formData = new FormData()
          formData.append('img', blob, 'img.jpg')

          // axios.post(`http://192.168.0.101:8000/api/img`, formData, {
          //   headers: {
          //     'content-Type': 'multipart/form-data'
          //   }
          // })
          //   .then(response => {
          //     this.$q.notify('deu certo')
          //     // insere os valores na lista de opcoes
          //   })
          //   .catch(error => {
          //     console.log(error.response)
          //   })
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        },
        {
          // camera options
          quality: 100,
          destinationType: navigator.camera.DestinationType.DATA_URL
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
    submit () {
      let form = new FormData()
      form.append('nome', this.nome)
      form.append('modelo', this.modelo)
      form.append('marca', this.marca)
      form.append('marca', this.marca)
      form.append('preco', this.preco)
      form.append('preco', this.preco)
      form.append('descricao', this.descricao)
      form.append('descricao', this.descricao)
      form.append('aceita_cartao', this.aceitaCartao)
      form.append('vendedor', this.id)
      form.append('vendedor', this.id)
      form.append('img', this.imgUpload[0], 'img.jpg')
      form.append('img2', this.imgUpload[1], 'img2.jpg')
      form.append('img3', this.imgUpload[2], 'img3.jpg')
      form.append('img4', this.imgUpload[3], 'img4.jpg')
      form.append('img5', this.imgUpload[4], 'img5.jpg')
      form.append('create_at', '2018-03-18')
      form.append('updated_at', '2018-03-18')

      axios.post(`http://192.168.1.5:8000/api/product/`, form, {
        headers: {
          'content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          this.$q.notify('deu certo')
          // insere os valores na lista de opcoes
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    data () {
      var today = Date.now()
      return today.toISOString()
    }
  },
  computed: {
    id: {
      get () {
        return this.$store.state.logado.id
      }

    }
  }
}
</script>

<style scoped>
  .row {
    margin-top: 5px;
    margin-right: 5px;
  }
  .teste {
    margin-top: 15px;
    margin-right: 15px;
  }
</style>
