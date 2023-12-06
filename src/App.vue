<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import type { UnwrapRef } from 'vue'
import type { TreeSelectProps } from 'ant-design-vue';
import { saveAs } from 'file-saver';
import enumsAPI from '@/api/Enums.js'
import generatorCodeAPI from '@/api/GeneratorCondeAPI.js'
import stringUtils from '@/utils/StringUtils'
import MysqlGenertor from "@/views/MysqlGenertor.vue"
import MongoGenertor from "@/views/MongoGenertor.vue"

interface GeneratorDTO {
  ip?: string
  port?: number
  username?: string
  password?: string
  generateTypeCode?: number
  database?: string
  tableName: string
  swaggerStatus?: number
  packageName?: string
  templateGroupId?: Number
}

const fromGenerator: UnwrapRef<GeneratorDTO> = reactive({
  "username": "",
  "password": "",
  "generateTypeCode": undefined,
  "ip": "",
  "port": undefined,
  "database": "",
  "swaggerStatus": undefined,
  "packageName": "",
  "templateGroupId": undefined,
  "tableName": ""
});



const swaggerStatus = ref([]);
const generateTypeStatus = ref([])
const treeData = ref<TreeSelectProps['treeData']>([]);
const codeContent = ref()
const showDownLoadButton = ref(false)

const gennertorTypeName = ref("")

onMounted(async () => {
  const response = await enumsAPI.swaggerStatusEnum()
  swaggerStatus.value = response
})

onMounted(async () => {
  const response = await enumsAPI.generateTypeEnum()
  generateTypeStatus.value = response
})

onMounted(async () => {
  const response = await enumsAPI.templateGroupTree()
  treeData.value = response
})

const generatorCode = async () => {
  codeContent.value = await generatorCodeAPI.generatorCode(fromGenerator)
  showDownLoadButton.value = true
}

const downloadCode = () => {
  let str = new Blob([codeContent.value], { type: 'text/plain;charset=utf-8' });
  saveAs(str, stringUtils.toCamelCase(fromGenerator.tableName) + gennertorTypeName.value + ".java")
}



</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px; min-height: 795px;">
      <a-tabs>
        <a-tab-pane key="1" tab="MySQL">
          <mysql-genertor></mysql-genertor>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Mongo">
          <mongo-genertor></mongo-genertor>
        </a-tab-pane>
      </a-tabs>
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
