<template>
  <div class="add-user">
    <add-user-form />
  </div>
</template>

<script setup lang="ts">
import AddUserForm from './c-cpns/add-userForm.vue'
</script>

<style lang="less" scoped>
.add-user {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(https://up.kukudesk.com/pic_source/33/96/3d/33963d73559fc03a67709286b9b21fc9.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
