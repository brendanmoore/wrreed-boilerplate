var React = require('react'),
    PanelMenu = require('./PanelMenu'),
    List = require('./List');

var Panel = React.createClass({
    render: function(){
        return <section className={"panel "+this.props.className}>
              <header className="panel-header">
                <PanelMenu {...this.props.menu}/>
                <h2>{this.props.title}</h2>
              </header>
              <div className="panel-body">
                <List {...this.props.content} />
              </div>
            </section>;
    }
});

module.exports = Panel;