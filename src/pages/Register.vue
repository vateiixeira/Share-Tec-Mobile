<template>
<div class="limiter">
  <div class="container-login100">
    <div class="wrap-login100">
      <q-form class="login100-form validate-form" @submit="onSubmit">
        <span class="login100-form-title p-b-26">
          Cadastre-se!
        </span>
        <span class="login100-form-title p-b-48">
          <i class="zmdi zmdi-font"></i>
        </span>
        <div class="wrap-input100 validate-input">
          <input class="text" type="email" name="name" v-model="nome" placeholder="Nome">
        </div>

        <div class="wrap-input100 validate-input">
          <span class="btn-show-pass">
            <i class="zmdi zmdi-eye"></i>
          </span>
          <input class="input100" type="text" name="apelido" v-model="apelido" placeholder="Apelido (Nickname)">
        </div>

        <div class="wrap-input100 validate-input">
          <span class="btn-show-pass">
            <i class="zmdi zmdi-eye"></i>
          </span>
          <input class="input100" type="email" name="email" v-model="email" placeholder="E-mail">
        </div>

        <div class="wrap-input100 validate-input">
          <span class="btn-show-pass">
            <i class="zmdi zmdi-eye"></i>
          </span>
          <input class="input100" type="password" name="pass" v-model="password" placeholder="Senha">
        </div>

        <div class="container-login100-form-btn">
          <div class="wrap-login100-form-btn" >
            <div class="login100-form-bgbtn"></div>
            <button type="submit" class="login100-form-btn">
              Login
            </button>
          </div>
        </div>

      </q-form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      nome: '',
      apelido: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('12313123')
    }
  }
}
</script>
