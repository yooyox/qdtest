<template>
  <div class="app-container">
      医院设置列表
  </div>
</template>

<script>

import hospset from '@/api/hospset'

export default {
    data() {
        return {
            current:1,//当前页
            limit:3,//每页显示记录数
            searchObj:{},//条件封装对象
            list:[], //每页数据集合
            total:0 //总记录数
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            hospset.getHospSetList(this.current,this.limit,this.searchObj)
                .then(response => {
                    this.list = response.data.records
                    this.total = response.data.total
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>

</style>