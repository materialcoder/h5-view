<template>
  <div class="page-header">
    <div class="header-logo-wrapper">
      <span>H5-VIEW</span>
    </div>
    <slot></slot>
    <div class="header-user-info">
      <el-dropdown>
        <span class="el-dropwodn-link">
          <span class="user-avatar">
            <img :src="userData.avatar" alt="">
          </span>
          <span class="user-name">{{userData.username}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="_logout">
              <span><i class="el-icon-user"></i>个人中心</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="_logout">
              <span><i class="iconfont iconlog-out"></i>退出登录</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object, 
      default: () => {}
    }
  },
  methods: {
    _logout() {
      this.$store.dispatch('logout')
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style lang="scss">
  .page-header {
    height: 48px;
    line-height: 48px;
    padding: 0 40px;
    box-shadow: 0 1px 4px 0px #ccc;
    display: flex;
    justify-content: space-between;
    .header-logo-wrapper {
      width: 200px;
    }
    .header-user-info {
      // width: 80px;
      line-height: 48px;
      cursor: pointer;
      .user-avatar {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid #ccc;
        // margin-top: 5px;
        vertical-align: middle;
        margin-right: 5px;
      }
      .user-name {
        display: inline-block;
        vertical-align: middle;
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>