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
      <el-table :data="banners" style="width:100%"> 
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column label="图片链接">
          <template #default="scope">
            <el-image :src="$http.server_host + scope.row.image_url" 
                      style="width:170px; height:90px" 
                      :preview-src-list="[$http.server_host + scope.row.image_url]"
                      fit="cover"></el-image>
      </template>
        </el-table-column>
        <el-table-column label="跳转链接">
          <template #default="scope">
              <a :href="scope.row.link_url" target="_blank">{{ scope.row.link_url }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="priority" label="优先级" width="200px" />
        <el-table-column label="操作">
          <template #default="scope">
              <el-button type="primary" @click="onEditEvent(scope.$index)">
                <el-icon><edit /></el-icon>
              </el-button>
              <el-button type="danger" @click="onDeleteEvent(scope.$index)">
                <el-icon><delete /></el-icon>
              </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-space>

  <!-- 添加轮播图的对话框 -->
  <el-dialog 
            v-model="bannerDialog" 
            title="添加/修改轮播图" 
            width="30%"
  >
    <el-form 
            :model="form" 
            :rules="rules" 
            ref="dialogForm"
    >
      <el-form-item 
            label="名称" 
            prop="name"
      >
        <el-input 
            v-model="form.name" 
            autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item 
            label="图片" 
            prop="image_url"
      >
        <div style="display:flex"> 
          <el-input 
            v-model="form.image_url" 
            autocomplete="off" 
            style="margin-right:10px;"
          ></el-input>
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
        <el-input 
            v-model="form.link_url" 
            autocomplete="off"></el-input>
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

  <!-- 删除轮播图的对话框 -->
  <el-dialog
      v-model="confirmDialog"
      title="提示"
      width="30%"
  >
    <span>确定要删除轮播图吗?</span>
    <template #footer>
        <span class="dialog-footer"></span>
        <el-button @click="confirmDialog = false">取消</el-button>
        <el-button type="danger" @click="confirmDeleteDialog">确认</el-button>
    </template>
  </el-dialog>
  </div>
</template>

<script>
import {CirclePlus, Edit, Delete} from "@element-plus/icons";
import {ElMessage} from "element-plus";
export default {
     /* eslint-disable */ 
    name: "Banner",
    components: {
      CirclePlus,
      Edit,
      Delete
    },
    data(){
      return {
          bannerDialog: false,
          confirmDialog:false,
          deletingIndex: 0,
          editIndex:0,
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
    mounted(){
      this.$http.getBannerList().then((res) => {
        let result = res["data"];
        let banners = result["data"];
        this.banners = banners;
      })
    },
    methods: {

      initForm(banner){
        if(banner){
          this.form.id = banner.id;
          this.form.name = banner.name;
          this.form.image_url = banner.image_url;
          this.form.link_url = banner.link_url;
          this.form.priority = banner.priority
        }else{
          this.form = {
            name: "",
            image_url: "",
            link_url: "",
            priority: 0
          }
        }
      },
      onAddBanner() {
        this.initForm();
        this.bannerDialog = true;
      },
      onImageUploadSuccess(response){
        if(response['code']==200){
          var image_name = response['data']['image_url'];
          var image_url = "/media/banners/" + image_name;
          this.form.image_url=image_url;
        }
      },
      onImageUploadError(response, file, fileList){
        console.log(response)
        console.log(file)
        console.log(fileList)
      },
      bannerDialogSubmitEvent(){
        this.$refs["dialogForm"].validate((valid) => {
        
          if(!valid){
            ElMessage.error("请确保输入数据正确");
            return;
          }
          if(this.form.id){
            // 进行编辑操作
            this.$http.editBanner(this.form).then((resp) => {
              let result = resp["data"]
              let code = result["code"]
              if(code == 200) {
                this.bannerDialog = false;
                let banner = result["data"]
                this.banners.splice(this.editIndex, 1, banner);
                ElMessage.success("轮播图编辑成功");
                this.$http.getBannerList().then((res) => {
                  let result = res["data"];
                  let banners = result["data"];
                  this.banners = banners;
                })
              }
            })
          }else{
            // 进行添加操作
            this.$http.addBanner(this.form).then((resp) => {      
              let result = resp["data"];
              let code = result["code"];
              if(code == 200) {
                let banner = result["data"];
                this.banners.push(banner);
                ElMessage.success("轮播图添加成功");
                this.bannerDialog = false;
              }
            }).catch((err) => {
              console.log(err)
              ElMessage.error("服务器开小差了，请稍后再试");
              this.bannerDialog = false;
          })
          }
        })
      },
      onEditEvent(index){
        this.bannerDialog = true;
        this.editIndex = index;
        let banner = this.banners[index];
        this.initForm(banner);
      },
      onDeleteEvent(index){
        this.deletingIndex = index;
        this.confirmDialog = true
      },
      confirmDeleteDialog(){
        let banner = this.banners[this.deletingIndex];
        this.$http.deleteBanner(banner.id).then((resp) => {
          let result = resp["data"];
          let code = result["code"]
          if(code === 200){
            this.confirmDialog = false;
            this.banners.splice(this.deletingIndex, 1);
            ElMessage.success("删除成功")
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