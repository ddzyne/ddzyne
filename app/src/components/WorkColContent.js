import React, { Component } from 'react'
import cn from 'classnames'
import _ from 'lodash'
import VisibilitySensor from 'react-visibility-sensor'

// Dumb component
export default class WorkColContent extends Component {
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
        const { post, number, posttags } = this.props

        return (
            <VisibilitySensor 
                onChange={this.onChangeVisibility} 
                active={!this.state.visible}
                partialVisibility={true}>
                <div className={`wrapper ${this.state.visible ? 'animate-me' : ''}`}>
    				<Bubble post={post} createMarkup={this.createMarkup} className={number % 2 === 0 ? 'large-order-1 leftside' : 'large-order-2 rightside'} posttags={posttags}/>	
    				<Images post={post} createMarkup={this.createMarkup} className={number % 2 === 0 ? 'large-order-2 rightside' : 'large-order-1 leftside'}/>  
                </div>
            </VisibilitySensor>
        );
    }
}

class Bubble extends Component {
    constructor(props) {
        super(props)
        this.findTag = this.findTag.bind(this)
    }
    findTag(tag) {
        let tagToName = _.find(this.props.posttags, {id: tag})
        if (tagToName !== undefined) {
            return tagToName.hasOwnProperty('name') && tagToName.name
        }
    }
    render() {
        const { post, createMarkup } = this.props
        const className = cn('item', this.props.className)
        return (
            <div className={className}>
                <div className="bubble">
                    <h6>Voor wie?</h6>
                    <p dangerouslySetInnerHTML={createMarkup(post.cmb2.extra_metabox.extra_klant)} />
                    <h6>Wat?</h6>
                    <p dangerouslySetInnerHTML={createMarkup(post.cmb2.extra_metabox.extra_project)} />
                    <h6>Vertel eens wat meer?</h6>
                    <div dangerouslySetInnerHTML={createMarkup(post.content.rendered)} />
                    <h6>Waarmee?</h6>
                    <div className="tags">{post.tags.map( (tag,i) => <span key={i}>{this.findTag(tag)}</span>)}</div>
                </div>
            </div>
        )
    }
}

class Images extends Component {
    render() {
        const { post, createMarkup } = this.props
        const className = cn('item', 'rounded', this.props.className)

        return (
            <div className={className}>
                <div dangerouslySetInnerHTML={createMarkup(post.cmb2.column_metabox.column_content)} />                    
            </div>
        )
    }
}