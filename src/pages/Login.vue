<template>
<div class="limiter">
  <div class="container-login100">
    <div class="wrap-login100">
      <q-form class="login100-form validate-form" @submit="onSubmit">
        <span class="login100-form-title p-b-26">
          Bem-Vindo!
        </span>
        <span class="login100-form-title p-b-48">
          <i class="zmdi zmdi-font"></i>
        </span>
        <div class="wrap-input100 validate-input">
          <input class="text" type="email" name="email" v-model="email" placeholder="Email">
        </div>

        <div class="wrap-input100 validate-input">
          <span class="btn-show-pass">
            <i class="zmdi zmdi-eye"></i>
          </span>
          <input class="input100" type="password" name="pass" v-model="password" placeholder="Senha">
        </div>

        <div class="container-login100-form-btn">
          <div class="wrap-login100-form-btn">
            <div class="login100-form-bgbtn"></div>
            <button type="submit" class="login100-form-btn">
              Login
            </button>
          </div>
        </div>

        <div class="text-center p-t-115">
          <span class="txt1">
            Nao tem conta?
          </span>

          <router-link to="register">
          <a class="txt2" >
            Registrar!
          </a>
          </router-link>
        </div>
      </q-form>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'Axios'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      var formData = new FormData()
      formData.append('email', this.email)
      formData.append('password', this.password)
      axios.post('https://share-tech.herokuapp.com/rest-auth/login/', formData)
        .then(response => {
          if (response.status === 200) {
            this.$store.state.logado.status = true
            this.$q.notify({
              type: 'positive',
              message: 'Logado com sucesso!',
              position: 'top' })
            axios.get(`https://share-tech.herokuapp.com/api/get_user_name/${this.email}`)
              .then(response => {
                this.$store.state.logado.id = response.data.id
                this.$store.state.logado.username = response.data.username
                axios.get(`https://share-tech.herokuapp.com/api/avatar/${response.data.id}/`)
                  .then(response => {
                    this.$store.state.logado.avatar = response.data.avatar
                  })
                  .catch(error => {
                    console.log(error)
                  })
              })
          }
        })
        .catch(error => {
          console.log(error)
          this.$q.notify('Dados incorretos, tente novamente!')
        })
    }
  }
}
</script>
