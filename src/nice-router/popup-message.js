import React from 'react'

export default class PopupMessage extends React.PureComponent {
  static globalView = null

  static close() {
    if (PopupMessage.globalView) {
      PopupMessage.globalView.close()
    }
  }

  static show() {}
}
