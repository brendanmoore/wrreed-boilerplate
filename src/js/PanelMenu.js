var React = require('react'),
    BackButton = require('./BackButton'),
    MenuButton = require('./MenuButton');

var PanelMenu = React.createClass({
    render: function(){

        var items = this.props.items,
            menuItems = items.map(function(item){
                return <li className="menu-item" key={item.label}>
                        <a href="#" onClick={item.onClick}>{item.label}</a></li>;
            }),
            h = this.state.h,
            style = {
                transform: "translate3d(0px,"+(this.props.menuOpen ? h:0)+"px,0px)"
            };
        return <div className="panel-menu" style={style}>
                  <ul className="menu">
                    {menuItems}
                  </ul>
                </div>;
    },
    getInitialState: function(){
        return {
            h: 0
        };
    },
    componentDidMount: function(){
        this.setState({
            h: this.getDOMNode().offsetHeight + 50
        });
    }
});

module.exports = PanelMenu;