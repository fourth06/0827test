<template>
    <div>
        <div class="title">監測編碼新增畫面</div>
        <div class="item">
            <div>
                監測編碼:<input type="text" v-model='cod'>
            </div>
            <div>
                監測項目:<input type="text" v-model='item'>
            </div>
            <div>
                檢體來源:
                <select v-model="source" class="selectbox">
                    <option v-for="(value,key) in list" :value="key">{{value}}</option>
                </select>
            </div>
            <div>
                <button class="addbut" @click="getapi()">儲存</button>
                <button class="findbut" @click="getcancel()">取消</button>
            </div>
        </div>
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
    getcancel(){
      this.$router.push({
        name: 'HelloWorld',
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="text"] {
    border: 0px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0);
    color: #4f4f4f;
    border: none;
    border-bottom: 1px solid #9d9d9d;
    padding: 1px 2px;
}
input[type="text"]:focus {
    outline: 0px;
}
.title {
    font-family:Microsoft JhengHei;
    font-size: 26px;
}
.item > div {
  margin: 20px 10px;
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
</style>
