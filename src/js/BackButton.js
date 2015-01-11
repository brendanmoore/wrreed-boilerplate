var React = require('react');

var BackButton = React.createClass({
    render: function(){
        return <button className="back-trigger left-arrow" onClick={this.props.onClick}>
                  <span className="head-piece" />
                  <span className="head-piece" />
                </button>;
    }
});

module.exports = BackButton;