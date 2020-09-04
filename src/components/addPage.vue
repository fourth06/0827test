<template>
    <div>
        監測編碼新增畫面
        <br>
        監測編碼:<input type="text" v-model='cod'>
        <br>
        監測項目:<input type="text" v-model='item'>
        <br>
        檢體來源:
        <select v-model="source">
            <option v-for="(value,key) in list" :value="key">{{value}}</option>
        </select>
        <br>
        <button @click="getapi()">儲存</button>
    </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  name: 'addPage',
  data () {
    return {
        item: '',
        source: '',
        cod: '',
        list: ["水質", "器械","環境","人員"],
    }
  },
  methods:{
    getapi(){
        let tag = 'pvt.if.trnMnCodData'
        let param = new FormData()
        let conf = {
            params: {
                wtag: tag
            }
        };
        let obj = {
            wb_base64: 0,
            encode: "N",
            funTyp: "A",
            MN_COD: this.cod,
            MN_NAM: this.item,
            SRC: this.source+1,
            RTP: "12604"
        }
        param.append("var", Base64.encode(JSON.stringify(obj)));
        this.$axios.post("/api", param, conf)
        .then((response) => {
            console.log(response);
            this.dodo = JSON.parse(Base64.decode(response.data));
            if (this.dodo.sts == '000000') {
                alert("儲存成功")
                this.$router.push({
                    name: 'HelloWorld',
                })
            } else {
                alert("儲存失敗")
            }
        })
        .catch((error) => {
            console.log(error);
        })
    },
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
