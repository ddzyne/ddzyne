import React, { Component } from 'react'
import ContactForm from './ContactForm'
import VisibilitySensor from 'react-visibility-sensor'

// Dumb component
export default class TwoColContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
        this.onChangeVisibility = this.onChangeVisibility.bind(this)
    }
    createMarkup(html) {
        return {
            __html: html
        }
    }
    onChangeVisibility (isVisible) {
        this.setState({visible: isVisible});
    }

    render() {
        const { page } = this.props

        return (
            <VisibilitySensor 
                onChange={this.onChangeVisibility} 
                active={!this.state.visible}
                partialVisibility={true}
                offset={{top:100}}
                scrollDelay={200}>
                <div className={`wrapper ${this.state.visible ? 'animate-me' : ''}`}>
                    <div className="item leftside">
    					<div className="bubble" dangerouslySetInnerHTML={this.createMarkup(page.content.rendered)} />		
    				</div>
    				<div className="item rounded rightside">
                        {page.slug === 'contact' ?
                            <ContactForm /> 
                        :
    					   <div dangerouslySetInnerHTML={this.createMarkup(page.cmb2.column_metabox.column_content)} />					
                        }
    				</div>
                </div>
            </VisibilitySensor>
        );
    }
}