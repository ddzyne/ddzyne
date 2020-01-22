import React, { Component } from 'react'
import { WP_URL } from '../wp-url'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'
import cn from 'classnames'
import { AnimatePresence } from 'framer-motion'
import {FadeIn} from './Anims'

export default class ContactForm extends Component {
	constructor(props) {
    super(props)
    this.state = {
    	name: '',
    	nameValid: '',
    	email: '',
    	emailValid: '',
    	message: '',
    	messageValid: '',
    	messageSent: false,
    	messageError: '',
    	sending: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChange(value, e) {
  	this.setState({ [value]: e.target.value })
  	if (value === 'email') {
  		let validEmail = this.validateMail(e.target.value)
  		this.setState({
  			emailValid: validEmail
  		})
  	}
  	else if (value === 'name') {
  		this.setState({
  			nameValid: e.target.value.length > 3
  		})
  	}
  	else {
  		this.setState({
  			messageValid: e.target.value.length > 10
  		})
  	}
	}
	validateMail(email) {
		let regEx = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
		return regEx.test(email)
	}
	handleSubmit(e) {
		e.preventDefault()
		if(!this.state.emailValid || !this.state.nameValid || !this.state.messageValid) {
			return false
		}
		const payload = {
	    'your-name': this.state.name,
	    'your-email': this.state.email,
	    'your-message': this.state.message,
		}
		this.setState({
			sending:true,
		})
		var data = new FormData()
		_.forOwn(payload, (value, key) => { data.append(key, value) } )

		//for cf7
		data.append('_wpcf7_nonce','1e2a853ad1')

		fetch(WP_URL + '/contact-form-7/v1/contact-forms/267/feedback', {
			method: 'POST',
			body: data,
			processData: false,
			contentType: false
		})
		.then(response => response.json())
      .then(message => {
        this.setState({
  				sending:false,
  			})
      	if (message.status !== 'mail_sent') {
      		this.setState({messageError: message.message})
      	}
      	else {
      		this.setState({messageSent: true})
      	}
      })
	}
	render() {
		const nameState = cn({invalid: !this.state.nameValid && this.state.name.length > 0, valid: this.state.nameValid}),
		      emailState = cn({invalid: !this.state.emailValid && this.state.email.length > 0, valid: this.state.emailValid}),
		      messageState = cn({invalid: !this.state.messageValid && this.state.message.length > 0, valid: this.state.messageValid})
		return (
				<AnimatePresence exitBeforeEnter>
					{ this.state.messageSent ?
						<FadeIn key="1">
							<h2>Bedankt!</h2>
							<p>Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.</p>
						</FadeIn>
						:
            <FadeIn key="2">
  						<form className="form" onSubmit={this.handleSubmit}>
  							<Input disabled={this.state.sending} label='Naam' type="text" name="name" onChange={this.handleChange} value={this.state.name} className={nameState}/>
  							<Input disabled={this.state.sending} label='Email' type="email" name="email" onChange={this.handleChange} value={this.state.email} className={emailState}/>
  							<Textarea disabled={this.state.sending} label='Zeg het maar' rows={10} name="message" onChange={this.handleChange} value={this.state.message} className={messageState}/>
  							<Submit value={this.state.sending ? 'Bezig...' : 'Verstuur'} disabled={!this.state.emailValid || !this.state.nameValid || !this.state.messageValid || this.state.sending}/>
  							
  							<AnimatePresence>
  							{this.state.messageError !== '' && 
  								<FadeIn key="error" classNames="fadeNoDelay">
  									<div className="error">{this.state.messageError}</div>
  								</FadeIn>
  							}
  							</AnimatePresence>
  						</form> 
            </FadeIn>
					}
				</AnimatePresence>
		)
	}
}

const Input = ({onChange, label, ...props}) => {
	return (
		<div>
			{label && <label>{label}</label>}
			<input onChange={onChange.bind(this, props.name)} {...props} />
		</div>
	)
}

const Textarea = ({onChange, label, ...props}) => {
	return (
		<div>
			{label && <label>{label}</label>}
			<textarea onChange={onChange.bind(this, props.name)} {...props} />
		</div>
	)
}

const Submit = (props) => {
	return (
		<div>
			<input type="submit" {...props} />
		</div>
	)
}