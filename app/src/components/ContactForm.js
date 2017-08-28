import React, { Component } from 'react'
import { WP_URL } from '../wp-url'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import cn from 'classnames'

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
        	console.log(message)
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
		const nameState = cn({invalid: !this.state.nameValid && this.state.name.length > 0, valid: this.state.nameValid})
		const emailState = cn({invalid: !this.state.emailValid && this.state.email.length > 0, valid: this.state.emailValid})
		const messageState = cn({invalid: !this.state.messageValid && this.state.message.length > 0, valid: this.state.messageValid})
		return (
			<div>
				<ReactCSSTransitionReplace
                    transitionName="fadeNoDelay" 
                    transitionEnterTimeout={500} 
                    transitionLeaveTimeout={500}
                    overflowHidden={false}>
					{ this.state.messageSent ?
						<div key="1">
							<h2>Bedankt!</h2>
							<p>Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.</p>
						</div>
						:
						<form className="form" onSubmit={this.handleSubmit} key="2">

							<TransitionGroup>
			            		{ this.state.sending &&
				            	<CSSTransition timeout={300} classNames="fadeNoDelay">
				            		<div className="sending"/>
				            	</CSSTransition>
					            }
				            </TransitionGroup>

							<Input label='Naam' type="text" name="name" onChange={this.handleChange} value={this.state.name} className={nameState}/>
							<Input label='Email' type="email" name="email" onChange={this.handleChange} value={this.state.email} className={emailState}/>
							<Textarea label='Zeg het maar' rows={10} name="message" onChange={this.handleChange} value={this.state.message} className={messageState}/>
							<Submit value={this.state.sending ? 'Bezig...' : 'Verstuur'} disabled={!this.state.emailValid || !this.state.nameValid || !this.state.messageValid}/>
							
							<TransitionGroup>
							{this.state.messageError !== '' && 
								<CSSTransition timeout={300} classNames="fadeNoDelay">
									<div className="error">{this.state.messageError}</div>
								</CSSTransition>
							}
							</TransitionGroup>
						</form> 
					}
				</ReactCSSTransitionReplace>
			</div>
		)
	}
}

const Input = (props) => {
	return (
		<div>
			{props.label && <label>{props.label}</label>}
			<input type={props.type} value={props.value} onChange={props.onChange.bind(this, props.name)} className={props.className}/>
		</div>
	)
}

const Textarea = (props) => {
	return (
		<div>
			{props.label && <label>{props.label}</label>}
			<textarea rows={props.rows} value={props.value} onChange={props.onChange.bind(this, props.name)} className={props.className}/>
		</div>
	)
}

const Submit = (props) => {
	return (
		<div>
			<input type="submit" value={props.value} disabled={props.disabled}/>
		</div>
	)
}