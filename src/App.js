import React from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from './Plot.js'
import moment from 'moment';
import Papa from 'papaparse'
import Grid from '@material-ui/core/Grid'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      search_term: "",
      response_data: "",
      out_data: "",
      data_loaded: false,
      submitted: 0,
      settings: 0, // 0 - stay put, 1 - schoolopennow1, 2 - schoolopennow2, 3 - maskmandate25, 4 - maskmandate50, 5 - shutdown1week, 6 - shutdown2week,
      records: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault()
    //this.setState({ response_data: [] })
    this.setState({ submitted: 1 })
    this.getPlotData(this.state.search_term)
    //this.getResponse("http://127.0.0.1:5000/", this.state)
  }

  componentWillMount() {
    // load all the data up and set state
    Papa.parse('outputdata.txt', {
    download: true,
    complete: results => {
        /*for (var i=0;i<results.data.length;i++) {
            this.setState({ records: [...this.state.records, results.data[i]] })
        }*/
        this.setState({ records: results.data })
        console.log(this.state.records)
        this.setState({ data_loaded: true })
    }})
  }

  render () {
      var valid_states = [
          "New York",
          "Capital District",
          "US",
          "New Jersey",
          "California",
          "Texas",
          "Florida",
          "Massachusetts",
          "Illinois",
          "Pennsylvania",
          "Michigan",
          "Georgia",
          "Arizona",
          "Louisiana",
          "Connecticut",
          "Ohio",
          "Maryland",
          "Indiana",
          "North Carolina",
          "South Carolina",
          "Virginia",
          "Mississippi",
          "Alabama",
          "Colorado",
          "Washington",
          "Minnesota",
          "Tennessee",
          "Missouri",
          "Nevada",
          "Wisconsin",
          "Rhode Island",
          "Iowa"
          ]

      let state_records = {}
      // need to reformat data to be able to pull out individual state data - maybe a cleaner way to do this
      for (var i=0;i<this.state.records.length;i++) {
            var this_state = this.state.records[i][0].trim()
            if (this_state in state_records) {
                 state_records[this_state].push({
                      'FIPS': this.state.records[i][1],
                      'Date': this.state.records[i][2],
                      'Date_UTC': moment.utc(this.state.records[i][2]).valueOf(),
                      'Days_from_Ref': this.state.records[i][3],
                      'RelativeMobility': Math.round(parseFloat(this.state.records[i][4])),
                      'CumulativeMobility': Math.round(parseFloat(this.state.records[i][5])),
                      'Actual': this.state.records[i][6],
                      'FatalityRA': this.state.records[i][7],
                      'CumFatality_Stayput': Math.round(parseFloat(this.state.records[i][8])),
                      'SchoolOpenNow1': Math.round(parseFloat(this.state.records[i][9])),
                      'SchoolOpenNow2': Math.round(parseFloat(this.state.records[i][10])),
                      'MaskMandate25': Math.round(parseFloat(this.state.records[i][11])),
                      'MaskMandate50': Math.round(parseFloat(this.state.records[i][12])),
                      'Shutdown1week': Math.round(parseFloat(this.state.records[i][13])),
                      'Shutdown2week': Math.round(parseFloat(this.state.records[i][14])),
                      'Population': this.state.records[i][15]
                  })
            }
            else {
                 state_records[this_state] = [({
                      'FIPS': this.state.records[i][1],
                      'Date': this.state.records[i][2],
                      'Date_UTC': moment.utc(this.state.records[i][2]).valueOf(),
                      'Days_from_Ref': this.state.records[i][3],
                      'RelativeMobility': Math.round(parseFloat(this.state.records[i][4])),
                      'CumulativeMobility': Math.round(parseFloat(this.state.records[i][5])),
                      'Actual': this.state.records[i][6],
                      'FatalityRA': this.state.records[i][7],
                      'CumFatality_Stayput': Math.round(parseFloat(this.state.records[i][8])),
                      'SchoolOpenNow1': Math.round(parseFloat(this.state.records[i][9])),
                      'SchoolOpenNow2': Math.round(parseFloat(this.state.records[i][10])),
                      'MaskMandate25': Math.round(parseFloat(this.state.records[i][11])),
                      'MaskMandate50': Math.round(parseFloat(this.state.records[i][12])),
                      'Shutdown1week': Math.round(parseFloat(this.state.records[i][13])),
                      'Shutdown2week': Math.round(parseFloat(this.state.records[i][14])),
                      'Population': this.state.records[i][15]
                  })]
            }
      }
      let getPlotData = search_term => state_records[search_term] // one line inner function to grab a single state's data
      return (
      <div className="App">
            <div className="upper-bit">
                  <h3>Mobility-informed collision model for Covid transmission</h3>
                  <p>See <a href="https://github.com/reichlab/covid19-forecast-hub/blob/master/data-processed/RPI-UW-Mob-Collision/metadata-RPI-UW-Mob-Collision.txt">github page</a> and <a href="https://www.medrxiv.org/content/10.1101/2020.07.25.20162016v1">paper</a> for details.</p>
                  <p className="notes">Forecast on 8/30/2020, for the next 6 weeks</p>
                  {/*<p className="notes">Opening schools and implmenting shutdowns will affect the relative mobility values. A mask mandate will reduce the infection rate (&beta;) in the model.</p>*/}
                  <div className="settings-form">
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                              <label>
                                    <input type="radio" value="0" checked = {this.state.settings === 0} onClick={(e) => this.setState({ settings: 0 })} />
                                    Stay put
                              </label>
                              <label>
                                    <input type="radio" value="1" checked = {this.state.settings === 1} onClick={(e) => this.setState({ settings: 1 })} />
                                    Schools open 1
                              </label>
                              <label>
                                    <input type="radio" value="2" checked = {this.state.settings === 2} onClick={(e) => this.setState({ settings: 2 })} />
                                    Schools open 2
                              </label>
                              <label>
                                    <input type="radio" value="3" checked = {this.state.settings === 3} onClick={(e) => this.setState({ settings: 3 })} />
                                    Mask mandate 25
                              </label>
                              <label>
                                    <input type="radio" value="4" checked = {this.state.settings === 4} onClick={(e) => this.setState({ settings: 4 })} />
                                    Mask mandate 50
                              </label>
                              <label>
                                    <input type="radio" value="5" checked = {this.state.settings === 5} onClick={(e) => this.setState({ settings: 5 })} />
                                    Shutdown for 1 week
                              </label>
                              <label>
                                    <input type="radio" value="6" checked = {this.state.settings === 6} onClick={(e) => this.setState({ settings: 6 })} />
                                    Shutdown for 2 weeks
                              </label>
                        </form>
                  </div>
                  <div className="settings-blurb">
                        {(this.state.settings === 0) ?
                              (<p></p>) : (
                         (this.state.settings === 1) ?
                              (<p>School open - recovery rate (&gamma;) lowered by 0.01</p>) : (
                         (this.state.settings === 2) ?
                              (<p>School open - recovery rate (&gamma;) lowered by 0.02</p>) : (
                         (this.state.settings === 3) ?
                              (<p>Mask mandate - infection rate (&beta;) drops by 25%</p>) : (
                         (this.state.settings === 4) ?
                              (<p>Mask mandate - infection rate (&beta;) drops by 50%</p>) : (
                         (this.state.settings === 5) ?
                              (<p>Shutdown for 1 week - mobility equals to 50% of January baseline</p>) : (
                         (this.state.settings === 6) ?
                              (<p>Shutdown for 2 weeks - mobility equals to 50% of January baseline</p>) : (<p></p>)
                        ))))))}
                  </div>
                  <div className="plot-legend">
                        <svg width="600" height="25">
                              <circle cx="80" cy="15" r="3" stroke="#0d47a1" fill="#0d47a1" />
                              <text x="100" y="20" class="small">Actual</text>
                              <circle cx="240" cy="15" r="3" stroke="#4aba53" fill="#4aba53" />
                              <text x="260" y="20" class="small">Prediction (stay put)</text>
                              <circle cx="420" cy="15" r="3" stroke="#eb3710" fill="#eb3710" />
                              <text x="440" y="20" class="small">Prediction with selected policy</text>
                        </svg>
                  </div>
            </div>
            <div className="output-container">
                  {(this.state.data_loaded === true) ?
                        (<Grid container spacing={4} alignContent='center' alignItems='center' justify='center'>
                              {valid_states.map((state_name) => (
                                    <Grid item key={state_name}>
                                          <Plot data={getPlotData(state_name)} name={state_name} settings={this.state.settings}/>
                                    </Grid>
                              ))}
                        </Grid>) : (<p>Loading data...</p>)}

            </div>
      </div>
    )
  }
}

export default App;



