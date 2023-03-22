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
import makePostRequest from '../../api/postApi';
import toast, { Toaster } from "react-hot-toast";


function ChatRenameBox({ show, handleClosed, chatId, modelList, setModelList, typeCount, setTypeCount, data, setData }) {
    const handleChange = () => {
        {
            typeCount != undefined && setData({ ...data, ["typeCount"]: typeCount - 1 })
            // setTypeCount(typeCount - 1)
        }
        setData({ ...data, ["apiKeyText"]: "", ["modelText"]: "", ["modelList"]: [] });

        // setApiKeyText("");
        // setModelText("");
        // setModelList([]);
        handleClosed()
    }
    useEffect(() => {
        modelList === "editChat" && setNext(3)
    })
    const [next, setNext] = useState(0)
    const HandleButton = async () => {

        {
            chatId != "" &&
                await makePatchRequest(`/chat/${chatId}`, {
                    "chatName": data.chatName, "model": data.modelText, "apiKey": data.apiKeyText,

                    "temperature": data.tempValue / 100,
                    "maxLength": data.lengthValue,
                    "frequencyPenality": data.FrequencyValue / 100,
                    "presensePenality": data.presencePenality / 100,
                    "bestOf": data.bestOfValue / 10,
                    "stopSequence": data.stopSequence,
                    "showProbablity": data.probality,
                    "startType": data.startType,
                    "reStartType": data.restartType,
                })
        }
        await makePostRequest(`/chat`, [

            {
                "chatName": data.chatName,
                "apiKey": data.apiKeyText,
                "model": data.modelText,
                "temperature": data.tempValue / 100,
                "maxLength": data.lengthValue,
                "frequencyPenality": data.FrequencyValue / 100,
                "presensePenality": data.presencePenality / 100,
                "bestOf": data.bestOfValue / 10,
                "stopSequence": data.stopSequence,
                "showProbablity": data.probality,
                "startType": data.startType,
                "reStartType": data.restartType,
                "modelValues": [
                    { "chatValues": data.modelList }
                ],

            },])
        setNext(0)
        // setApiKeyText("");
        // setModelText("")
        handleClosed();

        // setModelList([]);
    }
    const getModelFunction = async (apiKey, text) => {

        setData({ ...data, ["modelList"]: [], ["modelText"]: "" });
        const result = await makeChatGetRequest('/models', apiKey);
        (chatId !== "" && chatId !== undefined) && await makePatchRequest(`/chats/${chatId}`, { "chatValues": result.data })
        console.log(result);

        result.data && (setData({ ...data, ["modelList"]: result?.data, ["modelText"]: result?.data[0]?.id }));

        (text === "next" && result.data) && setNext(2);
        (result.data) && (
            toast.success("Api key is valid", {
                style:
                {
                    border: "1px solid rgb(19, 47, 76)",
                    position: "relative",
                    top: "80px",
                    background: "rgb(19, 47, 76)",
                    color: "rgb(102, 178, 255)"
                }
            }));
        (result?.error !== undefined) && (toast.error("Api key is invalid", {
            style:
            {
                border: "1px solid rgb(19, 47, 76)",
                position: "relative",
                top: "80px",
                background: "rgb(19, 47, 76)",
                color: "rgb(102, 178, 255)"
            }
        }))

    }

    return (
        <Modal className='positionModel' show={show} onHide={() => { return handleChange() }} centered  >
            <Toaster position="top-center" />

            {next == 0 && <div className='modelCenter1'>
                <div>
                    <div className='modelHeadContent'>Chat Details</div>
                    <div className='modelStepContent'>Step-1/4</div>
                </div>
                <div className='modelNameText'>
                    {/* <HeaderFlex style={{ paddingLeft: "20px", paddingRight: "0px", paddingTop: "20px" }}> */}
                    <HeaderText2  >Chat Title *</HeaderText2>
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <input onChange={(e) =>
                            setData({ ...data, ["chatName"]: e.target.value })
                            // setChatRename(e.target.value)
                        } className='modalTextWidth1' value={data.chatName} />
                    </div>
                </div>
                {/* </HeaderFlex> */}


                {/* <HeaderFlex style={{ paddingLeft: "20px", paddingRight: "0px", paddingTop: "10px" }}>
                        <HeaderText1 className='modalChatWidth' >Model name</HeaderText1>
                        <select onChange={(e) => { setModelText(e.target.value) }} className='modalTextWidth' value={modelText} >
                            {modelList?.map((item) => {
                                return (
                                    <option value={item.root}>{item.root}</option>

                                )
                            })}

                        </select>
                    <RefreshIcon onClick={()=> { getModelFunction(apiKeyText) }} />
                          
                    </HeaderFlex> */}


                <ModalFooter>
                    <TipButton variant="secondary" onClick={() => { return handleChange() }}>
                        Close
                    </TipButton>
                    <TipButton1 style={{ background: (data.chatName === "") ? "grey" : "#3772FF" }} variant="primary" onClick={() => { (data.chatName !== "") && setNext(1) }}>
                        Next
                    </TipButton1>
                </ModalFooter>

            </div>}
            {next === 1 &&
                <div className='modelCenter1'>
                    <div>
                        <div className='modelHeadContent'>Chat Details</div>
                        <div className='modelStepContent'>Step-2/4</div>
                    </div>
                    <div className='modelNameText'>

                        <HeaderText2  >Api key *</HeaderText2>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>

                            <input onChange={(e) =>
                                setData({ ...data, ["apiKeyText"]: e.target.value })

                            } className='modalTextWidth1' value={data.apiKeyText} />
                            {/* {data.modelList.length !== 0 ? <CheckIcon /> :
                                <ClearIcon />} */}
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>

                            <div onClick={() => { return getModelFunction(data.apiKeyText, ""); }} className='textButton'>Test</div>
                        </div>
                    </div>
                    <ModalFooter style={{ paddingTop: "40px" }}>
                        <TipButton variant="secondary" onClick={() => { return setNext(0) }}>
                            Previous
                        </TipButton>
                        <TipButton1 style={{ background: "#3772FF" }} variant="primary" onClick={() => { return getModelFunction(data.apiKeyText, "next"); }}>
                            Next
                        </TipButton1>
                    </ModalFooter>
                </div>}
            {next === 2 &&
                <div className='modelCenter1'>
                    <div>
                        <div className='modelHeadContent'>Chat Details</div>
                        <div className='modelStepContent'>Step-3/4</div>
                    </div>
                    <div className='modelNameText'>
                        {/* <HeaderFlex style={{ paddingLeft: "20px", paddingRight: "0px", paddingTop: "20px", width: "100%" }}> */}
                        <HeaderText2  >Model name *</HeaderText2>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>

                            <select onChange={(e) => {
                                setData({ ...data, ["modelText"]: e.target.value })
                                // setModelText(e.target.value)
                            }} className='modalTextWidth1' value={data.modelText} >
                                {data.modelList?.map((item) => {
                                    return (
                                        <option value={item.id}>{item.id}</option>

                                    )
                                })}

                            </select>
                        </div>
                        {/* <RefreshIcon className='refreshIcon' onClick={() => { getModelFunction(data.apiKeyText) }} /> */}

                        {/* </HeaderFlex> */}


                    </div>
                    <ModalFooter style={{ paddingTop: "40px" }}>
                        <TipButton variant="secondary" onClick={() => { return setNext(1) }}>
                            Previous
                        </TipButton>
                        <TipButton1 style={{ background: (data.modelText === "") ? "grey" : "#3772FF" }} variant="primary" onClick={() => { return setNext(3) }}>
                            Next
                        </TipButton1>
                    </ModalFooter>
                </div>}
            {next === 3 &&
                <div className='modelCenter' style={{height:modelList == "editChat"?"738px":"684px"}}>
                    <div className='modelHeadContent'>Chat Details</div>
                    {modelList !== "editChat" && <div className='modelStepContent'>Step-4/4</div>}
                    {modelList == "editChat" &&
                        <div style={{marginTop:"20px"}}>
                            <div style={{ display: "flex",paddingLeft:"5%",alignItems:"center" }}>
                                <div style={{width:"13%",}}>Model Name </div>
                                <div style={{fontSize:"18px"}}>-{data.modelText}</div>
                            </div>
                            <div style={{ display: "flex",paddingLeft:"5%",alignItems:"center"  }}>
                                <div style={{width:"13%"}}>Api Key </div>
                                <div style={{fontSize:"18px"}}>-{data.apiKeyText?.slice(0,10)}*****{data.apiKeyText?.slice(data.apiKeyText.length-6,data.apiKeyText.length)}</div>
                            </div> <div style={{ display: "flex",paddingLeft:"5%",alignItems:"center" }}>
                                <div style={{width:"13%"}}>Chat name  </div>
                                <div style={{fontSize:"18px"}}>-{data.chatName}</div>

                            </div>

                        </div>}
                    <HeaderFlex style={{ paddingTop: "20px" }}>
                        <div className='flexWidth'>
                            <HeaderFlex style={{
                                paddingLeft: "20px", paddingRight: "0px", paddingTop: "10px", display: "flex",
                                justifyContent: "space-between",
                                paddingRight: "32px"
                            }}>
                                <HeaderText1 className='modalChatWidth' >Presence penality</HeaderText1>
                                <input onChange={(e) => setData({ ...data, presencePenality: e.target.value })} className='modalTextWidth' value={data.presencePenality / 100} />


                            </HeaderFlex>
                            <div className="seekbar">
                                <SeekBar
                                    name="presencePenality"
                                    percent={data.presencePenality === 1 ? 2 : 1}
                                    min="0"
                                    max="200"
                                    data={data}
                                    getNumber={setData}
                                    width="96%"
                                    backgroundColor="gray"
                                    fillColor="white"
                                    fillSecondaryColor="white"
                                    headColor="white"
                                    headShadow="white"
                                    headShadowSize={6}
                                    progress={data.presencePenality}
                                />
                            </div>
                        </div>
                        <div className='flexWidth'>
                            <HeaderFlex style={{
                                paddingLeft: "20px", paddingRight: "0px", paddingTop: "10px", display: "flex",
                                justifyContent: "space-between",
                                paddingRight: "32px"
                            }}>
                                <HeaderText1 className='modalChatWidth' >Best of</HeaderText1>
                                <input onChange={(e) => setData({ ...data, bestOfValue: e.target.value })} className='modalTextWidth' value={data.bestOfValue / 10} />


                            </HeaderFlex>
                            <div className="seekbar">
                                <SeekBar
                                    name="bestOfValue"
                                    percent={data.bestOfValue === 1 ? 2 : 1}
                                    min="0"
                                    max="200"
                                    data={data}
                                    getNumber={setData}
                                    width="96%"
                                    backgroundColor="gray"
                                    fillColor="white"
                                    fillSecondaryColor="white"
                                    headColor="white"
                                    headShadow="white"
                                    headShadowSize={6}
                                    progress={data.bestOfValue}
                                />
                            </div>
                        </div>
                    </HeaderFlex>
                    <HeaderFlex>
                        <div className='flexWidth'>
                            <HeaderFlex style={{
                                paddingLeft: "20px", paddingRight: "0px", paddingTop: "10px", display: "flex",
                                justifyContent: "space-between",
                                paddingRight: "32px"
                            }}>
                                <HeaderText1 className='modalChatWidth' >Maximum Length</HeaderText1>
                                <input onChange={(e) => setData({ ...data, lengthValue: e.target.value })} className='modalTextWidth' value={data.lengthValue} />


                            </HeaderFlex>
                            <div className="seekbar">
                                <SeekBar
                                    name="lengthValue"
                                    percent={data.lengthValue === 1 ? 40 : 1}
                                    data={data}
                                    min="1"
                                    max="4000"
                                    getNumber={setData}
                                    width="96%"
                                    backgroundColor="gray"
                                    fillColor="white"
                                    fillSecondaryColor="white"
                                    headColor="white"
                                    headShadow="white"
                                    headShadowSize={6}
                                    progress={data.lengthValue}
                                />
                            </div>
                        </div>
                        <div className='flexWidth'>
                            <HeaderFlex style={{
                                paddingLeft: "20px", paddingRight: "0px", paddingTop: "10px", display: "flex",
                                justifyContent: "space-between",
                                paddingRight: "32px"
                            }}>
                                <HeaderText1 className='modalChatWidth' >Frequency penality</HeaderText1>
                                <input onChange={(e) => setData({ ...data, FrequencyValue: e.target.value })} className='modalTextWidth' value={data.FrequencyValue / 100} />


                            </HeaderFlex>
                            <div className="seekbar">
                                <SeekBar
                                    name="FrequencyValue"
                                    percent={data.FrequencyValue === 1 ? 2 : 1}
                                    min="0"
                                    data={data}
                                    max="200"
                                    getNumber={setData}
                                    width="96%"
                                    backgroundColor="gray"
                                    fillColor="white"
                                    fillSecondaryColor="white"
                                    headColor="white"
                                    headShadow="white"
                                    headShadowSize={6}
                                    progress={data.FrequencyValue}
                                />
                            </div>
                        </div>
                    </HeaderFlex>
                    <HeaderFlex>

                        <div className='flexWidth'>
                            <HeaderFlex style={{
                                paddingLeft: "20px", paddingRight: "0px", paddingTop: "30px", display: "flex",
                                justifyContent: "space-between",
                                paddingRight: "32px"
                            }}>
                                <HeaderText1 className='modalChatWidth' >Temperature</HeaderText1>
                                <input onChange={(e) => setData({ ...data, tempValue: e.target.value })} className='modalTextWidth' value={data.tempValue / 100} />


                            </HeaderFlex>
                            <div className="seekbar">
                                <SeekBar
                                    name="tempValue"
                                    data={data}
                                    percent={1}
                                    min="0"
                                    max="100"
                                    getNumber={setData}
                                    width="96%"
                                    backgroundColor="gray"
                                    fillColor="white"
                                    fillSecondaryColor="white"
                                    headColor="white"
                                    headShadow="white"
                                    headShadowSize={6}
                                    progress={data.tempValue}
                                />
                            </div>
                        </div>
                    </HeaderFlex>
                    <HeaderFlex style={{ paddingTop: "20px", width: "100%" }}>
                        <div className='sequenceTextContainer'>
                            <div className='sequenceText'>Stop Sequences</div>
                            <div>Enter sequences and press tab</div>
                            <input className='sequenceInput' onChange={(e) => { return setData({ ...data, ["stopSequence"]: e.target.value }) }} value={data.stopSequence} />
                        </div>
                        <div className='probablityContainer'>
                            <div className='sequenceText1'>Show probablities</div>
                            <select className='sequenceInput1' onChange={(e) => { return setData({ ...data, ["probality"]: e.target.value }) }} value={data.probality}>
                                <option value="Off">Off</option>
                                <option value="Mostly likely">Mostly likely</option>
                                <option value="Least likely">Least likely</option>
                                <option value="Full spectrum">Full spectrum</option>
                            </select>
                        </div>
                    </HeaderFlex>

                    <HeaderFlex>
                        <HeaderFlex style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px", display: "flex", alignItems: "center", width: "100%" }}>
                            <input className='checkBoxSize' type="checkbox" onChange={() => { return setData({ ...data, ["startType"]: !data.startType }) }} checked={data.startType} value={data.startType} />
                            <div className='injectTypeText' >Inject start type</div>
                        </HeaderFlex>
                        <HeaderFlex style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px", display: "flex", alignItems: "center", width: "100%" }}>
                            <input className='checkBoxSize' type="checkbox" onChange={() => { return setData({ ...data, ["restartType"]: !data.restartType }) }} checked={data.restartType} value={data.restartType} />
                            <div className='injectTypeText' >Inject restart type</div>
                        </HeaderFlex>
                    </HeaderFlex>








                    <ModalFooter>
                        {modelList == "editChat" ? <TipButton variant="secondary" onClick={() => { return handleChange() }}>
                            Close
                        </TipButton> :
                            <TipButton variant="secondary" onClick={() => { return setNext(2) }}>
                                Previous
                            </TipButton>}
                        <TipButton1 style={{ background: (data.modelText === "") ? "grey" : "#3772FF" }} variant="primary" onClick={() => { return HandleButton() }}>
                            Save
                        </TipButton1>
                    </ModalFooter>
                </div>
            }

        </Modal>
    )
}

export default ChatRenameBox
