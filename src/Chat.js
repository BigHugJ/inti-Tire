import React, {Component} from 'react'
import MessageTable from './Table'
import MessageEditor from './Form'
import {Container, Badge, Jumbotron, Row, Col, Grid} from 'react-bootstrap'
import Counters from './Counter'
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import * as messageTypes from './SockConstants'
import ReactDOM from 'react-dom'
import MesssgeCard from './CardSample'
import DivSample from './dviSample'
import LoginControl from './LoginControl'

class Chat extends Component {
    state = {
        isConnected: false,
        isChannelBuilt:false,
        isAlreadyLogin:false,
        receiverList:[],
        connectedList:[],
        messageCount: 0,
        messages: [],
        userId:null,
        chatChannel:'',
        isWindowFocused:true
    };

    subscription = null
    currentEndpoint=''
    start = Date.now();

    sockjs = new SockJS(messageTypes._SOCK_SERVER_EXTERNAL);
    stompClient = Stomp.over(this.sockjs);

    onFocus = () => {
        this.setState({isWindowFocused:true})
        document.title = "NO NEW MESSAGES"
    }
  
    onBlur = () => {
        this.setState({isWindowFocused:false})
    }

    onUnload = () => {
        this.stompClient.send(messageTypes._MESSAGE_DEST_DELETEUSER, {}, JSON.stringify({
          name: this.props.loginUser,
          id: this.state.userId
        }))
    }

    componentDidMount() {
        document.title = "chat-chat"
        window.addEventListener('focus', this.onFocus);
        window.addEventListener('blur', this.onBlur);
        window.addEventListener('beforeunload', this.onUnload);

        this.stompClient.connect({}, (frame) => {
            console.log('STOMP connected')
            }, (error)=>{console.log("STOMP error"+ error)}
        )
        this.interval = setInterval(() => {this.setStatusCheck()}, 1000)
    }
  
    setStatusCheck = () => {
        if (this.state.isConnected === false) {
            if (this.sockjs.readyState === messageTypes._SOCKET_CLOSED) {
                this.stompClient.disconnect()
                this.sockjs.close()
                console.log("switch to internal<><><><><><><>")
                this.sockjs = new SockJS(messageTypes._SOCK_SERVER)
                this.stompClient = Stomp.over(this.sockjs);
                this.stompClient.connect({}, (frame) => {
                    console.log('STOMP connected')
                    }, (error)=>{console.log("STOMP error"+ error)}
                )
            }

            this.handleConnect()
        }
        else {
            if ((Date.now() - this.start) > (1000*60*5)) {
                this.stompClient.send(messageTypes._MESSAGE_DEST_SENDMSG, {}, JSON.stringify({
                        messageSender: messageTypes._MESSAGE__TIME_SPLITTER,
                        messageReceiver: '',
                        message: new Date().toLocaleTimeString()
                    })
                )
            }
            this.start = Date.now()
        }
    }

    insertMessage = (msg) => {
        var htmlmsg = ""
        var imgName = ""
        imgName = msg.messageSender+ ".jpg";
        if (msg.messageSender === this.props.loginUser) {
            if (msg.img === false) {
                htmlmsg="<div style=\"text-align:right;\"><span style=\"color:green\">" + msg.message + " " + "</span>" + "<Image src="+imgName +" width= \"40px\" height=\"40px\" style=border-radius:50% /></div>"
            } else {
                htmlmsg="<div style=\"text-align:right;\"><Image src="+ msg.message + " width= \"100px\" height=\"100px\" />  <Image src="+imgName +" width= \"40px\" height=\"40px\" style=border-radius:50% /></div>"
            }
        }else if (msg.messageSender ===  messageTypes._MESSAGE__TIME_SPLITTER) {
            htmlmsg="<div style=\"text-align:center;color:SpringGreen\">" + "--- " + msg.message + " ---" + "<br/></div>"
        }
        else {
            if (msg.img === false) {
                htmlmsg= "<div style=\"text-align:left;\"> <Image src="+imgName +" width= \"40px\" height=\"40px\" style=border-radius:50% />"+" " +  msg.message + "</div>"
            } else {
                htmlmsg= "<div style=\"text-align:left;\"> <Image src="+imgName +" width= \"40px\" height=\"40px\" style=border-radius:50% />"+" " +  "<Image src="+ msg.message + " width= \"100px\" height=\"100px\" /> </div>"
            }
        }

        document.getElementById('mCard').innerHTML += htmlmsg ;
        document.getElementById('mCard').scrollTop = document.getElementById('mCard').scrollHeight - document.getElementById('mCard').clientHeight;
        var messageCount = msg.messageCount
        this.setState({messageCount: messageCount})
    }
  
