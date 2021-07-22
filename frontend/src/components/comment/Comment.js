import React, { Fragment, useState, useEffect, createElement } from "react";

import {
  Comment,
  Avatar,
  Rate,
  Tooltip,
  Button,
  Modal,
  Input,
  Image,
  Dropdown,
  Menu,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./Comment.css";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  HeartOutlined,
  ShareAltOutlined,
  UpOutlined,
  DownOutlined,
  CheckOutlined,
  MoreOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  deleteReview,
  getProductReviews,
  getSingleProduct,
} from "../../actions/productActions";

const { TextArea } = Input;
const CommentComponent = ({ review, user }) => {
  const [expand, setExpand] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  // const productReviews = useSelector(state => state.productReviews)
  // const {product} = useSelector(state => state.getProduct)
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };


  return (
    <Fragment>
      <Comment
        //   name

        author={<a style={{ color: "#222" }}>{review.name}</a>}
        avatar={
          <Avatar
            src={
              review.userProfile ? review.userProfile : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
            }
            alt="Han Solo"
          />
        }
        style={{ maxWidth: 760 }}
        content={
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Rate
                style={{
                  color: "#222",
                  paddingBottom: 12,
                  fontSize: 15,
                  display: "block",
                }}
                allowHalf
                disabled
                defaultValue={review.rating}
              />
              <a
                style={{ fontSize: 12 }}
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                {expand ? <UpOutlined /> : <DownOutlined />}
              </a>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{ padding: "0 10px", paddingRight: 20, maxWidth: 535 }}
              >
                <p style={{ marginBottom: 6 }}>
                  {review.comment.substring(0, 200)}
                  {review.comment.length > 200 && expand ? (
                    <> {review.comment.substring(200, 2000)}</>
                  ) : (
                    <>{review.comment.length > 200 ? <>... </> : null}</>
                  )}
                </p>

                <Tooltip key="comment-basic-like" title="Like">
                  <span onClick={like} style={{ fontSize: 14, marginRight: 5 }}>
                    {createElement(
                      action === "liked" ? LikeFilled : LikeOutlined
                    )}
                    <span className="comment-action">{likes}</span>
                  </span>
                </Tooltip>
                <Tooltip key="comment-basic-dislike" title="Dislike">
                  <span
                    onClick={dislike}
                    style={{ fontSize: 14, margin: "0px 5px" }}
                  >
                    {React.createElement(
                      action === "disliked" ? DislikeFilled : DislikeOutlined
                    )}
                    <span className="comment-action">{dislikes}</span>
                  </span>
                </Tooltip>

                <span
                  key="comment-basic-reply-to"
                  onClick={openModal}
                  style={{ fontSize: 14, margin: "0px 5px" }}
                >
                  Reply to
                </span>
                <Modal
                  title="Comment & Rating"
                  visible={showModal}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                      REPLY
                    </Button>,
                  ]}
                >
                  {/* <h6 style={{margin: 0}}>Rate </h6> */}
                  <Rate
                    style={{
                      color: "#222",
                      fontSize: 17,
                      paddingBottom: 12,
                      marginBottom: 6,
                    }}
                    allowHalf
                    defaultValue={0}
                  />
                  <TextArea rows={10} placeholder="Type your comment..." />
                </Modal>
              </div>

              {/* <Dropdown trigger={['click']} overlay={(
                  <Menu>
                  <Menu.Item  >
                    <a ><DeleteOutlined />  Delete</a>
                  </Menu.Item>
                  <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                      1st menu item
                    </a>
                  </Menu.Item>
             
                </Menu>
                )}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <MoreOutlined   />
    </a>
  </Dropdown> */}
              {/* {review.pictures ? (
                <div>
                  <Image
                    width={100}
                    height={100}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </div>
              ) : null} */}

              {review.pictures && review.pictures.length ? (
               <div style={{paddingRight: 40}}>
                  <Image
                  width={100}
                  height={80}
                  style={{ objectFit: "cover" }}
                  src={review.pictures[0].url}
                />
               </div>
              ) : null}
            </div>
          </>
        }
        datetime={
          <Tooltip
            title={moment(review.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          >
            <span style={{ color: "#222" }}>
              {moment(review.createdAt).fromNow()}
            </span>
          </Tooltip>
        }
      />
    </Fragment>
  );
};

export default CommentComponent;
