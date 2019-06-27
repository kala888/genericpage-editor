import { Toast as AntdToast } from 'antd-mobile'

export default class NiceMessage {
  static sad(text, ...other) {
    AntdToast.fail(text, ...other)
  }

  static show(text, ...other) {
    AntdToast.show(text, ...other)
  }
}
