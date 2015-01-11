var React = require('react'),
    PanelMenu = require('./PanelMenu'),
    BackButton = require('./BackButton'),
    MenuButton = require('./MenuButton'),
    ProfileChart = require('./ProfileChart'),
    About = require('./About'),
    TabList = require('./TabList');

var ProfilePanel = React.createClass({
    render: function(){

        var menu = {
                menuOpen: this.state.menuOpen,
                items: [
                    { label: "Menu Item 1", onClick: this.onMenuClick },
                    { label: "Menu Item 2", onClick: this.onMenuClick },
                    { label: "Menu Item 3", onClick: this.onMenuClick },
                ]
            },
            chart = {
                title: "VIEWS",
                primaryValue: "105K",
                data: [28, 38, 48, 55, 86, 90, 200]
            },
            aboutText = "Channel dedicated to staff at Exeter Mathematics College to discuss integrating Wrreed into the EMC community.",
            tabListProps = {
                lists: [
                    { title: "EDITORS", items: [
                        "Chris Prescott",
                        "Kerry Burnham"
                        ] },
                    { title: "WRITERS", items: [
                        "Chris Prescott",
                        "Kerry Burnham",
                        "El Brendo",
                        "Jesus of Nazerath"
                        ] },
                    { title: "READERS", items: [
                        "Chris Prescott",
                        "Kerry Burnham"
                        ] }
                ]
            }

        return <section className="panel profile">
              <div className="panel-header">
                <PanelMenu {...menu} />
                <div className="panel-header-text">
                  <h3>About channel</h3>
                  <span className="panel-sub-header">#ecm</span>
                </div>
                <BackButton onClick={this.onBackPressed} />
                <MenuButton onClick={this.toggleMenu} />
              </div>
              <div className="panel-body">
                <About text={aboutText} />
                <ProfileChart {...chart} />
                <TabList {...tabListProps} />
              </div>
            </section>;
    },
    getInitialState: function(){
        return {
            menuOpen: false
        };
    },
    onBackPressed: function(){
        this.props.onBackPressed();
    },
    toggleMenu: function(){
        this.setState({
            menuOpen: !this.state.menuOpen
        })
    }
});

module.exports = ProfilePanel;