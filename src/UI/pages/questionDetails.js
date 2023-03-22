import React, { useEffect, useState } from 'react'
import { Dropdown, Modal, ModalBody } from "react-bootstrap"
import { HeaderFlex, HeaderText, HeaderText1, HeaderText2, ModalFooter, TipButton, TipButton1 } from '../styles/index.styled'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import VerifiedIcon from '@mui/icons-material/Verified';
import '../styles/home.css'
import CheckIcon from '@mui/icons-material/Check';
import makePatchRequest from '../../api/patchApi';
import RefreshIcon from '@mui/icons-material/Refresh';
import makeChatGetRequest from '../../api/chatGetApi';
import SeekBar from './seekbar';
import ClearIcon from '@mui/icons-material/Clear';
import 'react-seekbar-component/dist/index.css'

const ReadMore = ({ children }) => {
    const text = children;
    console.log(text.toString().length);
    const [ReadMore, setReadMore] = useState(false)
    useEffect(() => {
        text.toString().length > 100 && (setReadMore(true))
    })

    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <div className="text">
            {isReadMore ? text.toString().slice(0, 80) : text}
            {ReadMore && <span onClick={toggleReadMore} className="read-or-hide" style={{ color: "chocolate", cursor: "pointer" }}>
                {isReadMore ? "...read more" : " show less"}
            </span>}
        </div>
    );
};
function QuestionDetails({ show, handleClosed, data, commonQues }) {
    console.log(commonQues.flat(1));
    const combineArray = commonQues.flat(1);
    const handleChange = () => {

        handleClosed()
    }

    return (
        <Modal className='positionModel1' style={{ paddingRight: "0px" }} show={show} onHide={() => { return handleChange() }} centered  >

            <div className='modelCenter2' >
                <div style={{ borderBottom: "1px solid grey", marginRight: "35px", marginLeft: "35px" }}>
                    <div className='questionText' style={{ color: "rebeccapurple",marginBottom:"5px" }}>

                        <ReadMore>{combineArray[0]?.question}</ReadMore>
                    </div>
                    <div style={{marginBottom:"20px"}}>-(prompt)</div>
                </div>
                <div className='modelNameText1'>
                    {combineArray.map((item) => {
                        return (


                            <div className='modelNameText2' style={{ marginTop: "20px" }}>
                                {/* <HeaderFlex style={{ paddingLeft: "20px", paddingRight: "0px", paddingTop: "20px" }}> */}
                                <HeaderFlex style={{ alignItems: "center", boxSizing: "border-box" }}>
                                    {/* <HeaderText2 style={{ width: "178px",marginLeft: "0px", marginBottom: "0px" }} >Model name</HeaderText2> */}
                                    <div style={{ display: "flex", width: "50%", fontSize: "17px", color: "blue", fontWeight: "bold" }}>
                                        <span style={{ color: "rebeccapurple" }}>{item.model}</span>
                                    </div>
                                    <div style={{ display: 'flex', width: "50%", justifyContent: "end", color: "gray" }}>
                                        <div style={{ fontSize: "17px" }}>
                                            {item.day}
                                        </div><div style={{ marginLeft: "15px", fontSize: "17px" }}>
                                            {item.time}
                                        </div>
                                    </div>
                                </HeaderFlex>

                                {/* <HeaderFlex style={{ marginTop: "10px", alignItems: "center",justifyContent:"center" }}>
                                    <div style={{ display: "flex", width: "90%", fontSize: "22px", wordBreak: "break-word", justifyContent: "center" }}>
                                        {item.apiKey}
                                    </div>
                                </HeaderFlex> */}

                                <HeaderFlex style={{ marginTop: "10px", alignItems: "center", marginBottom: "20px" }}>
                                    {/* <HeaderText2 style={{ width: "168px", marginLeft: "0px", marginBottom: "0px" }} >completion</HeaderText2> */}
                                    <div style={{ display: "flex", width: "90%", fontSize: "18px", wordBreak: "break-word", }}>
                                        <ReadMore>{item.answer} </ReadMore>
                                    </div>
                                </HeaderFlex>

                            </div>
                        )
                    })}
                </div>



                <ModalFooter style={{ justifyContent: "center" }}>

                    <TipButton1 variant="primary" onClick={() => { handleChange() }}>
                        OK
                    </TipButton1>
                </ModalFooter>

            </div>


        </Modal>
    )
}

export default QuestionDetails
