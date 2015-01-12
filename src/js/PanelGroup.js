var React = require('react/addons'),
    swipePanels = require('./swipePanelsMixin'),
    cx = React.addons.classSet,
    PanelGroupHeader = require('./PanelGroupHeader'),
    PanelMenu = require('./PanelMenu'),
    Panel = require('./Panel'),
    List = require('./List'),
    ChannelPanel = require('./ChannelPanel'),
    ProfilePanel = require('./ProfilePanel'),
    store = require('./Store').getInstance();


var translate3dString = function(x){
    x = x || 0;
    return 'translate3d('+x+'vw, 0, 0)';
};

var PanelGroup = React.createClass({

    mixins: [swipePanels],
    render: function(){

        var moving = this.state.moving,
            activePanel = this.state.activePanel,
            menuOpen = this.state.menuOpen,
            panelDepth = store.get('panelDepth' || 0),
            panelData = [{
                title: "Starred",
                className: 'starred',
                content: store.get('starred') || {},
                menu: {
                    items: [
                        { label: "Find my friends", href: "#"},
                        { label: "Manage stars", href: "#"},
                        { label: "Discover stars", href: "#"},
                        { label: "Star settings", href: "#"}
                    ]
                }
            },
            {
                title: "Chat",
                className: "chat",
                content: store.get('chat') || {},
                menu: {
                    items: [
                        { label: "Find my friends", href: "#"},
                        { label: "Create Group", href: "#"},
                        { label: "Discover people", href: "#"}
                    ]
                }
            },
            {
                title: "Channel",
                className: "channels",
                content: store.get('channels') || {},
                menu: {
                    items: [
                        { label: "Find my friends", href: "#"},
                        { label: "Create channel", href: "#"},
                        { label: "Discover channels", href: "#"},
                        { label: "Channels settings", href: "#"}
                    ]
                }
            }
            ],
            wrapperClassName = cx({
                "panels-wrapper": true,
                "home": true,
                "moving": this.state.moving
            }),
            panels = panelData.map(function(panel, i){
                panel.menu.menuOpen = activePanel === i && menuOpen;
                panel.content.onItemClick = this.onItemClick;
                return <Panel key={i} {...panel} />;
            }, this),
            pos = this.state.activePanel || 0,
            mainPanelStyle = {},
            detailPanelsStyle = {},
            subDetailPanelStyle = {},
            mainPanelOffsetValue = pos * 100 * -1

        switch(panelDepth){
            case 0:
                //All good nowt to say...
                mainPanelStyle.transform = translate3dString(mainPanelOffsetValue)
            break;
            case 1:
                //We are viewing a chat/channel
                mainPanelStyle.transform = translate3dString(mainPanelOffsetValue-100);
                detailPanelsStyle.transform = translate3dString(-100);
            break;
            case 2:
                //We are viewing a about/profile
                mainPanelStyle.transform = translate3dString(mainPanelOffsetValue-100);
                detailPanelsStyle.transform = translate3dString(-100);
                subDetailPanelStyle.transform = translate3dString(-100);
            break;
        }

        return <div>
                { /* Top Level Panels */}
                <div className={wrapperClassName}>
                  <PanelGroupHeader active={activePanel} toggleMenu={this.toggleMenu} />
                  <div ref="topLevelPanels" id="home-panels" className="panels" style={mainPanelStyle}>
                    {panels}
                  </div>
                </div>

                { /* Detail Panels */}
                <div className="panels-wrapper detail" style={detailPanelsStyle}>
                  <div id="detail-panels" className="panels" style={subDetailPanelStyle}>
                    <ChannelPanel onBackPressed={this.toggleDetail} showSubDetail={this.toggleSubDetail} />
                    <ProfilePanel onBackPressed={this.toggleSubDetail} />
                  </div>
                </div>
               </div>
    },
    onItemClick: function(item){
        console.log(item);
        store.set('panelDepth', 1);
    },
    getInitialState: function(){
        return {
            activePanel: 0,
            moving: false,
            menuOpen: false
        }
    },
    toggleMenu: function(){
        this.setState({menuOpen: !this.state.menuOpen});
    },
    toggleDetail: function(){
        if(this.state.moving) return;
        store.set('panelDepth', +(!store.get('panelDepth')));
    },
    toggleSubDetail: function(){
       var depth = store.get('panelDepth');
       depth = depth == 2 ? 1 : 2;
       store.set('panelDepth', depth);
    }
});

module.exports = PanelGroup;