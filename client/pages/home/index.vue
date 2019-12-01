<template>
  <div class="page-home">
    <div class="page-home-sidebar">
      <el-menu default-active="/page-list" router>
        <el-menu-item index="/page-list">
          <i class="el-icon-mobile"></i>
          <span slot="title">我的作品</span>
        </el-menu-item>
        <el-menu-item index="/my-template">
          <i class="el-icon-document"></i>
          <span slot="title">我的模板</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="sub-page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .page-home {
    display: flex;
    height: 100%;
    .page-home-sidebar {
      width: 150px;
      height: 100%;
      .el-menu {
        height: 100%;
      }
    }
    .sub-page {
      flex: 1;
    }
  }
</style>