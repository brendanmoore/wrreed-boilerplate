var React = require('react');

var ContentList = React.createClass({
    render: function(){

        var items = this.props.items,
            contentItems = items.map(function(item, i){
                return <li className="text-list-item" key={i}>
                        <span className="user-icon">{item.user}</span>
                        <article className="text-list-bubble">{item.text}</article>
                      </li>
            }, this);

        return <ul className="text-list">
            { contentItems }
        </ul>;
    }
});

module.exports = ContentList;
