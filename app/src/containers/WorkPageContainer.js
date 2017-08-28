import React, { Component } from 'react'
import {Helmet} from "react-helmet"
import WorkColContent from '../components/WorkColContent'
import { connect } from 'react-redux'
import { fetchPageIfNeeded, fetchCustomPostsIfNeeded, fetchPostTagsIfNeeded } from '../actions'
import { DEFAULT_PAGE } from '../reducers/pages'
import { DEFAULT_CUSTOM_POST } from '../reducers/customposts'
import { DEFAULT_POST_TAGS } from '../reducers/posttags'

// Smart component
class WorkPageContainer extends Component {
    componentWillMount() {
        const { fetchPageIfNeeded, fetchCustomPostsIfNeeded, fetchPostTagsIfNeeded, pageName } = this.props
        fetchPageIfNeeded(pageName)
        fetchCustomPostsIfNeeded('work')
        fetchPostTagsIfNeeded()
    }
    render() {
        const { customposts, posttags, page } = this.props
        return (
            <div>
                <Helmet>
                    <title>Ddzyne - Bespoke webdevelopment & design - {page.title.rendered}</title>
                </Helmet>
                {customposts.map( (post, i) => <WorkColContent key={i} post={post} number={i} posttags={posttags} />)}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const customposts = state.customposts['work'] || state.customposts[DEFAULT_CUSTOM_POST]
    const pageName = state.router.location.pathname.replace(/\//g, "")
    const page = state.pages[pageName] || state.pages[DEFAULT_PAGE]
    const tags = state.posttags['tags'] || state.posttags[DEFAULT_POST_TAGS]
    return {
        page: page,
        pageName: pageName,
        customposts: customposts,
        posttags: tags,
    }
}

export default connect(
    mapStateToProps,
    { fetchPageIfNeeded, fetchCustomPostsIfNeeded, fetchPostTagsIfNeeded }
)(WorkPageContainer)