    componentWillUnmount() {
        this.stompClient.send(messageTypes._MESSAGE_DEST_DELETEUSER, {}, JSON.stringify({
            name: this.props.loginUser,
            id: this.state.userId
            })
        )

        clearInterval(this.interval);
        this.sockjs.close()
        this.stompClient.disconnect()
    }
  
    handleConnect = () => {
        if (this.sockjs.readyState === messageTypes._SOCKET_READY) {
            this.setState({isConnected:true})

            this.stompClient.subscribe(messageTypes._CHAT_TOPIC_PREFIX+this.props.loginUser, (payload) => {
                var respMessage = JSON.parse(payload.body);
                console.log("connected/subscribe/chat request<><><>"+respMessage.message)
                if (respMessage.message === messageTypes._EXISTING_USER && this.state.userId == null) {
                    clearInterval(this.interval);
                    this.sockjs.close()
                    this.stompClient.disconnect()
                    this.setState({isAlreadyLogin:true})
                }
                else if (respMessage.message === messageTypes._CHAT_REQUEST) {
                  if (this.endpoint !== respMessage.messageReceiver) {
                    this.setState({connectedList:respMessage.messageSender.split()})
                    this.setState({isChannelBuilt:true})
                    this.setState({chatChannel:messageTypes._CHAT_TOPIC_PREFIX+respMessage.messageReceiver})
                    console.log("CHANNEL: ----->" +this.state.chatChannel)
                    this.subscription = this.stompClient.subscribe(messageTypes._CHAT_TOPIC_PREFIX+respMessage.messageReceiver, (pload) => {
                        var respMsg = JSON.parse(pload.body);
                        this.insertMessage(respMsg)

                        if (!this.state.isWindowFocused) {
                            document.title = "<<< MESSAGE COMING"
                        }
                    })
                  }
                }
                else if (respMessage.name === this.props.loginUser) {
                    this.setState({userId: respMessage.id})
                }
            })

            this.stompClient.subscribe(messageTypes._MESSAGE_DEST_BROADCASTUSERS, (payload) => {
                var respMessage = JSON.parse(payload.body);
                if (respMessage.message == messageTypes._STATUS_OFFLINE) {
                    var rlist = this.state.receiverList
                    console.log("logoff----->" + rlist)
                    if (Array.isArray(rlist)) {
                        var ind = rlist.indexOf(respMessage.messageSender);
                        rlist.splice(ind, 1)
                        this.setState({receiverList: rlist})
                    }
                    else {
                        this.setState({receiverList: []})
                    }

                    if (this.state.isChannelBuilt === true) {this.subscription.unsubscribe()}
                    this.setState({isChannelBuilt:false})
                 }
                if (respMessage.messageReceiver) {
                  var rArray = respMessage.messageReceiver.split(",")
                  this.setState({receiverList: rArray})
                }
            })

            this.stompClient.send(messageTypes._MESSAGE_DEST_ADDUSER, {}, JSON.stringify({
                name: this.props.loginUser,
                onlineStatus: messageTypes._STATUS_ONLINE
            }))

        }
        else {
          this.setState({isConnected:false})
        }
    }
  
