import request from '@/utils/request'
/**
 * @name: 养蜂记录列表
 * @param {type}
 * @return {type}
 */
export function BeekeepingGetList(data) {
    return request({
        url: 'village/Beekeeping/getList',
        method: 'post',
        data
    })
}
/**
 * @name: 添加养蜂记录
 * @param {type}
 * @return {type}
 */
export function BeekeepingAdd(data) {
    return request({
        url: 'village/Beekeeping/add',
        method: 'post',
        data
    })
}
/**
 * @name: 修改养蜂记录
 * @param {type}
 * @return {type}
 */
export function BeekeepingEdit(data) {
    return request({
        url: 'village/Beekeeping/edit',
        method: 'post',
        data
    })
}
/**
 * @name: 删除养蜂记录
 * @param {type}
 * @return {type}
 */
export function BeekeepingDel(data) {
    return request({
        url: 'village/Beekeeping/del',
        method: 'post',
        data
    })
}

/**
 * @name: 养蜂记录列表
 * @param {type}
 * @return {type}
 */
export function VideoGetList(data) {
    return request({
        url: 'village/Video/getList',
        method: 'post',
        data
    })
}
/**
 * @name: 添加养蜂记录
 * @param {type}
 * @return {type}
 */
export function VideoAdd(data) {
    return request({
        url: 'village/Video/add',
        method: 'post',
        data
    })
}
/**
 * @name: 修改养蜂记录
 * @param {type}
 * @return {type}
 */
export function VideoEdit(data) {
    return request({
        url: 'village/Video/edit',
        method: 'post',
        data
    })
}
/**
 * @name: 删除养蜂记录
 * @param {type}
 * @return {type}
 */
export function VideoDel(data) {
    return request({
        url: 'village/Video/del',
        method: 'post',
        data
    })
}

export function VidelDetail(data){
  return request({
      url: 'village/Video/detail',
      method: 'post',
      data
  })
}

/**
 * @name: 特色景点列表
 * @param {type}
 * @return {type}
 */
export function viewpointGetList(data) {
    return request({
        url: 'village/Viewpoint/getList',
        method: 'post',
        data
    })
}
/**
 * @name: 乡村景点记录
 * @param {type}
 * @return {type}
 */
export function viewpointAdd(data) {
    return request({
        url: 'village/Viewpoint/add',
        method: 'post',
        data
    })
}
export function viewpointEdit(data) {
    return request({
        url: 'village/Viewpoint/edit',
        method: 'post',
        data
    })
}
export function viewpointDel(data) {
    return request({
        url: 'village/Viewpoint/del',
        method: 'post',
        data
    })
}

export function viewpointDetail(data){
  return request({
      url: 'village/Viewpoint/detail',
      method: 'post',
      data
  })
}

/**
 * @name: 精准扶贫记录
 * @param {type}
 * @return {type}
 */
export function fupinGetList(data) {
    return request({
        url: 'village/Fupin/getList',
        method: 'post',
        data
    })
}
export function getSearchParams(data) {
    return request({
        url: 'village/Fupin/getSearchParams',
        method: 'post',
        data
    })
}
export function fupinAdd(data) {
    return request({
        url: 'village/Fupin/add',
        method: 'post',
        data
    })
}
export function fupinEdit(data) {
    return request({
        url: 'village/Fupin/edit',
        method: 'post',
        data
    })
}
export function fupinDel(data) {
    return request({
        url: 'village/Fupin/del',
        method: 'post',
        data
    })
}

export function fupinDetail(data){
  return request({
      url: 'village/Fupin/detail',
      method: 'post',
      data
  })
}

/**
 * @name: 特色农产品记录
 * @param {type}
 * @return {type}
 */
export function productGetList(data) {
    return request({
        url: 'village/Product/getList',
        method: 'post',
        data
    })
}
export function productAdd(data) {
    return request({
        url: 'village/Product/add',
        method: 'post',
        data
    })
}
export function productEdit(data) {
    return request({
        url: 'village/Product/edit',
        method: 'post',
        data
    })
}
export function productDel(data) {
    return request({
        url: 'village/Product/del',
        method: 'post',
        data
    })
}

export function productDetail(data){
  return request({
      url: 'village/Product/detail',
      method: 'post',
      data
  })
}
