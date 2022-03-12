<template>
  <div id="board">
      <el-space direction="vertical" :size="20">
          <h1>板块管理</h1>
          <div style="text-align:left">
              <el-button type="primary">
                  <el-icon><circle-plus /></el-icon>
                  添加板块
              </el-button>
          </div>
          <el-table>
              <el-table-column label="板块名称" />
              <el-table-column label="板块创建时间" />
              <el-table-column label="板块帖子数量" />
              <el-table-column label="板块优先级" />
              <el-table-column label="操作">
                  <template>
                  <el-button type="success">修改</el-button>
                  <el-button type="danger">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </el-space>
  </div>
</template>

<script>
import {CirclePlus} from "@element-plus/icons";

export default {
    /* eslint-disable */
    name: "Board",
    components:{
        CirclePlus
    },
}
</script>

<style scoped>
.el-space{
    display: block;
}
</style>