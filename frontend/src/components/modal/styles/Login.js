import styled from "styled-components/macro";

export const LoginPopup = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1099;
  background-color: rgba(0, 0, 0, 0.6);
  visibility: visible;
  opacity: 1;
  transition: all 1s ease;

 
    /* .login-popup .box {
      width: calc(100% - 30px);
 
    .login-popup .box .img-area {
      display: none;
    }
    .login-popup .box .form {
      flex: 0 0 100%;
      max-width: 100%;
    } */
  
`;
export const Box = styled.div`
  background-color: #ffffff;
  width: 800px;
  height: 530px; // height fixed
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  opacity: 1;
  margin-left: 50px;
  transition: all 1s ease;

  overflow: hidden
`;
export const ImageArea = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  height: 530px;
  position: relative;
  overflow: hidden;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 25px;
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 5px;
    color: #222;
  }
`;
export const FormControl = styled.input`
  height: 30px;
  margin-bottom: 14px;
  width: 100%;
  border: none;
  border-bottom: 1px solid #cccccc;
  font-size: 15px;

  :focus {
    outline: none;
  }
`;
export const Label = styled.label`
  font-size: 15px;
  color: #555555;
`;
export const Button = styled.button`
  width: 100%;
  background: black;
  margin-top: 25px;
  height: 45px;
  border: none;
  border-radius: 25px;
  font-size: 15px;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  :focus {
    outline: none;

    transition: 1.2s;
    :hover {
      transform: scale(1.03);
    }
  }
`;
export const Image = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.pexels.com/photos/4127636/pexels-photo-4127636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  background-position: center;
  animation: zoomInOut 7s linear infinite;

  z-index: -1;

  @keyframes zoomInOut {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;
export const LoginForm = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 40px 30px;

  /* benim yaptigim degisiklik */
  /* max-height: 100%; */

  p {
    text-align: center;
    line-height: 15px;
    margin: 15px;
  }

  h4 {
    text-align: center;
    margin: 0 auto;
    display: block;
    width: 100%;
    margin-bottom: 10px;
    line-height: 25px;
  }

  h3 {
    color: #000000;
    font-size: 18px;
    font-weight: 500;
    margin: 0 5px 30px;
    display: inline-block;

    line-height: 30px;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #222;
    color: #222222;
    transition: 0.2s;

    :hover {
      /* transform: scale(1.1); */
      transform: translateY(-23%);
    }
  }
`;
export const Close = styled.div`
  position: absolute;
  right: 4px;
  top: -3px;
  width: 25px;
  border-radius: 20%;
  font-size: 30px;
  cursor: pointer;
  color: #222;

  text-align: center;
`;
export const LinkOps = styled.a`
display:'inline-block';
min-width: 50px;
  margin-left: 30px;
  padding-left: 50px ;
  font-size: 14px;
  color: #222;
  
`;
export const SocialMediaList = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SocialMedia = styled.a`
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #f1f1f1;
  margin: 10px 36px;
  padding: 4px;
  border-radius: 30%;
  box-shadow: 0 5px 15px -5px #00000070;
  color: #3498db;
  overflow: hidden;
  position: relative;
  text-align: center;

  i {
    line-height: 30px;
    font-size: 25px;
    transition: 0.2s linear;
  }
  :hover i {
    transform: scale(1.2);
    color: #f1f1f1;
  }
  ::before {
    content: "";
    position: absolute;
    width: 120%;
    height: 120%;
    background: #3498db;
    transform: rotate(45deg);
    left: -110%;
    top: 90%;
  }
  :hover::before {
    animation: aaa 0.7s 1;
    top: -10%;
    left: -10%;
  }
  :nth-child(1) {
    color: #3b5998;
  }
  :nth-child(2) {
    color: #db4437;
  }
  :nth-child(3) {
    color: black;
  }
  @keyframes aaa {
    0% {
      left: -110%;
      top: 90%;
    }
    50% {
      left: 10%;
      top: -30%;
    }
    100% {
      top: -10%;
      left: -10%;
    }
  }
`;
export const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 15px;
`;
