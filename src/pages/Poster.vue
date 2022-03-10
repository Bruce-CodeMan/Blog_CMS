<!--
 * @Date: 2022-03-08 14:30:08
 * @Author: Bruce
 * @Description: "帖子管理组件"
-->

<template>
  <div>
    <el-space direction="vertical" :size="20">
      <h1>帖子管理</h1>
      <el-table :data="posters" style="width: 100%">
        <el-table-column label="标题">
          <template #default="scope">
            <a :href="$http.server_host + '/poster/detail/' + scope.row.id" target="_blank">{{
              scope.row.title
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="发布时间" width="180" />
        <el-table-column prop="border.name" label="所属板块" />
        <el-table-column prop="author.username" label="作者" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="danger"
              circle
              size="mini"
              @click="onDeletePostClick(scope.$index)"
            >
              <el-icon><delete /></el-icon>
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

    <!-- 删除轮播图确认对话框 -->
  <el-dialog
    v-model="confirmDialogVisible"
    title="提示"
    width="30%"
  >
    <span>如果删除帖子，该帖子下所有的评论也会被删除，您确定要删除吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="confirmDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfirmDeletePostClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script>
import {Delete} from "@element-plus/icons";
import { ElMessage } from 'element-plus';
export default {
    /* eslint-disable */
    name: "Poster",
    components:{
      Delete
    },
    data(){
      return {
        deletingIndex: 0,
        confirmDialogVisible: false,
        posters: [],
        total_count: 0,
        page: 1
      }
    },
    mounted() {
      this.getPosterList(1);
      
    },
    methods: {
    getPosterList(page){
      this.$http.getPosterList(page).then(resp => {
        
          let result = resp["data"]
          let code = result["code"]
          if(code === 200){
            let data = result["data"]
            this.posters = data["poster_list"]
            this.total_count = data["total_count"]
            this.page = data["page"]
          }
        })
    },
    onDeletePostClick(index) {
      this.confirmDialogVisible = true;
      this.deletingIndex = index;
    },
    onConfirmDeletePostClick(){
      let post = this.posts[this.deletingIndex];
      this.$http.deletePost(post.id).then(res => {
        if(res['code'] == 200){
          this.posts.splice(this.deletingIndex, 1);
          ElMessage.success("帖子删除成功！");
          this.confirmDialogVisible = false;
        }else{
          ElMessage.info(res['message']);
        }
      })
    },
    onPageChanged(current_page){
      this.getPostList(current_page);
    }
  },
}
</script>
<style scoped>
.el-space {
  display: block;
}
</style>