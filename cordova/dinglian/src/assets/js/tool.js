/**
 * Created by yuanxiaogang on 2017/7/12.
 */
import { Toast } from 'mint-ui'
// 校验手机号码
function judgmentTel (tel) {
  var myreg = /^1(3|4|5|7|8)\d{9}$/
  if (tel === '') {
    Toast({
      message: '手机号不能为空',
      duration: 500
    })
    return false
  } else if (tel.length !== 11) {
    Toast({
      message: '手机号不正确',
      duration: 500
    })
    return false
  } else if (!myreg.test(tel)) {
    Toast({
      message: '请输入有效的手机号',
      duration: 500
    })
    return false
  }
  return true
}
// 校验密码
function judgmentpsw (psw) {
  let badword = ';|<>`&!*(~^)#?:"/$=\\' + "'"
  let i = 0
  if (psw === '') {
    Toast({
      message: '密码不能为空',
      duration: 500
    })
    return false
  } else if (psw.length < 6 || psw.length > 13) {
    Toast({
      message: '密码不能少于6位或者多于13位',
      duration: 500
    })
    return false
  } else {
    for (; i < psw.length; i++) {
      var char = psw.charAt(i)
      if (badword.indexOf(char) >= 0) {
        Toast({
          message: '密码错误，不能包含字符：' + char,
          duration: 1000
        })
      }
    }
  }
  return true
}
// 判断是否为正整数
function isPositiveNum (s) {
  var re = /^[0-9]*[1-9][0-9]*$/
  return re.test(s)
}
export {
  judgmentTel,
  judgmentpsw,
  isPositiveNum
}
