<template>
  <transition name="fadeee">
    <div class="fadee" id="fde" v-show="prettyShow($root.id)">
      <div id="modal-login">
        <div id="formContent">
          <div v-show="!$root.id" style="height:100%">
            <h1>Widget</h1>
            <form class="login-form">
              <div class="form-group mb-1">
                <label for="login">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="login"
                  id="login"
                  placeholder="Введите логин"
                  required
                />
              </div>
              <div class="form-group mb-1">
                <label for="password">Пароль</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Введите пароль"
                  v-model="password"
                  required
                />
              </div>
              <div class="form-group mb-1" v-if="reg">
                <label for="nickname">Никнейм</label>
                <input
                  type="text"
                  class="form-control"
                  id="nickname"
                  placeholder="Введите никнейм"
                  v-model="nick"
                  required
                />
              </div>

              <button
                v-if="reg"
                type="button"
                class="btn btn-sm btn-outline-primary w-100"
                style="height:50px;margin-top:10px"
                @click="callRegister()"
              >
                Зарегестритроваться
              </button>
              <button
                v-else
                type="button"
                class="btn btn-sm btn-outline-primary w-100"
                style="height:50px; margin-top:10px"
                @click="callAuth()"
              >
                Войти
              </button>
            </form>
            <div class="row ml-0 position-selector">
              <h2 v-if="!reg" v-bind:class="class2" @click="reg = true">
                Регистрация
              </h2>
              <h2 v-else v-bind:class="class2" @click="reg = false">
                Вход
              </h2>
              <h2 v-bind:class="class2" @click="reg = true">
                Восстановить пароль
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
#modal-login .position-selector {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  padding-top: 0;
  height: 60px;
}

#modal-login form {
  position: absolute;
  bottom: 60px;
  width: 100%;
  padding: 2rem;
}

form.login-form input:placeholder {
  color: #cccccc;
}

#formContent {
  text-align: left;
}

#formContent label {
  margin-bottom: 0;

  margin-left: 0.4rem;
}

#formContent h1 {
  text-align: center;
}

form.login-form input {
  margin-top: 0px;
}
#modal-login .position-selector h2:nth-child(2) {
  margin-right: 0;
  margin-left: auto;
}

.fadeee-enter-active,
.fadeee-leave-active {
  transition: opacity 0.5s;
}
.fadeee-enter,
.fadeee-leave-to {
  opacity: 0;
}
</style>

<script>
import axios from 'axios'
import { eventBus } from './main'
export default {
  data() {
    return {
      login: '',
      password: '',
      nick: '',
      reg: false,
      isempty: true,
      iscorrect: '',
      class1: 'active',
      class2: 'inactive underlineHover',
      show: true,
    }
  },
  methods: {
    callAuth() {
      if (this.iscorrect) this.iscorrect = false
      if (this.login && this.password) {
        this.isempty = false
        eventBus.$emit('login', this.login, this.password)
      } else this.isempty = true
    },
    callRegister() {
      eventBus.$emit('register', this.login, this.password, this.nick)
    },
    prettyShow(val) {
      if (document.getElementById('layout'))
        if (val) {
          document.getElementById('layout').className = 'layout normal'
        } else {
          document.getElementById('layout').className = 'layout blur'
        }
      return !val
    },
  },

  async mounted() {},
}
</script>
