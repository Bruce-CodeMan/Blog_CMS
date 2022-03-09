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
    <el-form :model="form" :rules="rules" ref="dialogForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="image_url">
        <div style="display:flex"> 
          <el-input v-model="form.image_url" autocomplete="off" style="margin-right:10px;"></el-input>
        <el-upload
            :action="$http.server_host + '/cms/banner/image/upload'"
            name="image"
            :headers="{'Authorization': 'Bearer '+ $auth.token}"
            :show-file-list="false"
            accept="image/jpeg, image/png, image/jpg"
            :on-success="onImageUploadSuccess"
            :on-error="onImageUploadError"
          >
          <el-button type="primary">上传图片</el-button>
        </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="跳转" prop="link_url">
        <el-input v-model="form.link_url" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="优先级" prop="priority">
        <el-input v-model="form.priority" autocomplete="off" type="number"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="bannerDialog = false">Cancel</el-button>
        <el-button type="primary" @click="bannerDialogSubmitEvent"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script>
import {CirclePlus} from "@element-plus/icons";
import {ElMessage} from "element-plus";
export default {
     /* eslint-disable */ 
    name: "Banner",
    components: {
      CirclePlus
    },
    data(){
      return {
          bannerDialog: false,
          banners:[],
          form: {
            name: "",
            image_url: "",
            link_url: "",
            priority: 0
          },
          rules: {
            name: [{required:true, message:'请输入轮播图的名称', trigger:'blur'}],
            image_url: [{required:true, message:'请上传图片', trigger: 'blur'}],
            link_url: [{required:true, message:'请输入图片要跳转的链接', trigger: 'blur'}],
            priority: [
              {required:true,message:'请输入轮播图的优先级',trigger:'blur'}
            ]
          }
      }
    },
    mounted(){},
    methods: {
      onAddBanner() {
        this.bannerDialog = true;
      },
      onImageUploadSuccess(response){
        if(response['code']==200){
          var image_name = response['data']['image_url'];
          var image_url = "/media/banner" + image_name;
          this.form.image_url=image_url;
        }
      },
      onImageUploadError(response, file, fileList){
        console.log(response)
        console.log(file)
        console.log(fileList)
      },
      bannerDialogSubmitEvent(){
        console.log("aaa")
        this.$refs["dialogForm"].validate((valid) => {
          if(!valid){
            ElMessage.error("请确保数据输入正确");
            return;
          }
          this.$http.addBanner(this.form).then((resp) => {
            console.log(result)
            let result = resp['data'];
            let code = result['code'];
            if (code==200){
              let banner = result['data'];
              this.banners.push(banner);
              ElMessage.success("轮播图添加成功");
              this.bannerDialog = false;
            }
          }).catch((err) => {
              ElMessage.error("服务器开小差了，稍后在试一下");
              this.bannerDialog = false;
          })
        })
      }
    }
};
</script>

<style scoped>
.el-space{
  display: block;
}
</style>