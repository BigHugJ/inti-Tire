import React, {Component} from 'react';
import {InputGroup, FormControl} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ImageUploading from 'react-images-uploading';

class MessageEditor extends Component {
    constructor() {
        super();
        this.state = {
          message: '',
          file:''
        };
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    handleChange = (e) =>{
        console.log(URL.createObjectURL(e.target.files[0]))
        this.props.sendImgMessage(URL.createObjectURL(e.target.files[0]))
    }

    onKeyUp(event) {
        if (event.charCode === 13) {
            this.props.sendMessage(event.target.value);
            event.target.value=''
            this.setState({message: ''})
        }
    }
  
    render() {
        const {message} = this.state;
        const enableInout = this.props.isChannelBuilt === true ? "" : "disabled";
        return (
            <div>
                <InputGroup style={{margin: '.2px'}}>
                    <FormControl placeholder={message} onKeyPress={this.onKeyUp} style={{margin: '.2px'}} disabled={enableInout}/> {' '}
                    <Button variant="info" style={{margin: '.2px'}} onClick={this.props.clearContents}>Clr</Button>{' '}
                    <div style={{margin: '.2px', height: 12 }} >
                        <label class="custom-file-upload" style = {{color: 'white', backgroundColor : '#4797B8', borderRadius:'10%' }}>
                            <input type="file" onChange={this.handleChange}  disabled={enableInout}/>
                            Img
                        </label>
                    </div>
                </InputGroup>
            </div>
        )
    }
}

export default MessageEditor;