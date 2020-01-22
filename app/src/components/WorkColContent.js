import React, { Component } from 'react'
import _ from 'lodash'
import {PosedDivLeft, PosedDivRight} from './PosedAnims'

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
            number % 2 === 0 ?
                <div className="wrapper work-item">
                    <PosedDivLeft className="item large-order-1">
    				    <Bubble post={post} createMarkup={this.createMarkup} posttags={posttags}/>	
                    </PosedDivLeft>
                    <PosedDivRight className="item rounded large-order-2" >
    				    <Images post={post} createMarkup={this.createMarkup}/>  
                    </PosedDivRight>
                </div>
                :
                <div className="wrapper work-item">
                    <PosedDivLeft className="item rounded large-order-1">
                        <Images post={post} createMarkup={this.createMarkup} className={number % 2 === 0 ? 'large-order-2' : 'large-order-1'}/>  
                    </PosedDivLeft>
                    <PosedDivRight className="item large-order-2">
                        <Bubble post={post} createMarkup={this.createMarkup} className={number % 2 === 0 ? 'large-order-1' : 'large-order-2'} posttags={posttags}/>  
                    </PosedDivRight>
                </div>   
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
        return (
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
        )
    }
}

class Images extends Component {
    render() {
        const { post, createMarkup } = this.props
        return (
            <div dangerouslySetInnerHTML={createMarkup(post.cmb2.column_metabox.column_content)} />                    
        )
    }
}