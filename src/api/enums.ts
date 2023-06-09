import axios from 'axios'

class EnumsAPI {
    /**
     * 获取swagger版本枚举
     * @returns 枚举数据
     */
    public async swaggerStatusEnum() {
        const data = await axios.get("/enums/swaggerStatusEnum").then(response => {
            return response.data.data
        })
        return data
    }

    /**
     * 代码生成类型
     * @returns 枚举数据
     */
    public async generateTypeEnum() {
        const data = await axios.get("/enums/generateTypeEnum").then(response => {
            return response.data.data
        })

        return data
    }
}



const enumsAPI: EnumsAPI = new EnumsAPI()

export default enumsAPI