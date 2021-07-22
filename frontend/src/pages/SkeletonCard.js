import React , {useState}from 'react'

import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
const SkeletonCard = () => {

    const [loading, setLoading] = useState(true)


    return (
        <>
          
{/* part1  */}
<Card style={{ width: 300, marginTop: 16 }} loading={loading}>
  <Meta
    avatar={
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    }
    title="Card title"
    description="This is the description"
  />
</Card>

{/* part2  */}
<Card
  style={{ width: 300, marginTop: 16 }}
  actions={[
    <SettingOutlined key="setting" />,
    <EditOutlined key="edit" />,
    <EllipsisOutlined key="ellipsis" />,
  ]}
>
  <Skeleton loading={loading} avatar active>
    <Meta
      avatar={
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      }
      title="Card title"
      description="This is the description"
    />
  </Skeleton>
</Card>   
        </>
    )
}

export default SkeletonCard



