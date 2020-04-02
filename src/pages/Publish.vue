<template>
<div class="q-pa-md">
  <div class=""  v-if="!loading">
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
      v-model="marca_modelo"
      filled
      autogrow
      label="Marca / Modelo"
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

<div class="teste">
  <q-btn color="primary" label="Publicar" @click="submit" />
  </div>
</div>

<div class="loading" v-if="loading">
    <loading :active.sync="loading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"></loading>
</div>

</div>
</template>

<script>
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'
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
      marca_modelo: '',
      descricao: '',
      preco: '',
      imgUpload: [],
      loading: false,
      fullPage: true
    }
  },
  components: {
    Loading
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
        },
        () => { // on fail
          this.$q.notify('Nao foi possivel acessar a camera. Contate o administrador do sistema.')
        },
        {
          // camera options
          quality: 20,
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
      this.loading = true
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
      var i = 0
      for (i = 1; i <= this.imgUpload.length; i++) {
        // LOOP PARA INSERIR AS IMAGENS NO ARRAY E ADD AO FORM DATA
        form.append(`img${i}`, this.imgUpload[i - 1], `img${i}.jpg`)
        console.log(`img${i} ||| img${i}.jpg`)
        console.log(this.imgUpload.length)
      }
      console.log(form)
      // form.append('img', this.imgUpload[0], 'img.jpg')
      // form.append('img2', this.imgUpload[1], 'img2.jpg')
      // form.append('img3', this.imgUpload[2], 'img3.jpg')
      // form.append('img4', this.imgUpload[3], 'img4.jpg')
      // form.append('img5', this.imgUpload[4], 'img5.jpg')

      // LEMBRAR DE ARRUMA ESSA PORR AQUI
      form.append('create_at', '2018-03-18')
      form.append('updated_at', '2018-03-18')

      axios.post(`https://share-tech.herokuapp.com/api/product/`, form, {
        headers: {
          'content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          this.loading = false
          console.log(response.data)
          this.$router.push({ name: 'produto', params: { product: response.data.id } })
          // insere os valores na lista de opcoes
        })
        .catch(error => {
          console.log(error.response)
          setTimeout(() => {
            this.loading = false
          }, 5000)
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
  .loading {
    size: 300px;
    height: 400px;
  }
</style>
