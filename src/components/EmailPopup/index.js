import { Component } from 'react'
import Popup from 'reactjs-popup'
import './index.css'


class EmailPopup extends Component{

    state={isOpen:this.props.isOpen,isEmailValid:true,email:''}

    componentDidMount(){
        const email = localStorage.getItem("userMailId");
        if(email){
            this.setState({isOpen:false})
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onSubmit = () => {
        const { email } = this.state;
        const isValid = email.includes('@gmail.com');
        this.setState({
            isEmailValid: isValid,
            isOpen: !isValid, 
        });
        const {isPopup} = this.props
        isPopup(!isValid)
        if(isValid){
            localStorage.setItem(`userMailId`,JSON.stringify(email));
        }
    }
    
    onKeyPress = (event)=>{
        if(event.key === 'Enter'){
        this.onSubmit()
        }
    }
 

    render(){
        const{isOpen,isEmailValid,email} = this.state
        return (
            <Popup
                open={isOpen}
                closeOnDocumentClick={false}
                closeOnEscape={false}
                modal
            >
                {close => (
                    <div className='popupCard'>
                        <div>
                            <h2>Enter Your Email</h2>
                            <input className='gmailInputEle' type='email' value={email} onChange={this.onEmailChange}  onKeyDown={this.onKeyPress} />
                            {!isEmailValid && <p>Please enter a valid Gmail address.</p>}
                            <button className='submitBtn' onClick={this.onSubmit}>Submit</button>
                        </div>
                    </div>
                )}
            </Popup>)
    }
}

export default EmailPopup

