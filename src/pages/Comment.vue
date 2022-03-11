<!--
 * @Date: 2022-03-08 14:31:24
 * @Author: Bruce
 * @Description: "评论管理组件"
-->

<template>
  <div id="comment">
      <el-space direction="vertical" :size="20">
        <h1>评论管理</h1>
        <el-table :data="comments" style="100%">
          <el-table-column prop="content" label="内容" />
          <el-table-column prop="author.username" label="评论者名称" />
          <el-table-column label="帖子">
            <template #default="scope">
              <a :href="$http.server_host + '/poster/detail/' + scope.row.poster_id" target="_blank">
              {{ scope.row.poster.title }}
              </a>
            </template>
            </el-table-column>  
            <el-table-column prop="create_time" label="发布时间" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  type="danger"
                  @click="onDeleteCommentClick(scope.$index)"
                >
                  <el-icon><delete /></el-icon>
                </el-button>
              </template>
            </el-table-column>
        </el-table>
        <div>
          <el-pagination
            background
            layout="prev,pager,next"
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
        <el-button type="primary" @click="onConfirmDeleteCommentClick">确定</el-button>
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
    name: "Comment",
    data(){
      return{
        comments: [],
        total_count:0,
        page:1,
        deletingIndex: 0,
        confirmDialogVisible:false
      }
    },
    components:{
      Delete
    },
    mounted() {
      this.getCommentsList(1);
    },
    methods: {
      getCommentsList(page){
        this.$http.getCommentList(page).then(resp => {
          let result = resp["data"]
          let code = result["code"]
          if(code === 200){
            let data = result["data"]
            this.comments = data["comment_list"]
            this.page = data["page"]
            this.total_count = data["total_count"]
          }
        })
      },
      // 翻页函数
      onPageChanged(current_page){
        this.$http.getCommentList(current_page).then(resp => {
          let result = resp["data"]
          let code = result["code"]
          if(code === 200){
            let data = result["data"]
            this.comments = data["comment_list"]
            this.total_count = data["total_count"]
            this.page = current_page;
          }
        })
      },
      // 删除评论的对话框
      onDeleteCommentClick(index){
        this.confirmDialogVisible = true;
        this.deletingIndex = index;
      },
      // 执行删除操作
      onConfirmDeleteCommentClick(){
        let comment = this.comments[this.deletingIndex]
        this.$http.deleteComment(comment.id).then(resp => {
          let result = resp["data"]
          let code = result["code"]
          if(code === 200) {
            this.comments.splice(this.deletingIndex, 1)
            this.getCommentsList(this.current_page);
            ElMessage.success("评论删除成功")
            this.confirmDialogVisible = false;
          }else{
            ElMessage.info("帖子不存在")
            this.confirmDialogVisible = false;
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