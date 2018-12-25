export default class SearchUtil {
    /**
     * 字母快速查询
     */
    static fastSearch(): any[] {
        let str = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let list = [];
        str.forEach(item => {
            list.push({
                'BUSTYPE': 'fastsearch',
                'ACTCODE': item,
                'BTNNAME': item
            });
        });
        return list;
    }
}