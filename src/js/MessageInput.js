var React = require('react');

var MessageInput = React.createClass({
    render: function(){
        return <div className="message-input">
                <textarea ref="input"className="panel-footer-input" placeholder="Type a message..." />
                <span className="panel-footer-control">
                  <button className="send-trigger" onClick={this.onSend}>SEND</button>
                </span>
            </div>;
    },
    onSend: function(){
        var val = this.refs.input.getDOMNode().value;
        this.props.onSend(val);
    }
});

module.exports = MessageInput;