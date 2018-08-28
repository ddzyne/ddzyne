import React, { Component } from 'react'
import TwoColContent from '../components/TwoColContent'
import Title from '../components/Title'
import { connect } from 'react-redux'
import { fetchPageIfNeeded } from '../actions'
import { DEFAULT_PAGE } from '../reducers/pages'

// Smart component
class PageContainer extends Component {
    componentWillMount() {
        const { fetchPageIfNeeded, pageName } = this.props
        fetchPageIfNeeded(pageName)
    }
    shouldComponentUpdate(nextProps) {
        return ( this.props.pageName !== nextProps.pageName || this.props.page.title.rendered !== nextProps.page.title.rendered ) && true
    }
    render() {
        const { page } = this.props
        console.log(this.props)

        return (
            page.hasOwnProperty('id') ?
            <div>
                <Title title={page.title.rendered} meta={page.excerpt.rendered} />
                <TwoColContent page={page} />
            </div>
            :
            <div/>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state)
    const pageName = ownProps.pageName
    const page = state.pages[pageName] || state.pages[DEFAULT_PAGE]
    return {
        page: page,
        pageName: pageName
    }
}

export default connect(
    mapStateToProps,
    { fetchPageIfNeeded }
)(PageContainer)