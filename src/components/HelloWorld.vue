<template>
  <div>
     監測編碼查詢頁面
    <br>
    <button>新增</button>
    <br>
    監測項目: 
    <select v-model="item">
        <option v-for="data in listItem" :value="data.MN_COD">{{data.MN_COD}} {{data.MN_NAM}}</option>
    </select>
    <br>
    檢體來源: 
    <select v-model="source">
        <option v-for="(value,key) in list" :value="key">{{value}}</option>
    </select>
    <br>
    狀態: 
    <input type="radio" id="normal" v-model="tsc" value="生效"/>
    <label for="A">生效</label>
    <input type="radio" id="middle" v-model="tsc" value="失效"/>
    <label for="D">失效</label>
    <br>
    <button @click="getapi()">送出</button>
    <table border="1">
            <tr>
                <td>#</td>
                <td>監測編碼</td>
                <td>監測項目</td>
                <td>檢體來源	</td>
                <td>生效日期</td>
                <td>失效日期</td>
                <td>狀態</td>
                <td>異動人員</td>
                <td>異動時間</td>
            </tr>
            <tr v-for="(data,index) in this.dataIflb">
                    <td><button @click="changeedit(data)">編輯</button></td>
                    <td>{{data.MN_COD}}</td>
                    <td>{{de64base(data.MN_NAM)}}</td>
                    <td>{{de64base(data.srcNam)}}</td>
                    <td>{{data.EFF_DAT}}</td>
                    <td>{{data.STP_DAT}}</td>
                    <td>{{data.TSC}}</td>
                    <td>{{data.RTP}}</td>
                    <td>{{data.RTT}}</td>
            </tr>
        </table>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  name: 'HelloWorld',
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
      dodo: '',
      dataIflb: '',
    }
  },
  methods:{
    getapi(){
      let tag = 'pvt.if.getMnCodData'
      let param = new FormData()
      let conf = {
        params: {
          wtag: tag
        }
      };
      let obj = {
        wb_base64: 0,
        encode: "N",
        MN_COD: this.item,
        SRC: this.source,
        TSC: this.tsc
      }
      param.append("var", Base64.encode(JSON.stringify(obj)));
      console.log(obj)
      this.$axios.post("/api", param, conf)
      .then((response) => {
        console.log(response);
          this.dodo = JSON.parse(Base64.decode(response.data));
          if (this.dodo.sts == '000000') {
            this.dataIflb = this.dodo.val;
          }
          console.log(this.dataIflb);
      })
      .catch((error) => {
        console.log(error);
      })
    },
    de64base(str){
      return Base64.decode(str);
    },
    changeedit(data){
      this.$router.push({
        name: 'editPage',
        params:{'MN_NO':data.MN_NO,'MN_NAM':data.MN_NAM,'SRC':data.SRC,'TSC':data.TSC},
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
  color: #42b983;
}
</style>
