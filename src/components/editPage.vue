<template>
    <div>
        監測編碼編輯畫面
        <br>
        監測編碼:{{$route.params.MN_COD}}
        <br>
        監測項目:<input type="text" v-model='item'>
        <br>
        檢體來源:
        <select v-model="source">
            <option v-for="(value,key) in list" :value="key">{{value}}</option>
        </select>
        <br>
        狀態:
        <input type="radio" id="normal" name="tscaaa" v-model="tsc" value="A"/>
        <label for="A">生效</label>
        <input type="radio" id="middle" name="tscaaa" v-model="tsc" value="D"/>
        <label for="D">失效</label>
        <br>
        <button @click="getapi()">儲存</button>
    </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  name: 'editPage',
  data () {
    return {
        item: '',
        source: '',
        tsc: '',
        list: ["水質", "器械","環境","人員"],
        listItem: [{
                    MN_COD: 'AIRB',
                    MN_NAM: '空氣落菌',
                    },
                    {
                    MN_COD: 'BCWQ',
                    MN_NAM: '燒傷中心水質',

                    },
                    {
                    MN_COD: 'ERPA',
                    MN_NAM: '員工餐廳準備區',

                    },
                    {
                    MN_COD: 'ERTB',
                    MN_NAM: '員工餐廳餐具',
                    },
                    {
                    MN_COD: 'ERWQ',
                    MN_NAM: '員工餐廳水質'
                    },
                    {
                    MN_COD: 'ESMN',
                    MN_NAM: '內視鏡監測',
                    },
                    {
                    MN_COD: 'ESMN-G',
                    MN_NAM: '內視鏡監測(腸胃管鏡)',
                    }],
    }
  },
  methods:{
    getapi(){
      let obj = {}
      let tag = 'pvt.if.trnMnCodData'
      let param = new FormData()
      let conf = {
        params: {
          wtag: tag
        }
      };
      if (this.tsc == 'D') {
        obj = {
            wb_base64: 0,
            encode: "N",
            funTyp: this.tsc,
            MN_NO: this.$route.params.MN_NO,
        }
      } else {
        obj = {
            wb_base64: 0,
            encode: "N",
            funTyp: "U",
            MN_NO: this.$route.params.MN_NO,
            MN_NAM: this.item,
            SRC: this.source+1,
            RTP: "12604"
        }
      }
      param.append("var", Base64.encode(JSON.stringify(obj)));
      console.log(obj)
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
    de64base(str){
      return Base64.decode(str);
    },
  },
  mounted() {
      this.item = this.de64base(this.$route.params.MN_NAM)
      this.source = this.$route.params.SRC-1
      this.tsc = this.$route.params.TSC
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
