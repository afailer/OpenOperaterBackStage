import request from '@/utils/request'
import ossRequest from '@/utils/ossReq'
import {domain} from './url'

export default {
    // 保险列表
    getProductList:(page, limit,params)=>{
        return request({
            url: `${domain}/forward/spulist/admin/product_list/${page}/${limit}`,
            method: 'get',
            params: params
        })
    },
    // 标签列表
    getTagList: () => {
        return request({
            url: `${domain}/forward/spulist/admin/tag_list`,
            method: 'get'
        })
    },
    // 创建，编辑，删除（在对象中加上is_deleted=1）标签
    createTag: (params) => {
        return request({
            url: `${domain}/forward/spulist/admin/create/tag`,
            method: 'post',
            data: params
        })
    },
    // 拿到保险对应的标签
    getInsuranceTag: (insurance_id) => {
        return request({
            url: `${domain}/forward/spulist/admin/tag_by_recommend/${insurance_id}`,
            method: 'get'
        })
    },
    // 添加，编辑，删除保险
    handleInsurance: (params) => {
        return request({
            url: `${domain}/forward/spulist/admin/create/product`,
            method: 'post',
            data: params
        })
    },
    //拿到标签对应的保险
    getTagRelation: (tag_id) => {
        return request({
            url: `${domain}/forward/spulist/admin/tag_relation/${tag_id}`,
            method: 'get'
        })
    },
    // 修改保险关系的优先级
    changeTagInsuranceSort: (params) => {
        return request({
            url: `${domain}/forward/spulist/admin/recommend_tag/sort`,
            method: 'post',
            data: params
        })
    },
    // banner列表
    getBannerList: () => {
        return request({
            url: `${domain}/forward/spulist/admin/banner`,
            method: 'get'
        })
    },
    createBanner: (params) => {
        return request({
            url: `${domain}/forward/spulist/admin/create/banner`,
            method: 'post',
            data: params
        })
    },
    // 修改tag优先级
    changeTagSort: (params) => {
        return request({
            url: `${domain}/forward/spulist/admin/tag/sort`,
            method: 'post',
            data: params
        })
    },
    // 修改banner的优先级排序
    changeSwipeSort: (params) => {
        return request({
            url: `${domain}/forward/spulist/admin/banner/sort`,
            method: 'post',
            data: params
        })
    },
    clearCache: () => {
        return request({
            url: `${domain}/forward/spulist/admin/clear_cache`,
            method: 'get'
        })
    },
    sendOss: (formData) => {
        formData.append("business_type", "qseb_glht")
        return ossRequest.post(`https://centerfiles.qschou.com/file/tmp_upload`, formData)
        
        //return request.post(`http://121.40.175.176:10008/file/upload`, formData)
    }
}