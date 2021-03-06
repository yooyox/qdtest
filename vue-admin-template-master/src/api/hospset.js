import request from '@/utils/request'

export default {
  //查询
  getHospSetList(current,limit,searchObj) {
    return request ({
      url: `/admin/hosp/hospitalSet/findHospitalSetByPage/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  //删除
  removeDataById(id) {
    return request ({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete',
    })
  },

  //批量删除
  batchRemoveHospitalSet(idList) {
    return request ({
      url: `/admin/hosp/hospitalSet/batchRemoveHospitalSet`,
      method: 'delete',
      data: idList
    })
  }
}
