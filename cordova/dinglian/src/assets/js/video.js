/**
 * 摄像头
 * Created by yuanxiaogang on 2017/7/15.
 */
function takePhoto () {
  navigator.camera.getPicture(takeSuccess, takeFail, {
    destinationType: navigator.camera.DestinationType.DATA_URL
  })
  function takeSuccess () {
    console.log('success')
  }
  function takeFail () {
    navigator.notification.alert('拍照失败，原因')
  }
}
export {
  takePhoto
}
