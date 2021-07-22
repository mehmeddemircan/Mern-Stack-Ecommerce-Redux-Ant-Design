import React from 'react'
import Layout from '../components/layout/Layout'
import { Collapse } from 'antd';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const FAQ = () => {
    return (
        <Layout>
          <div style={{background: 'rgb(253, 235, 210)',borderRadius: 15 }}>
           <h2 style={{textAlign: 'center', marginBottom: 30}}>Frequently Asked Questions</h2>
      <div style={{display:'flex',justifyContent:'center', }}>
    
      <Collapse defaultActiveKey={['1']} onChange={callback} style={{width: 600, }}>
    <Panel header="This is panel header 1" key="1" >
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 4" key="4" >
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 5" key="5">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 6" key="6">
      <p>{text}</p>
    </Panel>
  </Collapse>
      </div>
      </div>
        </Layout>
    )
}

export default FAQ
