import React, { Component } from 'react'
import WorkColContent from '../components/WorkColContent'
import Title from '../components/Title'
import { connect } from 'react-redux'
import { fetchPageIfNeeded, fetchCustomPostsIfNeeded, fetchPostTagsIfNeeded, setLoadMore } from '../actions'
import { DEFAULT_PAGE } from '../reducers/pages'
import { DEFAULT_CUSTOM_POST } from '../reducers/customposts'
import { DEFAULT_POST_TAGS } from '../reducers/posttags'
import InfiniteScroll from 'react-infinite-scroller'
import PacmanLoader from '../components/PacmanLoader'

// Smart component
class WorkPageContainer extends Component {
    constructor(props) {
        super(props)
        this.loadMore = this.loadMore.bind(this)
    }
    componentWillMount() {
        const { fetchPageIfNeeded, fetchPostTagsIfNeeded, pageName } = this.props
        fetchPostTagsIfNeeded()
        fetchPageIfNeeded(pageName)
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.customposts.posts[0].hasOwnProperty('id') && nextProps.page.hasOwnProperty('id') && nextProps.posttags[0].hasOwnProperty('link') && nextProps.customposts.posts.length > this.props.customposts.posts.length
    }
    loadMore() {
        this.props.setLoadMore(true)
        this.props.fetchCustomPostsIfNeeded('work', this.props.customposts.page + 1)
    }
    render() {
        const { customposts, posttags, page, loadingMoreCustomPosts } = this.props
        return (
            <div>
                <Title title={page.title.rendered} meta={page.excerpt.rendered} />
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={!customposts.gotAll && !loadingMoreCustomPosts}
                    loader={<PacmanLoader key={0} className="inline-loader"/>}>
                    {customposts.posts.map( (post, i) => 
                        <WorkColContent key={i} post={post} number={i} posttags={posttags} />
                    )}
                </InfiniteScroll>
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
        loadingMoreCustomPosts: state.loader.loadingMoreCustomPosts,
    }
}

export default connect(
    mapStateToProps,
    { fetchPageIfNeeded, fetchCustomPostsIfNeeded, fetchPostTagsIfNeeded, setLoadMore }
)(WorkPageContainer)