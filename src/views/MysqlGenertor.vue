<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import type { UnwrapRef } from 'vue'
import type { TreeSelectProps } from 'ant-design-vue';
import { saveAs } from 'file-saver';
import enumsAPI from '@/api/Enums.js'
import generatorCodeAPI from '@/api/GeneratorCondeAPI.js'
import stringUtils from '@/utils/StringUtils'

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
    <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>代码生成</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '750px' }">
        <a-form :model="fromGenerator">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item name="ip" label="ip">
                        <a-input v-model:value="fromGenerator.ip"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item name="port" label="端口">
                        <a-input v-model:value="fromGenerator.port"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item name="username" label="MySQL用户名">
                        <a-input v-model:value="fromGenerator.username"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item name="password" label="MySQL密码">
                        <a-input v-model:value="fromGenerator.password"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item name="tableName" label="表名称">
                        <a-input v-model:value="fromGenerator.tableName"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item name="数据库名称" label="database">
                        <a-input v-model:value="fromGenerator.database"></a-input>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item name="swagger" label="包名称">
                <a-input v-model:value="fromGenerator.packageName"></a-input>
                <!-- <a-input v-model:value="fromGenerator.swaggerStatus"></a-input> -->
            </a-form-item>

            <a-form-item name="swagger" label="swagger">
                <a-radio-group v-model:value="fromGenerator.swaggerStatus">
                    <a-radio :key="key" v-for="(value, key) in swaggerStatus" :value="key">{{ value }}</a-radio>
                </a-radio-group>
                <!-- <a-input v-model:value="fromGenerator.swaggerStatus"></a-input> -->
            </a-form-item>

            <a-form-item name="templateGroup" label="模板group">
                <a-tree-select v-model:value="fromGenerator.templateGroupId" style="width: 100%"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :treeData="treeData" placeholder="请选择父节点"
                    :fieldNames="{
                        children: 'children',
                        label: 'groupName',
                        value: 'id'
                    }" allow-clear tree-default-expand-all>
                </a-tree-select>
            </a-form-item>
            <a-form-item name="generateTypeCode" label="生成类型">
                <a-radio-group v-model:value="fromGenerator.generateTypeCode">
                    <a-radio :key="key" v-for="(value, key) in generateTypeStatus" :value="key">{{ value }}</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item :wrapper-col="{}">
                <a-button type="primary" html-type="submit" @click="generatorCode">生成</a-button>
                <a-button style="margin-left: 10px" v-if="showDownLoadButton && codeContent !== null"
                    @click="downloadCode">下载</a-button>
            </a-form-item>
        </a-form>
        <a-textarea v-model:value="codeContent" :rows="15" />
    </div>
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
