import request from '@/utils/request'

export default {
  getHospSetList(current,limit,searchObj) {
    return request ({
      url: `/admin/hosp/hospitalSet/findHospitalSetByPage/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  }
}