    sendMessage = (chatmsg ) => {
        if (this.sockjs.readyState === messageTypes._SOCKET_READY) {
          if (chatmsg === ";'" || chatmsg === "；‘") {
            document.getElementById('mCard').innerHTML = ""
          }
          else {
            this.stompClient.send(messageTypes._MESSAGE_DEST_SENDMSG, {}, JSON.stringify({
                    messageSender: this.props.loginUser,
                    messageReceiver: this.props.loginUser === 'wolf'? 'bunny' : 'wolf',
                    isImg: false,
                    message: chatmsg,
            }))
          }
        }
    }

    sendImgMessage = (img) => {
        if (this.sockjs.readyState === messageTypes._SOCKET_READY) {
            this.stompClient.send(messageTypes._MESSAGE_DEST_SENDMSG, {}, JSON.stringify({
                            messageSender: this.props.loginUser,
                            messageReceiver: this.props.loginUser === 'wolf'? 'bunny' : 'wolf',
                            img: true,
                            message: img,
            }))
        }
    }

    clearContents = () => {
        document.getElementById('mCard').innerHTML = ""
    }

    connectToReceiver = (chatters) => {
        var receivers = chatters.join('')

        var endpoint = this.props.loginUser+receivers

        if (this.currentEndpoint === endpoint) {
          return
        }
        this.currentEndpoint = endpoint
        this.subscription = this.stompClient.subscribe(messageTypes._CHAT_TOPIC_PREFIX+endpoint,(payload) => {
          var respMessage = JSON.parse(payload.body);
          this.insertMessage(respMessage)

          if (!this.state.isWindowFocused) {
            document.title = "<<< MESSAGE COMING"
          }
        })

        if (Array.isArray(receivers)) {
          receivers.forEach(r=> {
            this.stompClient.send(messageTypes._MESSAGE_DEST_ADDCHANNEL, {}, JSON.stringify({
                    messageSender: this.props.loginUser,
                    messageReceiver: r,
                    message: endpoint
                }))
          })
          this.setState({connectedList:receivers})
        }
        else {
          this.stompClient.send(messageTypes._MESSAGE_DEST_ADDCHANNEL, {}, JSON.stringify({
                    messageSender: this.props.loginUser,
                    messageReceiver: receivers,
                    message: endpoint
                }))
        }
        this.setState({isChannelBuilt:true})
    }
  
  render() {
    const { messages } = this.state;
	const messageCount = this.state.messageCount;
	const loginUser = this.props.loginUser;
	const isLoggedIn = this.props.isLoggedIn;
	const receivers = this.state.receiverList;
	const connectedList = this.state.connectedList;
	const isConnected = this.state.isConnected;
	const isChannelBuilt = this.state.isChannelBuilt;
	const isAlreadyLogin = this.state.isAlreadyLogin;

	if (this.state.isAlreadyLogin == false) {
	    return (
            <Container className="mb-1" style={{width:'70%'}} >
                <Jumbotron style={{backgroundColor:'#e9ecef'}}>
                    <Row  className="mb-2" >
                        <Col style={{margin: '.2px'}}>
                            <Counters loginUser={loginUser} isConnected={isConnected} totalMessages={messageCount}
                            isLoggedIn={isLoggedIn} receivers={receivers} connectToReceiver={this.connectToReceiver} isChannelBuilt={isChannelBuilt} />
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                        <Col>
                            <DivSample />
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                      <Col>
                      <br/>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col >
                            <MessageEditor sendMessage={this.sendMessage}  clearContents={this.clearContents} sendImgMessage={this.sendImgMessage}
                            isChannelBuilt={this.state.isChannelBuilt}/>
                        </Col>
                    </Row>
                </Jumbotron>
            </Container>
          )
	  } else {
	    return (<LoginControl />)
	  }
  }
}
export default Chat
