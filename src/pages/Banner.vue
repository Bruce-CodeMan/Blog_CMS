<!--
 * @Date: 2022-03-08 13:34:29
 * @Author: Bruce
 * @Description: "轮播图管理的组件"
-->

<template>
  <div id="banner">
    <el-space direction="vertical" :size="20" style="width:100%">
      <h1>轮播图管理</h1>
      <div style="text-align:left">
        <el-button type="primary" @click="onAddBanner">
            <el-icon><circle-plus /></el-icon>
            添加轮播图
        </el-button>
      </div>
    </el-space>


  <el-dialog v-model="bannerDialog" title="添加/修改轮播图" width="30%">
    <el-form :model="form">
      <el-form-item label="名称" >
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图片">
        <div style="display:flex"> 
          <el-input v-model="form.image_url" autocomplete="off" style="margin-right:10px;"></el-input>
        <el-upload
            :action="$http.server_host + '/cms/banner/image/upload'"
            name="image"
            :show-file-list="false"
            accept="image/jpeg, image/png, image/jpg"
            on-success="onImageUploadSuccess"
            on-error="onImageUploadError"
          >
          <el-button type="primary">上传图片</el-button>
        </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="跳转">
        <el-input v-model="form.link_url" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="优先级">
        <el-input v-model="form.priority" autocomplete="off" type="number"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="bannerDialog = false">Cancel</el-button>
        <el-button type="primary" @click="bannerDialog = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script>
import {CirclePlus} from "@element-plus/icons";
export default {
     /* eslint-disable */ 
    name: "Banner",
    components: {
      CirclePlus
    },
    data(){
      return {
          bannerDialog: false,
          form: {
            name: "",
            image_url: "",
            link_url: "",
            priority: 0
          }
      }
    },
    mounted(){},
    methods: {
      onAddBanner() {
        this.bannerDialog = true;
      },
      onImageUploadSuccess(response, file, fileList){
        console.log(response)
        console.log(file)
        console.log(fileList)
      },
      onImageUploadError(response, file, fileList){
        console.log(response)
        console.log(file)
        console.log(fileList)
      }
    }
};
</script>

<style scoped>
.el-space{
  display: block;
}
</style>