/**
 * 比较大小
 * @param firstValue 
 * @param secondValue 
 */
export const compareValue = (firstValue: any, secondValue: any): boolean => {
    return firstValue > secondValue;
}
/**
 * 返回的boolean值为true时,提示正确的消息，反之，提示错误的消息
 * @param checkValue 
 * @param trueMsg 
 * @param falseMsg 
 */
export const messageByValue = (checkValue: boolean, trueMsg: string, falseMsg: string): string => {
    return checkValue ? trueMsg : falseMsg;
}
export default class CommonUtil {
    /**
     * 交换两个对象的属性。
     * 应用场景:如排序,根据sort序号属性交换位置进行排序
     * @param obj1 交换对象1
     * @param obj2 交换对象2
     * @param attr 属性
     */
    static exchange(obj1: any, obj2: any, attr: string) {
        let tempValue = obj1[attr];
        obj1[attr]=obj2[attr];
        obj2[attr]=tempValue;
    }
}