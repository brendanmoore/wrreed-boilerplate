"use strict";
var React = require('react');

var List = React.createClass({
    render: function(){

        var items = this.props.items || [],
            listItems = items.map(function(item, i){
                var jewelCount,
                    label = item.label || item,
                    key = item._id || i;
                if(item.count){
                    jewelCount = <span className="list-jewel">{item.count}</span>;
                }
                return <li key={key} className="list-item">
                            <a onClick={this.onItemClick.bind(this, item)}>{label}{jewelCount}</a>
                       </li>;
            }, this);

        return <ul className="list-view">{listItems}</ul>;
    },
    onItemClick: function(item){
        this.props.onItemClick(item);
    }
});

module.exports = List;