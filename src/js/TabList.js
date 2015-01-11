var React = require('react'),
    List = require('./List');

var TabList = React.createClass({
    render: function(){
        var lists = this.props.lists,
            tabs = lists.map(function(list, i){
                return <a className={"tab " + (this.state.selected === i ? 'active' : '')}
                          onClick={this.selectTab.bind(this, i)}>
                        <span className="count">{list.items.length}</span>
                        <span className="caption">{list.title.toUpperCase()}</span>
                      </a>;
            }, this),
            items = lists[this.state.selected].items;

        return  <div className="tablist-container">
                    <nav className="tabs">
                      {tabs}
                    </nav>
                    <List items={items} />
                </div>;
    },
    getInitialState: function(){
        return {
            selected: 0
        };
    },
    selectTab: function(i){
        this.setState({
            selected: i
        });
    }
});

module.exports = TabList;