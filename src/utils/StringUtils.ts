class StringUtils {
    /**
     * 下划线转驼峰
     * @param str 下划线字符串
     * @returns 字符串
     */
    public toCamelCase(str: string): string {
        return str.replace(/(_\w)/g, function(match) {
          return match[1].toUpperCase();
        });
      }
}

const stringUtils : StringUtils = new StringUtils()

export default stringUtils