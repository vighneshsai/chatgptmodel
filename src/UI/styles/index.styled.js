import styled from "styled-components";

export const RootContainer = styled.div`
display:flex ;
justify-content:center ;
background-color:rgb(0,30,60) ;
margin-bottom:10px;
  
`
export const InnerRootContainer = styled.div` 
width:98.5% ;
height:85px ;
// border-radius:5px;
display:flex ;
padding-left:10px ;
padding-top:30px ;
border:none ;
box-sizing:border-box ;
align-items:center ;
padding-bottom:20px ;
justify-content:space-between ;
&:hover{
      background-color:rgb(19, 47, 76);
      width:100% ;
      border-radius:10px ;
      border:1px solid #009BEF ;
  }
`
export const Name = styled.p`

 font-family:Sofia Pro;
 font-size:15px;
 color:#fff;

`
export const SubTitle = styled.p`
font-family:Sofia Pro;
font-size:15px;
color:rgb(148, 160, 178);
`
export const Transaction = styled.p`
font-family:Sofia Pro;
font-size:15px;
color:rgb(102, 178, 255);
`
export const RightContainer = styled.div`
display:flex;
align-items:flex-end;
flex-direction:column;
`
export const HorizontalLine = styled.hr`
 width:80%;
 position:relative;
 left:14px;
 height:2;
 color:rgb(102, 178, 255);
`
export const HeaderText = styled.div` 
color:white;
font-size:18px ;
`
export const HeaderText1 = styled.div` 
color:#777E90;
font-size:18px ;
`
export const HeaderText2 = styled.div` 
color:#777E90;
font-size:22px ;
margin-bottom:20px;
    margin-left: 10%;

`
export const HeaderFlex = styled.div` 
display:flex ;
justify-content:space-between
margin-top:15px ;
padding-top:10px
margin-left:10px ;
align-items:center ;
`
export const ModelBody = styled.div` 
margin-left:25px ;
`
export const ModalFooter = styled.div` 
display:flex;
justify-content:space-between ;

padding:20px ;
padding-right:10%;
padding-left:10%
`
export const TipButton = styled.button` 
border:none;
background-color:#353945 ;
color:white ;
cursor:pointer;
height:40px ;
border-radius:6px ;
width:100px ;
font-family:Sofia Pro ;
`
export const TipButton1 = styled.button` 
border:none;
background-color:#3772FF ;
color:white ;
height:40px ;
width:100px;
cursor:pointer;

margin-left:10px ;
border-radius:6px ;
font-family:Sofia Pro ;
`
export const SpinContainer1 = styled.div` 
margin-left:180px
`