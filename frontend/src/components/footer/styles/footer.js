import styled from "styled-components/macro";

export const Footer = styled.footer`
    background-color: #070707;
	padding: 70px 0;
	/* it is arranging bottom line  */
	position: relative;


	a {
		text-decoration:none
	}



}


`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const Ul = styled.ul`
  list-style: none;
`;
export const FooterCol = styled.div`
       width: 20%;
   padding: 0 12px;


    h4 {
        font-size: 18px;
	color: #ffffff;
	text-transform: capitalize;
	margin-bottom: 35px;
	font-weight: 500;
	position: relative;
    }

   
        
    h4:hover {
	color: #3498db;
}
ul li:not(:last-child){
	margin-bottom: 10px;
}

ul li a{
	font-size: 16px;
	text-transform: capitalize;
	color: #ffffff;
	text-decoration: none;
	font-weight: 300;
	color: #bbbbbb;
	display: block;
	transition: all 0.3s ease;


	

	
}

ul li a:hover{

color: #2ecc71;
padding-left: 8px;

}


.social-links a{
	display: inline-block;
	height: 40px;
	width: 40px;
	font-size: 22px;
	background-color: rgba(255,255,255,0.2);
	margin:0 10px 5px 0;
	text-align: center;
	line-height: 40px;
	border-radius: 50%;
	color: #ffffff;
	transition: all 0.5s ease;
}
.social-links a:hover{
	color: #24262b;
	background-color: #ffffff;
}

         /*responsive for tablets*/
         @media(max-width: 767px){

    width: 50%;
    margin-bottom: 30px;

}
/* phones */
@media(max-width: 574px){
  
    width: 100%;



`;

export const FooterLogo = styled.div`
  a {
    font-size: 25px;
    color: #ffffff;
    text-transform: capitalize;
    display: inline-block;
    padding: 15px;
    margin-left: 20px;

    font-weight: 500;
  }
`;
export const FooterBottom = styled.div`
  margin: 0 auto;
  position: relative;
  top: 4em;

  p {
    color: #ffffff;
    position: relative;
  }

  p:hover {
    color: #f39c12;
  }
`;
export const Container = styled.div`
  max-width: 1170px;
  margin: auto;
`;
