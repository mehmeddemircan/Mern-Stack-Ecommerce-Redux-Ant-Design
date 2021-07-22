import { Button, Image, Card , Avatar} from "antd";
import React from "react";
import Layout from "../components/layout/Layout";
import { Result } from "antd";
import { SmileOutlined, ShopOutlined, HeartOutlined,  EditOutlined ,UserOutlined} from "@ant-design/icons";
import {useSelector,useDispatch} from 'react-redux'
// if user profile we will put like image , but no user photo , we will show the 2 first letter 

const FavouritesPage = () => {

  const auth = useSelector(state => state.auth)
  const {user} = auth 

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* if there is no image , show avatar width  */}
      <div style={{width: 100}}>
      <Image
          style={{ borderRadius: 15 }}
          width={100}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
         {/* <Avatar size={100} icon={<UserOutlined />} /> */}
      </div>

        <div>
          <h2 style={{ padding: "0 15px" }}>
            {user.name}
            <Button
              href="/profile/me"
              style={{
                color: "rgba(34,34,34)",
                background: "rgba(34, 34, 34, 0.075)",
                fontSize: 16,
                border: "none",
                marginLeft: 12
              }}
              shape="round"
              icon={<EditOutlined />}
            >
              Edit profile
            </Button>
          </h2>

          <div style={{ padding: "0 15px" }}>
            <a style={{ padding: "0 8px" }}>0 followers</a>
            <a style={{ padding: "0 8px" }}>0 following</a>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <Card
          style={{
            width: 200,
            marginTop: 15,
            marginRight: 10,
            textAlign: "center",
            background: "rgba(34, 34, 34, 0.075)",
            borderRadius: 20
          }}
          hoverable
          title="Favourites Items"
        >
          <HeartOutlined style={{ fontSize: 30 }} />
        </Card>
        <Card
          style={{
            width: 200,
            marginTop: 15,
            marginLeft: 10,
            textAlign: "center",
            background: "rgba(34, 34, 34, 0.075)",
            borderRadius: 20
          }}
          hoverable
          title="Favourites Shops"
        >
          <ShopOutlined style={{ fontSize: 30 }} />
        </Card>
      </div>

     {/* Result page not found in wishlist page */}
     <div style={{ display: "flex", justifyContent: "center" }}>
        <Result
          icon={<SmileOutlined />}
          title={
            <>
              <h4> Nothing here yet</h4>
              <p style={{ width: 470, textAlign: "center", fontSize: 15 }}>
                These are a few of your favourite things or you can start your
                market and your market can be favourites of the another people
                start now
              </p>
            </>
          }
          extra={<Button type="primary">Create Market</Button>}
        />
      </div>
    </Layout>
  );
};

export default FavouritesPage;
