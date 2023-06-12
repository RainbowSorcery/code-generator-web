import axios from 'axios'

class GeneratorCodeAPI {
    /**
     * 
     * @param data 请求体
     * @returns 代码生成信息
     */
    public async generatorCode(data: any) {
        const responseData = await axios.post("/generate/generatorCode", data).then(response => {
            return response.data.data
        })
        return responseData
    }
}


const generatorCodeAPI: GeneratorCodeAPI = new GeneratorCodeAPI()

export default generatorCodeAPI