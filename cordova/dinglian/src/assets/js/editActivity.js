/**
 * Created by yuanxiaogang on 2017/7/12.
 */
import { Toast } from 'mint-ui'
import { judgmentTel, isPositiveNum } from './tool'
function checkActivityInfo (name, userCount, charge, address, phoneNo) {
  if (name.length === 0) {
    Toast({
      message: '标题不能为空！',
      duration: 500
    })
    return false
  } else if (address.length === 0) {
    Toast({
      message: '活动地址不能为空！',
      duration: 500
    })
    return false
  } else if (!isPositiveNum(userCount)) {
    Toast({
      message: '活动人数请填写正确！',
      duration: 500
    })
    return false
  } else if (charge.length === 0) {
    Toast({
      message: '费用不能为空！',
      duration: 500
    })
    return false
  } else if (phoneNo.length > 0) {
    return judgmentTel(phoneNo)
  } else {
    return true
  }
}
export {
  checkActivityInfo
}
