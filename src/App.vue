<script setup lang="ts">
import { defineComponent, reactive, toRaw, UnwrapRef } from 'vue';
import enumsAPI from '@/api/enums'
  interface Generator {
    ip: string
    port: number
    username: string
    password: string
    generateTypeCode: number
    database: string
    tableName: string
    swaggerStatus: string
    packageName: string
    templateGroup: string
  }

  const fromGenerator: UnwrapRef<Generator> = reactive({
    "username": "",
    "password": "",
    "generateTypeCode": null,
    "ip": "",
    "port": null,
    "database": "",
    "swaggerStatus": null,
    "packageName": "",
    "templateGroup": "",
    "tableName": ""
    });

    let a = enumsAPI.swaggerStatusEnum()



</script>

<template>
    <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />

    </a-layout-header>
    <a-layout-content style="padding: 0 50px; min-height: 795px;">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>代码生成</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '750px' }">
        <a-form :model="fromGenerator">
          <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item
              name="ip"
              label="ip"
            >
              <a-input  v-model:value="fromGenerator.ip"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              name="port"
              label="端口"
            >
              <a-input  v-model:value="fromGenerator.port"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              name="username"
              label="MySQL用户名"
            >
              <a-input v-model:value="fromGenerator.username"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              v-model:value="fromGenerator.password"
              name="password"
              label="MySQL密码"
            >
              <a-input></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              name="tableName"
              label="表名称"
            >
              <a-input v-model:value="fromGenerator.tableName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              name="数据库名称"
              label="database"
            >
              <a-input v-model:value="fromGenerator.database"></a-input>
            </a-form-item>
          </a-col>
          
          <a-col :span="8">
            <a-form-item
              name="swagger"
              label="swagger"
            >
              <a-input v-model:value="fromGenerator.swaggerStatus"></a-input>
            </a-form-item>
          </a-col>  

          <a-col :span="8">
            <a-form-item
              name="templateGroup"
              label="模板group"
            >
              <a-input v-model:value="fromGenerator.templateGroup"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              name="generateTypeCode"
              label="生成类型"
            >
              <a-input v-model:value="fromGenerator.generateTypeCode"></a-input>
            </a-form-item>
          </a-col>
      </a-row>
 
        </a-form>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      code generator 2023 Created by Lyra
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
  .site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
