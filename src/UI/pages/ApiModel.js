import React from 'react'
import { Modal, ModalBody } from "react-bootstrap"
import { HeaderFlex, HeaderText, HeaderText1, ModalFooter, TipButton, TipButton1 } from '../styles/index.styled'
import '../styles/home.css'

function ApiKeyBox({ show, handleClosed }) {
    const handleChange = () => {
        handleClosed()
    }
  
    const HandleButton = () => {
       
        handleClosed()
    }

    return (
        <Modal className='positionModel' show={show} onHide={handleChange} centered  >
            <div className='modelCenter'>
            <HeaderFlex style={{paddingLeft:"20px",paddingRight:"0px",paddingTop:"10px"}}>
                <HeaderText1 className='modalChatWidth' >Model name</HeaderText1>
                <input className='modalTextWidth'/>
            </HeaderFlex>
            <HeaderFlex style={{paddingLeft:"20px",paddingRight:"0px",paddingTop:"10px"}}>
                <HeaderText1 className='modalChatWidth'>Api key</HeaderText1>
                <input className='modalTextWidth'/>
            </HeaderFlex>
            <ModalFooter>
                <TipButton variant="secondary" onClick={handleChange}>
                    Close
                </TipButton>
                <TipButton1 variant="primary" onClick={HandleButton}>
                   SET
                </TipButton1>
            </ModalFooter>
            </div>
        </Modal>
    )
}

export default ApiKeyBox
