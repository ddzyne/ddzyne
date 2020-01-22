import React, { Component } from 'react'
import ContactForm from './ContactForm'
import _ from 'lodash'
import Masonry from 'react-masonry-component'
import {SlideInLeft, SlideInRight} from './Anims'

const masonryOptions = {
    transitionDuration: 300,
    horizontalOrder: false,
}

export default class TwoColContent extends Component {
    createMarkup(html) {
        return {
            __html: html
        }
    }
    render() {
        const { page, background } = this.props
        return (
            <div className="wrapper">
                <SlideInLeft className="item leftside">
					<div className="bubble">
                        <div dangerouslySetInnerHTML={this.createMarkup(page.content.rendered)} />
                        {!_.isEmpty(page.cmb2.about_social_metabox.about_social_group) && 
                            <div className="social">
                                {page.cmb2.about_social_metabox.about_social_group.map( (el, i) => <SocialIcon key={i} content={el} /> )}
                            </div>
                        }
                        {!_.isEmpty(page.cmb2.about_clients_metabox.about_clients_group) &&
                            <div className="clients">
                                <h4>Voor wie ik zoal werk (en heb gewerkt)</h4>
                                <Masonry className="client-list" options={masonryOptions}>
                                    {page.cmb2.about_clients_metabox.about_clients_group.map( (el, i) => <Client key={i} content={el} background={background} />)}
                                </Masonry>
                             </div>
                        }
                    </div>	
				</SlideInLeft>
				<SlideInRight className="item rounded rightside">
                    {page.slug === 'contact' ?
                        <ContactForm /> 
                    :
					   <div dangerouslySetInnerHTML={this.createMarkup(page.cmb2.column_metabox.column_content)} />					
                    }
				</SlideInRight>
            </div>
        );
    }
}

const SocialIcon = ({content}) =>
    <a 
        href={content.url} 
        target="_blank" 
        title={content.title}
        rel="noopener noreferrer">
        <i className={`fa fa-2x ${content.icon}`} aria-hidden="true"/>
    </a>

const Client = ({content, background}) => {
    const filename = background === 'white' ? content.logo.substring(0, content.logo.lastIndexOf(".")) + "-b" + content.logo.substring(content.logo.lastIndexOf(".")) : content.logo,
          className = content.logo.substring(content.logo.lastIndexOf("/")+1, content.logo.lastIndexOf("."))
    return <img className={className} src={filename} title={content.title} alt={content.title} />
}
