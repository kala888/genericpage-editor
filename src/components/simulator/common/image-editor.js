import React from 'react'
import { Icon, message, Modal, Upload } from 'antd'
import EditorHelper from '../editor-helper'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default class ImageEditor extends React.Component {
  constructor(props, context) {
    super(props, context)
    console.log('ImageEditor', props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: props.defaultValue || [],
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }

  handleSuccess = (payload) => {
    // const { id, componentId } = this.props
    // this.setState(pre => {
    //   const fileList = _.concat(pre.fileList, { ...payload, uid: uuid() })
    //   console.log('success22222', fileList)
    //   return ({ fileList })
    // }, () => console.log('success', this.state.fileList))
  }

  handleChange = (info) => {
    console.log('xxximage,change', info)
    const { fileList } = info

    const status = info.file.status
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done' || status === 'removed') {
      message.success(`${info.file.name} file uploaded successfully.`)
      const value = fileList.map((it) => ({
        uid: it.uid,
        name: it.name,
        status: 'done',
        url: it.url || it.imageUrl || it.thumbUrl,
      }))
      const { name, componentId } = this.props
      EditorHelper.updateValues({ name, componentId, value })
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }

    //重新设置state
    this.setState({ fileList: [...fileList] })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const { title = '长传' } = this.props

    console.log('fileList', fileList)

    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>上传图片</div>
      </div>
    )
    return (
      <div className='clearfix'>
        <div>{title}</div>
        <Upload
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          listType='picture-card'
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
