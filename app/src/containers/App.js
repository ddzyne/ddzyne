import React, { Component } from 'react'

import { Route, Switch } from 'react-router'
import { Helmet } from "react-helmet"
import MenuContainer from './MenuContainer'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ReactCSSTransitionReplace from 'react-css-transition-replace'

import { connect } from 'react-redux'
import { fetchMenuItems } from '../actions'
import { DEFAULT_MENU } from '../reducers/menu'

import WorkPageContainer from './WorkPageContainer'
import PageContainer from './PageContainer'

import Home from '../components/Home'
import Footer from '../components/Footer'
import NotFound from '../components/NotFound'
import PacmanLoader from '../components/PacmanLoader'

class App extends Component {
	componentWillMount() {
        const { fetchMenuItems } = this.props
        fetchMenuItems()
	}
	onEntered(node) {
		let nodeHt = node.clientHeight
		document.getElementById("content").style.minHeight = nodeHt + 'px'
	}
    render() {
        const { menu, loadingPages, loadingMenu, loadingCustomPosts, loadingPostTags, background, location } = this.props
        //no separate loading anims for now
        const loading = loadingPages || loadingMenu || loadingCustomPosts || loadingPostTags

        const currentKey = location.pathname.split('/')[1] || '/'

        return (
            <div className={background}>

                <Helmet>
                    <title>Ddzyne - Bespoke webdevelopment & design</title>
                    <meta name="description" content="Emergentie uit programmeren en ontwerpen. Datavisualisaties, Webapplicaties, WordPress websites." />
                </Helmet>

            	<MenuContainer menu={menu} />
            	<div className="middle" id="content">
            		<ReactCSSTransitionReplace 
            			transitionName="slide" 
                        transitionEnterTimeout={1000} 
                        transitionLeaveTimeout={1000}
                        overflowHidden={false}>
		            	<Switch key={currentKey} location={location}>
		            		<Route path="/" exact component={Home}/>
			                {menu.map( (item, i) =>  
			                	<Route 
			                		key={i} 
			                		path={`/${item.attr_title}`} 
			                		render={ (props) => item.attr_title === 'werk' ? <WorkPageContainer {...props} /> : <PageContainer {...props} pageName={currentKey} /> }
			                	/>
			                )}
			                <Route component={NotFound} />
		            	</Switch>
		            </ReactCSSTransitionReplace>
	            </div>
	            <ReactCSSTransitionReplace 
            			transitionName="slideDown" 
                        transitionEnterTimeout={1000} 
                        transitionLeaveTimeout={1000}
                        overflowHidden={false}>
	           		<Footer key={currentKey}/>
	           	</ReactCSSTransitionReplace>
            	
                <TransitionGroup>
            		{ loading &&
	            	<CSSTransition timeout={1100} classNames="fade" unmountOnExit={true}>
	            		<PacmanLoader/>
	            	</CSSTransition>
		            }
	           </TransitionGroup>

            </div>
		)
    }
}

function mapStateToProps(state) {
    const menu = state.menu.menuItems || state.menu[DEFAULT_MENU]
    const location = state.router.location || {pathname: ''}
    return {
        menu: menu,
        loadingPages: state.loader.loadingPages,
        loadingMenu: state.loader.loadingMenu,
        loadingCustomPosts: state.loader.loadingCustomPosts,
        loadingPostTags: state.loader.loadingPostTags,
        background: state.background.color,
        location: location,
    }
}

export default connect(mapStateToProps,{ fetchMenuItems })(App)