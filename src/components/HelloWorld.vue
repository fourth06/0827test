<template>
  <div>
    <div class="title">監測編碼查詢頁面</div>
    <div class="item">
      <div>
        監測項目:    
        <select v-model="item" class="selectbox">
            <option v-for="data in listItem" :value="data.MN_COD">{{data.MN_COD}} {{data.MN_NAM}}</option>
        </select>
      </div>
      <div>
        檢體來源: 
        <select v-model="source" class="selectbox">
            <option v-for="(value,key) in list" :value="key">{{value}}</option>
        </select>
      </div>
      <div>
        狀態: 
        <input type="radio" id="AA" name="tscaaa" v-model="tsc" value="A"/>
        <label for="A">生效</label>
        <input type="radio" id="DD" name="tscaaa" v-model="tsc" value="D"/>
        <label for="D">失效</label>
      </div>
      <div>
        <button class="addbut" @click="changeadd()">新增</button>
        <button class="findbut" @click="getapi()" >查詢</button>
      </div>
    </div>
    <div v-if="this.dataIflb">
        <span class="titleone">#</span>
        <span class="titlebar">監測編碼</span>
        <span class="titlethird">監測項目</span>
        <span class="titlebar">檢體來源	</span>
        <span class="titlebar">生效日期</span>
        <span class="titlebar">失效日期</span>
        <span class="titleone">狀態</span>
        <span class="titlebar">異動人員</span>
        <span class="titlebar">異動時間</span>
    </div>
    <div v-for="(data,index) in this.dataIflb">
        <span class="concentone"><button class="editbut" @click="changeedit(data)">編輯</button></span>
        <span class="concent">{{data.MN_COD}}</span>
        <span class="concentthird">{{de64base(data.MN_NAM)}}</span>
        <span class="concent">{{de64base(data.srcNam)}}</span>
        <span class="concent">{{data.EFF_DAT}}</span>
        <span class="concent">{{data.STP_DAT}}</span>
        <span class="concentone">{{data.TSC}}</span>
        <span class="concent">{{data.RTP}}</span>
        <span class="concent">{{data.RTT}}</span>
    </div>
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
      tsc: 'A',
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
        SRC: this.source+1,
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
          } else if (this.dodo.sts == 'E00004') {
            alert("沒咚咚")
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
        params:{'MN_NO':data.MN_NO,'MN_COD':data.MN_COD,'MN_NAM':data.MN_NAM,'SRC':data.SRC,'TSC':data.TSC},
      })
    },
    changeadd(){
      this.$router.push({
        name: 'addPage',
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
    font-family:Microsoft JhengHei;
    font-size: 26px;
}
.titlebar {
  background-color: yellowgreen;
  display: table-cell;
  vertical-align: middle;
  width: 170px;
  font-size: 20px;
  height: 30px;
}
.titleone {
  background-color: yellowgreen;
  display: table-cell;
  vertical-align: middle;
  width: 70px;
  font-size: 20px;
  height: 30px;
}
.titlethird {
  background-color: yellowgreen;
  display: table-cell;
  vertical-align: middle;
  width: 300px;
  font-size: 20px;
  height: 30px;
}
.concent {
  background-color: #FFF8D7;
  display: table-cell;
  vertical-align: middle;
  width: 170px;
  font-size: 18px;
  height: 30px;
}
.concentone {
  background-color: #FFF8D7;
  display: table-cell;
  vertical-align: middle;
  width: 70px;
  font-size: 18px;
  height: 30px;
}
.concentthird {
  background-color: #FFF8D7;
  display: table-cell;
  vertical-align: middle;
  width: 300px;
  font-size: 18px;
  height: 30px;
}
.addbut {
    background-color: #f85953;
    text-align: center;
    height: 30px;
    border-radius: 4px;
    padding: 0 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    font: normal 16px/140% Arial, Helvetica, "微軟正黑體";
}
.addbut:hover {
    background-color: #fff;
    text-align: center;
    height: 30px;
    border-radius: 4px;
    padding: 0 5px;
    color: #f85953;
    font-size: 16px;
    cursor: pointer;
    font: normal 16px/140% Arial, Helvetica, "微軟正黑體";
}
.findbut {
    background-color: #3f94ff;
    text-align: center;
    height: 30px;
    border-radius: 4px;
    padding: 0 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    font: normal 16px/140% Arial, Helvetica, "微軟正黑體";
}
.findbut:hover {
    background-color: #fff;
    text-align: center;
    height: 30px;
    border-radius: 4px;
    padding: 0 5px;
    color: #3f94ff;
    font-size: 16px;
    cursor: pointer;
    font: normal 16px/140% Arial, Helvetica, "微軟正黑體";
}
.selectbox {
    border-radius: 4px;
    border: 1px solid #ddd;
    overflow: hidden;
    margin: 0;
    position: relative;
    width: fit-content;
    display: inline-block;
    padding: 0;
    background-size: contain;
}
.item > div {
  margin: 20px 10px;
}
.editbut {
    background-color: #BB3D00;
    text-align: center;
    height: 25px;
    border-radius: 4px;
    padding: 0 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    font: normal 16px/140% Arial, Helvetica, "微軟正黑體";
}
.editbut:hover {
    background-color: #fff;
    text-align: center;
    height: 25px;
    border-radius: 4px;
    padding: 0 5px;
    color: #BB3D00;
    font-size: 16px;
    cursor: pointer;
    font: normal 16px/140% Arial, Helvetica, "微軟正黑體";
}
</style>
