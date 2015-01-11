var React = require('react');

var PanelGroupHeader = React.createClass({
    render: function(){

        var dots = [0,1,2].map(function(dot, i){
            return <li key={i} className={"dot " + (this.props.active === i ? "active" :"" )} />
        }, this);

        return <header className="panels-wrapper-header">
            <div className="page-indicator-wrapper">
              <ul className="page-indicator">
                { dots }
              </ul>
            </div>
            <button className="menu-trigger bars" onClick={this.props.toggleMenu}>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </header>;
    }
});

module.exports = PanelGroupHeader;