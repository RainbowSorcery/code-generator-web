import axios from 'axios'


/**
 * 获取swagger版本枚举
 */
class EnumsAPI {
    public swaggerStatusEnum() {
        axios.get("/enums/swaggerStatusEnum").then(response => {
            return response.data.data;
        })
    }
}



const enumsAPI : EnumsAPI = new EnumsAPI()

export default enumsAPI