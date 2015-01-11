var React = require('react');

var MenuButton = React.createClass({
    render: function(){
        return <button className="menu-trigger bars" onClick={this.props.onClick}>
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                </button>;
    }
});

module.exports = MenuButton;