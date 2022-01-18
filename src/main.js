import Vue from 'vue'
import App from './App.vue'
import WidgetsList from './WidgetsList.vue'
import Widget from './Widget.vue'
import VueSuperagent from 'vue-superagent'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
import $ from 'jquery'
Vue.component('widgetsList', WidgetsList)
Vue.component('widget', Widget)
Vue.component('app', App)
Vue.use(VueSuperagent)
export const eventBus = new Vue()
import Store from './store'
import router from "../router/router.js";
const myApi = axios.create({
  withCredentials: true, 
})

new Vue({
  components: { App },
   router,
  data() {
    return Store
  },
  template: "<App/>",
  created() {
    router.push("/widgets");
  },
}).$mount("#app");


new Vue({
  name: 'bus',
  mounted() {},
  created() {
    eventBus.$on('login', (login,password) => {
      
      console.log(login+password);
      myApi.post('http://188.120.239.117:8000/login/', {
        email: login,
        password: password,
      }).then((res)=>{if(res.data.isAutenticated) getWidgetsList(); else alert("Неверный пароль")})
      .catch(error => {
        eventBus.$emit('noresponse')
      })
    }),
    eventBus.$on('register',(login,password,nick)=>{
      console.log(login+password);
      if (login && password && nick) {
        myApi.post('http://188.120.239.117:8000/register/', {
          email: login,
          password: password,
          nick: nick,
        }).then((res)=>{if(res.data.isRegistered) eventBus.$emit('login',login,password); else alert("Такой ккаунт уже есть")}).catch(error => {
          eventBus.$emit('noresponse')
        })
      }
    })
    eventBus.$on('update', () => {
      getWidgetsList()
    }),
    eventBus.$on('logout', () => {
      myApi.get('http://188.120.239.117:8000/logout/').then(res=>{
        if(res.data.isAuthenticated===false) {
          Store.id = ''
          Store.widgets = []
          Store.messages = []
          Store.nick = ''
          Store.lastmess = '0'
        }
      }).catch(error => {
        eventBus.$emit('noresponse')
      })
    })
    
    eventBus.$on('getPlan', (plan,prolong) => {
     if(!prolong){
        myApi.post('http://188.120.239.117:8000/addsub/',{
          plan_name:plan.name,
          coupon_name:null
        })
          .then(res=>{
            this.$router.push('/widgets'); getSub(); 
        })
     } else {
      myApi.post('http://188.120.239.117:8000/prolongsub/',{
        plan_name:plan.name,
        coupon_name:null
      })
        .then(res=>{
          this.$router.push('/widgets'); getSub(); 
      })
     }
      
    })
    eventBus.$on('noresponse', () => {
      console.log("no response");
      alert("Сервер не отвечает")
      //Store.connection = false
    })
  },
})


getWidgetsList()
async function getWidgetsList() {
  await myApi
  .get('http://188.120.239.117:8000/id/')
  .then(res => {
    Store.id = res.data[0].id
    Store.nick = res.data[0].nick
    Store.email = res.data[0].email
    document.querySelector("main").classList=""
  })
  await myApi
    .get('http://188.120.239.117:8000/widgets/')
    .then(res => {
      Store.widgets = res.data
    })
    .catch(error => {
      eventBus.$emit('noresponse')
    })
    getSub();
  for (let i in Store.widgets) {
    console.log(Store.widgets[i].id)
  }
}

async function getSub(){
  await myApi
    .get('http://188.120.239.117:8000/sub/')
    .then(res => {
      Store.sub = res.data[0]
    })
}

preLoad();
async function preLoad(){

  await myApi
  .get('http://188.120.239.117:8000/plans/').then(res=>{
    Store.plans=res.data;
  }).catch(error => {
    eventBus.$emit('noresponse')
  })
  
}




