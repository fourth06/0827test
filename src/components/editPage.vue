<template>
    <div>
        監測編碼編輯畫面
        <br>
        監測編碼:{{$route.params.MN_NO}}
        <br>
        監測項目:<input type="text" v-model='name'>
        <br>
        檢體來源:{{$route.params.SRC}}
        <br>
        狀態:{{$route.params.TSC}}
    </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  name: 'editPage',
  data () {
    return {
        name: '',
    }
  },
  methods:{
    de64base(str){
      return Base64.decode(str);
    },
  },
  mounted() {
      this.name = this.de64base(this.$route.params.MN_NAM)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b9
}
.tttab{
    width: 100%;
    border:1.5px solid black;
    display: flex;
    flex-direction: row;
    /* flex-wrap: wrap; */
}
.stack{
    background-color: yellowgreen;
    align:left;
    width: 20%;
}
.middle{
    flex-wrap: wrap;
    width: 80%;
}
.trrrr{
    align:left;
    border:1px solid rgb(0, 60, 255);
    width: 100%;
}
.concc{
    width: 100%;
    display: flex;
    flex-direction: row;
}
.imgcc{
    align:center;
    width: 20%;
}
.valcc{
    align:left;
    width: 100%;
}
</style>
