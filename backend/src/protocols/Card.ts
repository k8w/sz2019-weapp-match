export interface Card {
    id: string;
    /** 头像 */
    avatar: string;
    /** 姓名 */
    name: string;
    /** 电话 */
    tel: string;
    /** 公司 */
    company: string;
    /** 职位 */
    title: string;
    /** 最后更新时间 */
    lastModified: uint;
    /** 创建时间 */
    created: uint;
}