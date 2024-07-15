import React, { useEffect, useState } from "react";
import "../styles/home.css";
import LightModeIcon from "@mui/icons-material/LightMode";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import TelegramIcon from "@mui/icons-material/Telegram";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatGptIcon from "../../chatGptLogo.svg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import makeGetRequest from "../../api/getApi";
import { useAppContext } from "../../context/AppContext";
import makePostRequest from "../../api/postApi";
import makeDeleteRequest from "../../api/deleteApi";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ChatRenameBox from "./chatRemame";
import makeChatPostRequest from "../../api/chatPostApi";
import QuestionDetails from "./questionDetails";
function HomePage() {
  const [typeText, setTypeText] = useState("");
  const [clearText, setClearText] = useState("");
  const [typedata, setTypeData] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatArray, setChatArray] = useState([]);
  const [text, setText] = useState("");
  const [chatId, setChatid] = useState("");
  const [lightMode, setLightMode] = useState(false);
  const [typeCount, setTypeCount] = useState(0);
  const [chatRename, setChatRename] = useState("");
  const [modelText, setModelText] = useState("");
  const [apiKeyText, setApiKeyText] = useState("");
  const [initialApiKey, setInitialApikey] = useState(false);
  const [keyMustText, setKeyMustText] = useState(false);
  const [previousData, setPreviousData] = useState(false);
  const [chatHandleArray, setChataHandleArray] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [commonQues, setCommonQues] = useState([]);
  const initialvalues = {
    tempValue: 0,
    lengthValue: 1,
    FrequencyValue: 0,
    presencePenality: 0,
    bestOfValue: 0,
    modelText: "",
    apiKeyText: "",
    initialApiKey: false,
    chatName: "",
    stopSequence: "",
    probality: "",
    startType: false,
    restartType: false,
    typeCount: 0,
  };
  const [data, setData] = useState(initialvalues);
  const [apiArray, setApiArray] = useState([]);
  const [quesChat, setQuesChat] = useState("");
  const [fullText, setFullText] = useState(
    "hello may i help you with lot of technical information.we are here to support you"
  );

  let chatName = {
    name: "",
  };
  const [index, setIndex] = useState(0);
  const [quesModel, setQuesModel] = useState(false);
  const { State, dispatch } = useAppContext();
  const { chat, texted } = State;
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const editHandleClose = () => {
    setEditShow(false);
    setQuesModel(false);
    setData({ ...data, ["initialApiKey"]: false });
    setInitialApikey(false);
  };
  const edithandleShow = (item) => {
    setData({
      ...data,
      ["chatName"]: item.chatName,
      ["apiKeyText"]: item.apiKey,
      ["modelText"]: item.model,
      ["modelList"]: item?.modelValues[0]?.chatValues,
      ["tempValue"]: item.temperature * 100,
      ["lengthValue"]: item.maxLength,
      ["FrequencyValue"]: item.frequencyPenality * 100,
      ["presencePenality"]: item.presensePenality * 100,
      ["bestOfValue"]: item.bestOf * 10,
      ["stopSequence"]: item.stopSequence,
      ["probality"]: item.showProbablity,
      ["startType"]: item.startType,
      ["restartType"]: item.reStartType,
    });

    setChatid(item.id);

    setEditShow(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const apiAnswer = (item) => {
    // for ( let indexArr=0; indexArr < item.length;indexArr++ ) {
    //     setTimeout(async () => {
    //         await dispatch({ type: "TEXT_INITIAL_ARRAY", payload: texted.text + item[indexArr], index: texted.indexArr + 1 })
    //         console.log(texted.text,"kiii");
    //         // setText(text + item[index])
    //         // setIndex(index + 1)
    //         return text.text;
    //     }, 40)
    // }
  };
  useEffect(() => {
    initialTypeChange();
  }, [data.initialApiKey, chat?.chatArr?.length]);

  const initialTypeChange = () => {
    !data.initialApiKey &&
      setData({ ...data, ["typeCount"]: chat?.chatArr?.length - 1 });
  };
  useEffect(() => {
    api();
  }, [
    typedata,
    text,
    apiArray,
    chatArray,
    chatHandleArray,
    previousData,
    chatHistory,
    editShow,
    quesChat,
    data.initialApiKey,
    typeText,
    chat?.chatArr?.length,
    data.typeCount,
  ]);
  const api = async () => {
    const data = await makeGetRequest(`/chat`);
    console.log(data,data?.response?.status)
     if (data?.response?.status != 403) {
        await dispatch({ type: "SET_INITIAL_ARRAY", payload: data.result });
     }
     else {
      console.log("iruken")
        setTypeData(true)
     }
    // (data.typeCount === 0 && chat.chatArr.length !== 0) &&
    //     (setData({
    //         ...data, ["typeCount"]: 0, ["apiKeyText"]: chat?.chatArr[0]?.apiKey, ["modelText"]: chat?.chatArr[0]?.model,
    //         ["chatName"]: chat?.chatArr[0]?.chatName, ["tempValue"]: chat?.chatArr[0]?.temperature, ["lengthValue"]: chat?.chatArr[0]?.maxLength, ["FrequencyValue"]: chat?.chatArr[0]?.frequencyPenality, ["presencePenality"]: chat?.chatArr[0]?.presensePenality,
    //         ["bestOfValue"]: chat?.chatArr[0]?.bestOf, ["stopSequence"]: chat?.chatArr[0]?.stopSequence, ["probality"]: chat?.chatArr[0]?.showProbablity,
    //         ["startType"]: chat?.chatArr[0]?.startType, ["restartType"]: chat?.chatArr[0]?.reStartType
    //     }))
    // chat.chatArr.length === 0 &&
    //     (setData({
    //         ...data, ["typeCount"]: chat.chatArr.length, ["apiKeyText"]: "", ["modelText"]: "", ["chatName"]: "", ["modelList"]: [], ["tempValue"]: 0, ["lengthValue"]: 1, ["FrequencyValue"]: 0, ["presencePenality"]: 0,
    //         ["bestOfValue"]: 0, ["stopSequence"]: "", ["probality"]: "Off",
    //         ["startType"]: false, ["restartType"]: false
    //     }))
  };
  const handleChange = (e) => {
    setTypeText(e.target.value);
    setClearText(e.target.value);
  };
  const newChatFunction = () => {
    setChatid("");

    setData({
      ...data,
      ["apiKeyText"]: "",
      ["modelText"]: "",
      ["chatName"]: "",
      ["modelList"]: [],
      ["initialApiKey"]: true,
      ["tempValue"]: 0,
      ["lengthValue"]: 1,
      ["FrequencyValue"]: 0,
      ["presencePenality"]: 0,
      ["bestOfValue"]: 0,
      ["stopSequence"]: "",
      ["probality"]: "Off",
      ["startType"]: false,
      ["restartType"]: false,
    });

    setChataHandleArray((prev) => [...prev, [chatArray]]);
  };

  const chatHistoryData = (item) => {
    setData({
      ...data,
      ["typeCount"]: item,
      ["apiKeyText"]: chat?.chatArr[item]?.apiKey,
      ["modelText"]: chat?.chatArr[item]?.model,
      ["chatName"]: chat?.chatArr[item]?.chatName,
      ["tempValue"]: chat?.chatArr[item]?.temperature,
      ["lengthValue"]: chat?.chatArr[item]?.maxLength,
      ["FrequencyValue"]: chat?.chatArr[item]?.frequencyPenality,
      ["presencePenality"]: chat?.chatArr[item]?.presensePenality,
      ["bestOfValue"]: chat?.chatArr[item]?.bestOf,
      ["stopSequence"]: chat?.chatArr[item]?.stopSequence,
      ["probality"]: chat?.chatArr[item]?.showProbablity,
      ["startType"]: chat?.chatArr[item]?.startType,
      ["restartType"]: chat?.chatArr[item]?.reStartType,
    });
  };
  const deleteFunction = async (item) => {
    await makeDeleteRequest(`/chat/${item.id}`);
    setData({
      ...data,
      ["apiKeyText"]: "",
      ["modelText"]: "",
      ["modelList"]: [],
      ["typeCount"]:
        chat.chatArr.length > 1
          ? data.typeCount == 0
            ? data.typeCount + 1
            : data.typeCount - 1
          : data.typeCount,
    });
    await api();
    setChatHistory([1]);
  };

  const quesSearch = (ques) => {
    setCommonQues([]);
    chat?.chatArr?.filter((item, i) => {
      let sameQues = chat.chatArr[i]?.chatItems?.filter((items) => {
        return items.question === ques;
      });

      sameQues.length !== 0 && setCommonQues((prev) => [...prev, sameQues]);
    });

    setQuesModel(true);
  };

  return (
    <>
      <div className="homeMain" style={{ opacity: show || editShow ? 0.9 : 1 }}>
        <div className="homeLeft">
          <div className="buttonDisplay">
            <button
              onClick={() => {
                return newChatFunction();
              }}
              className="newChatButton"
            >
              <div className="plusIcon">+</div>
              New chat
            </button>
          </div>

          <div className="chatHistory">
            {chat?.chatArr?.length !== 0 &&
              chat?.chatArr?.map((item, i) => {
                return (
                  <div
                    style={{
                      backgroundColor:
                        i == data.typeCount ? "rgba(52, 53, 65, 1)" : "black",
                    }}
                    className="chatListDiv"
                  >
                    <ChatBubbleOutlineIcon className="chatIcon" />
                    <div
                      onClick={() => {
                        return chatHistoryData(i);
                      }}
                      className="chatListText"
                      style={{ width: i !== data.typeCount ? "70%" : "45%" }}
                    >
                      {item.chatName}
                      <div className="shadow"></div>
                    </div>
                    {i === data.typeCount && (
                      <EditIcon
                        onClick={() => {
                          edithandleShow(item);
                        }}
                        className="chatIcon"
                      />
                    )}
                    {i === data.typeCount && (
                      <DeleteIcon
                        onClick={() => {
                          deleteFunction(item);
                        }}
                        className="chatIcon"
                      />
                    )}
                  </div>
                );
              })}
          </div>

          <div className="logDiv">
            <div className="logBorder"></div>
            {lightMode ? (
              <div
                onClick={() => {
                  setLightMode(false);
                }}
                className="lightMode"
              >
                <DarkModeIcon />
                <div className="textContent">Dark mode</div>
              </div>
            ) : (
              <div
                onClick={() => {
                  setLightMode(true);
                }}
                className="lightMode"
              >
                <LightModeIcon />
                <div className="textContent">Light mode</div>
              </div>
            )}

            {/* <div className='lightMode'>
                            <SystemUpdateAltIcon />
                            <div className='textContent'>Updates and FAQ</div>
                        </div> */}
            <div className="lightMode">
              <LogoutIcon />
              <div className="textContent">Log out</div>
            </div>
          </div>
        </div>
        {console.log(chat)}
        <div
          className="homeRight"
          style={{ background: lightMode ? "white" : "rgba(52, 53, 65, 1)" }}
        >
          {chat?.chatArr?.length !== 0 &&
          chat?.chatArr?.length - 1 >= data.typeCount ? (
            chat?.chatArr[data.typeCount]?.chatItems.length !== 0 ? (
              <div className="chatTextDiv">
                {chat?.chatArr[data.typeCount]?.chatItems?.map((item, i) => {
                  return (
                    <div className="apiTextContainer">
                      <div
                        className="textChatContainer"
                        style={{ color: lightMode ? "#574b4b" : "white" }}
                      >
                        <div className="ViText">VI</div>
                        <div> {item.question}</div>
                        <div
                          className="compareText"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            return quesSearch(item.question);
                          }}
                        >
                          compare propmt
                        </div>
                      </div>
                      <div
                        className="textApiContainer"
                        style={{
                          background: lightMode
                            ? "rgba(247,247,248,1)"
                            : "hsla(0, 0%, 100%, .05)",
                          color: lightMode ? "#574b4b" : "white",
                        }}
                      >
                        <div className="chatApiContainer">
                          <div className="chatGptImageContainer">
                            <img className="chatGptImage" src={ChatGptIcon} />
                          </div>
                          <div className="apichatcontainer">
                            <div>
                              {item.answer}
                              {/* { chat?.chatArr[data.typeCount]?.chatItems.length==i+1? apiAnswer(item.answer):item.answer} */}
                            </div>
                          </div>
                          <ThumbUpIcon />
                          <ThumbDownAltIcon />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="chatGptContainer">
                <div className="modelContainer">
                  <div className="modelWidth">
                    <div className="modelInnerContainer">
                      <div
                        className="modelText"
                        style={{
                          color: lightMode ? "rgb(87, 75, 75)" : "white",
                        }}
                      >
                        Model name
                      </div>
                      <div
                        className="modelTextField"
                        style={{ fontSize: "22px", lineHeight: "24px" }}
                      >
                        - {chat?.chatArr[data.typeCount]?.model}
                      </div>
                    </div>
                    <div className="modelInnerContainer">
                      <div
                        className="modelText"
                        style={{
                          color: lightMode ? "rgb(87, 75, 75)" : "white",
                        }}
                      >
                        Chat name
                      </div>
                      <div
                        className="modelTextField"
                        style={{ fontSize: "22px" }}
                      >
                        - {chat?.chatArr[data.typeCount]?.chatName}
                      </div>
                    </div>
                    <div className="modelInnerContainer">
                      <div
                        className="modelText"
                        style={{
                          color: lightMode ? "rgb(87, 75, 75)" : "white",
                        }}
                      >
                        Api key
                      </div>
                      <div
                        className="modelTextField"
                        style={{ fontSize: "22px", wordBreak: "break-word" }}
                      >
                        - {chat?.chatArr[data.typeCount].apiKey?.slice(0, 10)}
                        *****
                        {chat?.chatArr[data.typeCount].apiKey?.slice(
                          chat?.chatArr[data.typeCount]?.apiKey.length - 6,
                          chat?.chatArr[data.typeCount]?.apiKey.length
                        )}
                      </div>
                    </div>
                    {keyMustText && (
                      <div className="validationText">
                        Api key must be given
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div
              className="chatGptContainer"
              style={{ color: lightMode ? "black" : "rgba(236, 236, 241,1)" }}
            >
              {/* <div className='modelContainer'>
                                    <div className='modelWidth'>
                                        <div className='modelInnerContainer'>
                                            <div className='modelText'>Model name</div>
                                            <input onChange={(e) => setModelText(e.target.value)} className='modelTextField' style={{ border: lightMode ? "1px solid rgba(0,0,0,.1)" : "none" }} />
                                        </div>
                                        <div className='modelInnerContainer'>
                                            <div className='modelText'>Api key</div>
                                            <input onChange={(e) => setApiKeyText(e.target.value)} className='modelTextField' style={{ border: lightMode ? "1px solid rgba(0,0,0,.1)" : "none" }} />
                                        </div>
                                        {keyMustText &&
                                            <div className='validationText'>Api key must be given</div>}
                                    </div>
                                </div> */}
              <div className="chatGptText">ChatGPT TESTBED</div>
              <div className="instructionContainer">
                <div className="exampleContainer">
                  <div className="exampleHeadContainer">
                    <LightModeIcon />
                    <div className="exampleText">Examples</div>
                  </div>
                  <div
                    className="textExampleContainer"
                    style={{
                      background: lightMode
                        ? "rgba(247,247,248,1)"
                        : "hsla(0, 0%, 100%, .05)",
                    }}
                  >
                    <div className="quantumText">
                      Explain quantum computing in simple terms
                    </div>
                  </div>
                  <div
                    className="textExampleContainer"
                    style={{
                      background: lightMode
                        ? "rgba(247,247,248,1)"
                        : "hsla(0, 0%, 100%, .05)",
                    }}
                  >
                    <div className="quantumText">
                      Got any creative ideas for a 10 year old’s birthday?
                    </div>
                  </div>
                  <div
                    className="textExampleContainer"
                    style={{
                      background: lightMode
                        ? "rgba(247,247,248,1)"
                        : "hsla(0, 0%, 100%, .05)",
                    }}
                  >
                    <div className="quantumText">
                      How do I make an HTTP request in Javascript?
                    </div>
                  </div>
                </div>
                <div className="exampleContainer">
                  <div className="exampleHeadContainer">
                    <ElectricBoltIcon />
                    <div className="exampleText">Capablities</div>
                  </div>
                  <div
                    className="textExampleContainer"
                    style={{
                      background: lightMode
                        ? "rgba(247,247,248,1)"
                        : "hsla(0, 0%, 100%, .05)",
                    }}
                  >
                    <div className="quantumText">
                      Remembers what user said earlier in the conversation
                    </div>
                  </div>
                  <div
                    className="textExampleContainer"
                    style={{
                      background: lightMode
                        ? "rgba(247,247,248,1)"
                        : "hsla(0, 0%, 100%, .05)",
                    }}
                  >
                    <div className="quantumText">
                      Allows user to provide follow-up corrections
                    </div>
                  </div>
                  <div
                    className="textExampleContainer"
                    style={{
                      background: lightMode
                        ? "rgba(247,247,248,1)"
                        : "hsla(0, 0%, 100%, .05)",
                    }}
                  >
                    <div className="quantumText">
                      Trained to decline inappropriate requests
                    </div>
                  </div>
                </div>
                <div className="exampleContainer">
                  <div className="exampleHeadContainer">
                    <ReportProblemIcon />
                    <div className="exampleText">Limitations</div>
                  </div>
                  <div>
                    <div
                      className="textLimitationContainer"
                      style={{
                        background: lightMode
                          ? "rgba(247,247,248,1)"
                          : "hsla(0, 0%, 100%, .05)",
                      }}
                    >
                      <div className="quantumText">
                        May occasionally generate incorrect information
                      </div>
                    </div>
                    <div
                      className="textLimitationContainer"
                      style={{
                        background: lightMode
                          ? "rgba(247,247,248,1)"
                          : "hsla(0, 0%, 100%, .05)",
                      }}
                    >
                      <div className="quantumText">
                        May occasionally produce harmful instructions or biased
                        content
                      </div>
                    </div>
                    <div
                      className="textLimitationContainer"
                      style={{
                        background: lightMode
                          ? "rgba(247,247,248,1)"
                          : "hsla(0, 0%, 100%, .05)",
                      }}
                    >
                      <div className="quantumText">
                        Limited knowledge of world and events after 2021
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="bottomContainer">
            <div className="textContainer">
              <div
                className="chatInput"
                style={{
                  border: lightMode ? "1px solid rgba(0,0,0,.1)" : "none",
                  background: lightMode ? "white" : "rgba(64, 65, 79, 1)",
                }}
              >
                <input
                  onChange={handleChange}
                  value={clearText}
                  className="inputWidth"
                  style={{
                    background: lightMode ? "white" : "rgba(64, 65, 79, 1)",
                    color: lightMode ? "black" : "white",
                  }}
                />
                <TelegramIcon
                  onClick={async () => {
                    // setQuesChat(typeText)
                    let dayTime = moment(new Date()).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    );
                    let day = dayTime.split(",")[0];
                    let time = dayTime.split(",")[1];
                    if (data.apiKeyText !== "") {
                      setKeyMustText(false);
                    }

                    if (typeText.length <= 15) {
                      chatName.name =
                        "unknown command please try with other questions";

                      setQuesChat(
                        "unknown command please try with other questions"
                      );
                    } else {
                      chatName.name = typeText;
                      setQuesChat(typeText);
                    }
                    let result = await makeChatPostRequest(
                      "completions",
                      {
                        model: data.modelText,
                        prompt: typeText,
                        temperature: data.tempValue / 100,
                        max_tokens: parseInt(data.lengthValue),
                        top_p: 1,
                        frequency_penalty: data.FrequencyValue / 100,
                        presence_penalty: data.presencePenality / 100,
                        stop: ["END"],
                      },
                      data.apiKeyText
                    );
                    typeText !== "" &&
                      (chat.chatArr?.length === 0
                        ? //  || chat?.chatArr?.length - 1 < data.typeCount
                          data.apiKeyText === ""
                          ? setData({ ...data, ["initialApiKey"]: true })
                          : // setInitialApikey(true)
                            await makePostRequest(`/chat`, [
                              {
                                chatName: chatName.name,
                                apiKey: data.apiKeyText,
                                model: data.modelText,
                                temperature: data.tempValue / 100,
                                maxLength: data.lengthValue,
                                frequencyPenality: data.FrequencyValue / 100,
                                presensePenality: data.presencePenality / 100,
                                bestOf: data.bestOfValue / 10,
                                stopSequence: data.stopSequence,
                                showProbablity: data.probality,
                                startType: data.startType,
                                reStartType: data.restartType,
                                modelValues: [{ chatValues: data.modelList }],
                                chatItems: [
                                  {
                                    question: typeText,
                                    answer: result?.choices[0].text,
                                    day: day,
                                    time: time,
                                    apiKey: data.apiKeyText,
                                    model: data.modelText,
                                  },
                                ],
                              },
                            ])
                        : await makePostRequest(
                            `/chat/${chat?.chatArr[data.typeCount]?.id}`,
                            {
                              question: typeText,
                              answer: result?.choices[0].text,
                              day: day,
                              time: time,
                              apiKey: data.apiKeyText,
                              model: data.modelText,
                            }
                          ));
                    setTypeText("");
                    setClearText("");
                    setTypeData((prev) => [...prev, typeText]);
                  }}
                  className="sendButton"
                />
              </div>
            </div>
            <div className="versionText">
              ChatGPT Feb 13 Version. Free Research Preview. Our goal is to make
              AI systems more natural and safe to interact with. Your feedback
              will help us improve.
            </div>
          </div>
        </div>
      </div>
      <QuestionDetails
        show={quesModel}
        handleClosed={editHandleClose}
        data={data}
        commonQues={commonQues}
      />
      <ChatRenameBox
        show={editShow}
        handleClosed={editHandleClose}
        modelList={"editChat"}
        name={chatRename}
        setChatRename={setChatRename}
        chatId={chatId}
        modelText={modelText}
        setModelText={setModelText}
        apiKeyText={apiKeyText}
        setApiKeyText={setApiKeyText}
        data={data}
        setData={setData}
      />
      <ChatRenameBox
        show={data.initialApiKey}
        handleClosed={editHandleClose}
        modelList={"newChat"}
        setChatRename={setChatRename}
        apiKeyText={apiKeyText}
        modelText={modelText}
        chatId={chatId}
        setModelText={setModelText}
        setApiKeyText={setApiKeyText}
        typeCount={typeCount}
        setTypeCount={setTypeCount}
        data={data}
        setData={setData}
      />
    </>
  );
}

export default HomePage;
