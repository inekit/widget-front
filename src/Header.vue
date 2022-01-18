<template>
<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom box-shadow">
      <h5 class="my-0 mr-md-auto font-weight-normal">Widget</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#">{{$root.email}}</a>
      </nav>
      <a class="btn btn-outline-primary" @click="logout()" href="#">Выйти</a>
    </div>
    
</template>

<script>
import { eventBus } from './main'
export default {
  data() {
    return {}
  },
  methods: {
    logout(){
      eventBus.$emit('logout')
    }
  },
}
</script>
