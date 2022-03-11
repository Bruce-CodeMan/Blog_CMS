<!--
 * @Date: 2022-03-08 14:32:25
 * @Author: Bruce
 * @Description: "用户管理组件"
-->

<template>
  <div id="user">
      <el-space direction="vertical" :size="20">
      <h1>用户</h1>
      <el-table :data="users" style="width:100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="用户邮箱" />
        <el-table-column prop="join_time" label="创建时间" />
        <el-table-column label="管理员">
          <template #default="scope">
            <el-tag v-if="scope.row.is_staff" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.is_active" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </template>
          </el-table-column>  
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="danger"
              @click="onActiveUserClick(scope.$index)"
            >
              <el-icon><lock /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;">
        <el-pagination 
          background 
          layout="prev, pager, next" 
          :total="total_count"
          :current-page="page"
          @current-change="onPageChanged"
        >
  </el-pagination>
      </div>
      </el-space>

      <!-- 更改用户状态的对话框 -->
      <el-dialog
        v-model="confirmDialogVisible"
        title="修改用户状态"
        width="30%"
      >
        <span>{{ message }}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="confirmDialogVisible=false">取消</el-button>
            <el-button type="primary" @click="onConfirmActiveUserClick">确定</el-button>
          </span>
        </template>
      </el-dialog>
  </div>
</template>

<script>
import {Lock} from "@element-plus/icons";
import { ElMessage } from 'element-plus';
export default {
    /* eslint-disable */
    name: "User",
    data(){
      return{
        users:[],
        confirmDialogVisible:false,
        activingIndex:0,
        message:"",
        total_count:0,
        page:1,
      }
    },
    components:{
      Lock
    },
    mounted(){
      this.getUsersList(1);
    },
    methods:{
      getUsersList(page){
        this.$http.getUserList(page).then(resp => {
          let result = resp["data"]
          let code = result["code"]
          if(code === 200){
            let data = result["data"]
            this.users = data["user_list"]
            this.total_count = data["total_count"]
            this.page = data["page"]
          }
        })
      },
      onActiveUserClick(index){
        this.confirmDialogVisible = true;
        this.activingIndex = index;
        const user = this.users[index];
        if(user.is_active){
          this.message = "您确定要封禁此用户吗？"
        }else{
          this.message = "您确定要解封此用户吗?"
        }
      },
      onConfirmActiveUserClick(){
        let user = this.users[this.activingIndex];
        let is_active = user.is_active?0:1;
        console.log(user.id)
        this.$http.activeUser(user.id, is_active).then(resp =>  {
          
          let result = resp["data"]
          let code = result["code"]
          if(code === 200){
            ElMessage.success("操作成功")
            this.confirmDialogVisible = false;
            let user = result["data"]
            this.users.splice(this.activingIndex, 1, user)
          }else{
            ElMessage.info("操作失败")
            this.confirmDialogVisible = false;
          }
        })
      },
      onPageChanged(current_page){
        this.$http.getUserList(current_page).then(resp => {
          let result = resp["data"]
          let code = result["code"]
          if(code === 200){
            let data = result["data"]
            this.users = data["user_list"]
            this.total_count = data["total_count"]
            this.page = current_page
          }
        })
      }
    }
}
</script>

<style scoped>
.el-space{
  display: block;
}
</style>