<template>
  <div class="app-container">
    医院设置列表
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
    </el-form>

    <!--批量删除按钮 -->
    <div>
        <el-button type="danger" size="mini" @click="batchRemoveHospitalSetQD()">批量删除</el-button>
    </div>

    <!-- banner列表 -->
    <el-table 
        :data="list" 
        stripe 
        style="width: 100%" 
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
    </el-table-column>

    <!--删除按钮 -->
    <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataByIdQD(scope.row.id)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import hospset from "@/api/hospset";

export default {
  data() {
    return {
      current: 1, //当前页
      limit: 3, //每页显示记录数
      searchObj: {}, //条件封装对象
      list: [], //每页数据集合
      total: 0, //总记录数
      multipleSelection: [] // 批量选择中选择的记录列表
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //查询
    getList(page = 1) {
      this.current = page;
      hospset
        .getHospSetList(this.current, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records;
          this.total = response.data.total;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //删除
    removeDataByIdQD(id) {
        this.$confirm('此操作将永久删除该医院设置信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          hospset.removeDataById(id)
            .then(response => {
                //提示
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                //刷新页面
                this.getList(1)
            })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

     //点击多选框时，获取到id值
    handleSelectionChange(selection) {
        this.multipleSelection = selection
    },

    //批量删除
    batchRemoveHospitalSetQD() {
        this.$confirm('此操作将永久删除该医院设置信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var idList = []
          //遍历数组得到每个id值，设置到idList里面
          for(var i=0;i<this.multipleSelection.length;i++) {
            var obj = this.multipleSelection[i]
            var id = obj.id
            idList.push(id)
          }

          hospset.batchRemoveHospitalSet(idList)
            .then(response => {
                //提示
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                //刷新页面
                this.getList(1)
            })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

  },

};
</script>

<style>
</style>