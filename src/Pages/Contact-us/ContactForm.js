import React from 'react'
import styled from 'styled-components'
import { css } from 'styled-components'

//import components
import Form from '../../Components/ContactUS-components/Form'
import Label from '../../Components/ContactUS-components/Label'
import StyledButton from '../../Components/ContactUS-components/Button'
import Input from '../../Components/ContactUS-components/Input'
import Textarea from '../../Components/ContactUS-components/Textarea'
import Discussion from '../../services/DiscussionService'

const WrapperGrid = styled.div`
    ${props => props.full && css`
        grid-column: 1 / 3;
    `}
`;

class ContactForm extends React.Component{
    
    constructor(){
        super()
        
    }
    state={
        nom:'',
        email:'',
        tel:'',
        message:''
    }
    changehandler=(e)=>{
        this.setState({[e.target.name] : e.target.value})
    }
    SendMail(){
        Discussion.SendEmail(this.state.nom,this.state.email,this.state.tel,this.state.message)
    }
    render() {
        return (
    <div className="col-md-6 offset-md-3">
        <h3>Contacte nous</h3>
        <div>
            <WrapperGrid>
                <Label>Nom</Label>
                <Input type="text" name="nom" onChange={this.changehandler} />
            </WrapperGrid>
            <WrapperGrid >
                <Label>Adresse Email</Label>
                <Input type="email" name="email"  onChange={this.changehandler}/>
            </WrapperGrid>
            <WrapperGrid  full>
                <Label>Numéro Télephone</Label>
                <Input type="text" name="tel" onChange={this.changehandler}/>
            </WrapperGrid>
            <WrapperGrid full>
                <Label>Message</Label>
                <Textarea name="message" rows="5" onChange={this.changehandler}></Textarea>
            </WrapperGrid>
            <WrapperGrid full>
                <StyledButton className="col-md-4 offset-md-4 btn-btn-success" onClick={()=>this.SendMail()}>Envoyer</StyledButton>
            </WrapperGrid>
        </div>
    </div>
)
        }
}

export default ContactForm