<template>
  <div>
    <label v-for="value in list">
        <input type="checkbox" :value="value.empno" v-model="mymymy">
        {{value.empno}} {{value.name}}
    </label>
    <br>
    <input type="textarea" value="" v-model="message"/>
    <br>
    <button @click="getapi()">送出</button>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  name: 'HelloWorld',
  data () {
    return {
      mymymy: [],
      message: '',
      sendData: [],
      empno: '',
      list:[
       { empno: "12604", name: "子靖" },
       { empno: "12833", name: "仕龍" },
       { empno: "12834", name: "韋豪" },
       { empno: "12948", name: "子婷" },
       { empno: "11087", name: "承甫" },
       { empno: "11241", name: "仕昇" },
       { empno: "11692", name: "冠均" },
       { empno: "11736", name: "琪鴻" },
       { empno: "12037", name: "志遠" },
       { empno: "13131", name: "琦堯" },
       { empno: "13536", name: "鴻輝" },
       { empno: "11002", name: "筱薰" },
       { empno: "12651", name: "志宏" },
     ],
    }
  },
  methods:{
    getapi(){
      if (this.mymymy) {
        this.mymymy.forEach(Element =>
          {
            if (this.empno) {
              this.empno += ','+Element
            } else {
              this.empno += Element
            }
          }
        )
      }
      console.log(this.empno)
      this.sendData.push({'ser_no':'000', 'typ':'1', 'receiver':this.empno, 'msg':this.message, 'sender':'12604', 'lnk_no':'', 'src':''});
      console.log(this.sendData)
      let tag = 'evt.msg.sendmsg'
      let param = new FormData()
      let conf = {
        params: {
          wtag: tag
        }
      };
      let obj = {
        wb_base64: 0,
        encode: "N",
        mtyp: "13",
        mtyp: "13",
        msgtxt: this.sendData
      }
      param.append("var", Base64.encode(JSON.stringify(obj)));
      console.log(obj)
      this.$axios.post("/api", param, conf)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }
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
  color: #42b983;
}
</style>
