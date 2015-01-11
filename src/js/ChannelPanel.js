var React = require('react'),
    store = require('./Store').getInstance(),
    PanelMenu = require('./PanelMenu'),
    BackButton = require('./BackButton'),
    MenuButton = require('./MenuButton'),
    ContentList = require('./ContentList'),
    MessageInput = require('./MessageInput');

var ChannelPanel = React.createClass({
    render: function(){
        var menu = {
                menuOpen: this.state.menuOpen,
                items: [
                    { label: "About channel", onClick: this.showAbout },
                    { label: "Remove from starred", onClick: this.onMenuClick },
                    { label: "Invite friends to channel", onClick: this.onMenuClick },
                    { label: "Leave channel", onClick: this.onMenuClick }
                ]
            },
            channelData = store.get('channelData');

        return <section className="panel channel">
              <div className="panel-header">
                <PanelMenu {...menu} />
                <div className="panel-header-text">
                  <h3>{channelData.title}</h3>
                  <span className="panel-sub-header">{channelData.type}. {channelData.members.length} MEMBERS</span>
                </div>
                <BackButton onClick={this.onBackPressed} />
                <MenuButton onClick={this.toggleMenu} />
              </div>
              <div className="panel-body bottom">
                <ContentList items={channelData.items||[]} />
              </div>
              <div className="panel-footer">
                <MessageInput onSend={this.onSendMessage}/>
              </div>
            </section>;
    },
    getInitialState: function(){
        return {
            menuOpen: false
        }
    },
    toggleMenu: function(){
        this.setState({ menuOpen: !this.state.menuOpen });
    },
    onBackPressed: function(){
        store.set('panelDepth', 0);
        this.setState({
            menuOpen: false
        });
    },
    onSendMessage: function(message){
        console.log(message);
    },
    showAbout: function(){
        this.props.showSubDetail();
        this.setState({
            menuOpen: false
        });
    }
});

module.exports = ChannelPanel;