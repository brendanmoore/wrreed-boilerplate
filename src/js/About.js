var React = require('react');

var About = React.createClass({
    render: function(){
        return <article className="about">{this.props.text}</article>;
    }
});

module.exports = About;