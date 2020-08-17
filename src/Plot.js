import React from 'react'
import './App.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class Plot extends React.Component {
  constructor(props) {
    super(props)
    var prediction_date = "" // use this to change line color on plot, will need to get it as a percentage of total dates
    let collect_prediction = 0 // switch to get date predictions start from // to scale y axis of plot
    for (var i=0; i<this.props.data.length; i++) {
      if (this.props.data[i].Actual == "Prediction") {
        prediction_date = this.props.data[i].Date
        break
      }
    }
    this.line_percent = i*100/(this.props.data.length) // change color of line at this percentage
  }


  render() {
    let options = ["CumFatality_Stayput","SchoolOpenNow1","SchoolOpenNow2","MaskMandate25","MaskMandate50","Shutdown1week","Shutdown2week"]
    let data_key = options[this.props.settings]
    let last_index = this.props.data.length - 1
    let max_value = 0
    for (var i = 0; i<options.length;i++) {
      if (max_value < this.props.data[last_index][options[i]]) {
        max_value = this.props.data[last_index][options[i]]
      }
    }
    let y_scaler = Math.round(1.01*max_value)
    return (
      <div className="plot-container">
        <p className="plot-title">{this.props.name}</p>
        <LineChart
          width = {320}
          height = {160}
          data = {this.props.data}
          margin = {{ top: 5, right: 20, left: 10, bottom: 5 }}
          label = {this.props.name}
        >
          <defs>
            <linearGradient id="line1color" x1="0%" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#0d47a1" />
              <stop offset={`${this.line_percent}%`} stopColor="#0d47a1"/>
              <stop offset={`${this.line_percent}%`} stopColor="#4aba53"/>
              <stop offset="100%" stopColor="#4aba53"/>
            </linearGradient>
            <linearGradient id="line2color" x1="0%" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#eb3710"/>
              <stop offset="100%" stopColor="#eb3710"/>
            </linearGradient>
          </defs>
          <YAxis domain={[0, y_scaler]} tick={{fontSize: 8}}/>
          <XAxis dataKey="Date" tick={{fontSize: 8}}/>
          <Tooltip />
          <CartesianGrid stroke="#f7f7f7" />
          <Line
            type="monotone"
            dataKey="CumFatality_Stayput" // keep stay_put settings line
            stroke="url(#line1color)"
            yAxisId={0}
            dot={false}
            strokeWidth={2}
          />
          <Line
              type="monotone"
              dataKey={data_key} // should be this.props.settings
              stroke="url(#line2color)"
              yAxisId={0}
              dot={false}
              strokeWidth={(this.props.settings === 0) ? 0 : 2}
          />

        }
        </LineChart>
      </div>
    )
      }
}

export default Plot