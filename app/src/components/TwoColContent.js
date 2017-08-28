import React, { Component } from 'react'
import ContactForm from './ContactForm'

// Dumb component
export default class TwoColContent extends Component {
    createMarkup(html) {
        return {
            __html: html
        }
    }

    render() {
        const { page } = this.props

        return (
            <div className="wrapper">
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
        );
    }
}