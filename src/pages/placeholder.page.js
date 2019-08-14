import React from 'react'
import { WhiteSpace } from 'antd-mobile'
import { Skeleton } from 'antd'

export default function PlaceholderPage() {
  return (
    <div style={{ marginTop: 40, marginLeft: 30, marginRight: 30 }}>
      <WhiteSpace size='lg' />
      <Skeleton avatar={{ size: 'large' }} paragraph={{ rows: 4 }} />

      <WhiteSpace size='lg' />
      <Skeleton avatar={{ size: 'large' }} active paragraph={{ rows: 4 }} />

      <WhiteSpace size='lg' />
      <Skeleton avatar={{ size: 'large' }} paragraph={{ rows: 4 }} />

      <WhiteSpace size='lg' />
      <Skeleton avatar={{ size: 'large' }} paragraph={{ rows: 4 }} />
    </div>
  )
}
