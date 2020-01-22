import React, { Component } from 'react'
import cn from 'classnames'
import { Route, Switch } from 'react-router'
import { Helmet } from "react-helmet"
import MenuContainer from './MenuContainer'
import { PoseGroup } from 'react-pose'

import { connect } from 'react-redux'
import { fetchMenuItems } from '../actions'
import { DEFAULT_MENU } from '../reducers/menu'

import WorkPageContainer from './WorkPageContainer'
import PageContainer from './PageContainer'

import Home from '../components/Home'
import Footer from '../components/Footer'
import NotFound from '../components/NotFound'
import PacmanLoader from '../components/PacmanLoader'
import {RouteContainer, FooterContainer, LoaderBox} from '../components/PosedAnims'

class App extends Component {
	componentDidMount() {
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

        const wrapperClass = cn('main-wrapper', background, {loading: loading})

        return (
            <div className={wrapperClass}>

                <Helmet>
                    <title>Ddzyne - Bespoke webdevelopment & design</title>
                    <meta name="description" content="Emergentie uit programmeren en ontwerpen. Datavisualisaties, Webapplicaties, WordPress websites." />
                </Helmet>

            	<MenuContainer menu={menu} />
            	<div className="middle" id="content">
            		<PoseGroup animateOnMount={true}>
                        <RouteContainer key={currentKey}>
    		            	<Switch location={location}>
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
                        </RouteContainer>
		            </PoseGroup>
	            </div>

                <PoseGroup>
                    {!loading && 
                        <FooterContainer key={currentKey}>
                            <Footer />
                        </FooterContainer>
                    }
                </PoseGroup>

                <PoseGroup>
                    {loading && 
                        <LoaderBox key="pacman" className="loader-wrap">
                            <PacmanLoader />
                        </LoaderBox>
                    }
                </PoseGroup>

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