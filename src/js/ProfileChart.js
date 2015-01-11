var React = require("react"),
    Chart = require("./Chart");

var options = {
            showToolTips: false,
            showScale: false,
            pointDot: false,
            scaleShowGridLines: false,
            datasetStrokeWidth: 5
        };

var createProfileChartDataSet = function(data){
    return {
                labels: data.map(function(){ return "";}),
                datasets: [
                    {
                        label: "Views",
                        fillColor: "rgba(233,239,254, 1)",
                        strokeColor: "rgba(103,147,252, 1)",
                        data: data
                    }
                ]
            }
};

var ProfileChart = React.createClass({

    render: function(){

        var title = this.props.title.toUpperCase(),
            value = this.props.primaryValue;

        return <article className="chart">
                  <canvas ref="canvas" style={{width: '100%'}} />
                  <span className="chart-title">{title}</span>
                  <span className="chart-value">{value}</span>
                </article>;
    },

    componentDidMount: function(){
        var data = createProfileChartDataSet(this.props.data);
            var canvas = this.refs.canvas.getDOMNode();
            canvas.width = window.innerWidth;
            var chart = new Chart(canvas.getContext('2d')).Line(data, options);
    }

});

module.exports = ProfileChart;