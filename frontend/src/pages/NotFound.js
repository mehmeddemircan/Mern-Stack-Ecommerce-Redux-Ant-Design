import React from 'react'
import { Result, Button } from 'antd';
import Layout from '../components/layout/Layout'
import MetaData from '../components/layout/MetaData';
import { useTranslation } from 'react-i18next';



const NotFound = () => {

    const {t} = useTranslation()
    return (
      <Layout>
        <MetaData title={t("mainTitle.home")}/>
         <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" href="/">Back Home</Button>}
    />
  
      </Layout>
    )
}

export default NotFound


