import React from 'react';
import logo from './logo.svg';
import './App.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Papa from 'papaparse'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      search_term: "", // will be a county name
      response_data: "",
      out_data: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getResponse = this.getResponse.bind(this)
    this.getPlotData = this.getPlotData.bind(this)
    //this.componentDidMount = this.componentDidMount.bind(this)
    this.records = Papa.parse(`
      Statename, FIPS, Date, Days_from_Ref, RelativeMobility, CumulativeMobility, Actual-Predict, FatalityRA, CumFatality, Population
      New York,36,2020-1-22,-67,,,Actual,,,26161672
      New Jersey,34,2020-1-22,-71,,,Actual,,,8882190
      California,6,2020-1-22,-70,,,Actual,,,39512223
      Texas,48,2020-1-22,-61,,,Actual,,,28995881
      Massachusetts,25,2020-1-22,-76,,,Actual,,,6892503
      Florida,12,2020-1-22,-62,,,Actual,,,21477737
      Illinois,17,2020-1-22,-76,,,Actual,,,12671821
      Pennsylvania,42,2020-1-22,-76,,,Actual,,,12801989
      Michigan,26,2020-1-22,-74,,,Actual,,,9986857
      Connecticut,9,2020-1-22,-61,,,Actual,,,3565287
      Louisiana,22,2020-1-22,-57,,,Actual,,,4648794
      Georgia,13,2020-1-22,-56,,,Actual,,,10617423
      Arizona,4,2020-1-22,-64,,,Actual,,,7278717
      Ohio,39,2020-1-22,-78,,,Actual,,,11689100
      Maryland,24,2020-1-22,-82,,,Actual,,,6045680
      Indiana,18,2020-1-22,-77,,,Actual,,,6732219
      Virginia,51,2020-1-22,-67,,,Actual,,,8535519
      North Carolina,37,2020-1-22,-69,,,Actual,,,10488084
      South Carolina,45,2020-1-22,-67,,,Actual,,,5148714
      Mississippi,28,2020-1-22,-65,,,Actual,,,2976149
      Colorado,8,2020-1-22,-61,,,Actual,,,5758736
      Alabama,1,2020-1-22,-67,,,Actual,,,4903185
      Minnesota,27,2020-1-22,-83,,,Actual,,,5639632
      Washington,53,2020-1-22,-55,,,Actual,,,7614893
      Missouri,29,2020-1-22,-83,,,Actual,,,6137428
      Tennessee,47,2020-1-22,-82,,,Actual,,,6829174
      Rhode Island,44,2020-1-22,-86,,,Actual,,,1059361
      Wisconsin,55,2020-1-22,-65,,,Actual,,,5822434
      Nevada,32,2020-1-22,-82,,,Actual,,,3080156
      Iowa,19,2020-1-22,-73,,,Actual,,,3155070
      Oklahoma,40,2020-1-22,-79,,,Actual,,,3956971
      Kentucky,21,2020-1-22,-69,,,Actual,,,4467673
      New York,36,2020-1-23,-66,,,Actual,,,26161672
      New Jersey,34,2020-1-23,-70,,,Actual,,,8882190
      California,6,2020-1-23,-69,,,Actual,,,39512223
      Texas,48,2020-1-23,-60,,,Actual,,,28995881
      Massachusetts,25,2020-1-23,-75,,,Actual,,,6892503
      Florida,12,2020-1-23,-61,,,Actual,,,21477737
      Illinois,17,2020-1-23,-75,,,Actual,,,12671821
      Pennsylvania,42,2020-1-23,-75,,,Actual,,,12801989
      Michigan,26,2020-1-23,-73,,,Actual,,,9986857
      Connecticut,9,2020-1-23,-60,,,Actual,,,3565287
      Louisiana,22,2020-1-23,-56,,,Actual,,,4648794
      Georgia,13,2020-1-23,-55,,,Actual,,,10617423
      Arizona,4,2020-1-23,-63,,,Actual,,,7278717
      Ohio,39,2020-1-23,-77,,,Actual,,,11689100
      Maryland,24,2020-1-23,-81,,,Actual,,,6045680
      Indiana,18,2020-1-23,-76,,,Actual,,,6732219
      Virginia,51,2020-1-23,-66,,,Actual,,,8535519
      North Carolina,37,2020-1-23,-68,,,Actual,,,10488084
      South Carolina,45,2020-1-23,-66,,,Actual,,,5148714
      Mississippi,28,2020-1-23,-64,,,Actual,,,2976149
      Colorado,8,2020-1-23,-60,,,Actual,,,5758736
      Alabama,1,2020-1-23,-66,,,Actual,,,4903185
      Minnesota,27,2020-1-23,-82,,,Actual,,,5639632
      Washington,53,2020-1-23,-54,,,Actual,,,7614893
      Missouri,29,2020-1-23,-82,,,Actual,,,6137428
      Tennessee,47,2020-1-23,-81,,,Actual,,,6829174
      Rhode Island,44,2020-1-23,-85,,,Actual,,,1059361
      Wisconsin,55,2020-1-23,-64,,,Actual,,,5822434
      Nevada,32,2020-1-23,-81,,,Actual,,,3080156
      Iowa,19,2020-1-23,-72,,,Actual,,,3155070
      Oklahoma,40,2020-1-23,-78,,,Actual,,,3956971
      Kentucky,21,2020-1-23,-68,,,Actual,,,4467673
      New York,36,2020-1-24,-65,,,Actual,,,26161672
      New Jersey,34,2020-1-24,-69,,,Actual,,,8882190
      California,6,2020-1-24,-68,,,Actual,,,39512223
      Texas,48,2020-1-24,-59,,,Actual,,,28995881
      Massachusetts,25,2020-1-24,-74,,,Actual,,,6892503
      Florida,12,2020-1-24,-60,,,Actual,,,21477737
      Illinois,17,2020-1-24,-74,,,Actual,,,12671821
      Pennsylvania,42,2020-1-24,-74,,,Actual,,,12801989
      Michigan,26,2020-1-24,-72,,,Actual,,,9986857
      Connecticut,9,2020-1-24,-59,,,Actual,,,3565287
      Louisiana,22,2020-1-24,-55,,,Actual,,,4648794
      Georgia,13,2020-1-24,-54,,,Actual,,,10617423
      Arizona,4,2020-1-24,-62,,,Actual,,,7278717
      Ohio,39,2020-1-24,-76,,,Actual,,,11689100
      Maryland,24,2020-1-24,-80,,,Actual,,,6045680
      Indiana,18,2020-1-24,-75,,,Actual,,,6732219
      Virginia,51,2020-1-24,-65,,,Actual,,,8535519
      North Carolina,37,2020-1-24,-67,,,Actual,,,10488084
      South Carolina,45,2020-1-24,-65,,,Actual,,,5148714
      Mississippi,28,2020-1-24,-63,,,Actual,,,2976149
      Colorado,8,2020-1-24,-59,,,Actual,,,5758736
      Alabama,1,2020-1-24,-65,,,Actual,,,4903185
      Minnesota,27,2020-1-24,-81,,,Actual,,,5639632
      Washington,53,2020-1-24,-53,,,Actual,,,7614893
      Missouri,29,2020-1-24,-81,,,Actual,,,6137428
      Tennessee,47,2020-1-24,-80,,,Actual,,,6829174
      Rhode Island,44,2020-1-24,-84,,,Actual,,,1059361
      Wisconsin,55,2020-1-24,-63,,,Actual,,,5822434
      Nevada,32,2020-1-24,-80,,,Actual,,,3080156
      Iowa,19,2020-1-24,-71,,,Actual,,,3155070
      Oklahoma,40,2020-1-24,-77,,,Actual,,,3956971
      Kentucky,21,2020-1-24,-67,,,Actual,,,4467673
      New York,36,2020-1-25,-64,,,Actual,,,26161672
      New Jersey,34,2020-1-25,-68,,,Actual,,,8882190
      California,6,2020-1-25,-67,,,Actual,,,39512223
      Texas,48,2020-1-25,-58,,,Actual,,,28995881
      Massachusetts,25,2020-1-25,-73,,,Actual,,,6892503
      Florida,12,2020-1-25,-59,,,Actual,,,21477737
      Illinois,17,2020-1-25,-73,,,Actual,,,12671821
      Pennsylvania,42,2020-1-25,-73,,,Actual,,,12801989
      Michigan,26,2020-1-25,-71,,,Actual,,,9986857
      Connecticut,9,2020-1-25,-58,,,Actual,,,3565287
      Louisiana,22,2020-1-25,-54,,,Actual,,,4648794
      Georgia,13,2020-1-25,-53,,,Actual,,,10617423
      Arizona,4,2020-1-25,-61,,,Actual,,,7278717
      Ohio,39,2020-1-25,-75,,,Actual,,,11689100
      Maryland,24,2020-1-25,-79,,,Actual,,,6045680
      Indiana,18,2020-1-25,-74,,,Actual,,,6732219
      Virginia,51,2020-1-25,-64,,,Actual,,,8535519
      North Carolina,37,2020-1-25,-66,,,Actual,,,10488084
      South Carolina,45,2020-1-25,-64,,,Actual,,,5148714
      Mississippi,28,2020-1-25,-62,,,Actual,,,2976149
      Colorado,8,2020-1-25,-58,,,Actual,,,5758736
      Alabama,1,2020-1-25,-64,,,Actual,,,4903185
      Minnesota,27,2020-1-25,-80,,,Actual,,,5639632
      Washington,53,2020-1-25,-52,,,Actual,,,7614893
      Missouri,29,2020-1-25,-80,,,Actual,,,6137428
      Tennessee,47,2020-1-25,-79,,,Actual,,,6829174
      Rhode Island,44,2020-1-25,-83,,,Actual,,,1059361
      Wisconsin,55,2020-1-25,-62,,,Actual,,,5822434
      Nevada,32,2020-1-25,-79,,,Actual,,,3080156
      Iowa,19,2020-1-25,-70,,,Actual,,,3155070
      Oklahoma,40,2020-1-25,-76,,,Actual,,,3956971
      Kentucky,21,2020-1-25,-66,,,Actual,,,4467673
      New York,36,2020-1-26,-63,,,Actual,,,26161672
      New Jersey,34,2020-1-26,-67,,,Actual,,,8882190
      California,6,2020-1-26,-66,,,Actual,,,39512223
      Texas,48,2020-1-26,-57,,,Actual,,,28995881
      Massachusetts,25,2020-1-26,-72,,,Actual,,,6892503
      Florida,12,2020-1-26,-58,,,Actual,,,21477737
      Illinois,17,2020-1-26,-72,,,Actual,,,12671821
      Pennsylvania,42,2020-1-26,-72,,,Actual,,,12801989
      Michigan,26,2020-1-26,-70,,,Actual,,,9986857
      Connecticut,9,2020-1-26,-57,,,Actual,,,3565287
      Louisiana,22,2020-1-26,-53,,,Actual,,,4648794
      Georgia,13,2020-1-26,-52,,,Actual,,,10617423
      Arizona,4,2020-1-26,-60,,,Actual,,,7278717
      Ohio,39,2020-1-26,-74,,,Actual,,,11689100
      Maryland,24,2020-1-26,-78,,,Actual,,,6045680
      Indiana,18,2020-1-26,-73,,,Actual,,,6732219
      Virginia,51,2020-1-26,-63,,,Actual,,,8535519
      North Carolina,37,2020-1-26,-65,,,Actual,,,10488084
      South Carolina,45,2020-1-26,-63,,,Actual,,,5148714
      Mississippi,28,2020-1-26,-61,,,Actual,,,2976149
      Colorado,8,2020-1-26,-57,,,Actual,,,5758736
      Alabama,1,2020-1-26,-63,,,Actual,,,4903185
      Minnesota,27,2020-1-26,-79,,,Actual,,,5639632
      Washington,53,2020-1-26,-51,,,Actual,,,7614893
      Missouri,29,2020-1-26,-79,,,Actual,,,6137428
      Tennessee,47,2020-1-26,-78,,,Actual,,,6829174
      Rhode Island,44,2020-1-26,-82,,,Actual,,,1059361
      Wisconsin,55,2020-1-26,-61,,,Actual,,,5822434
      Nevada,32,2020-1-26,-78,,,Actual,,,3080156
      Iowa,19,2020-1-26,-69,,,Actual,,,3155070
      Oklahoma,40,2020-1-26,-75,,,Actual,,,3956971
      Kentucky,21,2020-1-26,-65,,,Actual,,,4467673
      New York,36,2020-1-27,-62,,,Actual,,,26161672
      New Jersey,34,2020-1-27,-66,,,Actual,,,8882190
      California,6,2020-1-27,-65,,,Actual,,,39512223
      Texas,48,2020-1-27,-56,,,Actual,,,28995881
      Massachusetts,25,2020-1-27,-71,,,Actual,,,6892503
      Florida,12,2020-1-27,-57,,,Actual,,,21477737
      Illinois,17,2020-1-27,-71,,,Actual,,,12671821
      Pennsylvania,42,2020-1-27,-71,,,Actual,,,12801989
      Michigan,26,2020-1-27,-69,,,Actual,,,9986857
      Connecticut,9,2020-1-27,-56,,,Actual,,,3565287
      Louisiana,22,2020-1-27,-52,,,Actual,,,4648794
      Georgia,13,2020-1-27,-51,,,Actual,,,10617423
      Arizona,4,2020-1-27,-59,,,Actual,,,7278717
      Ohio,39,2020-1-27,-73,,,Actual,,,11689100
      Maryland,24,2020-1-27,-77,,,Actual,,,6045680
      Indiana,18,2020-1-27,-72,,,Actual,,,6732219
      Virginia,51,2020-1-27,-62,,,Actual,,,8535519
      North Carolina,37,2020-1-27,-64,,,Actual,,,10488084
      South Carolina,45,2020-1-27,-62,,,Actual,,,5148714
      Mississippi,28,2020-1-27,-60,,,Actual,,,2976149
      Colorado,8,2020-1-27,-56,,,Actual,,,5758736
      Alabama,1,2020-1-27,-62,,,Actual,,,4903185
      Minnesota,27,2020-1-27,-78,,,Actual,,,5639632
      Washington,53,2020-1-27,-50,,,Actual,,,7614893
      Missouri,29,2020-1-27,-78,,,Actual,,,6137428
      Tennessee,47,2020-1-27,-77,,,Actual,,,6829174
      Rhode Island,44,2020-1-27,-81,,,Actual,,,1059361
      Wisconsin,55,2020-1-27,-60,,,Actual,,,5822434
      Nevada,32,2020-1-27,-77,,,Actual,,,3080156
      Iowa,19,2020-1-27,-68,,,Actual,,,3155070
      Oklahoma,40,2020-1-27,-74,,,Actual,,,3956971
      Kentucky,21,2020-1-27,-64,,,Actual,,,4467673
      New York,36,2020-1-28,-61,,,Actual,,,26161672
      New Jersey,34,2020-1-28,-65,,,Actual,,,8882190
      California,6,2020-1-28,-64,,,Actual,,,39512223
      Texas,48,2020-1-28,-55,,,Actual,,,28995881
      Massachusetts,25,2020-1-28,-70,,,Actual,,,6892503
      Florida,12,2020-1-28,-56,,,Actual,,,21477737
      Illinois,17,2020-1-28,-70,,,Actual,,,12671821
      Pennsylvania,42,2020-1-28,-70,,,Actual,,,12801989
      Michigan,26,2020-1-28,-68,,,Actual,,,9986857
      Connecticut,9,2020-1-28,-55,,,Actual,,,3565287
      Louisiana,22,2020-1-28,-51,,,Actual,,,4648794
      Georgia,13,2020-1-28,-50,,,Actual,,,10617423
      Arizona,4,2020-1-28,-58,,,Actual,,,7278717
      Ohio,39,2020-1-28,-72,,,Actual,,,11689100
      Maryland,24,2020-1-28,-76,,,Actual,,,6045680
      Indiana,18,2020-1-28,-71,,,Actual,,,6732219
      Virginia,51,2020-1-28,-61,,,Actual,,,8535519
      North Carolina,37,2020-1-28,-63,,,Actual,,,10488084
      South Carolina,45,2020-1-28,-61,,,Actual,,,5148714
      Mississippi,28,2020-1-28,-59,,,Actual,,,2976149
      Colorado,8,2020-1-28,-55,,,Actual,,,5758736
      Alabama,1,2020-1-28,-61,,,Actual,,,4903185
      Minnesota,27,2020-1-28,-77,,,Actual,,,5639632
      Washington,53,2020-1-28,-49,,,Actual,,,7614893
      Missouri,29,2020-1-28,-77,,,Actual,,,6137428
      Tennessee,47,2020-1-28,-76,,,Actual,,,6829174
      Rhode Island,44,2020-1-28,-80,,,Actual,,,1059361
      Wisconsin,55,2020-1-28,-59,,,Actual,,,5822434
      Nevada,32,2020-1-28,-76,,,Actual,,,3080156
      Iowa,19,2020-1-28,-67,,,Actual,,,3155070
      Oklahoma,40,2020-1-28,-73,,,Actual,,,3956971
      Kentucky,21,2020-1-28,-63,,,Actual,,,4467673
      New York,36,2020-1-29,-60,,,Actual,,,26161672
      New Jersey,34,2020-1-29,-64,,,Actual,,,8882190
      California,6,2020-1-29,-63,,,Actual,,,39512223
      Texas,48,2020-1-29,-54,,,Actual,,,28995881
      Massachusetts,25,2020-1-29,-69,,,Actual,,,6892503
      Florida,12,2020-1-29,-55,,,Actual,,,21477737
      Illinois,17,2020-1-29,-69,,,Actual,,,12671821
      Pennsylvania,42,2020-1-29,-69,,,Actual,,,12801989
      Michigan,26,2020-1-29,-67,,,Actual,,,9986857
      Connecticut,9,2020-1-29,-54,,,Actual,,,3565287
      Louisiana,22,2020-1-29,-50,,,Actual,,,4648794
      Georgia,13,2020-1-29,-49,,,Actual,,,10617423
      Arizona,4,2020-1-29,-57,,,Actual,,,7278717
      Ohio,39,2020-1-29,-71,,,Actual,,,11689100
      Maryland,24,2020-1-29,-75,,,Actual,,,6045680
      Indiana,18,2020-1-29,-70,,,Actual,,,6732219
      Virginia,51,2020-1-29,-60,,,Actual,,,8535519
      North Carolina,37,2020-1-29,-62,,,Actual,,,10488084
      South Carolina,45,2020-1-29,-60,,,Actual,,,5148714
      Mississippi,28,2020-1-29,-58,,,Actual,,,2976149
      Colorado,8,2020-1-29,-54,,,Actual,,,5758736
      Alabama,1,2020-1-29,-60,,,Actual,,,4903185
      Minnesota,27,2020-1-29,-76,,,Actual,,,5639632
      Washington,53,2020-1-29,-48,,,Actual,,,7614893
      Missouri,29,2020-1-29,-76,,,Actual,,,6137428
      Tennessee,47,2020-1-29,-75,,,Actual,,,6829174
      Rhode Island,44,2020-1-29,-79,,,Actual,,,1059361
      Wisconsin,55,2020-1-29,-58,,,Actual,,,5822434
      Nevada,32,2020-1-29,-75,,,Actual,,,3080156
      Iowa,19,2020-1-29,-66,,,Actual,,,3155070
      Oklahoma,40,2020-1-29,-72,,,Actual,,,3956971
      Kentucky,21,2020-1-29,-62,,,Actual,,,4467673
      New York,36,2020-1-30,-59,,,Actual,,,26161672
      New Jersey,34,2020-1-30,-63,,,Actual,,,8882190
      California,6,2020-1-30,-62,,,Actual,,,39512223
      Texas,48,2020-1-30,-53,,,Actual,,,28995881
      Massachusetts,25,2020-1-30,-68,,,Actual,,,6892503
      Florida,12,2020-1-30,-54,,,Actual,,,21477737
      Illinois,17,2020-1-30,-68,,,Actual,,,12671821
      Pennsylvania,42,2020-1-30,-68,,,Actual,,,12801989
      Michigan,26,2020-1-30,-66,,,Actual,,,9986857
      Connecticut,9,2020-1-30,-53,,,Actual,,,3565287
      Louisiana,22,2020-1-30,-49,,,Actual,,,4648794
      Georgia,13,2020-1-30,-48,,,Actual,,,10617423
      Arizona,4,2020-1-30,-56,,,Actual,,,7278717
      Ohio,39,2020-1-30,-70,,,Actual,,,11689100
      Maryland,24,2020-1-30,-74,,,Actual,,,6045680
      Indiana,18,2020-1-30,-69,,,Actual,,,6732219
      Virginia,51,2020-1-30,-59,,,Actual,,,8535519
      North Carolina,37,2020-1-30,-61,,,Actual,,,10488084
      South Carolina,45,2020-1-30,-59,,,Actual,,,5148714
      Mississippi,28,2020-1-30,-57,,,Actual,,,2976149
      Colorado,8,2020-1-30,-53,,,Actual,,,5758736
      Alabama,1,2020-1-30,-59,,,Actual,,,4903185
      Minnesota,27,2020-1-30,-75,,,Actual,,,5639632
      Washington,53,2020-1-30,-47,,,Actual,,,7614893
      Missouri,29,2020-1-30,-75,,,Actual,,,6137428
      Tennessee,47,2020-1-30,-74,,,Actual,,,6829174
      Rhode Island,44,2020-1-30,-78,,,Actual,,,1059361
      Wisconsin,55,2020-1-30,-57,,,Actual,,,5822434
      Nevada,32,2020-1-30,-74,,,Actual,,,3080156
      Iowa,19,2020-1-30,-65,,,Actual,,,3155070
      Oklahoma,40,2020-1-30,-71,,,Actual,,,3956971
      Kentucky,21,2020-1-30,-61,,,Actual,,,4467673
      New York,36,2020-1-31,-58,,,Actual,,,26161672
      New Jersey,34,2020-1-31,-62,,,Actual,,,8882190
      California,6,2020-1-31,-61,,,Actual,,,39512223
      Texas,48,2020-1-31,-52,,,Actual,,,28995881
      Massachusetts,25,2020-1-31,-67,,,Actual,,,6892503
      Florida,12,2020-1-31,-53,,,Actual,,,21477737
      Illinois,17,2020-1-31,-67,,,Actual,,,12671821
      Pennsylvania,42,2020-1-31,-67,,,Actual,,,12801989
      Michigan,26,2020-1-31,-65,,,Actual,,,9986857
      Connecticut,9,2020-1-31,-52,,,Actual,,,3565287
      Louisiana,22,2020-1-31,-48,,,Actual,,,4648794
      Georgia,13,2020-1-31,-47,,,Actual,,,10617423
      Arizona,4,2020-1-31,-55,,,Actual,,,7278717
      Ohio,39,2020-1-31,-69,,,Actual,,,11689100
      Maryland,24,2020-1-31,-73,,,Actual,,,6045680
      Indiana,18,2020-1-31,-68,,,Actual,,,6732219
      Virginia,51,2020-1-31,-58,,,Actual,,,8535519
      North Carolina,37,2020-1-31,-60,,,Actual,,,10488084
      South Carolina,45,2020-1-31,-58,,,Actual,,,5148714
      Mississippi,28,2020-1-31,-56,,,Actual,,,2976149
      Colorado,8,2020-1-31,-52,,,Actual,,,5758736
      Alabama,1,2020-1-31,-58,,,Actual,,,4903185
      Minnesota,27,2020-1-31,-74,,,Actual,,,5639632
      Washington,53,2020-1-31,-46,,,Actual,,,7614893
      Missouri,29,2020-1-31,-74,,,Actual,,,6137428
      Tennessee,47,2020-1-31,-73,,,Actual,,,6829174
      Rhode Island,44,2020-1-31,-77,,,Actual,,,1059361
      Wisconsin,55,2020-1-31,-56,,,Actual,,,5822434
      Nevada,32,2020-1-31,-73,,,Actual,,,3080156
      Iowa,19,2020-1-31,-64,,,Actual,,,3155070
      Oklahoma,40,2020-1-31,-70,,,Actual,,,3956971
      Kentucky,21,2020-1-31,-60,,,Actual,,,4467673
      New York,36,2020-2-1,-57,,,Actual,,,26161672
      New Jersey,34,2020-2-1,-61,,,Actual,,,8882190
      California,6,2020-2-1,-60,,,Actual,,,39512223
      Texas,48,2020-2-1,-51,,,Actual,,,28995881
      Massachusetts,25,2020-2-1,-66,,,Actual,,,6892503
      Florida,12,2020-2-1,-52,,,Actual,,,21477737
      Illinois,17,2020-2-1,-66,,,Actual,,,12671821
      Pennsylvania,42,2020-2-1,-66,,,Actual,,,12801989
      Michigan,26,2020-2-1,-64,,,Actual,,,9986857
      Connecticut,9,2020-2-1,-51,,,Actual,,,3565287
      Louisiana,22,2020-2-1,-47,,,Actual,,,4648794
      Georgia,13,2020-2-1,-46,,,Actual,,,10617423
      Arizona,4,2020-2-1,-54,,,Actual,,,7278717
      Ohio,39,2020-2-1,-68,,,Actual,,,11689100
      Maryland,24,2020-2-1,-72,,,Actual,,,6045680
      Indiana,18,2020-2-1,-67,,,Actual,,,6732219
      Virginia,51,2020-2-1,-57,,,Actual,,,8535519
      North Carolina,37,2020-2-1,-59,,,Actual,,,10488084
      South Carolina,45,2020-2-1,-57,,,Actual,,,5148714
      Mississippi,28,2020-2-1,-55,,,Actual,,,2976149
      Colorado,8,2020-2-1,-51,,,Actual,,,5758736
      Alabama,1,2020-2-1,-57,,,Actual,,,4903185
      Minnesota,27,2020-2-1,-73,,,Actual,,,5639632
      Washington,53,2020-2-1,-45,,,Actual,,,7614893
      Missouri,29,2020-2-1,-73,,,Actual,,,6137428
      Tennessee,47,2020-2-1,-72,,,Actual,,,6829174
      Rhode Island,44,2020-2-1,-76,,,Actual,,,1059361
      Wisconsin,55,2020-2-1,-55,,,Actual,,,5822434
      Nevada,32,2020-2-1,-72,,,Actual,,,3080156
      Iowa,19,2020-2-1,-63,,,Actual,,,3155070
      Oklahoma,40,2020-2-1,-69,,,Actual,,,3956971
      Kentucky,21,2020-2-1,-59,,,Actual,,,4467673
      New York,36,2020-2-2,-56,,,Actual,,,26161672
      New Jersey,34,2020-2-2,-60,,,Actual,,,8882190
      California,6,2020-2-2,-59,,,Actual,,,39512223
      Texas,48,2020-2-2,-50,,,Actual,,,28995881
      Massachusetts,25,2020-2-2,-65,,,Actual,,,6892503
      Florida,12,2020-2-2,-51,,,Actual,,,21477737
      Illinois,17,2020-2-2,-65,,,Actual,,,12671821
      Pennsylvania,42,2020-2-2,-65,,,Actual,,,12801989
      Michigan,26,2020-2-2,-63,,,Actual,,,9986857
      Connecticut,9,2020-2-2,-50,,,Actual,,,3565287
      Louisiana,22,2020-2-2,-46,,,Actual,,,4648794
      Georgia,13,2020-2-2,-45,,,Actual,,,10617423
      Arizona,4,2020-2-2,-53,,,Actual,,,7278717
      Ohio,39,2020-2-2,-67,,,Actual,,,11689100
      Maryland,24,2020-2-2,-71,,,Actual,,,6045680
      Indiana,18,2020-2-2,-66,,,Actual,,,6732219
      Virginia,51,2020-2-2,-56,,,Actual,,,8535519
      North Carolina,37,2020-2-2,-58,,,Actual,,,10488084
      South Carolina,45,2020-2-2,-56,,,Actual,,,5148714
      Mississippi,28,2020-2-2,-54,,,Actual,,,2976149
      Colorado,8,2020-2-2,-50,,,Actual,,,5758736
      Alabama,1,2020-2-2,-56,,,Actual,,,4903185
      Minnesota,27,2020-2-2,-72,,,Actual,,,5639632
      Washington,53,2020-2-2,-44,,,Actual,,,7614893
      Missouri,29,2020-2-2,-72,,,Actual,,,6137428
      Tennessee,47,2020-2-2,-71,,,Actual,,,6829174
      Rhode Island,44,2020-2-2,-75,,,Actual,,,1059361
      Wisconsin,55,2020-2-2,-54,,,Actual,,,5822434
      Nevada,32,2020-2-2,-71,,,Actual,,,3080156
      Iowa,19,2020-2-2,-62,,,Actual,,,3155070
      Oklahoma,40,2020-2-2,-68,,,Actual,,,3956971
      Kentucky,21,2020-2-2,-58,,,Actual,,,4467673
      New York,36,2020-2-3,-55,,,Actual,,,26161672
      New Jersey,34,2020-2-3,-59,,,Actual,,,8882190
      California,6,2020-2-3,-58,,,Actual,,,39512223
      Texas,48,2020-2-3,-49,,,Actual,,,28995881
      Massachusetts,25,2020-2-3,-64,,,Actual,,,6892503
      Florida,12,2020-2-3,-50,,,Actual,,,21477737
      Illinois,17,2020-2-3,-64,,,Actual,,,12671821
      Pennsylvania,42,2020-2-3,-64,,,Actual,,,12801989
      Michigan,26,2020-2-3,-62,,,Actual,,,9986857
      Connecticut,9,2020-2-3,-49,,,Actual,,,3565287
      Louisiana,22,2020-2-3,-45,,,Actual,,,4648794
      Georgia,13,2020-2-3,-44,,,Actual,,,10617423
      Arizona,4,2020-2-3,-52,,,Actual,,,7278717
      Ohio,39,2020-2-3,-66,,,Actual,,,11689100
      Maryland,24,2020-2-3,-70,,,Actual,,,6045680
      Indiana,18,2020-2-3,-65,,,Actual,,,6732219
      Virginia,51,2020-2-3,-55,,,Actual,,,8535519
      North Carolina,37,2020-2-3,-57,,,Actual,,,10488084
      South Carolina,45,2020-2-3,-55,,,Actual,,,5148714
      Mississippi,28,2020-2-3,-53,,,Actual,,,2976149
      Colorado,8,2020-2-3,-49,,,Actual,,,5758736
      Alabama,1,2020-2-3,-55,,,Actual,,,4903185
      Minnesota,27,2020-2-3,-71,,,Actual,,,5639632
      Washington,53,2020-2-3,-43,,,Actual,,,7614893
      Missouri,29,2020-2-3,-71,,,Actual,,,6137428
      Tennessee,47,2020-2-3,-70,,,Actual,,,6829174
      Rhode Island,44,2020-2-3,-74,,,Actual,,,1059361
      Wisconsin,55,2020-2-3,-53,,,Actual,,,5822434
      Nevada,32,2020-2-3,-70,,,Actual,,,3080156
      Iowa,19,2020-2-3,-61,,,Actual,,,3155070
      Oklahoma,40,2020-2-3,-67,,,Actual,,,3956971
      Kentucky,21,2020-2-3,-57,,,Actual,,,4467673
      New York,36,2020-2-4,-54,,,Actual,,,26161672
      New Jersey,34,2020-2-4,-58,,,Actual,,,8882190
      California,6,2020-2-4,-57,,,Actual,,,39512223
      Texas,48,2020-2-4,-48,,,Actual,,,28995881
      Massachusetts,25,2020-2-4,-63,,,Actual,,,6892503
      Florida,12,2020-2-4,-49,,,Actual,,,21477737
      Illinois,17,2020-2-4,-63,,,Actual,,,12671821
      Pennsylvania,42,2020-2-4,-63,,,Actual,,,12801989
      Michigan,26,2020-2-4,-61,,,Actual,,,9986857
      Connecticut,9,2020-2-4,-48,,,Actual,,,3565287
      Louisiana,22,2020-2-4,-44,,,Actual,,,4648794
      Georgia,13,2020-2-4,-43,,,Actual,,,10617423
      Arizona,4,2020-2-4,-51,,,Actual,,,7278717
      Ohio,39,2020-2-4,-65,,,Actual,,,11689100
      Maryland,24,2020-2-4,-69,,,Actual,,,6045680
      Indiana,18,2020-2-4,-64,,,Actual,,,6732219
      Virginia,51,2020-2-4,-54,,,Actual,,,8535519
      North Carolina,37,2020-2-4,-56,,,Actual,,,10488084
      South Carolina,45,2020-2-4,-54,,,Actual,,,5148714
      Mississippi,28,2020-2-4,-52,,,Actual,,,2976149
      Colorado,8,2020-2-4,-48,,,Actual,,,5758736
      Alabama,1,2020-2-4,-54,,,Actual,,,4903185
      Minnesota,27,2020-2-4,-70,,,Actual,,,5639632
      Washington,53,2020-2-4,-42,,,Actual,,,7614893
      Missouri,29,2020-2-4,-70,,,Actual,,,6137428
      Tennessee,47,2020-2-4,-69,,,Actual,,,6829174
      Rhode Island,44,2020-2-4,-73,,,Actual,,,1059361
      Wisconsin,55,2020-2-4,-52,,,Actual,,,5822434
      Nevada,32,2020-2-4,-69,,,Actual,,,3080156
      Iowa,19,2020-2-4,-60,,,Actual,,,3155070
      Oklahoma,40,2020-2-4,-66,,,Actual,,,3956971
      Kentucky,21,2020-2-4,-56,,,Actual,,,4467673
      New York,36,2020-2-5,-53,,,Actual,,,26161672
      New Jersey,34,2020-2-5,-57,,,Actual,,,8882190
      California,6,2020-2-5,-56,,,Actual,,,39512223
      Texas,48,2020-2-5,-47,,,Actual,,,28995881
      Massachusetts,25,2020-2-5,-62,,,Actual,,,6892503
      Florida,12,2020-2-5,-48,,,Actual,,,21477737
      Illinois,17,2020-2-5,-62,,,Actual,,,12671821
      Pennsylvania,42,2020-2-5,-62,,,Actual,,,12801989
      Michigan,26,2020-2-5,-60,,,Actual,,,9986857
      Connecticut,9,2020-2-5,-47,,,Actual,,,3565287
      Louisiana,22,2020-2-5,-43,,,Actual,,,4648794
      Georgia,13,2020-2-5,-42,,,Actual,,,10617423
      Arizona,4,2020-2-5,-50,,,Actual,,,7278717
      Ohio,39,2020-2-5,-64,,,Actual,,,11689100
      Maryland,24,2020-2-5,-68,,,Actual,,,6045680
      Indiana,18,2020-2-5,-63,,,Actual,,,6732219
      Virginia,51,2020-2-5,-53,,,Actual,,,8535519
      North Carolina,37,2020-2-5,-55,,,Actual,,,10488084
      South Carolina,45,2020-2-5,-53,,,Actual,,,5148714
      Mississippi,28,2020-2-5,-51,,,Actual,,,2976149
      Colorado,8,2020-2-5,-47,,,Actual,,,5758736
      Alabama,1,2020-2-5,-53,,,Actual,,,4903185
      Minnesota,27,2020-2-5,-69,,,Actual,,,5639632
      Washington,53,2020-2-5,-41,,,Actual,,,7614893
      Missouri,29,2020-2-5,-69,,,Actual,,,6137428
      Tennessee,47,2020-2-5,-68,,,Actual,,,6829174
      Rhode Island,44,2020-2-5,-72,,,Actual,,,1059361
      Wisconsin,55,2020-2-5,-51,,,Actual,,,5822434
      Nevada,32,2020-2-5,-68,,,Actual,,,3080156
      Iowa,19,2020-2-5,-59,,,Actual,,,3155070
      Oklahoma,40,2020-2-5,-65,,,Actual,,,3956971
      Kentucky,21,2020-2-5,-55,,,Actual,,,4467673
      New York,36,2020-2-6,-52,,,Actual,,,26161672
      New Jersey,34,2020-2-6,-56,,,Actual,,,8882190
      California,6,2020-2-6,-55,,,Actual,,,39512223
      Texas,48,2020-2-6,-46,,,Actual,,,28995881
      Massachusetts,25,2020-2-6,-61,,,Actual,,,6892503
      Florida,12,2020-2-6,-47,,,Actual,,,21477737
      Illinois,17,2020-2-6,-61,,,Actual,,,12671821
      Pennsylvania,42,2020-2-6,-61,,,Actual,,,12801989
      Michigan,26,2020-2-6,-59,,,Actual,,,9986857
      Connecticut,9,2020-2-6,-46,,,Actual,,,3565287
      Louisiana,22,2020-2-6,-42,,,Actual,,,4648794
      Georgia,13,2020-2-6,-41,,,Actual,,,10617423
      Arizona,4,2020-2-6,-49,,,Actual,,,7278717
      Ohio,39,2020-2-6,-63,,,Actual,,,11689100
      Maryland,24,2020-2-6,-67,,,Actual,,,6045680
      Indiana,18,2020-2-6,-62,,,Actual,,,6732219
      Virginia,51,2020-2-6,-52,,,Actual,,,8535519
      North Carolina,37,2020-2-6,-54,,,Actual,,,10488084
      South Carolina,45,2020-2-6,-52,,,Actual,,,5148714
      Mississippi,28,2020-2-6,-50,,,Actual,,,2976149
      Colorado,8,2020-2-6,-46,,,Actual,,,5758736
      Alabama,1,2020-2-6,-52,,,Actual,,,4903185
      Minnesota,27,2020-2-6,-68,,,Actual,,,5639632
      Washington,53,2020-2-6,-40,,,Actual,,,7614893
      Missouri,29,2020-2-6,-68,,,Actual,,,6137428
      Tennessee,47,2020-2-6,-67,,,Actual,,,6829174
      Rhode Island,44,2020-2-6,-71,,,Actual,,,1059361
      Wisconsin,55,2020-2-6,-50,,,Actual,,,5822434
      Nevada,32,2020-2-6,-67,,,Actual,,,3080156
      Iowa,19,2020-2-6,-58,,,Actual,,,3155070
      Oklahoma,40,2020-2-6,-64,,,Actual,,,3956971
      Kentucky,21,2020-2-6,-54,,,Actual,,,4467673
      New York,36,2020-2-7,-51,,,Actual,,,26161672
      New Jersey,34,2020-2-7,-55,,,Actual,,,8882190
      California,6,2020-2-7,-54,,,Actual,,,39512223
      Texas,48,2020-2-7,-45,,,Actual,,,28995881
      Massachusetts,25,2020-2-7,-60,,,Actual,,,6892503
      Florida,12,2020-2-7,-46,,,Actual,,,21477737
      Illinois,17,2020-2-7,-60,,,Actual,,,12671821
      Pennsylvania,42,2020-2-7,-60,,,Actual,,,12801989
      Michigan,26,2020-2-7,-58,,,Actual,,,9986857
      Connecticut,9,2020-2-7,-45,,,Actual,,,3565287
      Louisiana,22,2020-2-7,-41,,,Actual,,,4648794
      Georgia,13,2020-2-7,-40,,,Actual,,,10617423
      Arizona,4,2020-2-7,-48,,,Actual,,,7278717
      Ohio,39,2020-2-7,-62,,,Actual,,,11689100
      Maryland,24,2020-2-7,-66,,,Actual,,,6045680
      Indiana,18,2020-2-7,-61,,,Actual,,,6732219
      Virginia,51,2020-2-7,-51,,,Actual,,,8535519
      North Carolina,37,2020-2-7,-53,,,Actual,,,10488084
      South Carolina,45,2020-2-7,-51,,,Actual,,,5148714
      Mississippi,28,2020-2-7,-49,,,Actual,,,2976149
      Colorado,8,2020-2-7,-45,,,Actual,,,5758736
      Alabama,1,2020-2-7,-51,,,Actual,,,4903185
      Minnesota,27,2020-2-7,-67,,,Actual,,,5639632
      Washington,53,2020-2-7,-39,,,Actual,,,7614893
      Missouri,29,2020-2-7,-67,,,Actual,,,6137428
      Tennessee,47,2020-2-7,-66,,,Actual,,,6829174
      Rhode Island,44,2020-2-7,-70,,,Actual,,,1059361
      Wisconsin,55,2020-2-7,-49,,,Actual,,,5822434
      Nevada,32,2020-2-7,-66,,,Actual,,,3080156
      Iowa,19,2020-2-7,-57,,,Actual,,,3155070
      Oklahoma,40,2020-2-7,-63,,,Actual,,,3956971
      Kentucky,21,2020-2-7,-53,,,Actual,,,4467673
      New York,36,2020-2-8,-50,,,Actual,,,26161672
      New Jersey,34,2020-2-8,-54,,,Actual,,,8882190
      California,6,2020-2-8,-53,,,Actual,,,39512223
      Texas,48,2020-2-8,-44,,,Actual,,,28995881
      Massachusetts,25,2020-2-8,-59,,,Actual,,,6892503
      Florida,12,2020-2-8,-45,,,Actual,,,21477737
      Illinois,17,2020-2-8,-59,,,Actual,,,12671821
      Pennsylvania,42,2020-2-8,-59,,,Actual,,,12801989
      Michigan,26,2020-2-8,-57,,,Actual,,,9986857
      Connecticut,9,2020-2-8,-44,,,Actual,,,3565287
      Louisiana,22,2020-2-8,-40,,,Actual,,,4648794
      Georgia,13,2020-2-8,-39,,,Actual,,,10617423
      Arizona,4,2020-2-8,-47,,,Actual,,,7278717
      Ohio,39,2020-2-8,-61,,,Actual,,,11689100
      Maryland,24,2020-2-8,-65,,,Actual,,,6045680
      Indiana,18,2020-2-8,-60,,,Actual,,,6732219
      Virginia,51,2020-2-8,-50,,,Actual,,,8535519
      North Carolina,37,2020-2-8,-52,,,Actual,,,10488084
      South Carolina,45,2020-2-8,-50,,,Actual,,,5148714
      Mississippi,28,2020-2-8,-48,,,Actual,,,2976149
      Colorado,8,2020-2-8,-44,,,Actual,,,5758736
      Alabama,1,2020-2-8,-50,,,Actual,,,4903185
      Minnesota,27,2020-2-8,-66,,,Actual,,,5639632
      Washington,53,2020-2-8,-38,,,Actual,,,7614893
      Missouri,29,2020-2-8,-66,,,Actual,,,6137428
      Tennessee,47,2020-2-8,-65,,,Actual,,,6829174
      Rhode Island,44,2020-2-8,-69,,,Actual,,,1059361
      Wisconsin,55,2020-2-8,-48,,,Actual,,,5822434
      Nevada,32,2020-2-8,-65,,,Actual,,,3080156
      Iowa,19,2020-2-8,-56,,,Actual,,,3155070
      Oklahoma,40,2020-2-8,-62,,,Actual,,,3956971
      Kentucky,21,2020-2-8,-52,,,Actual,,,4467673
      New York,36,2020-2-9,-49,,,Actual,,,26161672
      New Jersey,34,2020-2-9,-53,,,Actual,,,8882190
      California,6,2020-2-9,-52,,,Actual,,,39512223
      Texas,48,2020-2-9,-43,,,Actual,,,28995881
      Massachusetts,25,2020-2-9,-58,,,Actual,,,6892503
      Florida,12,2020-2-9,-44,,,Actual,,,21477737
      Illinois,17,2020-2-9,-58,,,Actual,,,12671821
      Pennsylvania,42,2020-2-9,-58,,,Actual,,,12801989
      Michigan,26,2020-2-9,-56,,,Actual,,,9986857
      Connecticut,9,2020-2-9,-43,,,Actual,,,3565287
      Louisiana,22,2020-2-9,-39,,,Actual,,,4648794
      Georgia,13,2020-2-9,-38,,,Actual,,,10617423
      Arizona,4,2020-2-9,-46,,,Actual,,,7278717
      Ohio,39,2020-2-9,-60,,,Actual,,,11689100
      Maryland,24,2020-2-9,-64,,,Actual,,,6045680
      Indiana,18,2020-2-9,-59,,,Actual,,,6732219
      Virginia,51,2020-2-9,-49,,,Actual,,,8535519
      North Carolina,37,2020-2-9,-51,,,Actual,,,10488084
      South Carolina,45,2020-2-9,-49,,,Actual,,,5148714
      Mississippi,28,2020-2-9,-47,,,Actual,,,2976149
      Colorado,8,2020-2-9,-43,,,Actual,,,5758736
      Alabama,1,2020-2-9,-49,,,Actual,,,4903185
      Minnesota,27,2020-2-9,-65,,,Actual,,,5639632
      Washington,53,2020-2-9,-37,,,Actual,,,7614893
      Missouri,29,2020-2-9,-65,,,Actual,,,6137428
      Tennessee,47,2020-2-9,-64,,,Actual,,,6829174
      Rhode Island,44,2020-2-9,-68,,,Actual,,,1059361
      Wisconsin,55,2020-2-9,-47,,,Actual,,,5822434
      Nevada,32,2020-2-9,-64,,,Actual,,,3080156
      Iowa,19,2020-2-9,-55,,,Actual,,,3155070
      Oklahoma,40,2020-2-9,-61,,,Actual,,,3956971
      Kentucky,21,2020-2-9,-51,,,Actual,,,4467673
      New York,36,2020-2-10,-48,,,Actual,,,26161672
      New Jersey,34,2020-2-10,-52,,,Actual,,,8882190
      California,6,2020-2-10,-51,,,Actual,,,39512223
      Texas,48,2020-2-10,-42,,,Actual,,,28995881
      Massachusetts,25,2020-2-10,-57,,,Actual,,,6892503
      Florida,12,2020-2-10,-43,,,Actual,,,21477737
      Illinois,17,2020-2-10,-57,,,Actual,,,12671821
      Pennsylvania,42,2020-2-10,-57,,,Actual,,,12801989
      Michigan,26,2020-2-10,-55,,,Actual,,,9986857
      Connecticut,9,2020-2-10,-42,,,Actual,,,3565287
      Louisiana,22,2020-2-10,-38,,,Actual,,,4648794
      Georgia,13,2020-2-10,-37,,,Actual,,,10617423
      Arizona,4,2020-2-10,-45,,,Actual,,,7278717
      Ohio,39,2020-2-10,-59,,,Actual,,,11689100
      Maryland,24,2020-2-10,-63,,,Actual,,,6045680
      Indiana,18,2020-2-10,-58,,,Actual,,,6732219
      Virginia,51,2020-2-10,-48,,,Actual,,,8535519
      North Carolina,37,2020-2-10,-50,,,Actual,,,10488084
      South Carolina,45,2020-2-10,-48,,,Actual,,,5148714
      Mississippi,28,2020-2-10,-46,,,Actual,,,2976149
      Colorado,8,2020-2-10,-42,,,Actual,,,5758736
      Alabama,1,2020-2-10,-48,,,Actual,,,4903185
      Minnesota,27,2020-2-10,-64,,,Actual,,,5639632
      Washington,53,2020-2-10,-36,,,Actual,,,7614893
      Missouri,29,2020-2-10,-64,,,Actual,,,6137428
      Tennessee,47,2020-2-10,-63,,,Actual,,,6829174
      Rhode Island,44,2020-2-10,-67,,,Actual,,,1059361
      Wisconsin,55,2020-2-10,-46,,,Actual,,,5822434
      Nevada,32,2020-2-10,-63,,,Actual,,,3080156
      Iowa,19,2020-2-10,-54,,,Actual,,,3155070
      Oklahoma,40,2020-2-10,-60,,,Actual,,,3956971
      Kentucky,21,2020-2-10,-50,,,Actual,,,4467673
      New York,36,2020-2-11,-47,,,Actual,,,26161672
      New Jersey,34,2020-2-11,-51,,,Actual,,,8882190
      California,6,2020-2-11,-50,,,Actual,,,39512223
      Texas,48,2020-2-11,-41,,,Actual,,,28995881
      Massachusetts,25,2020-2-11,-56,,,Actual,,,6892503
      Florida,12,2020-2-11,-42,,,Actual,,,21477737
      Illinois,17,2020-2-11,-56,,,Actual,,,12671821
      Pennsylvania,42,2020-2-11,-56,,,Actual,,,12801989
      Michigan,26,2020-2-11,-54,,,Actual,,,9986857
      Connecticut,9,2020-2-11,-41,,,Actual,,,3565287
      Louisiana,22,2020-2-11,-37,,,Actual,,,4648794
      Georgia,13,2020-2-11,-36,,,Actual,,,10617423
      Arizona,4,2020-2-11,-44,,,Actual,,,7278717
      Ohio,39,2020-2-11,-58,,,Actual,,,11689100
      Maryland,24,2020-2-11,-62,,,Actual,,,6045680
      Indiana,18,2020-2-11,-57,,,Actual,,,6732219
      Virginia,51,2020-2-11,-47,,,Actual,,,8535519
      North Carolina,37,2020-2-11,-49,,,Actual,,,10488084
      South Carolina,45,2020-2-11,-47,,,Actual,,,5148714
      Mississippi,28,2020-2-11,-45,,,Actual,,,2976149
      Colorado,8,2020-2-11,-41,,,Actual,,,5758736
      Alabama,1,2020-2-11,-47,,,Actual,,,4903185
      Minnesota,27,2020-2-11,-63,,,Actual,,,5639632
      Washington,53,2020-2-11,-35,,,Actual,,,7614893
      Missouri,29,2020-2-11,-63,,,Actual,,,6137428
      Tennessee,47,2020-2-11,-62,,,Actual,,,6829174
      Rhode Island,44,2020-2-11,-66,,,Actual,,,1059361
      Wisconsin,55,2020-2-11,-45,,,Actual,,,5822434
      Nevada,32,2020-2-11,-62,,,Actual,,,3080156
      Iowa,19,2020-2-11,-53,,,Actual,,,3155070
      Oklahoma,40,2020-2-11,-59,,,Actual,,,3956971
      Kentucky,21,2020-2-11,-49,,,Actual,,,4467673
      New York,36,2020-2-12,-46,,,Actual,,,26161672
      New Jersey,34,2020-2-12,-50,,,Actual,,,8882190
      California,6,2020-2-12,-49,,,Actual,,,39512223
      Texas,48,2020-2-12,-40,,,Actual,,,28995881
      Massachusetts,25,2020-2-12,-55,,,Actual,,,6892503
      Florida,12,2020-2-12,-41,,,Actual,,,21477737
      Illinois,17,2020-2-12,-55,,,Actual,,,12671821
      Pennsylvania,42,2020-2-12,-55,,,Actual,,,12801989
      Michigan,26,2020-2-12,-53,,,Actual,,,9986857
      Connecticut,9,2020-2-12,-40,,,Actual,,,3565287
      Louisiana,22,2020-2-12,-36,,,Actual,,,4648794
      Georgia,13,2020-2-12,-35,,,Actual,,,10617423
      Arizona,4,2020-2-12,-43,,,Actual,,,7278717
      Ohio,39,2020-2-12,-57,,,Actual,,,11689100
      Maryland,24,2020-2-12,-61,,,Actual,,,6045680
      Indiana,18,2020-2-12,-56,,,Actual,,,6732219
      Virginia,51,2020-2-12,-46,,,Actual,,,8535519
      North Carolina,37,2020-2-12,-48,,,Actual,,,10488084
      South Carolina,45,2020-2-12,-46,,,Actual,,,5148714
      Mississippi,28,2020-2-12,-44,,,Actual,,,2976149
      Colorado,8,2020-2-12,-40,,,Actual,,,5758736
      Alabama,1,2020-2-12,-46,,,Actual,,,4903185
      Minnesota,27,2020-2-12,-62,,,Actual,,,5639632
      Washington,53,2020-2-12,-34,,,Actual,,,7614893
      Missouri,29,2020-2-12,-62,,,Actual,,,6137428
      Tennessee,47,2020-2-12,-61,,,Actual,,,6829174
      Rhode Island,44,2020-2-12,-65,,,Actual,,,1059361
      Wisconsin,55,2020-2-12,-44,,,Actual,,,5822434
      Nevada,32,2020-2-12,-61,,,Actual,,,3080156
      Iowa,19,2020-2-12,-52,,,Actual,,,3155070
      Oklahoma,40,2020-2-12,-58,,,Actual,,,3956971
      Kentucky,21,2020-2-12,-48,,,Actual,,,4467673
      New York,36,2020-2-13,-45,,,Actual,,,26161672
      New Jersey,34,2020-2-13,-49,,,Actual,,,8882190
      California,6,2020-2-13,-48,,,Actual,,,39512223
      Texas,48,2020-2-13,-39,,,Actual,,,28995881
      Massachusetts,25,2020-2-13,-54,,,Actual,,,6892503
      Florida,12,2020-2-13,-40,,,Actual,,,21477737
      Illinois,17,2020-2-13,-54,,,Actual,,,12671821
      Pennsylvania,42,2020-2-13,-54,,,Actual,,,12801989
      Michigan,26,2020-2-13,-52,,,Actual,,,9986857
      Connecticut,9,2020-2-13,-39,,,Actual,,,3565287
      Louisiana,22,2020-2-13,-35,,,Actual,,,4648794
      Georgia,13,2020-2-13,-34,,,Actual,,,10617423
      Arizona,4,2020-2-13,-42,,,Actual,,,7278717
      Ohio,39,2020-2-13,-56,,,Actual,,,11689100
      Maryland,24,2020-2-13,-60,,,Actual,,,6045680
      Indiana,18,2020-2-13,-55,,,Actual,,,6732219
      Virginia,51,2020-2-13,-45,,,Actual,,,8535519
      North Carolina,37,2020-2-13,-47,,,Actual,,,10488084
      South Carolina,45,2020-2-13,-45,,,Actual,,,5148714
      Mississippi,28,2020-2-13,-43,,,Actual,,,2976149
      Colorado,8,2020-2-13,-39,,,Actual,,,5758736
      Alabama,1,2020-2-13,-45,,,Actual,,,4903185
      Minnesota,27,2020-2-13,-61,,,Actual,,,5639632
      Washington,53,2020-2-13,-33,,,Actual,,,7614893
      Missouri,29,2020-2-13,-61,,,Actual,,,6137428
      Tennessee,47,2020-2-13,-60,,,Actual,,,6829174
      Rhode Island,44,2020-2-13,-64,,,Actual,,,1059361
      Wisconsin,55,2020-2-13,-43,,,Actual,,,5822434
      Nevada,32,2020-2-13,-60,,,Actual,,,3080156
      Iowa,19,2020-2-13,-51,,,Actual,,,3155070
      Oklahoma,40,2020-2-13,-57,,,Actual,,,3956971
      Kentucky,21,2020-2-13,-47,,,Actual,,,4467673
      New York,36,2020-2-14,-44,,,Actual,,,26161672
      New Jersey,34,2020-2-14,-48,,,Actual,,,8882190
      California,6,2020-2-14,-47,,,Actual,,,39512223
      Texas,48,2020-2-14,-38,,,Actual,,,28995881
      Massachusetts,25,2020-2-14,-53,,,Actual,,,6892503
      Florida,12,2020-2-14,-39,,,Actual,,,21477737
      Illinois,17,2020-2-14,-53,,,Actual,,,12671821
      Pennsylvania,42,2020-2-14,-53,,,Actual,,,12801989
      Michigan,26,2020-2-14,-51,,,Actual,,,9986857
      Connecticut,9,2020-2-14,-38,,,Actual,,,3565287
      Louisiana,22,2020-2-14,-34,,,Actual,,,4648794
      Georgia,13,2020-2-14,-33,,,Actual,,,10617423
      Arizona,4,2020-2-14,-41,,,Actual,,,7278717
      Ohio,39,2020-2-14,-55,,,Actual,,,11689100
      Maryland,24,2020-2-14,-59,,,Actual,,,6045680
      Indiana,18,2020-2-14,-54,,,Actual,,,6732219
      Virginia,51,2020-2-14,-44,,,Actual,,,8535519
      North Carolina,37,2020-2-14,-46,,,Actual,,,10488084
      South Carolina,45,2020-2-14,-44,,,Actual,,,5148714
      Mississippi,28,2020-2-14,-42,,,Actual,,,2976149
      Colorado,8,2020-2-14,-38,,,Actual,,,5758736
      Alabama,1,2020-2-14,-44,,,Actual,,,4903185
      Minnesota,27,2020-2-14,-60,,,Actual,,,5639632
      Washington,53,2020-2-14,-32,,,Actual,,,7614893
      Missouri,29,2020-2-14,-60,,,Actual,,,6137428
      Tennessee,47,2020-2-14,-59,,,Actual,,,6829174
      Rhode Island,44,2020-2-14,-63,,,Actual,,,1059361
      Wisconsin,55,2020-2-14,-42,,,Actual,,,5822434
      Nevada,32,2020-2-14,-59,,,Actual,,,3080156
      Iowa,19,2020-2-14,-50,,,Actual,,,3155070
      Oklahoma,40,2020-2-14,-56,,,Actual,,,3956971
      Kentucky,21,2020-2-14,-46,,,Actual,,,4467673
      New York,36,2020-2-15,-43,,,Actual,,,26161672
      New Jersey,34,2020-2-15,-47,,,Actual,,,8882190
      California,6,2020-2-15,-46,,,Actual,,,39512223
      Texas,48,2020-2-15,-37,,,Actual,,,28995881
      Massachusetts,25,2020-2-15,-52,,,Actual,,,6892503
      Florida,12,2020-2-15,-38,,,Actual,,,21477737
      Illinois,17,2020-2-15,-52,,,Actual,,,12671821
      Pennsylvania,42,2020-2-15,-52,,,Actual,,,12801989
      Michigan,26,2020-2-15,-50,,,Actual,,,9986857
      Connecticut,9,2020-2-15,-37,,,Actual,,,3565287
      Louisiana,22,2020-2-15,-33,,,Actual,,,4648794
      Georgia,13,2020-2-15,-32,,,Actual,,,10617423
      Arizona,4,2020-2-15,-40,,,Actual,,,7278717
      Ohio,39,2020-2-15,-54,,,Actual,,,11689100
      Maryland,24,2020-2-15,-58,,,Actual,,,6045680
      Indiana,18,2020-2-15,-53,,,Actual,,,6732219
      Virginia,51,2020-2-15,-43,,,Actual,,,8535519
      North Carolina,37,2020-2-15,-45,,,Actual,,,10488084
      South Carolina,45,2020-2-15,-43,,,Actual,,,5148714
      Mississippi,28,2020-2-15,-41,,,Actual,,,2976149
      Colorado,8,2020-2-15,-37,,,Actual,,,5758736
      Alabama,1,2020-2-15,-43,,,Actual,,,4903185
      Minnesota,27,2020-2-15,-59,,,Actual,,,5639632
      Washington,53,2020-2-15,-31,,,Actual,,,7614893
      Missouri,29,2020-2-15,-59,,,Actual,,,6137428
      Tennessee,47,2020-2-15,-58,,,Actual,,,6829174
      Rhode Island,44,2020-2-15,-62,,,Actual,,,1059361
      Wisconsin,55,2020-2-15,-41,,,Actual,,,5822434
      Nevada,32,2020-2-15,-58,,,Actual,,,3080156
      Iowa,19,2020-2-15,-49,,,Actual,,,3155070
      Oklahoma,40,2020-2-15,-55,,,Actual,,,3956971
      Kentucky,21,2020-2-15,-45,,,Actual,,,4467673
      New York,36,2020-2-16,-42,,,Actual,,,26161672
      New Jersey,34,2020-2-16,-46,,,Actual,,,8882190
      California,6,2020-2-16,-45,,,Actual,,,39512223
      Texas,48,2020-2-16,-36,,,Actual,,,28995881
      Massachusetts,25,2020-2-16,-51,,,Actual,,,6892503
      Florida,12,2020-2-16,-37,,,Actual,,,21477737
      Illinois,17,2020-2-16,-51,,,Actual,,,12671821
      Pennsylvania,42,2020-2-16,-51,,,Actual,,,12801989
      Michigan,26,2020-2-16,-49,,,Actual,,,9986857
      Connecticut,9,2020-2-16,-36,,,Actual,,,3565287
      Louisiana,22,2020-2-16,-32,,,Actual,,,4648794
      Georgia,13,2020-2-16,-31,,,Actual,,,10617423
      Arizona,4,2020-2-16,-39,,,Actual,,,7278717
      Ohio,39,2020-2-16,-53,,,Actual,,,11689100
      Maryland,24,2020-2-16,-57,,,Actual,,,6045680
      Indiana,18,2020-2-16,-52,,,Actual,,,6732219
      Virginia,51,2020-2-16,-42,,,Actual,,,8535519
      North Carolina,37,2020-2-16,-44,,,Actual,,,10488084
      South Carolina,45,2020-2-16,-42,,,Actual,,,5148714
      Mississippi,28,2020-2-16,-40,,,Actual,,,2976149
      Colorado,8,2020-2-16,-36,,,Actual,,,5758736
      Alabama,1,2020-2-16,-42,,,Actual,,,4903185
      Minnesota,27,2020-2-16,-58,,,Actual,,,5639632
      Washington,53,2020-2-16,-30,,,Actual,,,7614893
      Missouri,29,2020-2-16,-58,,,Actual,,,6137428
      Tennessee,47,2020-2-16,-57,,,Actual,,,6829174
      Rhode Island,44,2020-2-16,-61,,,Actual,,,1059361
      Wisconsin,55,2020-2-16,-40,,,Actual,,,5822434
      Nevada,32,2020-2-16,-57,,,Actual,,,3080156
      Iowa,19,2020-2-16,-48,,,Actual,,,3155070
      Oklahoma,40,2020-2-16,-54,,,Actual,,,3956971
      Kentucky,21,2020-2-16,-44,,,Actual,,,4467673
      New York,36,2020-2-17,-41,,,Actual,,,26161672
      New Jersey,34,2020-2-17,-45,,,Actual,,,8882190
      California,6,2020-2-17,-44,,,Actual,,,39512223
      Texas,48,2020-2-17,-35,,,Actual,,,28995881
      Massachusetts,25,2020-2-17,-50,,,Actual,,,6892503
      Florida,12,2020-2-17,-36,,,Actual,,,21477737
      Illinois,17,2020-2-17,-50,,,Actual,,,12671821
      Pennsylvania,42,2020-2-17,-50,,,Actual,,,12801989
      Michigan,26,2020-2-17,-48,,,Actual,,,9986857
      Connecticut,9,2020-2-17,-35,,,Actual,,,3565287
      Louisiana,22,2020-2-17,-31,,,Actual,,,4648794
      Georgia,13,2020-2-17,-30,,,Actual,,,10617423
      Arizona,4,2020-2-17,-38,,,Actual,,,7278717
      Ohio,39,2020-2-17,-52,,,Actual,,,11689100
      Maryland,24,2020-2-17,-56,,,Actual,,,6045680
      Indiana,18,2020-2-17,-51,,,Actual,,,6732219
      Virginia,51,2020-2-17,-41,,,Actual,,,8535519
      North Carolina,37,2020-2-17,-43,,,Actual,,,10488084
      South Carolina,45,2020-2-17,-41,,,Actual,,,5148714
      Mississippi,28,2020-2-17,-39,,,Actual,,,2976149
      Colorado,8,2020-2-17,-35,,,Actual,,,5758736
      Alabama,1,2020-2-17,-41,,,Actual,,,4903185
      Minnesota,27,2020-2-17,-57,,,Actual,,,5639632
      Washington,53,2020-2-17,-29,,,Actual,,,7614893
      Missouri,29,2020-2-17,-57,,,Actual,,,6137428
      Tennessee,47,2020-2-17,-56,,,Actual,,,6829174
      Rhode Island,44,2020-2-17,-60,,,Actual,,,1059361
      Wisconsin,55,2020-2-17,-39,,,Actual,,,5822434
      Nevada,32,2020-2-17,-56,,,Actual,,,3080156
      Iowa,19,2020-2-17,-47,,,Actual,,,3155070
      Oklahoma,40,2020-2-17,-53,,,Actual,,,3956971
      Kentucky,21,2020-2-17,-43,,,Actual,,,4467673
      New York,36,2020-2-18,-40,,,Actual,,,26161672
      New Jersey,34,2020-2-18,-44,,,Actual,,,8882190
      California,6,2020-2-18,-43,,,Actual,,,39512223
      Texas,48,2020-2-18,-34,,,Actual,,,28995881
      Massachusetts,25,2020-2-18,-49,,,Actual,,,6892503
      Florida,12,2020-2-18,-35,,,Actual,,,21477737
      Illinois,17,2020-2-18,-49,,,Actual,,,12671821
      Pennsylvania,42,2020-2-18,-49,,,Actual,,,12801989
      Michigan,26,2020-2-18,-47,,,Actual,,,9986857
      Connecticut,9,2020-2-18,-34,,,Actual,,,3565287
      Louisiana,22,2020-2-18,-30,,,Actual,,,4648794
      Georgia,13,2020-2-18,-29,,,Actual,,,10617423
      Arizona,4,2020-2-18,-37,,,Actual,,,7278717
      Ohio,39,2020-2-18,-51,,,Actual,,,11689100
      Maryland,24,2020-2-18,-55,,,Actual,,,6045680
      Indiana,18,2020-2-18,-50,,,Actual,,,6732219
      Virginia,51,2020-2-18,-40,,,Actual,,,8535519
      North Carolina,37,2020-2-18,-42,,,Actual,,,10488084
      South Carolina,45,2020-2-18,-40,,,Actual,,,5148714
      Mississippi,28,2020-2-18,-38,,,Actual,,,2976149
      Colorado,8,2020-2-18,-34,,,Actual,,,5758736
      Alabama,1,2020-2-18,-40,,,Actual,,,4903185
      Minnesota,27,2020-2-18,-56,,,Actual,,,5639632
      Washington,53,2020-2-18,-28,,,Actual,,,7614893
      Missouri,29,2020-2-18,-56,,,Actual,,,6137428
      Tennessee,47,2020-2-18,-55,,,Actual,,,6829174
      Rhode Island,44,2020-2-18,-59,,,Actual,,,1059361
      Wisconsin,55,2020-2-18,-38,,,Actual,,,5822434
      Nevada,32,2020-2-18,-55,,,Actual,,,3080156
      Iowa,19,2020-2-18,-46,,,Actual,,,3155070
      Oklahoma,40,2020-2-18,-52,,,Actual,,,3956971
      Kentucky,21,2020-2-18,-42,,,Actual,,,4467673
      New York,36,2020-2-19,-39,,,Actual,,,26161672
      New Jersey,34,2020-2-19,-43,,,Actual,,,8882190
      California,6,2020-2-19,-42,,,Actual,,,39512223
      Texas,48,2020-2-19,-33,,,Actual,,,28995881
      Massachusetts,25,2020-2-19,-48,,,Actual,,,6892503
      Florida,12,2020-2-19,-34,,,Actual,,,21477737
      Illinois,17,2020-2-19,-48,,,Actual,,,12671821
      Pennsylvania,42,2020-2-19,-48,,,Actual,,,12801989
      Michigan,26,2020-2-19,-46,,,Actual,,,9986857
      Connecticut,9,2020-2-19,-33,,,Actual,,,3565287
      Louisiana,22,2020-2-19,-29,,,Actual,,,4648794
      Georgia,13,2020-2-19,-28,,,Actual,,,10617423
      Arizona,4,2020-2-19,-36,,,Actual,,,7278717
      Ohio,39,2020-2-19,-50,,,Actual,,,11689100
      Maryland,24,2020-2-19,-54,,,Actual,,,6045680
      Indiana,18,2020-2-19,-49,,,Actual,,,6732219
      Virginia,51,2020-2-19,-39,,,Actual,,,8535519
      North Carolina,37,2020-2-19,-41,,,Actual,,,10488084
      South Carolina,45,2020-2-19,-39,,,Actual,,,5148714
      Mississippi,28,2020-2-19,-37,,,Actual,,,2976149
      Colorado,8,2020-2-19,-33,,,Actual,,,5758736
      Alabama,1,2020-2-19,-39,,,Actual,,,4903185
      Minnesota,27,2020-2-19,-55,,,Actual,,,5639632
      Washington,53,2020-2-19,-27,,,Actual,,,7614893
      Missouri,29,2020-2-19,-55,,,Actual,,,6137428
      Tennessee,47,2020-2-19,-54,,,Actual,,,6829174
      Rhode Island,44,2020-2-19,-58,,,Actual,,,1059361
      Wisconsin,55,2020-2-19,-37,,,Actual,,,5822434
      Nevada,32,2020-2-19,-54,,,Actual,,,3080156
      Iowa,19,2020-2-19,-45,,,Actual,,,3155070
      Oklahoma,40,2020-2-19,-51,,,Actual,,,3956971
      Kentucky,21,2020-2-19,-41,,,Actual,,,4467673
      New York,36,2020-2-20,-38,,,Actual,,,26161672
      New Jersey,34,2020-2-20,-42,,,Actual,,,8882190
      California,6,2020-2-20,-41,,,Actual,,,39512223
      Texas,48,2020-2-20,-32,,,Actual,,,28995881
      Massachusetts,25,2020-2-20,-47,,,Actual,,,6892503
      Florida,12,2020-2-20,-33,,,Actual,,,21477737
      Illinois,17,2020-2-20,-47,,,Actual,,,12671821
      Pennsylvania,42,2020-2-20,-47,,,Actual,,,12801989
      Michigan,26,2020-2-20,-45,,,Actual,,,9986857
      Connecticut,9,2020-2-20,-32,,,Actual,,,3565287
      Louisiana,22,2020-2-20,-28,,,Actual,,,4648794
      Georgia,13,2020-2-20,-27,,,Actual,,,10617423
      Arizona,4,2020-2-20,-35,,,Actual,,,7278717
      Ohio,39,2020-2-20,-49,,,Actual,,,11689100
      Maryland,24,2020-2-20,-53,,,Actual,,,6045680
      Indiana,18,2020-2-20,-48,,,Actual,,,6732219
      Virginia,51,2020-2-20,-38,,,Actual,,,8535519
      North Carolina,37,2020-2-20,-40,,,Actual,,,10488084
      South Carolina,45,2020-2-20,-38,,,Actual,,,5148714
      Mississippi,28,2020-2-20,-36,,,Actual,,,2976149
      Colorado,8,2020-2-20,-32,,,Actual,,,5758736
      Alabama,1,2020-2-20,-38,,,Actual,,,4903185
      Minnesota,27,2020-2-20,-54,,,Actual,,,5639632
      Washington,53,2020-2-20,-26,,,Actual,,,7614893
      Missouri,29,2020-2-20,-54,,,Actual,,,6137428
      Tennessee,47,2020-2-20,-53,,,Actual,,,6829174
      Rhode Island,44,2020-2-20,-57,,,Actual,,,1059361
      Wisconsin,55,2020-2-20,-36,,,Actual,,,5822434
      Nevada,32,2020-2-20,-53,,,Actual,,,3080156
      Iowa,19,2020-2-20,-44,,,Actual,,,3155070
      Oklahoma,40,2020-2-20,-50,,,Actual,,,3956971
      Kentucky,21,2020-2-20,-40,,,Actual,,,4467673
      New York,36,2020-2-21,-37,,,Actual,,,26161672
      New Jersey,34,2020-2-21,-41,,,Actual,,,8882190
      California,6,2020-2-21,-40,,,Actual,,,39512223
      Texas,48,2020-2-21,-31,,,Actual,,,28995881
      Massachusetts,25,2020-2-21,-46,,,Actual,,,6892503
      Florida,12,2020-2-21,-32,,,Actual,,,21477737
      Illinois,17,2020-2-21,-46,,,Actual,,,12671821
      Pennsylvania,42,2020-2-21,-46,,,Actual,,,12801989
      Michigan,26,2020-2-21,-44,,,Actual,,,9986857
      Connecticut,9,2020-2-21,-31,,,Actual,,,3565287
      Louisiana,22,2020-2-21,-27,,,Actual,,,4648794
      Georgia,13,2020-2-21,-26,,,Actual,,,10617423
      Arizona,4,2020-2-21,-34,,,Actual,,,7278717
      Ohio,39,2020-2-21,-48,,,Actual,,,11689100
      Maryland,24,2020-2-21,-52,,,Actual,,,6045680
      Indiana,18,2020-2-21,-47,,,Actual,,,6732219
      Virginia,51,2020-2-21,-37,,,Actual,,,8535519
      North Carolina,37,2020-2-21,-39,,,Actual,,,10488084
      South Carolina,45,2020-2-21,-37,,,Actual,,,5148714
      Mississippi,28,2020-2-21,-35,,,Actual,,,2976149
      Colorado,8,2020-2-21,-31,,,Actual,,,5758736
      Alabama,1,2020-2-21,-37,,,Actual,,,4903185
      Minnesota,27,2020-2-21,-53,,,Actual,,,5639632
      Washington,53,2020-2-21,-25,,,Actual,,,7614893
      Missouri,29,2020-2-21,-53,,,Actual,,,6137428
      Tennessee,47,2020-2-21,-52,,,Actual,,,6829174
      Rhode Island,44,2020-2-21,-56,,,Actual,,,1059361
      Wisconsin,55,2020-2-21,-35,,,Actual,,,5822434
      Nevada,32,2020-2-21,-52,,,Actual,,,3080156
      Iowa,19,2020-2-21,-43,,,Actual,,,3155070
      Oklahoma,40,2020-2-21,-49,,,Actual,,,3956971
      Kentucky,21,2020-2-21,-39,,,Actual,,,4467673
      New York,36,2020-2-22,-36,,,Actual,,,26161672
      New Jersey,34,2020-2-22,-40,,,Actual,,,8882190
      California,6,2020-2-22,-39,,,Actual,,,39512223
      Texas,48,2020-2-22,-30,,,Actual,,,28995881
      Massachusetts,25,2020-2-22,-45,,,Actual,,,6892503
      Florida,12,2020-2-22,-31,,,Actual,,,21477737
      Illinois,17,2020-2-22,-45,,,Actual,,,12671821
      Pennsylvania,42,2020-2-22,-45,,,Actual,,,12801989
      Michigan,26,2020-2-22,-43,,,Actual,,,9986857
      Connecticut,9,2020-2-22,-30,,,Actual,,,3565287
      Louisiana,22,2020-2-22,-26,,,Actual,,,4648794
      Georgia,13,2020-2-22,-25,,,Actual,,,10617423
      Arizona,4,2020-2-22,-33,,,Actual,,,7278717
      Ohio,39,2020-2-22,-47,,,Actual,,,11689100
      Maryland,24,2020-2-22,-51,,,Actual,,,6045680
      Indiana,18,2020-2-22,-46,,,Actual,,,6732219
      Virginia,51,2020-2-22,-36,,,Actual,,,8535519
      North Carolina,37,2020-2-22,-38,,,Actual,,,10488084
      South Carolina,45,2020-2-22,-36,,,Actual,,,5148714
      Mississippi,28,2020-2-22,-34,,,Actual,,,2976149
      Colorado,8,2020-2-22,-30,,,Actual,,,5758736
      Alabama,1,2020-2-22,-36,,,Actual,,,4903185
      Minnesota,27,2020-2-22,-52,,,Actual,,,5639632
      Washington,53,2020-2-22,-24,,,Actual,,,7614893
      Missouri,29,2020-2-22,-52,,,Actual,,,6137428
      Tennessee,47,2020-2-22,-51,,,Actual,,,6829174
      Rhode Island,44,2020-2-22,-55,,,Actual,,,1059361
      Wisconsin,55,2020-2-22,-34,,,Actual,,,5822434
      Nevada,32,2020-2-22,-51,,,Actual,,,3080156
      Iowa,19,2020-2-22,-42,,,Actual,,,3155070
      Oklahoma,40,2020-2-22,-48,,,Actual,,,3956971
      Kentucky,21,2020-2-22,-38,,,Actual,,,4467673
      New York,36,2020-2-23,-35,,,Actual,,,26161672
      New Jersey,34,2020-2-23,-39,,,Actual,,,8882190
      California,6,2020-2-23,-38,,,Actual,,,39512223
      Texas,48,2020-2-23,-29,,,Actual,,,28995881
      Massachusetts,25,2020-2-23,-44,,,Actual,,,6892503
      Florida,12,2020-2-23,-30,,,Actual,,,21477737
      Illinois,17,2020-2-23,-44,,,Actual,,,12671821
      Pennsylvania,42,2020-2-23,-44,,,Actual,,,12801989
      Michigan,26,2020-2-23,-42,,,Actual,,,9986857
      Connecticut,9,2020-2-23,-29,,,Actual,,,3565287
      Louisiana,22,2020-2-23,-25,,,Actual,,,4648794
      Georgia,13,2020-2-23,-24,,,Actual,,,10617423
      Arizona,4,2020-2-23,-32,,,Actual,,,7278717
      Ohio,39,2020-2-23,-46,,,Actual,,,11689100
      Maryland,24,2020-2-23,-50,,,Actual,,,6045680
      Indiana,18,2020-2-23,-45,,,Actual,,,6732219
      Virginia,51,2020-2-23,-35,,,Actual,,,8535519
      North Carolina,37,2020-2-23,-37,,,Actual,,,10488084
      South Carolina,45,2020-2-23,-35,,,Actual,,,5148714
      Mississippi,28,2020-2-23,-33,,,Actual,,,2976149
      Colorado,8,2020-2-23,-29,,,Actual,,,5758736
      Alabama,1,2020-2-23,-35,,,Actual,,,4903185
      Minnesota,27,2020-2-23,-51,,,Actual,,,5639632
      Washington,53,2020-2-23,-23,,,Actual,,,7614893
      Missouri,29,2020-2-23,-51,,,Actual,,,6137428
      Tennessee,47,2020-2-23,-50,,,Actual,,,6829174
      Rhode Island,44,2020-2-23,-54,,,Actual,,,1059361
      Wisconsin,55,2020-2-23,-33,,,Actual,,,5822434
      Nevada,32,2020-2-23,-50,,,Actual,,,3080156
      Iowa,19,2020-2-23,-41,,,Actual,,,3155070
      Oklahoma,40,2020-2-23,-47,,,Actual,,,3956971
      Kentucky,21,2020-2-23,-37,,,Actual,,,4467673
      New York,36,2020-2-24,-34,,,Actual,,,26161672
      New Jersey,34,2020-2-24,-38,,,Actual,,,8882190
      California,6,2020-2-24,-37,,,Actual,,,39512223
      Texas,48,2020-2-24,-28,,,Actual,,,28995881
      Massachusetts,25,2020-2-24,-43,,,Actual,,,6892503
      Florida,12,2020-2-24,-29,,,Actual,,,21477737
      Illinois,17,2020-2-24,-43,,,Actual,,,12671821
      Pennsylvania,42,2020-2-24,-43,,,Actual,,,12801989
      Michigan,26,2020-2-24,-41,,,Actual,,,9986857
      Connecticut,9,2020-2-24,-28,,,Actual,,,3565287
      Louisiana,22,2020-2-24,-24,,,Actual,,,4648794
      Georgia,13,2020-2-24,-23,,,Actual,,,10617423
      Arizona,4,2020-2-24,-31,,,Actual,,,7278717
      Ohio,39,2020-2-24,-45,,,Actual,,,11689100
      Maryland,24,2020-2-24,-49,,,Actual,,,6045680
      Indiana,18,2020-2-24,-44,,,Actual,,,6732219
      Virginia,51,2020-2-24,-34,,,Actual,,,8535519
      North Carolina,37,2020-2-24,-36,,,Actual,,,10488084
      South Carolina,45,2020-2-24,-34,,,Actual,,,5148714
      Mississippi,28,2020-2-24,-32,,,Actual,,,2976149
      Colorado,8,2020-2-24,-28,,,Actual,,,5758736
      Alabama,1,2020-2-24,-34,,,Actual,,,4903185
      Minnesota,27,2020-2-24,-50,,,Actual,,,5639632
      Washington,53,2020-2-24,-22,,,Actual,,,7614893
      Missouri,29,2020-2-24,-50,,,Actual,,,6137428
      Tennessee,47,2020-2-24,-49,,,Actual,,,6829174
      Rhode Island,44,2020-2-24,-53,,,Actual,,,1059361
      Wisconsin,55,2020-2-24,-32,,,Actual,,,5822434
      Nevada,32,2020-2-24,-49,,,Actual,,,3080156
      Iowa,19,2020-2-24,-40,,,Actual,,,3155070
      Oklahoma,40,2020-2-24,-46,,,Actual,,,3956971
      Kentucky,21,2020-2-24,-36,,,Actual,,,4467673
      New York,36,2020-2-25,-33,,,Actual,,,26161672
      New Jersey,34,2020-2-25,-37,,,Actual,,,8882190
      California,6,2020-2-25,-36,,,Actual,,,39512223
      Texas,48,2020-2-25,-27,,,Actual,,,28995881
      Massachusetts,25,2020-2-25,-42,,,Actual,,,6892503
      Florida,12,2020-2-25,-28,,,Actual,,,21477737
      Illinois,17,2020-2-25,-42,,,Actual,,,12671821
      Pennsylvania,42,2020-2-25,-42,,,Actual,,,12801989
      Michigan,26,2020-2-25,-40,,,Actual,,,9986857
      Connecticut,9,2020-2-25,-27,,,Actual,,,3565287
      Louisiana,22,2020-2-25,-23,,,Actual,,,4648794
      Georgia,13,2020-2-25,-22,,,Actual,,,10617423
      Arizona,4,2020-2-25,-30,,,Actual,,,7278717
      Ohio,39,2020-2-25,-44,,,Actual,,,11689100
      Maryland,24,2020-2-25,-48,,,Actual,,,6045680
      Indiana,18,2020-2-25,-43,,,Actual,,,6732219
      Virginia,51,2020-2-25,-33,,,Actual,,,8535519
      North Carolina,37,2020-2-25,-35,,,Actual,,,10488084
      South Carolina,45,2020-2-25,-33,,,Actual,,,5148714
      Mississippi,28,2020-2-25,-31,,,Actual,,,2976149
      Colorado,8,2020-2-25,-27,,,Actual,,,5758736
      Alabama,1,2020-2-25,-33,,,Actual,,,4903185
      Minnesota,27,2020-2-25,-49,,,Actual,,,5639632
      Washington,53,2020-2-25,-21,,,Actual,,,7614893
      Missouri,29,2020-2-25,-49,,,Actual,,,6137428
      Tennessee,47,2020-2-25,-48,,,Actual,,,6829174
      Rhode Island,44,2020-2-25,-52,,,Actual,,,1059361
      Wisconsin,55,2020-2-25,-31,,,Actual,,,5822434
      Nevada,32,2020-2-25,-48,,,Actual,,,3080156
      Iowa,19,2020-2-25,-39,,,Actual,,,3155070
      Oklahoma,40,2020-2-25,-45,,,Actual,,,3956971
      Kentucky,21,2020-2-25,-35,,,Actual,,,4467673
      New York,36,2020-2-26,-32,,,Actual,,,26161672
      New Jersey,34,2020-2-26,-36,,,Actual,,,8882190
      California,6,2020-2-26,-35,,,Actual,,,39512223
      Texas,48,2020-2-26,-26,,,Actual,,,28995881
      Massachusetts,25,2020-2-26,-41,,,Actual,,,6892503
      Florida,12,2020-2-26,-27,,,Actual,,,21477737
      Illinois,17,2020-2-26,-41,,,Actual,,,12671821
      Pennsylvania,42,2020-2-26,-41,,,Actual,,,12801989
      Michigan,26,2020-2-26,-39,,,Actual,,,9986857
      Connecticut,9,2020-2-26,-26,,,Actual,,,3565287
      Louisiana,22,2020-2-26,-22,,,Actual,,,4648794
      Georgia,13,2020-2-26,-21,,,Actual,,,10617423
      Arizona,4,2020-2-26,-29,,,Actual,,,7278717
      Ohio,39,2020-2-26,-43,,,Actual,,,11689100
      Maryland,24,2020-2-26,-47,,,Actual,,,6045680
      Indiana,18,2020-2-26,-42,,,Actual,,,6732219
      Virginia,51,2020-2-26,-32,,,Actual,,,8535519
      North Carolina,37,2020-2-26,-34,,,Actual,,,10488084
      South Carolina,45,2020-2-26,-32,,,Actual,,,5148714
      Mississippi,28,2020-2-26,-30,,,Actual,,,2976149
      Colorado,8,2020-2-26,-26,,,Actual,,,5758736
      Alabama,1,2020-2-26,-32,,,Actual,,,4903185
      Minnesota,27,2020-2-26,-48,,,Actual,,,5639632
      Washington,53,2020-2-26,-20,,,Actual,,,7614893
      Missouri,29,2020-2-26,-48,,,Actual,,,6137428
      Tennessee,47,2020-2-26,-47,,,Actual,,,6829174
      Rhode Island,44,2020-2-26,-51,,,Actual,,,1059361
      Wisconsin,55,2020-2-26,-30,,,Actual,,,5822434
      Nevada,32,2020-2-26,-47,,,Actual,,,3080156
      Iowa,19,2020-2-26,-38,,,Actual,,,3155070
      Oklahoma,40,2020-2-26,-44,,,Actual,,,3956971
      Kentucky,21,2020-2-26,-34,,,Actual,,,4467673
      New York,36,2020-2-27,-31,,,Actual,,,26161672
      New Jersey,34,2020-2-27,-35,,,Actual,,,8882190
      California,6,2020-2-27,-34,,,Actual,,,39512223
      Texas,48,2020-2-27,-25,,,Actual,,,28995881
      Massachusetts,25,2020-2-27,-40,,,Actual,,,6892503
      Florida,12,2020-2-27,-26,,,Actual,,,21477737
      Illinois,17,2020-2-27,-40,,,Actual,,,12671821
      Pennsylvania,42,2020-2-27,-40,,,Actual,,,12801989
      Michigan,26,2020-2-27,-38,,,Actual,,,9986857
      Connecticut,9,2020-2-27,-25,,,Actual,,,3565287
      Louisiana,22,2020-2-27,-21,,,Actual,,,4648794
      Georgia,13,2020-2-27,-20,,,Actual,,,10617423
      Arizona,4,2020-2-27,-28,,,Actual,,,7278717
      Ohio,39,2020-2-27,-42,,,Actual,,,11689100
      Maryland,24,2020-2-27,-46,,,Actual,,,6045680
      Indiana,18,2020-2-27,-41,,,Actual,,,6732219
      Virginia,51,2020-2-27,-31,,,Actual,,,8535519
      North Carolina,37,2020-2-27,-33,,,Actual,,,10488084
      South Carolina,45,2020-2-27,-31,,,Actual,,,5148714
      Mississippi,28,2020-2-27,-29,,,Actual,,,2976149
      Colorado,8,2020-2-27,-25,,,Actual,,,5758736
      Alabama,1,2020-2-27,-31,,,Actual,,,4903185
      Minnesota,27,2020-2-27,-47,,,Actual,,,5639632
      Washington,53,2020-2-27,-19,,,Actual,,,7614893
      Missouri,29,2020-2-27,-47,,,Actual,,,6137428
      Tennessee,47,2020-2-27,-46,,,Actual,,,6829174
      Rhode Island,44,2020-2-27,-50,,,Actual,,,1059361
      Wisconsin,55,2020-2-27,-29,,,Actual,,,5822434
      Nevada,32,2020-2-27,-46,,,Actual,,,3080156
      Iowa,19,2020-2-27,-37,,,Actual,,,3155070
      Oklahoma,40,2020-2-27,-43,,,Actual,,,3956971
      Kentucky,21,2020-2-27,-33,,,Actual,,,4467673
      New York,36,2020-2-28,-30,,,Actual,,,26161672
      New Jersey,34,2020-2-28,-34,,,Actual,,,8882190
      California,6,2020-2-28,-33,,,Actual,,,39512223
      Texas,48,2020-2-28,-24,,,Actual,,,28995881
      Massachusetts,25,2020-2-28,-39,,,Actual,,,6892503
      Florida,12,2020-2-28,-25,,,Actual,,,21477737
      Illinois,17,2020-2-28,-39,,,Actual,,,12671821
      Pennsylvania,42,2020-2-28,-39,,,Actual,,,12801989
      Michigan,26,2020-2-28,-37,,,Actual,,,9986857
      Connecticut,9,2020-2-28,-24,,,Actual,,,3565287
      Louisiana,22,2020-2-28,-20,,,Actual,,,4648794
      Georgia,13,2020-2-28,-19,,,Actual,,,10617423
      Arizona,4,2020-2-28,-27,,,Actual,,,7278717
      Ohio,39,2020-2-28,-41,,,Actual,,,11689100
      Maryland,24,2020-2-28,-45,,,Actual,,,6045680
      Indiana,18,2020-2-28,-40,,,Actual,,,6732219
      Virginia,51,2020-2-28,-30,,,Actual,,,8535519
      North Carolina,37,2020-2-28,-32,,,Actual,,,10488084
      South Carolina,45,2020-2-28,-30,,,Actual,,,5148714
      Mississippi,28,2020-2-28,-28,,,Actual,,,2976149
      Colorado,8,2020-2-28,-24,,,Actual,,,5758736
      Alabama,1,2020-2-28,-30,,,Actual,,,4903185
      Minnesota,27,2020-2-28,-46,,,Actual,,,5639632
      Washington,53,2020-2-28,-18,,,Actual,,,7614893
      Missouri,29,2020-2-28,-46,,,Actual,,,6137428
      Tennessee,47,2020-2-28,-45,,,Actual,,,6829174
      Rhode Island,44,2020-2-28,-49,,,Actual,,,1059361
      Wisconsin,55,2020-2-28,-28,,,Actual,,,5822434
      Nevada,32,2020-2-28,-45,,,Actual,,,3080156
      Iowa,19,2020-2-28,-36,,,Actual,,,3155070
      Oklahoma,40,2020-2-28,-42,,,Actual,,,3956971
      Kentucky,21,2020-2-28,-32,,,Actual,,,4467673
      New York,36,2020-2-29,-29,,,Actual,,,26161672
      New Jersey,34,2020-2-29,-33,,,Actual,,,8882190
      California,6,2020-2-29,-32,,,Actual,,,39512223
      Texas,48,2020-2-29,-23,,,Actual,,,28995881
      Massachusetts,25,2020-2-29,-38,,,Actual,,,6892503
      Florida,12,2020-2-29,-24,,,Actual,,,21477737
      Illinois,17,2020-2-29,-38,,,Actual,,,12671821
      Pennsylvania,42,2020-2-29,-38,,,Actual,,,12801989
      Michigan,26,2020-2-29,-36,,,Actual,,,9986857
      Connecticut,9,2020-2-29,-23,,,Actual,,,3565287
      Louisiana,22,2020-2-29,-19,,,Actual,,,4648794
      Georgia,13,2020-2-29,-18,,,Actual,,,10617423
      Arizona,4,2020-2-29,-26,,,Actual,,,7278717
      Ohio,39,2020-2-29,-40,,,Actual,,,11689100
      Maryland,24,2020-2-29,-44,,,Actual,,,6045680
      Indiana,18,2020-2-29,-39,,,Actual,,,6732219
      Virginia,51,2020-2-29,-29,,,Actual,,,8535519
      North Carolina,37,2020-2-29,-31,,,Actual,,,10488084
      South Carolina,45,2020-2-29,-29,,,Actual,,,5148714
      Mississippi,28,2020-2-29,-27,,,Actual,,,2976149
      Colorado,8,2020-2-29,-23,,,Actual,,,5758736
      Alabama,1,2020-2-29,-29,,,Actual,,,4903185
      Minnesota,27,2020-2-29,-45,,,Actual,,,5639632
      Washington,53,2020-2-29,-17,,,Actual,,,7614893
      Missouri,29,2020-2-29,-45,,,Actual,,,6137428
      Tennessee,47,2020-2-29,-44,,,Actual,,,6829174
      Rhode Island,44,2020-2-29,-48,,,Actual,,,1059361
      Wisconsin,55,2020-2-29,-27,,,Actual,,,5822434
      Nevada,32,2020-2-29,-44,,,Actual,,,3080156
      Iowa,19,2020-2-29,-35,,,Actual,,,3155070
      Oklahoma,40,2020-2-29,-41,,,Actual,,,3956971
      Kentucky,21,2020-2-29,-31,,,Actual,,,4467673
      New York,36,2020-3-1,-28,,,Actual,,,26161672
      New Jersey,34,2020-3-1,-32,,,Actual,,,8882190
      California,6,2020-3-1,-31,,,Actual,,,39512223
      Texas,48,2020-3-1,-22,,,Actual,,,28995881
      Massachusetts,25,2020-3-1,-37,,,Actual,,,6892503
      Florida,12,2020-3-1,-23,,,Actual,,,21477737
      Illinois,17,2020-3-1,-37,,,Actual,,,12671821
      Pennsylvania,42,2020-3-1,-37,,,Actual,,,12801989
      Michigan,26,2020-3-1,-35,,,Actual,,,9986857
      Connecticut,9,2020-3-1,-22,,,Actual,,,3565287
      Louisiana,22,2020-3-1,-18,,,Actual,,,4648794
      Georgia,13,2020-3-1,-17,,,Actual,,,10617423
      Arizona,4,2020-3-1,-25,,,Actual,,,7278717
      Ohio,39,2020-3-1,-39,,,Actual,,,11689100
      Maryland,24,2020-3-1,-43,,,Actual,,,6045680
      Indiana,18,2020-3-1,-38,,,Actual,,,6732219
      Virginia,51,2020-3-1,-28,,,Actual,,,8535519
      North Carolina,37,2020-3-1,-30,,,Actual,,,10488084
      South Carolina,45,2020-3-1,-28,,,Actual,,,5148714
      Mississippi,28,2020-3-1,-26,,,Actual,,,2976149
      Colorado,8,2020-3-1,-22,,,Actual,,,5758736
      Alabama,1,2020-3-1,-28,,,Actual,,,4903185
      Minnesota,27,2020-3-1,-44,,,Actual,,,5639632
      Washington,53,2020-3-1,-16,,,Actual,,,7614893
      Missouri,29,2020-3-1,-44,,,Actual,,,6137428
      Tennessee,47,2020-3-1,-43,,,Actual,,,6829174
      Rhode Island,44,2020-3-1,-47,,,Actual,,,1059361
      Wisconsin,55,2020-3-1,-26,,,Actual,,,5822434
      Nevada,32,2020-3-1,-43,,,Actual,,,3080156
      Iowa,19,2020-3-1,-34,,,Actual,,,3155070
      Oklahoma,40,2020-3-1,-40,,,Actual,,,3956971
      Kentucky,21,2020-3-1,-30,,,Actual,,,4467673
      New York,36,2020-3-2,-27,,,Actual,,,26161672
      New Jersey,34,2020-3-2,-31,,,Actual,,,8882190
      California,6,2020-3-2,-30,,,Actual,,,39512223
      Texas,48,2020-3-2,-21,,,Actual,,,28995881
      Massachusetts,25,2020-3-2,-36,,,Actual,,,6892503
      Florida,12,2020-3-2,-22,,,Actual,,,21477737
      Illinois,17,2020-3-2,-36,,,Actual,,,12671821
      Pennsylvania,42,2020-3-2,-36,,,Actual,,,12801989
      Michigan,26,2020-3-2,-34,,,Actual,,,9986857
      Connecticut,9,2020-3-2,-21,,,Actual,,,3565287
      Louisiana,22,2020-3-2,-17,,,Actual,,,4648794
      Georgia,13,2020-3-2,-16,,,Actual,,,10617423
      Arizona,4,2020-3-2,-24,,,Actual,,,7278717
      Ohio,39,2020-3-2,-38,,,Actual,,,11689100
      Maryland,24,2020-3-2,-42,,,Actual,,,6045680
      Indiana,18,2020-3-2,-37,,,Actual,,,6732219
      Virginia,51,2020-3-2,-27,,,Actual,,,8535519
      North Carolina,37,2020-3-2,-29,,,Actual,,,10488084
      South Carolina,45,2020-3-2,-27,,,Actual,,,5148714
      Mississippi,28,2020-3-2,-25,,,Actual,,,2976149
      Colorado,8,2020-3-2,-21,,,Actual,,,5758736
      Alabama,1,2020-3-2,-27,,,Actual,,,4903185
      Minnesota,27,2020-3-2,-43,,,Actual,,,5639632
      Washington,53,2020-3-2,-15,,,Actual,,,7614893
      Missouri,29,2020-3-2,-43,,,Actual,,,6137428
      Tennessee,47,2020-3-2,-42,,,Actual,,,6829174
      Rhode Island,44,2020-3-2,-46,,,Actual,,,1059361
      Wisconsin,55,2020-3-2,-25,,,Actual,,,5822434
      Nevada,32,2020-3-2,-42,,,Actual,,,3080156
      Iowa,19,2020-3-2,-33,,,Actual,,,3155070
      Oklahoma,40,2020-3-2,-39,,,Actual,,,3956971
      Kentucky,21,2020-3-2,-29,,,Actual,,,4467673
      New York,36,2020-3-3,-26,,,Actual,,,26161672
      New Jersey,34,2020-3-3,-30,,,Actual,,,8882190
      California,6,2020-3-3,-29,,,Actual,,,39512223
      Texas,48,2020-3-3,-20,,,Actual,,,28995881
      Massachusetts,25,2020-3-3,-35,,,Actual,,,6892503
      Florida,12,2020-3-3,-21,,,Actual,,,21477737
      Illinois,17,2020-3-3,-35,,,Actual,,,12671821
      Pennsylvania,42,2020-3-3,-35,,,Actual,,,12801989
      Michigan,26,2020-3-3,-33,,,Actual,,,9986857
      Connecticut,9,2020-3-3,-20,,,Actual,,,3565287
      Louisiana,22,2020-3-3,-16,,,Actual,,,4648794
      Georgia,13,2020-3-3,-15,,,Actual,,,10617423
      Arizona,4,2020-3-3,-23,,,Actual,,,7278717
      Ohio,39,2020-3-3,-37,,,Actual,,,11689100
      Maryland,24,2020-3-3,-41,,,Actual,,,6045680
      Indiana,18,2020-3-3,-36,,,Actual,,,6732219
      Virginia,51,2020-3-3,-26,,,Actual,,,8535519
      North Carolina,37,2020-3-3,-28,,,Actual,,,10488084
      South Carolina,45,2020-3-3,-26,,,Actual,,,5148714
      Mississippi,28,2020-3-3,-24,,,Actual,,,2976149
      Colorado,8,2020-3-3,-20,,,Actual,,,5758736
      Alabama,1,2020-3-3,-26,,,Actual,,,4903185
      Minnesota,27,2020-3-3,-42,,,Actual,,,5639632
      Washington,53,2020-3-3,-14,,,Actual,,,7614893
      Missouri,29,2020-3-3,-42,,,Actual,,,6137428
      Tennessee,47,2020-3-3,-41,,,Actual,,,6829174
      Rhode Island,44,2020-3-3,-45,,,Actual,,,1059361
      Wisconsin,55,2020-3-3,-24,,,Actual,,,5822434
      Nevada,32,2020-3-3,-41,,,Actual,,,3080156
      Iowa,19,2020-3-3,-32,,,Actual,,,3155070
      Oklahoma,40,2020-3-3,-38,,,Actual,,,3956971
      Kentucky,21,2020-3-3,-28,,,Actual,,,4467673
      New York,36,2020-3-4,-25,,,Actual,,,26161672
      New Jersey,34,2020-3-4,-29,,,Actual,,,8882190
      California,6,2020-3-4,-28,,,Actual,,,39512223
      Texas,48,2020-3-4,-19,,,Actual,,,28995881
      Massachusetts,25,2020-3-4,-34,,,Actual,,,6892503
      Florida,12,2020-3-4,-20,,,Actual,,,21477737
      Illinois,17,2020-3-4,-34,,,Actual,,,12671821
      Pennsylvania,42,2020-3-4,-34,,,Actual,,,12801989
      Michigan,26,2020-3-4,-32,,,Actual,,,9986857
      Connecticut,9,2020-3-4,-19,,,Actual,,,3565287
      Louisiana,22,2020-3-4,-15,,,Actual,,,4648794
      Georgia,13,2020-3-4,-14,,,Actual,,,10617423
      Arizona,4,2020-3-4,-22,,,Actual,,,7278717
      Ohio,39,2020-3-4,-36,,,Actual,,,11689100
      Maryland,24,2020-3-4,-40,,,Actual,,,6045680
      Indiana,18,2020-3-4,-35,,,Actual,,,6732219
      Virginia,51,2020-3-4,-25,,,Actual,,,8535519
      North Carolina,37,2020-3-4,-27,,,Actual,,,10488084
      South Carolina,45,2020-3-4,-25,,,Actual,,,5148714
      Mississippi,28,2020-3-4,-23,,,Actual,,,2976149
      Colorado,8,2020-3-4,-19,,,Actual,,,5758736
      Alabama,1,2020-3-4,-25,,,Actual,,,4903185
      Minnesota,27,2020-3-4,-41,,,Actual,,,5639632
      Washington,53,2020-3-4,-13,,,Actual,,,7614893
      Missouri,29,2020-3-4,-41,,,Actual,,,6137428
      Tennessee,47,2020-3-4,-40,,,Actual,,,6829174
      Rhode Island,44,2020-3-4,-44,,,Actual,,,1059361
      Wisconsin,55,2020-3-4,-23,,,Actual,,,5822434
      Nevada,32,2020-3-4,-40,,,Actual,,,3080156
      Iowa,19,2020-3-4,-31,,,Actual,,,3155070
      Oklahoma,40,2020-3-4,-37,,,Actual,,,3956971
      Kentucky,21,2020-3-4,-27,,,Actual,,,4467673
      New York,36,2020-3-5,-24,,,Actual,,,26161672
      New Jersey,34,2020-3-5,-28,,,Actual,,,8882190
      California,6,2020-3-5,-27,,,Actual,,,39512223
      Texas,48,2020-3-5,-18,,,Actual,,,28995881
      Massachusetts,25,2020-3-5,-33,,,Actual,,,6892503
      Florida,12,2020-3-5,-19,,,Actual,,,21477737
      Illinois,17,2020-3-5,-33,,,Actual,,,12671821
      Pennsylvania,42,2020-3-5,-33,,,Actual,,,12801989
      Michigan,26,2020-3-5,-31,,,Actual,,,9986857
      Connecticut,9,2020-3-5,-18,,,Actual,,,3565287
      Louisiana,22,2020-3-5,-14,,,Actual,,,4648794
      Georgia,13,2020-3-5,-13,,,Actual,,,10617423
      Arizona,4,2020-3-5,-21,,,Actual,,,7278717
      Ohio,39,2020-3-5,-35,,,Actual,,,11689100
      Maryland,24,2020-3-5,-39,,,Actual,,,6045680
      Indiana,18,2020-3-5,-34,,,Actual,,,6732219
      Virginia,51,2020-3-5,-24,,,Actual,,,8535519
      North Carolina,37,2020-3-5,-26,,,Actual,,,10488084
      South Carolina,45,2020-3-5,-24,,,Actual,,,5148714
      Mississippi,28,2020-3-5,-22,,,Actual,,,2976149
      Colorado,8,2020-3-5,-18,,,Actual,,,5758736
      Alabama,1,2020-3-5,-24,,,Actual,,,4903185
      Minnesota,27,2020-3-5,-40,,,Actual,,,5639632
      Washington,53,2020-3-5,-12,,,Actual,,,7614893
      Missouri,29,2020-3-5,-40,,,Actual,,,6137428
      Tennessee,47,2020-3-5,-39,,,Actual,,,6829174
      Rhode Island,44,2020-3-5,-43,,,Actual,,,1059361
      Wisconsin,55,2020-3-5,-22,,,Actual,,,5822434
      Nevada,32,2020-3-5,-39,,,Actual,,,3080156
      Iowa,19,2020-3-5,-30,,,Actual,,,3155070
      Oklahoma,40,2020-3-5,-36,,,Actual,,,3956971
      Kentucky,21,2020-3-5,-26,,,Actual,,,4467673
      New York,36,2020-3-6,-23,,,Actual,,,26161672
      New Jersey,34,2020-3-6,-27,,,Actual,,,8882190
      California,6,2020-3-6,-26,,,Actual,,,39512223
      Texas,48,2020-3-6,-17,,,Actual,,,28995881
      Massachusetts,25,2020-3-6,-32,,,Actual,,,6892503
      Florida,12,2020-3-6,-18,,,Actual,,,21477737
      Illinois,17,2020-3-6,-32,,,Actual,,,12671821
      Pennsylvania,42,2020-3-6,-32,,,Actual,,,12801989
      Michigan,26,2020-3-6,-30,,,Actual,,,9986857
      Connecticut,9,2020-3-6,-17,,,Actual,,,3565287
      Louisiana,22,2020-3-6,-13,,,Actual,,,4648794
      Georgia,13,2020-3-6,-12,,,Actual,,,10617423
      Arizona,4,2020-3-6,-20,,,Actual,,,7278717
      Ohio,39,2020-3-6,-34,,,Actual,,,11689100
      Maryland,24,2020-3-6,-38,,,Actual,,,6045680
      Indiana,18,2020-3-6,-33,,,Actual,,,6732219
      Virginia,51,2020-3-6,-23,,,Actual,,,8535519
      North Carolina,37,2020-3-6,-25,,,Actual,,,10488084
      South Carolina,45,2020-3-6,-23,,,Actual,,,5148714
      Mississippi,28,2020-3-6,-21,,,Actual,,,2976149
      Colorado,8,2020-3-6,-17,,,Actual,,,5758736
      Alabama,1,2020-3-6,-23,,,Actual,,,4903185
      Minnesota,27,2020-3-6,-39,,,Actual,,,5639632
      Washington,53,2020-3-6,-11,,,Actual,,,7614893
      Missouri,29,2020-3-6,-39,,,Actual,,,6137428
      Tennessee,47,2020-3-6,-38,,,Actual,,,6829174
      Rhode Island,44,2020-3-6,-42,,,Actual,,,1059361
      Wisconsin,55,2020-3-6,-21,,,Actual,,,5822434
      Nevada,32,2020-3-6,-38,,,Actual,,,3080156
      Iowa,19,2020-3-6,-29,,,Actual,,,3155070
      Oklahoma,40,2020-3-6,-35,,,Actual,,,3956971
      Kentucky,21,2020-3-6,-25,,,Actual,,,4467673
      New York,36,2020-3-7,-22,,,Actual,,,26161672
      New Jersey,34,2020-3-7,-26,,,Actual,,,8882190
      California,6,2020-3-7,-25,,,Actual,,,39512223
      Texas,48,2020-3-7,-16,,,Actual,,,28995881
      Massachusetts,25,2020-3-7,-31,,,Actual,,,6892503
      Florida,12,2020-3-7,-17,,,Actual,,,21477737
      Illinois,17,2020-3-7,-31,,,Actual,,,12671821
      Pennsylvania,42,2020-3-7,-31,,,Actual,,,12801989
      Michigan,26,2020-3-7,-29,,,Actual,,,9986857
      Connecticut,9,2020-3-7,-16,,,Actual,,,3565287
      Louisiana,22,2020-3-7,-12,,,Actual,,,4648794
      Georgia,13,2020-3-7,-11,,,Actual,,,10617423
      Arizona,4,2020-3-7,-19,,,Actual,,,7278717
      Ohio,39,2020-3-7,-33,,,Actual,,,11689100
      Maryland,24,2020-3-7,-37,,,Actual,,,6045680
      Indiana,18,2020-3-7,-32,,,Actual,,,6732219
      Virginia,51,2020-3-7,-22,,,Actual,,,8535519
      North Carolina,37,2020-3-7,-24,,,Actual,,,10488084
      South Carolina,45,2020-3-7,-22,,,Actual,,,5148714
      Mississippi,28,2020-3-7,-20,,,Actual,,,2976149
      Colorado,8,2020-3-7,-16,,,Actual,,,5758736
      Alabama,1,2020-3-7,-22,,,Actual,,,4903185
      Minnesota,27,2020-3-7,-38,,,Actual,,,5639632
      Washington,53,2020-3-7,-10,,,Actual,,,7614893
      Missouri,29,2020-3-7,-38,,,Actual,,,6137428
      Tennessee,47,2020-3-7,-37,,,Actual,,,6829174
      Rhode Island,44,2020-3-7,-41,,,Actual,,,1059361
      Wisconsin,55,2020-3-7,-20,,,Actual,,,5822434
      Nevada,32,2020-3-7,-37,,,Actual,,,3080156
      Iowa,19,2020-3-7,-28,,,Actual,,,3155070
      Oklahoma,40,2020-3-7,-34,,,Actual,,,3956971
      Kentucky,21,2020-3-7,-24,,,Actual,,,4467673
      New York,36,2020-3-8,-21,,,Actual,,,26161672
      New Jersey,34,2020-3-8,-25,,,Actual,,,8882190
      California,6,2020-3-8,-24,,,Actual,,,39512223
      Texas,48,2020-3-8,-15,,,Actual,,,28995881
      Massachusetts,25,2020-3-8,-30,,,Actual,,,6892503
      Florida,12,2020-3-8,-16,,,Actual,,,21477737
      Illinois,17,2020-3-8,-30,,,Actual,,,12671821
      Pennsylvania,42,2020-3-8,-30,,,Actual,,,12801989
      Michigan,26,2020-3-8,-28,,,Actual,,,9986857
      Connecticut,9,2020-3-8,-15,,,Actual,,,3565287
      Louisiana,22,2020-3-8,-11,,,Actual,,,4648794
      Georgia,13,2020-3-8,-10,,,Actual,,,10617423
      Arizona,4,2020-3-8,-18,,,Actual,,,7278717
      Ohio,39,2020-3-8,-32,,,Actual,,,11689100
      Maryland,24,2020-3-8,-36,,,Actual,,,6045680
      Indiana,18,2020-3-8,-31,,,Actual,,,6732219
      Virginia,51,2020-3-8,-21,,,Actual,,,8535519
      North Carolina,37,2020-3-8,-23,,,Actual,,,10488084
      South Carolina,45,2020-3-8,-21,,,Actual,,,5148714
      Mississippi,28,2020-3-8,-19,,,Actual,,,2976149
      Colorado,8,2020-3-8,-15,,,Actual,,,5758736
      Alabama,1,2020-3-8,-21,,,Actual,,,4903185
      Minnesota,27,2020-3-8,-37,,,Actual,,,5639632
      Washington,53,2020-3-8,-9,,,Actual,,,7614893
      Missouri,29,2020-3-8,-37,,,Actual,,,6137428
      Tennessee,47,2020-3-8,-36,,,Actual,,,6829174
      Rhode Island,44,2020-3-8,-40,,,Actual,,,1059361
      Wisconsin,55,2020-3-8,-19,,,Actual,,,5822434
      Nevada,32,2020-3-8,-36,,,Actual,,,3080156
      Iowa,19,2020-3-8,-27,,,Actual,,,3155070
      Oklahoma,40,2020-3-8,-33,,,Actual,,,3956971
      Kentucky,21,2020-3-8,-23,,,Actual,,,4467673
      New York,36,2020-3-9,-20,,,Actual,,,26161672
      New Jersey,34,2020-3-9,-24,,,Actual,,,8882190
      California,6,2020-3-9,-23,,,Actual,,,39512223
      Texas,48,2020-3-9,-14,,,Actual,,,28995881
      Massachusetts,25,2020-3-9,-29,,,Actual,,,6892503
      Florida,12,2020-3-9,-15,,,Actual,,,21477737
      Illinois,17,2020-3-9,-29,,,Actual,,,12671821
      Pennsylvania,42,2020-3-9,-29,,,Actual,,,12801989
      Michigan,26,2020-3-9,-27,,,Actual,,,9986857
      Connecticut,9,2020-3-9,-14,,,Actual,,,3565287
      Louisiana,22,2020-3-9,-10,,,Actual,,,4648794
      Georgia,13,2020-3-9,-9,,,Actual,,,10617423
      Arizona,4,2020-3-9,-17,,,Actual,,,7278717
      Ohio,39,2020-3-9,-31,,,Actual,,,11689100
      Maryland,24,2020-3-9,-35,,,Actual,,,6045680
      Indiana,18,2020-3-9,-30,,,Actual,,,6732219
      Virginia,51,2020-3-9,-20,,,Actual,,,8535519
      North Carolina,37,2020-3-9,-22,,,Actual,,,10488084
      South Carolina,45,2020-3-9,-20,,,Actual,,,5148714
      Mississippi,28,2020-3-9,-18,,,Actual,,,2976149
      Colorado,8,2020-3-9,-14,,,Actual,,,5758736
      Alabama,1,2020-3-9,-20,,,Actual,,,4903185
      Minnesota,27,2020-3-9,-36,,,Actual,,,5639632
      Washington,53,2020-3-9,-8,,,Actual,,,7614893
      Missouri,29,2020-3-9,-36,,,Actual,,,6137428
      Tennessee,47,2020-3-9,-35,,,Actual,,,6829174
      Rhode Island,44,2020-3-9,-39,,,Actual,,,1059361
      Wisconsin,55,2020-3-9,-18,,,Actual,,,5822434
      Nevada,32,2020-3-9,-35,,,Actual,,,3080156
      Iowa,19,2020-3-9,-26,,,Actual,,,3155070
      Oklahoma,40,2020-3-9,-32,,,Actual,,,3956971
      Kentucky,21,2020-3-9,-22,,,Actual,,,4467673
      New York,36,2020-3-10,-19,,,Actual,,,26161672
      New Jersey,34,2020-3-10,-23,,,Actual,,,8882190
      California,6,2020-3-10,-22,,,Actual,,,39512223
      Texas,48,2020-3-10,-13,,,Actual,,,28995881
      Massachusetts,25,2020-3-10,-28,,,Actual,,,6892503
      Florida,12,2020-3-10,-14,,,Actual,,,21477737
      Illinois,17,2020-3-10,-28,,,Actual,,,12671821
      Pennsylvania,42,2020-3-10,-28,,,Actual,,,12801989
      Michigan,26,2020-3-10,-26,,,Actual,,,9986857
      Connecticut,9,2020-3-10,-13,,,Actual,,,3565287
      Louisiana,22,2020-3-10,-9,,,Actual,,,4648794
      Georgia,13,2020-3-10,-8,,,Actual,,,10617423
      Arizona,4,2020-3-10,-16,,,Actual,,,7278717
      Ohio,39,2020-3-10,-30,,,Actual,,,11689100
      Maryland,24,2020-3-10,-34,,,Actual,,,6045680
      Indiana,18,2020-3-10,-29,,,Actual,,,6732219
      Virginia,51,2020-3-10,-19,,,Actual,,,8535519
      North Carolina,37,2020-3-10,-21,,,Actual,,,10488084
      South Carolina,45,2020-3-10,-19,,,Actual,,,5148714
      Mississippi,28,2020-3-10,-17,,,Actual,,,2976149
      Colorado,8,2020-3-10,-13,,,Actual,,,5758736
      Alabama,1,2020-3-10,-19,,,Actual,,,4903185
      Minnesota,27,2020-3-10,-35,,,Actual,,,5639632
      Washington,53,2020-3-10,-7,,,Actual,,,7614893
      Missouri,29,2020-3-10,-35,,,Actual,,,6137428
      Tennessee,47,2020-3-10,-34,,,Actual,,,6829174
      Rhode Island,44,2020-3-10,-38,,,Actual,,,1059361
      Wisconsin,55,2020-3-10,-17,,,Actual,,,5822434
      Nevada,32,2020-3-10,-34,,,Actual,,,3080156
      Iowa,19,2020-3-10,-25,,,Actual,,,3155070
      Oklahoma,40,2020-3-10,-31,,,Actual,,,3956971
      Kentucky,21,2020-3-10,-21,,,Actual,,,4467673
      New York,36,2020-3-11,-18,,,Actual,,,26161672
      New Jersey,34,2020-3-11,-22,,,Actual,,,8882190
      California,6,2020-3-11,-21,,,Actual,,,39512223
      Texas,48,2020-3-11,-12,,,Actual,,,28995881
      Massachusetts,25,2020-3-11,-27,,,Actual,,,6892503
      Florida,12,2020-3-11,-13,,,Actual,,,21477737
      Illinois,17,2020-3-11,-27,,,Actual,,,12671821
      Pennsylvania,42,2020-3-11,-27,,,Actual,,,12801989
      Michigan,26,2020-3-11,-25,,,Actual,,,9986857
      Connecticut,9,2020-3-11,-12,,,Actual,,,3565287
      Louisiana,22,2020-3-11,-8,,,Actual,,,4648794
      Georgia,13,2020-3-11,-7,,,Actual,,,10617423
      Arizona,4,2020-3-11,-15,,,Actual,,,7278717
      Ohio,39,2020-3-11,-29,,,Actual,,,11689100
      Maryland,24,2020-3-11,-33,,,Actual,,,6045680
      Indiana,18,2020-3-11,-28,,,Actual,,,6732219
      Virginia,51,2020-3-11,-18,,,Actual,,,8535519
      North Carolina,37,2020-3-11,-20,,,Actual,,,10488084
      South Carolina,45,2020-3-11,-18,,,Actual,,,5148714
      Mississippi,28,2020-3-11,-16,,,Actual,,,2976149
      Colorado,8,2020-3-11,-12,,,Actual,,,5758736
      Alabama,1,2020-3-11,-18,,,Actual,,,4903185
      Minnesota,27,2020-3-11,-34,,,Actual,,,5639632
      Washington,53,2020-3-11,-6,,,Actual,,,7614893
      Missouri,29,2020-3-11,-34,,,Actual,,,6137428
      Tennessee,47,2020-3-11,-33,,,Actual,,,6829174
      Rhode Island,44,2020-3-11,-37,,,Actual,,,1059361
      Wisconsin,55,2020-3-11,-16,,,Actual,,,5822434
      Nevada,32,2020-3-11,-33,,,Actual,,,3080156
      Iowa,19,2020-3-11,-24,,,Actual,,,3155070
      Oklahoma,40,2020-3-11,-30,,,Actual,,,3956971
      Kentucky,21,2020-3-11,-20,,,Actual,,,4467673
      New York,36,2020-3-12,-17,,,Actual,,,26161672
      New Jersey,34,2020-3-12,-21,,,Actual,,,8882190
      California,6,2020-3-12,-20,,,Actual,,,39512223
      Texas,48,2020-3-12,-11,,,Actual,,,28995881
      Massachusetts,25,2020-3-12,-26,,,Actual,,,6892503
      Florida,12,2020-3-12,-12,,,Actual,,,21477737
      Illinois,17,2020-3-12,-26,,,Actual,,,12671821
      Pennsylvania,42,2020-3-12,-26,,,Actual,,,12801989
      Michigan,26,2020-3-12,-24,,,Actual,,,9986857
      Connecticut,9,2020-3-12,-11,,,Actual,,,3565287
      Louisiana,22,2020-3-12,-7,,,Actual,,,4648794
      Georgia,13,2020-3-12,-6,,,Actual,,,10617423
      Arizona,4,2020-3-12,-14,,,Actual,,,7278717
      Ohio,39,2020-3-12,-28,,,Actual,,,11689100
      Maryland,24,2020-3-12,-32,,,Actual,,,6045680
      Indiana,18,2020-3-12,-27,,,Actual,,,6732219
      Virginia,51,2020-3-12,-17,,,Actual,,,8535519
      North Carolina,37,2020-3-12,-19,,,Actual,,,10488084
      South Carolina,45,2020-3-12,-17,,,Actual,,,5148714
      Mississippi,28,2020-3-12,-15,,,Actual,,,2976149
      Colorado,8,2020-3-12,-11,,,Actual,,,5758736
      Alabama,1,2020-3-12,-17,,,Actual,,,4903185
      Minnesota,27,2020-3-12,-33,,,Actual,,,5639632
      Washington,53,2020-3-12,-5,,,Actual,,,7614893
      Missouri,29,2020-3-12,-33,,,Actual,,,6137428
      Tennessee,47,2020-3-12,-32,,,Actual,,,6829174
      Rhode Island,44,2020-3-12,-36,,,Actual,,,1059361
      Wisconsin,55,2020-3-12,-15,,,Actual,,,5822434
      Nevada,32,2020-3-12,-32,,,Actual,,,3080156
      Iowa,19,2020-3-12,-23,,,Actual,,,3155070
      Oklahoma,40,2020-3-12,-29,,,Actual,,,3956971
      Kentucky,21,2020-3-12,-19,,,Actual,,,4467673
      New York,36,2020-3-13,-16,,,Actual,,,26161672
      New Jersey,34,2020-3-13,-20,,,Actual,,,8882190
      California,6,2020-3-13,-19,,,Actual,,,39512223
      Texas,48,2020-3-13,-10,,,Actual,,,28995881
      Massachusetts,25,2020-3-13,-25,,,Actual,,,6892503
      Florida,12,2020-3-13,-11,,,Actual,,,21477737
      Illinois,17,2020-3-13,-25,,,Actual,,,12671821
      Pennsylvania,42,2020-3-13,-25,,,Actual,,,12801989
      Michigan,26,2020-3-13,-23,,,Actual,,,9986857
      Connecticut,9,2020-3-13,-10,,,Actual,,,3565287
      Louisiana,22,2020-3-13,-6,,,Actual,,,4648794
      Georgia,13,2020-3-13,-5,,,Actual,,,10617423
      Arizona,4,2020-3-13,-13,,,Actual,,,7278717
      Ohio,39,2020-3-13,-27,,,Actual,,,11689100
      Maryland,24,2020-3-13,-31,,,Actual,,,6045680
      Indiana,18,2020-3-13,-26,,,Actual,,,6732219
      Virginia,51,2020-3-13,-16,,,Actual,,,8535519
      North Carolina,37,2020-3-13,-18,,,Actual,,,10488084
      South Carolina,45,2020-3-13,-16,,,Actual,,,5148714
      Mississippi,28,2020-3-13,-14,,,Actual,,,2976149
      Colorado,8,2020-3-13,-10,,,Actual,,,5758736
      Alabama,1,2020-3-13,-16,,,Actual,,,4903185
      Minnesota,27,2020-3-13,-32,,,Actual,,,5639632
      Washington,53,2020-3-13,-4,,,Actual,,,7614893
      Missouri,29,2020-3-13,-32,,,Actual,,,6137428
      Tennessee,47,2020-3-13,-31,,,Actual,,,6829174
      Rhode Island,44,2020-3-13,-35,,,Actual,,,1059361
      Wisconsin,55,2020-3-13,-14,,,Actual,,,5822434
      Nevada,32,2020-3-13,-31,,,Actual,,,3080156
      Iowa,19,2020-3-13,-22,,,Actual,,,3155070
      Oklahoma,40,2020-3-13,-28,,,Actual,,,3956971
      Kentucky,21,2020-3-13,-18,,,Actual,,,4467673
      New York,36,2020-3-14,-15,,,Actual,,,26161672
      New Jersey,34,2020-3-14,-19,,,Actual,,,8882190
      California,6,2020-3-14,-18,,,Actual,,,39512223
      Texas,48,2020-3-14,-9,,,Actual,,,28995881
      Massachusetts,25,2020-3-14,-24,,,Actual,,,6892503
      Florida,12,2020-3-14,-10,,,Actual,,,21477737
      Illinois,17,2020-3-14,-24,,,Actual,,,12671821
      Pennsylvania,42,2020-3-14,-24,,,Actual,,,12801989
      Michigan,26,2020-3-14,-22,,,Actual,,,9986857
      Connecticut,9,2020-3-14,-9,,,Actual,,,3565287
      Louisiana,22,2020-3-14,-5,,,Actual,,,4648794
      Georgia,13,2020-3-14,-4,,,Actual,,,10617423
      Arizona,4,2020-3-14,-12,,,Actual,,,7278717
      Ohio,39,2020-3-14,-26,,,Actual,,,11689100
      Maryland,24,2020-3-14,-30,,,Actual,,,6045680
      Indiana,18,2020-3-14,-25,,,Actual,,,6732219
      Virginia,51,2020-3-14,-15,,,Actual,,,8535519
      North Carolina,37,2020-3-14,-17,,,Actual,,,10488084
      South Carolina,45,2020-3-14,-15,,,Actual,,,5148714
      Mississippi,28,2020-3-14,-13,,,Actual,,,2976149
      Colorado,8,2020-3-14,-9,,,Actual,,,5758736
      Alabama,1,2020-3-14,-15,,,Actual,,,4903185
      Minnesota,27,2020-3-14,-31,,,Actual,,,5639632
      Washington,53,2020-3-14,-3,,,Actual,,,7614893
      Missouri,29,2020-3-14,-31,,,Actual,,,6137428
      Tennessee,47,2020-3-14,-30,,,Actual,,,6829174
      Rhode Island,44,2020-3-14,-34,,,Actual,,,1059361
      Wisconsin,55,2020-3-14,-13,,,Actual,,,5822434
      Nevada,32,2020-3-14,-30,,,Actual,,,3080156
      Iowa,19,2020-3-14,-21,,,Actual,,,3155070
      Oklahoma,40,2020-3-14,-27,,,Actual,,,3956971
      Kentucky,21,2020-3-14,-17,,,Actual,,,4467673
      New York,36,2020-3-15,-14,,,Actual,,,26161672
      New Jersey,34,2020-3-15,-18,,,Actual,,,8882190
      California,6,2020-3-15,-17,,,Actual,,,39512223
      Texas,48,2020-3-15,-8,,,Actual,,,28995881
      Massachusetts,25,2020-3-15,-23,,,Actual,,,6892503
      Florida,12,2020-3-15,-9,,,Actual,,,21477737
      Illinois,17,2020-3-15,-23,,,Actual,,,12671821
      Pennsylvania,42,2020-3-15,-23,,,Actual,,,12801989
      Michigan,26,2020-3-15,-21,,,Actual,,,9986857
      Connecticut,9,2020-3-15,-8,,,Actual,,,3565287
      Louisiana,22,2020-3-15,-4,,,Actual,,,4648794
      Georgia,13,2020-3-15,-3,,,Actual,,,10617423
      Arizona,4,2020-3-15,-11,,,Actual,,,7278717
      Ohio,39,2020-3-15,-25,,,Actual,,,11689100
      Maryland,24,2020-3-15,-29,,,Actual,,,6045680
      Indiana,18,2020-3-15,-24,,,Actual,,,6732219
      Virginia,51,2020-3-15,-14,,,Actual,,,8535519
      North Carolina,37,2020-3-15,-16,,,Actual,,,10488084
      South Carolina,45,2020-3-15,-14,,,Actual,,,5148714
      Mississippi,28,2020-3-15,-12,,,Actual,,,2976149
      Colorado,8,2020-3-15,-8,,,Actual,,,5758736
      Alabama,1,2020-3-15,-14,,,Actual,,,4903185
      Minnesota,27,2020-3-15,-30,,,Actual,,,5639632
      Washington,53,2020-3-15,-2,,,Actual,,,7614893
      Missouri,29,2020-3-15,-30,,,Actual,,,6137428
      Tennessee,47,2020-3-15,-29,,,Actual,,,6829174
      Rhode Island,44,2020-3-15,-33,,,Actual,,,1059361
      Wisconsin,55,2020-3-15,-12,,,Actual,,,5822434
      Nevada,32,2020-3-15,-29,,,Actual,,,3080156
      Iowa,19,2020-3-15,-20,,,Actual,,,3155070
      Oklahoma,40,2020-3-15,-26,,,Actual,,,3956971
      Kentucky,21,2020-3-15,-16,,,Actual,,,4467673
      New York,36,2020-3-16,-13,,,Actual,,,26161672
      New Jersey,34,2020-3-16,-17,,,Actual,,,8882190
      California,6,2020-3-16,-16,,,Actual,,,39512223
      Texas,48,2020-3-16,-7,,,Actual,,,28995881
      Massachusetts,25,2020-3-16,-22,,,Actual,,,6892503
      Florida,12,2020-3-16,-8,,,Actual,,,21477737
      Illinois,17,2020-3-16,-22,,,Actual,,,12671821
      Pennsylvania,42,2020-3-16,-22,,,Actual,,,12801989
      Michigan,26,2020-3-16,-20,,,Actual,,,9986857
      Connecticut,9,2020-3-16,-7,,,Actual,,,3565287
      Louisiana,22,2020-3-16,-3,,,Actual,,,4648794
      Georgia,13,2020-3-16,-2,,,Actual,,,10617423
      Arizona,4,2020-3-16,-10,,,Actual,,,7278717
      Ohio,39,2020-3-16,-24,,,Actual,,,11689100
      Maryland,24,2020-3-16,-28,,,Actual,,,6045680
      Indiana,18,2020-3-16,-23,,,Actual,,,6732219
      Virginia,51,2020-3-16,-13,,,Actual,,,8535519
      North Carolina,37,2020-3-16,-15,,,Actual,,,10488084
      South Carolina,45,2020-3-16,-13,,,Actual,,,5148714
      Mississippi,28,2020-3-16,-11,,,Actual,,,2976149
      Colorado,8,2020-3-16,-7,,,Actual,,,5758736
      Alabama,1,2020-3-16,-13,,,Actual,,,4903185
      Minnesota,27,2020-3-16,-29,,,Actual,,,5639632
      Washington,53,2020-3-16,-1,,,Actual,,,7614893
      Missouri,29,2020-3-16,-29,,,Actual,,,6137428
      Tennessee,47,2020-3-16,-28,,,Actual,,,6829174
      Rhode Island,44,2020-3-16,-32,,,Actual,,,1059361
      Wisconsin,55,2020-3-16,-11,,,Actual,,,5822434
      Nevada,32,2020-3-16,-28,,,Actual,,,3080156
      Iowa,19,2020-3-16,-19,,,Actual,,,3155070
      Oklahoma,40,2020-3-16,-25,,,Actual,,,3956971
      Kentucky,21,2020-3-16,-15,,,Actual,,,4467673
      New York,36,2020-3-17,-12,,,Actual,,,26161672
      New Jersey,34,2020-3-17,-16,,,Actual,,,8882190
      California,6,2020-3-17,-15,,,Actual,,,39512223
      Texas,48,2020-3-17,-6,,,Actual,,,28995881
      Massachusetts,25,2020-3-17,-21,,,Actual,,,6892503
      Florida,12,2020-3-17,-7,,,Actual,,,21477737
      Illinois,17,2020-3-17,-21,,,Actual,,,12671821
      Pennsylvania,42,2020-3-17,-21,,,Actual,,,12801989
      Michigan,26,2020-3-17,-19,,,Actual,,,9986857
      Connecticut,9,2020-3-17,-6,,,Actual,,,3565287
      Louisiana,22,2020-3-17,-2,,,Actual,,,4648794
      Georgia,13,2020-3-17,-1,,,Actual,,,10617423
      Arizona,4,2020-3-17,-9,,,Actual,,,7278717
      Ohio,39,2020-3-17,-23,,,Actual,,,11689100
      Maryland,24,2020-3-17,-27,,,Actual,,,6045680
      Indiana,18,2020-3-17,-22,,,Actual,,,6732219
      Virginia,51,2020-3-17,-12,,,Actual,,,8535519
      North Carolina,37,2020-3-17,-14,,,Actual,,,10488084
      South Carolina,45,2020-3-17,-12,,,Actual,,,5148714
      Mississippi,28,2020-3-17,-10,,,Actual,,,2976149
      Colorado,8,2020-3-17,-6,,,Actual,,,5758736
      Alabama,1,2020-3-17,-12,,,Actual,,,4903185
      Minnesota,27,2020-3-17,-28,,,Actual,,,5639632
      Washington,53,2020-3-17,0,-31.3333333333333,0,Actual,6.8,55,7614893
      Missouri,29,2020-3-17,-28,,,Actual,,,6137428
      Tennessee,47,2020-3-17,-27,,,Actual,,,6829174
      Rhode Island,44,2020-3-17,-31,,,Actual,,,1059361
      Wisconsin,55,2020-3-17,-10,,,Actual,,,5822434
      Nevada,32,2020-3-17,-27,,,Actual,,,3080156
      Iowa,19,2020-3-17,-18,,,Actual,,,3155070
      Oklahoma,40,2020-3-17,-24,,,Actual,,,3956971
      Kentucky,21,2020-3-17,-14,,,Actual,,,4467673
      New York,36,2020-3-18,-11,,,Actual,,,26161672
      New Jersey,34,2020-3-18,-15,,,Actual,,,8882190
      California,6,2020-3-18,-14,,,Actual,,,39512223
      Texas,48,2020-3-18,-5,,,Actual,,,28995881
      Massachusetts,25,2020-3-18,-20,,,Actual,,,6892503
      Florida,12,2020-3-18,-6,,,Actual,,,21477737
      Illinois,17,2020-3-18,-20,,,Actual,,,12671821
      Pennsylvania,42,2020-3-18,-20,,,Actual,,,12801989
      Michigan,26,2020-3-18,-18,,,Actual,,,9986857
      Connecticut,9,2020-3-18,-5,,,Actual,,,3565287
      Louisiana,22,2020-3-18,-1,,,Actual,,,4648794
      Georgia,13,2020-3-18,0,-23.6666666666667,0,Actual,2.6,3,10617423
      Arizona,4,2020-3-18,-8,,,Actual,,,7278717
      Ohio,39,2020-3-18,-22,,,Actual,,,11689100
      Maryland,24,2020-3-18,-26,,,Actual,,,6045680
      Indiana,18,2020-3-18,-21,,,Actual,,,6732219
      Virginia,51,2020-3-18,-11,,,Actual,,,8535519
      North Carolina,37,2020-3-18,-13,,,Actual,,,10488084
      South Carolina,45,2020-3-18,-11,,,Actual,,,5148714
      Mississippi,28,2020-3-18,-9,,,Actual,,,2976149
      Colorado,8,2020-3-18,-5,,,Actual,,,5758736
      Alabama,1,2020-3-18,-11,,,Actual,,,4903185
      Minnesota,27,2020-3-18,-27,,,Actual,,,5639632
      Washington,53,2020-3-18,1,-34,0.66,Actual,8.6,67,7614893
      Missouri,29,2020-3-18,-27,,,Actual,,,6137428
      Tennessee,47,2020-3-18,-26,,,Actual,,,6829174
      Rhode Island,44,2020-3-18,-30,,,Actual,,,1059361
      Wisconsin,55,2020-3-18,-9,,,Actual,,,5822434
      Nevada,32,2020-3-18,-26,,,Actual,,,3080156
      Iowa,19,2020-3-18,-17,,,Actual,,,3155070
      Oklahoma,40,2020-3-18,-23,,,Actual,,,3956971
      Kentucky,21,2020-3-18,-13,,,Actual,,,4467673
      New York,36,2020-3-19,-10,,,Actual,,,26161672
      New Jersey,34,2020-3-19,-14,,,Actual,,,8882190
      California,6,2020-3-19,-13,,,Actual,,,39512223
      Texas,48,2020-3-19,-4,,,Actual,,,28995881
      Massachusetts,25,2020-3-19,-19,,,Actual,,,6892503
      Florida,12,2020-3-19,-5,,,Actual,,,21477737
      Illinois,17,2020-3-19,-19,,,Actual,,,12671821
      Pennsylvania,42,2020-3-19,-19,,,Actual,,,12801989
      Michigan,26,2020-3-19,-17,,,Actual,,,9986857
      Connecticut,9,2020-3-19,-4,,,Actual,,,3565287
      Louisiana,22,2020-3-19,0,-25,0,Actual,3.4,10,4648794
      Georgia,13,2020-3-19,1,-27,0.73,Actual,3.8,10,10617423
      Arizona,4,2020-3-19,-7,,,Actual,,,7278717
      Ohio,39,2020-3-19,-21,,,Actual,,,11689100
      Maryland,24,2020-3-19,-25,,,Actual,,,6045680
      Indiana,18,2020-3-19,-20,,,Actual,,,6732219
      Virginia,51,2020-3-19,-10,,,Actual,,,8535519
      North Carolina,37,2020-3-19,-12,,,Actual,,,10488084
      South Carolina,45,2020-3-19,-10,,,Actual,,,5148714
      Mississippi,28,2020-3-19,-8,,,Actual,,,2976149
      Colorado,8,2020-3-19,-4,,,Actual,,,5758736
      Alabama,1,2020-3-19,-10,,,Actual,,,4903185
      Minnesota,27,2020-3-19,-26,,,Actual,,,5639632
      Washington,53,2020-3-19,2,-37.3333333333333,1.28666666666667,Actual,9.2,73,7614893
      Missouri,29,2020-3-19,-26,,,Actual,,,6137428
      Tennessee,47,2020-3-19,-25,,,Actual,,,6829174
      Rhode Island,44,2020-3-19,-29,,,Actual,,,1059361
      Wisconsin,55,2020-3-19,-8,,,Actual,,,5822434
      Nevada,32,2020-3-19,-25,,,Actual,,,3080156
      Iowa,19,2020-3-19,-16,,,Actual,,,3155070
      Oklahoma,40,2020-3-19,-22,,,Actual,,,3956971
      Kentucky,21,2020-3-19,-12,,,Actual,,,4467673
      New York,36,2020-3-20,-9,,,Actual,,,26161672
      New Jersey,34,2020-3-20,-13,,,Actual,,,8882190
      California,6,2020-3-20,-12,,,Actual,,,39512223
      Texas,48,2020-3-20,-3,,,Actual,,,28995881
      Massachusetts,25,2020-3-20,-18,,,Actual,,,6892503
      Florida,12,2020-3-20,-4,,,Actual,,,21477737
      Illinois,17,2020-3-20,-18,,,Actual,,,12671821
      Pennsylvania,42,2020-3-20,-18,,,Actual,,,12801989
      Michigan,26,2020-3-20,-16,,,Actual,,,9986857
      Connecticut,9,2020-3-20,-3,,,Actual,,,3565287
      Louisiana,22,2020-3-20,1,-31.3333333333333,0.686666666666667,Actual,3.2,14,4648794
      Georgia,13,2020-3-20,2,-28.6666666666667,1.44333333333333,Actual,4.8,14,10617423
      Arizona,4,2020-3-20,-6,,,Actual,,,7278717
      Ohio,39,2020-3-20,-20,,,Actual,,,11689100
      Maryland,24,2020-3-20,-24,,,Actual,,,6045680
      Indiana,18,2020-3-20,-19,,,Actual,,,6732219
      Virginia,51,2020-3-20,-9,,,Actual,,,8535519
      North Carolina,37,2020-3-20,-11,,,Actual,,,10488084
      South Carolina,45,2020-3-20,-9,,,Actual,,,5148714
      Mississippi,28,2020-3-20,-7,,,Actual,,,2976149
      Colorado,8,2020-3-20,-3,,,Actual,,,5758736
      Alabama,1,2020-3-20,-9,,,Actual,,,4903185
      Minnesota,27,2020-3-20,-25,,,Actual,,,5639632
      Washington,53,2020-3-20,3,-38.6666666666667,1.9,Actual,8.4,83,7614893
      Missouri,29,2020-3-20,-25,,,Actual,,,6137428
      Tennessee,47,2020-3-20,-24,,,Actual,,,6829174
      Rhode Island,44,2020-3-20,-28,,,Actual,,,1059361
      Wisconsin,55,2020-3-20,-7,,,Actual,,,5822434
      Nevada,32,2020-3-20,-24,,,Actual,,,3080156
      Iowa,19,2020-3-20,-15,,,Actual,,,3155070
      Oklahoma,40,2020-3-20,-21,,,Actual,,,3956971
      Kentucky,21,2020-3-20,-11,,,Actual,,,4467673
      New York,36,2020-3-21,-8,,,Actual,,,26161672
      New Jersey,34,2020-3-21,-12,,,Actual,,,8882190
      California,6,2020-3-21,-11,,,Actual,,,39512223
      Texas,48,2020-3-21,-2,,,Actual,,,28995881
      Massachusetts,25,2020-3-21,-17,,,Actual,,,6892503
      Florida,12,2020-3-21,-3,,,Actual,,,21477737
      Illinois,17,2020-3-21,-17,,,Actual,,,12671821
      Pennsylvania,42,2020-3-21,-17,,,Actual,,,12801989
      Michigan,26,2020-3-21,-15,,,Actual,,,9986857
      Connecticut,9,2020-3-21,-2,,,Actual,,,3565287
      Louisiana,22,2020-3-21,2,-34,1.34666666666667,Actual,5.8,20,4648794
      Georgia,13,2020-3-21,3,-25.3333333333333,2.19,Actual,4.4,20,10617423
      Arizona,4,2020-3-21,-5,,,Actual,,,7278717
      Ohio,39,2020-3-21,-19,,,Actual,,,11689100
      Maryland,24,2020-3-21,-23,,,Actual,,,6045680
      Indiana,18,2020-3-21,-18,,,Actual,,,6732219
      Virginia,51,2020-3-21,-8,,,Actual,,,8535519
      North Carolina,37,2020-3-21,-10,,,Actual,,,10488084
      South Carolina,45,2020-3-21,-8,,,Actual,,,5148714
      Mississippi,28,2020-3-21,-6,,,Actual,,,2976149
      Colorado,8,2020-3-21,-2,,,Actual,,,5758736
      Alabama,1,2020-3-21,-8,,,Actual,,,4903185
      Minnesota,27,2020-3-21,-24,,,Actual,,,5639632
      Washington,53,2020-3-21,4,-36,2.54,Actual,8.4,94,7614893
      Missouri,29,2020-3-21,-24,,,Actual,,,6137428
      Tennessee,47,2020-3-21,-23,,,Actual,,,6829174
      Rhode Island,44,2020-3-21,-27,,,Actual,,,1059361
      Wisconsin,55,2020-3-21,-6,,,Actual,,,5822434
      Nevada,32,2020-3-21,-23,,,Actual,,,3080156
      Iowa,19,2020-3-21,-14,,,Actual,,,3155070
      Oklahoma,40,2020-3-21,-20,,,Actual,,,3956971
      Kentucky,21,2020-3-21,-10,,,Actual,,,4467673
      New York,36,2020-3-22,-7,,,Actual,,,26161672
      New Jersey,34,2020-3-22,-11,,,Actual,,,8882190
      California,6,2020-3-22,-10,,,Actual,,,39512223
      Texas,48,2020-3-22,-1,,,Actual,,,28995881
      Massachusetts,25,2020-3-22,-16,,,Actual,,,6892503
      Florida,12,2020-3-22,-2,,,Actual,,,21477737
      Illinois,17,2020-3-22,-16,,,Actual,,,12671821
      Pennsylvania,42,2020-3-22,-16,,,Actual,,,12801989
      Michigan,26,2020-3-22,-14,,,Actual,,,9986857
      Connecticut,9,2020-3-22,-1,,,Actual,,,3565287
      Louisiana,22,2020-3-22,3,-36,1.98666666666667,Actual,7.2,20,4648794
      Georgia,13,2020-3-22,4,-36.6666666666667,2.82333333333333,Actual,4.4,25,10617423
      Arizona,4,2020-3-22,-4,,,Actual,,,7278717
      Ohio,39,2020-3-22,-18,,,Actual,,,11689100
      Maryland,24,2020-3-22,-22,,,Actual,,,6045680
      Indiana,18,2020-3-22,-17,,,Actual,,,6732219
      Virginia,51,2020-3-22,-7,,,Actual,,,8535519
      North Carolina,37,2020-3-22,-9,,,Actual,,,10488084
      South Carolina,45,2020-3-22,-7,,,Actual,,,5148714
      Mississippi,28,2020-3-22,-5,,,Actual,,,2976149
      Colorado,8,2020-3-22,-1,,,Actual,,,5758736
      Alabama,1,2020-3-22,-7,,,Actual,,,4903185
      Minnesota,27,2020-3-22,-23,,,Actual,,,5639632
      Washington,53,2020-3-22,5,-38,3.16,Actual,8.6,97,7614893
      Missouri,29,2020-3-22,-23,,,Actual,,,6137428
      Tennessee,47,2020-3-22,-22,,,Actual,,,6829174
      Rhode Island,44,2020-3-22,-26,,,Actual,,,1059361
      Wisconsin,55,2020-3-22,-5,,,Actual,,,5822434
      Nevada,32,2020-3-22,-22,,,Actual,,,3080156
      Iowa,19,2020-3-22,-13,,,Actual,,,3155070
      Oklahoma,40,2020-3-22,-19,,,Actual,,,3956971
      Kentucky,21,2020-3-22,-9,,,Actual,,,4467673
      New York,36,2020-3-23,-6,,,Actual,,,26161672
      New Jersey,34,2020-3-23,-10,,,Actual,,,8882190
      California,6,2020-3-23,-9,,,Actual,,,39512223
      Texas,48,2020-3-23,0,-33.6666666666667,0,Actual,2.8,10,28995881
      Massachusetts,25,2020-3-23,-15,,,Actual,,,6892503
      Florida,12,2020-3-23,-1,,,Actual,,,21477737
      Illinois,17,2020-3-23,-15,,,Actual,,,12671821
      Pennsylvania,42,2020-3-23,-15,,,Actual,,,12801989
      Michigan,26,2020-3-23,-13,,,Actual,,,9986857
      Connecticut,9,2020-3-23,0,-48.3333333333333,0,Actual,3,10,3565287
      Louisiana,22,2020-3-23,4,-36,2.62666666666667,Actual,10.2,35,4648794
      Georgia,13,2020-3-23,5,-38.6666666666667,3.43666666666667,Actual,5.2,25,10617423
      Arizona,4,2020-3-23,-3,,,Actual,,,7278717
      Ohio,39,2020-3-23,-17,,,Actual,,,11689100
      Maryland,24,2020-3-23,-21,,,Actual,,,6045680
      Indiana,18,2020-3-23,-16,,,Actual,,,6732219
      Virginia,51,2020-3-23,-6,,,Actual,,,8535519
      North Carolina,37,2020-3-23,-8,,,Actual,,,10488084
      South Carolina,45,2020-3-23,-6,,,Actual,,,5148714
      Mississippi,28,2020-3-23,-4,,,Actual,,,2976149
      Colorado,8,2020-3-23,0,-39.6666666666667,0,Actual,3,7,5758736
      Alabama,1,2020-3-23,-6,,,Actual,,,4903185
      Minnesota,27,2020-3-23,-22,,,Actual,,,5639632
      Washington,53,2020-3-23,6,-43.3333333333333,3.72666666666667,Actual,10,109,7614893
      Missouri,29,2020-3-23,-22,,,Actual,,,6137428
      Tennessee,47,2020-3-23,-21,,,Actual,,,6829174
      Rhode Island,44,2020-3-23,-25,,,Actual,,,1059361
      Wisconsin,55,2020-3-23,-4,,,Actual,,,5822434
      Nevada,32,2020-3-23,-21,,,Actual,,,3080156
      Iowa,19,2020-3-23,-12,,,Actual,,,3155070
      Oklahoma,40,2020-3-23,-18,,,Actual,,,3956971
      Kentucky,21,2020-3-23,-8,,,Actual,,,4467673
      New York,36,2020-3-24,-5,,,Actual,,,26161672
      New Jersey,34,2020-3-24,-9,,,Actual,,,8882190
      California,6,2020-3-24,-8,,,Actual,,,39512223
      Texas,48,2020-3-24,1,-34,0.66,Actual,3.8,15,28995881
      Massachusetts,25,2020-3-24,-14,,,Actual,,,6892503
      Florida,12,2020-3-24,0,-41,0,Actual,3.2,18,21477737
      Illinois,17,2020-3-24,-14,,,Actual,,,12671821
      Pennsylvania,42,2020-3-24,-14,,,Actual,,,12801989
      Michigan,26,2020-3-24,-12,,,Actual,,,9986857
      Connecticut,9,2020-3-24,1,-45.3333333333333,0.546666666666667,Actual,3.4,12,3565287
      Louisiana,22,2020-3-24,5,-40.3333333333333,3.22333333333333,Actual,12.6,46,4648794
      Georgia,13,2020-3-24,6,-38.6666666666667,4.05,Actual,5.6,32,10617423
      Arizona,4,2020-3-24,-2,,,Actual,,,7278717
      Ohio,39,2020-3-24,-16,,,Actual,,,11689100
      Maryland,24,2020-3-24,-20,,,Actual,,,6045680
      Indiana,18,2020-3-24,-15,,,Actual,,,6732219
      Virginia,51,2020-3-24,-5,,,Actual,,,8535519
      North Carolina,37,2020-3-24,-7,,,Actual,,,10488084
      South Carolina,45,2020-3-24,-5,,,Actual,,,5148714
      Mississippi,28,2020-3-24,-3,,,Actual,,,2976149
      Colorado,8,2020-3-24,1,-43,0.57,Actual,2.6,11,5758736
      Alabama,1,2020-3-24,-5,,,Actual,,,4903185
      Minnesota,27,2020-3-24,-21,,,Actual,,,5639632
      Washington,53,2020-3-24,7,-47.3333333333333,4.25333333333333,Actual,11.2,116,7614893
      Missouri,29,2020-3-24,-21,,,Actual,,,6137428
      Tennessee,47,2020-3-24,-20,,,Actual,,,6829174
      Rhode Island,44,2020-3-24,-24,,,Actual,,,1059361
      Wisconsin,55,2020-3-24,-3,,,Actual,,,5822434
      Nevada,32,2020-3-24,-20,,,Actual,,,3080156
      Iowa,19,2020-3-24,-11,,,Actual,,,3155070
      Oklahoma,40,2020-3-24,-17,,,Actual,,,3956971
      Kentucky,21,2020-3-24,-7,,,Actual,,,4467673
      New York,36,2020-3-25,-4,,,Actual,,,26161672
      New Jersey,34,2020-3-25,-8,,,Actual,,,8882190
      California,6,2020-3-25,-7,,,Actual,,,39512223
      Texas,48,2020-3-25,2,-40,1.26,Actual,5.2,19,28995881
      Massachusetts,25,2020-3-25,-13,,,Actual,,,6892503
      Florida,12,2020-3-25,1,-42,0.58,Actual,4.4,23,21477737
      Illinois,17,2020-3-25,-13,,,Actual,,,12671821
      Pennsylvania,42,2020-3-25,-13,,,Actual,,,12801989
      Michigan,26,2020-3-25,-11,,,Actual,,,9986857
      Connecticut,9,2020-3-25,2,-48.6666666666667,1.06,Actual,3.8,19,3565287
      Louisiana,22,2020-3-25,6,-39,3.83333333333333,Actual,19.8,65,4648794
      Georgia,13,2020-3-25,7,-38,4.67,Actual,7.8,40,10617423
      Arizona,4,2020-3-25,-1,,,Actual,,,7278717
      Ohio,39,2020-3-25,-15,,,Actual,,,11689100
      Maryland,24,2020-3-25,-19,,,Actual,,,6045680
      Indiana,18,2020-3-25,-14,,,Actual,,,6732219
      Virginia,51,2020-3-25,-4,,,Actual,,,8535519
      North Carolina,37,2020-3-25,-6,,,Actual,,,10488084
      South Carolina,45,2020-3-25,-4,,,Actual,,,5148714
      Mississippi,28,2020-3-25,-2,,,Actual,,,2976149
      Colorado,8,2020-3-25,2,-44.6666666666667,1.12333333333333,Actual,4.8,20,5758736
      Alabama,1,2020-3-25,-4,,,Actual,,,4903185
      Minnesota,27,2020-3-25,-20,,,Actual,,,5639632
      Washington,53,2020-3-25,8,-50,4.75333333333333,Actual,12,133,7614893
      Missouri,29,2020-3-25,-20,,,Actual,,,6137428
      Tennessee,47,2020-3-25,-19,,,Actual,,,6829174
      Rhode Island,44,2020-3-25,-23,,,Actual,,,1059361
      Wisconsin,55,2020-3-25,-2,,,Actual,,,5822434
      Nevada,32,2020-3-25,-19,,,Actual,,,3080156
      Iowa,19,2020-3-25,-10,,,Actual,,,3155070
      Oklahoma,40,2020-3-25,-16,,,Actual,,,3956971
      Kentucky,21,2020-3-25,-6,,,Actual,,,4467673
      New York,36,2020-3-26,-3,,,Actual,,,26161672
      New Jersey,34,2020-3-26,-7,,,Actual,,,8882190
      California,6,2020-3-26,-6,,,Actual,,,39512223
      Texas,48,2020-3-26,3,-40.6666666666667,1.85333333333333,Actual,5.8,25,28995881
      Massachusetts,25,2020-3-26,-12,,,Actual,,,6892503
      Florida,12,2020-3-26,2,-44.3333333333333,1.13666666666667,Actual,7.2,29,21477737
      Illinois,17,2020-3-26,-12,,,Actual,,,12671821
      Pennsylvania,42,2020-3-26,-12,,,Actual,,,12801989
      Michigan,26,2020-3-26,-10,,,Actual,,,9986857
      Connecticut,9,2020-3-26,3,-45.6666666666667,1.60333333333333,Actual,4.6,21,3565287
      Louisiana,22,2020-3-26,7,-40.3333333333333,4.43,Actual,20.4,83,4648794
      Georgia,13,2020-3-26,8,-40,5.27,Actual,8.8,48,10617423
      Arizona,4,2020-3-26,0,-37.3333333333333,0,Actual,2.6,8,7278717
      Ohio,39,2020-3-26,-14,,,Actual,,,11689100
      Maryland,24,2020-3-26,-18,,,Actual,,,6045680
      Indiana,18,2020-3-26,-13,,,Actual,,,6732219
      Virginia,51,2020-3-26,-3,,,Actual,,,8535519
      North Carolina,37,2020-3-26,-5,,,Actual,,,10488084
      South Carolina,45,2020-3-26,-3,,,Actual,,,5148714
      Mississippi,28,2020-3-26,-1,,,Actual,,,2976149
      Colorado,8,2020-3-26,3,-53.3333333333333,1.59,Actual,7.4,19,5758736
      Alabama,1,2020-3-26,-3,,,Actual,,,4903185
      Minnesota,27,2020-3-26,-19,,,Actual,,,5639632
      Washington,53,2020-3-26,9,-54.6666666666667,5.20666666666667,Actual,15.8,150,7614893
      Missouri,29,2020-3-26,-19,,,Actual,,,6137428
      Tennessee,47,2020-3-26,-18,,,Actual,,,6829174
      Rhode Island,44,2020-3-26,-22,,,Actual,,,1059361
      Wisconsin,55,2020-3-26,-1,,,Actual,,,5822434
      Nevada,32,2020-3-26,-18,,,Actual,,,3080156
      Iowa,19,2020-3-26,-9,,,Actual,,,3155070
      Oklahoma,40,2020-3-26,-15,,,Actual,,,3956971
      Kentucky,21,2020-3-26,-5,,,Actual,,,4467673
      New York,36,2020-3-27,-2,,,Actual,,,26161672
      New Jersey,34,2020-3-27,-6,,,Actual,,,8882190
      California,6,2020-3-27,-5,,,Actual,,,39512223
      Texas,48,2020-3-27,4,-42.6666666666667,2.42666666666667,Actual,6.4,34,28995881
      Massachusetts,25,2020-3-27,-11,,,Actual,,,6892503
      Florida,12,2020-3-27,3,-47.3333333333333,1.66333333333333,Actual,7.6,35,21477737
      Illinois,17,2020-3-27,-11,,,Actual,,,12671821
      Pennsylvania,42,2020-3-27,-11,,,Actual,,,12801989
      Michigan,26,2020-3-27,-9,,,Actual,,,9986857
      Connecticut,9,2020-3-27,4,-46.6666666666667,2.13666666666667,Actual,4.4,27,3565287
      Louisiana,22,2020-3-27,8,-43,5,Actual,21,119,4648794
      Georgia,13,2020-3-27,9,-40.6666666666667,5.86333333333333,Actual,9.59999999999999,64,10617423
      Arizona,4,2020-3-27,1,-39.3333333333333,0.606666666666667,Actual,2.4,13,7278717
      Ohio,39,2020-3-27,-13,,,Actual,,,11689100
      Maryland,24,2020-3-27,-17,,,Actual,,,6045680
      Indiana,18,2020-3-27,-12,,,Actual,,,6732219
      Virginia,51,2020-3-27,-2,,,Actual,,,8535519
      North Carolina,37,2020-3-27,-4,,,Actual,,,10488084
      South Carolina,45,2020-3-27,-2,,,Actual,,,5148714
      Mississippi,28,2020-3-27,0,-29,0,Actual,2.6,8,2976149
      Colorado,8,2020-3-27,4,-55.3333333333333,2.03666666666667,Actual,7.2,31,5758736
      Alabama,1,2020-3-27,-2,,,Actual,,,4903185
      Minnesota,27,2020-3-27,-18,,,Actual,,,5639632
      Washington,53,2020-3-27,10,-56,5.64666666666667,Actual,16.4,157,7614893
      Missouri,29,2020-3-27,-18,,,Actual,,,6137428
      Tennessee,47,2020-3-27,-17,,,Actual,,,6829174
      Rhode Island,44,2020-3-27,-21,,,Actual,,,1059361
      Wisconsin,55,2020-3-27,0,-44.3333333333333,0,Actual,2.6,14,5822434
      Nevada,32,2020-3-27,-17,,,Actual,,,3080156
      Iowa,19,2020-3-27,-8,,,Actual,,,3155070
      Oklahoma,40,2020-3-27,-14,,,Actual,,,3956971
      Kentucky,21,2020-3-27,-4,,,Actual,,,4467673
      New York,36,2020-3-28,-1,,,Actual,,,26161672
      New Jersey,34,2020-3-28,-5,,,Actual,,,8882190
      California,6,2020-3-28,-4,,,Actual,,,39512223
      Texas,48,2020-3-28,5,-40.6666666666667,3.02,Actual,7.6,39,28995881
      Massachusetts,25,2020-3-28,-10,,,Actual,,,6892503
      Florida,12,2020-3-28,4,-48,2.18333333333333,Actual,8,54,21477737
      Illinois,17,2020-3-28,-10,,,Actual,,,12671821
      Pennsylvania,42,2020-3-28,-10,,,Actual,,,12801989
      Michigan,26,2020-3-28,-8,,,Actual,,,9986857
      Connecticut,9,2020-3-28,5,-46,2.67666666666667,Actual,3.4,33,3565287
      Louisiana,22,2020-3-28,9,-42,5.58,Actual,24,137,4648794
      Georgia,13,2020-3-28,10,-36.6666666666667,6.49666666666667,Actual,9.4,69,10617423
      Arizona,4,2020-3-28,2,-35.6666666666667,1.25,Actual,2.8,15,7278717
      Ohio,39,2020-3-28,-12,,,Actual,,,11689100
      Maryland,24,2020-3-28,-16,,,Actual,,,6045680
      Indiana,18,2020-3-28,-11,,,Actual,,,6732219
      Virginia,51,2020-3-28,-1,,,Actual,,,8535519
      North Carolina,37,2020-3-28,-3,,,Actual,,,10488084
      South Carolina,45,2020-3-28,-1,,,Actual,,,5148714
      Mississippi,28,2020-3-28,1,-28,0.72,Actual,2.6,13,2976149
      Colorado,8,2020-3-28,5,-51.6666666666667,2.52,Actual,6.2,44,5758736
      Alabama,1,2020-3-28,-1,,,Actual,,,4903185
      Minnesota,27,2020-3-28,-17,,,Actual,,,5639632
      Washington,53,2020-3-28,11,-50.3333333333333,6.14333333333333,Actual,14.4,188,7614893
      Missouri,29,2020-3-28,-17,,,Actual,,,6137428
      Tennessee,47,2020-3-28,-16,,,Actual,,,6829174
      Rhode Island,44,2020-3-28,-20,,,Actual,,,1059361
      Wisconsin,55,2020-3-28,1,-45,0.55,Actual,2.6,17,5822434
      Nevada,32,2020-3-28,-16,,,Actual,,,3080156
      Iowa,19,2020-3-28,-7,,,Actual,,,3155070
      Oklahoma,40,2020-3-28,-13,,,Actual,,,3956971
      Kentucky,21,2020-3-28,-3,,,Actual,,,4467673
      New York,36,2020-3-29,0,-58.6666666666667,0,Actual,466.4,2031,26161672
      New Jersey,34,2020-3-29,-4,,,Actual,,,8882190
      California,6,2020-3-29,-3,,,Actual,,,39512223
      Texas,48,2020-3-29,6,-42.6666666666667,3.59333333333333,Actual,8.6,47,28995881
      Massachusetts,25,2020-3-29,-9,,,Actual,,,6892503
      Florida,12,2020-3-29,5,-51.3333333333333,2.67,Actual,11.2,56,21477737
      Illinois,17,2020-3-29,-9,,,Actual,,,12671821
      Pennsylvania,42,2020-3-29,-9,,,Actual,,,12801989
      Michigan,26,2020-3-29,-7,,,Actual,,,9986857
      Connecticut,9,2020-3-29,6,-52.6666666666667,3.15,Actual,9.6,34,3565287
      Louisiana,22,2020-3-29,10,-43,6.15,Actual,31.2,151,4648794
      Georgia,13,2020-3-29,11,-43.6666666666667,7.06,Actual,12.6,80,10617423
      Arizona,4,2020-3-29,3,-38,1.87,Actual,3.4,17,7278717
      Ohio,39,2020-3-29,-11,,,Actual,,,11689100
      Maryland,24,2020-3-29,-15,,,Actual,,,6045680
      Indiana,18,2020-3-29,-10,,,Actual,,,6732219
      Virginia,51,2020-3-29,0,-41.6666666666667,0,Actual,3.4,20,8535519
      North Carolina,37,2020-3-29,-2,,,Actual,,,10488084
      South Carolina,45,2020-3-29,0,-35.3333333333333,0,Actual,2.6,16,5148714
      Mississippi,28,2020-3-29,2,-30.3333333333333,1.41666666666667,Actual,2.8,14,2976149
      Colorado,8,2020-3-29,6,-50.3333333333333,3.01666666666667,Actual,10,47,5758736
      Alabama,1,2020-3-29,0,-34.3333333333333,0,Actual,4.4,10,4903185
      Minnesota,27,2020-3-29,-16,,,Actual,,,5639632
      Washington,53,2020-3-29,12,-48.3333333333333,6.66,Actual,15,198,7614893
      Missouri,29,2020-3-29,-16,,,Actual,,,6137428
      Tennessee,47,2020-3-29,-15,,,Actual,,,6829174
      Rhode Island,44,2020-3-29,-19,,,Actual,,,1059361
      Wisconsin,55,2020-3-29,2,-46.3333333333333,1.08666666666667,Actual,3,18,5822434
      Nevada,32,2020-3-29,-15,,,Actual,,,3080156
      Iowa,19,2020-3-29,-6,,,Actual,,,3155070
      Oklahoma,40,2020-3-29,-12,,,Actual,,,3956971
      Kentucky,21,2020-3-29,-2,,,Actual,,,4467673
      New York,36,2020-3-30,1,-61.3333333333333,0.386666666666667,Actual,549.8,2585,26161672
      New Jersey,34,2020-3-30,-3,,,Actual,,,8882190
      California,6,2020-3-30,-2,,,Actual,,,39512223
      Texas,48,2020-3-30,7,-44,4.15333333333333,Actual,10.2,57,28995881
      Massachusetts,25,2020-3-30,-8,,,Actual,,,6892503
      Florida,12,2020-3-30,6,-46.6666666666667,3.20333333333333,Actual,10.4,63,21477737
      Illinois,17,2020-3-30,-8,,,Actual,,,12671821
      Pennsylvania,42,2020-3-30,-8,,,Actual,,,12801989
      Michigan,26,2020-3-30,-6,,,Actual,,,9986857
      Connecticut,9,2020-3-30,7,-48.3333333333333,3.66666666666667,Actual,11.6,36,3565287
      Louisiana,22,2020-3-30,11,-42.3333333333333,6.72666666666667,Actual,30.8,185,4648794
      Georgia,13,2020-3-30,12,-41.6666666666667,7.64333333333333,Actual,15,87,10617423
      Arizona,4,2020-3-30,4,-36.3333333333333,2.50666666666667,Actual,3.8,20,7278717
      Ohio,39,2020-3-30,-10,,,Actual,,,11689100
      Maryland,24,2020-3-30,-14,,,Actual,,,6045680
      Indiana,18,2020-3-30,-9,,,Actual,,,6732219
      Virginia,51,2020-3-30,1,-41.6666666666667,0.583333333333333,Actual,4.8,15,8535519
      North Carolina,37,2020-3-30,-1,,,Actual,,,10488084
      South Carolina,45,2020-3-30,1,-32,0.68,Actual,2.6,18,5148714
      Mississippi,28,2020-3-30,3,-27.6666666666667,2.14,Actual,2.8,16,2976149
      Colorado,8,2020-3-30,7,-50,3.51666666666667,Actual,9.6,51,5758736
      Alabama,1,2020-3-30,1,-32,0.68,Actual,4.6,10,4903185
      Minnesota,27,2020-3-30,-15,,,Actual,,,5639632
      Washington,53,2020-3-30,13,-53.6666666666667,7.12333333333333,Actual,15.4,205,7614893
      Missouri,29,2020-3-30,-15,,,Actual,,,6137428
      Tennessee,47,2020-3-30,-14,,,Actual,,,6829174
      Rhode Island,44,2020-3-30,-18,,,Actual,,,1059361
      Wisconsin,55,2020-3-30,3,-41.6666666666667,1.67,Actual,2.6,20,5822434
      Nevada,32,2020-3-30,-14,,,Actual,,,3080156
      Iowa,19,2020-3-30,-5,,,Actual,,,3155070
      Oklahoma,40,2020-3-30,-11,,,Actual,,,3956971
      Kentucky,21,2020-3-30,-1,,,Actual,,,4467673
      New York,36,2020-3-31,2,-61.6666666666667,0.77,Actual,642.4,3244,26161672
      New Jersey,34,2020-3-31,-2,,,Actual,,,8882190
      California,6,2020-3-31,-1,,,Actual,,,39512223
      Texas,48,2020-3-31,8,-40.3333333333333,4.75,Actual,12.2,68,28995881
      Massachusetts,25,2020-3-31,-7,,,Actual,,,6892503
      Florida,12,2020-3-31,7,-46.3333333333333,3.74,Actual,22,85,21477737
      Illinois,17,2020-3-31,-7,,,Actual,,,12671821
      Pennsylvania,42,2020-3-31,-7,,,Actual,,,12801989
      Michigan,26,2020-3-31,-5,,,Actual,,,9986857
      Connecticut,9,2020-3-31,8,-48,4.18666666666667,Actual,15.8,69,3565287
      Louisiana,22,2020-3-31,12,-41.3333333333333,7.31333333333334,Actual,34.6,239,4648794
      Georgia,13,2020-3-31,13,-43.3333333333333,8.21,Actual,18.8,111,10617423
      Arizona,4,2020-3-31,5,-37.3333333333333,3.13333333333333,Actual,4,25,7278717
      Ohio,39,2020-3-31,-9,,,Actual,,,11689100
      Maryland,24,2020-3-31,-13,,,Actual,,,6045680
      Indiana,18,2020-3-31,-8,,,Actual,,,6732219
      Virginia,51,2020-3-31,2,-46.3333333333333,1.12,Actual,5.6,27,8535519
      North Carolina,37,2020-3-31,0,-43.3333333333333,0,Actual,3.2,12,10488084
      South Carolina,45,2020-3-31,2,-32.6666666666667,1.35333333333333,Actual,3.2,22,5148714
      Mississippi,28,2020-3-31,4,-27.6666666666667,2.86333333333333,Actual,2.6,20,2976149
      Colorado,8,2020-3-31,8,-48.3333333333333,4.03333333333333,Actual,10.6,69,5758736
      Alabama,1,2020-3-31,2,-34,1.34,Actual,5.6,23,4903185
      Minnesota,27,2020-3-31,-14,,,Actual,,,5639632
      Washington,53,2020-3-31,14,-52.6666666666667,7.59666666666667,Actual,16.6,225,7614893
      Missouri,29,2020-3-31,-14,,,Actual,,,6137428
      Tennessee,47,2020-3-31,-13,,,Actual,,,6829174
      Rhode Island,44,2020-3-31,-17,,,Actual,,,1059361
      Wisconsin,55,2020-3-31,4,-42,2.25,Actual,4.2,25,5822434
      Nevada,32,2020-3-31,-13,,,Actual,,,3080156
      Iowa,19,2020-3-31,-4,,,Actual,,,3155070
      Oklahoma,40,2020-3-31,-10,,,Actual,,,3956971
      Kentucky,21,2020-3-31,0,-37,0,Actual,4.4,11,4467673
      New York,36,2020-4-1,3,-60,1.17,Actual,697.6,3976,26161672
      New Jersey,34,2020-4-1,-1,,,Actual,,,8882190
      California,6,2020-4-1,0,-47.3333333333333,0,Actual,28.2,199,39512223
      Texas,48,2020-4-1,9,-39.3333333333333,5.35666666666667,Actual,14.2,85,28995881
      Massachusetts,25,2020-4-1,-6,,,Actual,,,6892503
      Florida,12,2020-4-1,8,-45,4.29,Actual,22.8,87,21477737
      Illinois,17,2020-4-1,-6,,,Actual,,,12671821
      Pennsylvania,42,2020-4-1,-6,,,Actual,,,12801989
      Michigan,26,2020-4-1,-4,,,Actual,,,9986857
      Connecticut,9,2020-4-1,9,-46.6666666666667,4.72,Actual,19.4,85,3565287
      Louisiana,22,2020-4-1,13,-38.3333333333333,7.93,Actual,43.8,273,4648794
      Georgia,13,2020-4-1,14,-40.3333333333333,8.80666666666667,Actual,20.8,139,10617423
      Arizona,4,2020-4-1,6,-40.6666666666667,3.72666666666667,Actual,5.4,32,7278717
      Ohio,39,2020-4-1,-8,,,Actual,,,11689100
      Maryland,24,2020-4-1,-12,,,Actual,,,6045680
      Indiana,18,2020-4-1,-7,,,Actual,,,6732219
      Virginia,51,2020-4-1,3,-45.6666666666667,1.66333333333333,Actual,5.2,34,8535519
      North Carolina,37,2020-4-1,1,-42.6666666666667,0.573333333333333,Actual,4,14,10488084
      South Carolina,45,2020-4-1,3,-32,2.03333333333333,Actual,3.6,26,5148714
      Mississippi,28,2020-4-1,5,-23,3.63333333333333,Actual,3,22,2976149
      Colorado,8,2020-4-1,9,-49.6666666666667,4.53666666666667,Actual,12.8,79,5758736
      Alabama,1,2020-4-1,3,-28,2.06,Actual,5.6,27,4903185
      Minnesota,27,2020-4-1,-13,,,Actual,,,5639632
      Washington,53,2020-4-1,15,-51.3333333333333,8.08333333333333,Actual,18.6,234,7614893
      Missouri,29,2020-4-1,-13,,,Actual,,,6137428
      Tennessee,47,2020-4-1,-12,,,Actual,,,6829174
      Rhode Island,44,2020-4-1,-16,,,Actual,,,1059361
      Wisconsin,55,2020-4-1,5,-39.3333333333333,2.85666666666667,Actual,6.6,27,5822434
      Nevada,32,2020-4-1,-12,,,Actual,,,3080156
      Iowa,19,2020-4-1,-3,,,Actual,,,3155070
      Oklahoma,40,2020-4-1,-9,,,Actual,,,3956971
      Kentucky,21,2020-4-1,1,-35,0.65,Actual,5,18,4467673
      New York,36,2020-4-2,4,-61.6666666666667,1.55333333333333,Actual,705,4813,26161672
      New Jersey,34,2020-4-2,0,-59.6666666666667,0,Actual,158.2,681,8882190
      California,6,2020-4-2,1,-49.3333333333333,0.506666666666667,Actual,28.6,238,39512223
      Texas,48,2020-4-2,10,-43.3333333333333,5.92333333333333,Actual,15.6,100,28995881
      Massachusetts,25,2020-4-2,-5,,,Actual,,,6892503
      Florida,12,2020-4-2,9,-46.6666666666667,4.82333333333333,Actual,26.4,164,21477737
      Illinois,17,2020-4-2,-5,,,Actual,,,12671821
      Pennsylvania,42,2020-4-2,-5,,,Actual,,,12801989
      Michigan,26,2020-4-2,-3,,,Actual,,,9986857
      Connecticut,9,2020-4-2,10,-49.6666666666667,5.22333333333333,Actual,25.8,112,3565287
      Louisiana,22,2020-4-2,14,-42.3333333333333,8.50666666666667,Actual,44.8,310,4648794
      Georgia,13,2020-4-2,15,-40.6666666666667,9.4,Actual,22.8,163,10617423
      Arizona,4,2020-4-2,7,-41.6666666666667,4.31,Actual,6.4,35,7278717
      Ohio,39,2020-4-2,-7,,,Actual,,,11689100
      Maryland,24,2020-4-2,-11,,,Actual,,,6045680
      Indiana,18,2020-4-2,-6,,,Actual,,,6732219
      Virginia,51,2020-4-2,4,-46.3333333333333,2.2,Actual,7.4,41,8535519
      North Carolina,37,2020-4-2,2,-43,1.14333333333333,Actual,5.4,21,10488084
      South Carolina,45,2020-4-2,4,-34.3333333333333,2.69,Actual,4.4,31,5148714
      Mississippi,28,2020-4-2,6,-26.3333333333333,4.37,Actual,3.8,26,2976149
      Colorado,8,2020-4-2,10,-55.6666666666667,4.98,Actual,15,97,5758736
      Alabama,1,2020-4-2,4,-32,2.74,Actual,6.8,32,4903185
      Minnesota,27,2020-4-2,-12,,,Actual,,,5639632
      Washington,53,2020-4-2,16,-53.6666666666667,8.54666666666667,Actual,22,271,7614893
      Missouri,29,2020-4-2,-12,,,Actual,,,6137428
      Tennessee,47,2020-4-2,-11,,,Actual,,,6829174
      Rhode Island,44,2020-4-2,-15,,,Actual,,,1059361
      Wisconsin,55,2020-4-2,6,-40,3.45666666666667,Actual,6.8,38,5822434
      Nevada,32,2020-4-2,-11,,,Actual,,,3080156
      Iowa,19,2020-4-2,-2,,,Actual,,,3155070
      Oklahoma,40,2020-4-2,-8,,,Actual,,,3956971
      Kentucky,21,2020-4-2,2,-36.3333333333333,1.28666666666667,Actual,5.8,31,4467673
      New York,36,2020-4-3,5,-63,1.92333333333333,Actual,737.6,5519,26161672
      New Jersey,34,2020-4-3,1,-63,0.37,Actual,163.8,817,8882190
      California,6,2020-4-3,2,-48.6666666666667,1.02,Actual,35,265,39512223
      Texas,48,2020-4-3,11,-45.3333333333333,6.47,Actual,19,118,28995881
      Massachusetts,25,2020-4-3,-4,,,Actual,,,6892503
      Florida,12,2020-4-3,10,-51.3333333333333,5.31,Actual,27.2,170,21477737
      Illinois,17,2020-4-3,-4,,,Actual,,,12671821
      Pennsylvania,42,2020-4-3,-4,,,Actual,,,12801989
      Michigan,26,2020-4-3,-2,,,Actual,,,9986857
      Connecticut,9,2020-4-3,11,-52.3333333333333,5.7,Actual,24,131,3565287
      Louisiana,22,2020-4-3,15,-44,9.06666666666667,Actual,47.6,370,4648794
      Georgia,13,2020-4-3,16,-45,9.95,Actual,20,184,10617423
      Arizona,4,2020-4-3,8,-41.6666666666667,4.89333333333333,Actual,7.8,44,7278717
      Ohio,39,2020-4-3,-6,,,Actual,,,11689100
      Maryland,24,2020-4-3,-10,,,Actual,,,6045680
      Indiana,18,2020-4-3,-5,,,Actual,,,6732219
      Virginia,51,2020-4-3,5,-46,2.74,Actual,5,46,8535519
      North Carolina,37,2020-4-3,3,-41.3333333333333,1.73,Actual,5.2,27,10488084
      South Carolina,45,2020-4-3,5,-35.3333333333333,3.33666666666667,Actual,4.4,34,5148714
      Mississippi,28,2020-4-3,7,-32,5.05,Actual,4.6,29,2976149
      Colorado,8,2020-4-3,11,-53.6666666666667,5.44333333333333,Actual,14.2,111,5758736
      Alabama,1,2020-4-3,5,-32.6666666666667,3.41333333333333,Actual,4.4,38,4903185
      Minnesota,27,2020-4-3,-11,,,Actual,,,5639632
      Washington,53,2020-4-3,17,-54,9.00666666666667,Actual,22.2,291,7614893
      Missouri,29,2020-4-3,-11,,,Actual,,,6137428
      Tennessee,47,2020-4-3,-10,,,Actual,,,6829174
      Rhode Island,44,2020-4-3,-14,,,Actual,,,1059361
      Wisconsin,55,2020-4-3,7,-41.6666666666667,4.04,Actual,9.8,51,5822434
      Nevada,32,2020-4-3,-10,,,Actual,,,3080156
      Iowa,19,2020-4-3,-1,,,Actual,,,3155070
      Oklahoma,40,2020-4-3,-7,,,Actual,,,3956971
      Kentucky,21,2020-4-3,3,-36.6666666666667,1.92,Actual,6.8,34,4467673
      New York,36,2020-4-4,6,-56.6666666666667,2.35666666666667,Actual,797.2,6110,26161672
      New Jersey,34,2020-4-4,2,-57,0.8,Actual,172.2,1059,8882190
      California,6,2020-4-4,3,-47.6666666666667,1.54333333333333,Actual,36.2,289,39512223
      Texas,48,2020-4-4,12,-47,7,Actual,19.4,135,28995881
      Massachusetts,25,2020-4-4,-3,,,Actual,,,6892503
      Florida,12,2020-4-4,11,-52.3333333333333,5.78666666666667,Actual,29.8,195,21477737
      Illinois,17,2020-4-4,-3,,,Actual,,,12671821
      Pennsylvania,42,2020-4-4,-3,,,Actual,,,12801989
      Michigan,26,2020-4-4,-1,,,Actual,,,9986857
      Connecticut,9,2020-4-4,12,-46,6.24,Actual,24.2,165,3565287
      Louisiana,22,2020-4-4,16,-46,9.60666666666667,Actual,47.8,409,4648794
      Georgia,13,2020-4-4,17,-46.3333333333333,10.4866666666667,Actual,18,201,10617423
      Arizona,4,2020-4-4,9,-40.3333333333333,5.49,Actual,6.6,52,7278717
      Ohio,39,2020-4-4,-5,,,Actual,,,11689100
      Maryland,24,2020-4-4,-9,,,Actual,,,6045680
      Indiana,18,2020-4-4,-4,,,Actual,,,6732219
      Virginia,51,2020-4-4,6,-43.3333333333333,3.30666666666667,Actual,6.4,52,8535519
      North Carolina,37,2020-4-4,4,-40.3333333333333,2.32666666666667,Actual,6.2,34,10488084
      South Carolina,45,2020-4-4,6,-36.6666666666667,3.97,Actual,4.4,40,5148714
      Mississippi,28,2020-4-4,8,-38.3333333333333,5.66666666666667,Actual,5.8,35,2976149
      Colorado,8,2020-4-4,12,-49,5.95333333333333,Actual,14.2,126,5758736
      Alabama,1,2020-4-4,6,-33.3333333333333,4.08,Actual,4.4,44,4903185
      Minnesota,27,2020-4-4,-10,,,Actual,,,5639632
      Washington,53,2020-4-4,18,-48,9.52666666666667,Actual,29.4,315,7614893
      Missouri,29,2020-4-4,-10,,,Actual,,,6137428
      Tennessee,47,2020-4-4,-9,,,Actual,,,6829174
      Rhode Island,44,2020-4-4,-13,,,Actual,,,1059361
      Wisconsin,55,2020-4-4,8,-38.6666666666667,4.65333333333333,Actual,10.2,54,5822434
      Nevada,32,2020-4-4,-9,,,Actual,,,3080156
      Iowa,19,2020-4-4,0,-31,0,Actual,3.2,14,3155070
      Oklahoma,40,2020-4-4,-6,,,Actual,,,3956971
      Kentucky,21,2020-4-4,4,-33.6666666666667,2.58333333333333,Actual,5.4,40,4467673
      New York,36,2020-4-5,7,-58,2.77666666666667,Actual,846,6932,26161672
      New Jersey,34,2020-4-5,3,-59.3333333333333,1.20666666666667,Actual,190.4,1185,8882190
      California,6,2020-4-5,4,-51.3333333333333,2.03,Actual,38.8,348,39512223
      Texas,48,2020-4-5,13,-46.6666666666667,7.53333333333333,Actual,19,163,28995881
      Massachusetts,25,2020-4-5,-2,,,Actual,,,6892503
      Florida,12,2020-4-5,12,-57.3333333333333,6.21333333333333,Actual,23.8,221,21477737
      Illinois,17,2020-4-5,-2,,,Actual,,,12671821
      Pennsylvania,42,2020-4-5,-2,,,Actual,,,12801989
      Michigan,26,2020-4-5,0,-50.6666666666667,0,Actual,92.8,675,9986857
      Connecticut,9,2020-4-5,13,-49.6666666666667,6.74333333333333,Actual,33,189,3565287
      Louisiana,22,2020-4-5,17,-45.6666666666667,10.15,Actual,54.4,477,4648794
      Georgia,13,2020-4-5,18,-50.3333333333333,10.9833333333333,Actual,33.2,211,10617423
      Arizona,4,2020-4-5,10,-42.3333333333333,6.06666666666667,Actual,7.6,64,7278717
      Ohio,39,2020-4-5,-4,,,Actual,,,11689100
      Maryland,24,2020-4-5,-8,,,Actual,,,6045680
      Indiana,18,2020-4-5,-3,,,Actual,,,6732219
      Virginia,51,2020-4-5,7,-46.3333333333333,3.84333333333333,Actual,5,52,8535519
      North Carolina,37,2020-4-5,5,-45.3333333333333,2.87333333333333,Actual,6.4,38,10488084
      South Carolina,45,2020-4-5,7,-40.3333333333333,4.56666666666667,Actual,4,44,5148714
      Mississippi,28,2020-4-5,9,-38.3333333333333,6.28333333333333,Actual,6.8,43,2976149
      Colorado,8,2020-4-5,13,-48.6666666666667,6.46666666666667,Actual,16.4,140,5758736
      Alabama,1,2020-4-5,7,-42,4.66,Actual,6.4,45,4903185
      Minnesota,27,2020-4-5,-9,,,Actual,,,5639632
      Washington,53,2020-4-5,19,-48,10.0466666666667,Actual,25.8,336,7614893
      Missouri,29,2020-4-5,-9,,,Actual,,,6137428
      Tennessee,47,2020-4-5,-8,,,Actual,,,6829174
      Rhode Island,44,2020-4-5,-12,,,Actual,,,1059361
      Wisconsin,55,2020-4-5,9,-40,5.25333333333333,Actual,10.8,74,5822434
      Nevada,32,2020-4-5,-8,,,Actual,,,3080156
      Iowa,19,2020-4-5,1,-32,0.68,Actual,2.8,18,3155070
      Oklahoma,40,2020-4-5,-5,,,Actual,,,3956971
      Kentucky,21,2020-4-5,5,-37.3333333333333,3.21,Actual,6.8,45,4467673
      New York,36,2020-4-6,8,-61.3333333333333,3.16333333333333,Actual,901.8,7962,26161672
      New Jersey,34,2020-4-6,4,-61.3333333333333,1.59333333333333,Actual,231.4,1337,8882190
      California,6,2020-4-6,5,-53.3333333333333,2.49666666666667,Actual,46,380,39512223
      Texas,48,2020-4-6,14,-44.6666666666667,8.08666666666666,Actual,20.6,182,28995881
      Massachusetts,25,2020-4-6,-1,,,Actual,,,6892503
      Florida,12,2020-4-6,13,-51.3333333333333,6.7,Actual,27.8,236,21477737
      Illinois,17,2020-4-6,-1,,,Actual,,,12671821
      Pennsylvania,42,2020-4-6,-1,,,Actual,,,12801989
      Michigan,26,2020-4-6,1,-55,0.45,Actual,103.8,793,9986857
      Connecticut,9,2020-4-6,14,-47.6666666666667,7.26666666666667,Actual,39,206,3565287
      Louisiana,22,2020-4-6,18,-43.3333333333333,10.7166666666667,Actual,56.4,512,4648794
      Georgia,13,2020-4-6,19,-47.3333333333333,11.51,Actual,35.6,229,10617423
      Arizona,4,2020-4-6,11,-42,6.64666666666667,Actual,9,65,7278717
      Ohio,39,2020-4-6,-3,,,Actual,,,11689100
      Maryland,24,2020-4-6,-7,,,Actual,,,6045680
      Indiana,18,2020-4-6,-2,,,Actual,,,6732219
      Virginia,51,2020-4-6,8,-46.6666666666667,4.37666666666667,Actual,4,66,8535519
      North Carolina,37,2020-4-6,6,-42,3.45333333333333,Actual,7.8,45,10488084
      South Carolina,45,2020-4-6,8,-35.6666666666667,5.21,Actual,3.4,48,5148714
      Mississippi,28,2020-4-6,10,-34,6.94333333333333,Actual,7.6,51,2976149
      Colorado,8,2020-4-6,14,-49,6.97666666666667,Actual,16.4,150,5758736
      Alabama,1,2020-4-6,8,-35.6666666666667,5.30333333333333,Actual,5.6,49,4903185
      Minnesota,27,2020-4-6,-8,,,Actual,,,5639632
      Washington,53,2020-4-6,20,-51,10.5366666666667,Actual,27,381,7614893
      Missouri,29,2020-4-6,-8,,,Actual,,,6137428
      Tennessee,47,2020-4-6,-7,,,Actual,,,6829174
      Rhode Island,44,2020-4-6,-11,,,Actual,,,1059361
      Wisconsin,55,2020-4-6,10,-41.3333333333333,5.84,Actual,9.8,78,5822434
      Nevada,32,2020-4-6,-7,,,Actual,,,3080156
      Iowa,19,2020-4-6,2,-34,1.34,Actual,3.2,25,3155070
      Oklahoma,40,2020-4-6,-4,,,Actual,,,3956971
      Kentucky,21,2020-4-6,6,-37.3333333333333,3.83666666666667,Actual,6.2,45,4467673
      New York,36,2020-4-7,9,-64,3.52333333333333,Actual,978.2,9043,26161672
      New Jersey,34,2020-4-7,5,-61.6666666666667,1.97666666666667,Actual,238.2,1633,8882190
      California,6,2020-4-7,6,-53,2.96666666666667,Actual,51,432,39512223
      Texas,48,2020-4-7,15,-43,8.65666666666666,Actual,22.4,195,28995881
      Massachusetts,25,2020-4-7,0,-58.6666666666667,0,Actual,57.2,355,6892503
      Florida,12,2020-4-7,14,-50.3333333333333,7.19666666666667,Actual,31.8,283,21477737
      Illinois,17,2020-4-7,0,-48,0,Actual,56.8,380,12671821
      Pennsylvania,42,2020-4-7,0,-50.3333333333333,0,Actual,41.8,247,12801989
      Michigan,26,2020-4-7,2,-57,0.88,Actual,115.8,917,9986857
      Connecticut,9,2020-4-7,15,-48,7.78666666666667,Actual,43,277,3565287
      Louisiana,22,2020-4-7,19,-43.3333333333333,11.2833333333333,Actual,58.6,582,4648794
      Georgia,13,2020-4-7,20,-47,12.04,Actual,35.6,329,10617423
      Arizona,4,2020-4-7,12,-41.6666666666667,7.23,Actual,9.2,73,7278717
      Ohio,39,2020-4-7,-2,,,Actual,,,11689100
      Maryland,24,2020-4-7,-6,,,Actual,,,6045680
      Indiana,18,2020-4-7,-1,,,Actual,,,6732219
      Virginia,51,2020-4-7,9,-45.6666666666667,4.92,Actual,11.4,66,8535519
      North Carolina,37,2020-4-7,7,-41.6666666666667,4.03666666666667,Actual,8.4,53,10488084
      South Carolina,45,2020-4-7,9,-36.6666666666667,5.84333333333333,Actual,5.4,51,5148714
      Mississippi,28,2020-4-7,11,-34.3333333333333,7.6,Actual,8.2,60,2976149
      Colorado,8,2020-4-7,15,-49.6666666666667,7.48,Actual,20,179,5758736
      Alabama,1,2020-4-7,9,-37.3333333333333,5.93,Actual,5.2,64,4903185
      Minnesota,27,2020-4-7,-7,,,Actual,,,5639632
      Washington,53,2020-4-7,21,-51.3333333333333,11.0233333333333,Actual,28.2,400,7614893
      Missouri,29,2020-4-7,-7,,,Actual,,,6137428
      Tennessee,47,2020-4-7,-6,,,Actual,,,6829174
      Rhode Island,44,2020-4-7,-10,,,Actual,,,1059361
      Wisconsin,55,2020-4-7,11,-37,6.47,Actual,11.4,92,5822434
      Nevada,32,2020-4-7,-6,,,Actual,,,3080156
      Iowa,19,2020-4-7,3,-32.6666666666667,2.01333333333333,Actual,3,25,3155070
      Oklahoma,40,2020-4-7,-3,,,Actual,,,3956971
      Kentucky,21,2020-4-7,7,-36,4.47666666666667,Actual,6.6,65,4467673
      New York,36,2020-4-8,10,-65,3.87333333333333,Actual,983.6,10028,26161672
      New Jersey,34,2020-4-8,6,-62.6666666666667,2.35,Actual,268.8,1974,8882190
      California,6,2020-4-8,7,-53.3333333333333,3.43333333333333,Actual,47,495,39512223
      Texas,48,2020-4-8,16,-42.6666666666667,9.23,Actual,21.8,221,28995881
      Massachusetts,25,2020-4-8,1,-61.6666666666667,0.383333333333333,Actual,73.4,432,6892503
      Florida,12,2020-4-8,15,-50.6666666666667,7.69,Actual,33.8,309,21477737
      Illinois,17,2020-4-8,1,-50,0.5,Actual,64.6,462,12671821
      Pennsylvania,42,2020-4-8,1,-50.3333333333333,0.496666666666667,Actual,53.4,318,12801989
      Michigan,26,2020-4-8,3,-53,1.35,Actual,139.2,1037,9986857
      Connecticut,9,2020-4-8,16,-51.3333333333333,8.27333333333333,Actual,51.8,326,3565287
      Louisiana,22,2020-4-8,20,-42.3333333333333,11.86,Actual,55.6,652,4648794
      Georgia,13,2020-4-8,21,-46.6666666666667,12.5733333333333,Actual,41,362,10617423
      Arizona,4,2020-4-8,13,-43,7.8,Actual,8.4,89,7278717
      Ohio,39,2020-4-8,-1,,,Actual,,,11689100
      Maryland,24,2020-4-8,-5,,,Actual,,,6045680
      Indiana,18,2020-4-8,0,-35.6666666666667,0,Actual,34.6,203,6732219
      Virginia,51,2020-4-8,10,-46.3333333333333,5.45666666666667,Actual,13.8,66,8535519
      North Carolina,37,2020-4-8,8,-42,4.61666666666667,Actual,9,66,10488084
      South Carolina,45,2020-4-8,10,-38.6666666666667,6.45666666666667,Actual,5.6,51,5148714
      Mississippi,28,2020-4-8,12,-33,8.27,Actual,7.8,67,2976149
      Colorado,8,2020-4-8,16,-50,7.98,Actual,22,193,5758736
      Alabama,1,2020-4-8,10,-36.3333333333333,6.56666666666667,Actual,7,66,4903185
      Minnesota,27,2020-4-8,-6,,,Actual,,,5639632
      Washington,53,2020-4-8,22,-51,11.5133333333333,Actual,29.4,426,7614893
      Missouri,29,2020-4-8,-6,,,Actual,,,6137428
      Tennessee,47,2020-4-8,-5,,,Actual,,,6829174
      Rhode Island,44,2020-4-8,-9,,,Actual,,,1059361
      Wisconsin,55,2020-4-8,12,-43.3333333333333,7.03666666666667,Actual,10.8,100,5822434
      Nevada,32,2020-4-8,-5,,,Actual,,,3080156
      Iowa,19,2020-4-8,4,-32,2.69333333333333,Actual,2.6,27,3155070
      Oklahoma,40,2020-4-8,-2,,,Actual,,,3956971
      Kentucky,21,2020-4-8,8,-37.3333333333333,5.10333333333333,Actual,9,65,4467673
      New York,36,2020-4-9,11,-67.6666666666667,4.19666666666667,Actual,963,11001,26161672
      New Jersey,34,2020-4-9,7,-65,2.7,Actual,303.4,2250,8882190
      California,6,2020-4-9,8,-55.6666666666667,3.87666666666667,Actual,44.8,544,39512223
      Texas,48,2020-4-9,17,-44.3333333333333,9.78666666666667,Actual,24.4,247,28995881
      Massachusetts,25,2020-4-9,2,-63.3333333333333,0.75,Actual,85.2,502,6892503
      Florida,12,2020-4-9,16,-51.3333333333333,8.17666666666666,Actual,40.4,354,21477737
      Illinois,17,2020-4-9,2,-50.6666666666667,0.993333333333333,Actual,74,528,12671821
      Pennsylvania,42,2020-4-9,2,-52.6666666666667,0.97,Actual,64.8,345,12801989
      Michigan,26,2020-4-9,4,-57.3333333333333,1.77666666666667,Actual,138.8,1164,9986857
      Connecticut,9,2020-4-9,17,-54,8.73333333333333,Actual,57.6,380,3565287
      Louisiana,22,2020-4-9,21,-43,12.43,Actual,58.8,702,4648794
      Georgia,13,2020-4-9,22,-46.3333333333333,13.11,Actual,40,379,10617423
      Arizona,4,2020-4-9,14,-42.3333333333333,8.37666666666667,Actual,10.4,98,7278717
      Ohio,39,2020-4-9,0,-41,0,Actual,21,213,11689100
      Maryland,24,2020-4-9,-4,,,Actual,,,6045680
      Indiana,18,2020-4-9,1,-38,0.62,Actual,37.4,245,6732219
      Virginia,51,2020-4-9,11,-47.3333333333333,5.98333333333333,Actual,12.8,109,8535519
      North Carolina,37,2020-4-9,9,-43,5.18666666666667,Actual,8.8,76,10488084
      South Carolina,45,2020-4-9,11,-38.3333333333333,7.07333333333333,Actual,6.4,67,5148714
      Mississippi,28,2020-4-9,13,-33,8.94,Actual,8.4,76,2976149
      Colorado,8,2020-4-9,17,-51,8.47,Actual,24.8,226,5758736
      Alabama,1,2020-4-9,11,-36.3333333333333,7.20333333333333,Actual,8.6,70,4903185
      Minnesota,27,2020-4-9,-5,,,Actual,,,5639632
      Washington,53,2020-4-9,23,-51.3333333333333,12,Actual,22.8,456,7614893
      Missouri,29,2020-4-9,-5,,,Actual,,,6137428
      Tennessee,47,2020-4-9,-4,,,Actual,,,6829174
      Rhode Island,44,2020-4-9,-8,,,Actual,,,1059361
      Wisconsin,55,2020-4-9,13,-43.3333333333333,7.60333333333333,Actual,11.8,111,5822434
      Nevada,32,2020-4-9,-4,,,Actual,,,3080156
      Iowa,19,2020-4-9,5,-36,3.33333333333333,Actual,1.8,29,3155070
      Oklahoma,40,2020-4-9,-1,,,Actual,,,3956971
      Kentucky,21,2020-4-9,9,-39,5.71333333333333,Actual,9,73,4467673
      New York,36,2020-4-10,12,-67.6666666666667,4.52,Actual,941.8,11850,26161672
      New Jersey,34,2020-4-10,8,-67.3333333333333,3.02666666666667,Actual,292.6,2529,8882190
      California,6,2020-4-10,9,-54,4.33666666666667,Actual,41.6,583,39512223
      Texas,48,2020-4-10,18,-47.6666666666667,10.31,Actual,26,272,28995881
      Massachusetts,25,2020-4-10,3,-61.3333333333333,1.13666666666667,Actual,80,598,6892503
      Florida,12,2020-4-10,17,-53.6666666666667,8.64,Actual,35.6,390,21477737
      Illinois,17,2020-4-10,3,-51.6666666666667,1.47666666666667,Actual,68,597,12671821
      Pennsylvania,42,2020-4-10,3,-56.6666666666667,1.40333333333333,Actual,62,418,12801989
      Michigan,26,2020-4-10,5,-60,2.17666666666667,Actual,135,1371,9986857
      Connecticut,9,2020-4-10,18,-55.3333333333333,9.18,Actual,55.4,448,3565287
      Louisiana,22,2020-4-10,22,-52,12.91,Actual,51.6,755,4648794
      Georgia,13,2020-4-10,23,-48,13.63,Actual,20.8,416,10617423
      Arizona,4,2020-4-10,15,-43.6666666666667,8.94,Actual,10.4,106,7278717
      Ohio,39,2020-4-10,1,-44.3333333333333,0.556666666666667,Actual,17.2,231,11689100
      Maryland,24,2020-4-10,-3,,,Actual,,,6045680
      Indiana,18,2020-4-10,2,-42.6666666666667,1.19333333333333,Actual,34,300,6732219
      Virginia,51,2020-4-10,12,-49.6666666666667,6.48666666666667,Actual,15,121,8535519
      North Carolina,37,2020-4-10,10,-48.3333333333333,5.70333333333333,Actual,7.2,83,10488084
      South Carolina,45,2020-4-10,12,-43,7.64333333333333,Actual,6.2,72,5148714
      Mississippi,28,2020-4-10,14,-39.3333333333333,9.54666666666667,Actual,7.2,82,2976149
      Colorado,8,2020-4-10,18,-51.3333333333333,8.95666666666667,Actual,22,250,5758736
      Alabama,1,2020-4-10,12,-39.6666666666667,7.80666666666667,Actual,5.8,80,4903185
      Minnesota,27,2020-4-10,-4,,,Actual,,,5639632
      Washington,53,2020-4-10,24,-52,12.48,Actual,21.2,483,7614893
      Missouri,29,2020-4-10,-4,,,Actual,,,6137428
      Tennessee,47,2020-4-10,-3,,,Actual,,,6829174
      Rhode Island,44,2020-4-10,-7,,,Actual,,,1059361
      Wisconsin,55,2020-4-10,14,-45.3333333333333,8.15,Actual,10.4,128,5822434
      Nevada,32,2020-4-10,-3,,,Actual,,,3080156
      Iowa,19,2020-4-10,6,-34.6666666666667,3.98666666666667,Actual,3.2,31,3155070
      Oklahoma,40,2020-4-10,0,-33.6666666666667,0,Actual,5.8,88,3956971
      Kentucky,21,2020-4-10,10,-42.3333333333333,6.29,Actual,6.4,90,4467673
      New York,36,2020-4-11,13,-58.3333333333333,4.93666666666667,Actual,940.4,12777,26161672
      New Jersey,34,2020-4-11,9,-57.6666666666667,3.45,Actual,257.8,2854,8882190
      California,6,2020-4-11,10,-47,4.86666666666667,Actual,43.8,604,39512223
      Texas,48,2020-4-11,19,-44,10.87,Actual,26,304,28995881
      Massachusetts,25,2020-4-11,4,-52.3333333333333,1.61333333333333,Actual,82.2,685,6892503
      Florida,12,2020-4-11,18,-51.3333333333333,9.12666666666666,Actual,38,438,21477737
      Illinois,17,2020-4-11,4,-43.3333333333333,2.04333333333333,Actual,67.2,677,12671821
      Pennsylvania,42,2020-4-11,4,-45.6666666666667,1.94666666666667,Actual,54.2,503,12801989
      Michigan,26,2020-4-11,6,-51.3333333333333,2.66333333333333,Actual,135.8,1487,9986857
      Connecticut,9,2020-4-11,19,-46,9.72,Actual,55.2,494,3565287
      Louisiana,22,2020-4-11,23,-45,13.46,Actual,46.4,806,4648794
      Georgia,13,2020-4-11,24,-43,14.2,Actual,20.6,429,10617423
      Arizona,4,2020-4-11,16,-41.3333333333333,9.52666666666667,Actual,8.6,117,7278717
      Ohio,39,2020-4-11,2,-35.3333333333333,1.20333333333333,Actual,16.2,247,11689100
      Maryland,24,2020-4-11,-2,,,Actual,,,6045680
      Indiana,18,2020-4-11,3,-35,1.84333333333333,Actual,29.4,330,6732219
      Virginia,51,2020-4-11,13,-41.6666666666667,7.07,Actual,16.6,130,8535519
      North Carolina,37,2020-4-11,11,-41.3333333333333,6.29,Actual,5.6,89,10488084
      South Carolina,45,2020-4-11,13,-40,8.24333333333333,Actual,6.2,80,5148714
      Mississippi,28,2020-4-11,15,-35,10.1966666666667,Actual,6.2,93,2976149
      Colorado,8,2020-4-11,19,-46.3333333333333,9.49333333333333,Actual,22.6,274,5758736
      Alabama,1,2020-4-11,13,-34.3333333333333,8.46333333333333,Actual,6.6,92,4903185
      Minnesota,27,2020-4-11,-3,,,Actual,,,5639632
      Washington,53,2020-4-11,25,-46,13.02,Actual,17.4,495,7614893
      Missouri,29,2020-4-11,-3,,,Actual,,,6137428
      Tennessee,47,2020-4-11,-2,,,Actual,,,6829174
      Rhode Island,44,2020-4-11,-6,,,Actual,,,1059361
      Wisconsin,55,2020-4-11,15,-38,8.77,Actual,10.8,137,5822434
      Nevada,32,2020-4-11,-2,,,Actual,,,3080156
      Iowa,19,2020-4-11,7,-33.3333333333333,4.65333333333333,Actual,2.8,34,3155070
      Oklahoma,40,2020-4-11,1,-32.3333333333333,0.676666666666667,Actual,4,94,3956971
      Kentucky,21,2020-4-11,11,-36,6.93,Actual,9.6,90,4467673
      New York,36,2020-4-12,14,-64.6666666666667,5.29,Actual,922.2,13752,26161672
      New Jersey,34,2020-4-12,10,-66.6666666666667,3.78333333333333,Actual,285.6,3096,8882190
      California,6,2020-4-12,11,-54.6666666666667,5.32,Actual,44.6,640,39512223
      Texas,48,2020-4-12,20,-51,11.36,Actual,28.2,325,28995881
      Massachusetts,25,2020-4-12,5,-61.3333333333333,2,Actual,68.2,755,6892503
      Florida,12,2020-4-12,19,-61.6666666666667,9.51,Actual,43.4,461,21477737
      Illinois,17,2020-4-12,5,-54.6666666666667,2.49666666666667,Actual,68,720,12671821
      Pennsylvania,42,2020-4-12,5,-57,2.37666666666667,Actual,69.2,557,12801989
      Michigan,26,2020-4-12,7,-61.6666666666667,3.04666666666667,Actual,145.2,1592,9986857
      Connecticut,9,2020-4-12,20,-57.3333333333333,10.1466666666667,Actual,58.2,554,3565287
      Louisiana,22,2020-4-12,24,-56.3333333333333,13.8966666666667,Actual,62.2,840,4648794
      Georgia,13,2020-4-12,25,-59,14.61,Actual,29.2,433,10617423
      Arizona,4,2020-4-12,17,-48.6666666666667,10.04,Actual,9,125,7278717
      Ohio,39,2020-4-12,3,-50.3333333333333,1.7,Actual,22.2,253,11689100
      Maryland,24,2020-4-12,-1,,,Actual,,,6045680
      Indiana,18,2020-4-12,4,-48.6666666666667,2.35666666666667,Actual,28.4,343,6732219
      Virginia,51,2020-4-12,14,-54,7.53,Actual,9,141,8535519
      North Carolina,37,2020-4-12,12,-55.3333333333333,6.73666666666667,Actual,7.2,89,10488084
      South Carolina,45,2020-4-12,14,-54,8.70333333333333,Actual,6,82,5148714
      Mississippi,28,2020-4-12,16,-51.6666666666667,10.68,Actual,7,96,2976149
      Colorado,8,2020-4-12,20,-62.3333333333333,9.87,Actual,20.2,289,5758736
      Alabama,1,2020-4-12,14,-53.3333333333333,8.93,Actual,8.8,93,4903185
      Minnesota,27,2020-4-12,-2,,,Actual,,,5639632
      Washington,53,2020-4-12,26,-50,13.52,Actual,14.8,506,7614893
      Missouri,29,2020-4-12,-2,,,Actual,,,6137428
      Tennessee,47,2020-4-12,-1,,,Actual,,,6829174
      Rhode Island,44,2020-4-12,-5,,,Actual,,,1059361
      Wisconsin,55,2020-4-12,16,-54.3333333333333,9.22666666666666,Actual,11.8,144,5822434
      Nevada,32,2020-4-12,-1,,,Actual,,,3080156
      Iowa,19,2020-4-12,8,-51.3333333333333,5.14,Actual,4,41,3155070
      Oklahoma,40,2020-4-12,2,-43.6666666666667,1.24,Actual,5.6,96,3956971
      Kentucky,21,2020-4-12,12,-50.3333333333333,7.42666666666667,Actual,6.6,97,4467673
      New York,36,2020-4-13,15,-70,5.59,Actual,909.6,14730,26161672
      New Jersey,34,2020-4-13,11,-70,4.08333333333333,Actual,311.8,3263,8882190
      California,6,2020-4-13,12,-50.6666666666667,5.81333333333333,Actual,55.4,714,39512223
      Texas,48,2020-4-13,21,-43.3333333333333,11.9266666666667,Actual,30,351,28995881
      Massachusetts,25,2020-4-13,6,-65.3333333333333,2.34666666666667,Actual,101.8,843,6892503
      Florida,12,2020-4-13,20,-51,10,Actual,41.2,499,21477737
      Illinois,17,2020-4-13,6,-51.3333333333333,2.98333333333333,Actual,70.4,798,12671821
      Pennsylvania,42,2020-4-13,6,-56.6666666666667,2.81,Actual,72.2,589,12801989
      Michigan,26,2020-4-13,8,-59,3.45666666666667,Actual,134.6,1716,9986857
      Connecticut,9,2020-4-13,21,-59.6666666666667,10.55,Actual,84,602,3565287
      Louisiana,22,2020-4-13,25,-42,14.4766666666667,Actual,69.6,884,4648794
      Georgia,13,2020-4-13,26,-46,15.15,Actual,27.2,465,10617423
      Arizona,4,2020-4-13,18,-42.6666666666667,10.6133333333333,Actual,9.8,132,7278717
      Ohio,39,2020-4-13,4,-43,2.27,Actual,26.2,274,11689100
      Maryland,24,2020-4-13,0,-56.3333333333333,0,Actual,28,262,6045680
      Indiana,18,2020-4-13,5,-39,2.96666666666667,Actual,27.2,350,6732219
      Virginia,51,2020-4-13,15,-51.3333333333333,8.01666666666667,Actual,14.8,149,8535519
      North Carolina,37,2020-4-13,13,-46.3333333333333,7.27333333333333,Actual,9.4,94,10488084
      South Carolina,45,2020-4-13,15,-39.3333333333333,9.31,Actual,6.8,82,5148714
      Mississippi,28,2020-4-13,17,-31.6666666666667,11.3633333333333,Actual,8,98,2976149
      Colorado,8,2020-4-13,21,-57,10.3,Actual,20.8,306,5758736
      Alabama,1,2020-4-13,15,-33.6666666666667,9.59333333333333,Actual,7.6,99,4903185
      Minnesota,27,2020-4-13,-1,,,Actual,,,5639632
      Washington,53,2020-4-13,27,-50.3333333333333,14.0166666666667,Actual,13.8,513,7614893
      Missouri,29,2020-4-13,-1,,,Actual,,,6137428
      Tennessee,47,2020-4-13,0,-37.3333333333333,0,Actual,5.2,109,6829174
      Rhode Island,44,2020-4-13,-4,,,Actual,,,1059361
      Wisconsin,55,2020-4-13,17,-44.6666666666667,9.78,Actual,11,154,5822434
      Nevada,32,2020-4-13,0,-51.3333333333333,0,Actual,8.2,114,3080156
      Iowa,19,2020-4-13,9,-37,5.77,Actual,4.4,41,3155070
      Oklahoma,40,2020-4-13,3,-34.6666666666667,1.89333333333333,Actual,7,99,3956971
      Kentucky,21,2020-4-13,13,-40.6666666666667,8.02,Actual,5,113,4467673
      New York,36,2020-4-14,16,-63,5.96,Actual,872.6,15612,26161672
      New Jersey,34,2020-4-14,12,-62,4.46333333333333,Actual,331.2,3678,8882190
      California,6,2020-4-14,13,-49,6.32333333333333,Actual,70.4,767,39512223
      Texas,48,2020-4-14,22,-41.6666666666667,12.51,Actual,31.8,388,28995881
      Massachusetts,25,2020-4-14,7,-57.6666666666667,2.77,Actual,84.4,843,6892503
      Florida,12,2020-4-14,21,-50,10.5,Actual,46,571,21477737
      Illinois,17,2020-4-14,7,-50.3333333333333,3.48,Actual,79,868,12671821
      Pennsylvania,42,2020-4-14,7,-49,3.32,Actual,67.6,691,12801989
      Michigan,26,2020-4-14,9,-56.3333333333333,3.89333333333333,Actual,127.4,1890,9986857
      Connecticut,9,2020-4-14,22,-47,11.08,Actual,95.4,671,3565287
      Louisiana,22,2020-4-14,26,-39.3333333333333,15.0833333333333,Actual,70,1013,4648794
      Georgia,13,2020-4-14,27,-43,15.72,Actual,31.6,525,10617423
      Arizona,4,2020-4-14,19,-40.6666666666667,11.2066666666667,Actual,9.4,143,7278717
      Ohio,39,2020-4-14,5,-38.3333333333333,2.88666666666667,Actual,32,324,11689100
      Maryland,24,2020-4-14,1,-49.6666666666667,0.503333333333333,Actual,22.6,302,6045680
      Indiana,18,2020-4-14,6,-36,3.60666666666667,Actual,29.4,387,6732219
      Virginia,51,2020-4-14,16,-44.6666666666667,8.57,Actual,15.6,154,8535519
      North Carolina,37,2020-4-14,14,-39.6666666666667,7.87666666666667,Actual,12.2,112,10488084
      South Carolina,45,2020-4-14,16,-32.3333333333333,9.98666666666667,Actual,6.2,97,5148714
      Mississippi,28,2020-4-14,18,-28.3333333333333,12.08,Actual,7.2,111,2976149
      Colorado,8,2020-4-14,22,-52,10.78,Actual,19.6,327,5758736
      Alabama,1,2020-4-14,16,-32.3333333333333,10.27,Actual,8.2,114,4903185
      Minnesota,27,2020-4-14,0,-50.6666666666667,0,Actual,4.6,79,5639632
      Washington,53,2020-4-14,28,-49.6666666666667,14.52,Actual,16.8,530,7614893
      Missouri,29,2020-4-14,0,-39,0,Actual,13.4,173,6137428
      Tennessee,47,2020-4-14,1,-34.6666666666667,0.653333333333333,Actual,6,124,6829174
      Rhode Island,44,2020-4-14,-3,,,Actual,,,1059361
      Wisconsin,55,2020-4-14,18,-42.3333333333333,10.3566666666667,Actual,12,170,5822434
      Nevada,32,2020-4-14,1,-49.3333333333333,0.506666666666667,Actual,7,126,3080156
      Iowa,19,2020-4-14,10,-36.3333333333333,6.40666666666667,Actual,5.2,49,3155070
      Oklahoma,40,2020-4-14,4,-33.3333333333333,2.56,Actual,7.4,108,3956971
      Kentucky,21,2020-4-14,14,-36.6666666666667,8.65333333333333,Actual,7.8,106,4467673
      New York,36,2020-4-15,17,-63,6.33,Actual,887.6,16398,26161672
      New Jersey,34,2020-4-15,13,-61.3333333333333,4.85,Actual,357,4088,8882190
      California,6,2020-4-15,14,-49.3333333333333,6.83,Actual,79.4,860,39512223
      Texas,48,2020-4-15,23,-38,13.13,Actual,35.6,422,28995881
      Massachusetts,25,2020-4-15,8,-58,3.19,Actual,97.8,1107,6892503
      Florida,12,2020-4-15,22,-48.3333333333333,11.0166666666667,Actual,52.8,596,21477737
      Illinois,17,2020-4-15,8,-48.6666666666667,3.99333333333333,Actual,82.4,949,12671821
      Pennsylvania,42,2020-4-15,8,-47,3.85,Actual,72.8,779,12801989
      Michigan,26,2020-4-15,10,-53.3333333333333,4.36,Actual,153.6,2044,9986857
      Connecticut,9,2020-4-15,23,-46.6666666666667,11.6133333333333,Actual,96.4,868,3565287
      Louisiana,22,2020-4-15,27,-35,15.7333333333333,Actual,74.6,1103,4648794
      Georgia,13,2020-4-15,28,-40.3333333333333,16.3166666666667,Actual,43.4,552,10617423
      Arizona,4,2020-4-15,20,-37.6666666666667,11.83,Actual,11.6,155,7278717
      Ohio,39,2020-4-15,6,-36,3.52666666666667,Actual,33,362,11689100
      Maryland,24,2020-4-15,2,-48.3333333333333,1.02,Actual,19.6,311,6045680
      Indiana,18,2020-4-15,7,-34,4.26666666666667,Actual,35.8,436,6732219
      Virginia,51,2020-4-15,17,-44,9.13,Actual,18,195,8535519
      North Carolina,37,2020-4-15,15,-39,8.48666666666667,Actual,17.6,130,10488084
      South Carolina,45,2020-4-15,17,-31.6666666666667,10.67,Actual,6.8,106,5148714
      Mississippi,28,2020-4-15,19,-23.3333333333333,12.8466666666667,Actual,8.8,122,2976149
      Colorado,8,2020-4-15,23,-48.3333333333333,11.2966666666667,Actual,20,354,5758736
      Alabama,1,2020-4-15,17,-27.6666666666667,10.9933333333333,Actual,11,118,4903185
      Minnesota,27,2020-4-15,1,-47.3333333333333,0.526666666666667,Actual,8.2,87,5639632
      Washington,53,2020-4-15,29,-47,15.05,Actual,19.4,552,7614893
      Missouri,29,2020-4-15,1,-30,0.7,Actual,13.4,190,6137428
      Tennessee,47,2020-4-15,2,-30,1.35333333333333,Actual,7,124,6829174
      Rhode Island,44,2020-4-15,-2,,,Actual,,,1059361
      Wisconsin,55,2020-4-15,19,-38.6666666666667,10.97,Actual,12.4,183,5822434
      Nevada,32,2020-4-15,2,-46.3333333333333,1.04333333333333,Actual,6,131,3080156
      Iowa,19,2020-4-15,11,-30.6666666666667,7.1,Actual,4.6,53,3155070
      Oklahoma,40,2020-4-15,5,-23,3.33,Actual,8,123,3956971
      Kentucky,21,2020-4-15,15,-32.3333333333333,9.33,Actual,8,115,4467673
      New York,36,2020-4-16,18,-64,6.69,Actual,901.2,17140,26161672
      New Jersey,34,2020-4-16,14,-62.6666666666667,5.22333333333333,Actual,381.2,4510,8882190
      California,6,2020-4-16,15,-53,7.3,Actual,85.2,956,39512223
      Texas,48,2020-4-16,24,-40,13.73,Actual,35.6,463,28995881
      Massachusetts,25,2020-4-16,9,-59,3.6,Actual,112,1107,6892503
      Florida,12,2020-4-16,23,-49.6666666666667,11.52,Actual,49.8,668,21477737
      Illinois,17,2020-4-16,9,-47.6666666666667,4.51666666666667,Actual,92.2,1072,12671821
      Pennsylvania,42,2020-4-16,9,-49.3333333333333,4.35666666666667,Actual,90.6,841,12801989
      Michigan,26,2020-4-16,11,-53.6666666666667,4.82333333333333,Actual,145.4,2124,9986857
      Connecticut,9,2020-4-16,24,-48.3333333333333,12.13,Actual,96.8,971,3565287
      Louisiana,22,2020-4-16,28,-37.6666666666667,16.3566666666667,Actual,76.6,1156,4648794
      Georgia,13,2020-4-16,29,-41.6666666666667,16.9,Actual,41.6,587,10617423
      Arizona,4,2020-4-16,21,-39.3333333333333,12.4366666666667,Actual,9.6,164,7278717
      Ohio,39,2020-4-16,7,-37.3333333333333,4.15333333333333,Actual,35.4,407,11689100
      Maryland,24,2020-4-16,3,-50,1.52,Actual,31.8,319,6045680
      Indiana,18,2020-4-16,8,-34.3333333333333,4.92333333333333,Actual,39,477,6732219
      Virginia,51,2020-4-16,18,-44.3333333333333,9.68666666666667,Actual,21.8,208,8535519
      North Carolina,37,2020-4-16,16,-39.3333333333333,9.09333333333333,Actual,18.6,150,10488084
      South Carolina,45,2020-4-16,18,-31.3333333333333,11.3566666666667,Actual,7.4,111,5148714
      Mississippi,28,2020-4-16,20,-26,13.5866666666667,Actual,10.8,129,2976149
      Colorado,8,2020-4-16,24,-58.6666666666667,11.71,Actual,21,372,5758736
      Alabama,1,2020-4-16,18,-30.6666666666667,11.6866666666667,Actual,10.8,133,4903185
      Minnesota,27,2020-4-16,2,-48.3333333333333,1.04333333333333,Actual,10.2,87,5639632
      Washington,53,2020-4-16,30,-47.6666666666667,15.5733333333333,Actual,20,579,7614893
      Missouri,29,2020-4-16,2,-36,1.34,Actual,12.8,204,6137428
      Tennessee,47,2020-4-16,3,-32.6666666666667,2.02666666666667,Actual,6.6,136,6829174
      Rhode Island,44,2020-4-16,-1,,,Actual,,,1059361
      Wisconsin,55,2020-4-16,20,-39,11.58,Actual,11.6,197,5822434
      Nevada,32,2020-4-16,3,-49,1.55333333333333,Actual,7.4,137,3080156
      Iowa,19,2020-4-16,12,-35,7.75,Actual,6.6,60,3155070
      Oklahoma,40,2020-4-16,6,-25.6666666666667,4.07333333333333,Actual,7.4,131,3956971
      Kentucky,21,2020-4-16,16,-34.6666666666667,9.98333333333333,Actual,6.2,129,4467673
      New York,36,2020-4-17,19,-63.3333333333333,7.05666666666667,Actual,698.6,18190,26161672
      New Jersey,34,2020-4-17,15,-62.3333333333333,5.6,Actual,365.4,4881,8882190
      California,6,2020-4-17,16,-53.3333333333333,7.76666666666667,Actual,82,1037,39512223
      Texas,48,2020-4-17,25,-42,14.31,Actual,31.6,503,28995881
      Massachusetts,25,2020-4-17,10,-58.6666666666667,4.01333333333333,Actual,172.4,1244,6892503
      Florida,12,2020-4-17,24,-49.6666666666667,12.0233333333333,Actual,40.6,725,21477737
      Illinois,17,2020-4-17,10,-51,5.00666666666667,Actual,84.4,1132,12671821
      Pennsylvania,42,2020-4-17,10,-51.3333333333333,4.84333333333333,Actual,117,921,12801989
      Michigan,26,2020-4-17,12,-58.3333333333333,5.24,Actual,128.8,2360,9986857
      Connecticut,9,2020-4-17,25,-49.3333333333333,12.6366666666667,Actual,91.2,1036,3565287
      Louisiana,22,2020-4-17,29,-41,16.9466666666667,Actual,56.6,1213,4648794
      Georgia,13,2020-4-17,30,-42.6666666666667,17.4733333333333,Actual,32.4,650,10617423
      Arizona,4,2020-4-17,22,-40.6666666666667,13.03,Actual,8.2,183,7278717
      Ohio,39,2020-4-17,8,-43,4.72333333333333,Actual,29.4,418,11689100
      Maryland,24,2020-4-17,4,-49.6666666666667,2.02333333333333,Actual,31.8,334,6045680
      Indiana,18,2020-4-17,9,-41,5.51333333333333,Actual,35,522,6732219
      Virginia,51,2020-4-17,19,-45,10.2366666666667,Actual,24.6,231,8535519
      North Carolina,37,2020-4-17,17,-39.6666666666667,9.69666666666667,Actual,17.6,177,10488084
      South Carolina,45,2020-4-17,19,-33.6666666666667,12.02,Actual,4.6,116,5148714
      Mississippi,28,2020-4-17,21,-31.6666666666667,14.27,Actual,9.6,140,2976149
      Colorado,8,2020-4-17,25,-50.3333333333333,12.2066666666667,Actual,18.6,389,5758736
      Alabama,1,2020-4-17,19,-33,12.3566666666667,Actual,8.6,148,4903185
      Minnesota,27,2020-4-17,3,-47,1.57333333333333,Actual,11,111,5639632
      Washington,53,2020-4-17,31,-49.3333333333333,16.08,Actual,21.2,603,7614893
      Missouri,29,2020-4-17,3,-35,1.99,Actual,11.2,216,6137428
      Tennessee,47,2020-4-17,4,-35,2.67666666666667,Actual,4.8,141,6829174
      Rhode Island,44,2020-4-17,0,-50.6666666666667,0,Actual,14,118,1059361
      Wisconsin,55,2020-4-17,21,-40.3333333333333,12.1766666666667,Actual,10,206,5822434
      Nevada,32,2020-4-17,4,-50.6666666666667,2.04666666666667,Actual,6.4,142,3080156
      Iowa,19,2020-4-17,13,-33.6666666666667,8.41333333333334,Actual,5.2,64,3155070
      Oklahoma,40,2020-4-17,7,-31,4.76333333333333,Actual,6.4,136,3956971
      Kentucky,21,2020-4-17,17,-39,10.5933333333333,Actual,8,137,4467673
      New York,36,2020-4-18,20,-59,7.46666666666667,Actual,665.200000000001,19236,26161672
      New Jersey,34,2020-4-18,16,-58.6666666666667,6.01333333333333,Actual,318,5169,8882190
      California,6,2020-4-18,17,-48,8.28666666666667,Actual,73,1140,39512223
      Texas,48,2020-4-18,26,-38,14.93,Actual,28.2,529,28995881
      Massachusetts,25,2020-4-18,11,-58,4.43333333333333,Actual,119.6,1403,6892503
      Florida,12,2020-4-18,25,-49.6666666666667,12.5266666666667,Actual,45.2,748,21477737
      Illinois,17,2020-4-18,11,-38,5.62666666666667,Actual,80,1259,12671821
      Pennsylvania,42,2020-4-18,11,-44.6666666666667,5.39666666666667,Actual,113.8,1042,12801989
      Michigan,26,2020-4-18,13,-47.3333333333333,5.76666666666667,Actual,114.8,2443,9986857
      Connecticut,9,2020-4-18,26,-49.3333333333333,13.1433333333333,Actual,92.6,1086,3565287
      Louisiana,22,2020-4-18,30,-40.3333333333333,17.5433333333333,Actual,45,1267,4648794
      Georgia,13,2020-4-18,31,-38,18.0933333333333,Actual,44.6,673,10617423
      Arizona,4,2020-4-18,23,-36.6666666666667,13.6633333333333,Actual,7.2,180,7278717
      Ohio,39,2020-4-18,9,-32,5.40333333333333,Actual,29.4,451,11689100
      Maryland,24,2020-4-18,5,-44,2.58333333333333,Actual,54.2,421,6045680
      Indiana,18,2020-4-18,10,-29.3333333333333,6.22,Actual,28.2,545,6732219
      Virginia,51,2020-4-18,20,-41.3333333333333,10.8233333333333,Actual,21,258,8535519
      North Carolina,37,2020-4-18,18,-37,10.3266666666667,Actual,17.6,187,10488084
      South Carolina,45,2020-4-18,20,-32,12.7,Actual,3.4,119,5148714
      Mississippi,28,2020-4-18,22,-28,14.99,Actual,9.4,152,2976149
      Colorado,8,2020-4-18,26,-45.3333333333333,12.7533333333333,Actual,18.6,411,5758736
      Alabama,1,2020-4-18,20,-27.6666666666667,13.08,Actual,9,153,4903185
      Minnesota,27,2020-4-18,4,-40.6666666666667,2.16666666666667,Actual,11.2,121,5639632
      Washington,53,2020-4-18,32,-44.3333333333333,16.6366666666667,Actual,18.2,613,7614893
      Missouri,29,2020-4-18,4,-30.3333333333333,2.68666666666667,Actual,12,223,6137428
      Tennessee,47,2020-4-18,5,-29.3333333333333,3.38333333333333,Actual,5.6,142,6829174
      Rhode Island,44,2020-4-18,1,-54.3333333333333,0.456666666666667,Actual,15,137,1059361
      Wisconsin,55,2020-4-18,22,-32,12.8566666666667,Actual,9.4,212,5822434
      Nevada,32,2020-4-18,5,-50.3333333333333,2.54333333333333,Actual,5.6,151,3080156
      Iowa,19,2020-4-18,14,-27.6666666666667,9.13666666666667,Actual,5.2,74,3155070
      Oklahoma,40,2020-4-18,8,-24.3333333333333,5.52,Actual,4,136,3956971
      Kentucky,21,2020-4-18,18,-30.6666666666667,11.2866666666667,Actual,7.8,144,4467673
      New York,36,2020-4-19,21,-56.3333333333333,7.90333333333333,Actual,642.2,19105,26161672
      New Jersey,34,2020-4-19,17,-57,6.44333333333333,Actual,292.8,5505,8882190
      California,6,2020-4-19,18,-49.3333333333333,8.79333333333333,Actual,65.2,1177,39512223
      Texas,48,2020-4-19,27,-42.3333333333333,15.5066666666667,Actual,27.6,546,28995881
      Massachusetts,25,2020-4-19,12,-48.6666666666667,4.94666666666667,Actual,170.6,1705,6892503
      Florida,12,2020-4-19,26,-50.6666666666667,13.02,Actual,39.8,774,21477737
      Illinois,17,2020-4-19,12,-42.3333333333333,6.20333333333333,Actual,79.2,1290,12671821
      Pennsylvania,42,2020-4-19,12,-43.3333333333333,5.96333333333333,Actual,154.6,1276,12801989
      Michigan,26,2020-4-19,14,-48.3333333333333,6.28333333333333,Actual,120.4,2534,9986857
      Connecticut,9,2020-4-19,27,-43.3333333333333,13.71,Actual,90.4,1127,3565287
      Louisiana,22,2020-4-19,31,-44.6666666666667,18.0966666666667,Actual,49.8,1296,4648794
      Georgia,13,2020-4-19,32,-51.3333333333333,18.58,Actual,42.2,687,10617423
      Arizona,4,2020-4-19,24,-38,14.2833333333333,Actual,8.8,184,7278717
      Ohio,39,2020-4-19,10,-35.6666666666667,6.04666666666667,Actual,30,471,11689100
      Maryland,24,2020-4-19,6,-45.3333333333333,3.13,Actual,66.6,461,6045680
      Indiana,18,2020-4-19,11,-33.6666666666667,6.88333333333333,Actual,31.6,562,6732219
      Virginia,51,2020-4-19,21,-43,11.3933333333333,Actual,23.2,277,8535519
      North Carolina,37,2020-4-19,19,-42.6666666666667,10.9,Actual,19,200,10488084
      South Carolina,45,2020-4-19,21,-39.3333333333333,13.3066666666667,Actual,2.6,120,5148714
      Mississippi,28,2020-4-19,23,-39.6666666666667,15.5933333333333,Actual,10.8,159,2976149
      Colorado,8,2020-4-19,27,-45.3333333333333,13.3,Actual,22.2,420,5758736
      Alabama,1,2020-4-19,21,-42.3333333333333,13.6566666666667,Actual,10,157,4903185
      Minnesota,27,2020-4-19,5,-42.6666666666667,2.74,Actual,14.6,134,5639632
      Washington,53,2020-4-19,33,-40.3333333333333,17.2333333333333,Actual,17,636,7614893
      Missouri,29,2020-4-19,5,-32.3333333333333,3.36333333333333,Actual,12.8,229,6137428
      Tennessee,47,2020-4-19,6,-39.3333333333333,3.99,Actual,4.2,148,6829174
      Rhode Island,44,2020-4-19,2,-43.6666666666667,1.02,Actual,16.8,150,1059361
      Wisconsin,55,2020-4-19,23,-35,13.5066666666667,Actual,9.4,220,5822434
      Nevada,32,2020-4-19,6,-52.6666666666667,3.01666666666667,Actual,5.2,158,3080156
      Iowa,19,2020-4-19,15,-29,9.84666666666667,Actual,4.6,75,3155070
      Oklahoma,40,2020-4-19,9,-29.3333333333333,6.22666666666667,Actual,6.6,140,3956971
      Kentucky,21,2020-4-19,19,-35.6666666666667,11.93,Actual,8.4,146,4467673
      New York,36,2020-4-20,22,-62,8.28333333333333,Actual,535.2,19724,26161672
      New Jersey,34,2020-4-20,18,-61.3333333333333,6.83,Actual,305.2,5678,8882190
      California,6,2020-4-20,19,-52.3333333333333,9.27,Actual,76.8,1225,39512223
      Texas,48,2020-4-20,28,-40,16.1066666666667,Actual,24.6,563,28995881
      Massachusetts,25,2020-4-20,13,-59.6666666666667,5.35,Actual,187.4,1705,6892503
      Florida,12,2020-4-20,27,-49.3333333333333,13.5266666666667,Actual,33.6,822,21477737
      Illinois,17,2020-4-20,13,-46,6.74333333333333,Actual,86.6,1349,12671821
      Pennsylvania,42,2020-4-20,13,-48.6666666666667,6.47666666666667,Actual,150.4,1348,12801989
      Michigan,26,2020-4-20,15,-50.6666666666667,6.77666666666667,Actual,120.4,2618,9986857
      Connecticut,9,2020-4-20,28,-47,14.24,Actual,101.6,1331,3565287
      Louisiana,22,2020-4-20,32,-37.3333333333333,18.7233333333333,Actual,52,1328,4648794
      Georgia,13,2020-4-20,33,-42.6666666666667,19.1533333333333,Actual,39.6,775,10617423
      Arizona,4,2020-4-20,25,-39.3333333333333,14.89,Actual,9.6,191,7278717
      Ohio,39,2020-4-20,11,-34.3333333333333,6.70333333333333,Actual,38.4,509,11689100
      Maryland,24,2020-4-20,7,-49.6666666666667,3.63333333333333,Actual,72.8,582,6045680
      Indiana,18,2020-4-20,12,-30.3333333333333,7.58,Actual,28.8,577,6732219
      Virginia,51,2020-4-20,22,-46.6666666666667,11.9266666666667,Actual,23.6,300,8535519
      North Carolina,37,2020-4-20,20,-42.6666666666667,11.4733333333333,Actual,17.6,218,10488084
      South Carolina,45,2020-4-20,22,-34.3333333333333,13.9633333333333,Actual,4.8,123,5148714
      Mississippi,28,2020-4-20,24,-26,16.3333333333333,Actual,10.6,169,2976149
      Colorado,8,2020-4-20,28,-45.6666666666667,13.8433333333333,Actual,23.4,447,5758736
      Alabama,1,2020-4-20,22,-29,14.3666666666667,Actual,9.6,163,4903185
      Minnesota,27,2020-4-20,6,-47.6666666666667,3.26333333333333,Actual,13.6,143,5639632
      Washington,53,2020-4-20,34,-46.6666666666667,17.7666666666667,Actual,16.6,643,7614893
      Missouri,29,2020-4-20,6,-35,4.01333333333333,Actual,14.4,250,6137428
      Tennessee,47,2020-4-20,7,-31.6666666666667,4.67333333333333,Actual,3.2,152,6829174
      Rhode Island,44,2020-4-20,3,-51,1.51,Actual,12.6,155,1059361
      Wisconsin,55,2020-4-20,24,-38,14.1266666666667,Actual,8.4,230,5822434
      Nevada,32,2020-4-20,7,-49,3.52666666666667,Actual,6,159,3080156
      Iowa,19,2020-4-20,16,-31.3333333333333,10.5333333333333,Actual,5.2,79,3155070
      Oklahoma,40,2020-4-20,10,-26,6.96666666666667,Actual,6.8,143,3956971
      Kentucky,21,2020-4-20,20,-33,12.6,Actual,9.6,154,4467673
      New York,36,2020-4-21,23,-64.6666666666667,8.63666666666667,Actual,457.4,20351,26161672
      New Jersey,34,2020-4-21,19,-63,7.2,Actual,308.8,5974,8882190
      California,6,2020-4-21,20,-52,9.75,Actual,78.6,1282,39512223
      Texas,48,2020-4-21,29,-39.6666666666667,16.71,Actual,29.4,601,28995881
      Massachusetts,25,2020-4-21,14,-60.3333333333333,5.74666666666667,Actual,191.2,1960,6892503
      Florida,12,2020-4-21,28,-46.6666666666667,14.06,Actual,47.8,867,21477737
      Illinois,17,2020-4-21,14,-46.6666666666667,7.27666666666667,Actual,85.8,1468,12671821
      Pennsylvania,42,2020-4-21,14,-50.3333333333333,6.97333333333333,Actual,136.4,1614,12801989
      Michigan,26,2020-4-21,16,-54,7.23666666666667,Actual,137.2,2726,9986857
      Connecticut,9,2020-4-21,29,-51,14.73,Actual,110.6,1423,3565287
      Louisiana,22,2020-4-21,33,-34.6666666666667,19.3766666666667,Actual,66.4,1405,4648794
      Georgia,13,2020-4-21,34,-41,19.7433333333333,Actual,41.6,798,10617423
      Arizona,4,2020-4-21,26,-39,15.5,Actual,13.8,208,7278717
      Ohio,39,2020-4-21,12,-36,7.34333333333333,Actual,41,557,11689100
      Maryland,24,2020-4-21,8,-50,4.13333333333333,Actual,65.4,652,6045680
      Indiana,18,2020-4-21,13,-31,8.27,Actual,32.2,635,6732219
      Virginia,51,2020-4-21,23,-43.6666666666667,12.49,Actual,23,324,8535519
      North Carolina,37,2020-4-21,21,-37.6666666666667,12.0966666666667,Actual,18.8,245,10488084
      South Carolina,45,2020-4-21,23,-29.3333333333333,14.67,Actual,6.2,124,5148714
      Mississippi,28,2020-4-21,25,-23.3333333333333,17.1,Actual,9.8,183,2976149
      Colorado,8,2020-4-21,29,-47.3333333333333,14.37,Actual,28.2,483,5758736
      Alabama,1,2020-4-21,23,-28,15.0866666666667,Actual,9.8,183,4903185
      Minnesota,27,2020-4-21,7,-45.6666666666667,3.80666666666667,Actual,15.8,160,5639632
      Washington,53,2020-4-21,35,-48.3333333333333,18.2833333333333,Actual,19.6,664,7614893
      Missouri,29,2020-4-21,7,-34,4.67333333333333,Actual,16,268,6137428
      Tennessee,47,2020-4-21,8,-30.3333333333333,5.37,Actual,5.8,157,6829174
      Rhode Island,44,2020-4-21,4,-54,1.97,Actual,10.4,171,1059361
      Wisconsin,55,2020-4-21,25,-38,14.7466666666667,Actual,9.2,244,5822434
      Nevada,32,2020-4-21,8,-47,4.05666666666667,Actual,8.8,163,3080156
      Iowa,19,2020-4-21,17,-30.3333333333333,11.23,Actual,4.4,83,3155070
      Oklahoma,40,2020-4-21,11,-25.6666666666667,7.71,Actual,8.6,164,3956971
      Kentucky,21,2020-4-21,21,-32,13.28,Actual,9.4,171,4467673
      New York,36,2020-4-22,24,-62.3333333333333,9.01333333333333,Actual,594.2,20866,26161672
      New Jersey,34,2020-4-22,20,-60.3333333333333,7.59666666666667,Actual,299.6,6407,8882190
      California,6,2020-4-22,21,-52,10.23,Actual,88.8,1421,39512223
      Texas,48,2020-4-22,30,-40.3333333333333,17.3066666666667,Actual,30.6,626,28995881
      Massachusetts,25,2020-4-22,15,-59,6.15666666666667,Actual,170,2181,6892503
      Florida,12,2020-4-22,29,-47,14.59,Actual,54.4,893,21477737
      Illinois,17,2020-4-22,15,-47.3333333333333,7.80333333333333,Actual,101,1565,12671821
      Pennsylvania,42,2020-4-22,15,-48,7.49333333333333,Actual,94.2,1673,12801989
      Michigan,26,2020-4-22,17,-53.3333333333333,7.70333333333333,Actual,141,2962,9986857
      Connecticut,9,2020-4-22,30,-47.6666666666667,15.2533333333333,Actual,128,1544,3565287
      Louisiana,22,2020-4-22,34,-36.3333333333333,20.0133333333333,Actual,72.8,1473,4648794
      Georgia,13,2020-4-22,35,-41,20.3333333333333,Actual,42.4,848,10617423
      Arizona,4,2020-4-22,27,-39,16.11,Actual,16.4,231,7278717
      Ohio,39,2020-4-22,13,-35.3333333333333,7.99,Actual,43.8,610,11689100
      Maryland,24,2020-4-22,9,-48.3333333333333,4.65,Actual,67.4,698,6045680
      Indiana,18,2020-4-22,14,-31.6666666666667,8.95333333333333,Actual,35.8,666,6732219
      Virginia,51,2020-4-22,24,-42,13.07,Actual,26.8,349,8535519
      North Carolina,37,2020-4-22,22,-38.3333333333333,12.7133333333333,Actual,18.8,265,10488084
      South Carolina,45,2020-4-22,24,-29.3333333333333,15.3766666666667,Actual,7.4,140,5148714
      Mississippi,28,2020-4-22,26,-25.6666666666667,17.8433333333333,Actual,10,193,2976149
      Colorado,8,2020-4-22,30,-47.6666666666667,14.8933333333333,Actual,50.8,506,5758736
      Alabama,1,2020-4-22,24,-28.3333333333333,15.8033333333333,Actual,10.4,196,4903185
      Minnesota,27,2020-4-22,8,-43.6666666666667,4.37,Actual,17.4,179,5639632
      Washington,53,2020-4-22,36,-50.6666666666667,18.7766666666667,Actual,17.2,686,7614893
      Missouri,29,2020-4-22,8,-32.6666666666667,5.34666666666667,Actual,19.8,288,6137428
      Tennessee,47,2020-4-22,9,-32,6.05,Actual,4.2,157,6829174
      Rhode Island,44,2020-4-22,5,-51.3333333333333,2.45666666666667,Actual,10.4,181,1059361
      Wisconsin,55,2020-4-22,26,-38.3333333333333,15.3633333333333,Actual,8.6,248,5822434
      Nevada,32,2020-4-22,9,-46.3333333333333,4.59333333333333,Actual,7.8,172,3080156
      Iowa,19,2020-4-22,18,-28.6666666666667,11.9433333333333,Actual,6.4,90,3155070
      Oklahoma,40,2020-4-22,12,-30.3333333333333,8.40666666666667,Actual,9.6,170,3956971
      Kentucky,21,2020-4-22,22,-32.3333333333333,13.9566666666667,Actual,10.8,185,4467673
      New York,36,2020-4-23,25,-62.6666666666667,9.38666666666667,Actual,557.4,21523,26161672
      New Jersey,34,2020-4-23,21,-61.3333333333333,7.98333333333333,Actual,319.2,6713,8882190
      California,6,2020-4-23,22,-52,10.71,Actual,92.8,1533,39512223
      Texas,48,2020-4-23,31,-38.6666666666667,17.92,Actual,31.4,676,28995881
      Massachusetts,25,2020-4-23,16,-57.3333333333333,6.58333333333333,Actual,204.8,2359,6892503
      Florida,12,2020-4-23,30,-48.3333333333333,15.1066666666667,Actual,46.6,987,21477737
      Illinois,17,2020-4-23,16,-47.6666666666667,8.32666666666667,Actual,105.2,1688,12671821
      Pennsylvania,42,2020-4-23,16,-49.6666666666667,7.99666666666667,Actual,89,1724,12801989
      Michigan,26,2020-4-23,18,-54.3333333333333,8.16,Actual,138,3129,9986857
      Connecticut,9,2020-4-23,31,-48,15.7733333333333,Actual,106.8,1639,3565287
      Louisiana,22,2020-4-23,35,-39.3333333333333,20.62,Actual,75.8,1599,4648794
      Georgia,13,2020-4-23,36,-47.3333333333333,20.86,Actual,26.4,881,10617423
      Arizona,4,2020-4-23,28,-40,16.71,Actual,16.4,249,7278717
      Ohio,39,2020-4-23,14,-38,8.61,Actual,40.4,656,11689100
      Maryland,24,2020-4-23,10,-51,5.14,Actual,58.6,748,6045680
      Indiana,18,2020-4-23,15,-36,9.59333333333333,Actual,41.8,706,6732219
      Virginia,51,2020-4-23,25,-46,13.61,Actual,27.4,373,8535519
      North Carolina,37,2020-4-23,23,-43.6666666666667,13.2766666666667,Actual,17.4,281,10488084
      South Carolina,45,2020-4-23,25,-35.6666666666667,16.02,Actual,8.6,150,5148714
      Mississippi,28,2020-4-23,27,-29,18.5533333333333,Actual,10.4,201,2976149
      Colorado,8,2020-4-23,31,-48.3333333333333,15.41,Actual,47.4,552,5758736
      Alabama,1,2020-4-23,25,-36.6666666666667,16.4366666666667,Actual,9.2,202,4903185
      Minnesota,27,2020-4-23,9,-46.3333333333333,4.90666666666667,Actual,20.2,200,5639632
      Washington,53,2020-4-23,37,-49.6666666666667,19.28,Actual,18.8,711,7614893
      Missouri,29,2020-4-23,9,-36.3333333333333,5.98333333333333,Actual,18.4,303,6137428
      Tennessee,47,2020-4-23,10,-36.3333333333333,6.68666666666667,Actual,5,171,6829174
      Rhode Island,44,2020-4-23,6,-50.3333333333333,2.95333333333333,Actual,12,189,1059361
      Wisconsin,55,2020-4-23,27,-39.6666666666667,15.9666666666667,Actual,7.2,258,5822434
      Nevada,32,2020-4-23,10,-49,5.10333333333333,Actual,9.2,195,3080156
      Iowa,19,2020-4-23,19,-30.6666666666667,12.6366666666667,Actual,6.6,96,3155070
      Oklahoma,40,2020-4-23,13,-24,9.16666666666667,Actual,10.2,179,3956971
      Kentucky,21,2020-4-23,23,-39.3333333333333,14.5633333333333,Actual,10.2,191,4467673
      New York,36,2020-4-24,26,-64,9.74666666666667,Actual,513.2,22076,26161672
      New Jersey,34,2020-4-24,22,-64,8.34333333333333,Actual,271.2,7003,8882190
      California,6,2020-4-24,23,-52,11.19,Actual,88.6,1621,39512223
      Texas,48,2020-4-24,32,-39.3333333333333,18.5266666666667,Actual,27.4,699,28995881
      Massachusetts,25,2020-4-24,17,-60.3333333333333,6.98,Actual,187.6,2555,6892503
      Florida,12,2020-4-24,31,-51.3333333333333,15.5933333333333,Actual,41.6,1046,21477737
      Illinois,17,2020-4-24,17,-47.3333333333333,8.85333333333334,Actual,93,1795,12671821
      Pennsylvania,42,2020-4-24,17,-51.6666666666667,8.48,Actual,40.4,1747,12801989
      Michigan,26,2020-4-24,19,-53,8.63,Actual,149.2,3239,9986857
      Connecticut,9,2020-4-24,32,-51.3333333333333,16.26,Actual,100.2,1767,3565287
      Louisiana,22,2020-4-24,36,-38.3333333333333,21.2366666666667,Actual,64.8,1660,4648794
      Georgia,13,2020-4-24,37,-41.3333333333333,21.4466666666667,Actual,23.6,899,10617423
      Arizona,4,2020-4-24,29,-40.3333333333333,17.3066666666667,Actual,13.4,266,7278717
      Ohio,39,2020-4-24,15,-35.3333333333333,9.25666666666667,Actual,34.2,690,11689100
      Maryland,24,2020-4-24,11,-52,5.62,Actual,51.6,798,6045680
      Indiana,18,2020-4-24,16,-33.6666666666667,10.2566666666667,Actual,35.6,741,6732219
      Virginia,51,2020-4-24,26,-46.3333333333333,14.1466666666667,Actual,25,411,8535519
      North Carolina,37,2020-4-24,24,-39.3333333333333,13.8833333333333,Actual,15.8,294,10488084
      South Carolina,45,2020-4-24,26,-32.3333333333333,16.6966666666667,Actual,10,157,5148714
      Mississippi,28,2020-4-24,28,-27.6666666666667,19.2766666666667,Actual,8.8,209,2976149
      Colorado,8,2020-4-24,32,-48,15.93,Actual,41,674,5758736
      Alabama,1,2020-4-24,26,-30.3333333333333,17.1333333333333,Actual,7.2,209,4903185
      Minnesota,27,2020-4-24,10,-46,5.44666666666667,Actual,22.4,221,5639632
      Washington,53,2020-4-24,38,-49,19.79,Actual,17,722,7614893
      Missouri,29,2020-4-24,10,-32,6.66333333333333,Actual,18.2,328,6137428
      Tennessee,47,2020-4-24,11,-34,7.34666666666667,Actual,4.8,169,6829174
      Rhode Island,44,2020-4-24,7,-54.6666666666667,3.40666666666667,Actual,11,202,1059361
      Wisconsin,55,2020-4-24,28,-38.6666666666667,16.58,Actual,5.6,263,5822434
      Nevada,32,2020-4-24,11,-49.3333333333333,5.61,Actual,8.6,197,3080156
      Iowa,19,2020-4-24,20,-30,13.3366666666667,Actual,7,107,3155070
      Oklahoma,40,2020-4-24,14,-27,9.89666666666667,Actual,6.2,188,3956971
      Kentucky,21,2020-4-24,24,-35,15.2133333333333,Actual,7.4,200,4467673
      New York,36,2020-4-25,27,-52,10.2266666666667,Actual,506.6,22511,26161672
      New Jersey,34,2020-4-25,23,-51.3333333333333,8.83,Actual,213.2,7274,8882190
      California,6,2020-4-25,24,-45.6666666666667,11.7333333333333,Actual,71.6,1689,39512223
      Texas,48,2020-4-25,33,-34.6666666666667,19.18,Actual,26.8,720,28995881
      Massachusetts,25,2020-4-25,18,-47,7.51,Actual,164.2,2729,6892503
      Florida,12,2020-4-25,32,-46.6666666666667,16.1266666666667,Actual,39,1055,21477737
      Illinois,17,2020-4-25,18,-43.3333333333333,9.42,Actual,83.6,1875,12671821
      Pennsylvania,42,2020-4-25,18,-39.3333333333333,9.08666666666667,Actual,42.6,1793,12801989
      Michigan,26,2020-4-25,20,-45.6666666666667,9.17333333333334,Actual,119.6,3308,9986857
      Connecticut,9,2020-4-25,33,-38,16.88,Actual,93.6,1865,3565287
      Louisiana,22,2020-4-25,37,-35.3333333333333,21.8833333333333,Actual,53.4,1707,4648794
      Georgia,13,2020-4-25,38,-35,22.0966666666667,Actual,29.4,907,10617423
      Arizona,4,2020-4-25,30,-36.3333333333333,17.9433333333333,Actual,8.8,273,7278717
      Ohio,39,2020-4-25,16,-29,9.96666666666667,Actual,28.6,711,11689100
      Maryland,24,2020-4-25,12,-39.6666666666667,6.22333333333333,Actual,49.4,875,6045680
      Indiana,18,2020-4-25,17,-30.6666666666667,10.95,Actual,35.6,786,6732219
      Virginia,51,2020-4-25,27,-39,14.7566666666667,Actual,22.2,437,8535519
      North Carolina,37,2020-4-25,25,-37.6666666666667,14.5066666666667,Actual,15,305,10488084
      South Carolina,45,2020-4-25,27,-29.6666666666667,17.4,Actual,7.4,166,5148714
      Mississippi,28,2020-4-25,29,-25.3333333333333,20.0233333333333,Actual,7.2,221,2976149
      Colorado,8,2020-4-25,33,-41.3333333333333,16.5166666666667,Actual,40,684,5758736
      Alabama,1,2020-4-25,27,-25.6666666666667,17.8766666666667,Actual,6.4,209,4903185
      Minnesota,27,2020-4-25,11,-38.3333333333333,6.06333333333333,Actual,21.4,244,5639632
      Washington,53,2020-4-25,39,-42.6666666666667,20.3633333333333,Actual,15.6,737,7614893
      Missouri,29,2020-4-25,11,-32,7.34333333333333,Actual,18.4,342,6137428
      Tennessee,47,2020-4-25,12,-31.6666666666667,8.03,Actual,5.4,177,6829174
      Rhode Island,44,2020-4-25,8,-41.3333333333333,3.99333333333333,Actual,10.4,215,1059361
      Wisconsin,55,2020-4-25,29,-33,17.25,Actual,6.6,266,5822434
      Nevada,32,2020-4-25,12,-48.6666666666667,6.12333333333333,Actual,6.8,205,3080156
      Iowa,19,2020-4-25,21,-25,14.0866666666667,Actual,7.4,112,3155070
      Oklahoma,40,2020-4-25,15,-20,10.6966666666667,Actual,5.4,194,3956971
      Kentucky,21,2020-4-25,25,-32,15.8933333333333,Actual,5.6,205,4467673
      New York,36,2020-4-26,28,-60,10.6266666666667,Actual,442.2,22917,26161672
      New Jersey,34,2020-4-26,24,-61.3333333333333,9.21666666666667,Actual,238.2,7330,8882190
      California,6,2020-4-26,25,-47.3333333333333,12.26,Actual,66.2,1725,39512223
      Texas,48,2020-4-26,34,-37.3333333333333,19.8066666666667,Actual,24.8,738,28995881
      Massachusetts,25,2020-4-26,19,-55.3333333333333,7.95666666666667,Actual,158.6,2898,6892503
      Florida,12,2020-4-26,33,-50,16.6266666666667,Actual,36.8,1075,21477737
      Illinois,17,2020-4-26,19,-39,10.03,Actual,87.4,1933,12671821
      Pennsylvania,42,2020-4-26,19,-48.3333333333333,9.60333333333334,Actual,64.4,1816,12801989
      Michigan,26,2020-4-26,21,-43,9.74333333333334,Actual,119.6,3472,9986857
      Connecticut,9,2020-4-26,34,-49.6666666666667,17.3833333333333,Actual,89.6,1924,3565287
      Louisiana,22,2020-4-26,38,-36.3333333333333,22.52,Actual,40.4,1729,4648794
      Georgia,13,2020-4-26,39,-41,22.6866666666667,Actual,31,916,10617423
      Arizona,4,2020-4-26,31,-37.3333333333333,18.57,Actual,5.2,275,7278717
      Ohio,39,2020-4-26,17,-38,10.5866666666667,Actual,28.6,728,11689100
      Maryland,24,2020-4-26,13,-49.3333333333333,6.73,Actual,53.6,910,6045680
      Indiana,18,2020-4-26,18,-30.6666666666667,11.6433333333333,Actual,39,813,6732219
      Virginia,51,2020-4-26,28,-43.3333333333333,15.3233333333333,Actual,23.8,449,8535519
      North Carolina,37,2020-4-26,26,-40,15.1066666666667,Actual,16.4,324,10488084
      South Carolina,45,2020-4-26,28,-31.3333333333333,18.0866666666667,Actual,8.4,174,5148714
      Mississippi,28,2020-4-26,30,-25.6666666666667,20.7666666666667,Actual,7.6,227,2976149
      Colorado,8,2020-4-26,34,-43,17.0866666666667,Actual,36.8,688,5758736
      Alabama,1,2020-4-26,28,-30,18.5766666666667,Actual,8,219,4903185
      Minnesota,27,2020-4-26,12,-40,6.66333333333333,Actual,20.2,272,5639632
      Washington,53,2020-4-26,40,-39.6666666666667,20.9666666666667,Actual,15,749,7614893
      Missouri,29,2020-4-26,12,-26.6666666666667,8.07666666666667,Actual,18,359,6137428
      Tennessee,47,2020-4-26,13,-34.6666666666667,8.68333333333333,Actual,3.4,181,6829174
      Rhode Island,44,2020-4-26,9,-51,4.48333333333333,Actual,10,226,1059361
      Wisconsin,55,2020-4-26,30,-30.3333333333333,17.9466666666667,Actual,8.4,272,5822434
      Nevada,32,2020-4-26,13,-51.3333333333333,6.61,Actual,4.8,206,3080156
      Iowa,19,2020-4-26,22,-25,14.8366666666667,Actual,8,118,3155070
      Oklahoma,40,2020-4-26,16,-22,11.4766666666667,Actual,5.6,195,3956971
      Kentucky,21,2020-4-26,26,-36.6666666666667,16.5266666666667,Actual,6.8,208,4467673
      New York,36,2020-4-27,29,-61.6666666666667,11.01,Actual,420.8,23399,26161672
      New Jersey,34,2020-4-27,25,-60.3333333333333,9.61333333333333,Actual,250.2,7473,8882190
      California,6,2020-4-27,26,-50.3333333333333,12.7566666666667,Actual,65,1779,39512223
      Texas,48,2020-4-27,35,-37.6666666666667,20.43,Actual,27,760,28995881
      Massachusetts,25,2020-4-27,20,-60.6666666666667,8.35,Actual,169.8,3002,6892503
      Florida,12,2020-4-27,34,-45.3333333333333,17.1733333333333,Actual,34.4,1088,21477737
      Illinois,17,2020-4-27,20,-45.6666666666667,10.5733333333333,Actual,84,1983,12671821
      Pennsylvania,42,2020-4-27,20,-46.6666666666667,10.1366666666667,Actual,125.2,1886,12801989
      Michigan,26,2020-4-27,22,-46.3333333333333,10.28,Actual,117.6,3560,9986857
      Connecticut,9,2020-4-27,35,-47.6666666666667,17.9066666666667,Actual,80.4,2012,3565287
      Louisiana,22,2020-4-27,39,-33.6666666666667,23.1833333333333,Actual,37,1740,4648794
      Georgia,13,2020-4-27,40,-38.3333333333333,23.3033333333333,Actual,40.4,995,10617423
      Arizona,4,2020-4-27,32,-38,19.19,Actual,8.4,275,7278717
      Ohio,39,2020-4-27,18,-30.6666666666667,11.28,Actual,49.4,753,11689100
      Maryland,24,2020-4-27,14,-49,7.24,Actual,56,945,6045680
      Indiana,18,2020-4-27,19,-27.6666666666667,12.3666666666667,Actual,44.6,844,6732219
      Virginia,51,2020-4-27,29,-43.3333333333333,15.89,Actual,22.2,460,8535519
      North Carolina,37,2020-4-27,27,-36,15.7466666666667,Actual,17.6,340,10488084
      South Carolina,45,2020-4-27,29,-27,18.8166666666667,Actual,14.8,177,5148714
      Mississippi,28,2020-4-27,31,-22,21.5466666666667,Actual,8.2,229,2976149
      Colorado,8,2020-4-27,35,-42,17.6666666666667,Actual,18.4,706,5758736
      Alabama,1,2020-4-27,29,-26,19.3166666666667,Actual,9.4,228,4903185
      Minnesota,27,2020-4-27,13,-42,7.24333333333333,Actual,19.6,286,5639632
      Washington,53,2020-4-27,41,-46,21.5066666666667,Actual,15.8,764,7614893
      Missouri,29,2020-4-27,13,-32,8.75666666666667,Actual,16,380,6137428
      Tennessee,47,2020-4-27,14,-27.6666666666667,9.40666666666667,Actual,5.2,184,6829174
      Rhode Island,44,2020-4-27,10,-53,4.95333333333333,Actual,9.8,233,1059361
      Wisconsin,55,2020-4-27,31,-37.3333333333333,18.5733333333333,Actual,9,281,5822434
      Nevada,32,2020-4-27,14,-46.6666666666667,7.14333333333333,Actual,6.6,206,3080156
      Iowa,19,2020-4-27,23,-26.6666666666667,15.57,Actual,8.2,127,3155070
      Oklahoma,40,2020-4-27,17,-23.6666666666667,12.24,Actual,5.2,197,3956971
      Kentucky,21,2020-4-27,27,-29.6666666666667,17.23,Actual,6.8,213,4467673
      New York,36,2020-4-28,30,-58.3333333333333,11.4266666666667,Actual,408.2,23734,26161672
      New Jersey,34,2020-4-28,26,-56.6666666666667,10.0466666666667,Actual,292.6,7904,8882190
      California,6,2020-4-28,27,-50,13.2566666666667,Actual,68.4,1864,39512223
      Texas,48,2020-4-28,36,-38,21.05,Actual,33.8,800,28995881
      Massachusetts,25,2020-4-28,21,-56.3333333333333,8.78666666666667,Actual,166.4,3152,6892503
      Florida,12,2020-4-28,35,-44.3333333333333,17.73,Actual,42.6,1171,21477737
      Illinois,17,2020-4-28,21,-45,11.1233333333333,Actual,96,2125,12671821
      Pennsylvania,42,2020-4-28,21,-44.3333333333333,10.6933333333333,Actual,136.4,2046,12801989
      Michigan,26,2020-4-28,23,-44.3333333333333,10.8366666666667,Actual,127.8,3727,9986857
      Connecticut,9,2020-4-28,36,-42.6666666666667,18.48,Actual,78.4,2087,3565287
      Louisiana,22,2020-4-28,40,-36.3333333333333,23.82,Actual,39.6,1801,4648794
      Georgia,13,2020-4-28,41,-37.3333333333333,23.93,Actual,45,1036,10617423
      Arizona,4,2020-4-28,33,-37.3333333333333,19.8166666666667,Actual,9.4,275,7278717
      Ohio,39,2020-4-28,19,-31,11.97,Actual,53,799,11689100
      Maryland,24,2020-4-28,15,-48,7.76,Actual,53,1016,6045680
      Indiana,18,2020-4-28,20,-27.3333333333333,13.0933333333333,Actual,65.6,901,6732219
      Virginia,51,2020-4-28,30,-42,16.47,Actual,23,492,8535519
      North Carolina,37,2020-4-28,28,-34.6666666666667,16.4,Actual,20.2,363,10488084
      South Carolina,45,2020-4-28,30,-25.3333333333333,19.5633333333333,Actual,15.6,192,5148714
      Mississippi,28,2020-4-28,32,-21.6666666666667,22.33,Actual,8,239,2976149
      Colorado,8,2020-4-28,36,-43.3333333333333,18.2333333333333,Actual,18.6,736,5758736
      Alabama,1,2020-4-28,30,-26,20.0566666666667,Actual,12.6,242,4903185
      Minnesota,27,2020-4-28,14,-47.3333333333333,7.77,Actual,19.8,301,5639632
      Washington,53,2020-4-28,42,-45.6666666666667,22.05,Actual,15.4,786,7614893
      Missouri,29,2020-4-28,14,-32,9.43666666666667,Actual,17,393,6137428
      Tennessee,47,2020-4-28,15,-26.6666666666667,10.14,Actual,4.4,188,6829174
      Rhode Island,44,2020-4-28,11,-47.3333333333333,5.48,Actual,10.2,239,1059361
      Wisconsin,55,2020-4-28,32,-37,19.2033333333333,Actual,10,300,5822434
      Nevada,32,2020-4-28,15,-45,7.69333333333333,Actual,7.6,219,3080156
      Iowa,19,2020-4-28,24,-29,16.28,Actual,10,136,3155070
      Oklahoma,40,2020-4-28,18,-24.6666666666667,12.9933333333333,Actual,5.6,207,3956971
      Kentucky,21,2020-4-28,28,-28.6666666666667,17.9433333333333,Actual,7,225,4467673
      New York,36,2020-4-29,31,-60.3333333333333,11.8233333333333,Actual,400.8,24180,26161672
      New Jersey,34,2020-4-29,27,-58.6666666666667,10.46,Actual,348.4,8254,8882190
      California,6,2020-4-29,28,-49.6666666666667,13.76,Actual,80.2,1946,39512223
      Texas,48,2020-4-29,37,-36.3333333333333,21.6866666666667,Actual,35.2,834,28995881
      Massachusetts,25,2020-4-29,22,-55.3333333333333,9.23333333333333,Actual,163.4,3404,6892503
      Florida,12,2020-4-29,36,-44.6666666666667,18.2833333333333,Actual,47.8,1218,21477737
      Illinois,17,2020-4-29,22,-48.6666666666667,11.6366666666667,Actual,104.8,2215,12671821
      Pennsylvania,42,2020-4-29,22,-44.6666666666667,11.2466666666667,Actual,163.8,2373,12801989
      Michigan,26,2020-4-29,24,-48.6666666666667,11.35,Actual,110.6,3827,9986857
      Connecticut,9,2020-4-29,37,-45.3333333333333,19.0266666666667,Actual,83,2169,3565287
      Louisiana,22,2020-4-29,41,-35.3333333333333,24.4666666666667,Actual,48.2,1845,4648794
      Georgia,13,2020-4-29,42,-39,24.54,Actual,50.6,1101,10617423
      Arizona,4,2020-4-29,34,-37.3333333333333,20.4433333333333,Actual,11,308,7278717
      Ohio,39,2020-4-29,20,-33.3333333333333,12.6366666666667,Actual,55,937,11689100
      Maryland,24,2020-4-29,16,-46,8.3,Actual,34,1078,6045680
      Indiana,18,2020-4-29,21,-31,13.7833333333333,Actual,72.4,964,6732219
      Virginia,51,2020-4-29,31,-40.3333333333333,17.0666666666667,Actual,26.4,522,8535519
      North Carolina,37,2020-4-29,29,-36,17.04,Actual,19,382,10488084
      South Carolina,45,2020-4-29,31,-26.6666666666667,20.2966666666667,Actual,16.4,231,5148714
      Mississippi,28,2020-4-29,33,-22,23.11,Actual,10.8,250,2976149
      Colorado,8,2020-4-29,37,-42.6666666666667,18.8066666666667,Actual,26.6,766,5758736
      Alabama,1,2020-4-29,31,-28.3333333333333,20.7733333333333,Actual,14,256,4903185
      Minnesota,27,2020-4-29,15,-42.6666666666667,8.34333333333333,Actual,19.6,319,5639632
      Washington,53,2020-4-29,43,-45,22.6,Actual,15,801,7614893
      Missouri,29,2020-4-29,15,-28.6666666666667,10.15,Actual,16.4,408,6137428
      Tennessee,47,2020-4-29,16,-28.6666666666667,10.8533333333333,Actual,4.6,195,6829174
      Rhode Island,44,2020-4-29,12,-46.6666666666667,6.01333333333333,Actual,10.6,251,1059361
      Wisconsin,55,2020-4-29,33,-39,19.8133333333333,Actual,11,308,5822434
      Nevada,32,2020-4-29,16,-44.6666666666667,8.24666666666666,Actual,8,230,3080156
      Iowa,19,2020-4-29,25,-27.6666666666667,17.0033333333333,Actual,10.4,148,3155070
      Oklahoma,40,2020-4-29,19,-17.6666666666667,13.8166666666667,Actual,7,214,3956971
      Kentucky,21,2020-4-29,29,-31.6666666666667,18.6266666666667,Actual,7.6,234,4467673
      New York,36,2020-4-30,32,-61.6666666666667,12.2066666666667,Actual,362.4,24552,26161672
      New Jersey,34,2020-4-30,28,-60.6666666666667,10.8533333333333,Actual,365.8,8737,8882190
      California,6,2020-4-30,29,-49,14.27,Actual,80.2,2031,39512223
      Texas,48,2020-4-30,38,-35,22.3366666666667,Actual,34.6,889,28995881
      Massachusetts,25,2020-4-30,23,-58.3333333333333,9.65,Actual,168.6,3561,6892503
      Florida,12,2020-4-30,37,-46.3333333333333,18.82,Actual,55.2,1268,21477737
      Illinois,17,2020-4-30,23,-44.6666666666667,12.19,Actual,115.2,2355,12671821
      Pennsylvania,42,2020-4-30,23,-48.3333333333333,11.7633333333333,Actual,161.8,2475,12801989
      Michigan,26,2020-4-30,25,-48,11.87,Actual,124,3947,9986857
      Connecticut,9,2020-4-30,38,-49.3333333333333,19.5333333333333,Actual,84.8,2257,3565287
      Louisiana,22,2020-4-30,42,-31.6666666666667,25.15,Actual,50.6,1905,4648794
      Georgia,13,2020-4-30,43,-37.3333333333333,25.1666666666667,Actual,36.4,1132,10617423
      Arizona,4,2020-4-30,35,-37.3333333333333,21.07,Actual,11,320,7278717
      Ohio,39,2020-4-30,21,-34.3333333333333,13.2933333333333,Actual,53.8,976,11689100
      Maryland,24,2020-4-30,17,-54.3333333333333,8.75666666666666,Actual,61.2,1140,6045680
      Indiana,18,2020-4-30,22,-31,14.4733333333333,Actual,77,1114,6732219
      Virginia,51,2020-4-30,32,-46.6666666666667,17.6,Actual,31.4,552,8535519
      North Carolina,37,2020-4-30,30,-39.3333333333333,17.6466666666667,Actual,18.2,406,10488084
      South Carolina,45,2020-4-30,32,-27.6666666666667,21.02,Actual,18,244,5148714
      Mississippi,28,2020-4-30,34,-19.6666666666667,23.9133333333333,Actual,12.4,261,2976149
      Colorado,8,2020-4-30,38,-43.6666666666667,19.37,Actual,25.2,777,5758736
      Alabama,1,2020-4-30,32,-24.3333333333333,21.53,Actual,12,272,4903185
      Minnesota,27,2020-4-30,16,-41.6666666666667,8.92666666666667,Actual,21.6,343,5639632
      Washington,53,2020-4-30,44,-45.6666666666667,23.1433333333333,Actual,13.2,814,7614893
      Missouri,29,2020-4-30,16,-28.6666666666667,10.8633333333333,Actual,15.2,427,6137428
      Tennessee,47,2020-4-30,17,-27.3333333333333,11.58,Actual,5,199,6829174
      Rhode Island,44,2020-4-30,13,-50.3333333333333,6.51,Actual,12.6,266,1059361
      Wisconsin,55,2020-4-30,34,-33,20.4833333333333,Actual,10.6,316,5822434
      Nevada,32,2020-4-30,17,-46,8.78666666666666,Actual,9.8,243,3080156
      Iowa,19,2020-4-30,26,-25.6666666666667,17.7466666666667,Actual,9.6,162,3155070
      Oklahoma,40,2020-4-30,20,-19,14.6266666666667,Actual,8.2,222,3956971
      Kentucky,21,2020-4-30,30,-32,19.3066666666667,Actual,7,240,4467673
      New York,36,2020-5-1,33,-58.3333333333333,12.6233333333333,Actual,352.2,24921,26161672
      New Jersey,34,2020-5-1,29,-57.6666666666667,11.2766666666667,Actual,310.4,9072,8882190
      California,6,2020-5-1,30,-47.6666666666667,14.7933333333333,Actual,70.4,2126,39512223
      Texas,48,2020-5-1,39,-34.6666666666667,22.99,Actual,29.6,914,28995881
      Massachusetts,25,2020-5-1,24,-56.3333333333333,10.0866666666667,Actual,170.2,3715,6892503
      Florida,12,2020-5-1,38,-43.3333333333333,19.3866666666667,Actual,41.6,1314,21477737
      Illinois,17,2020-5-1,24,-41.3333333333333,12.7766666666667,Actual,98.6000000000001,2457,12671821
      Pennsylvania,42,2020-5-1,24,-44,12.3233333333333,Actual,134.8,2635,12801989
      Michigan,26,2020-5-1,26,-43.3333333333333,12.4366666666667,Actual,97.4,4025,9986857
      Connecticut,9,2020-5-1,39,-45.3333333333333,20.08,Actual,69.8,2339,3565287
      Louisiana,22,2020-5-1,43,-32.6666666666667,25.8233333333333,Actual,42.2,1970,4648794
      Georgia,13,2020-5-1,44,-35,25.8166666666667,Actual,29.6,1169,10617423
      Arizona,4,2020-5-1,36,-36.6666666666667,21.7033333333333,Actual,17.4,330,7278717
      Ohio,39,2020-5-1,22,-31,13.9833333333333,Actual,48,1003,11689100
      Maryland,24,2020-5-1,18,-45.6666666666667,9.3,Actual,53,1080,6045680
      Indiana,18,2020-5-1,23,-27.3333333333333,15.2,Actual,69,1175,6732219
      Virginia,51,2020-5-1,33,-40.6666666666667,18.1933333333333,Actual,33.6,581,8535519
      North Carolina,37,2020-5-1,31,-34.3333333333333,18.3033333333333,Actual,14.2,419,10488084
      South Carolina,45,2020-5-1,33,-25.3333333333333,21.7666666666667,Actual,16.6,256,5148714
      Mississippi,28,2020-5-1,35,-21,24.7033333333333,Actual,12.8,281,2976149
      Colorado,8,2020-5-1,39,-41.3333333333333,19.9566666666667,Actual,21.2,821,5758736
      Alabama,1,2020-5-1,33,-23,22.3,Actual,9.6,289,4903185
      Minnesota,27,2020-5-1,17,-41.6666666666667,9.51,Actual,23.4,370,5639632
      Washington,53,2020-5-1,45,-43.6666666666667,23.7066666666667,Actual,9.6,824,7614893
      Missouri,29,2020-5-1,17,-23.3333333333333,11.63,Actual,15,441,6137428
      Tennessee,47,2020-5-1,18,-25.6666666666667,12.3233333333333,Actual,4.4,204,6829174
      Rhode Island,44,2020-5-1,14,-47,7.04,Actual,16.2,279,1059361
      Wisconsin,55,2020-5-1,35,-32,21.1633333333333,Actual,7.8,327,5822434
      Nevada,32,2020-5-1,18,-46,9.32666666666666,Actual,7.8,246,3080156
      Iowa,19,2020-5-1,27,-22.6666666666667,18.52,Actual,9.6,170,3155070
      Oklahoma,40,2020-5-1,21,-17.6666666666667,15.45,Actual,6.2,230,3956971
      Kentucky,21,2020-5-1,31,-28.3333333333333,20.0233333333333,Actual,5.6,246,4467673
      New York,36,2020-5-2,34,-47.6666666666667,13.1466666666667,Actual,333.6,25211,26161672
      New Jersey,34,2020-5-2,30,-46,11.8166666666667,Actual,253,9302,8882190
      California,6,2020-5-2,31,-41.6666666666667,15.3766666666667,Actual,66.4,2180,39512223
      Texas,48,2020-5-2,40,-29.3333333333333,23.6966666666667,Actual,27.6,933,28995881
      Massachusetts,25,2020-5-2,25,-43.3333333333333,10.6533333333333,Actual,137,3845,6892503
      Florida,12,2020-5-2,39,-41.6666666666667,19.97,Actual,36.2,1364,21477737
      Illinois,17,2020-5-2,25,-30.3333333333333,13.4733333333333,Actual,88.8,2559,12671821
      Pennsylvania,42,2020-5-2,25,-34.3333333333333,12.98,Actual,93,2695,12801989
      Michigan,26,2020-5-2,27,-34.6666666666667,13.09,Actual,94.2,4180,9986857
      Connecticut,9,2020-5-2,40,-33.6666666666667,20.7433333333333,Actual,77.4,2436,3565287
      Louisiana,22,2020-5-2,44,-30,26.5233333333333,Actual,43.8,1993,4648794
      Georgia,13,2020-5-2,45,-28,26.5366666666667,Actual,29,1177,10617423
      Arizona,4,2020-5-2,37,-33.6666666666667,22.3666666666667,Actual,10.8,330,7278717
      Ohio,39,2020-5-2,23,-21.6666666666667,14.7666666666667,Actual,24,1022,11689100
      Maryland,24,2020-5-2,19,-33,9.97,Actual,47.8,1251,6045680
      Indiana,18,2020-5-2,24,-18.3333333333333,16.0166666666667,Actual,60,1229,6732219
      Virginia,51,2020-5-2,34,-31.3333333333333,18.88,Actual,32.4,617,8535519
      North Carolina,37,2020-5-2,32,-29.3333333333333,19.01,Actual,12,431,10488084
      South Carolina,45,2020-5-2,34,-22.3333333333333,22.5433333333333,Actual,10.4,267,5148714
      Mississippi,28,2020-5-2,36,-17.6666666666667,25.5266666666667,Actual,12,291,2976149
      Colorado,8,2020-5-2,40,-38.6666666666667,20.57,Actual,17,832,5758736
      Alabama,1,2020-5-2,34,-17.3333333333333,23.1266666666667,Actual,8.4,288,4903185
      Minnesota,27,2020-5-2,18,-34.3333333333333,10.1666666666667,Actual,21.6,394,5639632
      Washington,53,2020-5-2,46,-41.3333333333333,24.2933333333333,Actual,8,830,7614893
      Missouri,29,2020-5-2,18,-22,12.41,Actual,14.2,456,6137428
      Tennessee,47,2020-5-2,19,-18.3333333333333,13.14,Actual,4.8,209,6829174
      Rhode Island,44,2020-5-2,15,-35.3333333333333,7.68666666666667,Actual,18,296,1059361
      Wisconsin,55,2020-5-2,36,-23.6666666666667,21.9266666666667,Actual,6.4,334,5822434
      Nevada,32,2020-5-2,19,-45.3333333333333,9.87333333333333,Actual,7,255,3080156
      Iowa,19,2020-5-2,28,-20,19.32,Actual,8,175,3155070
      Oklahoma,40,2020-5-2,22,-12.3333333333333,16.3266666666667,Actual,4.8,238,3956971
      Kentucky,21,2020-5-2,32,-20.6666666666667,20.8166666666667,Actual,5.4,248,4467673
      New York,36,2020-5-3,35,-47.6666666666667,13.67,Actual,315.6,25495,26161672
      New Jersey,34,2020-5-3,31,-49.3333333333333,12.3233333333333,Actual,225.2,9456,8882190
      California,6,2020-5-3,32,-42.3333333333333,15.9533333333333,Actual,70,2216,39512223
      Texas,48,2020-5-3,41,-31.3333333333333,24.3833333333333,Actual,21.2,948,28995881
      Massachusetts,25,2020-5-3,26,-42,11.2333333333333,Actual,130,4003,6892503
      Florida,12,2020-5-3,40,-44.3333333333333,20.5266666666667,Actual,40.6,1379,21477737
      Illinois,17,2020-5-3,26,-35,14.1233333333333,Actual,95.8,2618,12671821
      Pennsylvania,42,2020-5-3,26,-35,13.63,Actual,140.8,2720,12801989
      Michigan,26,2020-5-3,28,-32.6666666666667,13.7633333333333,Actual,78.8,4214,9986857
      Connecticut,9,2020-5-3,41,-34,21.4033333333333,Actual,75.2,2436,3565287
      Louisiana,22,2020-5-3,45,-32,27.2033333333333,Actual,42,2012,4648794
      Georgia,13,2020-5-3,46,-34.3333333333333,27.1933333333333,Actual,33.4,1184,10617423
      Arizona,4,2020-5-3,38,-34,23.0266666666667,Actual,15,362,7278717
      Ohio,39,2020-5-3,24,-26.3333333333333,15.5033333333333,Actual,31.8,1039,11689100
      Maryland,24,2020-5-3,20,-40.6666666666667,10.5633333333333,Actual,50,1281,6045680
      Indiana,18,2020-5-3,25,-24.6666666666667,16.77,Actual,42.4,1246,6732219
      Virginia,51,2020-5-3,35,-37.3333333333333,19.5066666666667,Actual,32.2,660,8535519
      North Carolina,37,2020-5-3,33,-33,19.68,Actual,13.2,434,10488084
      South Carolina,45,2020-5-3,35,-24,23.3033333333333,Actual,10.4,275,5148714
      Mississippi,28,2020-5-3,37,-20.3333333333333,26.3233333333333,Actual,16.2,303,2976149
      Colorado,8,2020-5-3,41,-35.6666666666667,21.2133333333333,Actual,25.2,842,5758736
      Alabama,1,2020-5-3,35,-21.6666666666667,23.91,Actual,8.6,290,4903185
      Minnesota,27,2020-5-3,19,-34,10.8266666666667,Actual,22.4,418,5639632
      Washington,53,2020-5-3,47,-36.3333333333333,24.93,Actual,9.6,834,7614893
      Missouri,29,2020-5-3,19,-24.6666666666667,13.1633333333333,Actual,16.2,468,6137428
      Tennessee,47,2020-5-3,20,-24.6666666666667,13.8933333333333,Actual,5.4,210,6829174
      Rhode Island,44,2020-5-3,16,-32.3333333333333,8.36333333333333,Actual,17.8,320,1059361
      Wisconsin,55,2020-5-3,37,-24.6666666666667,22.68,Actual,7.4,339,5822434
      Nevada,32,2020-5-3,20,-47.6666666666667,10.3966666666667,Actual,5.4,258,3080156
      Iowa,19,2020-5-3,29,-19,20.13,Actual,9,184,3155070
      Oklahoma,40,2020-5-3,23,-15.6666666666667,17.17,Actual,5,238,3956971
      Kentucky,21,2020-5-3,33,-28.3333333333333,21.5333333333333,Actual,7,253,4467673
      New York,36,2020-5-4,36,-56.6666666666667,14.1033333333333,Actual,355.6,25848,26161672
      New Jersey,34,2020-5-4,32,-54.6666666666667,12.7766666666667,Actual,223,9519,8882190
      California,6,2020-5-4,33,-46.3333333333333,16.49,Actual,67.6,2278,39512223
      Texas,48,2020-5-4,42,-33.3333333333333,25.05,Actual,22.2,972,28995881
      Massachusetts,25,2020-5-4,27,-52.6666666666667,11.7066666666667,Actual,140.8,4089,6892503
      Florida,12,2020-5-4,41,-41,21.1166666666667,Actual,45,1399,21477737
      Illinois,17,2020-5-4,27,-43.3333333333333,14.69,Actual,103.4,2659,12671821
      Pennsylvania,42,2020-5-4,27,-42,14.21,Actual,142,2838,12801989
      Michigan,26,2020-5-4,29,-41.6666666666667,14.3466666666667,Actual,78,4298,9986857
      Connecticut,9,2020-5-4,42,-42,21.9833333333333,Actual,75.8,2556,3565287
      Louisiana,22,2020-5-4,46,-30,27.9033333333333,Actual,39.4,2064,4648794
      Georgia,13,2020-5-4,47,-34,27.8533333333333,Actual,31.6,1246,10617423
      Arizona,4,2020-5-4,39,-35.6666666666667,23.67,Actual,19.2,362,7278717
      Ohio,39,2020-5-4,25,-27.3333333333333,16.23,Actual,44.4,1057,11689100
      Maryland,24,2020-5-4,21,-44,11.1233333333333,Actual,71.4,1317,6045680
      Indiana,18,2020-5-4,26,-23.3333333333333,17.5366666666667,Actual,40.4,1264,6732219
      Virginia,51,2020-5-4,36,-38.6666666666667,20.12,Actual,31.2,684,8535519
      North Carolina,37,2020-5-4,34,-32.3333333333333,20.3566666666667,Actual,14.6,442,10488084
      South Carolina,45,2020-5-4,36,-23,24.0733333333333,Actual,9.8,283,5148714
      Mississippi,28,2020-5-4,38,-17,27.1533333333333,Actual,18.6,310,2976149
      Colorado,8,2020-5-4,42,-39,21.8233333333333,Actual,19.6,851,5758736
      Alabama,1,2020-5-4,36,-19.6666666666667,24.7133333333333,Actual,10.8,298,4903185
      Minnesota,27,2020-5-4,20,-40.3333333333333,11.4233333333333,Actual,23,427,5639632
      Washington,53,2020-5-4,48,-42.6666666666667,25.5033333333333,Actual,9.2,841,7614893
      Missouri,29,2020-5-4,20,-31,13.8533333333333,Actual,16.4,479,6137428
      Tennessee,47,2020-5-4,21,-23,14.6633333333333,Actual,7,219,6829174
      Rhode Island,44,2020-5-4,17,-43.3333333333333,8.93,Actual,18.2,341,1059361
      Wisconsin,55,2020-5-4,38,-32,23.36,Actual,7,340,5822434
      Nevada,32,2020-5-4,21,-44.3333333333333,10.9533333333333,Actual,8.6,265,3080156
      Iowa,19,2020-5-4,30,-25.6666666666667,20.8733333333333,Actual,9.8,188,3155070
      Oklahoma,40,2020-5-4,24,-17.3333333333333,17.9966666666667,Actual,4.6,238,3956971
      Kentucky,21,2020-5-4,34,-26,22.2733333333333,Actual,7.4,261,4467673
      New York,36,2020-5-5,37,-55.6666666666667,14.5466666666667,Actual,343.4,26130,26161672
      New Jersey,34,2020-5-5,33,-53.6666666666667,13.24,Actual,231.6,9863,8882190
      California,6,2020-5-5,34,-46,17.03,Actual,71,2381,39512223
      Texas,48,2020-5-5,43,-32.3333333333333,25.7266666666667,Actual,25,995,28995881
      Massachusetts,25,2020-5-5,28,-52.3333333333333,12.1833333333333,Actual,141.2,4211,6892503
      Florida,12,2020-5-5,42,-40,21.7166666666667,Actual,47.2,1471,21477737
      Illinois,17,2020-5-5,28,-44.6666666666667,15.2433333333333,Actual,110.4,2834,12671821
      Pennsylvania,42,2020-5-5,28,-41.3333333333333,14.7966666666667,Actual,178.8,3179,12801989
      Michigan,26,2020-5-5,30,-41.6666666666667,14.93,Actual,64.6,4341,9986857
      Connecticut,9,2020-5-5,43,-39.3333333333333,22.59,Actual,72.2,2633,3565287
      Louisiana,22,2020-5-5,47,-28.3333333333333,28.62,Actual,43,2115,4648794
      Georgia,13,2020-5-5,48,-32.6666666666667,28.5266666666667,Actual,35.6,1299,10617423
      Arizona,4,2020-5-5,40,-34.6666666666667,24.3233333333333,Actual,24,395,7278717
      Ohio,39,2020-5-5,26,-29.6666666666667,16.9333333333333,Actual,49.8,1135,11689100
      Maryland,24,2020-5-5,22,-44.3333333333333,11.68,Actual,50.4,1390,6045680
      Indiana,18,2020-5-5,27,-26.3333333333333,18.2733333333333,Actual,37,1326,6732219
      Virginia,51,2020-5-5,37,-40,20.72,Actual,30.4,713,8535519
      North Carolina,37,2020-5-5,35,-33,21.0266666666667,Actual,16.4,472,10488084
      South Carolina,45,2020-5-5,37,-22.6666666666667,24.8466666666667,Actual,9.8,296,5148714
      Mississippi,28,2020-5-5,39,-16,27.9933333333333,Actual,21,342,2976149
      Colorado,8,2020-5-5,43,-39,22.4333333333333,Actual,22.4,903,5758736
      Alabama,1,2020-5-5,37,-19.6666666666667,25.5166666666667,Actual,16.2,315,4903185
      Minnesota,27,2020-5-5,21,-40,12.0233333333333,Actual,22.8,455,5639632
      Washington,53,2020-5-5,49,-40.3333333333333,26.1,Actual,12.2,862,7614893
      Missouri,29,2020-5-5,21,-25,14.6033333333333,Actual,18,508,6137428
      Tennessee,47,2020-5-5,22,-22,15.4433333333333,Actual,5.8,226,6829174
      Rhode Island,44,2020-5-5,18,-41.3333333333333,9.51666666666666,Actual,18.4,355,1059361
      Wisconsin,55,2020-5-5,39,-32,24.04,Actual,8,353,5822434
      Nevada,32,2020-5-5,22,-42,11.5333333333333,Actual,8.4,270,3080156
      Iowa,19,2020-5-5,31,-28,21.5933333333333,Actual,11.2,207,3155070
      Oklahoma,40,2020-5-5,25,-15,18.8466666666667,Actual,4.4,247,3956971
      Kentucky,21,2020-5-5,35,-29.3333333333333,22.98,Actual,9.2,275,4467673
      New York,36,2020-5-6,38,-58,14.9666666666667,Actual,350,26699,26161672
      New Jersey,34,2020-5-6,34,-57.3333333333333,13.6666666666667,Actual,235.8,10187,8882190
      California,6,2020-5-6,35,-47,17.56,Actual,79.4,2464,39512223
      Texas,48,2020-5-6,44,-31.3333333333333,26.4133333333333,Actual,29.6,1025,28995881
      Massachusetts,25,2020-5-6,29,-54,12.6433333333333,Actual,139.6,4419,6892503
      Florida,12,2020-5-6,43,-41,22.3066666666667,Actual,58,1539,21477737
      Illinois,17,2020-5-6,29,-41.3333333333333,15.83,Actual,124.6,2974,12671821
      Pennsylvania,42,2020-5-6,29,-45,15.3466666666667,Actual,199,3345,12801989
      Michigan,26,2020-5-6,31,-39.3333333333333,15.5366666666667,Actual,69.4,4415,9986857
      Connecticut,9,2020-5-6,44,-43.6666666666667,23.1533333333333,Actual,87.6,2718,3565287
      Louisiana,22,2020-5-6,48,-27.3333333333333,29.3466666666667,Actual,43,2167,4648794
      Georgia,13,2020-5-6,49,-33.3333333333333,29.1933333333333,Actual,43.2,1327,10617423
      Arizona,4,2020-5-6,41,-36,24.9633333333333,Actual,31,426,7278717
      Ohio,39,2020-5-6,27,-28,17.6533333333333,Actual,53.4,1225,11689100
      Maryland,24,2020-5-6,23,-49.6666666666667,12.1833333333333,Actual,55.8,1437,6045680
      Indiana,18,2020-5-6,28,-23.3333333333333,19.04,Actual,40.2,1377,6732219
      Virginia,51,2020-5-6,38,-41,21.31,Actual,30.4,737,8535519
      North Carolina,37,2020-5-6,36,-33.6666666666667,21.69,Actual,19.2,492,10488084
      South Carolina,45,2020-5-6,38,-21.6666666666667,25.63,Actual,9,305,5148714
      Mississippi,28,2020-5-6,40,-15,28.8433333333333,Actual,21.2,374,2976149
      Colorado,8,2020-5-6,44,-40,23.0333333333333,Actual,23.6,919,5758736
      Alabama,1,2020-5-6,38,-18.6666666666667,26.33,Actual,18.6,343,4903185
      Minnesota,27,2020-5-6,22,-39.3333333333333,12.63,Actual,23.2,485,5639632
      Washington,53,2020-5-6,50,-43.6666666666667,26.6633333333333,Actual,14.2,870,7614893
      Missouri,29,2020-5-6,22,-22.3333333333333,15.38,Actual,19.8,523,6137428
      Tennessee,47,2020-5-6,23,-22.6666666666667,16.2166666666667,Actual,6.4,239,6829174
      Rhode Island,44,2020-5-6,19,-45,10.0666666666667,Actual,15.8,370,1059361
      Wisconsin,55,2020-5-6,40,-30.3333333333333,24.7366666666667,Actual,9,362,5822434
      Nevada,32,2020-5-6,23,-42.6666666666667,12.1066666666667,Actual,7.2,289,3080156
      Iowa,19,2020-5-6,32,-23.3333333333333,22.36,Actual,11.8,219,3155070
      Oklahoma,40,2020-5-6,26,-13.3333333333333,19.7133333333333,Actual,5.6,253,3956971
      Kentucky,21,2020-5-6,36,-27.3333333333333,23.7066666666667,Actual,9,283,4467673
      New York,36,2020-5-7,39,-55.6666666666667,15.41,Actual,323.6,26928,26161672
      New Jersey,34,2020-5-7,35,-54,14.1266666666667,Actual,257.2,10460,8882190
      California,6,2020-5-7,36,-47.6666666666667,18.0833333333333,Actual,81.8,2535,39512223
      Texas,48,2020-5-7,45,-32.6666666666667,27.0866666666667,Actual,32,1058,28995881
      Massachusetts,25,2020-5-7,30,-53,13.1133333333333,Actual,150,4551,6892503
      Florida,12,2020-5-7,44,-40.6666666666667,22.9,Actual,63.2,1600,21477737
      Illinois,17,2020-5-7,30,-41.6666666666667,16.4133333333333,Actual,138,3111,12671821
      Pennsylvania,42,2020-5-7,30,-41,15.9366666666667,Actual,188.2,3589,12801989
      Michigan,26,2020-5-7,32,-40.3333333333333,16.1333333333333,Actual,81.2,4503,9986857
      Connecticut,9,2020-5-7,45,-41,23.7433333333333,Actual,75.2,2797,3565287
      Louisiana,22,2020-5-7,49,-29.3333333333333,30.0533333333333,Actual,40.6,2208,4648794
      Georgia,13,2020-5-7,50,-33.6666666666667,29.8566666666667,Actual,31.4,1355,10617423
      Arizona,4,2020-5-7,42,-36,25.6033333333333,Actual,34,450,7278717
      Ohio,39,2020-5-7,28,-28.3333333333333,18.37,Actual,54.8,1271,11689100
      Maryland,24,2020-5-7,24,-43.6666666666667,12.7466666666667,Actual,59.4,1503,6045680
      Indiana,18,2020-5-7,29,-24.3333333333333,19.7966666666667,Actual,45.2,1414,6732219
      Virginia,51,2020-5-7,39,-39,21.92,Actual,28.6,769,8535519
      North Carolina,37,2020-5-7,37,-33,22.36,Actual,21.8,513,10488084
      South Carolina,45,2020-5-7,39,-21.6666666666667,26.4133333333333,Actual,9.4,316,5148714
      Mississippi,28,2020-5-7,41,-16.3333333333333,29.68,Actual,22.2,396,2976149
      Colorado,8,2020-5-7,45,-40.6666666666667,23.6266666666667,Actual,23.2,944,5758736
      Alabama,1,2020-5-7,39,-20.3333333333333,27.1266666666667,Actual,18.4,369,4903185
      Minnesota,27,2020-5-7,23,-41.3333333333333,13.2166666666667,Actual,26.2,508,5639632
      Washington,53,2020-5-7,51,-42,27.2433333333333,Actual,16,891,7614893
      Missouri,29,2020-5-7,23,-27,16.11,Actual,19.8,546,6137428
      Tennessee,47,2020-5-7,24,-22.3333333333333,16.9933333333333,Actual,4.6,238,6829174
      Rhode Island,44,2020-5-7,20,-44.3333333333333,10.6233333333333,Actual,15.4,388,1059361
      Wisconsin,55,2020-5-7,41,-31.3333333333333,25.4233333333333,Actual,11.6,374,5822434
      Nevada,32,2020-5-7,24,-44.3333333333333,12.6633333333333,Actual,9.6,297,3080156
      Iowa,19,2020-5-7,33,-26,23.1,Actual,12.8,231,3155070
      Oklahoma,40,2020-5-7,27,-17.3333333333333,20.54,Actual,6.4,260,3956971
      Kentucky,21,2020-5-7,37,-27.3333333333333,24.4333333333333,Actual,8.6,294,4467673
      New York,36,2020-5-8,40,-58,15.83,Actual,302,27245,26161672
      New Jersey,34,2020-5-8,36,-57,14.5566666666667,Actual,219.8,10635,8882190
      California,6,2020-5-8,37,-46,18.6233333333333,Actual,67,2613,39512223
      Texas,48,2020-5-8,46,-32,27.7666666666667,Actual,32.6,1096,28995881
      Massachusetts,25,2020-5-8,31,-54,13.5733333333333,Actual,153.4,4701,6892503
      Florida,12,2020-5-8,45,-40.3333333333333,23.4966666666667,Actual,50,1669,21477737
      Illinois,17,2020-5-8,31,-42.6666666666667,16.9866666666667,Actual,114.4,3241,12671821
      Pennsylvania,42,2020-5-8,31,-45,16.4866666666667,Actual,125.4,3715,12801989
      Michigan,26,2020-5-8,33,-44.6666666666667,16.6866666666667,Actual,77.6,4561,9986857
      Connecticut,9,2020-5-8,46,-45,24.2933333333333,Actual,66.8,2874,3565287
      Louisiana,22,2020-5-8,50,-36.3333333333333,30.69,Actual,34.2,2227,4648794
      Georgia,13,2020-5-8,51,-35.6666666666667,30.5,Actual,21.4,1400,10617423
      Arizona,4,2020-5-8,43,-35,26.2533333333333,Actual,28.2,517,7278717
      Ohio,39,2020-5-8,29,-33,19.04,Actual,41.2,1306,11689100
      Maryland,24,2020-5-8,25,-46.3333333333333,13.2833333333333,Actual,50.8,1560,6045680
      Indiana,18,2020-5-8,30,-27.6666666666667,20.52,Actual,36.4,1447,6732219
      Virginia,51,2020-5-8,40,-41,22.51,Actual,25.2,812,8535519
      North Carolina,37,2020-5-8,38,-34.3333333333333,23.0166666666667,Actual,18.4,530,10488084
      South Carolina,45,2020-5-8,40,-23.6666666666667,27.1766666666667,Actual,7,320,5148714
      Mississippi,28,2020-5-8,42,-24.3333333333333,30.4366666666667,Actual,17.6,409,2976149
      Colorado,8,2020-5-8,46,-39.3333333333333,24.2333333333333,Actual,13.6,960,5758736
      Alabama,1,2020-5-8,40,-24.6666666666667,27.88,Actual,15.6,383,4903185
      Minnesota,27,2020-5-8,24,-41.3333333333333,13.8033333333333,Actual,24.6,534,5639632
      Washington,53,2020-5-8,52,-40.6666666666667,27.8366666666667,Actual,13.8,905,7614893
      Missouri,29,2020-5-8,24,-21.3333333333333,16.8966666666667,Actual,16.2,567,6137428
      Tennessee,47,2020-5-8,25,-28,17.7133333333333,Actual,3.4,242,6829174
      Rhode Island,44,2020-5-8,21,-45.6666666666667,11.1666666666667,Actual,13.4,399,1059361
      Wisconsin,55,2020-5-8,42,-33,26.0933333333333,Actual,9.4,384,5822434
      Nevada,32,2020-5-8,25,-45,13.2133333333333,Actual,8,294,3080156
      Iowa,19,2020-5-8,34,-22,23.88,Actual,11.6,243,3155070
      Oklahoma,40,2020-5-8,28,-17,21.37,Actual,5,266,3956971
      Kentucky,21,2020-5-8,38,-33.6666666666667,25.0966666666667,Actual,5.8,298,4467673
      New York,36,2020-5-9,41,-49.6666666666667,16.3333333333333,Actual,227.8,27466,26161672
      New Jersey,34,2020-5-9,37,-47.3333333333333,15.0833333333333,Actual,173.2,10805,8882190
      California,6,2020-5-9,38,-38.3333333333333,19.24,Actual,63,2687,39512223
      Texas,48,2020-5-9,47,-24.3333333333333,28.5233333333333,Actual,30.2,1132,28995881
      Massachusetts,25,2020-5-9,32,-47.6666666666667,14.0966666666667,Actual,137.6,4839,6892503
      Florida,12,2020-5-9,46,-36.6666666666667,24.13,Actual,39.2,1715,21477737
      Illinois,17,2020-5-9,32,-29.3333333333333,17.6933333333333,Actual,97,3349,12671821
      Pennsylvania,42,2020-5-9,32,-35.3333333333333,17.1333333333333,Actual,97.4,3779,12801989
      Michigan,26,2020-5-9,34,-34.3333333333333,17.3433333333333,Actual,68,4704,9986857
      Connecticut,9,2020-5-9,47,-37.6666666666667,24.9166666666667,Actual,58,2932,3565287
      Louisiana,22,2020-5-9,51,-28.3333333333333,31.4066666666667,Actual,28.2,2267,4648794
      Georgia,13,2020-5-9,52,-24.3333333333333,31.2566666666667,Actual,23.4,1403,10617423
      Arizona,4,2020-5-9,44,-30.3333333333333,26.95,Actual,23.2,532,7278717
      Ohio,39,2020-5-9,30,-24,19.8,Actual,26.4,1331,11689100
      Maryland,24,2020-5-9,26,-36,13.9233333333333,Actual,49.2,1614,6045680
      Indiana,18,2020-5-9,31,-16,21.36,Actual,32.6,1490,6732219
      Virginia,51,2020-5-9,41,-32,23.19,Actual,22.6,827,8535519
      North Carolina,37,2020-5-9,39,-25.3333333333333,23.7633333333333,Actual,16.6,551,10488084
      South Carolina,45,2020-5-9,41,-15.6666666666667,28.02,Actual,8.2,330,5148714
      Mississippi,28,2020-5-9,43,-12,31.3166666666667,Actual,12.2,421,2976149
      Colorado,8,2020-5-9,47,-33,24.9033333333333,Actual,13.6,967,5758736
      Alabama,1,2020-5-9,41,-12,28.76,Actual,12,390,4903185
      Minnesota,27,2020-5-9,25,-36.6666666666667,14.4366666666667,Actual,21.2,558,5639632
      Washington,53,2020-5-9,53,-31.3333333333333,28.5233333333333,Actual,15,921,7614893
      Missouri,29,2020-5-9,25,-17.6666666666667,17.72,Actual,16.6,578,6137428
      Tennessee,47,2020-5-9,26,-13.6666666666667,18.5766666666667,Actual,2.4,242,6829174
      Rhode Island,44,2020-5-9,22,-40.3333333333333,11.7633333333333,Actual,12,418,1059361
      Wisconsin,55,2020-5-9,43,-22.6666666666667,26.8666666666667,Actual,9.4,398,5822434
      Nevada,32,2020-5-9,26,-41.6666666666667,13.7966666666667,Actual,4.6,313,3080156
      Iowa,19,2020-5-9,35,-17,24.71,Actual,10.4,252,3155070
      Oklahoma,40,2020-5-9,29,-8.66666666666667,22.2833333333333,Actual,4.2,270,3956971
      Kentucky,21,2020-5-9,39,-19.3333333333333,25.9033333333333,Actual,5.6,304,4467673
      New York,36,2020-5-10,42,-46.3333333333333,16.87,Actual,225.4,27640,26161672
      New Jersey,34,2020-5-10,38,-45.6666666666667,15.6266666666667,Actual,159.2,10962,8882190
      California,6,2020-5-10,39,-38.3333333333333,19.8566666666667,Actual,68.8,2716,39512223
      Texas,48,2020-5-10,48,-25.3333333333333,29.27,Actual,29.8,1158,28995881
      Massachusetts,25,2020-5-10,33,-42.3333333333333,14.6733333333333,Actual,117.8,4978,6892503
      Florida,12,2020-5-10,47,-40.6666666666667,24.7233333333333,Actual,35.8,1721,21477737
      Illinois,17,2020-5-10,33,-37.6666666666667,18.3166666666667,Actual,98,3406,12671821
      Pennsylvania,42,2020-5-10,33,-31.6666666666667,17.8166666666667,Actual,65,3806,12801989
      Michigan,26,2020-5-10,35,-34.3333333333333,18,Actual,68.6,4729,9986857
      Connecticut,9,2020-5-10,48,-33.6666666666667,25.58,Actual,48.8,2967,3565287
      Louisiana,22,2020-5-10,52,-28.6666666666667,32.12,Actual,27.8,2286,4648794
      Georgia,13,2020-5-10,53,-30.3333333333333,31.9533333333333,Actual,28.6,1406,10617423
      Arizona,4,2020-5-10,45,-29,27.66,Actual,22.4,536,7278717
      Ohio,39,2020-5-10,31,-25,20.55,Actual,33,1341,11689100
      Maryland,24,2020-5-10,27,-34,14.5833333333333,Actual,50.6,1644,6045680
      Indiana,18,2020-5-10,32,-23.3333333333333,22.1266666666667,Actual,32.8,1508,6732219
      Virginia,51,2020-5-10,42,-33.3333333333333,23.8566666666667,Actual,24.6,839,8535519
      North Carolina,37,2020-5-10,40,-28.6666666666667,24.4766666666667,Actual,17.4,564,10488084
      South Carolina,45,2020-5-10,42,-19,28.83,Actual,7.8,331,5148714
      Mississippi,28,2020-5-10,44,-16,32.1566666666667,Actual,12.2,430,2976149
      Colorado,8,2020-5-10,48,-31.3333333333333,25.59,Actual,13.2,971,5758736
      Alabama,1,2020-5-10,42,-17.3333333333333,29.5866666666667,Actual,13.2,393,4903185
      Minnesota,27,2020-5-10,26,-36.3333333333333,15.0733333333333,Actual,21.2,578,5639632
      Washington,53,2020-5-10,54,-27.6666666666667,29.2466666666667,Actual,14.2,931,7614893
      Missouri,29,2020-5-10,26,-18,18.54,Actual,14,589,6137428
      Tennessee,47,2020-5-10,27,-18.3333333333333,19.3933333333333,Actual,5.6,243,6829174
      Rhode Island,44,2020-5-10,23,-33,12.4333333333333,Actual,11.2,422,1059361
      Wisconsin,55,2020-5-10,44,-31.3333333333333,27.5533333333333,Actual,8.8,400,5822434
      Nevada,32,2020-5-10,27,-41.6666666666667,14.38,Actual,4.8,310,3080156
      Iowa,19,2020-5-10,36,-20,25.51,Actual,11.6,265,3155070
      Oklahoma,40,2020-5-10,30,-10.6666666666667,23.1766666666667,Actual,3.6,272,3956971
      Kentucky,21,2020-5-10,40,-22.6666666666667,26.6766666666667,Actual,5.4,304,4467673
      New York,36,2020-5-11,43,-58.3333333333333,17.2866666666667,Actual,202.8,27838,26161672
      New Jersey,34,2020-5-11,39,-55.6666666666667,16.07,Actual,162.6,11053,8882190
      California,6,2020-5-11,40,-46.3333333333333,20.3933333333333,Actual,68.8,2779,39512223
      Texas,48,2020-5-11,49,-31.6666666666667,29.9533333333333,Actual,27.4,1176,28995881
      Massachusetts,25,2020-5-11,34,-55,15.1233333333333,Actual,122.6,5107,6892503
      Florida,12,2020-5-11,48,-39.3333333333333,25.33,Actual,31.6,1735,21477737
      Illinois,17,2020-5-11,34,-43.6666666666667,18.88,Actual,110.2,3459,12671821
      Pennsylvania,42,2020-5-11,34,-44,18.3766666666667,Actual,75.8,3832,12801989
      Michigan,26,2020-5-11,36,-42.6666666666667,18.5733333333333,Actual,65,4755,9986857
      Connecticut,9,2020-5-11,49,-42.6666666666667,26.1533333333333,Actual,50.2,3008,3565287
      Louisiana,22,2020-5-11,53,-29.3333333333333,32.8266666666667,Actual,30.8,2308,4648794
      Georgia,13,2020-5-11,54,-33.3333333333333,32.62,Actual,23.4,1444,10617423
      Arizona,4,2020-5-11,46,-33.3333333333333,28.3266666666667,Actual,15.6,542,7278717
      Ohio,39,2020-5-11,32,-31.6666666666667,21.2333333333333,Actual,35.4,1357,11689100
      Maryland,24,2020-5-11,28,-46.3333333333333,15.12,Actual,49.8,1683,6045680
      Indiana,18,2020-5-11,33,-23.3333333333333,22.8933333333333,Actual,34.4,1540,6732219
      Virginia,51,2020-5-11,43,-40.3333333333333,24.4533333333333,Actual,23.2,850,8535519
      North Carolina,37,2020-5-11,41,-30.6666666666667,25.17,Actual,19,575,10488084
      South Carolina,45,2020-5-11,43,-20,29.63,Actual,8.4,346,5148714
      Mississippi,28,2020-5-11,45,-14,33.0166666666667,Actual,11.2,435,2976149
      Colorado,8,2020-5-11,49,-40.3333333333333,26.1866666666667,Actual,20.4,987,5758736
      Alabama,1,2020-5-11,43,-16.6666666666667,30.42,Actual,13.4,403,4903185
      Minnesota,27,2020-5-11,27,-41,15.6633333333333,Actual,20.8,591,5639632
      Washington,53,2020-5-11,55,-42.3333333333333,29.8233333333333,Actual,13.8,945,7614893
      Missouri,29,2020-5-11,27,-27.3333333333333,19.2666666666667,Actual,14,606,6137428
      Tennessee,47,2020-5-11,28,-20.6666666666667,20.1866666666667,Actual,6.2,251,6829174
      Rhode Island,44,2020-5-11,24,-45.3333333333333,12.98,Actual,12.6,430,1059361
      Wisconsin,55,2020-5-11,45,-32,28.2333333333333,Actual,7.4,409,5822434
      Nevada,32,2020-5-11,28,-42.3333333333333,14.9566666666667,Actual,7.4,312,3080156
      Iowa,19,2020-5-11,37,-24,26.27,Actual,12.6,271,3155070
      Oklahoma,40,2020-5-11,31,-18,23.9966666666667,Actual,2.4,274,3956971
      Kentucky,21,2020-5-11,41,-27.6666666666667,27.4,Actual,4.6,311,4467673
      New York,36,2020-5-12,44,-55,17.7366666666667,Actual,190.8,28055,26161672
      New Jersey,34,2020-5-12,40,-53,16.54,Actual,176.8,11256,8882190
      California,6,2020-5-12,41,-46,20.9333333333333,Actual,73,2879,39512223
      Texas,48,2020-5-12,50,-32.3333333333333,30.63,Actual,32.8,1207,28995881
      Massachusetts,25,2020-5-12,35,-52.3333333333333,15.6,Actual,128.4,5140,6892503
      Florida,12,2020-5-12,49,-38,25.95,Actual,32,1779,21477737
      Illinois,17,2020-5-12,35,-41.3333333333333,19.4666666666667,Actual,115.8,3601,12671821
      Pennsylvania,42,2020-5-12,35,-40,18.9766666666667,Actual,101.8,3914,12801989
      Michigan,26,2020-5-12,37,-37.3333333333333,19.2,Actual,51.2,4846,9986857
      Connecticut,9,2020-5-12,50,-39.3333333333333,26.76,Actual,57.4,3041,3565287
      Louisiana,22,2020-5-12,54,-27.6666666666667,33.55,Actual,30,2347,4648794
      Georgia,13,2020-5-12,55,-31.6666666666667,33.3033333333333,Actual,28.4,1498,10617423
      Arizona,4,2020-5-12,47,-32,29.0066666666667,Actual,18.4,562,7278717
      Ohio,39,2020-5-12,33,-25.3333333333333,21.98,Actual,40.6,1436,11689100
      Maryland,24,2020-5-12,29,-43.6666666666667,15.6833333333333,Actual,50.4,1756,6045680
      Indiana,18,2020-5-12,34,-20.3333333333333,23.69,Actual,31.2,1578,6732219
      Virginia,51,2020-5-12,44,-38,25.0733333333333,Actual,25.8,892,8535519
      North Carolina,37,2020-5-12,42,-29.6666666666667,25.8733333333333,Actual,18,600,10488084
      South Carolina,45,2020-5-12,44,-18,30.45,Actual,8.2,355,5148714
      Mississippi,28,2020-5-12,46,-12.6666666666667,33.89,Actual,11.8,457,2976149
      Colorado,8,2020-5-12,50,-38.6666666666667,26.8,Actual,23.8,1010,5758736
      Alabama,1,2020-5-12,44,-16,31.26,Actual,16.6,435,4903185
      Minnesota,27,2020-5-12,28,-39.6666666666667,16.2666666666667,Actual,22.8,614,5639632
      Washington,53,2020-5-12,56,-42.3333333333333,30.4,Actual,12.4,962,7614893
      Missouri,29,2020-5-12,28,-27.6666666666667,19.99,Actual,14,616,6137428
      Tennessee,47,2020-5-12,29,-21.3333333333333,20.9733333333333,Actual,9,266,6829174
      Rhode Island,44,2020-5-12,25,-41.3333333333333,13.5666666666667,Actual,10,444,1059361
      Wisconsin,55,2020-5-12,46,-28.6666666666667,28.9466666666667,Actual,7.2,418,5822434
      Nevada,32,2020-5-12,29,-40,15.5566666666667,Actual,4,321,3080156
      Iowa,19,2020-5-12,38,-24.3333333333333,27.0266666666667,Actual,13.2,289,3155070
      Oklahoma,40,2020-5-12,32,-19.6666666666667,24.8,Actual,2.8,278,3956971
      Kentucky,21,2020-5-12,42,-24.6666666666667,28.1533333333333,Actual,4.8,321,4467673
      New York,36,2020-5-13,45,-54,18.1966666666667,Actual,209,28259,26161672
      New Jersey,34,2020-5-13,41,-51.6666666666667,17.0233333333333,Actual,186.6,11448,8882190
      California,6,2020-5-13,42,-45.6666666666667,21.4766666666667,Actual,84,2957,39512223
      Texas,48,2020-5-13,51,-29.6666666666667,31.3333333333333,Actual,38.2,1233,28995881
      Massachusetts,25,2020-5-13,36,-51,16.09,Actual,122.4,5314,6892503
      Florida,12,2020-5-13,50,-38.3333333333333,26.5666666666667,Actual,39.2,1827,21477737
      Illinois,17,2020-5-13,36,-40.3333333333333,20.0633333333333,Actual,130.6,3792,12671821
      Pennsylvania,42,2020-5-13,36,-38.3333333333333,19.5933333333333,Actual,123.2,4094,12801989
      Michigan,26,2020-5-13,38,-35,19.85,Actual,54,4886,9986857
      Connecticut,9,2020-5-13,51,-38.3333333333333,27.3766666666667,Actual,63.6,3125,3565287
      Louisiana,22,2020-5-13,55,-26.3333333333333,34.2866666666667,Actual,32.4,2381,4648794
      Georgia,13,2020-5-13,56,-31.6666666666667,33.9866666666667,Actual,36.4,1517,10617423
      Arizona,4,2020-5-13,48,-31.6666666666667,29.69,Actual,23,595,7278717
      Ohio,39,2020-5-13,34,-24,22.74,Actual,48,1483,11689100
      Maryland,24,2020-5-13,30,-42.3333333333333,16.26,Actual,53.4,1809,6045680
      Indiana,18,2020-5-13,35,-19.6666666666667,24.4933333333333,Actual,36.6,1619,6732219
      Virginia,51,2020-5-13,45,-37.6666666666667,25.6966666666667,Actual,27.8,928,8535519
      North Carolina,37,2020-5-13,43,-31.3333333333333,26.56,Actual,20.6,625,10488084
      South Carolina,45,2020-5-13,45,-18.6666666666667,31.2633333333333,Actual,9.8,362,5148714
      Mississippi,28,2020-5-13,47,-11,34.78,Actual,12.6,465,2976149
      Colorado,8,2020-5-13,51,-37.3333333333333,27.4266666666667,Actual,35.8,1062,5758736
      Alabama,1,2020-5-13,45,-14.6666666666667,32.1133333333333,Actual,18,450,4903185
      Minnesota,27,2020-5-13,29,-41.6666666666667,16.85,Actual,22.8,638,5639632
      Washington,53,2020-5-13,57,-41.3333333333333,30.9866666666667,Actual,12,974,7614893
      Missouri,29,2020-5-13,29,-22.6666666666667,20.7633333333333,Actual,14.6,637,6137428
      Tennessee,47,2020-5-13,30,-20.3333333333333,21.77,Actual,9.4,273,6829174
      Rhode Island,44,2020-5-13,26,-40.3333333333333,14.1633333333333,Actual,11.4,462,1059361
      Wisconsin,55,2020-5-13,47,-28.6666666666667,29.66,Actual,9,421,5822434
      Nevada,32,2020-5-13,30,-38.6666666666667,16.17,Actual,6.6,331,3080156
      Iowa,19,2020-5-13,39,-22.6666666666667,27.8,Actual,14.2,306,3155070
      Oklahoma,40,2020-5-13,33,-13.3333333333333,25.6666666666667,Actual,2.6,278,3956971
      Kentucky,21,2020-5-13,43,-27.3333333333333,28.88,Actual,5.6,321,4467673
      New York,36,2020-5-14,46,-54.3333333333333,18.6533333333333,Actual,203.8,28420,26161672
      New Jersey,34,2020-5-14,42,-51.6666666666667,17.5066666666667,Actual,192,11689,8882190
      California,6,2020-5-14,43,-46.3333333333333,22.0133333333333,Actual,85.8,3052,39512223
      Texas,48,2020-5-14,52,-31.3333333333333,32.02,Actual,41.4,1296,28995881
      Massachusetts,25,2020-5-14,37,-50.6666666666667,16.5833333333333,Actual,119.4,5481,6892503
      Florida,12,2020-5-14,51,-39.3333333333333,27.1733333333333,Actual,45.8,1875,21477737
      Illinois,17,2020-5-14,37,-45,20.6133333333333,Actual,134,3928,12671821
      Pennsylvania,42,2020-5-14,37,-39.6666666666667,20.1966666666667,Actual,129.6,4288,12801989
      Michigan,26,2020-5-14,39,-43.3333333333333,20.4166666666667,Actual,60,4960,9986857
      Connecticut,9,2020-5-14,52,-38.3333333333333,27.9933333333333,Actual,66.2,3219,3565287
      Louisiana,22,2020-5-14,56,-32,34.9666666666667,Actual,34.2,2417,4648794
      Georgia,13,2020-5-14,57,-32.3333333333333,34.6633333333333,Actual,30.8,1545,10617423
      Arizona,4,2020-5-14,49,-32.6666666666667,30.3633333333333,Actual,27.4,624,7278717
      Ohio,39,2020-5-14,35,-28.3333333333333,23.4566666666667,Actual,50.6,1534,11689100
      Maryland,24,2020-5-14,31,-43.6666666666667,16.8233333333333,Actual,54.8,1866,6045680
      Indiana,18,2020-5-14,36,-23,25.2633333333333,Actual,40.2,1646,6732219
      Virginia,51,2020-5-14,46,-39,26.3066666666667,Actual,30.6,956,8535519
      North Carolina,37,2020-5-14,44,-31.3333333333333,27.2466666666667,Actual,20.2,641,10488084
      South Carolina,45,2020-5-14,46,-19,32.0733333333333,Actual,6.8,371,5148714
      Mississippi,28,2020-5-14,48,-15.6666666666667,35.6233333333333,Actual,15,480,2976149
      Colorado,8,2020-5-14,52,-38.6666666666667,28.04,Actual,41,1086,5758736
      Alabama,1,2020-5-14,46,-17.3333333333333,32.94,Actual,16.4,473,4903185
      Minnesota,27,2020-5-14,30,-41,17.44,Actual,23.6,672,5639632
      Washington,53,2020-5-14,58,-43,31.5566666666667,Actual,10.8,983,7614893
      Missouri,29,2020-5-14,30,-25.3333333333333,21.51,Actual,13.4,648,6137428
      Tennessee,47,2020-5-14,31,-20,22.57,Actual,8.8,287,6829174
      Rhode Island,44,2020-5-14,27,-39,14.7733333333333,Actual,11.8,468,1059361
      Wisconsin,55,2020-5-14,48,-30.3333333333333,30.3566666666667,Actual,8.8,434,5822434
      Nevada,32,2020-5-14,31,-41,16.76,Actual,7,333,3080156
      Iowa,19,2020-5-14,40,-25.6666666666667,28.5433333333333,Actual,15,318,3155070
      Oklahoma,40,2020-5-14,34,-13.6666666666667,26.53,Actual,2.8,284,3956971
      Kentucky,21,2020-5-14,44,-24.6666666666667,29.6333333333333,Actual,4.6,328,4467673
      New York,36,2020-5-15,47,-53.6666666666667,19.1166666666667,Actual,185.6,28685,26161672
      New Jersey,34,2020-5-15,43,-51.3333333333333,17.9933333333333,Actual,172.4,11895,8882190
      California,6,2020-5-15,44,-45.3333333333333,22.56,Actual,72.2,3136,39512223
      Texas,48,2020-5-15,53,-32.6666666666667,32.6933333333333,Actual,40.8,1349,28995881
      Massachusetts,25,2020-5-15,38,-51.6666666666667,17.0666666666667,Actual,131.2,5590,6892503
      Florida,12,2020-5-15,52,-40.6666666666667,27.7666666666667,Actual,38.8,1917,21477737
      Illinois,17,2020-5-15,38,-40.6666666666667,21.2066666666667,Actual,115.2,4059,12671821
      Pennsylvania,42,2020-5-15,38,-41,20.7866666666667,Actual,116.2,4422,12801989
      Michigan,26,2020-5-15,40,-40.6666666666667,21.01,Actual,43.6,4999,9986857
      Connecticut,9,2020-5-15,53,-40.3333333333333,28.59,Actual,73.4,3285,3565287
      Louisiana,22,2020-5-15,57,-32.3333333333333,35.6433333333333,Actual,28.8,2448,4648794
      Georgia,13,2020-5-15,58,-32.3333333333333,35.34,Actual,22.4,1588,10617423
      Arizona,4,2020-5-15,50,-32.6666666666667,31.0366666666667,Actual,23.6,651,7278717
      Ohio,39,2020-5-15,36,-28,24.1766666666667,Actual,37.8,1581,11689100
      Maryland,24,2020-5-15,32,-41.6666666666667,17.4066666666667,Actual,47.2,1911,6045680
      Indiana,18,2020-5-15,37,-23.3333333333333,26.03,Actual,34.6,1691,6732219
      Virginia,51,2020-5-15,47,-38,26.9266666666667,Actual,23.6,978,8535519
      North Carolina,37,2020-5-15,45,-30.6666666666667,27.94,Actual,17.2,667,10488084
      South Carolina,45,2020-5-15,47,-18.6666666666667,32.8866666666667,Actual,6,380,5148714
      Mississippi,28,2020-5-15,49,-18,36.4433333333333,Actual,12.8,493,2976149
      Colorado,8,2020-5-15,53,-38.6666666666667,28.6533333333333,Actual,41,1150,5758736
      Alabama,1,2020-5-15,47,-19,33.75,Actual,10.6,483,4903185
      Minnesota,27,2020-5-15,31,-40.3333333333333,18.0366666666667,Actual,23.4,692,5639632
      Washington,53,2020-5-15,59,-41.6666666666667,32.14,Actual,7.8,991,7614893
      Missouri,29,2020-5-15,31,-20.6666666666667,22.3033333333333,Actual,12.6,662,6137428
      Tennessee,47,2020-5-15,32,-21.6666666666667,23.3533333333333,Actual,6.4,290,6829174
      Rhode Island,44,2020-5-15,28,-40.6666666666667,15.3666666666667,Actual,11,479,1059361
      Wisconsin,55,2020-5-15,49,-27,31.0866666666667,Actual,7,445,5822434
      Nevada,32,2020-5-15,32,-41.6666666666667,17.3433333333333,Actual,5.8,343,3080156
      Iowa,19,2020-5-15,41,-19,29.3533333333333,Actual,12.4,336,3155070
      Oklahoma,40,2020-5-15,35,-19.6666666666667,27.3333333333333,Actual,2,285,3956971
      Kentucky,21,2020-5-15,45,-28,30.3533333333333,Actual,2.6,332,4467673
      New York,36,2020-5-16,48,-44,19.6766666666667,Actual,162.2,28857,26161672
      New Jersey,34,2020-5-16,44,-41.6666666666667,18.5766666666667,Actual,150.4,12013,8882190
      California,6,2020-5-16,45,-38.3333333333333,23.1766666666667,Actual,64.4,3208,39512223
      Texas,48,2020-5-16,54,-29.3333333333333,33.4,Actual,37,1383,28995881
      Massachusetts,25,2020-5-16,39,-40.6666666666667,17.66,Actual,109.4,5704,6892503
      Florida,12,2020-5-16,53,-36,28.4066666666667,Actual,34,1964,21477737
      Illinois,17,2020-5-16,39,-30.6666666666667,21.9,Actual,88.4,4129,12671821
      Pennsylvania,42,2020-5-16,39,-31.6666666666667,21.47,Actual,84.2,4480,12801989
      Michigan,26,2020-5-16,41,-28.6666666666667,21.7233333333333,Actual,40.4,5055,9986857
      Connecticut,9,2020-5-16,54,-30.3333333333333,29.2866666666667,Actual,65,3339,3565287
      Louisiana,22,2020-5-16,58,-28.6666666666667,36.3566666666667,Actual,36.4,2479,4648794
      Georgia,13,2020-5-16,59,-24.3333333333333,36.0966666666667,Actual,26.4,1598,10617423
      Arizona,4,2020-5-16,51,-27.6666666666667,31.76,Actual,18.4,679,7278717
      Ohio,39,2020-5-16,37,-16.6666666666667,25.01,Actual,34.8,1610,11689100
      Maryland,24,2020-5-16,33,-31,18.0966666666667,Actual,42.8,1957,6045680
      Indiana,18,2020-5-16,38,-11.3333333333333,26.9166666666667,Actual,29.2,1741,6732219
      Virginia,51,2020-5-16,48,-29,27.6366666666667,Actual,17.4,1003,8535519
      North Carolina,37,2020-5-16,46,-24.6666666666667,28.6933333333333,Actual,13.6,676,10488084
      South Carolina,45,2020-5-16,48,-13.3333333333333,33.7533333333333,Actual,5.8,380,5148714
      Mississippi,28,2020-5-16,50,-12.6666666666667,37.3166666666667,Actual,12.4,510,2976149
      Colorado,8,2020-5-16,54,-31.3333333333333,29.34,Actual,32.4,1192,5758736
      Alabama,1,2020-5-16,48,-11,34.64,Actual,7.8,485,4903185
      Minnesota,27,2020-5-16,32,-37.6666666666667,18.66,Actual,20.4,709,5639632
      Washington,53,2020-5-16,60,-37,32.77,Actual,5.6,999,7614893
      Missouri,29,2020-5-16,32,-18.6666666666667,23.1166666666667,Actual,11.4,673,6137428
      Tennessee,47,2020-5-16,33,-13.3333333333333,24.22,Actual,5.6,295,6829174
      Rhode Island,44,2020-5-16,29,-32,16.0466666666667,Actual,8.8,489,1059361
      Wisconsin,55,2020-5-16,50,-19.3333333333333,31.8933333333333,Actual,7.6,453,5822434
      Nevada,32,2020-5-16,33,-40.3333333333333,17.94,Actual,5.4,347,3080156
      Iowa,19,2020-5-16,42,-15.3333333333333,30.2,Actual,9.8,346,3155070
      Oklahoma,40,2020-5-16,36,-11,28.2233333333333,Actual,2,288,3956971
      Kentucky,21,2020-5-16,46,-20.3333333333333,31.15,Actual,5,334,4467673
      New York,36,2020-5-17,49,-44.6666666666667,20.23,Actual,170.2,28983,26161672
      New Jersey,34,2020-5-17,45,-44,19.1366666666667,Actual,132,12118,8882190
      California,6,2020-5-17,46,-39.6666666666667,23.78,Actual,70.2,3240,39512223
      Texas,48,2020-5-17,55,-25.6666666666667,34.1433333333333,Actual,32.6,1411,28995881
      Massachusetts,25,2020-5-17,40,-40.6666666666667,18.2533333333333,Actual,91.2,5796,6892503
      Florida,12,2020-5-17,54,-38,29.0266666666667,Actual,35.4,1973,21477737
      Illinois,17,2020-5-17,40,-42.3333333333333,22.4766666666667,Actual,90.2,4177,12671821
      Pennsylvania,42,2020-5-17,40,-33,22.14,Actual,68,4495,12801989
      Michigan,26,2020-5-17,42,-36.6666666666667,22.3566666666667,Actual,45.4,5064,9986857
      Connecticut,9,2020-5-17,55,-32.3333333333333,29.9633333333333,Actual,50.6,3408,3565287
      Louisiana,22,2020-5-17,59,-29,37.0666666666667,Actual,32.8,2491,4648794
      Georgia,13,2020-5-17,60,-29.3333333333333,36.8033333333333,Actual,26,1610,10617423
      Arizona,4,2020-5-17,52,-26.6666666666667,32.4933333333333,Actual,16.2,680,7278717
      Ohio,39,2020-5-17,38,-20,25.81,Actual,37.2,1625,11689100
      Maryland,24,2020-5-17,34,-35.6666666666667,18.74,Actual,43,1992,6045680
      Indiana,18,2020-5-17,39,-20,27.7166666666667,Actual,35.6,1751,6732219
      Virginia,51,2020-5-17,49,-32.3333333333333,28.3133333333333,Actual,17.2,1010,8535519
      North Carolina,37,2020-5-17,47,-27.6666666666667,29.4166666666667,Actual,10.4,686,10488084
      South Carolina,45,2020-5-17,49,-13,34.6233333333333,Actual,5.6,385,5148714
      Mississippi,28,2020-5-17,51,-15.3333333333333,38.1633333333333,Actual,14.8,521,2976149
      Colorado,8,2020-5-17,55,-30,30.04,Actual,34.2,1215,5758736
      Alabama,1,2020-5-17,49,-17,35.47,Actual,6.2,488,4903185
      Minnesota,27,2020-5-17,33,-41.6666666666667,19.2433333333333,Actual,17,731,5639632
      Washington,53,2020-5-17,61,-32.6666666666667,33.4433333333333,Actual,9.6,1001,7614893
      Missouri,29,2020-5-17,33,-18.6666666666667,23.93,Actual,12,679,6137428
      Tennessee,47,2020-5-17,34,-18.6666666666667,25.0333333333333,Actual,3.6,298,6829174
      Rhode Island,44,2020-5-17,30,-31,16.7366666666667,Actual,12.8,499,1059361
      Wisconsin,55,2020-5-17,51,-32.6666666666667,32.5666666666667,Actual,6.6,453,5822434
      Nevada,32,2020-5-17,34,-42,18.52,Actual,5,350,3080156
      Iowa,19,2020-5-17,43,-18.3333333333333,31.0166666666667,Actual,9.8,351,3155070
      Oklahoma,40,2020-5-17,37,-7,29.1533333333333,Actual,1.8,288,3956971
      Kentucky,21,2020-5-17,47,-22,31.93,Actual,7.6,334,4467673
      New York,36,2020-5-18,50,-53,20.7,Actual,140.8,29070,26161672
      New Jersey,34,2020-5-18,46,-50.6666666666667,19.63,Actual,125,12200,8882190
      California,6,2020-5-18,47,-45.6666666666667,24.3233333333333,Actual,72.2,3279,39512223
      Texas,48,2020-5-18,56,-29.3333333333333,34.85,Actual,31,1418,28995881
      Massachusetts,25,2020-5-18,41,-50.3333333333333,18.75,Actual,95,5861,6892503
      Florida,12,2020-5-18,55,-39.3333333333333,29.6333333333333,Actual,35.8,1997,21477737
      Illinois,17,2020-5-18,41,-41.6666666666667,23.06,Actual,93.2,4234,12671821
      Pennsylvania,42,2020-5-18,41,-38.6666666666667,22.7533333333333,Actual,69.6,4515,12801989
      Michigan,26,2020-5-18,43,-42,22.9366666666667,Actual,46.8,5088,9986857
      Connecticut,9,2020-5-18,56,-37.6666666666667,30.5866666666667,Actual,48.8,3450,3565287
      Louisiana,22,2020-5-18,60,-22.3333333333333,37.8433333333333,Actual,32,2563,4648794
      Georgia,13,2020-5-18,61,-32.6666666666667,37.4766666666667,Actual,21.8,1649,10617423
      Arizona,4,2020-5-18,53,-29.3333333333333,33.2,Actual,19.2,687,7278717
      Ohio,39,2020-5-18,39,-27.6666666666667,26.5333333333333,Actual,40,1657,11689100
      Maryland,24,2020-5-18,35,-43.3333333333333,19.3066666666667,Actual,42.4,2023,6045680
      Indiana,18,2020-5-18,40,-19,28.5266666666667,Actual,34.6,1765,6732219
      Virginia,51,2020-5-18,50,-40,28.9133333333333,Actual,19.4,1015,8535519
      North Carolina,37,2020-5-18,48,-31,30.1066666666667,Actual,11.8,693,10488084
      South Carolina,45,2020-5-18,50,-18,35.4433333333333,Actual,5.4,391,5148714
      Mississippi,28,2020-5-18,52,-11.6666666666667,39.0466666666667,Actual,15.4,527,2976149
      Colorado,8,2020-5-18,56,-33.3333333333333,30.7066666666667,Actual,29.8,1224,5758736
      Alabama,1,2020-5-18,50,-16.3333333333333,36.3066666666667,Actual,7.8,489,4903185
      Minnesota,27,2020-5-18,34,-38.3333333333333,19.86,Actual,18.8,740,5639632
      Washington,53,2020-5-18,62,-40,34.0433333333333,Actual,9.2,1002,7614893
      Missouri,29,2020-5-18,34,-22.6666666666667,24.7033333333333,Actual,11,694,6137428
      Tennessee,47,2020-5-18,35,-20.3333333333333,25.83,Actual,3,301,6829174
      Rhode Island,44,2020-5-18,31,-39,17.3466666666667,Actual,11.8,506,1059361
      Wisconsin,55,2020-5-18,52,-30,33.2666666666667,Actual,7.2,459,5822434
      Nevada,32,2020-5-18,35,-39,19.13,Actual,6.8,358,3080156
      Iowa,19,2020-5-18,44,-20,31.8166666666667,Actual,11.4,355,3155070
      Oklahoma,40,2020-5-18,38,-11.6666666666667,30.0366666666667,Actual,2.8,288,3956971
      Kentucky,21,2020-5-18,48,-27.6666666666667,32.6533333333333,Actual,8.8,346,4467673
      New York,36,2020-5-19,51,-51.6666666666667,21.1833333333333,Actual,124.4,29271,26161672
      New Jersey,34,2020-5-19,47,-50,20.13,Actual,122,12349,8882190
      California,6,2020-5-19,48,-44.3333333333333,24.88,Actual,75,3403,39512223
      Texas,48,2020-5-19,57,-28.3333333333333,35.5666666666667,Actual,29.8,1459,28995881
      Massachusetts,25,2020-5-19,42,-49,19.26,Actual,88.6,5937,6892503
      Florida,12,2020-5-19,56,-36.3333333333333,30.27,Actual,36,2052,21477737
      Illinois,17,2020-5-19,42,-42.6666666666667,23.6333333333333,Actual,95.6,4379,12671821
      Pennsylvania,42,2020-5-19,42,-37.6666666666667,23.3766666666667,Actual,77.8,4628,12801989
      Michigan,26,2020-5-19,44,-36.3333333333333,23.5733333333333,Actual,49.4,5187,9986857
      Connecticut,9,2020-5-19,57,-36,31.2266666666667,Actual,48.8,3472,3565287
      Louisiana,22,2020-5-19,61,-21,38.6333333333333,Actual,30,2581,4648794
      Georgia,13,2020-5-19,62,-29.6666666666667,38.18,Actual,35.4,1675,10617423
      Arizona,4,2020-5-19,54,-29,33.91,Actual,17,705,7278717
      Ohio,39,2020-5-19,40,-25,27.2833333333333,Actual,45.4,1720,11689100
      Maryland,24,2020-5-19,36,-40.6666666666667,19.9,Actual,40.4,2081,6045680
      Indiana,18,2020-5-19,41,-19,29.3366666666667,Actual,34.4,1824,6732219
      Virginia,51,2020-5-19,51,-37.6666666666667,29.5366666666667,Actual,19.4,1042,8535519
      North Carolina,37,2020-5-19,49,-33.6666666666667,30.77,Actual,11.6,693,10488084
      South Carolina,45,2020-5-19,51,-16.6666666666667,36.2766666666667,Actual,7.2,399,5148714
      Mississippi,28,2020-5-19,53,-11,39.9366666666667,Actual,14,554,2976149
      Colorado,8,2020-5-19,57,-34.6666666666667,31.36,Actual,23.6,1257,5758736
      Alabama,1,2020-5-19,51,-14.6666666666667,37.16,Actual,8.8,504,4903185
      Minnesota,27,2020-5-19,35,-36.6666666666667,20.4933333333333,Actual,21.8,757,5639632
      Washington,53,2020-5-19,63,-40.3333333333333,34.64,Actual,9,1031,7614893
      Missouri,29,2020-5-19,35,-22,25.4833333333333,Actual,10.6,708,6137428
      Tennessee,47,2020-5-19,36,-18.6666666666667,26.6433333333333,Actual,3.6,305,6829174
      Rhode Island,44,2020-5-19,32,-37.6666666666667,17.97,Actual,13.4,532,1059361
      Wisconsin,55,2020-5-19,53,-27.6666666666667,33.99,Actual,6.8,467,5822434
      Nevada,32,2020-5-19,36,-37,19.76,Actual,7.2,358,3080156
      Iowa,19,2020-5-19,45,-20.6666666666667,32.61,Actual,12.8,367,3155070
      Oklahoma,40,2020-5-19,39,-10.6666666666667,30.93,Actual,3.2,293,3956971
      Kentucky,21,2020-5-19,49,-25.3333333333333,33.4,Actual,10.4,366,4467673
      New York,36,2020-5-20,52,-51,21.6733333333333,Actual,119.8,29389,26161672
      New Jersey,34,2020-5-20,48,-49.3333333333333,20.6366666666667,Actual,130.2,12520,8882190
      California,6,2020-5-20,49,-43.6666666666667,25.4433333333333,Actual,85,3497,39512223
      Texas,48,2020-5-20,58,-27.3333333333333,36.2933333333333,Actual,26.8,1504,28995881
      Massachusetts,25,2020-5-20,43,-48,19.78,Actual,86.2,6065,6892503
      Florida,12,2020-5-20,57,-35.6666666666667,30.9133333333333,Actual,43.4,2096,21477737
      Illinois,17,2020-5-20,43,-38,24.2533333333333,Actual,107.6,4525,12671821
      Pennsylvania,42,2020-5-20,43,-37.6666666666667,24,Actual,103,4770,12801989
      Michigan,26,2020-5-20,45,-30.3333333333333,24.27,Actual,53.4,5233,9986857
      Connecticut,9,2020-5-20,58,-33,31.8966666666667,Actual,45.8,3529,3565287
      Louisiana,22,2020-5-20,62,-21.3333333333333,39.42,Actual,35.4,2608,4648794
      Georgia,13,2020-5-20,63,-30.6666666666667,38.8733333333333,Actual,39.6,1697,10617423
      Arizona,4,2020-5-20,55,-27,34.64,Actual,19,747,7278717
      Ohio,39,2020-5-20,41,-21.6666666666667,28.0666666666667,Actual,49.4,1781,11689100
      Maryland,24,2020-5-20,37,-40.6666666666667,20.4933333333333,Actual,43,2123,6045680
      Indiana,18,2020-5-20,42,-17,30.1666666666667,Actual,38,1864,6732219
      Virginia,51,2020-5-20,52,-37.6666666666667,30.16,Actual,25.2,1075,8535519
      North Carolina,37,2020-5-20,50,-34.6666666666667,31.4233333333333,Actual,17.8,726,10488084
      South Carolina,45,2020-5-20,52,-19,37.0866666666667,Actual,6.8,407,5148714
      Mississippi,28,2020-5-20,54,-8.66666666666667,40.85,Actual,14.8,570,2976149
      Colorado,8,2020-5-20,58,-33.6666666666667,32.0233333333333,Actual,21.8,1299,5758736
      Alabama,1,2020-5-20,52,-11.6666666666667,38.0433333333333,Actual,10.6,522,4903185
      Minnesota,27,2020-5-20,36,-35,21.1433333333333,Actual,24,786,5639632
      Washington,53,2020-5-20,64,-41.3333333333333,35.2266666666667,Actual,9.8,1037,7614893
      Missouri,29,2020-5-20,36,-15.6666666666667,26.3266666666667,Actual,11,717,6137428
      Tennessee,47,2020-5-20,37,-18.3333333333333,27.46,Actual,3.4,305,6829174
      Rhode Island,44,2020-5-20,33,-37,18.6,Actual,16,538,1059361
      Wisconsin,55,2020-5-20,54,-20.6666666666667,34.7833333333333,Actual,8.6,481,5822434
      Nevada,32,2020-5-20,37,-35.3333333333333,20.4066666666667,Actual,7.2,377,3080156
      Iowa,19,2020-5-20,46,-17,33.44,Actual,14.6,393,3155070
      Oklahoma,40,2020-5-20,40,-6.66666666666667,31.8633333333333,Actual,3.8,299,3956971
      Kentucky,21,2020-5-20,50,-22,34.18,Actual,11.4,376,4467673
      New York,36,2020-5-21,53,-50.3333333333333,22.17,Actual,140.2,29479,26161672
      New Jersey,34,2020-5-21,49,-48,21.1566666666667,Actual,133.8,12623,8882190
      California,6,2020-5-21,50,-43.3333333333333,26.01,Actual,91.6,3583,39512223
      Texas,48,2020-5-21,59,-27.3333333333333,37.02,Actual,27,1532,28995881
      Massachusetts,25,2020-5-21,44,-47,20.31,Actual,88.4,6147,6892503
      Florida,12,2020-5-21,58,-35.6666666666667,31.5566666666667,Actual,47.2,2144,21477737
      Illinois,17,2020-5-21,44,-38.6666666666667,24.8666666666667,Actual,111.2,4607,12671821
      Pennsylvania,42,2020-5-21,44,-36.6666666666667,24.6333333333333,Actual,119.4,4869,12801989
      Michigan,26,2020-5-21,46,-30.6666666666667,24.9633333333333,Actual,61.2,5302,9986857
      Connecticut,9,2020-5-21,59,-33.3333333333333,32.5633333333333,Actual,45,3583,3565287
      Louisiana,22,2020-5-21,63,-21.6666666666667,40.2033333333333,Actual,21,2629,4648794
      Georgia,13,2020-5-21,64,-29,39.5833333333333,Actual,34.6,1775,10617423
      Arizona,4,2020-5-21,56,-27.3333333333333,35.3666666666667,Actual,22.8,764,7278717
      Ohio,39,2020-5-21,42,-21,28.8566666666667,Actual,59.8,1837,11689100
      Maryland,24,2020-5-21,38,-40,21.0933333333333,Actual,44,2159,6045680
      Indiana,18,2020-5-21,43,-16,31.0066666666667,Actual,39.8,1913,6732219
      Virginia,51,2020-5-21,53,-37.6666666666667,30.7833333333333,Actual,28.8,1100,8535519
      North Carolina,37,2020-5-21,51,-33.3333333333333,32.09,Actual,17,734,10488084
      South Carolina,45,2020-5-21,53,-14.6666666666667,37.94,Actual,6.8,416,5148714
      Mississippi,28,2020-5-21,55,-10,41.75,Actual,17.8,580,2976149
      Colorado,8,2020-5-21,59,-33,32.6933333333333,Actual,20.6,1310,5758736
      Alabama,1,2020-5-21,53,-13,38.9133333333333,Actual,12,529,4903185
      Minnesota,27,2020-5-21,37,-37.6666666666667,21.7666666666667,Actual,24.2,818,5639632
      Washington,53,2020-5-21,65,-41.3333333333333,35.8133333333333,Actual,9.6,1044,7614893
      Missouri,29,2020-5-21,37,-19,27.1366666666667,Actual,9.4,726,6137428
      Tennessee,47,2020-5-21,38,-18,28.28,Actual,5.6,313,6829174
      Rhode Island,44,2020-5-21,34,-36.3333333333333,19.2366666666667,Actual,18.2,556,1059361
      Wisconsin,55,2020-5-21,55,-20.6666666666667,35.5766666666667,Actual,9.6,487,5822434
      Nevada,32,2020-5-21,38,-36.3333333333333,21.0433333333333,Actual,5.8,383,3080156
      Iowa,19,2020-5-21,47,-17.3333333333333,34.2666666666667,Actual,18.2,410,3155070
      Oklahoma,40,2020-5-21,41,-10.6666666666667,32.7566666666667,Actual,4.6,304,3956971
      Kentucky,21,2020-5-21,51,-22.3333333333333,34.9566666666667,Actual,9,386,4467673
      New York,36,2020-5-22,54,-50.6666666666667,22.6633333333333,Actual,117,29582,26161672
      New Jersey,34,2020-5-22,50,-50,21.6566666666667,Actual,115.6,12769,8882190
      California,6,2020-5-22,51,-42.3333333333333,26.5866666666667,Actual,70,3665,39512223
      Texas,48,2020-5-22,60,-27.6666666666667,37.7433333333333,Actual,30.8,1545,28995881
      Massachusetts,25,2020-5-22,45,-47,20.84,Actual,86.8,6227,6892503
      Florida,12,2020-5-22,59,-35,32.2066666666667,Actual,37,2190,21477737
      Illinois,17,2020-5-22,45,-37.6666666666667,25.49,Actual,95.4,4715,12671821
      Pennsylvania,42,2020-5-22,45,-41,25.2233333333333,Actual,101.6,5010,12801989
      Michigan,26,2020-5-22,47,-36,25.6033333333333,Actual,42.2,5331,9986857
      Connecticut,9,2020-5-22,60,-33.6666666666667,33.2266666666667,Actual,44.2,3637,3565287
      Louisiana,22,2020-5-22,64,-24.6666666666667,40.9566666666667,Actual,22,2668,4648794
      Georgia,13,2020-5-22,65,-29,40.2933333333333,Actual,30.4,1808,10617423
      Arizona,4,2020-5-22,57,-28.3333333333333,36.0833333333333,Actual,19.2,775,7278717
      Ohio,39,2020-5-22,43,-21.6666666666667,29.64,Actual,49.8,1872,11689100
      Maryland,24,2020-5-22,39,-43.6666666666667,21.6566666666667,Actual,39.2,2207,6045680
      Indiana,18,2020-5-22,44,-15.6666666666667,31.85,Actual,30.4,1941,6732219
      Virginia,51,2020-5-22,54,-36.6666666666667,31.4166666666667,Actual,25.8,1136,8535519
      North Carolina,37,2020-5-22,52,-28,32.81,Actual,18.2,775,10488084
      South Carolina,45,2020-5-22,54,-13,38.81,Actual,7.2,419,5148714
      Mississippi,28,2020-5-22,56,-13,42.62,Actual,14.2,595,2976149
      Colorado,8,2020-5-22,60,-33,33.3633333333333,Actual,15,1324,5758736
      Alabama,1,2020-5-22,54,-15.3333333333333,39.76,Actual,9.4,541,4903185
      Minnesota,27,2020-5-22,38,-38.6666666666667,22.38,Actual,24.2,851,5639632
      Washington,53,2020-5-22,66,-40.6666666666667,36.4066666666667,Actual,6,1050,7614893
      Missouri,29,2020-5-22,38,-14,27.9966666666667,Actual,7.2,734,6137428
      Tennessee,47,2020-5-22,39,-19.6666666666667,29.0833333333333,Actual,6.2,315,6829174
      Rhode Island,44,2020-5-22,35,-35.6666666666667,19.88,Actual,15.2,579,1059361
      Wisconsin,55,2020-5-22,56,-22.6666666666667,36.35,Actual,8.6,496,5822434
      Nevada,32,2020-5-22,39,-38,21.6633333333333,Actual,4.4,386,3080156
      Iowa,19,2020-5-22,48,-15.6666666666667,35.11,Actual,17.8,424,3155070
      Oklahoma,40,2020-5-22,42,-12.3333333333333,33.6333333333333,Actual,3.6,307,3956971
      Kentucky,21,2020-5-22,52,-20.3333333333333,35.7533333333333,Actual,5,391,4467673
      New York,36,2020-5-23,55,-46.6666666666667,23.1966666666667,Actual,113.2,29771,26161672
      New Jersey,34,2020-5-23,51,-45,22.2066666666667,Actual,84.2,12869,8882190
      California,6,2020-5-23,52,-35.3333333333333,27.2333333333333,Actual,54.2,3737,39512223
      Texas,48,2020-5-23,61,-21.6666666666667,38.5266666666667,Actual,23.8,1553,28995881
      Massachusetts,25,2020-5-23,46,-41.3333333333333,21.4266666666667,Actual,70,6303,6892503
      Florida,12,2020-5-23,60,-32,32.8866666666667,Actual,31.2,2233,21477737
      Illinois,17,2020-5-23,46,-29.3333333333333,26.1966666666667,Actual,72,4790,12671821
      Pennsylvania,42,2020-5-23,46,-32.3333333333333,25.9,Actual,75.2,5112,12801989
      Michigan,26,2020-5-23,48,-25,26.3533333333333,Actual,35.6,5394,9986857
      Connecticut,9,2020-5-23,61,-32,33.9066666666667,Actual,42.6,3675,3565287
      Louisiana,22,2020-5-23,65,-23,41.7266666666667,Actual,16.6,2668,4648794
      Georgia,13,2020-5-23,66,-22.3333333333333,41.07,Actual,30.2,1822,10617423
      Arizona,4,2020-5-23,58,-23.6666666666667,36.8466666666667,Actual,12,801,7278717
      Ohio,39,2020-5-23,44,-12.3333333333333,30.5166666666667,Actual,41.2,1956,11689100
      Maryland,24,2020-5-23,40,-27.3333333333333,22.3833333333333,Actual,35.8,2243,6045680
      Indiana,18,2020-5-23,45,-9,32.76,Actual,24,1964,6732219
      Virginia,51,2020-5-23,55,-26,32.1566666666667,Actual,26.6,1159,8535519
      North Carolina,37,2020-5-23,53,-18.6666666666667,33.6233333333333,Actual,12.8,778,10488084
      South Carolina,45,2020-5-23,55,-5.66666666666667,39.7533333333333,Actual,6.6,425,5148714
      Mississippi,28,2020-5-23,57,-9,43.53,Actual,13,616,2976149
      Colorado,8,2020-5-23,61,-29,34.0733333333333,Actual,6.8,1327,5758736
      Alabama,1,2020-5-23,55,-8.33333333333333,40.6766666666667,Actual,8.8,549,4903185
      Minnesota,27,2020-5-23,39,-33.6666666666667,23.0433333333333,Actual,20.8,861,5639632
      Washington,53,2020-5-23,67,-31.3333333333333,37.0933333333333,Actual,6.6,1050,7614893
      Missouri,29,2020-5-23,39,-12.3333333333333,28.8733333333333,Actual,6.2,741,6137428
      Tennessee,47,2020-5-23,40,-10.6666666666667,29.9766666666667,Actual,6.6,329,6829174
      Rhode Island,44,2020-5-23,36,-37.6666666666667,20.5033333333333,Actual,14,597,1059361
      Wisconsin,55,2020-5-23,57,-17,37.18,Actual,6.6,507,5822434
      Nevada,32,2020-5-23,40,-36.6666666666667,22.2966666666667,Actual,3.4,387,3080156
      Iowa,19,2020-5-23,49,-11.6666666666667,35.9933333333333,Actual,12.6,446,3155070
      Oklahoma,40,2020-5-23,43,-5.33333333333333,34.58,Actual,2.8,311,3956971
      Kentucky,21,2020-5-23,53,-13.6666666666667,36.6166666666667,Actual,3,391,4467673
      New York,36,2020-5-24,56,-41.3333333333333,23.7833333333333,Actual,107.2,29856,26161672
      New Jersey,34,2020-5-24,52,-40.6666666666667,22.8,Actual,74.2,12927,8882190
      California,6,2020-5-24,53,-36,27.8733333333333,Actual,47,3753,39512223
      Texas,48,2020-5-24,62,-26,39.2666666666667,Actual,21.6,1613,28995881
      Massachusetts,25,2020-5-24,47,-37.3333333333333,22.0533333333333,Actual,65,6371,6892503
      Florida,12,2020-5-24,61,-36.6666666666667,33.52,Actual,23,2237,21477737
      Illinois,17,2020-5-24,47,-29.6666666666667,26.9,Actual,63.2,4856,12671821
      Pennsylvania,42,2020-5-24,47,-31.3333333333333,26.5866666666667,Actual,58.8,5136,12801989
      Michigan,26,2020-5-24,49,-23,27.1233333333333,Actual,27.2,5398,9986857
      Connecticut,9,2020-5-24,62,-24.3333333333333,34.6633333333333,Actual,37.2,3693,3565287
      Louisiana,22,2020-5-24,66,-23.6666666666667,42.49,Actual,14.6,2691,4648794
      Georgia,13,2020-5-24,67,-29.3333333333333,41.7766666666666,Actual,24.2,1827,10617423
      Arizona,4,2020-5-24,59,-22.6666666666667,37.62,Actual,9.2,801,7278717
      Ohio,39,2020-5-24,45,-14.3333333333333,31.3733333333333,Actual,33,1969,11689100
      Maryland,24,2020-5-24,41,-32.6666666666667,23.0566666666667,Actual,34.8,2277,6045680
      Indiana,18,2020-5-24,46,-11.3333333333333,33.6466666666667,Actual,18.2,1976,6732219
      Virginia,51,2020-5-24,56,-32,32.8366666666667,Actual,27.2,1171,8535519
      North Carolina,37,2020-5-24,54,-25,34.3733333333333,Actual,13.4,784,10488084
      South Carolina,45,2020-5-24,56,-10,40.6533333333333,Actual,6,435,5148714
      Mississippi,28,2020-5-24,58,-11.3333333333333,44.4166666666667,Actual,14.4,625,2976149
      Colorado,8,2020-5-24,62,-34,34.7333333333333,Actual,8.4,1332,5758736
      Alabama,1,2020-5-24,56,-14,41.5366666666667,Actual,10.2,551,4903185
      Minnesota,27,2020-5-24,40,-32.6666666666667,23.7166666666667,Actual,18,878,5639632
      Washington,53,2020-5-24,68,-28,37.8133333333333,Actual,6.8,1061,7614893
      Missouri,29,2020-5-24,40,-15.3333333333333,29.72,Actual,5.8,744,6137428
      Tennessee,47,2020-5-24,41,-16,30.8166666666667,Actual,6,336,6829174
      Rhode Island,44,2020-5-24,37,-24.3333333333333,21.26,Actual,15.6,608,1059361
      Wisconsin,55,2020-5-24,58,-11.3333333333333,38.0666666666667,Actual,6,510,5822434
      Nevada,32,2020-5-24,41,-38.3333333333333,22.9133333333333,Actual,2.2,380,3080156
      Iowa,19,2020-5-24,50,-12.6666666666667,36.8666666666667,Actual,13.4,456,3155070
      Oklahoma,40,2020-5-24,44,-7.66666666666667,35.5033333333333,Actual,2.8,311,3956971
      Kentucky,21,2020-5-24,54,-18,37.4366666666667,Actual,1.6,391,4467673
      New York,36,2020-5-25,57,-63,24.1533333333333,Actual,123.8,29955,26161672
      New Jersey,34,2020-5-25,53,-61.6666666666667,23.1833333333333,Actual,74.8,12941,8882190
      California,6,2020-5-25,54,-55.3333333333333,28.32,Actual,45.8,3768,39512223
      Texas,48,2020-5-25,63,-44.3333333333333,39.8233333333333,Actual,27,1623,28995881
      Massachusetts,25,2020-5-25,48,-60.6666666666667,22.4466666666667,Actual,63.8,6415,6892503
      Florida,12,2020-5-25,62,-53.3333333333333,33.9866666666667,Actual,25.8,2252,21477737
      Illinois,17,2020-5-25,48,-54,27.36,Actual,73.6,4885,12671821
      Pennsylvania,42,2020-5-25,48,-55,27.0366666666667,Actual,51,5146,12801989
      Michigan,26,2020-5-25,50,-49.6666666666667,27.6266666666667,Actual,35,5411,9986857
      Connecticut,9,2020-5-25,63,-51,35.1533333333333,Actual,33.2,3742,3565287
      Louisiana,22,2020-5-25,67,-42,43.07,Actual,11,2691,4648794
      Georgia,13,2020-5-25,68,-48,42.2966666666667,Actual,25,1848,10617423
      Arizona,4,2020-5-25,60,-41.3333333333333,38.2066666666667,Actual,11.8,807,7278717
      Ohio,39,2020-5-25,46,-39.6666666666667,31.9766666666667,Actual,34.4,1987,11689100
      Maryland,24,2020-5-25,42,-53.3333333333333,23.5233333333333,Actual,37,2302,6045680
      Indiana,18,2020-5-25,47,-34.6666666666667,34.3,Actual,17.8,1984,6732219
      Virginia,51,2020-5-25,57,-49.6666666666667,33.34,Actual,29,1208,8535519
      North Carolina,37,2020-5-25,55,-42,34.9533333333333,Actual,13.8,790,10488084
      South Carolina,45,2020-5-25,57,-32,41.3333333333333,Actual,9.4,440,5148714
      Mississippi,28,2020-5-25,59,-32.3333333333333,45.0933333333333,Actual,15,635,2976149
      Colorado,8,2020-5-25,63,-45.3333333333333,35.28,Actual,13.6,1333,5758736
      Alabama,1,2020-5-25,57,-34,42.1966666666667,Actual,8.4,566,4903185
      Minnesota,27,2020-5-25,41,-53.3333333333333,24.1833333333333,Actual,18.2,890,5639632
      Washington,53,2020-5-25,69,-55.3333333333333,38.26,Actual,9,1070,7614893
      Missouri,29,2020-5-25,41,-39.6666666666667,30.3233333333333,Actual,4.6,748,6137428
      Tennessee,47,2020-5-25,42,-36.6666666666667,31.45,Actual,7.6,338,6829174
      Rhode Island,44,2020-5-25,38,-50.6666666666667,21.7533333333333,Actual,15.2,608,1059361
      Wisconsin,55,2020-5-25,59,-39,38.6766666666667,Actual,8.6,514,5822434
      Nevada,32,2020-5-25,42,-48,23.4333333333333,Actual,3.2,394,3080156
      Iowa,19,2020-5-25,51,-37,37.4966666666667,Actual,14.4,456,3155070
      Oklahoma,40,2020-5-25,45,-34,36.1633333333333,Actual,3,313,3956971
      Kentucky,21,2020-5-25,55,-36.3333333333333,38.0733333333333,Actual,1.8,391,4467673
      New York,36,2020-5-26,58,-49.6666666666667,24.6566666666667,Actual,92.8,30015,26161672
      New Jersey,34,2020-5-26,54,-47,23.7133333333333,Actual,69.8,12994,8882190
      California,6,2020-5-26,55,-42.3333333333333,28.8966666666667,Actual,51.2,3818,39512223
      Texas,48,2020-5-26,64,-27.6666666666667,40.5466666666667,Actual,32.4,1640,28995881
      Massachusetts,25,2020-5-26,49,-46,22.9866666666667,Actual,67.2,6472,6892503
      Florida,12,2020-5-26,63,-35.3333333333333,34.6333333333333,Actual,26.2,2259,21477737
      Illinois,17,2020-5-26,49,-38,27.98,Actual,79.2,4923,12671821
      Pennsylvania,42,2020-5-26,49,-36.6666666666667,27.67,Actual,52.2,5163,12801989
      Michigan,26,2020-5-26,51,-30.6666666666667,28.32,Actual,29.8,5438,9986857
      Connecticut,9,2020-5-26,64,-32.6666666666667,35.8266666666667,Actual,30.2,3769,3565287
      Louisiana,22,2020-5-26,68,-24.3333333333333,43.8266666666667,Actual,14.6,2702,4648794
      Georgia,13,2020-5-26,69,-31,42.9866666666667,Actual,30.2,1896,10617423
      Arizona,4,2020-5-26,61,-28.6666666666667,38.92,Actual,11.8,810,7278717
      Ohio,39,2020-5-26,47,-18.3333333333333,32.7933333333333,Actual,28.4,2002,11689100
      Maryland,24,2020-5-26,43,-38.3333333333333,24.14,Actual,37,2333,6045680
      Indiana,18,2020-5-26,48,-14.3333333333333,35.1566666666667,Actual,20.8,2004,6732219
      Virginia,51,2020-5-26,58,-35,33.99,Actual,35.8,1236,8535519
      North Carolina,37,2020-5-26,56,-23.6666666666667,35.7166666666667,Actual,19.6,801,10488084
      South Carolina,45,2020-5-26,58,-12.6666666666667,42.2066666666667,Actual,9,446,5148714
      Mississippi,28,2020-5-26,60,-12.3333333333333,45.97,Actual,15.4,652,2976149
      Colorado,8,2020-5-26,64,-32.3333333333333,35.9566666666667,Actual,18.8,1352,5758736
      Alabama,1,2020-5-26,58,-16.6666666666667,43.03,Actual,8.4,580,4903185
      Minnesota,27,2020-5-26,42,-37.6666666666667,24.8066666666667,Actual,23.2,908,5639632
      Washington,53,2020-5-26,70,-38,38.88,Actual,11.2,1078,7614893
      Missouri,29,2020-5-26,42,-23,31.0933333333333,Actual,4.4,755,6137428
      Tennessee,47,2020-5-26,43,-18.6666666666667,32.2633333333333,Actual,5.4,343,6829174
      Rhode Island,44,2020-5-26,39,-35.3333333333333,22.4,Actual,16,634,1059361
      Wisconsin,55,2020-5-26,60,-20.3333333333333,39.4733333333333,Actual,8.6,517,5822434
      Nevada,32,2020-5-26,43,-36.3333333333333,24.07,Actual,3.8,394,3080156
      Iowa,19,2020-5-26,52,-20,38.2966666666667,Actual,12,477,3155070
      Oklahoma,40,2020-5-26,46,-14,37.0233333333333,Actual,2.8,318,3956971
      Kentucky,21,2020-5-26,56,-19.6666666666667,38.8766666666667,Actual,3.6,394,4467673
      New York,36,2020-5-27,59,-48.3333333333333,25.1733333333333,Actual,97.2,30201,26161672
      New Jersey,34,2020-5-27,55,-46.6666666666667,24.2466666666667,Actual,83.6,13143,8882190
      California,6,2020-5-27,56,-42,29.4766666666667,Actual,64.8,3894,39512223
      Texas,48,2020-5-27,65,-26.6666666666667,41.28,Actual,22,1680,28995881
      Massachusetts,25,2020-5-27,50,-45,23.5366666666667,Actual,69.2,6546,6892503
      Florida,12,2020-5-27,64,-34,35.2933333333333,Actual,35.2,2319,21477737
      Illinois,17,2020-5-27,50,-37,28.61,Actual,82.8,5083,12671821
      Pennsylvania,42,2020-5-27,50,-35.3333333333333,28.3166666666667,Actual,65.6,5265,12801989
      Michigan,26,2020-5-27,52,-30.6666666666667,29.0133333333333,Actual,35.6,5506,9986857
      Connecticut,9,2020-5-27,65,-31.6666666666667,36.51,Actual,35,3803,3565287
      Louisiana,22,2020-5-27,69,-19.6666666666667,44.63,Actual,15.2,2723,4648794
      Georgia,13,2020-5-27,70,-31,43.6766666666666,Actual,32,1933,10617423
      Arizona,4,2020-5-27,62,-28.3333333333333,39.6366666666667,Actual,17,834,7278717
      Ohio,39,2020-5-27,48,-16.3333333333333,33.63,Actual,32.4,2044,11689100
      Maryland,24,2020-5-27,44,-38.3333333333333,24.7566666666667,Actual,37.8,2392,6045680
      Indiana,18,2020-5-27,49,-13.6666666666667,36.02,Actual,26.8,2030,6732219
      Virginia,51,2020-5-27,59,-34,34.65,Actual,37.4,1281,8535519
      North Carolina,37,2020-5-27,57,-29,36.4266666666667,Actual,27,844,10488084
      South Carolina,45,2020-5-27,59,-16,43.0466666666667,Actual,9.6,466,5148714
      Mississippi,28,2020-5-27,61,-9.66666666666667,46.8733333333333,Actual,17,670,2976149
      Colorado,8,2020-5-27,65,-32.6666666666667,36.63,Actual,20.8,1392,5758736
      Alabama,1,2020-5-27,59,-15.6666666666667,43.8733333333333,Actual,11.8,583,4903185
      Minnesota,27,2020-5-27,43,-34.3333333333333,25.4633333333333,Actual,25.6,942,5639632
      Washington,53,2020-5-27,71,-36.3333333333333,39.5166666666667,Actual,10,1095,7614893
      Missouri,29,2020-5-27,43,-17.3333333333333,31.92,Actual,4.8,757,6137428
      Tennessee,47,2020-5-27,44,-18,33.0833333333333,Actual,5,353,6829174
      Rhode Island,44,2020-5-27,40,-33.3333333333333,23.0666666666667,Actual,17,655,1059361
      Wisconsin,55,2020-5-27,61,-18.3333333333333,40.29,Actual,11.6,539,5822434
      Nevada,32,2020-5-27,44,-34.3333333333333,24.7266666666667,Actual,5.2,402,3080156
      Iowa,19,2020-5-27,53,-15.3333333333333,39.1433333333333,Actual,13.6,496,3155070
      Oklahoma,40,2020-5-27,47,-9.33333333333333,37.93,Actual,3.6,322,3956971
      Kentucky,21,2020-5-27,57,-18.6666666666667,39.69,Actual,5.4,400,4467673
      New York,36,2020-5-28,60,-50.3333333333333,25.67,Actual,94.8,30235,26161672
      New Jersey,34,2020-5-28,56,-48.6666666666667,24.76,Actual,101.8,13218,8882190
      California,6,2020-5-28,57,-42,30.0566666666667,Actual,75.2,3993,39512223
      Texas,48,2020-5-28,66,-26.6666666666667,42.0133333333333,Actual,29.2,1715,28995881
      Massachusetts,25,2020-5-28,51,-46,24.0766666666667,Actual,70.4,6639,6892503
      Florida,12,2020-5-28,65,-33.6666666666667,35.9566666666667,Actual,39,2364,21477737
      Illinois,17,2020-5-28,51,-37.3333333333333,29.2366666666667,Actual,89,5186,12671821
      Pennsylvania,42,2020-5-28,51,-37,28.9466666666667,Actual,78.2,5373,12801989
      Michigan,26,2020-5-28,53,-31.6666666666667,29.6966666666667,Actual,44,5543,9986857
      Connecticut,9,2020-5-28,66,-34,37.17,Actual,34,3826,3565287
      Louisiana,22,2020-5-28,70,-21,45.42,Actual,19,2741,4648794
      Georgia,13,2020-5-28,71,-29.3333333333333,44.3833333333333,Actual,31.2,1973,10617423
      Arizona,4,2020-5-28,63,-28.3333333333333,40.3533333333333,Actual,19.4,860,7278717
      Ohio,39,2020-5-28,49,-17.6666666666667,34.4533333333333,Actual,32.4,2098,11689100
      Maryland,24,2020-5-28,45,-40.6666666666667,25.35,Actual,41.4,2428,6045680
      Indiana,18,2020-5-28,50,-14.3333333333333,36.8766666666667,Actual,28.2,2068,6732219
      Virginia,51,2020-5-28,60,-35.3333333333333,35.2966666666667,Actual,32.4,1338,8535519
      North Carolina,37,2020-5-28,58,-26.3333333333333,37.1633333333333,Actual,27.8,876,10488084
      South Carolina,45,2020-5-28,60,-13,43.9166666666667,Actual,9.4,470,5148714
      Mississippi,28,2020-5-28,62,-9.66666666666667,47.7766666666667,Actual,17.6,693,2976149
      Colorado,8,2020-5-28,66,-31.3333333333333,37.3166666666667,Actual,22,1421,5758736
      Alabama,1,2020-5-28,60,-12.6666666666667,44.7466666666667,Actual,10.4,591,4903185
      Minnesota,27,2020-5-28,44,-35,26.1133333333333,Actual,29.2,977,5639632
      Washington,53,2020-5-28,72,-37.3333333333333,40.1433333333333,Actual,9.6,1106,7614893
      Missouri,29,2020-5-28,44,-21.3333333333333,32.7066666666667,Actual,7.6,763,6137428
      Tennessee,47,2020-5-28,45,-17.3333333333333,33.91,Actual,5.2,356,6829174
      Rhode Island,44,2020-5-28,41,-35.3333333333333,23.7133333333333,Actual,20.6,677,1059361
      Wisconsin,55,2020-5-28,62,-23,41.06,Actual,14.8,550,5822434
      Nevada,32,2020-5-28,45,-36,25.3666666666667,Actual,4.6,406,3080156
      Iowa,19,2020-5-28,54,-16.6666666666667,39.9766666666667,Actual,15,506,3155070
      Oklahoma,40,2020-5-28,48,-9.66666666666667,38.8333333333333,Actual,4.2,325,3956971
      Kentucky,21,2020-5-28,58,-18,40.51,Actual,8,409,4467673
      New York,36,2020-5-29,61,-51,26.16,Actual,94.8,30342,26161672
      New Jersey,34,2020-5-29,57,-48.3333333333333,25.2766666666667,Actual,104.8,13345,8882190
      California,6,2020-5-29,58,-41.3333333333333,30.6433333333333,Actual,70.8,4077,39512223
      Texas,48,2020-5-29,67,-26,42.7533333333333,Actual,29.6,1723,28995881
      Massachusetts,25,2020-5-29,52,-46.3333333333333,24.6133333333333,Actual,74.6,6717,6892503
      Florida,12,2020-5-29,66,-33.3333333333333,36.6233333333333,Actual,38.4,2413,21477737
      Illinois,17,2020-5-29,52,-34,29.8966666666667,Actual,93.4,5270,12671821
      Pennsylvania,42,2020-5-29,52,-37.6666666666667,29.57,Actual,78.4,5464,12801989
      Michigan,26,2020-5-29,54,-33.3333333333333,30.3633333333333,Actual,44,5576,9986857
      Connecticut,9,2020-5-29,67,-34.6666666666667,37.8233333333333,Actual,35,3868,3565287
      Louisiana,22,2020-5-29,71,-24,46.18,Actual,17.8,2767,4648794
      Georgia,13,2020-5-29,72,-30,45.0833333333333,Actual,31.4,1987,10617423
      Arizona,4,2020-5-29,64,-29.3333333333333,41.06,Actual,19.4,886,7278717
      Ohio,39,2020-5-29,50,-20.6666666666667,35.2466666666667,Actual,30.6,2131,11689100
      Maryland,24,2020-5-29,46,-38.6666666666667,25.9633333333333,Actual,39.8,2466,6045680
      Indiana,18,2020-5-29,51,-14.3333333333333,37.7333333333333,Actual,26,2110,6732219
      Virginia,51,2020-5-29,61,-34.6666666666667,35.95,Actual,27.8,1358,8535519
      North Carolina,37,2020-5-29,59,-27,37.8933333333333,Actual,27.2,919,10488084
      South Carolina,45,2020-5-29,61,-14.3333333333333,44.7733333333333,Actual,9.6,483,5148714
      Mississippi,28,2020-5-29,63,-11.6666666666667,48.66,Actual,16.4,710,2976149
      Colorado,8,2020-5-29,67,-31.3333333333333,38.0033333333333,Actual,18.6,1436,5758736
      Alabama,1,2020-5-29,61,-14,45.6066666666667,Actual,10,610,4903185
      Minnesota,27,2020-5-29,45,-40,26.7133333333333,Actual,28.4,1006,5639632
      Washington,53,2020-5-29,73,-37.6666666666667,40.7666666666667,Actual,8,1111,7614893
      Missouri,29,2020-5-29,45,-11.6666666666667,33.59,Actual,6.6,768,6137428
      Tennessee,47,2020-5-29,46,-18.3333333333333,34.7266666666667,Actual,4.2,361,6829174
      Rhode Island,44,2020-5-29,42,-36.6666666666667,24.3466666666667,Actual,16.8,693,1059361
      Wisconsin,55,2020-5-29,63,-18.3333333333333,41.8766666666667,Actual,15,568,5822434
      Nevada,32,2020-5-29,46,-37,25.9966666666667,Actual,4.6,406,3080156
      Iowa,19,2020-5-29,55,-10.6666666666667,40.87,Actual,11.6,524,3155070
      Oklahoma,40,2020-5-29,49,-9.33333333333333,39.74,Actual,3.2,329,3956971
      Kentucky,21,2020-5-29,59,-19.6666666666667,41.3133333333333,Actual,7.4,418,4467673
      New York,36,2020-5-30,62,-37.3333333333333,26.7866666666667,Actual,84.4,30429,26161672
      New Jersey,34,2020-5-30,58,-33,25.9466666666667,Actual,80.8,13450,8882190
      California,6,2020-5-30,59,-32.3333333333333,31.32,Actual,64.6,4144,39512223
      Texas,48,2020-5-30,68,-17,43.5833333333333,Actual,23.4,1769,28995881
      Massachusetts,25,2020-5-30,53,-32.3333333333333,25.29,Actual,97.6,6767,6892503
      Florida,12,2020-5-30,67,-28,37.3433333333333,Actual,28.2,2447,21477737
      Illinois,17,2020-5-30,53,-19.3333333333333,30.7033333333333,Actual,65.8,5330,12671821
      Pennsylvania,42,2020-5-30,53,-24.3333333333333,30.3266666666667,Actual,60.4,5537,12801989
      Michigan,26,2020-5-30,55,-19.3333333333333,31.17,Actual,35.8,5631,9986857
      Connecticut,9,2020-5-30,68,-20,38.6233333333333,Actual,33.4,3912,3565287
      Louisiana,22,2020-5-30,72,-17.6666666666667,47.0033333333333,Actual,15.6,2786,4648794
      Georgia,13,2020-5-30,73,-19.6666666666667,45.8866666666666,Actual,32.2,2004,10617423
      Arizona,4,2020-5-30,65,-22.3333333333333,41.8366666666667,Actual,16.8,904,7278717
      Ohio,39,2020-5-30,51,-5.66666666666667,36.19,Actual,32.6,2149,11689100
      Maryland,24,2020-5-30,47,-22,26.7433333333333,Actual,32,2509,6045680
      Indiana,18,2020-5-30,52,-1.33333333333333,38.72,Actual,22.6,2125,6732219
      Virginia,51,2020-5-30,62,-22,36.73,Actual,22.2,1370,8535519
      North Carolina,37,2020-5-30,60,-14.6666666666667,38.7466666666667,Actual,20.8,929,10488084
      South Carolina,45,2020-5-30,62,-4,45.7333333333333,Actual,6.8,487,5148714
      Mississippi,28,2020-5-30,64,-3,49.63,Actual,13.8,723,2976149
      Colorado,8,2020-5-30,68,-23.3333333333333,38.77,Actual,13.2,1443,5758736
      Alabama,1,2020-5-30,62,-3,46.5766666666667,Actual,12.6,618,4903185
      Minnesota,27,2020-5-30,46,-29.6666666666667,27.4166666666667,Actual,23.6,1036,5639632
      Washington,53,2020-5-30,74,-34,41.4266666666667,Actual,5.6,1118,7614893
      Missouri,29,2020-5-30,46,-8,34.51,Actual,6.4,786,6137428
      Tennessee,47,2020-5-30,47,-6.33333333333333,35.6633333333333,Actual,2.2,364,6829174
      Rhode Island,44,2020-5-30,43,-24,25.1066666666667,Actual,13,711,1059361
      Wisconsin,55,2020-5-30,64,-4,42.8366666666667,Actual,11.2,588,5822434
      Nevada,32,2020-5-30,47,-33.6666666666667,26.66,Actual,3,417,3080156
      Iowa,19,2020-5-30,56,-3.33333333333333,41.8366666666667,Actual,11.8,531,3155070
      Oklahoma,40,2020-5-30,50,0,40.74,Actual,2.4,334,3956971
      Kentucky,21,2020-5-30,60,-6,42.2533333333333,Actual,7.8,431,4467673
      New York,36,2020-5-31,63,-37.6666666666667,27.41,Actual,88.2,30489,26161672
      New Jersey,34,2020-5-31,59,-34.6666666666667,26.6,Actual,76.2,13518,8882190
      California,6,2020-5-31,60,-34,31.98,Actual,62.4,4172,39512223
      Texas,48,2020-5-31,69,-20,44.3833333333333,Actual,24.2,1788,28995881
      Massachusetts,25,2020-5-31,54,-30.6666666666667,25.9833333333333,Actual,89,6845,6892503
      Florida,12,2020-5-31,68,-30.6666666666667,38.0366666666667,Actual,33.2,2451,21477737
      Illinois,17,2020-5-31,54,-25.3333333333333,31.45,Actual,67.8,5390,12671821
      Pennsylvania,42,2020-5-31,54,-24.6666666666667,31.08,Actual,58.8,5555,12801989
      Michigan,26,2020-5-31,56,-18.6666666666667,31.9833333333333,Actual,35.6,5658,9986857
      Connecticut,9,2020-5-31,69,-19.3333333333333,39.43,Actual,29.2,3944,3565287
      Louisiana,22,2020-5-31,73,-18.3333333333333,47.82,Actual,18.8,2791,4648794
      Georgia,13,2020-5-31,74,-24.6666666666667,46.64,Actual,25.8,2053,10617423
      Arizona,4,2020-5-31,66,-22.6666666666667,42.61,Actual,16.6,907,7278717
      Ohio,39,2020-5-31,52,-7.66666666666667,37.1133333333333,Actual,32.2,2155,11689100
      Maryland,24,2020-5-31,48,-24,27.5033333333333,Actual,33.8,2532,6045680
      Indiana,18,2020-5-31,53,-4.33333333333333,39.6766666666667,Actual,25.8,2134,6732219
      Virginia,51,2020-5-31,63,-23.3333333333333,37.4966666666667,Actual,13.8,1375,8535519
      North Carolina,37,2020-5-31,61,-18.3333333333333,39.5633333333333,Actual,17,937,10488084
      South Carolina,45,2020-5-31,63,-5,46.6833333333333,Actual,6.2,494,5148714
      Mississippi,28,2020-5-31,65,-4.66666666666667,50.5833333333333,Actual,14.8,734,2976149
      Colorado,8,2020-5-31,69,-22,39.55,Actual,10.6,1445,5758736
      Alabama,1,2020-5-31,63,-6.66666666666667,47.51,Actual,12.4,630,4903185
      Minnesota,27,2020-5-31,47,-27.6666666666667,28.14,Actual,21,1050,5639632
      Washington,53,2020-5-31,75,-27.6666666666667,42.15,Actual,4.6,1118,7614893
      Missouri,29,2020-5-31,47,-7.66666666666667,35.4333333333333,Actual,7,788,6137428
      Tennessee,47,2020-5-31,48,-11,36.5533333333333,Actual,5,364,6829174
      Rhode Island,44,2020-5-31,44,-19.6666666666667,25.91,Actual,11,718,1059361
      Wisconsin,55,2020-5-31,65,-5,43.7866666666667,Actual,11.4,592,5822434
      Nevada,32,2020-5-31,48,-35,27.31,Actual,2.2,417,3080156
      Iowa,19,2020-5-31,57,-4,42.7966666666667,Actual,11,535,3155070
      Oklahoma,40,2020-5-31,51,0.333333333333333,41.7433333333333,Actual,2.8,334,3956971
      Kentucky,21,2020-5-31,61,-8.66666666666667,43.1666666666667,Actual,6.6,431,4467673
      New York,36,2020-6-1,64,-47.3333333333333,27.9366666666667,Actual,78.4,30623,26161672
      New Jersey,34,2020-6-1,60,-45,27.15,Actual,73,13547,8882190
      California,6,2020-6-1,61,-42.6666666666667,32.5533333333333,Actual,59.4,4217,39512223
      Texas,48,2020-6-1,70,-25.6666666666667,45.1266666666667,Actual,28.6,1797,28995881
      Massachusetts,25,2020-6-1,55,-43.6666666666667,26.5466666666667,Actual,86.8,7034,6892503
      Florida,12,2020-6-1,69,-32,38.7166666666667,Actual,30.6,2460,21477737
      Illinois,17,2020-6-1,55,-38.6666666666667,32.0633333333333,Actual,70.2,5412,12671821
      Pennsylvania,42,2020-6-1,55,-34.3333333333333,31.7366666666667,Actual,55.6,5567,12801989
      Michigan,26,2020-6-1,57,-27.3333333333333,32.71,Actual,32.6,5685,9986857
      Connecticut,9,2020-6-1,70,-28.6666666666667,40.1433333333333,Actual,24.2,3970,3565287
      Louisiana,22,2020-6-1,74,-18.3333333333333,48.6366666666667,Actual,20.6,2801,4648794
      Georgia,13,2020-6-1,75,-28.3333333333333,47.3566666666666,Actual,27.2,2094,10617423
      Arizona,4,2020-6-1,67,-27.6666666666667,43.3333333333333,Actual,19.4,918,7278717
      Ohio,39,2020-6-1,53,-14.3333333333333,37.97,Actual,33.8,2207,11689100
      Maryland,24,2020-6-1,49,-35,28.1533333333333,Actual,35,2552,6045680
      Indiana,18,2020-6-1,54,-11.3333333333333,40.5633333333333,Actual,19.4,2143,6732219
      Virginia,51,2020-6-1,64,-31.3333333333333,38.1833333333333,Actual,14,1392,8535519
      North Carolina,37,2020-6-1,62,-21,40.3533333333333,Actual,16,948,10488084
      South Carolina,45,2020-6-1,64,-9,47.5933333333333,Actual,7,500,5148714
      Mississippi,28,2020-6-1,66,-5.33333333333333,51.53,Actual,14.4,739,2976149
      Colorado,8,2020-6-1,70,-27.6666666666667,40.2733333333333,Actual,11.6,1458,5758736
      Alabama,1,2020-6-1,64,-10,48.41,Actual,8.6,646,4903185
      Minnesota,27,2020-6-1,48,-34.3333333333333,28.7966666666667,Actual,18.2,1060,5639632
      Washington,53,2020-6-1,76,-35,42.8,Actual,4.8,1123,7614893
      Missouri,29,2020-6-1,48,-16.3333333333333,36.27,Actual,7.2,789,6137428
      Tennessee,47,2020-6-1,49,-14.6666666666667,37.4066666666667,Actual,5.4,364,6829174
      Rhode Island,44,2020-6-1,45,-28.6666666666667,26.6233333333333,Actual,9.8,720,1059361
      Wisconsin,55,2020-6-1,66,-17.3333333333333,44.6133333333334,Actual,9.6,595,5822434
      Nevada,32,2020-6-1,49,-33,27.98,Actual,5,417,3080156
      Iowa,19,2020-6-1,58,-13.3333333333333,43.6633333333333,Actual,10,555,3155070
      Oklahoma,40,2020-6-1,52,-7.66666666666667,42.6666666666667,Actual,2.4,334,3956971
      Kentucky,21,2020-6-1,62,-15.3333333333333,44.0133333333333,Actual,6.4,439,4467673
      New York,36,2020-6-2,65,-49,28.4466666666667,Actual,86.8,30676,26161672
      New Jersey,34,2020-6-2,61,-46,27.69,Actual,71,13599,8882190
      California,6,2020-6-2,62,-41.6666666666667,33.1366666666667,Actual,60,4305,39512223
      Texas,48,2020-6-2,71,-25,45.8766666666667,Actual,26.2,1836,28995881
      Massachusetts,25,2020-6-2,56,-43.6666666666667,27.11,Actual,86.6,7084,6892503
      Florida,12,2020-6-2,70,-32,39.3966666666667,Actual,32,2530,21477737
      Illinois,17,2020-6-2,56,-36.3333333333333,32.7,Actual,81.2,5525,12671821
      Pennsylvania,42,2020-6-2,56,-32.6666666666667,32.41,Actual,59,5667,12801989
      Michigan,26,2020-6-2,58,-26.3333333333333,33.4466666666667,Actual,26.8,5721,9986857
      Connecticut,9,2020-6-2,71,-29.6666666666667,40.8466666666667,Actual,19,3972,3565287
      Louisiana,22,2020-6-2,75,-18,49.4566666666667,Actual,19.4,2835,4648794
      Georgia,13,2020-6-2,76,-27.6666666666667,48.08,Actual,29,2102,10617423
      Arizona,4,2020-6-2,68,-27.6666666666667,44.0566666666667,Actual,19,943,7278717
      Ohio,39,2020-6-2,54,-14.3333333333333,38.8266666666667,Actual,38.2,2259,11689100
      Maryland,24,2020-6-2,50,-34.3333333333333,28.81,Actual,31.8,2597,6045680
      Indiana,18,2020-6-2,55,-10,41.4633333333333,Actual,21.2,2197,6732219
      Virginia,51,2020-6-2,65,-31,38.8733333333333,Actual,15,1407,8535519
      North Carolina,37,2020-6-2,63,-21,41.1433333333333,Actual,15.4,961,10488084
      South Carolina,45,2020-6-2,65,-8.33333333333333,48.51,Actual,7.6,501,5148714
      Mississippi,28,2020-6-2,67,-5.66666666666667,52.4733333333333,Actual,14.2,767,2976149
      Colorado,8,2020-6-2,71,-29.6666666666667,40.9766666666667,Actual,13.8,1474,5758736
      Alabama,1,2020-6-2,65,-11.3333333333333,49.2966666666666,Actual,7,653,4903185
      Minnesota,27,2020-6-2,49,-37,29.4266666666667,Actual,18,1082,5639632
      Washington,53,2020-6-2,77,-36.3333333333333,43.4366666666667,Actual,4,1129,7614893
      Missouri,29,2020-6-2,49,-16.3333333333333,37.1066666666667,Actual,4,798,6137428
      Tennessee,47,2020-6-2,50,-15,38.2566666666667,Actual,7.4,381,6829174
      Rhode Island,44,2020-6-2,46,-30.3333333333333,27.32,Actual,9,732,1059361
      Wisconsin,55,2020-6-2,67,-18,45.4333333333334,Actual,7.6,607,5822434
      Nevada,32,2020-6-2,50,-32,28.66,Actual,2.6,417,3080156
      Iowa,19,2020-6-2,59,-13.3333333333333,44.53,Actual,10.4,561,3155070
      Oklahoma,40,2020-6-2,53,-8,43.5866666666667,Actual,2,339,3956971
      Kentucky,21,2020-6-2,63,-15.6666666666667,44.8566666666667,Actual,5.4,442,4467673
      New York,36,2020-6-3,66,-49.3333333333333,28.9533333333333,Actual,87.2,30734,26161672
      New Jersey,34,2020-6-3,62,-46.3333333333333,28.2266666666667,Actual,73.8,13710,8882190
      California,6,2020-6-3,63,-40.3333333333333,33.7333333333333,Actual,71.4,4374,39512223
      Texas,48,2020-6-3,72,-24,46.6366666666667,Actual,29.6,1866,28995881
      Massachusetts,25,2020-6-3,57,-43.3333333333333,27.6766666666667,Actual,77.8,7151,6892503
      Florida,12,2020-6-3,71,-33,40.0666666666667,Actual,41.8,2566,21477737
      Illinois,17,2020-6-3,57,-34,33.36,Actual,81,5621,12671821
      Pennsylvania,42,2020-6-3,57,-35.3333333333333,33.0566666666667,Actual,68.6,5742,12801989
      Michigan,26,2020-6-3,59,-24.6666666666667,34.2,Actual,35.8,5739,9986857
      Connecticut,9,2020-6-3,72,-28.6666666666667,41.56,Actual,18.8,3989,3565287
      Louisiana,22,2020-6-3,76,-17.3333333333333,50.2833333333333,Actual,24.2,2870,4648794
      Georgia,13,2020-6-3,77,-27,48.81,Actual,24.2,2123,10617423
      Arizona,4,2020-6-3,69,-27.6666666666667,44.78,Actual,21.6,983,7278717
      Ohio,39,2020-6-3,55,-15,39.6766666666667,Actual,40.4,2300,11689100
      Maryland,24,2020-6-3,51,-35.3333333333333,29.4566666666667,Actual,34,2641,6045680
      Indiana,18,2020-6-3,56,-10.6666666666667,42.3566666666667,Actual,24.8,2207,6732219
      Virginia,51,2020-6-3,66,-30.6666666666667,39.5666666666667,Actual,15.8,1428,8535519
      North Carolina,37,2020-6-3,64,-21.3333333333333,41.93,Actual,15.6,999,10488084
      South Carolina,45,2020-6-3,66,-7.66666666666667,49.4333333333333,Actual,9,518,5148714
      Mississippi,28,2020-6-3,68,-5,53.4233333333333,Actual,13.8,782,2976149
      Colorado,8,2020-6-3,72,-29.3333333333333,41.6833333333333,Actual,15.8,1494,5758736
      Alabama,1,2020-6-3,66,-9.33333333333333,50.2033333333333,Actual,9.2,653,4903185
      Minnesota,27,2020-6-3,50,-30.6666666666667,30.12,Actual,21.8,1097,5639632
      Washington,53,2020-6-3,78,-35,44.0866666666667,Actual,6.2,1135,7614893
      Missouri,29,2020-6-3,50,-12,37.9866666666667,Actual,5,804,6137428
      Tennessee,47,2020-6-3,51,-15,39.1066666666667,Actual,8.8,388,6829174
      Rhode Island,44,2020-6-3,47,-31.6666666666667,28.0033333333333,Actual,10.8,742,1059361
      Wisconsin,55,2020-6-3,68,-14.6666666666667,46.2866666666667,Actual,8.2,616,5822434
      Nevada,32,2020-6-3,51,-31,29.35,Actual,3.8,431,3080156
      Iowa,19,2020-6-3,60,-10.3333333333333,45.4266666666667,Actual,11.6,574,3155070
      Oklahoma,40,2020-6-3,54,-4,44.5466666666667,Actual,2.2,341,3956971
      Kentucky,21,2020-6-3,64,-15,45.7066666666667,Actual,7,450,4467673
      New York,36,2020-6-4,67,-47,29.4833333333333,Actual,70.2,30863,26161672
      New Jersey,34,2020-6-4,63,-44.6666666666667,28.78,Actual,79.6,13805,8882190
      California,6,2020-6-4,64,-40,34.3333333333333,Actual,78,4444,39512223
      Texas,48,2020-6-4,73,-24.6666666666667,47.39,Actual,32,1900,28995881
      Massachusetts,25,2020-6-4,58,-43,28.2466666666667,Actual,50.8,7200,6892503
      Florida,12,2020-6-4,72,-33.6666666666667,40.73,Actual,45.6,2607,21477737
      Illinois,17,2020-6-4,58,-33,34.03,Actual,90.4,5736,12671821
      Pennsylvania,42,2020-6-4,58,-34,33.7166666666667,Actual,72.8,5832,12801989
      Michigan,26,2020-6-4,60,-26,34.94,Actual,31.8,5765,9986857
      Connecticut,9,2020-6-4,73,-27.6666666666667,42.2833333333333,Actual,17,4007,3565287
      Louisiana,22,2020-6-4,77,-18,51.1033333333333,Actual,24.8,2883,4648794
      Georgia,13,2020-6-4,78,-28.3333333333333,49.5266666666666,Actual,16.8,2149,10617423
      Arizona,4,2020-6-4,70,-28.3333333333333,45.4966666666667,Actual,25,999,7278717
      Ohio,39,2020-6-4,56,-17,40.5066666666667,Actual,33,2340,11689100
      Maryland,24,2020-6-4,52,-36.6666666666667,30.09,Actual,37.6,2668,6045680
      Indiana,18,2020-6-4,57,-12,43.2366666666667,Actual,29.8,2231,6732219
      Virginia,51,2020-6-4,67,-32.3333333333333,40.2433333333333,Actual,13.8,1445,8535519
      North Carolina,37,2020-6-4,65,-22.3333333333333,42.7066666666667,Actual,16,1006,10488084
      South Carolina,45,2020-6-4,67,-9.33333333333333,50.34,Actual,9,525,5148714
      Mississippi,28,2020-6-4,69,-7,54.3533333333333,Actual,14.4,794,2976149
      Colorado,8,2020-6-4,73,-29.6666666666667,42.3866666666667,Actual,13.8,1512,5758736
      Alabama,1,2020-6-4,67,-12.3333333333333,51.08,Actual,8.6,653,4903185
      Minnesota,27,2020-6-4,51,-32.3333333333333,30.7966666666667,Actual,24.2,1126,5639632
      Washington,53,2020-6-4,79,-36.3333333333333,44.7233333333333,Actual,6,1138,7614893
      Missouri,29,2020-6-4,51,-17,38.8166666666667,Actual,6.4,806,6137428
      Tennessee,47,2020-6-4,52,-16.3333333333333,39.9433333333333,Actual,10.6,401,6829174
      Rhode Island,44,2020-6-4,48,-28.6666666666667,28.7166666666667,Actual,10.4,756,1059361
      Wisconsin,55,2020-6-4,69,-14.3333333333333,47.1433333333334,Actual,10,626,5822434
      Nevada,32,2020-6-4,52,-30.3333333333333,30.0466666666667,Actual,4,430,3080156
      Iowa,19,2020-6-4,61,-13.3333333333333,46.2933333333333,Actual,8.8,583,3155070
      Oklahoma,40,2020-6-4,55,-7.66666666666667,45.47,Actual,2.6,344,3956971
      Kentucky,21,2020-6-4,65,-18.3333333333333,46.5233333333333,Actual,6.2,458,4467673
      New York,36,2020-6-5,68,-49,29.9933333333333,Actual,78.4,30925,26161672
      New Jersey,34,2020-6-5,64,-46.6666666666667,29.3133333333333,Actual,83.4,13887,8882190
      California,6,2020-6-5,65,-39.3333333333333,34.94,Actual,65.4,4529,39512223
      Texas,48,2020-6-5,74,-25.3333333333333,48.1366666666667,Actual,26,1936,28995881
      Massachusetts,25,2020-6-5,59,-44,28.8066666666667,Actual,46.2,7234,6892503
      Florida,12,2020-6-5,73,-33,41.4,Actual,34,2660,21477737
      Illinois,17,2020-6-5,59,-32,34.71,Actual,75.8,5795,12671821
      Pennsylvania,42,2020-6-5,59,-33.6666666666667,34.38,Actual,55.2,5898,12801989
      Michigan,26,2020-6-5,61,-29,35.65,Actual,26.8,5837,9986857
      Connecticut,9,2020-6-5,74,-31.6666666666667,42.9666666666667,Actual,19.8,4038,3565287
      Louisiana,22,2020-6-5,78,-21.3333333333333,51.89,Actual,20.2,2912,4648794
      Georgia,13,2020-6-5,79,-29.3333333333333,50.2333333333333,Actual,15.6,2174,10617423
      Arizona,4,2020-6-5,71,-29,46.2066666666667,Actual,21.6,1015,7278717
      Ohio,39,2020-6-5,57,-17,41.3366666666667,Actual,24,2357,11689100
      Maryland,24,2020-6-5,53,-37.6666666666667,30.7133333333333,Actual,30.4,2702,6045680
      Indiana,18,2020-6-5,58,-13.3333333333333,44.1033333333333,Actual,21.2,2258,6732219
      Virginia,51,2020-6-5,68,-32.3333333333333,40.92,Actual,13,1454,8535519
      North Carolina,37,2020-6-5,66,-23,43.4766666666667,Actual,14.2,1015,10488084
      South Carolina,45,2020-6-5,68,-9.33333333333333,51.2466666666667,Actual,9,539,5148714
      Mississippi,28,2020-6-5,70,-12,55.2333333333333,Actual,10,803,2976149
      Colorado,8,2020-6-5,74,-29.6666666666667,43.09,Actual,10.6,1524,5758736
      Alabama,1,2020-6-5,68,-14.3333333333333,51.9366666666666,Actual,7.8,676,4903185
      Minnesota,27,2020-6-5,52,-32.3333333333333,31.4733333333333,Actual,23,1159,5639632
      Washington,53,2020-6-5,80,-36,45.3633333333333,Actual,5.6,1149,7614893
      Missouri,29,2020-6-5,52,-11.6666666666667,39.7,Actual,5,813,6137428
      Tennessee,47,2020-6-5,53,-18,40.7633333333333,Actual,7.4,408,6829174
      Rhode Island,44,2020-6-5,49,-30.6666666666667,29.41,Actual,8,772,1059361
      Wisconsin,55,2020-6-5,70,-16,47.9833333333334,Actual,8,633,5822434
      Nevada,32,2020-6-5,53,-31,30.7366666666667,Actual,4.2,436,3080156
      Iowa,19,2020-6-5,62,-10.3333333333333,47.19,Actual,8.8,593,3155070
      Oklahoma,40,2020-6-5,56,-8.66666666666667,46.3833333333333,Actual,1.8,345,3956971
      Kentucky,21,2020-6-5,66,-17.6666666666667,47.3466666666667,Actual,5.6,466,4467673
      New York,36,2020-6-6,69,-36.6666666666667,30.6266666666667,Actual,77.8,30974,26161672
      New Jersey,34,2020-6-6,65,-32,29.9933333333333,Actual,69,13945,8882190
      California,6,2020-6-6,66,-29.6666666666667,35.6433333333333,Actual,56.6,4607,39512223
      Texas,48,2020-6-6,75,-18,48.9566666666667,Actual,22.8,1957,28995881
      Massachusetts,25,2020-6-6,60,-34,29.4666666666667,Actual,40.2,7288,6892503
      Florida,12,2020-6-6,74,-31.3333333333333,42.0866666666667,Actual,29.2,2688,21477737
      Illinois,17,2020-6-6,60,-17.6666666666667,35.5333333333333,Actual,60.6,5864,12671821
      Pennsylvania,42,2020-6-6,60,-20.6666666666667,35.1733333333333,Actual,42.2,5931,12801989
      Michigan,26,2020-6-6,62,-16.6666666666667,36.4833333333333,Actual,26.2,5844,9986857
      Connecticut,9,2020-6-6,75,-18.3333333333333,43.7833333333333,Actual,19,4055,3565287
      Louisiana,22,2020-6-6,79,-18,52.71,Actual,14.8,2925,4648794
      Georgia,13,2020-6-6,80,-19.3333333333333,51.04,Actual,17,2178,10617423
      Arizona,4,2020-6-6,72,-21.3333333333333,46.9933333333333,Actual,14,1043,7278717
      Ohio,39,2020-6-6,58,-6.33333333333333,42.2733333333333,Actual,21.2,2372,11689100
      Maryland,24,2020-6-6,54,-20.3333333333333,31.51,Actual,27,2740,6045680
      Indiana,18,2020-6-6,59,-1.66666666666667,45.0866666666667,Actual,21.8,2292,6732219
      Virginia,51,2020-6-6,69,-19,41.73,Actual,9.8,1461,8535519
      North Carolina,37,2020-6-6,67,-15.3333333333333,44.3233333333333,Actual,8.4,1028,10488084
      South Carolina,45,2020-6-6,69,-1,52.2366666666667,Actual,7.8,545,5148714
      Mississippi,28,2020-6-6,71,-2.66666666666667,56.2066666666667,Actual,11,811,2976149
      Colorado,8,2020-6-6,75,-24.6666666666667,43.8433333333333,Actual,9.8,1527,5758736
      Alabama,1,2020-6-6,69,-4.33333333333333,52.8933333333333,Actual,13,689,4903185
      Minnesota,27,2020-6-6,53,-24.6666666666667,32.2266666666667,Actual,22.2,1181,5639632
      Washington,53,2020-6-6,81,-26.3333333333333,46.1,Actual,5.2,1153,7614893
      Missouri,29,2020-6-6,53,-9.33333333333333,40.6066666666667,Actual,4.6,821,6137428
      Tennessee,47,2020-6-6,54,-7.33333333333333,41.69,Actual,6.6,417,6829174
      Rhode Island,44,2020-6-6,50,-25,30.16,Actual,11.4,772,1059361
      Wisconsin,55,2020-6-6,71,-1.66666666666667,48.9666666666667,Actual,6,645,5822434
      Nevada,32,2020-6-6,54,-26.6666666666667,31.47,Actual,2.2,437,3080156
      Iowa,19,2020-6-6,63,-2.33333333333333,48.1666666666667,Actual,8.6,599,3155070
      Oklahoma,40,2020-6-6,57,-1.66666666666667,47.3666666666667,Actual,1.4,347,3956971
      Kentucky,21,2020-6-6,67,-7,48.2766666666667,Actual,4.4,470,4467673
      New York,36,2020-6-7,70,-34,31.2866666666667,Actual,59,31068,26161672
      New Jersey,34,2020-6-7,66,-32.3333333333333,30.67,Actual,68.6,14016,8882190
      California,6,2020-6-7,67,-29.3333333333333,36.35,Actual,60.2,4632,39512223
      Texas,48,2020-6-7,76,-19.3333333333333,49.7633333333333,Actual,20,1966,28995881
      Massachusetts,25,2020-6-7,61,-32.3333333333333,30.1433333333333,Actual,41.4,7315,6892503
      Florida,12,2020-6-7,75,-32.3333333333333,42.7633333333333,Actual,31.6,2700,21477737
      Illinois,17,2020-6-7,61,-21,36.3233333333333,Actual,56.4,5904,12671821
      Pennsylvania,42,2020-6-7,61,-19,35.9833333333333,Actual,36.4,5943,12801989
      Michigan,26,2020-6-7,63,-14.6666666666667,37.3366666666667,Actual,22.8,5855,9986857
      Connecticut,9,2020-6-7,76,-17.3333333333333,44.61,Actual,18,4071,3565287
      Louisiana,22,2020-6-7,80,-34,53.37,Actual,14.8,2936,4648794
      Georgia,13,2020-6-7,81,-24.3333333333333,51.7966666666666,Actual,27.2,2180,10617423
      Arizona,4,2020-6-7,73,-20.6666666666667,47.7866666666667,Actual,15.4,1051,7278717
      Ohio,39,2020-6-7,59,-6.33333333333333,43.21,Actual,16.6,2379,11689100
      Maryland,24,2020-6-7,55,-21.3333333333333,32.2966666666667,Actual,28.6,2749,6045680
      Indiana,18,2020-6-7,60,-3.33333333333333,46.0533333333333,Actual,21.6,2303,6732219
      Virginia,51,2020-6-7,70,-20.6666666666667,42.5233333333333,Actual,10.2,1472,8535519
      North Carolina,37,2020-6-7,68,-18,45.1433333333333,Actual,12.4,1032,10488084
      South Carolina,45,2020-6-7,70,-0.666666666666667,53.23,Actual,8.6,546,5148714
      Mississippi,28,2020-6-7,72,-14.3333333333333,57.0633333333333,Actual,10.6,817,2976149
      Colorado,8,2020-6-7,76,-19.6666666666667,44.6466666666667,Actual,8.2,1527,5758736
      Alabama,1,2020-6-7,70,-13,53.7633333333333,Actual,15.2,692,4903185
      Minnesota,27,2020-6-7,54,-23.3333333333333,32.9933333333333,Actual,20.4,1197,5639632
      Washington,53,2020-6-7,82,-24,46.86,Actual,7.6,1157,7614893
      Missouri,29,2020-6-7,54,-8,41.5266666666667,Actual,5.6,823,6137428
      Tennessee,47,2020-6-7,55,-11.3333333333333,42.5766666666667,Actual,6.8,418,6829174
      Rhode Island,44,2020-6-7,51,-18.3333333333333,30.9766666666667,Actual,10.4,772,1059361
      Wisconsin,55,2020-6-7,72,-2.33333333333333,49.9433333333334,Actual,7,647,5822434
      Nevada,32,2020-6-7,55,-27.6666666666667,32.1933333333333,Actual,3.2,438,3080156
      Iowa,19,2020-6-7,64,-2.33333333333333,49.1433333333333,Actual,8.6,605,3155070
      Oklahoma,40,2020-6-7,58,-2,48.3466666666667,Actual,2,348,3956971
      Kentucky,21,2020-6-7,68,-8.66666666666667,49.19,Actual,3.8,470,4467673
      New York,36,2020-6-8,71,-44.6666666666667,31.84,Actual,62.6,31123,26161672
      New Jersey,34,2020-6-8,67,-42.6666666666667,31.2433333333333,Actual,67.4,14055,8882190
      California,6,2020-6-8,68,-37.6666666666667,36.9733333333333,Actual,65,4657,39512223
      Texas,48,2020-6-8,77,-25.6666666666667,50.5066666666667,Actual,20.2,1980,28995881
      Massachusetts,25,2020-6-8,62,-40.6666666666667,30.7366666666667,Actual,43.8,7352,6892503
      Florida,12,2020-6-8,76,-32,43.4433333333333,Actual,28.2,2712,21477737
      Illinois,17,2020-6-8,62,-31,37.0133333333333,Actual,60,5924,12671821
      Pennsylvania,42,2020-6-8,62,-28.6666666666667,36.6966666666667,Actual,32.8,5953,12801989
      Michigan,26,2020-6-8,64,-22.6666666666667,38.11,Actual,8.6,5870,9986857
      Connecticut,9,2020-6-8,77,-25.6666666666667,45.3533333333333,Actual,16.4,4084,3565287
      Louisiana,22,2020-6-8,81,-30,54.07,Actual,11.2,2944,4648794
      Georgia,13,2020-6-8,82,-28.6666666666667,52.51,Actual,31,2208,10617423
      Arizona,4,2020-6-8,74,-26,48.5266666666667,Actual,17.2,1053,7278717
      Ohio,39,2020-6-8,60,-14,44.07,Actual,20.4,2406,11689100
      Maryland,24,2020-6-8,56,-33.6666666666667,32.96,Actual,28.4,2776,6045680
      Indiana,18,2020-6-8,61,-10,46.9533333333333,Actual,19.4,2316,6732219
      Virginia,51,2020-6-8,71,-29.6666666666667,43.2266666666667,Actual,12,1477,8535519
      North Carolina,37,2020-6-8,69,-22,45.9233333333333,Actual,15,1041,10488084
      South Carolina,45,2020-6-8,71,-9.33333333333333,54.1366666666667,Actual,7.2,557,5148714
      Mississippi,28,2020-6-8,73,-16,57.9033333333333,Actual,13,837,2976149
      Colorado,8,2020-6-8,77,-26.6666666666667,45.38,Actual,9.6,1543,5758736
      Alabama,1,2020-6-8,71,-16,54.6033333333333,Actual,13.6,718,4903185
      Minnesota,27,2020-6-8,55,-31.3333333333333,33.68,Actual,21.6,1208,5639632
      Washington,53,2020-6-8,83,-34.3333333333333,47.5166666666666,Actual,5.4,1161,7614893
      Missouri,29,2020-6-8,55,-17.6666666666667,42.35,Actual,4.8,827,6137428
      Tennessee,47,2020-6-8,56,-16.3333333333333,43.4133333333333,Actual,5.8,421,6829174
      Rhode Island,44,2020-6-8,52,-26.3333333333333,31.7133333333333,Actual,8,799,1059361
      Wisconsin,55,2020-6-8,73,-14.3333333333333,50.8,Actual,7.6,646,5822434
      Nevada,32,2020-6-8,56,-28,32.9133333333333,Actual,2.6,442,3080156
      Iowa,19,2020-6-8,65,-10.6666666666667,50.0366666666667,Actual,7.6,617,3155070
      Oklahoma,40,2020-6-8,59,-9,49.2566666666667,Actual,2.2,348,3956971
      Kentucky,21,2020-6-8,69,-15.6666666666667,50.0333333333333,Actual,3.6,472,4467673
      New York,36,2020-6-9,72,-44.3333333333333,32.3966666666667,Actual,59,31158,26161672
      New Jersey,34,2020-6-9,68,-42.3333333333333,31.82,Actual,69.2,14148,8882190
      California,6,2020-6-9,69,-37.6666666666667,37.5966666666667,Actual,65.4,4745,39512223
      Texas,48,2020-6-9,78,-25.3333333333333,51.2533333333333,Actual,22.2,2000,28995881
      Massachusetts,25,2020-6-9,63,-42.3333333333333,31.3133333333333,Actual,40.6,7407,6892503
      Florida,12,2020-6-9,77,-31,44.1333333333333,Actual,32,2765,21477737
      Illinois,17,2020-6-9,63,-34,37.6733333333333,Actual,64.2,6018,12671821
      Pennsylvania,42,2020-6-9,63,-28.3333333333333,37.4133333333333,Actual,36.4,6014,12801989
      Michigan,26,2020-6-9,65,-24.6666666666667,38.8633333333333,Actual,13.2,5879,9986857
      Connecticut,9,2020-6-9,78,-25.6666666666667,46.0966666666667,Actual,18.2,4097,3565287
      Louisiana,22,2020-6-9,82,-18.6666666666667,54.8833333333333,Actual,12.4,2957,4648794
      Georgia,13,2020-6-9,83,-27.6666666666667,53.2333333333333,Actual,39.4,2285,10617423
      Arizona,4,2020-6-9,75,-26,49.2666666666667,Actual,18.4,1076,7278717
      Ohio,39,2020-6-9,61,-14.3333333333333,44.9266666666667,Actual,24,2423,11689100
      Maryland,24,2020-6-9,57,-33,33.63,Actual,27,2811,6045680
      Indiana,18,2020-6-9,62,-12.6666666666667,47.8266666666667,Actual,17.6,2339,6732219
      Virginia,51,2020-6-9,72,-29,43.9366666666667,Actual,11.8,1496,8535519
      North Carolina,37,2020-6-9,70,-21.6666666666667,46.7066666666667,Actual,15.6,1068,10488084
      South Carolina,45,2020-6-9,72,-7.66666666666667,55.06,Actual,8.6,568,5148714
      Mississippi,28,2020-6-9,74,-7.66666666666667,58.8266666666667,Actual,11.4,847,2976149
      Colorado,8,2020-6-9,78,-31,46.07,Actual,11,1553,5758736
      Alabama,1,2020-6-9,72,-14,55.4633333333333,Actual,13.2,729,4903185
      Minnesota,27,2020-6-9,56,-33.6666666666667,34.3433333333333,Actual,19.8,1228,5639632
      Washington,53,2020-6-9,84,-36,48.1566666666666,Actual,8.2,1176,7614893
      Missouri,29,2020-6-9,56,-19.3333333333333,43.1566666666667,Actual,3.2,834,6137428
      Tennessee,47,2020-6-9,57,-16,44.2533333333333,Actual,4.8,435,6829174
      Rhode Island,44,2020-6-9,53,-26.3333333333333,32.45,Actual,10.2,808,1059361
      Wisconsin,55,2020-6-9,74,-19.3333333333333,51.6066666666667,Actual,7.4,661,5822434
      Nevada,32,2020-6-9,57,-26.6666666666667,33.6466666666667,Actual,4.4,446,3080156
      Iowa,19,2020-6-9,66,-17.3333333333333,50.8633333333333,Actual,8.2,626,3155070
      Oklahoma,40,2020-6-9,60,-9.66666666666667,50.16,Actual,2.2,354,3956971
      Kentucky,21,2020-6-9,70,-16.6666666666667,50.8666666666667,Actual,4.6,477,4467673
      New York,36,2020-6-10,73,-43.6666666666667,32.96,Actual,71,31238,26161672
      New Jersey,34,2020-6-10,69,-42.3333333333333,32.3966666666667,Actual,65,14224,8882190
      California,6,2020-6-10,70,-37.6666666666667,38.22,Actual,69.2,4854,39512223
      Texas,48,2020-6-10,79,-23,52.0233333333333,Actual,26.8,2037,28995881
      Massachusetts,25,2020-6-10,64,-41.3333333333333,31.9,Actual,44.4,7453,6892503
      Florida,12,2020-6-10,78,-31.3333333333333,44.82,Actual,35.4,2801,21477737
      Illinois,17,2020-6-10,64,-31.3333333333333,38.36,Actual,71.2,6095,12671821
      Pennsylvania,42,2020-6-10,64,-29.3333333333333,38.12,Actual,43.8,6062,12801989
      Michigan,26,2020-6-10,66,-27,39.5933333333333,Actual,12,5880,9986857
      Connecticut,9,2020-6-10,79,-25.6666666666667,46.84,Actual,17.6,4120,3565287
      Louisiana,22,2020-6-10,83,-18,55.7033333333333,Actual,12,2968,4648794
      Georgia,13,2020-6-10,84,-28,53.9533333333333,Actual,47.6000000000001,2329,10617423
      Arizona,4,2020-6-10,76,-27.3333333333333,49.9933333333333,Actual,21,1101,7278717
      Ohio,39,2020-6-10,62,-16,45.7666666666667,Actual,26.2,2459,11689100
      Maryland,24,2020-6-10,58,-34.3333333333333,34.2866666666667,Actual,30.2,2844,6045680
      Indiana,18,2020-6-10,63,-11.6666666666667,48.71,Actual,18.6,2355,6732219
      Virginia,51,2020-6-10,73,-29.3333333333333,44.6433333333333,Actual,12.4,1514,8535519
      North Carolina,37,2020-6-10,71,-22.6666666666667,47.48,Actual,17.8,1090,10488084
      South Carolina,45,2020-6-10,73,-10.3333333333333,55.9566666666667,Actual,9.4,575,5148714
      Mississippi,28,2020-6-10,75,-5,59.7766666666667,Actual,12.8,868,2976149
      Colorado,8,2020-6-10,79,-27.3333333333333,46.7966666666667,Actual,11,1572,5758736
      Alabama,1,2020-6-10,73,-10,56.3633333333333,Actual,15.4,744,4903185
      Minnesota,27,2020-6-10,57,-28.3333333333333,35.06,Actual,21.6,1267,5639632
      Washington,53,2020-6-10,85,-32.6666666666667,48.83,Actual,9.4,1176,7614893
      Missouri,29,2020-6-10,57,-11.6666666666667,44.04,Actual,6,837,6137428
      Tennessee,47,2020-6-10,58,-14.3333333333333,45.11,Actual,9.6,437,6829174
      Rhode Island,44,2020-6-10,54,-27,33.18,Actual,12.2,812,1059361
      Wisconsin,55,2020-6-10,75,-17.3333333333333,52.4333333333334,Actual,8.4,671,5822434
      Nevada,32,2020-6-10,58,-27.6666666666667,34.37,Actual,4.6,449,3080156
      Iowa,19,2020-6-10,67,-11,51.7533333333333,Actual,7.8,631,3155070
      Oklahoma,40,2020-6-10,61,-4.33333333333333,51.1166666666667,Actual,2.4,356,3956971
      Kentucky,21,2020-6-10,71,-15,51.7166666666667,Actual,5.4,484,4467673
      New York,36,2020-6-11,74,-46,33.5,Actual,63.6,31269,26161672
      New Jersey,34,2020-6-11,70,-45,32.9466666666667,Actual,84.2,14291,8882190
      California,6,2020-6-11,71,-37.3333333333333,38.8466666666667,Actual,83.8,4934,39512223
      Texas,48,2020-6-11,80,-24,52.7833333333333,Actual,29,2068,28995881
      Massachusetts,25,2020-6-11,65,-44.3333333333333,32.4566666666667,Actual,44.6,7491,6892503
      Florida,12,2020-6-11,79,-30.6666666666667,45.5133333333333,Actual,42.6,2848,21477737
      Illinois,17,2020-6-11,65,-28.6666666666667,39.0733333333333,Actual,73,6185,12671821
      Pennsylvania,42,2020-6-11,65,-29.6666666666667,38.8233333333333,Actual,51.6,6113,12801989
      Michigan,26,2020-6-11,67,-20.6666666666667,40.3866666666667,Actual,14,5910,9986857
      Connecticut,9,2020-6-11,80,-30.6666666666667,47.5333333333333,Actual,20.4,4146,3565287
      Louisiana,22,2020-6-11,84,-17,56.5333333333333,Actual,12,2987,4648794
      Georgia,13,2020-6-11,85,-26.3333333333333,54.69,Actual,47.8,2375,10617423
      Arizona,4,2020-6-11,77,-28,50.7133333333333,Actual,27.2,1135,7278717
      Ohio,39,2020-6-11,63,-12.6666666666667,46.64,Actual,30,2492,11689100
      Maryland,24,2020-6-11,59,-36,34.9266666666667,Actual,30,2875,6045680
      Indiana,18,2020-6-11,64,-8.66666666666667,49.6233333333333,Actual,19.4,2380,6732219
      Virginia,51,2020-6-11,74,-30.6666666666667,45.3366666666667,Actual,12.8,1520,8535519
      North Carolina,37,2020-6-11,72,-23.6666666666667,48.2433333333333,Actual,17.2,1106,10488084
      South Carolina,45,2020-6-11,74,-10.3333333333333,56.8533333333333,Actual,8.4,588,5148714
      Mississippi,28,2020-6-11,76,-6.66666666666667,60.71,Actual,10.4,868,2976149
      Colorado,8,2020-6-11,80,-27.6666666666667,47.52,Actual,10.8,1582,5758736
      Alabama,1,2020-6-11,74,-9,57.2733333333333,Actual,11,755,4903185
      Minnesota,27,2020-6-11,58,-28.6666666666667,35.7733333333333,Actual,21.2,1280,5639632
      Washington,53,2020-6-11,86,-34,49.49,Actual,10.4,1194,7614893
      Missouri,29,2020-6-11,58,-15,44.89,Actual,6.2,837,6137428
      Tennessee,47,2020-6-11,59,-13.3333333333333,45.9766666666667,Actual,10.2,441,6829174
      Rhode Island,44,2020-6-11,55,-32,33.86,Actual,6.8,823,1059361
      Wisconsin,55,2020-6-11,76,-13,53.3033333333334,Actual,9,682,5822434
      Nevada,32,2020-6-11,59,-30,35.07,Actual,4,459,3080156
      Iowa,19,2020-6-11,68,-11,52.6433333333333,Actual,6.6,640,3155070
      Oklahoma,40,2020-6-11,62,-6.66666666666667,52.05,Actual,2.2,358,3956971
      Kentucky,21,2020-6-11,72,-14.3333333333333,52.5733333333333,Actual,5.4,493,4467673
      New York,36,2020-6-12,75,-43.3333333333333,34.0666666666667,Actual,62,31423,26161672
      New Jersey,34,2020-6-12,71,-41,33.5366666666667,Actual,73.4,14341,8882190
      California,6,2020-6-12,72,-36.6666666666667,39.48,Actual,70.8,4978,39512223
      Texas,48,2020-6-12,81,-24.3333333333333,53.54,Actual,29.4,2100,28995881
      Massachusetts,25,2020-6-12,66,-39.3333333333333,33.0633333333333,Actual,43.2,7537,6892503
      Florida,12,2020-6-12,80,-30.3333333333333,46.21,Actual,33.2,2877,21477737
      Illinois,17,2020-6-12,66,-28.6666666666667,39.7866666666667,Actual,58,6260,12671821
      Pennsylvania,42,2020-6-12,66,-29,39.5333333333333,Actual,40.2,6162,12801989
      Michigan,26,2020-6-12,68,-23.6666666666667,41.15,Actual,12.8,5915,9986857
      Connecticut,9,2020-6-12,81,-25.6666666666667,48.2766666666667,Actual,20.8,4159,3565287
      Louisiana,22,2020-6-12,85,-20.3333333333333,57.33,Actual,11.4,2996,4648794
      Georgia,13,2020-6-12,86,-27.3333333333333,55.4166666666666,Actual,33.2,2418,10617423
      Arizona,4,2020-6-12,78,-28.3333333333333,51.43,Actual,23,1156,7278717
      Ohio,39,2020-6-12,64,-13.6666666666667,47.5033333333333,Actual,27.2,2510,11689100
      Maryland,24,2020-6-12,60,-32.3333333333333,35.6033333333333,Actual,25.6,2900,6045680
      Indiana,18,2020-6-12,65,-10.3333333333333,50.52,Actual,16.6,2396,6732219
      Virginia,51,2020-6-12,75,-28.6666666666667,46.05,Actual,10,1534,8535519
      North Carolina,37,2020-6-12,73,-22,49.0233333333333,Actual,12.8,1121,10488084
      South Carolina,45,2020-6-12,75,-10.3333333333333,57.75,Actual,6.4,593,5148714
      Mississippi,28,2020-6-12,77,-9.33333333333333,61.6166666666667,Actual,8.8,881,2976149
      Colorado,8,2020-6-12,81,-28.3333333333333,48.2366666666667,Actual,9,1582,5758736
      Alabama,1,2020-6-12,75,-11,58.1633333333333,Actual,8.8,769,4903185
      Minnesota,27,2020-6-12,59,-29,36.4833333333333,Actual,20.2,1305,5639632
      Washington,53,2020-6-12,87,-35,50.14,Actual,8.2,1204,7614893
      Missouri,29,2020-6-12,59,-9.33333333333333,45.7966666666667,Actual,5.2,853,6137428
      Tennessee,47,2020-6-12,60,-14.6666666666667,46.83,Actual,7.8,466,6829174
      Rhode Island,44,2020-6-12,56,-27,34.59,Actual,5,833,1059361
      Wisconsin,55,2020-6-12,77,-13.3333333333333,54.17,Actual,6.2,689,5822434
      Nevada,32,2020-6-12,60,-31,35.76,Actual,3.4,461,3080156
      Iowa,19,2020-6-12,69,-8.66666666666667,53.5566666666667,Actual,5.2,644,3155070
      Oklahoma,40,2020-6-12,63,-9,52.96,Actual,1,360,3956971
      Kentucky,21,2020-6-12,73,-15,53.4233333333333,Actual,4.4,497,4467673
      New York,36,2020-6-13,76,-31,34.7566666666667,Actual,52,31441,26161672
      New Jersey,34,2020-6-13,72,-27.3333333333333,34.2633333333333,Actual,68.2,14476,8882190
      California,6,2020-6-13,73,-26.6666666666667,40.2133333333333,Actual,52,5076,39512223
      Texas,48,2020-6-13,82,-16,54.38,Actual,25.2,2125,28995881
      Massachusetts,25,2020-6-13,67,-25.3333333333333,33.81,Actual,38.6,7575,6892503
      Florida,12,2020-6-13,81,-25.6666666666667,46.9533333333333,Actual,27.4,2925,21477737
      Illinois,17,2020-6-13,67,-14.3333333333333,40.6433333333333,Actual,46.2,6289,12671821
      Pennsylvania,42,2020-6-13,67,-16.3333333333333,40.37,Actual,36.2,6211,12801989
      Michigan,26,2020-6-13,69,-8.66666666666667,42.0633333333333,Actual,13,5940,9986857
      Connecticut,9,2020-6-13,82,-12.6666666666667,49.15,Actual,16.8,4186,3565287
      Louisiana,22,2020-6-13,86,-14.3333333333333,58.1866666666667,Actual,10,3004,4648794
      Georgia,13,2020-6-13,87,-16.3333333333333,56.2533333333333,Actual,33,2447,10617423
      Arizona,4,2020-6-13,79,-20.3333333333333,52.2266666666667,Actual,20.4,1189,7278717
      Ohio,39,2020-6-13,65,-4.66666666666667,48.4566666666667,Actual,23.2,2556,11689100
      Maryland,24,2020-6-13,61,-16.6666666666667,36.4366666666667,Actual,20.6,2926,6045680
      Indiana,18,2020-6-13,66,1.33333333333333,51.5333333333333,Actual,15.6,2413,6732219
      Virginia,51,2020-6-13,76,-14.6666666666667,46.9033333333333,Actual,7.6,1541,8535519
      North Carolina,37,2020-6-13,74,-11.6666666666667,49.9066666666667,Actual,10,1127,10488084
      South Carolina,45,2020-6-13,76,0,58.75,Actual,5.4,599,5148714
      Mississippi,28,2020-6-13,78,-1,62.6066666666667,Actual,5.4,889,2976149
      Colorado,8,2020-6-13,82,-20,49.0366666666667,Actual,6.6,1597,5758736
      Alabama,1,2020-6-13,76,1,59.1733333333333,Actual,6,773,4903185
      Minnesota,27,2020-6-13,60,-17.6666666666667,37.3066666666667,Actual,13.6,1314,5639632
      Washington,53,2020-6-13,88,-23.3333333333333,50.9066666666666,Actual,8.8,1213,7614893
      Missouri,29,2020-6-13,60,-6.33333333333333,46.7333333333333,Actual,5,858,6137428
      Tennessee,47,2020-6-13,61,-4,47.79,Actual,9,472,6829174
      Rhode Island,44,2020-6-13,57,-15,35.44,Actual,7.8,833,1059361
      Wisconsin,55,2020-6-13,78,0,55.17,Actual,4.6,691,5822434
      Nevada,32,2020-6-13,61,-26.3333333333333,36.4966666666667,Actual,3.2,462,3080156
      Iowa,19,2020-6-13,70,0.666666666666667,54.5633333333333,Actual,5.4,650,3155070
      Oklahoma,40,2020-6-13,64,-1.33333333333333,53.9466666666667,Actual,0.6,359,3956971
      Kentucky,21,2020-6-13,74,-3.33333333333333,54.39,Actual,4.2,499,4467673
      New York,36,2020-6-14,77,-31.3333333333333,35.4433333333333,Actual,56.8,31468,26161672
      New Jersey,34,2020-6-14,73,-29.6666666666667,34.9666666666667,Actual,72,14515,8882190
      California,6,2020-6-14,74,-26.3333333333333,40.95,Actual,53.2,5099,39512223
      Texas,48,2020-6-14,83,-17.3333333333333,55.2066666666667,Actual,29,2147,28995881
      Massachusetts,25,2020-6-14,68,-25,34.56,Actual,34.6,7623,6892503
      Florida,12,2020-6-14,82,-27,47.6833333333333,Actual,29,2931,21477737
      Illinois,17,2020-6-14,68,-16.6666666666667,41.4766666666667,Actual,42.6,6308,12671821
      Pennsylvania,42,2020-6-14,68,-16,41.21,Actual,32.6,6215,12801989
      Michigan,26,2020-6-14,70,-7.66666666666667,42.9866666666667,Actual,10.2,5943,9986857
      Connecticut,9,2020-6-14,83,-12.6666666666667,50.0233333333333,Actual,12.8,4201,3565287
      Louisiana,22,2020-6-14,87,-16,59.0266666666667,Actual,11,3014,4648794
      Georgia,13,2020-6-14,88,-22.3333333333333,57.03,Actual,30.8,2451,10617423
      Arizona,4,2020-6-14,80,-20,53.0266666666667,Actual,18.6,1191,7278717
      Ohio,39,2020-6-14,66,-4.33333333333333,49.4133333333333,Actual,21.4,2559,11689100
      Maryland,24,2020-6-14,62,-20,37.2366666666667,Actual,21.4,2939,6045680
      Indiana,18,2020-6-14,67,0.333333333333333,52.5366666666667,Actual,13.4,2422,6732219
      Virginia,51,2020-6-14,77,-18.3333333333333,47.72,Actual,10,1546,8535519
      North Carolina,37,2020-6-14,75,-16.6666666666667,50.74,Actual,12.6,1132,10488084
      South Carolina,45,2020-6-14,77,-1.66666666666667,59.7333333333333,Actual,3.8,600,5148714
      Mississippi,28,2020-6-14,79,-2.66666666666667,63.58,Actual,9.4,891,2976149
      Colorado,8,2020-6-14,83,-17.6666666666667,49.86,Actual,7,1598,5758736
      Alabama,1,2020-6-14,77,-4,60.1333333333333,Actual,6,773,4903185
      Minnesota,27,2020-6-14,61,-18,38.1266666666667,Actual,12.8,1329,5639632
      Washington,53,2020-6-14,89,-19,51.7166666666666,Actual,7.4,1217,7614893
      Missouri,29,2020-6-14,61,-4.33333333333333,47.69,Actual,5.8,860,6137428
      Tennessee,47,2020-6-14,62,-9,48.7,Actual,10.4,474,6829174
      Rhode Island,44,2020-6-14,58,-9.66666666666667,36.3433333333333,Actual,8.4,833,1059361
      Wisconsin,55,2020-6-14,79,0.666666666666667,56.1766666666667,Actual,4.2,692,5822434
      Nevada,32,2020-6-14,62,-26.3333333333333,37.2333333333333,Actual,1.6,463,3080156
      Iowa,19,2020-6-14,71,0.666666666666667,55.57,Actual,5,652,3155070
      Oklahoma,40,2020-6-14,65,-0.333333333333333,54.9433333333333,Actual,1,359,3956971
      Kentucky,21,2020-6-14,75,-7.33333333333333,55.3166666666667,Actual,2.4,499,4467673
      New York,36,2020-6-15,78,-42.3333333333333,36.02,Actual,31.2,31498,26161672
      New Jersey,34,2020-6-15,74,-38.6666666666667,35.58,Actual,70.6,14565,8882190
      California,6,2020-6-15,75,-35.6666666666667,41.5933333333333,Actual,58.6,5114,39512223
      Texas,48,2020-6-15,84,-24.6666666666667,55.96,Actual,30.8,2163,28995881
      Massachusetts,25,2020-6-15,69,-38.3333333333333,35.1766666666667,Actual,39.2,7646,6892503
      Florida,12,2020-6-15,83,-30,48.3833333333333,Actual,28.2,2938,21477737
      Illinois,17,2020-6-15,69,-29,42.1866666666667,Actual,45,6326,12671821
      Pennsylvania,42,2020-6-15,69,-27.3333333333333,41.9366666666667,Actual,31.4,6243,12801989
      Michigan,26,2020-6-15,71,-19,43.7966666666667,Actual,9.6,5945,9986857
      Connecticut,9,2020-6-15,84,-23.3333333333333,50.79,Actual,12,4204,3565287
      Louisiana,22,2020-6-15,88,-18,59.8466666666667,Actual,13.2,3018,4648794
      Georgia,13,2020-6-15,89,-27,57.76,Actual,31.4,2494,10617423
      Arizona,4,2020-6-15,81,-27.6666666666667,53.75,Actual,18.6,1203,7278717
      Ohio,39,2020-6-15,67,-13.3333333333333,50.28,Actual,20.2,2575,11689100
      Maryland,24,2020-6-15,63,-32,37.9166666666667,Actual,19.2,2947,6045680
      Indiana,18,2020-6-15,68,-7.66666666666667,53.46,Actual,15.8,2433,6732219
      Virginia,51,2020-6-15,78,-30.3333333333333,48.4166666666667,Actual,9.8,1552,8535519
      North Carolina,37,2020-6-15,76,-25.3333333333333,51.4866666666667,Actual,12,1140,10488084
      South Carolina,45,2020-6-15,78,-10,60.6333333333333,Actual,4.8,602,5148714
      Mississippi,28,2020-6-15,80,-5.66666666666667,64.5233333333333,Actual,11.4,895,2976149
      Colorado,8,2020-6-15,84,-25.3333333333333,50.6066666666667,Actual,9.8,1605,5758736
      Alabama,1,2020-6-15,78,-9.66666666666667,61.0366666666666,Actual,4.2,774,4903185
      Minnesota,27,2020-6-15,62,-28.3333333333333,38.8433333333333,Actual,10.4,1335,5639632
      Washington,53,2020-6-15,90,-33.6666666666667,52.38,Actual,4.4,1220,7614893
      Missouri,29,2020-6-15,62,-15.3333333333333,48.5366666666667,Actual,6.2,862,6137428
      Tennessee,47,2020-6-15,63,-13.3333333333333,49.5666666666667,Actual,6.4,482,6829174
      Rhode Island,44,2020-6-15,59,-25.3333333333333,37.09,Actual,8.6,851,1059361
      Wisconsin,55,2020-6-15,80,-13,57.0466666666667,Actual,4.8,694,5822434
      Nevada,32,2020-6-15,63,-28.3333333333333,37.95,Actual,2.4,465,3080156
      Iowa,19,2020-6-15,72,-9.66666666666667,56.4733333333333,Actual,6.2,658,3155070
      Oklahoma,40,2020-6-15,66,-8.33333333333333,55.86,Actual,0.8,359,3956971
      Kentucky,21,2020-6-15,76,-14,56.1766666666667,Actual,4.2,505,4467673
      New York,36,2020-6-16,79,-41.3333333333333,36.6066666666667,Actual,32.4,31553,26161672
      New Jersey,34,2020-6-16,75,-38.6666666666667,36.1933333333333,Actual,50.6,14651,8882190
      California,6,2020-6-16,76,-35.6666666666667,42.2366666666667,Actual,55.8,5200,39512223
      Texas,48,2020-6-16,85,-24.3333333333333,56.7166666666667,Actual,34.8,2213,28995881
      Massachusetts,25,2020-6-16,70,-38.3333333333333,35.7933333333333,Actual,38.8,7664,6892503
      Florida,12,2020-6-16,84,-29.3333333333333,49.09,Actual,27.2,2993,21477737
      Illinois,17,2020-6-16,70,-27.6666666666667,42.91,Actual,49.6,6398,12671821
      Pennsylvania,42,2020-6-16,70,-25.6666666666667,42.68,Actual,30,6276,12801989
      Michigan,26,2020-6-16,72,-18.6666666666667,44.61,Actual,9.6,5961,9986857
      Connecticut,9,2020-6-16,85,-23,51.56,Actual,8,4210,3565287
      Louisiana,22,2020-6-16,89,-16.3333333333333,60.6833333333333,Actual,11.6,3042,4648794
      Georgia,13,2020-6-16,90,-26.3333333333333,58.4966666666666,Actual,31.6,2529,10617423
      Arizona,4,2020-6-16,82,-27,54.48,Actual,18.8,1228,7278717
      Ohio,39,2020-6-16,68,-11.6666666666667,51.1633333333333,Actual,15.4,2599,11689100
      Maryland,24,2020-6-16,64,-30.6666666666667,38.61,Actual,18,2982,6045680
      Indiana,18,2020-6-16,69,-8,54.38,Actual,15.6,2447,6732219
      Virginia,51,2020-6-16,79,-30.3333333333333,49.1133333333333,Actual,9,1570,8535519
      North Carolina,37,2020-6-16,77,-27,52.2166666666667,Actual,12.2,1169,10488084
      South Carolina,45,2020-6-16,79,-11,61.5233333333333,Actual,4.4,607,5148714
      Mississippi,28,2020-6-16,81,-5.33333333333333,65.47,Actual,9.8,915,2976149
      Colorado,8,2020-6-16,85,-26.3333333333333,51.3433333333333,Actual,8.2,1617,5758736
      Alabama,1,2020-6-16,79,-9.66666666666667,61.94,Actual,7.4,785,4903185
      Minnesota,27,2020-6-16,63,-26.6666666666667,39.5766666666667,Actual,12.4,1344,5639632
      Washington,53,2020-6-16,91,-31.3333333333333,53.0666666666666,Actual,6.4,1231,7614893
      Missouri,29,2020-6-16,63,-15.6666666666667,49.38,Actual,12.4,866,6137428
      Tennessee,47,2020-6-16,64,-12.6666666666667,50.44,Actual,7.2,493,6829174
      Rhode Island,44,2020-6-16,60,-22.6666666666667,37.8633333333333,Actual,10.4,865,1059361
      Wisconsin,55,2020-6-16,81,-13,57.9166666666667,Actual,5.6,703,5822434
      Nevada,32,2020-6-16,64,-27,38.68,Actual,2.6,467,3080156
      Iowa,19,2020-6-16,73,-10.6666666666667,57.3666666666667,Actual,6,665,3155070
      Oklahoma,40,2020-6-16,67,-8.66666666666667,56.7733333333333,Actual,1.4,363,3956971
      Kentucky,21,2020-6-16,77,-14,57.0366666666667,Actual,4.2,505,4467673
      New York,36,2020-6-17,80,-41.3333333333333,37.1933333333333,Actual,31.2,31579,26161672
      New Jersey,34,2020-6-17,76,-38.6666666666667,36.8066666666667,Actual,49.4,14694,8882190
      California,6,2020-6-17,77,-36,42.8766666666667,Actual,65.4,5271,39512223
      Texas,48,2020-6-17,86,-23.3333333333333,57.4833333333333,Actual,36.2,2254,28995881
      Massachusetts,25,2020-6-17,71,-37.3333333333333,36.42,Actual,35.2,7733,6892503
      Florida,12,2020-6-17,85,-30.3333333333333,49.7866666666667,Actual,34.6,3018,21477737
      Illinois,17,2020-6-17,71,-27.6666666666667,43.6333333333333,Actual,54.4,6485,12671821
      Pennsylvania,42,2020-6-17,71,-26.6666666666667,43.4133333333333,Actual,36.8,6319,12801989
      Michigan,26,2020-6-17,73,-17,45.44,Actual,10.2,5963,9986857
      Connecticut,9,2020-6-17,86,-22.6666666666667,52.3333333333333,Actual,7.4,4219,3565287
      Louisiana,22,2020-6-17,90,-15.3333333333333,61.53,Actual,14,3062,4648794
      Georgia,13,2020-6-17,91,-25,59.2466666666666,Actual,37,2575,10617423
      Arizona,4,2020-6-17,83,-27.3333333333333,55.2066666666667,Actual,26,1249,7278717
      Ohio,39,2020-6-17,69,-11.6666666666667,52.0466666666667,Actual,21.6,2611,11689100
      Maryland,24,2020-6-17,65,-34.6666666666667,39.2633333333333,Actual,18.2,2996,6045680
      Indiana,18,2020-6-17,70,-7.66666666666667,55.3033333333333,Actual,18.8,2475,6732219
      Virginia,51,2020-6-17,80,-30.6666666666667,49.8066666666667,Actual,11.2,1583,8535519
      North Carolina,37,2020-6-17,78,-23.6666666666667,52.98,Actual,14,1181,10488084
      South Carolina,45,2020-6-17,80,-10,62.4233333333333,Actual,7.8,617,5148714
      Mississippi,28,2020-6-17,82,-3.33333333333333,66.4366666666667,Actual,9.4,938,2976149
      Colorado,8,2020-6-17,86,-26.3333333333333,52.08,Actual,9,1631,5758736
      Alabama,1,2020-6-17,80,-8.66666666666667,62.8533333333333,Actual,9.8,790,4903185
      Minnesota,27,2020-6-17,64,-26.3333333333333,40.3133333333333,Actual,12.8,1357,5639632
      Washington,53,2020-6-17,92,-30.6666666666667,53.76,Actual,7.6,1226,7614893
      Missouri,29,2020-6-17,64,-10,50.28,Actual,14.6,884,6137428
      Tennessee,47,2020-6-17,65,-13.3333333333333,51.3066666666667,Actual,8.2,498,6829174
      Rhode Island,44,2020-6-17,61,-24.6666666666667,38.6166666666667,Actual,12.2,876,1059361
      Wisconsin,55,2020-6-17,82,-12,58.7966666666667,Actual,7.6,713,5822434
      Nevada,32,2020-6-17,65,-27,39.41,Actual,3.2,473,3080156
      Iowa,19,2020-6-17,74,-8.33333333333333,58.2833333333333,Actual,5.8,675,3155070
      Oklahoma,40,2020-6-17,68,-5.33333333333333,57.72,Actual,1.6,364,3956971
      Kentucky,21,2020-6-17,78,-13.6666666666667,57.9,Actual,4.6,518,4467673
      New York,36,2020-6-18,81,-41.3333333333333,37.78,Actual,41,31603,26161672
      New Jersey,34,2020-6-18,77,-39.6666666666667,37.41,Actual,44,14729,8882190
      California,6,2020-6-18,78,-36,43.5166666666667,Actual,76,5355,39512223
      Texas,48,2020-6-18,87,-24.3333333333333,58.24,Actual,38.4,2299,28995881
      Massachusetts,25,2020-6-18,72,-37.6666666666667,37.0433333333333,Actual,36.2,7769,6892503
      Florida,12,2020-6-18,86,-30.3333333333333,50.4833333333333,Actual,41.2,3061,21477737
      Illinois,17,2020-6-18,72,-27.6666666666667,44.3566666666667,Actual,59.8,6537,12671821
      Pennsylvania,42,2020-6-18,72,-27.6666666666667,44.1366666666667,Actual,35.2,6361,12801989
      Michigan,26,2020-6-18,74,-17.6666666666667,46.2633333333333,Actual,13.8,5988,9986857
      Connecticut,9,2020-6-18,87,-23.6666666666667,53.0966666666667,Actual,9.4,4226,3565287
      Louisiana,22,2020-6-18,91,-17,62.36,Actual,17.2,3062,4648794
      Georgia,13,2020-6-18,92,-25,59.9966666666666,Actual,29.6,2605,10617423
      Arizona,4,2020-6-18,84,-27.6666666666667,55.93,Actual,28.6,1283,7278717
      Ohio,39,2020-6-18,70,-13,52.9166666666667,Actual,24.4,2633,11689100
      Maryland,24,2020-6-18,66,-32.6666666666667,39.9366666666667,Actual,21,3016,6045680
      Indiana,18,2020-6-18,71,-7.66666666666667,56.2266666666667,Actual,20.6,2491,6732219
      Virginia,51,2020-6-18,81,-28.6666666666667,50.52,Actual,11,1586,8535519
      North Carolina,37,2020-6-18,79,-23,53.75,Actual,15,1188,10488084
      South Carolina,45,2020-6-18,81,-8.66666666666667,63.3366666666667,Actual,8.4,621,5148714
      Mississippi,28,2020-6-18,83,-5.66666666666667,67.38,Actual,8.6,938,2976149
      Colorado,8,2020-6-18,87,-27,52.81,Actual,8.4,1638,5758736
      Alabama,1,2020-6-18,81,-9.33333333333333,63.76,Actual,12.8,810,4903185
      Minnesota,27,2020-6-18,65,-30.3333333333333,41.01,Actual,13.8,1376,5639632
      Washington,53,2020-6-18,93,-30,54.46,Actual,9,1245,7614893
      Missouri,29,2020-6-18,65,-14,51.14,Actual,16.2,920,6137428
      Tennessee,47,2020-6-18,66,-13,52.1766666666667,Actual,8.4,508,6829174
      Rhode Island,44,2020-6-18,62,-24.3333333333333,39.3733333333333,Actual,8.6,885,1059361
      Wisconsin,55,2020-6-18,83,-12.3333333333333,59.6733333333334,Actual,10,719,5822434
      Nevada,32,2020-6-18,66,-28.3333333333333,40.1266666666667,Actual,4.2,475,3080156
      Iowa,19,2020-6-18,75,-10.6666666666667,59.1766666666667,Actual,4.6,680,3155070
      Oklahoma,40,2020-6-18,69,-7,58.65,Actual,1.8,366,3956971
      Kentucky,21,2020-6-18,79,-15.3333333333333,58.7466666666667,Actual,3.8,520,4467673
      New York,36,2020-6-19,82,-41.6666666666667,38.3633333333333,Actual,37.2,31624,26161672
      New Jersey,34,2020-6-19,78,-38.3333333333333,38.0266666666667,Actual,30.2,14762,8882190
      California,6,2020-6-19,79,-36,44.1566666666667,Actual,63,5426,39512223
      Texas,48,2020-6-19,88,-25,58.99,Actual,31,2328,28995881
      Massachusetts,25,2020-6-19,73,-38.3333333333333,37.66,Actual,38.6,7799,6892503
      Florida,12,2020-6-19,87,-31.3333333333333,51.17,Actual,33.6,3104,21477737
      Illinois,17,2020-6-19,73,-27.3333333333333,45.0833333333333,Actual,49.8,6580,12671821
      Pennsylvania,42,2020-6-19,73,-29,44.8466666666667,Actual,29.4,6399,12801989
      Michigan,26,2020-6-19,75,-20.6666666666667,47.0566666666667,Actual,11.2,5994,9986857
      Connecticut,9,2020-6-19,88,-24.3333333333333,53.8533333333333,Actual,10,4238,3565287
      Louisiana,22,2020-6-19,92,-19.3333333333333,63.1666666666667,Actual,12.6,3084,4648794
      Georgia,13,2020-6-19,93,-26,60.7366666666666,Actual,22.8,2636,10617423
      Arizona,4,2020-6-19,85,-29,56.64,Actual,24.2,1321,7278717
      Ohio,39,2020-6-19,71,-13,53.7866666666667,Actual,20.2,2667,11689100
      Maryland,24,2020-6-19,67,-33,40.6066666666667,Actual,16.8,3030,6045680
      Indiana,18,2020-6-19,72,-8.66666666666667,57.14,Actual,18.6,2516,6732219
      Virginia,51,2020-6-19,82,-29.3333333333333,51.2266666666667,Actual,8.2,1602,8535519
      North Carolina,37,2020-6-19,80,-22.6666666666667,54.5233333333333,Actual,15.2,1202,10488084
      South Carolina,45,2020-6-19,82,-8.66666666666667,64.25,Actual,9.2,639,5148714
      Mississippi,28,2020-6-19,84,-9,68.29,Actual,4.6,938,2976149
      Colorado,8,2020-6-19,88,-28,53.53,Actual,6,1643,5758736
      Alabama,1,2020-6-19,82,-10.3333333333333,64.6566666666666,Actual,10.8,822,4903185
      Minnesota,27,2020-6-19,66,-27.3333333333333,41.7366666666667,Actual,13.6,1393,5639632
      Washington,53,2020-6-19,94,-30.3333333333333,55.1566666666666,Actual,7.8,1255,7614893
      Missouri,29,2020-6-19,66,-8.66666666666667,52.0533333333333,Actual,15.8,933,6137428
      Tennessee,47,2020-6-19,67,-14.3333333333333,53.0333333333333,Actual,6.6,515,6829174
      Rhode Island,44,2020-6-19,63,-24.6666666666667,40.1266666666667,Actual,5.8,894,1059361
      Wisconsin,55,2020-6-19,84,-13.3333333333333,60.54,Actual,8.2,730,5822434
      Nevada,32,2020-6-19,67,-30,40.8266666666667,Actual,4,479,3080156
      Iowa,19,2020-6-19,76,-8.66666666666667,60.09,Actual,4.2,681,3155070
      Oklahoma,40,2020-6-19,70,-11.6666666666667,59.5333333333333,Actual,1.2,367,3956971
      Kentucky,21,2020-6-19,80,-15.3333333333333,59.5933333333333,Actual,4.2,522,4467673
      New York,36,2020-6-20,83,-29.6666666666667,39.0666666666667,Actual,38.8,31703,26161672
      New Jersey,34,2020-6-20,79,-25,38.7766666666667,Actual,29.2,14785,8882190
      California,6,2020-6-20,80,-25.6666666666667,44.9,Actual,59,5494,39512223
      Texas,48,2020-6-20,89,-17.3333333333333,59.8166666666667,Actual,26,2355,28995881
      Massachusetts,25,2020-6-20,74,-24.6666666666667,38.4133333333333,Actual,28,7827,6892503
      Florida,12,2020-6-20,88,-25,51.92,Actual,31,3144,21477737
      Illinois,17,2020-6-20,74,-15.6666666666667,45.9266666666667,Actual,37.2,6625,12671821
      Pennsylvania,42,2020-6-20,74,-16.6666666666667,45.68,Actual,21.4,6419,12801989
      Michigan,26,2020-6-20,76,-7,47.9866666666667,Actual,12.2,6014,9986857
      Connecticut,9,2020-6-20,89,-11.6666666666667,54.7366666666667,Actual,8.8,4251,3565287
      Louisiana,22,2020-6-20,93,-14,64.0266666666667,Actual,11,3104,4648794
      Georgia,13,2020-6-20,94,-15.3333333333333,61.5833333333333,Actual,14.6,2642,10617423
      Arizona,4,2020-6-20,86,-22.6666666666667,57.4133333333333,Actual,20.4,1346,7278717
      Ohio,39,2020-6-20,72,-2,54.7666666666667,Actual,18.6,2697,11689100
      Maryland,24,2020-6-20,68,-19,41.4166666666667,Actual,15.6,3052,6045680
      Indiana,18,2020-6-20,73,3,58.17,Actual,15.6,2536,6732219
      Virginia,51,2020-6-20,83,-16.6666666666667,52.06,Actual,7.4,1607,8535519
      North Carolina,37,2020-6-20,81,-13,55.3933333333333,Actual,19.4,1215,10488084
      South Carolina,45,2020-6-20,83,1.66666666666667,65.2666666666667,Actual,8.4,644,5148714
      Mississippi,28,2020-6-20,85,0.666666666666667,69.2966666666667,Actual,8,938,2976149
      Colorado,8,2020-6-20,89,-17.3333333333333,54.3566666666667,Actual,4,1647,5758736
      Alabama,1,2020-6-20,83,2.33333333333333,65.68,Actual,10.2,838,4903185
      Minnesota,27,2020-6-20,67,-17,42.5666666666666,Actual,11.8,1404,5639632
      Washington,53,2020-6-20,95,-21,55.9466666666666,Actual,10,1265,7614893
      Missouri,29,2020-6-20,67,-6.33333333333333,52.99,Actual,13,943,6137428
      Tennessee,47,2020-6-20,68,-4,53.9933333333333,Actual,6.6,524,6829174
      Rhode Island,44,2020-6-20,64,-14.3333333333333,40.9833333333333,Actual,5.4,894,1059361
      Wisconsin,55,2020-6-20,85,-4.66666666666667,61.4933333333334,Actual,6.4,744,5822434
      Nevada,32,2020-6-20,68,-26,41.5666666666667,Actual,3.2,486,3080156
      Iowa,19,2020-6-20,77,-1.66666666666667,61.0733333333333,Actual,2.2,681,3155070
      Oklahoma,40,2020-6-20,71,-1.33333333333333,60.52,Actual,1,368,3956971
      Kentucky,21,2020-6-20,81,-3.33333333333333,60.56,Actual,1.6,524,4467673
      New York,36,2020-6-21,84,-30,39.7666666666667,Actual,46.4,31739,26161672
      New Jersey,34,2020-6-21,80,-26.3333333333333,39.5133333333333,Actual,32.8,14802,8882190
      California,6,2020-6-21,81,-26.6666666666667,45.6333333333333,Actual,54.2,5515,39512223
      Texas,48,2020-6-21,90,-19.6666666666667,60.62,Actual,24.4,2368,28995881
      Massachusetts,25,2020-6-21,75,-24.3333333333333,39.17,Actual,24,7857,6892503
      Florida,12,2020-6-21,89,-26.3333333333333,52.6566666666667,Actual,35.4,3161,21477737
      Illinois,17,2020-6-21,75,-17.3333333333333,46.7533333333333,Actual,34,6647,12671821
      Pennsylvania,42,2020-6-21,75,-15.3333333333333,46.5266666666667,Actual,20.6,6423,12801989
      Michigan,26,2020-6-21,77,-7.33333333333333,48.9133333333333,Actual,9.6,6017,9986857
      Connecticut,9,2020-6-21,90,-11.6666666666667,55.62,Actual,10.2,4260,3565287
      Louisiana,22,2020-6-21,94,-18.6666666666667,64.84,Actual,14.4,3105,4648794
      Georgia,13,2020-6-21,95,-22.3333333333333,62.36,Actual,18,2643,10617423
      Arizona,4,2020-6-21,87,-21.6666666666667,58.1966666666667,Actual,22.6,1349,7278717
      Ohio,39,2020-6-21,73,-4.33333333333333,55.7233333333333,Actual,20.4,2700,11689100
      Maryland,24,2020-6-21,69,-17.3333333333333,42.2433333333334,Actual,15.2,3066,6045680
      Indiana,18,2020-6-21,74,-1.66666666666667,59.1533333333333,Actual,15.6,2540,6732219
      Virginia,51,2020-6-21,84,-17.3333333333333,52.8866666666667,Actual,11.8,1611,8535519
      North Carolina,37,2020-6-21,82,-16,56.2333333333333,Actual,21.6,1245,10488084
      South Carolina,45,2020-6-21,84,-1.33333333333333,66.2533333333333,Actual,10.4,653,5148714
      Mississippi,28,2020-6-21,86,-4.66666666666667,70.25,Actual,10.2,938,2976149
      Colorado,8,2020-6-21,90,-17.3333333333333,55.1833333333333,Actual,5.4,1647,5758736
      Alabama,1,2020-6-21,84,-5.66666666666667,66.6233333333333,Actual,10.8,839,4903185
      Minnesota,27,2020-6-21,68,-17,43.3966666666666,Actual,9.8,1412,5639632
      Washington,53,2020-6-21,96,-16.3333333333333,56.7833333333333,Actual,7.8,1270,7614893
      Missouri,29,2020-6-21,68,-4,53.95,Actual,7.4,945,6137428
      Tennessee,47,2020-6-21,69,-10.3333333333333,54.89,Actual,6.8,526,6829174
      Rhode Island,44,2020-6-21,65,-10,41.8833333333333,Actual,4.2,894,1059361
      Wisconsin,55,2020-6-21,86,1.66666666666667,62.51,Actual,6.2,744,5822434
      Nevada,32,2020-6-21,69,-25,42.3166666666667,Actual,3.4,487,3080156
      Iowa,19,2020-6-21,78,0.333333333333333,62.0766666666667,Actual,1.8,686,3155070
      Oklahoma,40,2020-6-21,72,-2.66666666666667,61.4933333333333,Actual,1,369,3956971
      Kentucky,21,2020-6-21,82,-9.33333333333333,61.4666666666667,Actual,3.4,526,4467673
      New York,36,2020-6-22,85,-42,40.3466666666667,Actual,47.6,31773,26161672
      New Jersey,34,2020-6-22,81,-37.6666666666667,40.1366666666667,Actual,36.4,14840,8882190
      California,6,2020-6-22,82,-37,46.2633333333333,Actual,59.8,5566,39512223
      Texas,48,2020-6-22,91,-28.6666666666667,61.3333333333333,Actual,26.8,2384,28995881
      Massachusetts,25,2020-6-22,76,-38,39.79,Actual,27.6,7873,6892503
      Florida,12,2020-6-22,90,-31.3333333333333,53.3433333333333,Actual,35.4,3173,21477737
      Illinois,17,2020-6-22,76,-33.6666666666667,47.4166666666667,Actual,38,6671,12671821
      Pennsylvania,42,2020-6-22,76,-28.6666666666667,47.24,Actual,23.8,6426,12801989
      Michigan,26,2020-6-22,78,-21.3333333333333,49.7,Actual,9.4,6024,9986857
      Connecticut,9,2020-6-22,91,-24,56.38,Actual,9.8,4263,3565287
      Louisiana,22,2020-6-22,95,-23.3333333333333,65.6066666666667,Actual,13.6,3117,4648794
      Georgia,13,2020-6-22,96,-28,63.08,Actual,12.4,2648,10617423
      Arizona,4,2020-6-22,88,-30,58.8966666666667,Actual,29.2,1351,7278717
      Ohio,39,2020-6-22,74,-15.6666666666667,56.5666666666667,Actual,17.6,2704,11689100
      Maryland,24,2020-6-22,70,-34.6666666666667,42.8966666666667,Actual,15.6,3074,6045680
      Indiana,18,2020-6-22,75,-9.66666666666667,60.0566666666667,Actual,12.4,2553,6732219
      Virginia,51,2020-6-22,85,-31,53.5766666666667,Actual,11.8,1620,8535519
      North Carolina,37,2020-6-22,83,-22.6666666666667,57.0066666666667,Actual,24.6,1278,10488084
      South Carolina,45,2020-6-22,85,-10.3333333333333,67.15,Actual,8.8,659,5148714
      Mississippi,28,2020-6-22,87,-10,71.15,Actual,14.6,978,2976149
      Colorado,8,2020-6-22,91,-25.3333333333333,55.93,Actual,4.8,1651,5758736
      Alabama,1,2020-6-22,85,-12,67.5033333333333,Actual,13.8,841,4903185
      Minnesota,27,2020-6-22,69,-28.3333333333333,44.1133333333333,Actual,7.8,1416,5639632
      Washington,53,2020-6-22,97,-30.3333333333333,57.48,Actual,7.6,1276,7614893
      Missouri,29,2020-6-22,69,-17,54.78,Actual,6.8,949,6137428
      Tennessee,47,2020-6-22,70,-15.6666666666667,55.7333333333333,Actual,8.2,531,6829174
      Rhode Island,44,2020-6-22,66,-25.6666666666667,42.6266666666667,Actual,3.6,903,1059361
      Wisconsin,55,2020-6-22,87,-18,63.33,Actual,5.4,745,5822434
      Nevada,32,2020-6-22,70,-29,43.0266666666667,Actual,3,489,3080156
      Iowa,19,2020-6-22,79,-14.3333333333333,62.9333333333333,Actual,1.8,686,3155070
      Oklahoma,40,2020-6-22,73,-10.3333333333333,62.39,Actual,1,369,3956971
      Kentucky,21,2020-6-22,83,-16.3333333333333,62.3033333333333,Actual,3.2,526,4467673
      New York,36,2020-6-23,86,-39.6666666666667,40.95,Actual,40,31835,26161672
      New Jersey,34,2020-6-23,82,-37,40.7666666666667,Actual,17.4,14893,8882190
      California,6,2020-6-23,83,-36.3333333333333,46.9,Actual,62.4,5626,39512223
      Texas,48,2020-6-23,92,-27.6666666666667,62.0566666666667,Actual,31.8,2421,28995881
      Massachusetts,25,2020-6-23,77,-37.3333333333333,40.4166666666667,Actual,27,7889,6892503
      Florida,12,2020-6-23,91,-31,54.0333333333333,Actual,36.6,3238,21477737
      Illinois,17,2020-6-23,77,-28,48.1366666666667,Actual,37,6707,12671821
      Pennsylvania,42,2020-6-23,77,-27,47.97,Actual,27.6,6464,12801989
      Michigan,26,2020-6-23,79,-20,50.5,Actual,9.2,6036,9986857
      Connecticut,9,2020-6-23,92,-23.3333333333333,57.1466666666667,Actual,9.4,4277,3565287
      Louisiana,22,2020-6-23,96,-20.3333333333333,66.4033333333333,Actual,12,3134,4648794
      Georgia,13,2020-6-23,97,-27,63.81,Actual,20.6,2695,10617423
      Arizona,4,2020-6-23,89,-29,59.6066666666667,Actual,29.8,1396,7278717
      Ohio,39,2020-6-23,75,-14.3333333333333,57.4233333333333,Actual,15,2735,11689100
      Maryland,24,2020-6-23,71,-31,43.5866666666667,Actual,15.4,3092,6045680
      Indiana,18,2020-6-23,76,-8.33333333333333,60.9733333333333,Actual,10,2569,6732219
      Virginia,51,2020-6-23,86,-26.6666666666667,54.31,Actual,13.6,1645,8535519
      North Carolina,37,2020-6-23,84,-21.3333333333333,57.7933333333333,Actual,24.2,1296,10488084
      South Carolina,45,2020-6-23,86,-10.3333333333333,68.0466666666667,Actual,9.8,673,5148714
      Mississippi,28,2020-6-23,88,-7.66666666666667,72.0733333333333,Actual,15.6,989,2976149
      Colorado,8,2020-6-23,92,-26,56.67,Actual,4.4,1665,5758736
      Alabama,1,2020-6-23,86,-12.6666666666667,68.3766666666666,Actual,11.6,864,4903185
      Minnesota,27,2020-6-23,70,-27,44.8433333333333,Actual,7.4,1425,5639632
      Washington,53,2020-6-23,98,-30.3333333333333,58.1766666666666,Actual,7,1284,7614893
      Missouri,29,2020-6-23,70,-15.3333333333333,55.6266666666667,Actual,5.2,957,6137428
      Tennessee,47,2020-6-23,71,-14.6666666666667,56.5866666666667,Actual,8.6,542,6829174
      Rhode Island,44,2020-6-23,67,-23.6666666666667,43.39,Actual,5.2,906,1059361
      Wisconsin,55,2020-6-23,88,-14.6666666666667,64.1833333333334,Actual,4.4,750,5822434
      Nevada,32,2020-6-23,71,-28,43.7466666666667,Actual,1.8,492,3080156
      Iowa,19,2020-6-23,80,-11.3333333333333,63.82,Actual,3,689,3155070
      Oklahoma,40,2020-6-23,74,-9.66666666666667,63.2933333333333,Actual,1.4,371,3956971
      Kentucky,21,2020-6-23,84,-14.3333333333333,63.16,Actual,4.4,537,4467673
      New York,36,2020-6-24,87,-38.6666666666667,41.5633333333333,Actual,36.4,31862,26161672
      New Jersey,34,2020-6-24,83,-35.3333333333333,41.4133333333333,Actual,22.4000000000001,14944,8882190
      California,6,2020-6-24,84,-36.3333333333333,47.5366666666666,Actual,70.6,5725,39512223
      Texas,48,2020-6-24,93,-25.6666666666667,62.8,Actual,38,2462,28995881
      Massachusetts,25,2020-6-24,78,-37.6666666666667,41.04,Actual,31,7937,6892503
      Florida,12,2020-6-24,92,-30.6666666666667,54.7266666666667,Actual,41,3281,21477737
      Illinois,17,2020-6-24,78,-27.3333333333333,48.8633333333333,Actual,40,6770,12671821
      Pennsylvania,42,2020-6-24,78,-24.6666666666667,48.7233333333333,Actual,31.2,6518,12801989
      Michigan,26,2020-6-24,80,-15,51.35,Actual,8.8,6041,9986857
      Connecticut,9,2020-6-24,93,-23.6666666666667,57.91,Actual,9.4,4287,3565287
      Louisiana,22,2020-6-24,97,-21.6666666666667,67.1866666666667,Actual,17,3152,4648794
      Georgia,13,2020-6-24,98,-26.3333333333333,64.5466666666666,Actual,25.4,2698,10617423
      Arizona,4,2020-6-24,90,-28.6666666666667,60.32,Actual,37.4,1467,7278717
      Ohio,39,2020-6-24,76,-11.3333333333333,58.31,Actual,17.6,2755,11689100
      Maryland,24,2020-6-24,72,-29.3333333333333,44.2933333333334,Actual,15.2,3108,6045680
      Indiana,18,2020-6-24,77,-7.33333333333333,61.9,Actual,11,2578,6732219
      Virginia,51,2020-6-24,87,-26,55.05,Actual,17.8,1661,8535519
      North Carolina,37,2020-6-24,85,-21.3333333333333,58.58,Actual,20.6,1325,10488084
      South Carolina,45,2020-6-24,87,-11,68.9366666666667,Actual,8.2,683,5148714
      Mississippi,28,2020-6-24,89,-8,72.9933333333333,Actual,16.8,1011,2976149
      Colorado,8,2020-6-24,93,-25.6666666666667,57.4133333333333,Actual,5.2,1667,5758736
      Alabama,1,2020-6-24,87,-10.6666666666667,69.27,Actual,13.6,891,4903185
      Minnesota,27,2020-6-24,71,-25.6666666666667,45.5866666666666,Actual,6.8,1432,5639632
      Washington,53,2020-6-24,99,-30,58.8766666666666,Actual,6.8,1293,7614893
      Missouri,29,2020-6-24,71,-9,56.5366666666666,Actual,6.6,967,6137428
      Tennessee,47,2020-6-24,72,-13.6666666666667,57.45,Actual,10.2,556,6829174
      Rhode Island,44,2020-6-24,68,-25,44.14,Actual,6.6,912,1059361
      Wisconsin,55,2020-6-24,89,-13,65.0533333333334,Actual,4.4,757,5822434
      Nevada,32,2020-6-24,72,-27.3333333333333,44.4733333333333,Actual,2.2,494,3080156
      Iowa,19,2020-6-24,81,-8,64.74,Actual,3.6,690,3155070
      Oklahoma,40,2020-6-24,75,-5.66666666666667,64.2366666666667,Actual,1.6,372,3956971
      Kentucky,21,2020-6-24,85,-13.6666666666667,64.0233333333333,Actual,5.4,538,4467673
      New York,36,2020-6-25,88,-38.6666666666667,42.1766666666667,Actual,33,31903,26161672
      New Jersey,34,2020-6-25,84,-36.3333333333333,42.05,Actual,21.6,14872,8882190
      California,6,2020-6-25,85,-36.3333333333333,48.1733333333333,Actual,66.6,5806,39512223
      Texas,48,2020-6-25,94,-27.3333333333333,63.5266666666667,Actual,43.8,2514,28995881
      Massachusetts,25,2020-6-25,79,-36,41.68,Actual,33.4,7962,6892503
      Florida,12,2020-6-25,93,-30.6666666666667,55.42,Actual,43.4,3327,21477737
      Illinois,17,2020-6-25,79,-26.6666666666667,49.5966666666667,Actual,40.4,6810,12671821
      Pennsylvania,42,2020-6-25,79,-25.3333333333333,49.47,Actual,35.4,6557,12801989
      Michigan,26,2020-6-25,81,-15,52.2,Actual,11.2,6060,9986857
      Connecticut,9,2020-6-25,94,-22.3333333333333,58.6866666666667,Actual,9.6,4298,3565287
      Louisiana,22,2020-6-25,98,-20,67.9866666666667,Actual,14.6,3164,4648794
      Georgia,13,2020-6-25,99,-26,65.2866666666666,Actual,25.6,2745,10617423
      Arizona,4,2020-6-25,91,-29.6666666666667,61.0233333333333,Actual,45.8,1495,7278717
      Ohio,39,2020-6-25,77,-11.6666666666667,59.1933333333333,Actual,20,2772,11689100
      Maryland,24,2020-6-25,73,-30.6666666666667,44.9866666666667,Actual,16.6,3129,6045680
      Indiana,18,2020-6-25,78,-6.66666666666667,62.8333333333333,Actual,12.6,2586,6732219
      Virginia,51,2020-6-25,88,-27.6666666666667,55.7733333333333,Actual,20.8,1675,8535519
      North Carolina,37,2020-6-25,86,-22.3333333333333,59.3566666666667,Actual,15,1336,10488084
      South Carolina,45,2020-6-25,88,-9.66666666666667,69.84,Actual,10.4,693,5148714
      Mississippi,28,2020-6-25,90,-8.33333333333333,73.91,Actual,11.4,1016,2976149
      Colorado,8,2020-6-25,94,-25.6666666666667,58.1566666666667,Actual,4.6,1669,5758736
      Alabama,1,2020-6-25,88,-11,70.16,Actual,15.6,896,4903185
      Minnesota,27,2020-6-25,72,-27,46.3166666666666,Actual,7.2,1441,5639632
      Washington,53,2020-6-25,100,-29.6666666666667,59.58,Actual,6.8,1300,7614893
      Missouri,29,2020-6-25,72,-13.6666666666667,57.4,Actual,6.8,969,6137428
      Tennessee,47,2020-6-25,73,-13.3333333333333,58.3166666666667,Actual,10.6,567,6829174
      Rhode Island,44,2020-6-25,69,-22.3333333333333,44.9166666666667,Actual,4.8,920,1059361
      Wisconsin,55,2020-6-25,90,-11,65.9433333333334,Actual,6.4,766,5822434
      Nevada,32,2020-6-25,73,-28,45.1933333333333,Actual,2.2,495,3080156
      Iowa,19,2020-6-25,82,-9,65.65,Actual,3.6,696,3155070
      Oklahoma,40,2020-6-25,76,-8,65.1566666666667,Actual,3,375,3956971
      Kentucky,21,2020-6-25,86,-14,64.8833333333333,Actual,5.6,546,4467673
      New York,36,2020-6-26,89,-39.3333333333333,42.7833333333333,Actual,21.6,31921,26161672
      New Jersey,34,2020-6-26,85,-36,42.69,Actual,16.4,14914,8882190
      California,6,2020-6-26,86,-36.6666666666667,48.8066666666666,Actual,61.2,5868,39512223
      Texas,48,2020-6-26,95,-28.6666666666667,64.24,Actual,41.4,2558,28995881
      Massachusetts,25,2020-6-26,80,-37,42.31,Actual,34,8012,6892503
      Florida,12,2020-6-26,94,-32.3333333333333,56.0966666666667,Actual,36.2,3366,21477737
      Illinois,17,2020-6-26,80,-30,50.2966666666667,Actual,36.2,6847,12671821
      Pennsylvania,42,2020-6-26,80,-25.6666666666667,50.2133333333333,Actual,28.4,6579,12801989
      Michigan,26,2020-6-26,82,-20,53,Actual,9.6,6061,9986857
      Connecticut,9,2020-6-26,95,-24.3333333333333,59.4433333333333,Actual,7.8,4307,3565287
      Louisiana,22,2020-6-26,99,-22,68.7666666666667,Actual,13,3190,4648794
      Georgia,13,2020-6-26,100,-26.3333333333333,66.0233333333333,Actual,16.6,2770,10617423
      Arizona,4,2020-6-26,92,-31,61.7133333333333,Actual,39.6,1536,7278717
      Ohio,39,2020-6-26,78,-13.6666666666667,60.0566666666667,Actual,14.4,2788,11689100
      Maryland,24,2020-6-26,74,-29.6666666666667,45.69,Actual,15.2,3142,6045680
      Indiana,18,2020-6-26,79,-9,63.7433333333333,Actual,10,2595,6732219
      Virginia,51,2020-6-26,89,-26.3333333333333,56.51,Actual,17.4,1700,8535519
      North Carolina,37,2020-6-26,87,-22,60.1366666666667,Actual,11.2,1348,10488084
      South Carolina,45,2020-6-26,89,-10,70.74,Actual,8.6,694,5148714
      Mississippi,28,2020-6-26,91,-10.6666666666667,74.8033333333333,Actual,10,1022,2976149
      Colorado,8,2020-6-26,95,-27.3333333333333,58.8833333333333,Actual,2.2,1673,5758736
      Alabama,1,2020-6-26,89,-12,71.0399999999999,Actual,11,907,4903185
      Minnesota,27,2020-6-26,73,-27.6666666666667,47.04,Actual,7,1446,5639632
      Washington,53,2020-6-26,101,-31.3333333333333,60.2666666666666,Actual,5.2,1304,7614893
      Missouri,29,2020-6-26,73,-8,58.32,Actual,5.2,978,6137428
      Tennessee,47,2020-6-26,74,-15.6666666666667,59.16,Actual,8.4,577,6829174
      Rhode Island,44,2020-6-26,70,-24.6666666666667,45.67,Actual,4.2,927,1059361
      Wisconsin,55,2020-6-26,91,-16.6666666666667,66.7766666666667,Actual,5.4,766,5822434
      Nevada,32,2020-6-26,74,-29.6666666666667,45.8966666666667,Actual,1.6,498,3080156
      Iowa,19,2020-6-26,83,-8,66.57,Actual,3.4,704,3155070
      Oklahoma,40,2020-6-26,77,-10.3333333333333,66.0533333333333,Actual,2.8,377,3956971
      Kentucky,21,2020-6-26,87,-14.6666666666667,65.7366666666667,Actual,4.2,553,4467673
      New York,36,2020-6-27,90,-31,43.4733333333333,Actual,19.8,31938,26161672
      New Jersey,34,2020-6-27,86,-24.6666666666667,43.4433333333333,Actual,9.59999999999997,14948,8882190
      California,6,2020-6-27,87,-27,49.5366666666666,Actual,51.6,5899,39512223
      Texas,48,2020-6-27,96,-21,65.03,Actual,38.6,2603,28995881
      Massachusetts,25,2020-6-27,81,-26.3333333333333,43.0466666666667,Actual,31.4,8040,6892503
      Florida,12,2020-6-27,95,-27.6666666666667,56.82,Actual,33.2,3390,21477737
      Illinois,17,2020-6-27,81,-12.6666666666667,51.17,Actual,26.4,6873,12671821
      Pennsylvania,42,2020-6-27,81,-15.3333333333333,51.06,Actual,19.2,6603,12801989
      Michigan,26,2020-6-27,83,-5.33333333333333,53.9466666666667,Actual,9.4,6080,9986857
      Connecticut,9,2020-6-27,96,-16.3333333333333,60.28,Actual,6.6,4311,3565287
      Louisiana,22,2020-6-27,100,-16.6666666666667,69.6,Actual,9.4,3190,4648794
      Georgia,13,2020-6-27,101,-17,66.8533333333333,Actual,17.2,2776,10617423
      Arizona,4,2020-6-27,93,-24.3333333333333,62.47,Actual,26.2,1580,7278717
      Ohio,39,2020-6-27,79,-4.33333333333333,61.0133333333333,Actual,12.6,2804,11689100
      Maryland,24,2020-6-27,75,-15.6666666666667,46.5333333333334,Actual,13.4,3157,6045680
      Indiana,18,2020-6-27,80,0,64.7433333333333,Actual,9.2,2616,6732219
      Virginia,51,2020-6-27,90,-13.6666666666667,57.3733333333333,Actual,15.8,1724,8535519
      North Carolina,37,2020-6-27,88,-13.3333333333333,61.0033333333333,Actual,6.4,1353,10488084
      South Carolina,45,2020-6-27,90,-1,71.73,Actual,7.4,711,5148714
      Mississippi,28,2020-6-27,92,-2.66666666666667,75.7766666666667,Actual,9.6,1035,2976149
      Colorado,8,2020-6-27,96,-16.6666666666667,59.7166666666667,Actual,2.8,1674,5758736
      Alabama,1,2020-6-27,90,0.333333333333333,72.0433333333333,Actual,7.6,919,4903185
      Minnesota,27,2020-6-27,74,-17,47.87,Actual,7.6,1452,5639632
      Washington,53,2020-6-27,102,-22.3333333333333,61.0433333333333,Actual,5.4,1310,7614893
      Missouri,29,2020-6-27,74,-6.33333333333333,59.2566666666667,Actual,3.6,983,6137428
      Tennessee,47,2020-6-27,75,-5.66666666666667,60.1033333333334,Actual,7.2,584,6829174
      Rhode Island,44,2020-6-27,71,-18.6666666666667,46.4833333333333,Actual,6.8,927,1059361
      Wisconsin,55,2020-6-27,92,1,67.7866666666667,Actual,4,777,5822434
      Nevada,32,2020-6-27,75,-25.6666666666667,46.64,Actual,2,500,3080156
      Iowa,19,2020-6-27,84,1,67.58,Actual,4.2,704,3155070
      Oklahoma,40,2020-6-27,78,-2.33333333333333,67.03,Actual,2.6,384,3956971
      Kentucky,21,2020-6-27,88,-4.33333333333333,66.6933333333333,Actual,4.4,554,4467673
      New York,36,2020-6-28,91,-27.6666666666667,44.1966666666667,Actual,25.8,31943,26161672
      New Jersey,34,2020-6-28,87,-24,44.2033333333333,Actual,32.6,14975,8882190
      California,6,2020-6-28,88,-26.3333333333333,50.2733333333333,Actual,55.2,5932,39512223
      Texas,48,2020-6-28,97,-22,65.81,Actual,38.8,2628,28995881
      Massachusetts,25,2020-6-28,82,-25.3333333333333,43.7933333333333,Actual,18.2,8059,6892503
      Florida,12,2020-6-28,96,-28.3333333333333,57.5366666666667,Actual,35.6,3419,21477737
      Illinois,17,2020-6-28,82,-15,52.02,Actual,22.6,6888,12671821
      Pennsylvania,42,2020-6-28,82,-11.3333333333333,51.9466666666667,Actual,18.4,6606,12801989
      Michigan,26,2020-6-28,84,-1.33333333333333,54.9333333333333,Actual,12,6084,9986857
      Connecticut,9,2020-6-28,97,-13.3333333333333,61.1466666666667,Actual,4.8,4316,3565287
      Louisiana,22,2020-6-28,101,-17.3333333333333,70.4266666666666,Actual,11.4,3199,4648794
      Georgia,13,2020-6-28,102,-20,67.6533333333333,Actual,12,2778,10617423
      Arizona,4,2020-6-28,94,-23.3333333333333,63.2366666666667,Actual,30,1594,7278717
      Ohio,39,2020-6-28,80,-2.33333333333333,61.99,Actual,18.2,2807,11689100
      Maryland,24,2020-6-28,76,-16.3333333333333,47.37,Actual,12.2,3168,6045680
      Indiana,18,2020-6-28,81,1.33333333333333,65.7566666666667,Actual,10.8,2619,6732219
      Virginia,51,2020-6-28,91,-16.6666666666667,58.2066666666667,Actual,17.6,1732,8535519
      North Carolina,37,2020-6-28,89,-17.3333333333333,61.83,Actual,8.8,1352,10488084
      South Carolina,45,2020-6-28,91,-0.666666666666667,72.7233333333333,Actual,9.2,716,5148714
      Mississippi,28,2020-6-28,93,-3.66666666666667,76.74,Actual,11.4,1039,2976149
      Colorado,8,2020-6-28,97,-15.3333333333333,60.5633333333333,Actual,4.2,1676,5758736
      Alabama,1,2020-6-28,91,-4,73.0033333333333,Actual,10.8,919,4903185
      Minnesota,27,2020-6-28,75,-17,48.7,Actual,7,1460,5639632
      Washington,53,2020-6-28,103,-16,61.8833333333333,Actual,6.4,1310,7614893
      Missouri,29,2020-6-28,75,-3.33333333333333,60.2233333333333,Actual,3.8,983,6137428
      Tennessee,47,2020-6-28,76,-9,61.0133333333333,Actual,7.4,584,6829174
      Rhode Island,44,2020-6-28,72,-10.3333333333333,47.38,Actual,6,927,1059361
      Wisconsin,55,2020-6-28,93,2.33333333333333,68.81,Actual,3.6,777,5822434
      Nevada,32,2020-6-28,76,-25.3333333333333,47.3866666666667,Actual,2.4,500,3080156
      Iowa,19,2020-6-28,85,1,68.59,Actual,4,706,3155070
      Oklahoma,40,2020-6-28,79,-1.33333333333333,68.0166666666667,Actual,2.4,385,3956971
      Kentucky,21,2020-6-28,89,-8.66666666666667,67.6066666666667,Actual,3.8,558,4467673
      New York,36,2020-6-29,92,-38.3333333333333,44.8133333333333,Actual,24.4,31961,26161672
      New Jersey,34,2020-6-29,88,-33.6666666666667,44.8666666666667,Actual,32.8,14992,8882190
      California,6,2020-6-29,89,-35,50.9233333333333,Actual,60.2,5983,39512223
      Texas,48,2020-6-29,98,-27.6666666666667,66.5333333333333,Actual,42.4,2655,28995881
      Massachusetts,25,2020-6-29,83,-38.3333333333333,44.41,Actual,13.6,8094,6892503
      Florida,12,2020-6-29,97,-31.6666666666667,58.22,Actual,36.8,3447,21477737
      Illinois,17,2020-6-29,83,-29,52.73,Actual,20.8,6902,12671821
      Pennsylvania,42,2020-6-29,83,-24.3333333333333,52.7033333333333,Actual,21,6614,12801989
      Michigan,26,2020-6-29,85,-16.3333333333333,55.77,Actual,12.8,6088,9986857
      Connecticut,9,2020-6-29,98,-23.6666666666667,61.91,Actual,3.4,4320,3565287
      Louisiana,22,2020-6-29,102,-18.6666666666667,71.24,Actual,9.6,3199,4648794
      Georgia,13,2020-6-29,103,-26.6666666666667,68.3866666666666,Actual,11.4,2784,10617423
      Arizona,4,2020-6-29,95,-28.6666666666667,63.95,Actual,37.8,1598,7278717
      Ohio,39,2020-6-29,81,-12,62.87,Actual,17.6,2818,11689100
      Maryland,24,2020-6-29,77,-29.6666666666667,48.0733333333334,Actual,12.6,3175,6045680
      Indiana,18,2020-6-29,82,-8.33333333333333,66.6733333333333,Actual,11,2624,6732219
      Virginia,51,2020-6-29,92,-26.6666666666667,58.94,Actual,17.2,1740,8535519
      North Carolina,37,2020-6-29,90,-21.6666666666667,62.6133333333333,Actual,10,1357,10488084
      South Carolina,45,2020-6-29,92,-9.66666666666667,73.6266666666667,Actual,14.4,720,5148714
      Mississippi,28,2020-6-29,94,-7,77.67,Actual,12,1059,2976149
      Colorado,8,2020-6-29,98,-22.3333333333333,61.34,Actual,4.8,1681,5758736
      Alabama,1,2020-6-29,92,-10.6666666666667,73.8966666666666,Actual,13,929,4903185
      Minnesota,27,2020-6-29,76,-29.3333333333333,49.4066666666666,Actual,7.2,1470,5639632
      Washington,53,2020-6-29,104,-29.3333333333333,62.59,Actual,7,1320,7614893
      Missouri,29,2020-6-29,76,-15,61.0733333333333,Actual,4.8,985,6137428
      Tennessee,47,2020-6-29,77,-15,61.8633333333334,Actual,6.4,592,6829174
      Rhode Island,44,2020-6-29,73,-26,48.12,Actual,5.8,946,1059361
      Wisconsin,55,2020-6-29,94,-16.6666666666667,69.6433333333333,Actual,4,777,5822434
      Nevada,32,2020-6-29,77,-26.3333333333333,48.1233333333333,Actual,2.6,504,3080156
      Iowa,19,2020-6-29,86,-9.66666666666667,69.4933333333333,Actual,2.6,711,3155070
      Oklahoma,40,2020-6-29,80,-9.66666666666667,68.92,Actual,2.4,385,3956971
      Kentucky,21,2020-6-29,90,-15,68.4566666666667,Actual,3.8,560,4467673
      New York,36,2020-6-30,93,-37.3333333333333,45.44,Actual,25.2,32032,26161672
      New Jersey,34,2020-6-30,89,-34.6666666666667,45.52,Actual,31.8,15035,8882190
      California,6,2020-6-30,90,-35,51.5733333333333,Actual,73.2,6082,39512223
      Texas,48,2020-6-30,99,-27,67.2633333333333,Actual,46.4,2708,28995881
      Massachusetts,25,2020-6-30,84,-37,45.04,Actual,18.2,8053,6892503
      Florida,12,2020-6-30,98,-31.3333333333333,58.9066666666667,Actual,45.4,3505,21477737
      Illinois,17,2020-6-30,84,-26.3333333333333,53.4666666666667,Actual,22.8,6923,12671821
      Pennsylvania,42,2020-6-30,84,-23,53.4733333333333,Actual,21.8,6649,12801989
      Michigan,26,2020-6-30,86,-15.3333333333333,56.6166666666667,Actual,11.8,6120,9986857
      Connecticut,9,2020-6-30,99,-23.6666666666667,62.6733333333333,Actual,3,4322,3565287
      Louisiana,22,2020-6-30,103,-16.3333333333333,72.0766666666667,Actual,13,3221,4648794
      Georgia,13,2020-6-30,104,-25.6666666666667,69.1299999999999,Actual,14.6,2805,10617423
      Arizona,4,2020-6-30,96,-28.6666666666667,64.6633333333334,Actual,36.8,1645,7278717
      Ohio,39,2020-6-30,82,-10.6666666666667,63.7633333333333,Actual,19.8,2863,11689100
      Maryland,24,2020-6-30,78,-27,48.8033333333333,Actual,11,3190,6045680
      Indiana,18,2020-6-30,83,-6.66666666666667,67.6066666666667,Actual,9.2,2640,6732219
      Virginia,51,2020-6-30,93,-25,59.69,Actual,18.4,1763,8535519
      North Carolina,37,2020-6-30,91,-20.6666666666667,63.4066666666667,Actual,11.2,1380,10488084
      South Carolina,45,2020-6-30,93,-9.66666666666667,74.53,Actual,14.6,739,5148714
      Mississippi,28,2020-6-30,95,-4.33333333333333,78.6266666666667,Actual,11.4,1073,2976149
      Colorado,8,2020-6-30,99,-22.6666666666667,62.1133333333333,Actual,5.4,1690,5758736
      Alabama,1,2020-6-30,93,-10.3333333333333,74.7933333333333,Actual,13.2,950,4903185
      Minnesota,27,2020-6-30,77,-26,50.1466666666666,Actual,8.6,1476,5639632
      Washington,53,2020-6-30,105,-29.6666666666667,63.2933333333333,Actual,6.4,1332,7614893
      Missouri,29,2020-6-30,77,-16,61.9133333333333,Actual,6,988,6137428
      Tennessee,47,2020-6-30,78,-13.6666666666667,62.7266666666667,Actual,7.2,604,6829174
      Rhode Island,44,2020-6-30,74,-24.3333333333333,48.8766666666667,Actual,6.4,950,1059361
      Wisconsin,55,2020-6-30,95,-11,70.5333333333333,Actual,3.2,784,5822434
      Nevada,32,2020-6-30,78,-25,48.8733333333333,Actual,5,507,3080156
      Iowa,19,2020-6-30,87,-11,70.3833333333333,Actual,3,716,3155070
      Oklahoma,40,2020-6-30,81,-7,69.85,Actual,2.2,387,3956971
      Kentucky,21,2020-6-30,91,-13.3333333333333,69.3233333333333,Actual,5.4,565,4467673
      New York,36,2020-7-1,94,-36.6666666666667,46.0733333333333,Actual,38.8,32043,26161672
      New Jersey,34,2020-7-1,90,-34,46.18,Actual,37.8,15078,8882190
      California,6,2020-7-1,91,-34.3333333333333,52.23,Actual,76.6,6169,39512223
      Texas,48,2020-7-1,100,-24.6666666666667,68.0166666666667,Actual,55.8,2770,28995881
      Massachusetts,25,2020-7-1,85,-34.6666666666667,45.6933333333333,Actual,17.8,8080,6892503
      Florida,12,2020-7-1,99,-30.3333333333333,59.6033333333333,Actual,53,3550,21477737
      Illinois,17,2020-7-1,85,-23.3333333333333,54.2333333333333,Actual,23.4,6951,12671821
      Pennsylvania,42,2020-7-1,85,-21.6666666666667,54.2566666666667,Actual,28,6684,12801989
      Michigan,26,2020-7-1,87,-12,57.4966666666667,Actual,11.6,6125,9986857
      Connecticut,9,2020-7-1,100,-21.3333333333333,63.46,Actual,3.8,4324,3565287
      Louisiana,22,2020-7-1,104,-12.6666666666667,72.95,Actual,15.8,3238,4648794
      Georgia,13,2020-7-1,105,-23,69.8999999999999,Actual,15.8,2827,10617423
      Arizona,4,2020-7-1,97,-28.6666666666667,65.3766666666667,Actual,40.8,1725,7278717
      Ohio,39,2020-7-1,83,-8,64.6833333333333,Actual,19.2,2876,11689100
      Maryland,24,2020-7-1,79,-27,49.5333333333333,Actual,11,3205,6045680
      Indiana,18,2020-7-1,84,-4,68.5666666666667,Actual,12.4,2650,6732219
      Virginia,51,2020-7-1,94,-24,60.45,Actual,22.6,1786,8535519
      North Carolina,37,2020-7-1,92,-20,64.2066666666667,Actual,13.4,1398,10488084
      South Carolina,45,2020-7-1,94,-7.66666666666667,75.4533333333333,Actual,15.4,766,5148714
      Mississippi,28,2020-7-1,96,-3.66666666666667,79.59,Actual,12.8,1082,2976149
      Colorado,8,2020-7-1,100,-22,62.8933333333333,Actual,5,1697,5758736
      Alabama,1,2020-7-1,94,-7.66666666666667,75.7166666666666,Actual,17.4,972,4903185
      Minnesota,27,2020-7-1,78,-24,50.9066666666666,Actual,8.6,1482,5639632
      Washington,53,2020-7-1,106,-28.6666666666667,64.0066666666666,Actual,8.4,1339,7614893
      Missouri,29,2020-7-1,78,-7,62.8433333333333,Actual,6.6,1002,6137428
      Tennessee,47,2020-7-1,79,-11.6666666666667,63.61,Actual,9.8,609,6829174
      Rhode Island,44,2020-7-1,75,-24.3333333333333,49.6333333333333,Actual,6.6,956,1059361
      Wisconsin,55,2020-7-1,96,-8.33333333333333,71.45,Actual,3.8,786,5822434
      Nevada,32,2020-7-1,79,-24,49.6333333333333,Actual,5.6,511,3080156
      Iowa,19,2020-7-1,88,-5.66666666666667,71.3266666666667,Actual,3,717,3155070
      Oklahoma,40,2020-7-1,82,-3,70.82,Actual,2.6,389,3956971
      Kentucky,21,2020-7-1,92,-10.3333333333333,70.22,Actual,5.4,572,4467673
      New York,36,2020-7-2,95,-34.3333333333333,46.73,Actual,39.2,32064,26161672
      New Jersey,34,2020-7-2,91,-30,46.88,Actual,39.4,15107,8882190
      California,6,2020-7-2,92,-33.6666666666667,52.8933333333333,Actual,70.2,6265,39512223
      Texas,48,2020-7-2,101,-25,68.7666666666667,Actual,59.2,2835,28995881
      Massachusetts,25,2020-7-2,86,-31.3333333333333,46.38,Actual,15.4,8131,6892503
      Florida,12,2020-7-2,100,-29,60.3133333333333,Actual,51,3617,21477737
      Illinois,17,2020-7-2,86,-21.6666666666667,55.0166666666667,Actual,22.4,6987,12671821
      Pennsylvania,42,2020-7-2,86,-20.3333333333333,55.0533333333333,Actual,27,6712,12801989
      Michigan,26,2020-7-2,88,-11,58.3866666666667,Actual,11.4,6139,9986857
      Connecticut,9,2020-7-2,101,-16.3333333333333,64.2966666666667,Actual,3,4326,3565287
      Louisiana,22,2020-7-2,105,-13.6666666666667,73.8133333333333,Actual,15.8,3255,4648794
      Georgia,13,2020-7-2,106,-21.6666666666667,70.6833333333333,Actual,14.6,2849,10617423
      Arizona,4,2020-7-2,98,-28,66.0966666666667,Actual,43.8,1764,7278717
      Ohio,39,2020-7-2,84,-7.33333333333333,65.61,Actual,17.8,2903,11689100
      Maryland,24,2020-7-2,80,-25,50.2833333333333,Actual,12.2,3212,6045680
      Indiana,18,2020-7-2,85,-1.66666666666667,69.55,Actual,12.6,2662,6732219
      Virginia,51,2020-7-2,95,-22,61.23,Actual,21.8,1816,8535519
      North Carolina,37,2020-7-2,93,-18,65.0266666666667,Actual,13,1409,10488084
      South Carolina,45,2020-7-2,95,-5.66666666666667,76.3966666666667,Actual,18.6,784,5148714
      Mississippi,28,2020-7-2,97,-3.66666666666667,80.5533333333334,Actual,9.6,1092,2976149
      Colorado,8,2020-7-2,101,-21.3333333333333,63.68,Actual,4,1701,5758736
      Alabama,1,2020-7-2,95,-5.33333333333333,76.6633333333333,Actual,15.6,985,4903185
      Minnesota,27,2020-7-2,79,-25,51.6566666666666,Actual,6.6,1495,5639632
      Washington,53,2020-7-2,107,-27.6666666666667,64.73,Actual,6.8,1342,7614893
      Missouri,29,2020-7-2,79,-8.66666666666667,63.7566666666667,Actual,6.8,1013,6137428
      Tennessee,47,2020-7-2,80,-9.66666666666667,64.5133333333333,Actual,9,620,6829174
      Rhode Island,44,2020-7-2,76,-17.3333333333333,50.46,Actual,2.8,959,1059361
      Wisconsin,55,2020-7-2,97,-7,72.38,Actual,3.8,793,5822434
      Nevada,32,2020-7-2,80,-24,50.3933333333333,Actual,5.2,525,3080156
      Iowa,19,2020-7-2,89,-5,72.2766666666667,Actual,2,719,3155070
      Oklahoma,40,2020-7-2,83,-3.66666666666667,71.7833333333333,Actual,2.6,395,3956971
      Kentucky,21,2020-7-2,93,-8.66666666666667,71.1333333333333,Actual,5,581,4467673
      New York,36,2020-7-3,96,-44.3333333333333,47.2866666666667,Actual,34.8,32137,26161672
      New Jersey,34,2020-7-3,92,-38.6666666666667,47.4933333333333,Actual,35.2,15164,8882190
      California,6,2020-7-3,93,-41,53.4833333333333,Actual,58.2,6315,39512223
      Texas,48,2020-7-3,102,-33.3333333333333,69.4333333333334,Actual,58.4,2907,28995881
      Massachusetts,25,2020-7-3,87,-41.6666666666667,46.9633333333333,Actual,25.8,8148,6892503
      Florida,12,2020-7-3,101,-38,60.9333333333333,Actual,45.2,3684,21477737
      Illinois,17,2020-7-3,87,-31,55.7066666666667,Actual,19.4,7005,12671821
      Pennsylvania,42,2020-7-3,87,-32.6666666666667,55.7266666666667,Actual,20.8,6746,12801989
      Michigan,26,2020-7-3,89,-26,59.1266666666667,Actual,5,6142,9986857
      Connecticut,9,2020-7-3,102,-31,64.9866666666667,Actual,2.6,4335,3565287
      Louisiana,22,2020-7-3,106,-27.6666666666667,74.5366666666666,Actual,13.4,3278,4648794
      Georgia,13,2020-7-3,107,-31.6666666666667,71.3666666666666,Actual,11,2857,10617423
      Arizona,4,2020-7-3,99,-37.3333333333333,66.7233333333334,Actual,36,1798,7278717
      Ohio,39,2020-7-3,85,-21,66.4,Actual,9.6,2903,11689100
      Maryland,24,2020-7-3,81,-34.6666666666667,50.9366666666667,Actual,10.6,3223,6045680
      Indiana,18,2020-7-3,86,-15.6666666666667,70.3933333333333,Actual,10.6,2681,6732219
      Virginia,51,2020-7-3,96,-31.6666666666667,61.9133333333333,Actual,18,1845,8535519
      North Carolina,37,2020-7-3,94,-28,65.7466666666667,Actual,8.6,1419,10488084
      South Carolina,45,2020-7-3,96,-16,77.2366666666667,Actual,16.2,793,5148714
      Mississippi,28,2020-7-3,98,-15.3333333333333,81.4,Actual,7.6,1103,2976149
      Colorado,8,2020-7-3,102,-31,64.37,Actual,2.2,1701,5758736
      Alabama,1,2020-7-3,96,-19.3333333333333,77.4699999999999,Actual,11.4,1006,4903185
      Minnesota,27,2020-7-3,80,-37.3333333333333,52.2833333333333,Actual,6.4,1503,5639632
      Washington,53,2020-7-3,108,-36,65.37,Actual,5.4,1352,7614893
      Missouri,29,2020-7-3,80,-14,64.6166666666667,Actual,6.4,1016,6137428
      Tennessee,47,2020-7-3,81,-21.6666666666667,65.2966666666667,Actual,8.2,633,6829174
      Rhode Island,44,2020-7-3,77,-27.3333333333333,51.1866666666667,Actual,2,960,1059361
      Wisconsin,55,2020-7-3,98,-19.6666666666667,73.1833333333334,Actual,2.4,796,5822434
      Nevada,32,2020-7-3,81,-31.6666666666667,51.0766666666667,Actual,5.4,528,3080156
      Iowa,19,2020-7-3,90,-14.6666666666667,73.13,Actual,1,721,3155070
      Oklahoma,40,2020-7-3,84,-15.3333333333333,72.63,Actual,2.2,398,3956971
      Kentucky,21,2020-7-3,94,-20,71.9333333333333,Actual,4,585,4467673
      New York,36,2020-7-4,97,-39.3333333333333,47.8933333333333,Actual,35.2,32157,26161672
      New Jersey,34,2020-7-4,93,-34.3333333333333,48.15,Actual,30.2,15189,8882190
      California,6,2020-7-4,94,-40.3333333333333,54.08,Actual,54.4,6334,39512223
      Texas,48,2020-7-4,103,-33.6666666666667,70.0966666666667,Actual,58.4,2951,28995881
      Massachusetts,25,2020-7-4,88,-38,47.5833333333333,Actual,23.4,8171,6892503
      Florida,12,2020-7-4,102,-40,61.5333333333333,Actual,45.6,3702,21477737
      Illinois,17,2020-7-4,88,-31.3333333333333,56.3933333333333,Actual,15,7014,12671821
      Pennsylvania,42,2020-7-4,88,-33,56.3966666666667,Actual,14,6749,12801989
      Michigan,26,2020-7-4,90,-24,59.8866666666667,Actual,4.6,6145,9986857
      Connecticut,9,2020-7-4,103,-28,65.7066666666667,Actual,2.8,4335,3565287
      Louisiana,22,2020-7-4,107,-31,75.2266666666666,Actual,11.6,3278,4648794
      Georgia,13,2020-7-4,108,-34.6666666666667,72.0199999999999,Actual,10.2,2857,10617423
      Arizona,4,2020-7-4,100,-36.6666666666667,67.3566666666667,Actual,20.8,1817,7278717
      Ohio,39,2020-7-4,86,-23,67.17,Actual,10.2,2907,11689100
      Maryland,24,2020-7-4,82,-29,51.6466666666667,Actual,8.2,3236,6045680
      Indiana,18,2020-7-4,87,-18,71.2133333333333,Actual,9.6,2687,6732219
      Virginia,51,2020-7-4,97,-29,62.6233333333333,Actual,13.4,1849,8535519
      North Carolina,37,2020-7-4,95,-27.6666666666667,66.47,Actual,6.8,1422,10488084
      South Carolina,45,2020-7-4,97,-21.6666666666667,78.02,Actual,12.2,813,5148714
      Mississippi,28,2020-7-4,99,-25,82.15,Actual,6.4,1107,2976149
      Colorado,8,2020-7-4,103,-31.6666666666667,65.0533333333333,Actual,-1.2,1701,5758736
      Alabama,1,2020-7-4,97,-24,78.2299999999999,Actual,7,1007,4903185
      Minnesota,27,2020-7-4,81,-35,52.9333333333333,Actual,5.8,1503,5639632
      Washington,53,2020-7-4,109,-32.6666666666667,66.0433333333333,Actual,6,1354,7614893
      Missouri,29,2020-7-4,81,-23.3333333333333,65.3833333333333,Actual,3.6,1019,6137428
      Tennessee,47,2020-7-4,82,-25.3333333333333,66.0433333333334,Actual,8.6,637,6829174
      Rhode Island,44,2020-7-4,78,-29.3333333333333,51.8933333333333,Actual,0.8,960,1059361
      Wisconsin,55,2020-7-4,99,-17.6666666666667,74.0066666666667,Actual,2,796,5822434
      Nevada,32,2020-7-4,82,-32,51.7566666666667,Actual,5.2,530,3080156
      Iowa,19,2020-7-4,91,-21.6666666666667,73.9133333333333,Actual,1.2,721,3155070
      Oklahoma,40,2020-7-4,85,-20,73.43,Actual,2,398,3956971
      Kentucky,21,2020-7-4,95,-20,72.7333333333333,Actual,4.2,585,4467673
      New York,36,2020-7-5,98,-30,48.5933333333333,Actual,35.8,32206,26161672
      New Jersey,34,2020-7-5,94,-25,48.9,Actual,34.8,15211,8882190
      California,6,2020-7-5,95,-31.3333333333333,54.7666666666666,Actual,61.6,6373,39512223
      Texas,48,2020-7-5,104,-27.3333333333333,70.8233333333334,Actual,71.4,3000,28995881
      Massachusetts,25,2020-7-5,89,-24.3333333333333,48.34,Actual,16.2,8182,6892503
      Florida,12,2020-7-5,103,-33.3333333333333,62.2,Actual,44.8,3731,21477737
      Illinois,17,2020-7-5,89,-19.6666666666667,57.1966666666667,Actual,57.2,7020,12671821
      Pennsylvania,42,2020-7-5,89,-18.3333333333333,57.2133333333333,Actual,15,6753,12801989
      Michigan,26,2020-7-5,91,-7.33333333333333,60.8133333333333,Actual,7.8,6145,9986857
      Connecticut,9,2020-7-5,104,-12.6666666666667,66.58,Actual,2.4,4335,3565287
      Louisiana,22,2020-7-5,108,-23,75.9966666666666,Actual,12.8,3288,4648794
      Georgia,13,2020-7-5,109,-24.3333333333333,72.7766666666666,Actual,10,2860,10617423
      Arizona,4,2020-7-5,101,-29,68.0666666666667,Actual,32.6,1825,7278717
      Ohio,39,2020-7-5,87,-8.66666666666667,68.0833333333333,Actual,13.4,2911,11689100
      Maryland,24,2020-7-5,83,-20.6666666666667,52.44,Actual,10.8,3243,6045680
      Indiana,18,2020-7-5,88,-2,72.1933333333333,Actual,11,2693,6732219
      Virginia,51,2020-7-5,98,-19.6666666666667,63.4266666666667,Actual,13,1853,8535519
      North Carolina,37,2020-7-5,96,-20.3333333333333,67.2666666666667,Actual,7.4,1423,10488084
      South Carolina,45,2020-7-5,98,-5.33333333333333,78.9666666666667,Actual,12.4,820,5148714
      Mississippi,28,2020-7-5,100,-9,83.06,Actual,13.2,1111,2976149
      Colorado,8,2020-7-5,104,-20,65.8533333333333,Actual,-1,1701,5758736
      Alabama,1,2020-7-5,98,-9.33333333333333,79.1366666666666,Actual,9.6,1007,4903185
      Minnesota,27,2020-7-5,82,-22,53.7133333333333,Actual,3.8,1508,5639632
      Washington,53,2020-7-5,110,-18.6666666666667,66.8566666666666,Actual,8.4,1359,7614893
      Missouri,29,2020-7-5,82,-9.33333333333333,66.29,Actual,4.6,1020,6137428
      Tennessee,47,2020-7-5,83,-14.3333333333333,66.9,Actual,9,645,6829174
      Rhode Island,44,2020-7-5,79,-12,52.7733333333333,Actual,2,960,1059361
      Wisconsin,55,2020-7-5,100,-3.33333333333333,74.9733333333334,Actual,2.4,796,5822434
      Nevada,32,2020-7-5,83,-26.6666666666667,52.49,Actual,4.6,534,3080156
      Iowa,19,2020-7-5,92,-5,74.8633333333333,Actual,2.6,721,3155070
      Oklahoma,40,2020-7-5,86,-7.33333333333333,74.3566666666667,Actual,1.8,398,3956971
      Kentucky,21,2020-7-5,96,-9.66666666666667,73.6366666666666,Actual,4.2,585,4467673
      New York,36,2020-7-6,99,-40.3333333333333,49.19,Actual,22.8,32219,26161672
      New Jersey,34,2020-7-6,95,-37,49.53,Actual,33.6,15229,8882190
      California,6,2020-7-6,96,-36.3333333333333,55.4033333333333,Actual,80.6,6441,39512223
      Texas,48,2020-7-6,105,-29.6666666666667,71.5266666666667,Actual,82.4,3062,28995881
      Massachusetts,25,2020-7-6,90,-35.3333333333333,48.9866666666667,Actual,18.8,8197,6892503
      Florida,12,2020-7-6,104,-33.3333333333333,62.8666666666667,Actual,41,3778,21477737
      Illinois,17,2020-7-6,90,-28,57.9166666666667,Actual,60.8,7026,12671821
      Pennsylvania,42,2020-7-6,90,-28.3333333333333,57.93,Actual,13.2,6754,12801989
      Michigan,26,2020-7-6,92,-17.6666666666667,61.6366666666667,Actual,9.4,6148,9986857
      Connecticut,9,2020-7-6,105,-21.6666666666667,67.3633333333333,Actual,1.6,4338,3565287
      Louisiana,22,2020-7-6,109,-21.6666666666667,76.78,Actual,12.2,3296,4648794
      Georgia,13,2020-7-6,110,-28.3333333333333,73.4933333333333,Actual,13,2878,10617423
      Arizona,4,2020-7-6,102,-31,68.7566666666667,Actual,33,1829,7278717
      Ohio,39,2020-7-6,88,-13.3333333333333,68.95,Actual,17.6,2927,11689100
      Maryland,24,2020-7-6,84,-32,53.12,Actual,10.4,3246,6045680
      Indiana,18,2020-7-6,89,-7.33333333333333,73.12,Actual,10.2,2698,6732219
      Virginia,51,2020-7-6,99,-27.3333333333333,64.1533333333334,Actual,12,1853,8535519
      North Carolina,37,2020-7-6,97,-21.3333333333333,68.0533333333333,Actual,8.6,1432,10488084
      South Carolina,45,2020-7-6,99,-12,79.8466666666667,Actual,18.2,827,5148714
      Mississippi,28,2020-7-6,101,-7.66666666666667,83.9833333333333,Actual,17,1114,2976149
      Colorado,8,2020-7-6,105,-23.6666666666667,66.6166666666667,Actual,0.6,1691,5758736
      Alabama,1,2020-7-6,99,-11,80.0266666666666,Actual,10.4,1007,4903185
      Minnesota,27,2020-7-6,83,-28.6666666666667,54.4266666666666,Actual,4,1511,5639632
      Washington,53,2020-7-6,111,-29.6666666666667,67.56,Actual,8.4,1369,7614893
      Missouri,29,2020-7-6,83,-15.6666666666667,67.1333333333333,Actual,4.4,1020,6137428
      Tennessee,47,2020-7-6,84,-14,67.76,Actual,10.4,652,6829174
      Rhode Island,44,2020-7-6,80,-24.3333333333333,53.53,Actual,2.2,960,1059361
      Wisconsin,55,2020-7-6,101,-13.3333333333333,75.84,Actual,2.2,796,5822434
      Nevada,32,2020-7-6,84,-26.6666666666667,53.2233333333333,Actual,5,537,3080156
      Iowa,19,2020-7-6,93,-11.6666666666667,75.7466666666667,Actual,3,723,3155070
      Oklahoma,40,2020-7-6,87,-10.3333333333333,75.2533333333333,Actual,1.8,399,3956971
      Kentucky,21,2020-7-6,97,-14.3333333333333,74.4933333333333,Actual,4.6,593,4467673
      New York,36,2020-7-7,100,-38,49.81,Actual,25.2,32243,26161672
      New Jersey,34,2020-7-7,96,-33.3333333333333,50.1966666666667,Actual,51.8,15281,8882190
      California,6,2020-7-7,97,-36,56.0433333333333,Actual,105,6573,39512223
      Texas,48,2020-7-7,106,-28.6666666666667,72.24,Actual,104.2,3192,28995881
      Massachusetts,25,2020-7-7,91,-35,49.6366666666667,Actual,19.2,8212,6892503
      Florida,12,2020-7-7,105,-32.3333333333333,63.5433333333333,Actual,61.4,3841,21477737
      Illinois,17,2020-7-7,91,-27.3333333333333,58.6433333333333,Actual,63,7273,12671821
      Pennsylvania,42,2020-7-7,91,-24.3333333333333,58.6866666666667,Actual,19.8,6787,12801989
      Michigan,26,2020-7-7,93,-17.3333333333333,62.4633333333333,Actual,10.6,6178,9986857
      Connecticut,9,2020-7-7,106,-23.6666666666667,68.1266666666667,Actual,2.6,4338,3565287
      Louisiana,22,2020-7-7,110,-21,77.57,Actual,15.4,3319,4648794
      Georgia,13,2020-7-7,111,-27.6666666666667,74.2166666666666,Actual,14.6,2899,10617423
      Arizona,4,2020-7-7,103,-30.3333333333333,69.4533333333334,Actual,44.2,1927,7278717
      Ohio,39,2020-7-7,89,-13.3333333333333,69.8166666666666,Actual,19.8,2970,11689100
      Maryland,24,2020-7-7,85,-29.6666666666667,53.8233333333334,Actual,10.4,3266,6045680
      Indiana,18,2020-7-7,90,-8,74.04,Actual,10.4,2717,6732219
      Virginia,51,2020-7-7,100,-26.6666666666667,64.8866666666667,Actual,17.6,1881,8535519
      North Carolina,37,2020-7-7,98,-22.3333333333333,68.83,Actual,11,1446,10488084
      South Carolina,45,2020-7-7,100,-14.3333333333333,80.7033333333333,Actual,18.4,846,5148714
      Mississippi,28,2020-7-7,102,-8.33333333333333,84.9,Actual,19.4,1158,2976149
      Colorado,8,2020-7-7,106,-25,67.3666666666667,Actual,1,1696,5758736
      Alabama,1,2020-7-7,100,-13,80.8966666666666,Actual,12.2,1033,4903185
      Minnesota,27,2020-7-7,84,-27,55.1566666666666,Actual,5,1514,5639632
      Washington,53,2020-7-7,112,-30.6666666666667,68.2533333333333,Actual,11,1384,7614893
      Missouri,29,2020-7-7,84,-16,67.9733333333333,Actual,4.6,1036,6137428
      Tennessee,47,2020-7-7,85,-14.3333333333333,68.6166666666667,Actual,14.6,665,6829174
      Rhode Island,44,2020-7-7,81,-23.3333333333333,54.2966666666667,Actual,2.8,969,1059361
      Wisconsin,55,2020-7-7,102,-15.6666666666667,76.6833333333334,Actual,2.6,805,5822434
      Nevada,32,2020-7-7,85,-26.3333333333333,53.96,Actual,8.2,548,3080156
      Iowa,19,2020-7-7,94,-13,76.6166666666667,Actual,4,732,3155070
      Oklahoma,40,2020-7-7,88,-10,76.1533333333333,Actual,2.4,404,3956971
      Kentucky,21,2020-7-7,98,-13.3333333333333,75.36,Actual,5.4,602,4467673
      New York,36,2020-7-8,101,-38.3333333333333,50.4266666666667,Actual,25,32251,26161672
      New Jersey,34,2020-7-8,97,-34.6666666666667,50.85,Actual,53.6,15332,8882190
      California,6,2020-7-8,98,-36.3333333333333,56.68,Actual,116.4,6718,39512223
      Texas,48,2020-7-8,107,-27.6666666666667,72.9633333333334,Actual,111.2,3319,28995881
      Massachusetts,25,2020-7-8,92,-36,50.2766666666667,Actual,22.6,8242,6892503
      Florida,12,2020-7-8,106,-32.3333333333333,64.22,Actual,74.2,3889,21477737
      Illinois,17,2020-7-8,92,-26.3333333333333,59.38,Actual,65,7309,12671821
      Pennsylvania,42,2020-7-8,92,-25,59.4366666666667,Actual,25.4,6812,12801989
      Michigan,26,2020-7-8,94,-16,63.3033333333333,Actual,13.4,6189,9986857
      Connecticut,9,2020-7-8,107,-24.6666666666667,68.88,Actual,2.6,4343,3565287
      Louisiana,22,2020-7-8,111,-16.6666666666667,78.4033333333333,Actual,18.4,3339,4648794
      Georgia,13,2020-7-8,112,-26,74.9566666666666,Actual,21,2922,10617423
      Arizona,4,2020-7-8,104,-31,70.1433333333334,Actual,51.4,1963,7278717
      Ohio,39,2020-7-8,90,-12.3333333333333,70.6933333333333,Actual,24.2,2991,11689100
      Maryland,24,2020-7-8,86,-29,54.5333333333334,Actual,12,3275,6045680
      Indiana,18,2020-7-8,91,-8,74.96,Actual,11,2732,6732219
      Virginia,51,2020-7-8,101,-26,65.6266666666667,Actual,21,1905,8535519
      North Carolina,37,2020-7-8,99,-23,69.6,Actual,14.8,1462,10488084
      South Carolina,45,2020-7-8,101,-12.6666666666667,81.5766666666667,Actual,21.8,884,5148714
      Mississippi,28,2020-7-8,103,-8.66666666666667,85.8133333333333,Actual,20.8,1188,2976149
      Colorado,8,2020-7-8,107,-24.3333333333333,68.1233333333333,Actual,4.6,1704,5758736
      Alabama,1,2020-7-8,101,-11,81.7866666666666,Actual,19.4,1058,4903185
      Minnesota,27,2020-7-8,85,-27,55.8866666666666,Actual,5,1523,5639632
      Washington,53,2020-7-8,113,-30,68.9533333333333,Actual,13,1394,7614893
      Missouri,29,2020-7-8,85,-11,68.8633333333333,Actual,6.4,1038,6137428
      Tennessee,47,2020-7-8,86,-14.6666666666667,69.47,Actual,15.6,685,6829174
      Rhode Island,44,2020-7-8,82,-24.3333333333333,55.0533333333333,Actual,3.2,971,1059361
      Wisconsin,55,2020-7-8,103,-13.3333333333333,77.55,Actual,3.6,807,5822434
      Nevada,32,2020-7-8,86,-26.3333333333333,54.6966666666667,Actual,9,553,3080156
      Iowa,19,2020-7-8,95,-10.3333333333333,77.5133333333333,Actual,4.4,736,3155070
      Oklahoma,40,2020-7-8,89,-7.66666666666667,77.0766666666667,Actual,3.6,407,3956971
      Kentucky,21,2020-7-8,99,-13.6666666666667,76.2233333333333,Actual,7,608,4467673
      New York,36,2020-7-9,102,-36.6666666666667,51.06,Actual,24.8,32283,26161672
      New Jersey,34,2020-7-9,98,-33.6666666666667,51.5133333333333,Actual,59.2,15448,8882190
      California,6,2020-7-9,99,-36.6666666666667,57.3133333333333,Actual,117.2,6859,39512223
      Texas,48,2020-7-9,108,-28,73.6833333333334,Actual,115.2,3472,28995881
      Massachusetts,25,2020-7-9,93,-34.3333333333333,50.9333333333333,Actual,22.4,8267,6892503
      Florida,12,2020-7-9,107,-32.3333333333333,64.8966666666667,Actual,83.8,4009,21477737
      Illinois,17,2020-7-9,93,-27,60.11,Actual,68.6,7329,12671821
      Pennsylvania,42,2020-7-9,93,-24.6666666666667,60.19,Actual,28.6,6848,12801989
      Michigan,26,2020-7-9,95,-17.3333333333333,64.13,Actual,18.4,6198,9986857
      Connecticut,9,2020-7-9,108,-22,69.66,Actual,2,4348,3565287
      Louisiana,22,2020-7-9,112,-18.3333333333333,79.22,Actual,21.4,3355,4648794
      Georgia,13,2020-7-9,113,-26.6666666666667,75.6899999999999,Actual,23.6,2930,10617423
      Arizona,4,2020-7-9,105,-31.6666666666667,70.8266666666667,Actual,64.4,2038,7278717
      Ohio,39,2020-7-9,91,-14,71.5533333333333,Actual,21.8,3006,11689100
      Maryland,24,2020-7-9,87,-29.3333333333333,55.24,Actual,12.8,3288,6045680
      Indiana,18,2020-7-9,92,-8,75.88,Actual,11.6,2739,6732219
      Virginia,51,2020-7-9,102,-27,66.3566666666667,Actual,21.8,1937,8535519
      North Carolina,37,2020-7-9,100,-22.6666666666667,70.3733333333333,Actual,16.2,1477,10488084
      South Carolina,45,2020-7-9,102,-12.6666666666667,82.45,Actual,24.8,905,5148714
      Mississippi,28,2020-7-9,104,-9.33333333333333,86.72,Actual,23.2,1204,2976149
      Colorado,8,2020-7-9,108,-24.3333333333333,68.88,Actual,6.8,1706,5758736
      Alabama,1,2020-7-9,102,-11.3333333333333,82.6733333333333,Actual,21.4,1068,4903185
      Minnesota,27,2020-7-9,86,-28,56.6066666666666,Actual,5.2,1528,5639632
      Washington,53,2020-7-9,114,-31.3333333333333,69.64,Actual,11,1409,7614893
      Missouri,29,2020-7-9,86,-15,69.7133333333333,Actual,7.4,1042,6137428
      Tennessee,47,2020-7-9,87,-15.3333333333333,70.3166666666667,Actual,17.2,710,6829174
      Rhode Island,44,2020-7-9,83,-23,55.8233333333333,Actual,3.2,974,1059361
      Wisconsin,55,2020-7-9,104,-16,78.39,Actual,5,809,5822434
      Nevada,32,2020-7-9,87,-28,55.4166666666667,Actual,11,571,3080156
      Iowa,19,2020-7-9,96,-13,78.3833333333334,Actual,5,741,3155070
      Oklahoma,40,2020-7-9,90,-10.3333333333333,77.9733333333333,Actual,4.4,410,3956971
      Kentucky,21,2020-7-9,100,-14.6666666666667,77.0766666666666,Actual,5.8,612,4467673
      New York,36,2020-7-10,103,-44.6666666666667,51.6133333333333,Actual,21.4,32331,26161672
      New Jersey,34,2020-7-10,99,-44.3333333333333,52.07,Actual,48.8,15479,8882190
      California,6,2020-7-10,100,-37.6666666666667,57.9366666666666,Actual,95.6,6955,39512223
      Texas,48,2020-7-10,109,-29.6666666666667,74.3866666666667,Actual,109.4,3556,28995881
      Massachusetts,25,2020-7-10,94,-37,51.5633333333333,Actual,22.4,8295,6892503
      Florida,12,2020-7-10,108,-34.6666666666667,65.55,Actual,80.2,4102,21477737
      Illinois,17,2020-7-10,94,-26.3333333333333,60.8466666666667,Actual,23,7345,12671821
      Pennsylvania,42,2020-7-10,94,-32,60.87,Actual,23.4,6880,12801989
      Michigan,26,2020-7-10,96,-22.6666666666667,64.9033333333333,Actual,12.6,6212,9986857
      Connecticut,9,2020-7-10,109,-28.6666666666667,70.3733333333333,Actual,2,4348,3565287
      Louisiana,22,2020-7-10,113,-22,80,Actual,19.4,3380,4648794
      Georgia,13,2020-7-10,114,-27,76.4199999999999,Actual,20.8,2965,10617423
      Arizona,4,2020-7-10,106,-33.3333333333333,71.4933333333334,Actual,62,2082,7278717
      Ohio,39,2020-7-10,92,-16.3333333333333,72.39,Actual,17.6,3032,11689100
      Maryland,24,2020-7-10,88,-30.6666666666667,55.9333333333334,Actual,10.6,3303,6045680
      Indiana,18,2020-7-10,93,-9.66666666666667,76.7833333333333,Actual,8.6,2748,6732219
      Virginia,51,2020-7-10,103,-27.6666666666667,67.08,Actual,17,1958,8535519
      North Carolina,37,2020-7-10,101,-22.3333333333333,71.15,Actual,15.2,1497,10488084
      South Carolina,45,2020-7-10,103,-13,83.32,Actual,23,929,5148714
      Mississippi,28,2020-7-10,105,-12.3333333333333,87.5966666666667,Actual,18.2,1215,2976149
      Colorado,8,2020-7-10,109,-26,69.62,Actual,5.8,1724,5758736
      Alabama,1,2020-7-10,103,-14,83.5333333333333,Actual,17.6,1104,4903185
      Minnesota,27,2020-7-10,87,-28,57.3266666666666,Actual,5.2,1533,5639632
      Washington,53,2020-7-10,115,-30.3333333333333,70.3366666666666,Actual,10.8,1424,7614893
      Missouri,29,2020-7-10,87,-9,70.6233333333333,Actual,4.4,1052,6137428
      Tennessee,47,2020-7-10,88,-17,71.1466666666667,Actual,15.2,723,6829174
      Rhode Island,44,2020-7-10,84,-28.6666666666667,56.5366666666667,Actual,1.4,976,1059361
      Wisconsin,55,2020-7-10,105,-13.3333333333333,79.2566666666667,Actual,3,814,5822434
      Nevada,32,2020-7-10,88,-29.6666666666667,56.12,Actual,9,579,3080156
      Iowa,19,2020-7-10,97,-8.33333333333333,79.3,Actual,4,743,3155070
      Oklahoma,40,2020-7-10,91,-12.6666666666667,78.8466666666666,Actual,3.6,416,3956971
      Kentucky,21,2020-7-10,101,-15.6666666666667,77.92,Actual,4.6,620,4467673
      New York,36,2020-7-11,104,-28,52.3333333333333,Actual,28.8,32343,26161672
      New Jersey,34,2020-7-11,100,-21,52.86,Actual,45.6,15525,8882190
      California,6,2020-7-11,101,-28.3333333333333,58.6533333333333,Actual,74.2,7027,39512223
      Texas,48,2020-7-11,110,-21.6666666666667,75.17,Actual,101.6,3638,28995881
      Massachusetts,25,2020-7-11,95,-22.6666666666667,52.3366666666667,Actual,17.4,8309,6892503
      Florida,12,2020-7-11,109,-30,66.25,Actual,77.6,4197,21477737
      Illinois,17,2020-7-11,95,-12.6666666666667,61.72,Actual,17,7369,12671821
      Pennsylvania,42,2020-7-11,95,-15,61.72,Actual,19.8,6897,12801989
      Michigan,26,2020-7-11,97,-5,65.8533333333333,Actual,11.8,6240,9986857
      Connecticut,9,2020-7-11,110,-13.3333333333333,71.24,Actual,5.6,4348,3565287
      Louisiana,22,2020-7-11,114,-16,80.84,Actual,16.8,3403,4648794
      Georgia,13,2020-7-11,115,-17,77.2499999999999,Actual,20.8,2996,10617423
      Arizona,4,2020-7-11,107,-28,72.2133333333334,Actual,56.6,2151,7278717
      Ohio,39,2020-7-11,93,-5,73.34,Actual,14.6,3036,11689100
      Maryland,24,2020-7-11,89,-16,56.7733333333334,Actual,10,3310,6045680
      Indiana,18,2020-7-11,94,2.33333333333333,77.8066666666667,Actual,6,2756,6732219
      Virginia,51,2020-7-11,104,-14.6666666666667,67.9333333333334,Actual,12.6,1962,8535519
      North Carolina,37,2020-7-11,102,-12.3333333333333,72.0266666666667,Actual,13.4,1513,10488084
      South Carolina,45,2020-7-11,104,-3.33333333333333,84.2866666666667,Actual,17.6,951,5148714
      Mississippi,28,2020-7-11,106,-3.66666666666667,88.56,Actual,12.4,1230,2976149
      Colorado,8,2020-7-11,110,-17,70.45,Actual,4.6,1725,5758736
      Alabama,1,2020-7-11,104,-0.666666666666667,84.5266666666666,Actual,13.2,1114,4903185
      Minnesota,27,2020-7-11,88,-18.6666666666667,58.14,Actual,3.8,1537,5639632
      Washington,53,2020-7-11,116,-20,71.1366666666666,Actual,1,1424,7614893
      Missouri,29,2020-7-11,88,-8.33333333333333,71.54,Actual,6.6,1057,6137428
      Tennessee,47,2020-7-11,89,-6.66666666666667,72.08,Actual,12.8,738,6829174
      Rhode Island,44,2020-7-11,85,-16.6666666666667,57.37,Actual,2.6,976,1059361
      Wisconsin,55,2020-7-11,106,-1,80.2466666666667,Actual,2.6,821,5822434
      Nevada,32,2020-7-11,89,-27,56.85,Actual,8,592,3080156
      Iowa,19,2020-7-11,98,-1,80.29,Actual,3.8,748,3155070
      Oklahoma,40,2020-7-11,92,-6,79.7866666666666,Actual,3.4,421,3956971
      Kentucky,21,2020-7-11,102,-3.33333333333333,78.8866666666666,Actual,4.2,622,4467673
      New York,36,2020-7-12,105,-24.6666666666667,53.0866666666667,Actual,25,32350,26161672
      New Jersey,34,2020-7-12,101,-20.3333333333333,53.6566666666667,Actual,26.8,15525,8882190
      California,6,2020-7-12,102,-28.6666666666667,59.3666666666666,Actual,78.2,7051,39512223
      Texas,48,2020-7-12,111,-23.3333333333333,75.9366666666667,Actual,93.8,3739,28995881
      Massachusetts,25,2020-7-12,96,-20,53.1366666666667,Actual,14.4,8324,6892503
      Florida,12,2020-7-12,110,-30.3333333333333,66.9466666666667,Actual,80,4242,21477737
      Illinois,17,2020-7-12,96,-14,62.58,Actual,18,7388,12671821
      Pennsylvania,42,2020-7-12,96,-14,62.58,Actual,16.6,6904,12801989
      Michigan,26,2020-7-12,98,-3.33333333333333,66.82,Actual,11,6241,9986857
      Connecticut,9,2020-7-12,111,-10,72.14,Actual,4.8,4348,3565287
      Louisiana,22,2020-7-12,115,-18.6666666666667,81.6533333333333,Actual,18,3416,4648794
      Georgia,13,2020-7-12,116,-22.3333333333333,78.0266666666666,Actual,24.8,3003,10617423
      Arizona,4,2020-7-12,108,-27.3333333333333,72.94,Actual,59.8,2237,7278717
      Ohio,39,2020-7-12,94,-5.66666666666667,74.2833333333333,Actual,12.6,3058,11689100
      Maryland,24,2020-7-12,90,-18,57.5933333333334,Actual,9.2,3319,6045680
      Indiana,18,2020-7-12,95,0.333333333333333,78.81,Actual,7.2,2760,6732219
      Virginia,51,2020-7-12,105,-17.3333333333333,68.76,Actual,8,1966,8535519
      North Carolina,37,2020-7-12,103,-16,72.8666666666667,Actual,18.8,1522,10488084
      South Carolina,45,2020-7-12,105,-5,85.2366666666667,Actual,17.6,961,5148714
      Mississippi,28,2020-7-12,107,-6.66666666666667,89.4933333333334,Actual,13.6,1249,2976149
      Colorado,8,2020-7-12,111,-15.6666666666667,71.2933333333333,Actual,6.4,1725,5758736
      Alabama,1,2020-7-12,105,-9.66666666666667,85.43,Actual,19.2,1121,4903185
      Minnesota,27,2020-7-12,89,-14.6666666666667,58.9933333333333,Actual,4,1540,5639632
      Washington,53,2020-7-12,117,-16.3333333333333,71.9733333333333,Actual,-1,1438,7614893
      Missouri,29,2020-7-12,89,-4.66666666666667,72.4933333333333,Actual,7.2,1058,6137428
      Tennessee,47,2020-7-12,90,-12.6666666666667,72.9533333333334,Actual,11.4,741,6829174
      Rhode Island,44,2020-7-12,86,-7.66666666666667,58.2933333333333,Actual,2.2,976,1059361
      Wisconsin,55,2020-7-12,107,2.33333333333333,81.27,Actual,3.4,820,5822434
      Nevada,32,2020-7-12,90,-27.6666666666667,57.5733333333333,Actual,8.2,593,3080156
      Iowa,19,2020-7-12,99,1.66666666666667,81.3066666666667,Actual,3.2,752,3155070
      Oklahoma,40,2020-7-12,93,-3.66666666666667,80.75,Actual,3.6,422,3956971
      Kentucky,21,2020-7-12,103,-7.66666666666667,79.81,Actual,4.6,625,4467673
      New York,36,2020-7-13,106,-37.6666666666667,53.71,Actual,19.2,32395,26161672
      New Jersey,34,2020-7-13,102,-33.6666666666667,54.32,Actual,31,15560,8882190
      California,6,2020-7-13,103,-36.6666666666667,60,Actual,84,7089,39512223
      Texas,48,2020-7-13,112,-29.6666666666667,76.64,Actual,109.6,3827,28995881
      Massachusetts,25,2020-7-13,97,-35.6666666666667,53.78,Actual,14.4,8329,6892503
      Florida,12,2020-7-13,111,-33.3333333333333,67.6133333333333,Actual,83.8,4277,21477737
      Illinois,17,2020-7-13,97,-27,63.31,Actual,16.4,7394,12671821
      Pennsylvania,42,2020-7-13,97,-25.3333333333333,63.3266666666667,Actual,15.4,6911,12801989
      Michigan,26,2020-7-13,99,-17,67.65,Actual,9,6248,9986857
      Connecticut,9,2020-7-13,112,-22.3333333333333,72.9166666666667,Actual,6.4,4371,3565287
      Louisiana,22,2020-7-13,116,-21.3333333333333,82.44,Actual,16.2,3423,4648794
      Georgia,13,2020-7-13,117,-27.3333333333333,78.7533333333333,Actual,25.2,3026,10617423
      Arizona,4,2020-7-13,109,-32.3333333333333,73.6166666666667,Actual,70.4,2246,7278717
      Ohio,39,2020-7-13,95,-13.6666666666667,75.1466666666666,Actual,8.6,3064,11689100
      Maryland,24,2020-7-13,91,-30.6666666666667,58.2866666666667,Actual,7.6,3325,6045680
      Indiana,18,2020-7-13,96,-7.66666666666667,79.7333333333333,Actual,7.4,2762,6732219
      Virginia,51,2020-7-13,106,-27.6666666666667,69.4833333333333,Actual,6.8,1968,8535519
      North Carolina,37,2020-7-13,104,-22.3333333333333,73.6433333333333,Actual,18.4,1529,10488084
      South Carolina,45,2020-7-13,106,-13.3333333333333,86.1033333333333,Actual,13.8,972,5148714
      Mississippi,28,2020-7-13,108,-9,90.4033333333334,Actual,15,1250,2976149
      Colorado,8,2020-7-13,112,-23.6666666666667,72.0566666666667,Actual,4,1727,5758736
      Alabama,1,2020-7-13,106,-12,86.31,Actual,21.4,1124,4903185
      Minnesota,27,2020-7-13,90,-27,59.7233333333333,Actual,5,1542,5639632
      Washington,53,2020-7-13,118,-29,72.6833333333333,Actual,-0.6,1399,7614893
      Missouri,29,2020-7-13,90,-16.6666666666667,73.3266666666667,Actual,6.2,1071,6137428
      Tennessee,47,2020-7-13,91,-15.6666666666667,73.7966666666667,Actual,12,749,6829174
      Rhode Island,44,2020-7-13,87,-24.3333333333333,59.05,Actual,2.2,984,1059361
      Wisconsin,55,2020-7-13,108,-13,82.14,Actual,2.6,820,5822434
      Nevada,32,2020-7-13,91,-29.6666666666667,58.2766666666667,Actual,7.8,593,3080156
      Iowa,19,2020-7-13,100,-11.3333333333333,82.1933333333334,Actual,6.8,755,3155070
      Oklahoma,40,2020-7-13,94,-12.3333333333333,81.6266666666667,Actual,3.2,424,3956971
      Kentucky,21,2020-7-13,104,-15,80.66,Actual,5,629,4467673
      New York,36,2020-7-14,107,-36,54.35,Actual,20.6,32408,26161672
      New Jersey,34,2020-7-14,103,-33,54.99,Actual,28,15582,8882190
      California,6,2020-7-14,104,-37.3333333333333,60.6266666666666,Actual,92.4,7250,39512223
      Texas,48,2020-7-14,113,-29,77.35,Actual,125.4,3941,28995881
      Massachusetts,25,2020-7-14,98,-36,54.42,Actual,14,8339,6892503
      Florida,12,2020-7-14,112,-33.6666666666667,68.2766666666667,Actual,96,4409,21477737
      Illinois,17,2020-7-14,98,-26.6666666666667,64.0433333333333,Actual,16.6,7419,12671821
      Pennsylvania,42,2020-7-14,98,-23.6666666666667,64.09,Actual,17.4,6931,12801989
      Michigan,26,2020-7-14,100,-17.3333333333333,68.4766666666667,Actual,7,6253,9986857
      Connecticut,9,2020-7-14,113,-22,73.6966666666667,Actual,8.2,4372,3565287
      Louisiana,22,2020-7-14,117,-19.6666666666667,83.2433333333333,Actual,16.4,3445,4648794
      Georgia,13,2020-7-14,118,-27,79.4833333333333,Actual,21.8,3054,10617423
      Arizona,4,2020-7-14,110,-31.3333333333333,74.3033333333334,Actual,68.2,2337,7278717
      Ohio,39,2020-7-14,96,-13,76.0166666666666,Actual,13.4,3069,11689100
      Maryland,24,2020-7-14,92,-29,58.9966666666667,Actual,7.4,3334,6045680
      Indiana,18,2020-7-14,97,-8,80.6533333333333,Actual,7.8,2775,6732219
      Virginia,51,2020-7-14,107,-27,70.2133333333334,Actual,9,1977,8535519
      North Carolina,37,2020-7-14,105,-22,74.4233333333333,Actual,18.8,1571,10488084
      South Carolina,45,2020-7-14,107,-12.3333333333333,86.98,Actual,23.8,993,5148714
      Mississippi,28,2020-7-14,109,-9.33333333333333,91.31,Actual,15.6,1272,2976149
      Colorado,8,2020-7-14,113,-25.6666666666667,72.8,Actual,4,1738,5758736
      Alabama,1,2020-7-14,107,-11.3333333333333,87.1966666666666,Actual,23.2,1164,4903185
      Minnesota,27,2020-7-14,91,-28.3333333333333,60.44,Actual,5.8,1548,5639632
      Washington,53,2020-7-14,119,-29,73.3933333333333,Actual,0.6,1404,7614893
      Missouri,29,2020-7-14,91,-17,74.1566666666667,Actual,5.4,1078,6137428
      Tennessee,47,2020-7-14,92,-15.3333333333333,74.6433333333334,Actual,11.6,767,6829174
      Rhode Island,44,2020-7-14,88,-25,59.8,Actual,2.4,985,1059361
      Wisconsin,55,2020-7-14,109,-14.6666666666667,82.9933333333333,Actual,2,826,5822434
      Nevada,32,2020-7-14,92,-28.3333333333333,58.9933333333333,Actual,6.8,612,3080156
      Iowa,19,2020-7-14,101,-15,83.0433333333334,Actual,6.6,757,3155070
      Oklahoma,40,2020-7-14,95,-12.6666666666667,82.5,Actual,3.4,428,3956971
      Kentucky,21,2020-7-14,105,-14.6666666666667,81.5133333333333,Actual,5.6,635,4467673
      New York,36,2020-7-15,108,-35.3333333333333,54.9966666666667,Actual,22.6,32427,26161672
      New Jersey,34,2020-7-15,104,-32.3333333333333,55.6666666666667,Actual,31.8,15634,8882190
      California,6,2020-7-15,105,-37.6666666666667,61.25,Actual,110.4,7375,39512223
      Texas,48,2020-7-15,114,-27.6666666666667,78.0733333333333,Actual,140.2,4104,28995881
      Massachusetts,25,2020-7-15,99,-33.6666666666667,55.0833333333333,Actual,15.4,8367,6892503
      Florida,12,2020-7-15,113,-33.6666666666667,68.94,Actual,112.6,4521,21477737
      Illinois,17,2020-7-15,99,-29,64.7533333333333,Actual,15.4,7427,12671821
      Pennsylvania,42,2020-7-15,99,-24,64.85,Actual,20,6957,12801989
      Michigan,26,2020-7-15,101,-16,69.3166666666667,Actual,8.2,6257,9986857
      Connecticut,9,2020-7-15,114,-21.3333333333333,74.4833333333333,Actual,9.6,4380,3565287
      Louisiana,22,2020-7-15,118,-19,84.0533333333333,Actual,18.6,3461,4648794
      Georgia,13,2020-7-15,119,-25.6666666666667,80.2266666666666,Actual,25.8,3091,10617423
      Arizona,4,2020-7-15,111,-31.3333333333333,74.99,Actual,69.2,2434,7278717
      Ohio,39,2020-7-15,97,-13,76.8866666666666,Actual,10.8,3075,11689100
      Maryland,24,2020-7-15,93,-29.6666666666667,59.7,Actual,8,3341,6045680
      Indiana,18,2020-7-15,98,-9,81.5633333333333,Actual,8.6,2785,6732219
      Virginia,51,2020-7-15,108,-26,70.9533333333333,Actual,9.4,1992,8535519
      North Carolina,37,2020-7-15,106,-23,75.1933333333333,Actual,20.2,1589,10488084
      South Carolina,45,2020-7-15,108,-12.3333333333333,87.8566666666667,Actual,27,998,5148714
      Mississippi,28,2020-7-15,110,-8,92.23,Actual,16.6,1290,2976149
      Colorado,8,2020-7-15,114,-25,73.55,Actual,5.2,1744,5758736
      Alabama,1,2020-7-15,108,-11,88.0866666666666,Actual,28.8,1211,4903185
      Minnesota,27,2020-7-15,92,-24.6666666666667,61.1933333333333,Actual,6.6,1558,5639632
      Washington,53,2020-7-15,120,-28.6666666666667,74.1066666666666,Actual,-0.8,1421,7614893
      Missouri,29,2020-7-15,92,-13.3333333333333,75.0233333333333,Actual,6,1083,6137428
      Tennessee,47,2020-7-15,93,-15,75.4933333333334,Actual,14.8,783,6829174
      Rhode Island,44,2020-7-15,89,-22.6666666666667,60.5733333333333,Actual,2.8,987,1059361
      Wisconsin,55,2020-7-15,110,-16.3333333333333,83.83,Actual,2.6,827,5822434
      Nevada,32,2020-7-15,93,-28.3333333333333,59.71,Actual,8.8,618,3080156
      Iowa,19,2020-7-15,102,-11.6666666666667,83.9266666666667,Actual,6.6,777,3155070
      Oklahoma,40,2020-7-15,96,-8.33333333333333,83.4166666666667,Actual,4.6,432,3956971
      Kentucky,21,2020-7-15,106,-15,82.3633333333333,Actual,6.6,645,4467673
      New York,36,2020-7-16,109,-36.6666666666667,55.63,Actual,16.6,32446,26161672
      New Jersey,34,2020-7-16,105,-32.6666666666667,56.34,Actual,27.8,15665,8882190
      California,6,2020-7-16,106,-38.3333333333333,61.8666666666666,Actual,122.6,7489,39512223
      Texas,48,2020-7-16,115,-28.3333333333333,78.79,Actual,149.8,4265,28995881
      Massachusetts,25,2020-7-16,100,-33.6666666666667,55.7466666666667,Actual,17.8,8379,6892503
      Florida,12,2020-7-16,114,-33.3333333333333,69.6066666666667,Actual,123.6,4677,21477737
      Illinois,17,2020-7-16,100,-25.3333333333333,65.5,Actual,17.8,7452,12671821
      Pennsylvania,42,2020-7-16,100,-25,65.6,Actual,20.8,6984,12801989
      Michigan,26,2020-7-16,102,-19.3333333333333,70.1233333333333,Actual,8.6,6275,9986857
      Connecticut,9,2020-7-16,115,-21.3333333333333,75.27,Actual,5,4389,3565287
      Louisiana,22,2020-7-16,119,-21.3333333333333,84.84,Actual,17.2,3485,4648794
      Georgia,13,2020-7-16,120,-26.6666666666667,80.96,Actual,28.6,3105,10617423
      Arizona,4,2020-7-16,112,-32,75.67,Actual,96.8,2492,7278717
      Ohio,39,2020-7-16,98,-15,77.7366666666666,Actual,13.6,3103,11689100
      Maryland,24,2020-7-16,94,-30,60.4,Actual,8.6,3347,6045680
      Indiana,18,2020-7-16,99,-9,82.4733333333333,Actual,11.6,2795,6732219
      Virginia,51,2020-7-16,109,-27,71.6833333333334,Actual,11.4,2007,8535519
      North Carolina,37,2020-7-16,107,-22.6666666666667,75.9666666666667,Actual,23.8,1607,10488084
      South Carolina,45,2020-7-16,109,-13,88.7266666666667,Actual,32.6,1070,5148714
      Mississippi,28,2020-7-16,111,-9.33333333333333,93.1366666666667,Actual,19.2,1308,2976149
      Colorado,8,2020-7-16,115,-25.3333333333333,74.2966666666667,Actual,5,1745,5758736
      Alabama,1,2020-7-16,109,-12.3333333333333,88.9633333333333,Actual,32.4,1230,4903185
      Minnesota,27,2020-7-16,93,-27,61.9233333333333,Actual,7.2,1566,5639632
      Washington,53,2020-7-16,121,-30.3333333333333,74.8033333333333,Actual,9,1427,7614893
      Missouri,29,2020-7-16,93,-14.6666666666667,75.8766666666667,Actual,5.4,1084,6137428
      Tennessee,47,2020-7-16,94,-15.6666666666667,76.3366666666667,Actual,17.8,796,6829174
      Rhode Island,44,2020-7-16,90,-21,61.3633333333333,Actual,1.2,988,1059361
      Wisconsin,55,2020-7-16,111,-12.3333333333333,84.7066666666667,Actual,4.6,831,5822434
      Nevada,32,2020-7-16,94,-29,60.42,Actual,10.6,626,3080156
      Iowa,19,2020-7-16,103,-11,84.8166666666667,Actual,6.8,781,3155070
      Oklahoma,40,2020-7-16,97,-11,84.3066666666667,Actual,5.4,438,3956971
      Kentucky,21,2020-7-16,107,-16,83.2033333333333,Actual,7.6,650,4467673
      New York,36,2020-7-17,110,-38,56.25,Actual,17.4,32463,26161672
      New Jersey,34,2020-7-17,106,-33.6666666666667,57.0033333333333,Actual,24.8,15684,8882190
      California,6,2020-7-17,107,-37.6666666666667,62.49,Actual,93,7603,39512223
      Texas,48,2020-7-17,116,-29.3333333333333,79.4966666666667,Actual,147.6,4440,28995881
      Massachusetts,25,2020-7-17,101,-36.3333333333333,56.3833333333333,Actual,18.2,8401,6892503
      Florida,12,2020-7-17,115,-35,70.2566666666667,Actual,114.6,4805,21477737
      Illinois,17,2020-7-17,101,-26.3333333333333,66.2366666666667,Actual,13.8,7465,12671821
      Pennsylvania,42,2020-7-17,101,-27.6666666666667,66.3233333333334,Actual,18.2,7004,12801989
      Michigan,26,2020-7-17,103,-19.3333333333333,70.93,Actual,8,6282,9986857
      Connecticut,9,2020-7-17,116,-24.6666666666667,76.0233333333333,Actual,4.8,4396,3565287
      Louisiana,22,2020-7-17,120,-22.3333333333333,85.6166666666666,Actual,19.6,3509,4648794
      Georgia,13,2020-7-17,121,-27.3333333333333,81.6866666666666,Actual,24,3132,10617423
      Arizona,4,2020-7-17,113,-33,76.34,Actual,84.8,2583,7278717
      Ohio,39,2020-7-17,99,-15.6666666666667,78.58,Actual,21,3112,11689100
      Maryland,24,2020-7-17,95,-31,61.09,Actual,8.6,3359,6045680
      Indiana,18,2020-7-17,100,-9.66666666666667,83.3766666666667,Actual,9.4,2803,6732219
      Virginia,51,2020-7-17,110,-27.3333333333333,72.41,Actual,10,2013,8535519
      North Carolina,37,2020-7-17,108,-22.6666666666667,76.74,Actual,16.2,1623,10488084
      South Carolina,45,2020-7-17,110,-13.3333333333333,89.5933333333333,Actual,32.4,1096,5148714
      Mississippi,28,2020-7-17,112,-12.6666666666667,94.01,Actual,16.6,1332,2976149
      Colorado,8,2020-7-17,116,-26,75.0366666666667,Actual,2.8,1751,5758736
      Alabama,1,2020-7-17,110,-13.6666666666667,89.8266666666666,Actual,24.6,1265,4903185
      Minnesota,27,2020-7-17,94,-28.6666666666667,62.6366666666666,Actual,6.6,1573,5639632
      Washington,53,2020-7-17,122,-31,75.4933333333333,Actual,8.6,1434,7614893
      Missouri,29,2020-7-17,94,-10.6666666666667,76.77,Actual,4,1088,6137428
      Tennessee,47,2020-7-17,95,-16.6666666666667,77.17,Actual,15.2,815,6829174
      Rhode Island,44,2020-7-17,91,-26.6666666666667,62.0966666666667,Actual,1,990,1059361
      Wisconsin,55,2020-7-17,112,-13.6666666666667,85.57,Actual,3.6,833,5822434
      Nevada,32,2020-7-17,95,-30.3333333333333,61.1166666666667,Actual,7,637,3080156
      Iowa,19,2020-7-17,104,-9,85.7266666666667,Actual,7.2,785,3155070
      Oklahoma,40,2020-7-17,98,-12.3333333333333,85.1833333333333,Actual,4.6,445,3956971
      Kentucky,21,2020-7-17,108,-17,84.0333333333333,Actual,7,658,4467673
      New York,36,2020-7-18,111,-25.6666666666667,56.9933333333333,Actual,15.8,32478,26161672
      New Jersey,34,2020-7-18,107,-19,57.8133333333333,Actual,16.2,15699,8882190
      California,6,2020-7-18,108,-29.6666666666667,63.1933333333333,Actual,79,7702,39512223
      Texas,48,2020-7-18,117,-21.3333333333333,80.2833333333333,Actual,138.4,4576,28995881
      Massachusetts,25,2020-7-18,102,-21.6666666666667,57.1666666666667,Actual,13,8418,6892503
      Florida,12,2020-7-18,116,-31.3333333333333,70.9433333333333,Actual,110.2,4895,21477737
      Illinois,17,2020-7-18,102,-14.3333333333333,67.0933333333333,Actual,13.4,7483,12671821
      Pennsylvania,42,2020-7-18,102,-16.6666666666667,67.1566666666667,Actual,13.6,7015,12801989
      Michigan,26,2020-7-18,104,-7.66666666666667,71.8533333333334,Actual,8.6,6291,9986857
      Connecticut,9,2020-7-18,117,-11,76.9133333333333,Actual,5.2,4396,3565287
      Louisiana,22,2020-7-18,121,-18,86.4366666666666,Actual,22.6,3509,4648794
      Georgia,13,2020-7-18,122,-18,82.5066666666666,Actual,17.2,3169,10617423
      Arizona,4,2020-7-18,114,-27,77.0700000000001,Actual,70,2730,7278717
      Ohio,39,2020-7-18,100,-6.66666666666667,79.5133333333333,Actual,22.8,3132,11689100
      Maryland,24,2020-7-18,96,-17.3333333333333,61.9166666666667,Actual,8.2,3368,6045680
      Indiana,18,2020-7-18,101,1,84.3866666666667,Actual,8,2820,6732219
      Virginia,51,2020-7-18,111,-15.3333333333333,73.2566666666667,Actual,7.8,2025,8535519
      North Carolina,37,2020-7-18,109,-14,77.6,Actual,17.6,1648,10488084
      South Carolina,45,2020-7-18,111,-5,90.5433333333333,Actual,33.2,1135,5148714
      Mississippi,28,2020-7-18,113,-4.66666666666667,94.9633333333334,Actual,13.6,1346,2976149
      Colorado,8,2020-7-18,117,-18,75.8566666666667,Actual,2.8,1752,5758736
      Alabama,1,2020-7-18,111,-2.33333333333333,90.8033333333333,Actual,16,1286,4903185
      Minnesota,27,2020-7-18,95,-20.3333333333333,63.4333333333333,Actual,5.4,1578,5639632
      Washington,53,2020-7-18,123,-17.6666666666667,76.3166666666666,Actual,6.4,1444,7614893
      Missouri,29,2020-7-18,95,-8.66666666666667,77.6833333333333,Actual,3.4,1098,6137428
      Tennessee,47,2020-7-18,96,-6.66666666666667,78.1033333333334,Actual,12.8,838,6829174
      Rhode Island,44,2020-7-18,92,-12.6666666666667,62.97,Actual,1.6,990,1059361
      Wisconsin,55,2020-7-18,113,-4,86.53,Actual,3.8,843,5822434
      Nevada,32,2020-7-18,96,-27.3333333333333,61.8433333333333,Actual,6,646,3080156
      Iowa,19,2020-7-18,105,-3,86.6966666666667,Actual,4.2,789,3155070
      Oklahoma,40,2020-7-18,99,-5,86.1333333333333,Actual,4,451,3956971
      Kentucky,21,2020-7-18,109,-4.66666666666667,84.9866666666666,Actual,5.2,667,4467673
      New York,36,2020-7-19,112,-27.3333333333333,57.72,Actual,14.8,32495,26161672
      New Jersey,34,2020-7-19,108,-22,58.5933333333333,Actual,14.4,15706,8882190
      California,6,2020-7-19,109,-29.6666666666667,63.8966666666666,Actual,79.8,7715,39512223
      Texas,48,2020-7-19,118,-23,81.0533333333333,Actual,130.2,4679,28995881
      Massachusetts,25,2020-7-19,103,-21.3333333333333,57.9533333333333,Actual,14,8430,6892503
      Florida,12,2020-7-19,117,-31,71.6333333333333,Actual,105.8,4982,21477737
      Illinois,17,2020-7-19,103,-19.6666666666667,67.8966666666667,Actual,13,7488,12671821
      Pennsylvania,42,2020-7-19,103,-16.6666666666667,67.99,Actual,13.4,7022,12801989
      Michigan,26,2020-7-19,105,-9.66666666666667,72.7566666666667,Actual,6.8,6293,9986857
      Connecticut,9,2020-7-19,118,-12,77.7933333333333,Actual,3.4,4396,3565287
      Louisiana,22,2020-7-19,122,-20.6666666666667,87.23,Actual,25,3543,4648794
      Georgia,13,2020-7-19,123,-22.3333333333333,83.2833333333333,Actual,29.8,3174,10617423
      Arizona,4,2020-7-19,115,-26.3333333333333,77.8066666666667,Actual,85.2,2761,7278717
      Ohio,39,2020-7-19,101,-8.66666666666667,80.4266666666666,Actual,23.2,3174,11689100
      Maryland,24,2020-7-19,97,-20,62.7166666666667,Actual,11,3377,6045680
      Indiana,18,2020-7-19,102,-3.33333333333333,85.3533333333333,Actual,10.2,2822,6732219
      Virginia,51,2020-7-19,112,-19,74.0666666666667,Actual,8.2,2027,8535519
      North Carolina,37,2020-7-19,110,-16.6666666666667,78.4333333333333,Actual,19.6,1652,10488084
      South Carolina,45,2020-7-19,112,-6.33333333333333,91.48,Actual,30.2,1155,5148714
      Mississippi,28,2020-7-19,114,-7,95.8933333333334,Actual,16.2,1355,2976149
      Colorado,8,2020-7-19,118,-16,76.6966666666667,Actual,3.6,1752,5758736
      Alabama,1,2020-7-19,112,-7.66666666666667,91.7266666666666,Actual,14.6,1287,4903185
      Minnesota,27,2020-7-19,96,-14.6666666666667,64.2866666666666,Actual,4.4,1581,5639632
      Washington,53,2020-7-19,124,-14,77.1766666666666,Actual,7.6,1447,7614893
      Missouri,29,2020-7-19,96,-7.66666666666667,78.6066666666666,Actual,4.6,1098,6137428
      Tennessee,47,2020-7-19,97,-11,78.9933333333334,Actual,15,843,6829174
      Rhode Island,44,2020-7-19,93,-9.33333333333333,63.8766666666667,Actual,1.6,990,1059361
      Wisconsin,55,2020-7-19,114,-0.333333333333333,87.5266666666667,Actual,5.6,844,5822434
      Nevada,32,2020-7-19,97,-27,62.5733333333333,Actual,10,647,3080156
      Iowa,19,2020-7-19,106,-0.333333333333333,87.6933333333334,Actual,5,793,3155070
      Oklahoma,40,2020-7-19,100,-5,87.0833333333333,Actual,4.6,451,3956971
      Kentucky,21,2020-7-19,110,-8.66666666666667,85.9,Actual,4.8,670,4467673
      New York,36,2020-7-20,113,-38,58.34,Actual,19,32506,26161672
      New Jersey,34,2020-7-20,109,-34.3333333333333,59.25,Actual,4.6,15715,8882190
      California,6,2020-7-20,110,-37.3333333333333,64.5233333333333,Actual,88.8,7770,39512223
      Texas,48,2020-7-20,119,-29.3333333333333,81.76,Actual,146.4,4796,28995881
      Massachusetts,25,2020-7-20,104,-35.3333333333333,58.6,Actual,13.2,8432,6892503
      Florida,12,2020-7-20,118,-34,72.2933333333333,Actual,108,5072,21477737
      Illinois,17,2020-7-20,104,-28,68.6166666666667,Actual,15,7494,12671821
      Pennsylvania,42,2020-7-20,104,-27.3333333333333,68.7166666666667,Actual,14.6,7025,12801989
      Michigan,26,2020-7-20,106,-17.3333333333333,73.5833333333334,Actual,6.6,6300,9986857
      Connecticut,9,2020-7-20,119,-23.3333333333333,78.56,Actual,2,4406,3565287
      Louisiana,22,2020-7-20,123,-21.6666666666667,88.0133333333333,Actual,32.2,3574,4648794
      Georgia,13,2020-7-20,124,-27.6666666666667,84.0066666666666,Actual,40.6,3177,10617423
      Arizona,4,2020-7-20,116,-31.3333333333333,78.4933333333334,Actual,78.2,2784,7278717
      Ohio,39,2020-7-20,102,-15,81.2766666666666,Actual,24.6,3189,11689100
      Maryland,24,2020-7-20,98,-33.3333333333333,63.3833333333334,Actual,9.2,3382,6045680
      Indiana,18,2020-7-20,103,-9.66666666666667,86.2566666666667,Actual,12,2825,6732219
      Virginia,51,2020-7-20,113,-29.6666666666667,74.77,Actual,7.6,2031,8535519
      North Carolina,37,2020-7-20,111,-23,79.2033333333333,Actual,21.8,1677,10488084
      South Carolina,45,2020-7-20,113,-14.6666666666667,92.3333333333333,Actual,37.8,1164,5148714
      Mississippi,28,2020-7-20,115,-9.33333333333333,96.8,Actual,18.2,1358,2976149
      Colorado,8,2020-7-20,119,-23,77.4666666666667,Actual,4,1758,5758736
      Alabama,1,2020-7-20,113,-13.6666666666667,92.59,Actual,19.8,1291,4903185
      Minnesota,27,2020-7-20,97,-27.3333333333333,65.0133333333333,Actual,3.8,1585,5639632
      Washington,53,2020-7-20,125,-28.6666666666667,77.89,Actual,6.8,1453,7614893
      Missouri,29,2020-7-20,97,-19,79.4166666666666,Actual,5.8,1100,6137428
      Tennessee,47,2020-7-20,98,-16.6666666666667,79.8266666666667,Actual,14.6,847,6829174
      Rhode Island,44,2020-7-20,94,-24,64.6366666666667,Actual,1.4,995,1059361
      Wisconsin,55,2020-7-20,115,-14,88.3866666666667,Actual,6.4,846,5822434
      Nevada,32,2020-7-20,98,-29.3333333333333,63.28,Actual,13.4,648,3080156
      Iowa,19,2020-7-20,107,-12.6666666666667,88.5666666666667,Actual,5.8,798,3155070
      Oklahoma,40,2020-7-20,101,-12.3333333333333,87.96,Actual,5.8,452,3956971
      Kentucky,21,2020-7-20,111,-17.6666666666667,86.7233333333333,Actual,3.8,671,4467673
      New York,36,2020-7-21,114,-36.6666666666667,58.9733333333333,Actual,23.2,32520,26161672
      New Jersey,34,2020-7-21,110,-33.6666666666667,59.9133333333333,Actual,6.2,15737,8882190
      California,6,2020-7-21,111,-38,65.1433333333333,Actual,99.8,7888,39512223
      Texas,48,2020-7-21,120,-29.6666666666667,82.4633333333333,Actual,157.2,4916,28995881
      Massachusetts,25,2020-7-21,105,-34.6666666666667,59.2533333333333,Actual,13,8449,6892503
      Florida,12,2020-7-21,119,-34.3333333333333,72.95,Actual,124.6,5206,21477737
      Illinois,17,2020-7-21,105,-29,69.3266666666667,Actual,15.4,7517,12671821
      Pennsylvania,42,2020-7-21,105,-26,69.4566666666667,Actual,15.6,7051,12801989
      Michigan,26,2020-7-21,107,-17.6666666666667,74.4066666666667,Actual,6.2,6309,9986857
      Connecticut,9,2020-7-21,120,-22.3333333333333,79.3366666666667,Actual,2.8,4406,3565287
      Louisiana,22,2020-7-21,124,-21,88.8033333333333,Actual,35.4,3610,4648794
      Georgia,13,2020-7-21,125,-27.6666666666667,84.7299999999999,Actual,38.4,3254,10617423
      Arizona,4,2020-7-21,117,-30.6666666666667,79.1866666666667,Actual,66.6,2918,7278717
      Ohio,39,2020-7-21,103,-15,82.1266666666666,Actual,24.8,3219,11689100
      Maryland,24,2020-7-21,99,-31,64.0733333333334,Actual,8.2,3402,6045680
      Indiana,18,2020-7-21,104,-10.6666666666667,87.15,Actual,12,2846,6732219
      Virginia,51,2020-7-21,114,-28.6666666666667,75.4833333333334,Actual,5.8,2048,8535519
      North Carolina,37,2020-7-21,112,-23,79.9733333333333,Actual,21.6,1705,10488084
      South Carolina,45,2020-7-21,114,-14,93.1933333333333,Actual,39.8,1221,5148714
      Mississippi,28,2020-7-21,116,-9.33333333333333,97.7066666666667,Actual,18,1389,2976149
      Colorado,8,2020-7-21,120,-25.6666666666667,78.21,Actual,6.8,1763,5758736
      Alabama,1,2020-7-21,114,-14.6666666666667,93.4433333333333,Actual,22.2,1303,4903185
      Minnesota,27,2020-7-21,98,-27.3333333333333,65.74,Actual,4.6,1588,5639632
      Washington,53,2020-7-21,126,-29.6666666666667,78.5933333333333,Actual,7.6,1465,7614893
      Missouri,29,2020-7-21,98,-19,80.2266666666666,Actual,9.6,1107,6137428
      Tennessee,47,2020-7-21,99,-16.3333333333333,80.6633333333334,Actual,17.4,871,6829174
      Rhode Island,44,2020-7-21,95,-22.6666666666667,65.41,Actual,2.2,996,1059361
      Wisconsin,55,2020-7-21,116,-15.3333333333333,89.2333333333333,Actual,7,859,5822434
      Nevada,32,2020-7-21,99,-28.3333333333333,63.9966666666667,Actual,12.6,676,3080156
      Iowa,19,2020-7-21,108,-15.3333333333333,89.4133333333334,Actual,6.2,806,3155070
      Oklahoma,40,2020-7-21,102,-12.6666666666667,88.8333333333333,Actual,5.2,461,3956971
      Kentucky,21,2020-7-21,112,-16,87.5633333333333,Actual,3.4,674,4467673
      New York,36,2020-7-22,115,-37.3333333333333,59.6,Actual,20.2,32558,26161672
      New Jersey,34,2020-7-22,111,-35.3333333333333,60.56,Actual,11.8,15707,8882190
      California,6,2020-7-22,112,-38,65.7633333333333,Actual,124.4,8047,39512223
      Texas,48,2020-7-22,121,-28,83.1833333333333,Actual,168.8,5172,28995881
      Massachusetts,25,2020-7-22,106,-35,59.9033333333333,Actual,13.4,8467,6892503
      Florida,12,2020-7-22,120,-35,73.6,Actual,134.2,5345,21477737
      Illinois,17,2020-7-22,106,-25.6666666666667,70.07,Actual,17.8,7540,12671821
      Pennsylvania,42,2020-7-22,106,-27,70.1866666666667,Actual,18.8,7077,12801989
      Michigan,26,2020-7-22,108,-16.6666666666667,75.24,Actual,6.8,6315,9986857
      Connecticut,9,2020-7-22,121,-23.3333333333333,80.1033333333333,Actual,3.4,4406,3565287
      Louisiana,22,2020-7-22,125,-19,89.6133333333333,Actual,34.4,3670,4648794
      Georgia,13,2020-7-22,126,-26,85.4699999999999,Actual,53.8,3335,10617423
      Arizona,4,2020-7-22,118,-31,79.8766666666667,Actual,76.4,2974,7278717
      Ohio,39,2020-7-22,104,-15.6666666666667,82.97,Actual,24.6,3235,11689100
      Maryland,24,2020-7-22,100,-34,64.7333333333333,Actual,9,3405,6045680
      Indiana,18,2020-7-22,105,-9.66666666666667,88.0533333333333,Actual,12.4,2863,6732219
      Virginia,51,2020-7-22,115,-28.6666666666667,76.1966666666667,Actual,8,2051,8535519
      North Carolina,37,2020-7-22,113,-23,80.7433333333333,Actual,27.4,1732,10488084
      South Carolina,45,2020-7-22,115,-13.3333333333333,94.06,Actual,46,1285,5148714
      Mississippi,28,2020-7-22,117,-8,98.6266666666667,Actual,21.6,1423,2976149
      Colorado,8,2020-7-22,121,-25.3333333333333,78.9566666666667,Actual,7.6,1771,5758736
      Alabama,1,2020-7-22,115,-11.3333333333333,94.33,Actual,30.2,1364,4903185
      Minnesota,27,2020-7-22,99,-25.6666666666667,66.4833333333333,Actual,5,1592,5639632
      Washington,53,2020-7-22,127,-30,79.2933333333333,Actual,9.6,1468,7614893
      Missouri,29,2020-7-22,99,-11.6666666666667,81.11,Actual,10.8,1117,6137428
      Tennessee,47,2020-7-22,100,-16,81.5033333333334,Actual,19,888,6829174
      Rhode Island,44,2020-7-22,96,-24.3333333333333,66.1666666666667,Actual,2.4,997,1059361
      Wisconsin,55,2020-7-22,117,-12.6666666666667,90.1066666666667,Actual,6.8,865,5822434
      Nevada,32,2020-7-22,100,-28.3333333333333,64.7133333333333,Actual,15,704,3080156
      Iowa,19,2020-7-22,109,-10.3333333333333,90.31,Actual,6.6,814,3155070
      Oklahoma,40,2020-7-22,103,-8.66666666666667,89.7466666666667,Actual,6.6,474,3956971
      Kentucky,21,2020-7-22,113,-16,88.4033333333333,Actual,4.2,677,4467673
      New York,36,2020-7-23,116,-36,60.24,Actual,20.4,32594,26161672
      New Jersey,34,2020-7-23,112,-34,61.22,Actual,12.2,15730,8882190
      California,6,2020-7-23,113,-38,66.3833333333333,Actual,127.6,8201,39512223
      Texas,48,2020-7-23,122,-28,83.9033333333333,Actual,181.8,5362,28995881
      Massachusetts,25,2020-7-23,107,-36,60.5433333333333,Actual,15.4,8483,6892503
      Florida,12,2020-7-23,121,-35,74.25,Actual,141,5518,21477737
      Illinois,17,2020-7-23,107,-25.6666666666667,70.8133333333333,Actual,19,7560,12671821
      Pennsylvania,42,2020-7-23,107,-26,70.9266666666667,Actual,19.8,7093,12801989
      Michigan,26,2020-7-23,109,-16,76.08,Actual,5.4,6322,9986857
      Connecticut,9,2020-7-23,122,-23,80.8733333333333,Actual,1.4,4410,3565287
      Louisiana,22,2020-7-23,126,-20.6666666666667,90.4066666666666,Actual,28.2,3686,4648794
      Georgia,13,2020-7-23,127,-26.6666666666667,86.2033333333333,Actual,63.4,3361,10617423
      Arizona,4,2020-7-23,119,-31.6666666666667,80.56,Actual,100.4,3063,7278717
      Ohio,39,2020-7-23,105,-15.6666666666667,83.8133333333333,Actual,21.6,3256,11689100
      Maryland,24,2020-7-23,101,-30.6666666666667,65.4266666666667,Actual,10.2,3409,6045680
      Indiana,18,2020-7-23,106,-8.33333333333333,88.97,Actual,14,2880,6732219
      Virginia,51,2020-7-23,116,-28,76.9166666666667,Actual,8.8,2054,8535519
      North Carolina,37,2020-7-23,114,-24.3333333333333,81.5,Actual,26.8,1756,10488084
      South Carolina,45,2020-7-23,116,-13,94.93,Actual,60.2,1334,5148714
      Mississippi,28,2020-7-23,118,-10.3333333333333,99.5233333333334,Actual,24,1436,2976149
      Colorado,8,2020-7-23,122,-24.6666666666667,79.71,Actual,7.2,1786,5758736
      Alabama,1,2020-7-23,116,-12.3333333333333,95.2066666666666,Actual,33,1397,4903185
      Minnesota,27,2020-7-23,100,-27,67.2133333333333,Actual,5.2,1601,5639632
      Washington,53,2020-7-23,128,-30.6666666666667,79.9866666666667,Actual,8.2,1482,7614893
      Missouri,29,2020-7-23,100,-16.6666666666667,81.9433333333333,Actual,11,1146,6137428
      Tennessee,47,2020-7-23,101,-16.3333333333333,82.34,Actual,23.4,925,6829174
      Rhode Island,44,2020-7-23,97,-23.6666666666667,66.93,Actual,1.4,1001,1059361
      Wisconsin,55,2020-7-23,118,-12,90.9866666666667,Actual,9,878,5822434
      Nevada,32,2020-7-23,101,-29,65.4233333333333,Actual,16.8,709,3080156
      Iowa,19,2020-7-23,110,-12,91.19,Actual,5.6,820,3155070
      Oklahoma,40,2020-7-23,104,-11,90.6366666666667,Actual,8.8,477,3956971
      Kentucky,21,2020-7-23,114,-17,89.2333333333333,Actual,5,684,4467673
      New York,36,2020-7-24,117,-38,60.86,Actual,22,32596,26161672
      New Jersey,34,2020-7-24,113,-35,61.87,Actual,10,15765,8882190
      California,6,2020-7-24,114,-37.6666666666667,67.0066666666666,Actual,112,8337,39512223
      Texas,48,2020-7-24,123,-29,84.6133333333333,Actual,176.4,5523,28995881
      Massachusetts,25,2020-7-24,108,-34,61.2033333333333,Actual,15.8,8497,6892503
      Florida,12,2020-7-24,122,-34.3333333333333,74.9066666666667,Actual,129.6,5653,21477737
      Illinois,17,2020-7-24,108,-26,71.5533333333333,Actual,14.6,7577,12671821
      Pennsylvania,42,2020-7-24,108,-28.3333333333333,71.6433333333333,Actual,15.2,7116,12801989
      Michigan,26,2020-7-24,110,-19,76.89,Actual,3.6,6327,9986857
      Connecticut,9,2020-7-24,123,-23,81.6433333333333,Actual,1.4,4413,3565287
      Louisiana,22,2020-7-24,127,-25.6666666666667,91.15,Actual,30.6,3715,4648794
      Georgia,13,2020-7-24,128,-27.3333333333333,86.9299999999999,Actual,48.8,3443,10617423
      Arizona,4,2020-7-24,120,-32.3333333333333,81.2366666666667,Actual,77.4,3143,7278717
      Ohio,39,2020-7-24,106,-15.3333333333333,84.66,Actual,17.6,3297,11689100
      Maryland,24,2020-7-24,102,-32,66.1066666666667,Actual,7.6,3422,6045680
      Indiana,18,2020-7-24,107,-9.66666666666667,89.8733333333333,Actual,11.4,2884,6732219
      Virginia,51,2020-7-24,117,-28,77.6366666666667,Actual,6,2067,8535519
      North Carolina,37,2020-7-24,115,-23,82.27,Actual,22.4,1789,10488084
      South Carolina,45,2020-7-24,117,-14.3333333333333,95.7866666666667,Actual,54,1385,5148714
      Mississippi,28,2020-7-24,119,-14.3333333333333,100.38,Actual,20.8,1463,2976149
      Colorado,8,2020-7-24,123,-25.6666666666667,80.4533333333333,Actual,6.2,1790,5758736
      Alabama,1,2020-7-24,117,-13.6666666666667,96.07,Actual,34,1438,4903185
      Minnesota,27,2020-7-24,101,-28.3333333333333,67.93,Actual,5.2,1606,5639632
      Washington,53,2020-7-24,129,-31,80.6766666666666,Actual,7.2,1495,7614893
      Missouri,29,2020-7-24,101,-10.3333333333333,82.84,Actual,11.4,1152,6137428
      Tennessee,47,2020-7-24,102,-17.3333333333333,83.1666666666667,Actual,19.2,938,6829174
      Rhode Island,44,2020-7-24,98,-24.3333333333333,67.6866666666667,Actual,1.2,1002,1059361
      Wisconsin,55,2020-7-24,119,-13.6666666666667,91.85,Actual,6.6,878,5822434
      Nevada,32,2020-7-24,102,-30,66.1233333333333,Actual,11.6,722,3080156
      Iowa,19,2020-7-24,111,-9.66666666666667,92.0933333333333,Actual,4.6,826,3155070
      Oklahoma,40,2020-7-24,105,-12.6666666666667,91.51,Actual,7,484,3956971
      Kentucky,21,2020-7-24,115,-16.3333333333333,90.07,Actual,5.2,691,4467673
      New York,36,2020-7-25,118,-24.6666666666667,61.6133333333333,Actual,17.4,32608,26161672
      New Jersey,34,2020-7-25,114,-18.3333333333333,62.6866666666667,Actual,19.4,15776,8882190
      California,6,2020-7-25,115,-29,67.7166666666666,Actual,89.4,8408,39512223
      Texas,48,2020-7-25,124,-25.6666666666667,85.3566666666667,Actual,262.2,5705,28995881
      Massachusetts,25,2020-7-25,109,-21,61.9933333333333,Actual,13.6,8509,6892503
      Florida,12,2020-7-25,123,-29.6666666666667,75.61,Actual,117.2,5777,21477737
      Illinois,17,2020-7-25,109,-12.3333333333333,72.43,Actual,13.6,7589,12671821
      Pennsylvania,42,2020-7-25,109,-15,72.4933333333333,Actual,10.8,7124,12801989
      Michigan,26,2020-7-25,111,-5.33333333333333,77.8366666666667,Actual,3.4,6327,9986857
      Connecticut,9,2020-7-25,124,-10,82.5433333333333,Actual,2.4,4413,3565287
      Louisiana,22,2020-7-25,128,-21.3333333333333,91.9366666666666,Actual,23.2,3715,4648794
      Georgia,13,2020-7-25,129,-19,87.74,Actual,34.8,3494,10617423
      Arizona,4,2020-7-25,121,-26.3333333333333,81.9733333333334,Actual,66,3286,7278717
      Ohio,39,2020-7-25,107,-6,85.6,Actual,21.8,3297,11689100
      Maryland,24,2020-7-25,103,-17,66.9366666666667,Actual,8.4,3433,6045680
      Indiana,18,2020-7-25,108,1.33333333333333,90.8866666666667,Actual,8.6,2895,6732219
      Virginia,51,2020-7-25,118,-15,78.4866666666667,Actual,6.2,2075,8535519
      North Carolina,37,2020-7-25,116,-13.3333333333333,83.1366666666666,Actual,21.2,1811,10488084
      South Carolina,45,2020-7-25,118,-4.66666666666667,96.74,Actual,44.2,1465,5148714
      Mississippi,28,2020-7-25,120,-7.66666666666667,101.303333333333,Actual,15,1478,2976149
      Colorado,8,2020-7-25,124,-18.3333333333333,81.27,Actual,5.6,1794,5758736
      Alabama,1,2020-7-25,118,-4,97.03,Actual,25.4,1456,4903185
      Minnesota,27,2020-7-25,102,-20.3333333333333,68.7266666666666,Actual,4.8,1611,5639632
      Washington,53,2020-7-25,130,-17.3333333333333,81.5033333333333,Actual,10,1494,7614893
      Missouri,29,2020-7-25,102,-8.66666666666667,83.7533333333333,Actual,11.6,1155,6137428
      Tennessee,47,2020-7-25,103,-7,84.0966666666667,Actual,18,964,6829174
      Rhode Island,44,2020-7-25,99,-13,68.5566666666667,Actual,1.4,1002,1059361
      Wisconsin,55,2020-7-25,120,-2.33333333333333,92.8266666666667,Actual,5.6,891,5822434
      Nevada,32,2020-7-25,103,-26.6666666666667,66.8566666666667,Actual,7,732,3080156
      Iowa,19,2020-7-25,112,-2.66666666666667,93.0666666666667,Actual,4.4,826,3155070
      Oklahoma,40,2020-7-25,106,-5,92.46,Actual,4.4,496,3956971
      Kentucky,21,2020-7-25,116,-3.66666666666667,91.0333333333333,Actual,6.4,696,4467673
      New York,36,2020-7-26,119,-25.6666666666667,62.3566666666667,Actual,11.8,32630,26161672
      New Jersey,34,2020-7-26,115,-21.6666666666667,63.47,Actual,19,15787,8882190
      California,6,2020-7-26,116,-29,68.4266666666666,Actual,95.6,8448,39512223
      Texas,48,2020-7-26,125,-25.6666666666667,86.1,Actual,278.2,5798,28995881
      Massachusetts,25,2020-7-26,110,-20.3333333333333,62.79,Actual,13.4,8528,6892503
      Florida,12,2020-7-26,124,-31,76.3,Actual,119.8,5854,21477737
      Illinois,17,2020-7-26,110,-17,73.26,Actual,15.6,7590,12671821
      Pennsylvania,42,2020-7-26,110,-14,73.3533333333333,Actual,12.2,7127,12801989
      Michigan,26,2020-7-26,112,-5,78.7866666666667,Actual,5.2,6327,9986857
      Connecticut,9,2020-7-26,125,-10,83.4433333333333,Actual,2.6,4413,3565287
      Louisiana,22,2020-7-26,129,-24,92.6966666666666,Actual,25.2,3763,4648794
      Georgia,13,2020-7-26,130,-21.6666666666667,88.5233333333333,Actual,40.4,3498,10617423
      Arizona,4,2020-7-26,122,-25.3333333333333,82.72,Actual,69,3305,7278717
      Ohio,39,2020-7-26,108,-6,86.5399999999999,Actual,25.2,3307,11689100
      Maryland,24,2020-7-26,104,-19,67.7466666666667,Actual,9.8,3440,6045680
      Indiana,18,2020-7-26,109,-0.666666666666667,91.88,Actual,8.8,2903,6732219
      Virginia,51,2020-7-26,119,-18,79.3066666666667,Actual,8.2,2078,8535519
      North Carolina,37,2020-7-26,117,-16.3333333333333,83.9733333333333,Actual,20.8,1817,10488084
      South Carolina,45,2020-7-26,119,-4.66666666666667,97.6933333333333,Actual,46.2,1491,5148714
      Mississippi,28,2020-7-26,121,-10,102.203333333333,Actual,20.8,1493,2976149
      Colorado,8,2020-7-26,125,-15.6666666666667,82.1133333333333,Actual,4.2,1794,5758736
      Alabama,1,2020-7-26,119,-8.66666666666667,97.9433333333333,Actual,18.8,1473,4903185
      Minnesota,27,2020-7-26,103,-17.6666666666667,69.55,Actual,3.8,1614,5639632
      Washington,53,2020-7-26,131,-14,82.3633333333333,Actual,13.2,1501,7614893
      Missouri,29,2020-7-26,103,-6.66666666666667,84.6866666666666,Actual,8,1164,6137428
      Tennessee,47,2020-7-26,104,-10.6666666666667,84.99,Actual,14.8,967,6829174
      Rhode Island,44,2020-7-26,100,-9,69.4666666666667,Actual,0.8,1002,1059361
      Wisconsin,55,2020-7-26,121,-3.66666666666667,93.79,Actual,5.6,892,5822434
      Nevada,32,2020-7-26,104,-26,67.5966666666666,Actual,10,734,3080156
      Iowa,19,2020-7-26,113,-3.66666666666667,94.03,Actual,3.8,829,3155070
      Oklahoma,40,2020-7-26,107,-5,93.41,Actual,6.4,496,3956971
      Kentucky,21,2020-7-26,117,-8,91.9533333333333,Actual,7,700,4467673
      New York,36,2020-7-27,120,-37.3333333333333,62.9833333333333,Actual,12.4,32645,26161672
      New Jersey,34,2020-7-27,116,-33.6666666666667,64.1333333333333,Actual,6.6,15804,8882190
      California,6,2020-7-27,117,-37.6666666666667,69.05,Actual,114.2,8494,39512223
      Texas,48,2020-7-27,126,-29.3333333333333,86.8066666666667,Actual,308.6,6483,28995881
      Massachusetts,25,2020-7-27,111,-35,63.44,Actual,16.4,8535,6892503
      Florida,12,2020-7-27,125,-35,76.95,Actual,136,5931,21477737
      Illinois,17,2020-7-27,111,-28.6666666666667,73.9733333333333,Actual,15.4,7608,12671821
      Pennsylvania,42,2020-7-27,111,-26.6666666666667,74.0866666666667,Actual,11,7131,12801989
      Michigan,26,2020-7-27,113,-19,79.5966666666667,Actual,4.4,6332,9986857
      Connecticut,9,2020-7-27,126,-23,84.2133333333333,Actual,2.4,4418,3565287
      Louisiana,22,2020-7-27,130,-23.6666666666667,93.46,Actual,33.6,3786,4648794
      Georgia,13,2020-7-27,131,-27.3333333333333,89.25,Actual,39.8,3509,10617423
      Arizona,4,2020-7-27,123,-31.6666666666667,83.4033333333334,Actual,62.2,3304,7278717
      Ohio,39,2020-7-27,109,-18,87.3599999999999,Actual,25,3344,11689100
      Maryland,24,2020-7-27,105,-32,68.4266666666667,Actual,11.2,3447,6045680
      Indiana,18,2020-7-27,110,-11.6666666666667,92.7633333333333,Actual,9.6,2906,6732219
      Virginia,51,2020-7-27,120,-28.3333333333333,80.0233333333334,Actual,11.6,2082,8535519
      North Carolina,37,2020-7-27,118,-22,84.7533333333333,Actual,19.8,1838,10488084
      South Carolina,45,2020-7-27,120,-13.6666666666667,98.5566666666667,Actual,46,1506,5148714
      Mississippi,28,2020-7-27,122,-10.6666666666667,103.096666666667,Actual,20,1498,2976149
      Colorado,8,2020-7-27,126,-23.3333333333333,82.88,Actual,6.4,1799,5758736
      Alabama,1,2020-7-27,120,-14,98.8033333333333,Actual,20,1491,4903185
      Minnesota,27,2020-7-27,104,-27,70.28,Actual,4.6,1616,5639632
      Washington,53,2020-7-27,132,-29.3333333333333,83.07,Actual,12,1518,7614893
      Missouri,29,2020-7-27,104,-19.3333333333333,85.4933333333333,Actual,7.6,1175,6137428
      Tennessee,47,2020-7-27,105,-16,85.83,Actual,16.4,978,6829174
      Rhode Island,44,2020-7-27,101,-23.6666666666667,70.23,Actual,1,1004,1059361
      Wisconsin,55,2020-7-27,122,-14,94.65,Actual,6.6,893,5822434
      Nevada,32,2020-7-27,105,-29,68.3066666666666,Actual,11.6,739,3080156
      Iowa,19,2020-7-27,114,-12,94.91,Actual,5.6,836,3155070
      Oklahoma,40,2020-7-27,108,-14,94.27,Actual,7.8,496,3956971
      Kentucky,21,2020-7-27,118,-17,92.7833333333333,Actual,6.6,709,4467673
      New York,36,2020-7-28,121,-37,63.6133333333333,Actual,15,32653,26161672
      New Jersey,34,2020-7-28,117,-34,64.7933333333333,Actual,6.6,15825,8882190
      California,6,2020-7-28,118,-37.6666666666667,69.6733333333333,Actual,123.6,8679,39512223
      Texas,48,2020-7-28,127,-30.3333333333333,87.5033333333333,Actual,296.8,6753,28995881
      Massachusetts,25,2020-7-28,112,-35.3333333333333,64.0866666666667,Actual,14,8550,6892503
      Florida,12,2020-7-28,126,-34.6666666666667,77.6033333333334,Actual,161.8,6117,21477737
      Illinois,17,2020-7-28,112,-26.6666666666667,74.7066666666667,Actual,16.2,7638,12671821
      Pennsylvania,42,2020-7-28,112,-25.3333333333333,74.8333333333333,Actual,14,7154,12801989
      Michigan,26,2020-7-28,114,-17.3333333333333,80.4233333333334,Actual,8.4,6348,9986857
      Connecticut,9,2020-7-28,127,-22.6666666666667,84.9866666666667,Actual,3.6,4423,3565287
      Louisiana,22,2020-7-28,131,-22.6666666666667,94.2333333333333,Actual,42,3812,4648794
      Georgia,13,2020-7-28,132,-27.3333333333333,89.9766666666666,Actual,35.4,3563,10617423
      Arizona,4,2020-7-28,124,-30.6666666666667,84.0966666666667,Actual,68,3408,7278717
      Ohio,39,2020-7-28,110,-13.6666666666667,88.2233333333333,Actual,29,3382,11689100
      Maryland,24,2020-7-28,106,-30.6666666666667,69.12,Actual,11,3458,6045680
      Indiana,18,2020-7-28,111,-9.33333333333333,93.67,Actual,10.2,2924,6732219
      Virginia,51,2020-7-28,121,-28.6666666666667,80.7366666666667,Actual,13.2,2095,8535519
      North Carolina,37,2020-7-28,119,-23.3333333333333,85.52,Actual,22.2,1860,10488084
      South Carolina,45,2020-7-28,121,-13.6666666666667,99.42,Actual,40.4,1565,5148714
      Mississippi,28,2020-7-28,123,-10.6666666666667,103.99,Actual,26.6,1540,2976149
      Colorado,8,2020-7-28,127,-26.6666666666667,83.6133333333333,Actual,5.6,1807,5758736
      Alabama,1,2020-7-28,121,-14.3333333333333,99.66,Actual,21.8,1491,4903185
      Minnesota,27,2020-7-28,105,-27.3333333333333,71.0066666666667,Actual,4.6,1620,5639632
      Washington,53,2020-7-28,133,-29.6666666666667,83.7733333333333,Actual,14,1548,7614893
      Missouri,29,2020-7-28,105,-18,86.3133333333333,Actual,10.2,1186,6137428
      Tennessee,47,2020-7-28,106,-16,86.67,Actual,13.8,999,6829174
      Rhode Island,44,2020-7-28,102,-25.6666666666667,70.9733333333333,Actual,1,1005,1059361
      Wisconsin,55,2020-7-28,123,-15,95.5,Actual,5.6,906,5822434
      Nevada,32,2020-7-28,106,-28.6666666666667,69.02,Actual,13.8,759,3080156
      Iowa,19,2020-7-28,115,-13.6666666666667,95.7733333333333,Actual,7.8,839,3155070
      Oklahoma,40,2020-7-28,109,-14.3333333333333,95.1266666666667,Actual,8,509,3956971
      Kentucky,21,2020-7-28,119,-16.3333333333333,93.62,Actual,7,719,4467673
      New York,36,2020-7-29,122,-36,64.2533333333333,Actual,11.8,32658,26161672
      New Jersey,34,2020-7-29,118,-32,65.4733333333333,Actual,6.4,15798,8882190
      California,6,2020-7-29,119,-38.3333333333333,70.29,Actual,153.2,8908,39512223
      Texas,48,2020-7-29,128,-28,88.2233333333333,Actual,302.2,7066,28995881
      Massachusetts,25,2020-7-29,113,-33.6666666666667,64.75,Actual,16,8579,6892503
      Florida,12,2020-7-29,127,-33.6666666666667,78.2666666666667,Actual,197.8,6333,21477737
      Illinois,17,2020-7-29,113,-27.3333333333333,75.4333333333333,Actual,20.4,7654,12671821
      Pennsylvania,42,2020-7-29,113,-25.3333333333333,75.58,Actual,16,7171,12801989
      Michigan,26,2020-7-29,115,-16.6666666666667,81.2566666666667,Actual,9.8,6349,9986857
      Connecticut,9,2020-7-29,128,-22.3333333333333,85.7633333333333,Actual,3.8,4425,3565287
      Louisiana,22,2020-7-29,132,-19.3333333333333,95.04,Actual,37.2,3883,4648794
      Georgia,13,2020-7-29,133,-26.3333333333333,90.7133333333333,Actual,50.8,3642,10617423
      Arizona,4,2020-7-29,125,-31,84.7866666666667,Actual,77.8,3454,7278717
      Ohio,39,2020-7-29,111,-14.3333333333333,89.0799999999999,Actual,36.4,3422,11689100
      Maryland,24,2020-7-29,107,-31,69.81,Actual,10.6,3478,6045680
      Indiana,18,2020-7-29,112,-9.66666666666667,94.5733333333334,Actual,12.4,2932,6732219
      Virginia,51,2020-7-29,122,-27.3333333333333,81.4633333333334,Actual,19.2,2125,8535519
      North Carolina,37,2020-7-29,120,-24.6666666666667,86.2733333333333,Actual,25,1888,10488084
      South Carolina,45,2020-7-29,122,-14,100.28,Actual,44.2,1615,5148714
      Mississippi,28,2020-7-29,124,-9.33333333333333,104.896666666667,Actual,34,1563,2976149
      Colorado,8,2020-7-29,128,-25.6666666666667,84.3566666666667,Actual,8.8,1822,5758736
      Alabama,1,2020-7-29,122,-13,100.53,Actual,21.4,1538,4903185
      Minnesota,27,2020-7-29,106,-25.6666666666667,71.75,Actual,5.2,1629,5639632
      Washington,53,2020-7-29,134,-29.6666666666667,84.4766666666666,Actual,12.6,1555,7614893
      Missouri,29,2020-7-29,106,-15.3333333333333,87.16,Actual,10,1190,6137428
      Tennessee,47,2020-7-29,107,-16.3333333333333,87.5066666666667,Actual,18.6,1020,6829174
      Rhode Island,44,2020-7-29,103,-24.3333333333333,71.73,Actual,1,1007,1059361
      Wisconsin,55,2020-7-29,124,-13.6666666666667,96.3633333333333,Actual,8.4,911,5822434
      Nevada,32,2020-7-29,107,-29.3333333333333,69.7266666666666,Actual,19.2,780,3080156
      Iowa,19,2020-7-29,116,-11.3333333333333,96.66,Actual,8.6,854,3155070
      Oklahoma,40,2020-7-29,110,-11,96.0166666666667,Actual,9,523,3956971
      Kentucky,21,2020-7-29,120,-16.6666666666667,94.4533333333333,Actual,7,724,4467673
      New York,36,2020-7-30,123,-36.6666666666667,64.8866666666667,Actual,9.8,32683,26161672
      New Jersey,34,2020-7-30,119,-33.3333333333333,66.14,Actual,5.2,15809,8882190
      California,6,2020-7-30,120,-38.3333333333333,70.9066666666666,Actual,170.2,9026,39512223
      Texas,48,2020-7-30,129,-27.6666666666667,88.9466666666667,Actual,218.6,7189,28995881
      Massachusetts,25,2020-7-30,114,-34.3333333333333,65.4066666666667,Actual,18,8579,6892503
      Florida,12,2020-7-30,128,-33,78.9366666666667,Actual,218.2,6586,21477737
      Illinois,17,2020-7-30,114,-27,76.1633333333333,Actual,18.4,7670,12671821
      Pennsylvania,42,2020-7-30,114,-25.3333333333333,76.3266666666667,Actual,17.6,7194,12801989
      Michigan,26,2020-7-30,116,-16.6666666666667,82.09,Actual,10.2,6369,9986857
      Connecticut,9,2020-7-30,129,-22.6666666666667,86.5366666666667,Actual,2.8,4431,3565287
      Louisiana,22,2020-7-30,133,-20,95.84,Actual,32.6,3925,4648794
      Georgia,13,2020-7-30,134,-27.3333333333333,91.44,Actual,63.2,3671,10617423
      Arizona,4,2020-7-30,126,-31.6666666666667,85.47,Actual,88.6,3626,7278717
      Ohio,39,2020-7-30,112,-16.3333333333333,89.9166666666666,Actual,34.2,3442,11689100
      Maryland,24,2020-7-30,108,-32.3333333333333,70.4866666666667,Actual,11.8,3488,6045680
      Indiana,18,2020-7-30,113,-11.6666666666667,95.4566666666667,Actual,13,2946,6732219
      Virginia,51,2020-7-30,123,-28.6666666666667,82.1766666666667,Actual,26.6,2141,8535519
      North Carolina,37,2020-7-30,121,-23.3333333333333,87.0399999999999,Actual,28.2,1922,10488084
      South Carolina,45,2020-7-30,123,-13,101.15,Actual,49,1667,5148714
      Mississippi,28,2020-7-30,125,-10.3333333333333,105.793333333333,Actual,39,1611,2976149
      Colorado,8,2020-7-30,129,-25.3333333333333,85.1033333333333,Actual,9,1822,5758736
      Alabama,1,2020-7-30,123,-13.3333333333333,101.396666666667,Actual,22.4,1565,4903185
      Minnesota,27,2020-7-30,107,-27,72.48,Actual,6,1634,5639632
      Washington,53,2020-7-30,135,-31,85.1666666666666,Actual,14.8,1564,7614893
      Missouri,29,2020-7-30,107,-18.3333333333333,87.9766666666666,Actual,9.6,1206,6137428
      Tennessee,47,2020-7-30,108,-17,88.3366666666667,Actual,17.8,1033,6829174
      Rhode Island,44,2020-7-30,104,-24.6666666666667,72.4833333333333,Actual,0.6,1007,1059361
      Wisconsin,55,2020-7-30,125,-12.3333333333333,97.24,Actual,10.8,919,5822434
      Nevada,32,2020-7-30,108,-30.3333333333333,70.4233333333333,Actual,18.6,801,3080156
      Iowa,19,2020-7-30,117,-12.3333333333333,97.5366666666667,Actual,7.6,865,3155070
      Oklahoma,40,2020-7-30,111,-10.6666666666667,96.91,Actual,10.6,536,3956971
      Kentucky,21,2020-7-30,121,-19.6666666666667,95.2566666666666,Actual,6.2,731,4467673
      New York,36,2020-7-31,124,-37,65.5166666666667,Actual,11.4,32689,26161672
      New Jersey,34,2020-7-31,120,-33,66.81,Actual,2.2,15819,8882190
      California,6,2020-7-31,121,-37.3333333333333,71.5333333333333,Actual,143.4,9214,39512223
      Texas,48,2020-7-31,130,-27.3333333333333,89.6733333333333,Actual,165.6,7309,28995881
      Massachusetts,25,2020-7-31,115,-33.3333333333333,66.0733333333333,Actual,17.4,8608,6892503
      Florida,12,2020-7-31,129,-33,79.6066666666667,Actual,193.4,6843,21477737
      Illinois,17,2020-7-31,115,-26,76.9033333333333,Actual,15.2,7692,12671821
      Pennsylvania,42,2020-7-31,115,-26.6666666666667,77.06,Actual,13.8,7207,12801989
      Michigan,26,2020-7-31,117,-18,82.91,Actual,7,6376,9986857
      Connecticut,9,2020-7-31,130,-23.3333333333333,87.3033333333333,Actual,1.8,4432,3565287
      Louisiana,22,2020-7-31,134,-21.6666666666667,96.6233333333333,Actual,39,3949,4648794
      Georgia,13,2020-7-31,135,-26,92.18,Actual,55.4,3752,10617423
      Arizona,4,2020-7-31,127,-31.6666666666667,86.1533333333334,Actual,71.4,3694,7278717
      Ohio,39,2020-7-31,113,-14.3333333333333,90.7733333333333,Actual,29.4,3489,11689100
      Maryland,24,2020-7-31,109,-33.6666666666667,71.15,Actual,11.4,3493,6045680
      Indiana,18,2020-7-31,114,-9.33333333333333,96.3633333333334,Actual,10.2,2965,6732219
      Virginia,51,2020-7-31,124,-28.6666666666667,82.89,Actual,24.6,2174,8535519
      North Carolina,37,2020-7-31,122,-21.6666666666667,87.8233333333333,Actual,24.6,1942,10488084
      South Carolina,45,2020-7-31,124,-11.3333333333333,102.036666666667,Actual,42.4,1712,5148714
      Mississippi,28,2020-7-31,126,-10.6666666666667,106.686666666667,Actual,32.6,1663,2976149
      Colorado,8,2020-7-31,130,-24.6666666666667,85.8566666666667,Actual,7.4,1838,5758736
      Alabama,1,2020-7-31,124,-12.6666666666667,102.27,Actual,27.2,1580,4903185
      Minnesota,27,2020-7-31,108,-27.3333333333333,73.2066666666667,Actual,6.8,1640,5639632
      Washington,53,2020-7-31,136,-30,85.8666666666666,Actual,9.6,1564,7614893
      Missouri,29,2020-7-31,108,-10.3333333333333,88.8733333333333,Actual,7.4,1214,6137428
      Tennessee,47,2020-7-31,109,-16,89.1766666666667,Actual,14.8,1060,6829174
      Rhode Island,44,2020-7-31,105,-24.6666666666667,73.2366666666667,Actual,0.4,1007,1059361
      Wisconsin,55,2020-7-31,126,-12.6666666666667,98.1133333333333,Actual,8.4,934,5822434
      Nevada,32,2020-7-31,109,-30.6666666666667,71.1166666666666,Actual,14.6,830,3080156
      Iowa,19,2020-7-31,118,-8.33333333333333,98.4533333333333,Actual,7.8,872,3155070
      Oklahoma,40,2020-7-31,112,-9.33333333333333,97.8166666666667,Actual,8.2,541,3956971
      Kentucky,21,2020-7-31,122,-16.6666666666667,96.09,Actual,4.6,735,4467673
      New York,36,2020-8-1,125,-24.6666666666667,66.27,Actual,12.2,32694,26161672
      New Jersey,34,2020-8-1,121,-17,67.64,Actual,9.6,15830,8882190
      California,6,2020-8-1,122,-28.3333333333333,72.25,Actual,106.6,9345,39512223
      Texas,48,2020-8-1,131,-20.3333333333333,90.47,Actual,130.4,7576,28995881
      Massachusetts,25,2020-8-1,116,-19.6666666666667,66.8766666666667,Actual,13.6,8625,6892503
      Florida,12,2020-8-1,130,-32,80.2866666666667,Actual,164.8,7022,21477737
      Illinois,17,2020-8-1,116,-14,77.7633333333333,Actual,13.8,7700,12671821
      Pennsylvania,42,2020-8-1,116,-15.3333333333333,77.9066666666667,Actual,10.6,7219,12801989
      Michigan,26,2020-8-1,118,-7.66666666666667,83.8333333333334,Actual,8.8,6383,9986857
      Connecticut,9,2020-8-1,131,-10.3333333333333,88.2,Actual,2.4,4432,3565287
      Louisiana,22,2020-8-1,135,-17.3333333333333,97.45,Actual,28.2,3949,4648794
      Georgia,13,2020-8-1,136,-16.3333333333333,93.0166666666666,Actual,40,3825,10617423
      Arizona,4,2020-8-1,128,-25.6666666666667,86.8966666666667,Actual,65,3747,7278717
      Ohio,39,2020-8-1,114,-9.33333333333333,91.6799999999999,Actual,23.4,3515,11689100
      Maryland,24,2020-8-1,110,-18.3333333333333,71.9666666666667,Actual,9,3506,6045680
      Indiana,18,2020-8-1,115,-1.66666666666667,97.3466666666667,Actual,9.6,2971,6732219
      Virginia,51,2020-8-1,125,-15,83.74,Actual,18.6,2215,8535519
      North Carolina,37,2020-8-1,123,-13.3333333333333,88.6899999999999,Actual,31,1979,10488084
      South Carolina,45,2020-8-1,125,-3.33333333333333,103.003333333333,Actual,35.6,1751,5148714
      Mississippi,28,2020-8-1,127,-1.33333333333333,107.673333333333,Actual,29.6,1693,2976149
      Colorado,8,2020-8-1,131,-16.6666666666667,86.69,Actual,4.4,1844,5758736
      Alabama,1,2020-8-1,125,-1,103.26,Actual,19,1603,4903185
      Minnesota,27,2020-8-1,109,-17.3333333333333,74.0333333333333,Actual,5.4,1646,5639632
      Washington,53,2020-8-1,137,-18,86.6866666666666,Actual,9,1592,7614893
      Missouri,29,2020-8-1,109,-7.66666666666667,89.7966666666666,Actual,7,1223,6137428
      Tennessee,47,2020-8-1,110,-5,90.1266666666667,Actual,14.4,1067,6829174
      Rhode Island,44,2020-8-1,106,-13.6666666666667,74.1,Actual,0.6,1007,1059361
      Wisconsin,55,2020-8-1,127,-1.66666666666667,99.0966666666667,Actual,7.6,947,5822434
      Nevada,32,2020-8-1,110,-26.3333333333333,71.8533333333333,Actual,13.4,832,3080156
      Iowa,19,2020-8-1,119,-1,99.4433333333333,Actual,6,874,3155070
      Oklahoma,40,2020-8-1,113,-1.66666666666667,98.8,Actual,5.6,549,3956971
      Kentucky,21,2020-8-1,123,-6.33333333333333,97.0266666666666,Actual,4,740,4467673
      New York,36,2020-8-2,126,-27,67,Actual,8.4,32710,26161672
      New Jersey,34,2020-8-2,122,-22.3333333333333,68.4166666666667,Actual,9.6,15836,8882190
      California,6,2020-8-2,123,-28,72.97,Actual,131.6,9396,39512223
      Texas,48,2020-8-2,132,-20.3333333333333,91.2666666666667,Actual,152.6,7581,28995881
      Massachusetts,25,2020-8-2,117,-21.3333333333333,67.6633333333333,Actual,15.4,8637,6892503
      Florida,12,2020-8-2,131,-37.3333333333333,80.9133333333334,Actual,163.2,7084,21477737
      Illinois,17,2020-8-2,117,-16.3333333333333,78.6,Actual,14.4,7714,12671821
      Pennsylvania,42,2020-8-2,117,-15.3333333333333,78.7533333333333,Actual,10.8,7223,12801989
      Michigan,26,2020-8-2,119,-8.33333333333333,84.75,Actual,5.6,6383,9986857
      Connecticut,9,2020-8-2,132,-13.3333333333333,89.0666666666666,Actual,1.2,4432,3565287
      Louisiana,22,2020-8-2,136,-18,98.27,Actual,25.2,4007,4648794
      Georgia,13,2020-8-2,137,-21,93.8066666666666,Actual,50,3840,10617423
      Arizona,4,2020-8-2,129,-24.3333333333333,87.6533333333334,Actual,43.8,3765,7278717
      Ohio,39,2020-8-2,115,-8.66666666666667,92.5933333333333,Actual,25.6,3529,11689100
      Maryland,24,2020-8-2,111,-20.6666666666667,72.76,Actual,8.4,3515,6045680
      Indiana,18,2020-8-2,116,0,98.3466666666667,Actual,10,2975,6732219
      Virginia,51,2020-8-2,126,-18,84.56,Actual,20.6,2218,8535519
      North Carolina,37,2020-8-2,124,-16,89.5299999999999,Actual,27.8,1983,10488084
      South Carolina,45,2020-8-2,126,-4.33333333333333,103.96,Actual,36,1777,5148714
      Mississippi,28,2020-8-2,128,-4,108.633333333333,Actual,28.4,1703,2976149
      Colorado,8,2020-8-2,132,-15,87.54,Actual,5.4,1844,5758736
      Alabama,1,2020-8-2,126,-6.66666666666667,104.193333333333,Actual,20.2,1627,4903185
      Minnesota,27,2020-8-2,110,-15.3333333333333,74.88,Actual,5.2,1654,5639632
      Washington,53,2020-8-2,138,-14.3333333333333,87.5433333333333,Actual,11,1596,7614893
      Missouri,29,2020-8-2,110,-5.33333333333333,90.7433333333333,Actual,5.8,1223,6137428
      Tennessee,47,2020-8-2,111,-7.66666666666667,91.0500000000001,Actual,16.8,1073,6829174
      Rhode Island,44,2020-8-2,107,-11.6666666666667,74.9833333333333,Actual,0.8,1007,1059361
      Wisconsin,55,2020-8-2,128,-3.66666666666667,100.06,Actual,8.4,948,5822434
      Nevada,32,2020-8-2,111,-25.6666666666667,72.5966666666666,Actual,12.2,832,3080156
      Iowa,19,2020-8-2,120,1,100.453333333333,Actual,4.6,878,3155070
      Oklahoma,40,2020-8-2,114,-2.66666666666667,99.7733333333333,Actual,6,550,3956971
      Kentucky,21,2020-8-2,124,-7,97.9566666666666,Actual,4,742,4467673
      New York,36,2020-8-3,127,-35.3333333333333,67.6466666666667,Actual,13,32719,26161672
      New Jersey,34,2020-8-3,123,-31.3333333333333,69.1033333333334,Actual,4.6,15846,8882190
      California,6,2020-8-3,124,-36.3333333333333,73.6066666666666,Actual,118.8,9441,39512223
      Texas,48,2020-8-3,133,-27,91.9966666666667,Actual,200.2,7718,28995881
      Massachusetts,25,2020-8-3,118,-32.6666666666667,68.3366666666666,Actual,10,8647,6892503
      Florida,12,2020-8-3,132,-34.3333333333333,81.57,Actual,156.8,7157,21477737
      Illinois,17,2020-8-3,118,-27.6666666666667,79.3233333333333,Actual,15.6,7723,12671821
      Pennsylvania,42,2020-8-3,118,-25,79.5033333333333,Actual,9.4,7224,12801989
      Michigan,26,2020-8-3,120,-16.6666666666667,85.5833333333334,Actual,5.6,6393,9986857
      Connecticut,9,2020-8-3,133,-20,89.8666666666666,Actual,1,4437,3565287
      Louisiana,22,2020-8-3,137,-18,99.09,Actual,29.4,4024,4648794
      Georgia,13,2020-8-3,138,-27,94.5366666666666,Actual,46.4,3842,10617423
      Arizona,4,2020-8-3,130,-30.3333333333333,88.3500000000001,Actual,47.6,3779,7278717
      Ohio,39,2020-8-3,116,-15.3333333333333,93.4399999999999,Actual,21.4,3539,11689100
      Maryland,24,2020-8-3,112,-33,73.43,Actual,8.6,3523,6045680
      Indiana,18,2020-8-3,117,-9.33333333333333,99.2533333333334,Actual,8.4,2980,6732219
      Virginia,51,2020-8-3,127,-29.3333333333333,85.2666666666667,Actual,20,2218,8535519
      North Carolina,37,2020-8-3,125,-24.3333333333333,90.2866666666666,Actual,28.6,2043,10488084
      South Carolina,45,2020-8-3,127,-19.3333333333333,104.766666666667,Actual,36.4,1793,5148714
      Mississippi,28,2020-8-3,129,-6.33333333333333,109.57,Actual,28.2,1711,2976149
      Colorado,8,2020-8-3,133,-23,88.31,Actual,2.6,1844,5758736
      Alabama,1,2020-8-3,127,-10,105.093333333333,Actual,23,1633,4903185
      Minnesota,27,2020-8-3,111,-26.3333333333333,75.6166666666667,Actual,6,1656,5639632
      Washington,53,2020-8-3,139,-28.6666666666667,88.2566666666666,Actual,12,1600,7614893
      Missouri,29,2020-8-3,111,-15.3333333333333,91.59,Actual,5.2,1225,6137428
      Tennessee,47,2020-8-3,112,-14,91.9100000000001,Actual,16.8,1092,6829174
      Rhode Island,44,2020-8-3,108,-22.3333333333333,75.76,Actual,1,1010,1059361
      Wisconsin,55,2020-8-3,129,-14.3333333333333,100.916666666667,Actual,7.2,949,5822434
      Nevada,32,2020-8-3,112,-28,73.3166666666666,Actual,12,847,3080156
      Iowa,19,2020-8-3,121,-10.3333333333333,101.35,Actual,5.6,884,3155070
      Oklahoma,40,2020-8-3,115,-9.66666666666667,100.676666666667,Actual,8.4,551,3956971
      Kentucky,21,2020-8-3,125,-15,98.8066666666666,Actual,3.4,744,4467673
      New York,36,2020-8-4,128,,,Actual,12.4,32725,26161672
      New Jersey,34,2020-8-4,124,,,Actual,3.8,15857,8882190
      California,6,2020-8-4,125,,,Actual,135.2,9684,39512223
      Texas,48,2020-8-4,134,,,Actual,198.6,7952,28995881
      Massachusetts,25,2020-8-4,119,,,Actual,13,8656,6892503
      Florida,12,2020-8-4,133,,,Actual,145,7402,21477737
      Illinois,17,2020-8-4,119,,,Actual,18.2,7742,12671821
      Pennsylvania,42,2020-8-4,119,,,Actual,12.6,7248,12801989
      Michigan,26,2020-8-4,121,,,Actual,9.8,6397,9986857
      Connecticut,9,2020-8-4,134,,,Actual,1,4437,3565287
      Louisiana,22,2020-8-4,138,,,Actual,39.4,4051,4648794
      Georgia,13,2020-8-4,139,,,Actual,40.2,3921,10617423
      Arizona,4,2020-8-4,131,,,Actual,51,3845,7278717
      Ohio,39,2020-8-4,117,,,Actual,20.6,3570,11689100
      Maryland,24,2020-8-4,113,,,Actual,9,3530,6045680
      Indiana,18,2020-8-4,118,,,Actual,8.4,2996,6732219
      Virginia,51,2020-8-4,128,,,Actual,16.8,2244,8535519
      North Carolina,37,2020-8-4,126,,,Actual,29.4,2061,10488084
      South Carolina,45,2020-8-4,128,,,Actual,38.2,1847,5148714
      Mississippi,28,2020-8-4,130,,,Actual,26.4,1753,2976149
      Colorado,8,2020-8-4,134,,,Actual,1.6,1849,5758736
      Alabama,1,2020-8-4,128,,,Actual,22.2,1666,4903185
      Minnesota,27,2020-8-4,112,,,Actual,6.2,1660,5639632
      Washington,53,2020-8-4,140,,,Actual,12.2,1619,7614893
      Missouri,29,2020-8-4,112,,,Actual,4.2,1235,6137428
      Tennessee,47,2020-8-4,113,,,Actual,23.8,1117,6829174
      Rhode Island,44,2020-8-4,109,,,Actual,1.4,1011,1059361
      Wisconsin,55,2020-8-4,130,,,Actual,6.2,961,5822434
      Nevada,32,2020-8-4,113,,,Actual,13.6,862,3080156
      Iowa,19,2020-8-4,122,,,Actual,7.6,888,3155070
      Oklahoma,40,2020-8-4,116,,,Actual,8.8,566,3956971
      Kentucky,21,2020-8-4,126,,,Actual,4,751,4467673
      New York,36,2020-8-5,129,,,Actual,10,32754,26161672
      New Jersey,34,2020-8-5,125,,,Actual,2.6,15842,8882190
      California,6,2020-8-5,126,,,Actual,147.4,9808,39512223
      Texas,48,2020-8-5,135,,,Actual,253.2,8310,28995881
      Massachusetts,25,2020-8-5,120,,,Actual,14.2,8658,6892503
      Florida,12,2020-8-5,134,,,Actual,168.6,7627,21477737
      Illinois,17,2020-8-5,120,,,Actual,21.6,7770,12671821
      Pennsylvania,42,2020-8-5,120,,,Actual,14.6,7254,12801989
      Michigan,26,2020-8-5,122,,,Actual,13.4,6404,9986857
      Connecticut,9,2020-8-5,135,,,Actual,1.8,4437,3565287
      Louisiana,22,2020-8-5,139,,,Actual,40,4096,4648794
      Georgia,13,2020-8-5,140,,,Actual,55.4,3984,10617423
      Arizona,4,2020-8-5,132,,,Actual,63.2,3932,7278717
      Ohio,39,2020-8-5,118,,,Actual,24.6,3596,11689100
      Maryland,24,2020-8-5,114,,,Actual,10,3536,6045680
      Indiana,18,2020-8-5,119,,,Actual,9.6,3007,6732219
      Virginia,51,2020-8-5,129,,,Actual,19.8,2274,8535519
      North Carolina,37,2020-8-5,127,,,Actual,35.4,2085,10488084
      South Carolina,45,2020-8-5,129,,,Actual,37,1894,5148714
      Mississippi,28,2020-8-5,131,,,Actual,29,1804,2976149
      Colorado,8,2020-8-5,135,,,Actual,2.6,1851,5758736
      Alabama,1,2020-8-5,129,,,Actual,21.6,1695,4903185
      Minnesota,27,2020-8-5,113,,,Actual,5.4,1670,5639632
      Washington,53,2020-8-5,141,,,Actual,15.2,1624,7614893
      Missouri,29,2020-8-5,113,,,Actual,8,1240,6137428
      Tennessee,47,2020-8-5,114,,,Actual,26.6,1144,6829174
      Rhode Island,44,2020-8-5,110,,,Actual,1.4,1012,1059361
      Wisconsin,55,2020-8-5,131,,,Actual,8.4,970,5822434
      Nevada,32,2020-8-5,114,,,Actual,17.6,890,3080156
      Iowa,19,2020-8-5,123,,,Actual,7.4,900,3155070
      Oklahoma,40,2020-8-5,117,,,Actual,10,583,3956971
      Kentucky,21,2020-8-5,127,,,Actual,4.4,752,4467673
      New York,36,2020-8-6,130,,,Actual,9.8,32756,26161672
      New Jersey,34,2020-8-6,126,,,Actual,4.6,15849,8882190
      California,6,2020-8-6,127,,,Actual,173.2,10021,39512223
      Texas,48,2020-8-6,136,,,Actual,268,8569,28995881
      Massachusetts,25,2020-8-6,121,,,Actual,14.6,8690,6892503
      Florida,12,2020-8-6,135,,,Actual,190.4,7747,21477737
      Illinois,17,2020-8-6,121,,,Actual,23.4,7791,12671821
      Pennsylvania,42,2020-8-6,121,,,Actual,17.2,7282,12801989
      Michigan,26,2020-8-6,123,,,Actual,10.6,6432,9986857
      Connecticut,9,2020-8-6,136,,,Actual,0.8,4437,3565287
      Louisiana,22,2020-8-6,140,,,Actual,36.6,4146,4648794
      Georgia,13,2020-8-6,141,,,Actual,68.8,4026,10617423
      Arizona,4,2020-8-6,133,,,Actual,71.6,4002,7278717
      Ohio,39,2020-8-6,119,,,Actual,25.8,3618,11689100
      Maryland,24,2020-8-6,115,,,Actual,10.8,3551,6045680
      Indiana,18,2020-8-6,120,,,Actual,11.2,3013,6732219
      Virginia,51,2020-8-6,130,,,Actual,20.8,2299,8535519
      North Carolina,37,2020-8-6,128,,,Actual,28.2,2126,10488084
      South Carolina,45,2020-8-6,130,,,Actual,42.8,1942,5148714
      Mississippi,28,2020-8-6,132,,,Actual,32.6,1825,2976149
      Colorado,8,2020-8-6,136,,,Actual,2.6,1852,5758736
      Alabama,1,2020-8-6,130,,,Actual,24.4,1714,4903185
      Minnesota,27,2020-8-6,114,,,Actual,6.6,1677,5639632
      Washington,53,2020-8-6,142,,,Actual,17.6,1653,7614893
      Missouri,29,2020-8-6,114,,,Actual,8.2,1244,6137428
      Tennessee,47,2020-8-6,115,,,Actual,24.6,1186,6829174
      Rhode Island,44,2020-8-6,111,,,Actual,0.8,1014,1059361
      Wisconsin,55,2020-8-6,132,,,Actual,9.4,978,5822434
      Nevada,32,2020-8-6,115,,,Actual,20.4,900,3080156
      Iowa,19,2020-8-6,124,,,Actual,8.6,912,3155070
      Oklahoma,40,2020-8-6,118,,,Actual,10.4,593,3956971
      Kentucky,21,2020-8-6,128,,,Actual,5.6,760,4467673
      New York,36,2020-8-7,131,,,Actual,6,32760,26161672
      New Jersey,34,2020-8-7,127,,,Actual,10,15849,8882190
      California,6,2020-8-7,128,,,Actual,143,10133,39512223
      Texas,48,2020-8-7,137,,,Actual,244.5,8847,28995881
      Massachusetts,25,2020-8-7,122,,,Actual,15,8708,6892503
      Florida,12,2020-8-7,136,,,Actual,181,7927,21477737
      Illinois,17,2020-8-7,122,,,Actual,24.5,7822,12671821
      Pennsylvania,42,2020-8-7,122,,,Actual,14,7296,12801989
      Michigan,26,2020-8-7,124,,,Actual,7,6450,9986857
      Connecticut,9,2020-8-7,137,,,Actual,2,4441,3565287
      Louisiana,22,2020-8-7,141,,,Actual,30.5,4207,4648794
      Georgia,13,2020-8-7,142,,,Actual,80,4117,10617423
      Arizona,4,2020-8-7,134,,,Actual,67.5,4081,7278717
      Ohio,39,2020-8-7,120,,,Actual,25,3652,11689100
      Maryland,24,2020-8-7,116,,,Actual,13,3565,6045680
      Indiana,18,2020-8-7,121,,,Actual,11.5,3023,6732219
      Virginia,51,2020-8-7,131,,,Actual,11.5,2317,8535519
      North Carolina,37,2020-8-7,129,,,Actual,29,2160,10488084
      South Carolina,45,2020-8-7,131,,,Actual,32.5,1962,5148714
      Mississippi,28,2020-8-7,133,,,Actual,24.5,1848,2976149
      Colorado,8,2020-8-7,137,,,Actual,2.5,1857,5758736
      Alabama,1,2020-8-7,131,,,Actual,20.5,1735,4903185
      Minnesota,27,2020-8-7,115,,,Actual,6,1681,5639632
      Washington,53,2020-8-7,143,,,Actual,17.5,1672,7614893
      Missouri,29,2020-8-7,115,,,Actual,11,1263,6137428
      Tennessee,47,2020-8-7,116,,,Actual,14.5,1206,6829174
      Rhode Island,44,2020-8-7,112,,,Actual,0,1014,1059361
      Wisconsin,55,2020-8-7,133,,,Actual,9,990,5822434
      Nevada,32,2020-8-7,116,,,Actual,24.5,920,3080156
      Iowa,19,2020-8-7,125,,,Actual,7.5,915,3155070
      Oklahoma,40,2020-8-7,119,,,Actual,5,600,3956971
      Kentucky,21,2020-8-7,129,,,Actual,6,764,4467673
      New York,36,2020-8-8,132,,,Actual,8,32768,26161672
      New Jersey,34,2020-8-8,128,,,Actual,20,15869,8882190
      California,6,2020-8-8,129,,,Actual,174,10307,39512223
      Texas,48,2020-8-8,138,,,Actual,211,9058,28995881
      Massachusetts,25,2020-8-8,123,,,Actual,12,8720,6892503
      Florida,12,2020-8-8,137,,,Actual,182,8109,21477737
      Illinois,17,2020-8-8,123,,,Actual,18,7840,12671821
      Pennsylvania,42,2020-8-8,123,,,Actual,14,7310,12801989
      Michigan,26,2020-8-8,125,,,Actual,-4,6446,9986857
      Connecticut,9,2020-8-8,138,,,Actual,0,4441,3565287
      Louisiana,22,2020-8-8,142,,,Actual,0,4207,4648794
      Georgia,13,2020-8-8,143,,,Actual,69,4186,10617423
      Arizona,4,2020-8-8,135,,,Actual,56,4137,7278717
      Ohio,39,2020-8-8,121,,,Actual,16,3668,11689100
      Maryland,24,2020-8-8,117,,,Actual,12,3577,6045680
      Indiana,18,2020-8-8,122,,,Actual,13,3036,6732219
      Virginia,51,2020-8-8,132,,,Actual,5,2322,8535519
      North Carolina,37,2020-8-8,130,,,Actual,24,2184,10488084
      South Carolina,45,2020-8-8,132,,,Actual,45,2007,5148714
      Mississippi,28,2020-8-8,134,,,Actual,26,1874,2976149
      Colorado,8,2020-8-8,138,,,Actual,0,1857,5758736
      Alabama,1,2020-8-8,132,,,Actual,20,1755,4903185
      Minnesota,27,2020-8-8,116,,,Actual,8,1689,5639632
      Washington,53,2020-8-8,144,,,Actual,16,1688,7614893
      Missouri,29,2020-8-8,116,,,Actual,3,1266,6137428
      Tennessee,47,2020-8-8,117,,,Actual,9,1215,6829174
      Rhode Island,44,2020-8-8,113,,,Actual,0,1014,1059361
      Wisconsin,55,2020-8-8,134,,,Actual,6,996,5822434
      Nevada,32,2020-8-8,117,,,Actual,29,949,3080156
      Iowa,19,2020-8-8,126,,,Actual,12,927,3155070
      Oklahoma,40,2020-8-8,120,,,Actual,3,603,3956971
      Kentucky,21,2020-8-8,130,,,Actual,8,772,4467673
      New York,36,2020-8-9,133,,,Prediction,10.0394003797843,32778.0394003798,26161672
      New Jersey,34,2020-8-9,129,,,Prediction,10.4182722202314,15879.4182722202,8882190
      California,6,2020-8-9,130,,,Prediction,124.990185370021,10431.99018537,39512223
      Texas,48,2020-8-9,139,,,Prediction,250.231509397984,9308.23150939798,28995881
      Massachusetts,25,2020-8-9,124,,,Prediction,15.5315800256799,8735.53158002568,6892503
      Florida,12,2020-8-9,138,,,Prediction,176.68213931605,8285.68213931605,21477737
      Illinois,17,2020-8-9,124,,,Prediction,15.036095225044,7855.03609522504,12671821
      Pennsylvania,42,2020-8-9,124,,,Prediction,14.0833889898578,7324.08338898986,12801989
      Michigan,26,2020-8-9,126,,,Prediction,6.55268998193916,6452.55268998194,9986857
      Connecticut,9,2020-8-9,139,,,Prediction,3.11346778746704,4444.11346778747,3565287
      Louisiana,22,2020-8-9,143,,,Prediction,35.660106357178,4242.66010635718,4648794
      Georgia,13,2020-8-9,144,,,Prediction,49.7870785160901,4235.78707851609,10617423
      Arizona,4,2020-8-9,136,,,Prediction,73.6098955858147,4210.60989558582,7278717
      Ohio,39,2020-8-9,122,,,Prediction,29.2535720452348,3697.25357204523,11689100
      Maryland,24,2020-8-9,118,,,Prediction,11.9797238397813,3588.97972383978,6045680
      Indiana,18,2020-8-9,123,,,Prediction,9.33876905487365,3045.33876905487,6732219
      Virginia,51,2020-8-9,133,,,Prediction,17.566527555733,2339.56652755573,8535519
      North Carolina,37,2020-8-9,131,,,Prediction,30.65969477244,2214.65969477244,10488084
      South Carolina,45,2020-8-9,133,,,Prediction,52.0364622130243,2059.03646221302,5148714
      Mississippi,28,2020-8-9,135,,,Prediction,30.1981494184385,1904.19814941844,2976149
      Colorado,8,2020-8-9,139,,,Prediction,6.03530291985256,1863.03530291985,5758736
      Alabama,1,2020-8-9,133,,,Prediction,24.0980673217459,1779.09806732175,4903185
      Minnesota,27,2020-8-9,117,,,Prediction,5.69485707520666,1694.69485707521,5639632
      Washington,53,2020-8-9,145,,,Prediction,11.0500608698749,1699.05006086987,7614893
      Missouri,29,2020-8-9,117,,,Prediction,7.74324940146639,1273.74324940147,6137428
      Tennessee,47,2020-8-9,118,,,Prediction,16.7284297182061,1231.72842971821,6829174
      Rhode Island,44,2020-8-9,114,,,Prediction,0.560436176890669,1014.56043617689,1059361
      Wisconsin,55,2020-8-9,135,,,Prediction,7.83429960081255,1003.83429960081,5822434
      Nevada,32,2020-8-9,118,,,Prediction,16.5435677306859,965.543567730686,3080156
      Iowa,19,2020-8-9,127,,,Prediction,6.6444378997802,933.64443789978,3155070
      Oklahoma,40,2020-8-9,121,,,Prediction,7.37659341080064,610.376593410801,3956971
      Kentucky,21,2020-8-9,131,,,Prediction,5.72124357104828,777.721243571048,4467673
      New York,36,2020-8-10,134,,,Prediction,9.95363776507308,32787.9930381449,26161672
      New Jersey,34,2020-8-10,130,,,Prediction,10.3275579563422,15889.7458301766,8882190
      California,6,2020-8-10,131,,,Prediction,128.626535136476,10560.6167205065,39512223
      Texas,48,2020-8-10,140,,,Prediction,260.791104787462,9569.02261418545,28995881
      Massachusetts,25,2020-8-10,125,,,Prediction,15.5982907439919,8751.12987076967,6892503
      Florida,12,2020-8-10,139,,,Prediction,183.099891860091,8468.78203117614,21477737
      Illinois,17,2020-8-10,125,,,Prediction,14.9708795071644,7870.00697473221,12671821
      Pennsylvania,42,2020-8-10,125,,,Prediction,14.4524052074127,7338.53579419727,12801989
      Michigan,26,2020-8-10,127,,,Prediction,6.55399001065842,6459.1066799926,9986857
      Connecticut,9,2020-8-10,140,,,Prediction,3.24572855123507,4447.3591963387,3565287
      Louisiana,22,2020-8-10,144,,,Prediction,37.0748520913589,4279.73495844854,4648794
      Georgia,13,2020-8-10,145,,,Prediction,52.1571547258277,4287.94423324192,10617423
      Arizona,4,2020-8-10,137,,,Prediction,75.1676913226811,4285.7775869085,7278717
      Ohio,39,2020-8-10,123,,,Prediction,29.7087844739574,3726.96235651919,11689100
      Maryland,24,2020-8-10,119,,,Prediction,12.2071165410105,3601.18684038079,6045680
      Indiana,18,2020-8-10,124,,,Prediction,9.38638333816002,3054.72515239303,6732219
      Virginia,51,2020-8-10,134,,,Prediction,17.955598214124,2357.52212576986,8535519
      North Carolina,37,2020-8-10,132,,,Prediction,31.4718398393254,2246.13153461177,10488084
      South Carolina,45,2020-8-10,134,,,Prediction,55.058009514004,2114.09447172703,5148714
      Mississippi,28,2020-8-10,136,,,Prediction,31.2845372735465,1935.48268669199,2976149
      Colorado,8,2020-8-10,140,,,Prediction,6.18975144096961,1869.22505436082,5758736
      Alabama,1,2020-8-10,134,,,Prediction,24.5749440348997,1803.67301135665,4903185
      Minnesota,27,2020-8-10,118,,,Prediction,5.94306309496697,1700.63792017017,5639632
      Washington,53,2020-8-10,146,,,Prediction,11.0941424180893,1710.14420328796,7614893
      Missouri,29,2020-8-10,118,,,Prediction,7.80704069519468,1281.55029009666,6137428
      Tennessee,47,2020-8-10,119,,,Prediction,17.0383286781853,1248.76675839639,6829174
      Rhode Island,44,2020-8-10,115,,,Prediction,0.519289311068872,1015.07972548796,1059361
      Wisconsin,55,2020-8-10,136,,,Prediction,8.00138596306762,1011.83568556388,5822434
      Nevada,32,2020-8-10,119,,,Prediction,17.3398372077969,982.883404938483,3080156
      Iowa,19,2020-8-10,128,,,Prediction,6.9065235981123,940.550961497893,3155070
      Oklahoma,40,2020-8-10,122,,,Prediction,7.55914117576826,617.935734586569,3956971
      Kentucky,21,2020-8-10,132,,,Prediction,5.7636986578852,783.484942228934,4467673
      New York,36,2020-8-11,135,,,Prediction,9.90839536711115,32797.901433512,26161672
      New Jersey,34,2020-8-11,131,,,Prediction,10.297580374024,15900.0434105506,8882190
      California,6,2020-8-11,132,,,Prediction,132.300218191903,10692.9169386984,39512223
      Texas,48,2020-8-11,141,,,Prediction,270.776911841694,9839.79952602714,28995881
      Massachusetts,25,2020-8-11,126,,,Prediction,15.7647401770303,8766.8946109467,6892503
      Florida,12,2020-8-11,140,,,Prediction,189.60015389303,8658.38218506917,21477737
      Illinois,17,2020-8-11,126,,,Prediction,15.2451818883389,7885.25215662055,12671821
      Pennsylvania,42,2020-8-11,126,,,Prediction,14.8806296213413,7353.41642381861,12801989
      Michigan,26,2020-8-11,128,,,Prediction,6.5582304303012,6465.6649104229,9986857
      Connecticut,9,2020-8-11,141,,,Prediction,3.35704840925715,4450.71624474796,3565287
      Louisiana,22,2020-8-11,145,,,Prediction,38.2211725476028,4317.95613099614,4648794
      Georgia,13,2020-8-11,146,,,Prediction,53.8952822454102,4341.83951548733,10617423
      Arizona,4,2020-8-11,138,,,Prediction,76.8167611140528,4362.59434802255,7278717
      Ohio,39,2020-8-11,124,,,Prediction,30.6191764860721,3757.58153300526,11689100
      Maryland,24,2020-8-11,120,,,Prediction,12.5003887361756,3613.68722911697,6045680
      Indiana,18,2020-8-11,125,,,Prediction,9.42855937230668,3064.15371176534,6732219
      Virginia,51,2020-8-11,135,,,Prediction,18.3847880085637,2375.90691377842,8535519
      North Carolina,37,2020-8-11,133,,,Prediction,32.4146267340194,2278.54616134578,10488084
      South Carolina,45,2020-8-11,135,,,Prediction,58.0265780857506,2172.12104981278,5148714
      Mississippi,28,2020-8-11,137,,,Prediction,32.4100082709813,1967.89269496297,2976149
      Colorado,8,2020-8-11,141,,,Prediction,6.3271937730738,1875.5522481339,5758736
      Alabama,1,2020-8-11,135,,,Prediction,25.1097003993372,1828.78271175598,4903185
      Minnesota,27,2020-8-11,119,,,Prediction,6.04042683455193,1706.67834700473,5639632
      Washington,53,2020-8-11,147,,,Prediction,11.1246635494727,1721.26886683744,7614893
      Missouri,29,2020-8-11,119,,,Prediction,7.86699741566893,1289.41728751233,6137428
      Tennessee,47,2020-8-11,120,,,Prediction,17.3478143880868,1266.11457278448,6829174
      Rhode Island,44,2020-8-11,116,,,Prediction,0.471648038318719,1015.55137352628,1059361
      Wisconsin,55,2020-8-11,137,,,Prediction,8.4158100833297,1020.25149564721,5822434
      Nevada,32,2020-8-11,120,,,Prediction,18.1350996382009,1001.01850457668,3080156
      Iowa,19,2020-8-11,129,,,Prediction,6.97935896680287,947.530320464695,3155070
      Oklahoma,40,2020-8-11,123,,,Prediction,7.79046523553564,625.726199822104,3956971
      Kentucky,21,2020-8-11,133,,,Prediction,5.81137392015969,789.296316149093,4467673
      New York,36,2020-8-12,136,,,Prediction,9.70978944856549,32807.6112229605,26161672
      New Jersey,34,2020-8-12,132,,,Prediction,10.2459138526978,15910.2893244033,8882190
      California,6,2020-8-12,133,,,Prediction,134.399756616899,10827.3166953153,39512223
      Texas,48,2020-8-12,142,,,Prediction,277.159127002765,10116.9586530299,28995881
      Massachusetts,25,2020-8-12,127,,,Prediction,15.6234333346644,8782.51804428137,6892503
      Florida,12,2020-8-12,141,,,Prediction,194.93315632055,8853.31534138972,21477737
      Illinois,17,2020-8-12,127,,,Prediction,15.4775531100903,7900.72970973064,12671821
      Pennsylvania,42,2020-8-12,127,,,Prediction,14.8561550013494,7368.27257881996,12801989
      Michigan,26,2020-8-12,129,,,Prediction,6.57425493587246,6472.23916535877,9986857
      Connecticut,9,2020-8-12,142,,,Prediction,3.45853206495311,4454.17477681291,3565287
      Louisiana,22,2020-8-12,146,,,Prediction,39.0711659408367,4357.02729693698,4648794
      Georgia,13,2020-8-12,147,,,Prediction,54.9793680735672,4396.8188835609,10617423
      Arizona,4,2020-8-12,139,,,Prediction,78.4424232893761,4441.03677131192,7278717
      Ohio,39,2020-8-12,125,,,Prediction,31.6573183753162,3789.23885138058,11689100
      Maryland,24,2020-8-12,121,,,Prediction,12.4988652052365,3626.1860943222,6045680
      Indiana,18,2020-8-12,126,,,Prediction,9.47092491691678,3073.62463668226,6732219
      Virginia,51,2020-8-12,136,,,Prediction,18.8565468436383,2394.76346062206,8535519
      North Carolina,37,2020-8-12,134,,,Prediction,32.8274374390845,2311.37359878487,10488084
      South Carolina,45,2020-8-12,136,,,Prediction,59.9655696967702,2232.08661950955,5148714
      Mississippi,28,2020-8-12,138,,,Prediction,32.9631999662961,2000.85589492926,2976149
      Colorado,8,2020-8-12,142,,,Prediction,6.47839115208557,1882.03063928598,5758736
      Alabama,1,2020-8-12,136,,,Prediction,25.3605407065378,1854.14325246252,4903185
      Minnesota,27,2020-8-12,120,,,Prediction,6.15849160431736,1712.83683860904,5639632
      Washington,53,2020-8-12,148,,,Prediction,11.1644494652153,1732.43331630265,7614893
      Missouri,29,2020-8-12,120,,,Prediction,7.99357474758255,1297.41086225991,6137428
      Tennessee,47,2020-8-12,121,,,Prediction,17.6566578429471,1283.77123062743,6829174
      Rhode Island,44,2020-8-12,117,,,Prediction,0.44451938456251,1015.99589291084,1059361
      Wisconsin,55,2020-8-12,138,,,Prediction,8.87135745949544,1029.12285310671,5822434
      Nevada,32,2020-8-12,121,,,Prediction,18.8439585646616,1019.86246314135,3080156
      Iowa,19,2020-8-12,130,,,Prediction,7.09375647285461,954.62407693755,3155070
      Oklahoma,40,2020-8-12,124,,,Prediction,7.86074978072454,633.586949602829,3956971
      Kentucky,21,2020-8-12,134,,,Prediction,5.85779450233048,795.154110651424,4467673
      New York,36,2020-8-13,137,,,Prediction,9.53432642933977,32817.1455493899,26161672
      New Jersey,34,2020-8-13,133,,,Prediction,10.2107522695121,15920.5000766728,8882190
      California,6,2020-8-13,134,,,Prediction,136.391424453939,10963.7081197692,39512223
      Texas,48,2020-8-13,143,,,Prediction,284.118496157711,10401.0771491876,28995881
      Massachusetts,25,2020-8-13,128,,,Prediction,15.5915544993898,8798.10959878075,6892503
      Florida,12,2020-8-13,142,,,Prediction,200.257091053579,9053.5724324433,21477737
      Illinois,17,2020-8-13,128,,,Prediction,15.4304424845354,7916.16015221517,12671821
      Pennsylvania,42,2020-8-13,128,,,Prediction,14.8193611137398,7383.0919399337,12801989
      Michigan,26,2020-8-13,130,,,Prediction,6.57850846688508,6478.81767382566,9986857
      Connecticut,9,2020-8-13,143,,,Prediction,3.60071894475395,4457.77549575767,3565287
      Louisiana,22,2020-8-13,147,,,Prediction,40.151693759636,4397.17899069661,4648794
      Georgia,13,2020-8-13,148,,,Prediction,56.133388771425,4452.95227233232,10617423
      Arizona,4,2020-8-13,140,,,Prediction,80.0416884925546,4521.07845980448,7278717
      Ohio,39,2020-8-13,126,,,Prediction,32.2346851405708,3821.47353652115,11689100
      Maryland,24,2020-8-13,122,,,Prediction,12.6733878073994,3638.8594821296,6045680
      Indiana,18,2020-8-13,127,,,Prediction,9.51348082352166,3083.13811750578,6732219
      Virginia,51,2020-8-13,137,,,Prediction,19.2907235319706,2414.05418415403,8535519
      North Carolina,37,2020-8-13,135,,,Prediction,33.264196510515,2344.63779529538,10488084
      South Carolina,45,2020-8-13,137,,,Prediction,62.1156081668757,2294.20222767642,5148714
      Mississippi,28,2020-8-13,139,,,Prediction,33.0180707515275,2033.87396568079,2976149
      Colorado,8,2020-8-13,143,,,Prediction,6.63320160953937,1888.66384089552,5758736
      Alabama,1,2020-8-13,137,,,Prediction,25.5151513159138,1879.65840377843,4903185
      Minnesota,27,2020-8-13,121,,,Prediction,6.29840404516972,1719.13524265421,5639632
      Washington,53,2020-8-13,149,,,Prediction,11.1859579435929,1743.61927424625,7614893
      Missouri,29,2020-8-13,121,,,Prediction,8.06836428730535,1305.47922654722,6137428
      Tennessee,47,2020-8-13,122,,,Prediction,17.9582558350995,1301.72948646253,6829174
      Rhode Island,44,2020-8-13,118,,,Prediction,0.419571458262641,1016.4154643691,1059361
      Wisconsin,55,2020-8-13,139,,,Prediction,9.06056171791029,1038.18341482462,5822434
      Nevada,32,2020-8-13,122,,,Prediction,19.6655527980758,1039.52801593942,3080156
      Iowa,19,2020-8-13,131,,,Prediction,7.25638001375635,961.880456951306,3155070
      Oklahoma,40,2020-8-13,125,,,Prediction,7.9252154091381,641.512165011967,3956971
      Kentucky,21,2020-8-13,135,,,Prediction,5.89960207746889,801.053712728893,4467673
      New York,36,2020-8-14,138,,,Prediction,9.36957105302495,32826.5151204429,26161672
      New Jersey,34,2020-8-14,134,,,Prediction,10.0043403958223,15930.5044170686,8882190
      California,6,2020-8-14,135,,,Prediction,138.341021609644,11102.0491413789,39512223
      Texas,48,2020-8-14,144,,,Prediction,292.129467655929,10693.2066168435,28995881
      Massachusetts,25,2020-8-14,129,,,Prediction,15.9687504711985,8814.07834925195,6892503
      Florida,12,2020-8-14,143,,,Prediction,205.726430917148,9259.29886336045,21477737
      Illinois,17,2020-8-14,129,,,Prediction,15.4368257922659,7931.59697800744,12671821
      Pennsylvania,42,2020-8-14,129,,,Prediction,15.3349722051006,7398.4269121388,12801989
      Michigan,26,2020-8-14,131,,,Prediction,6.53570506908343,6485.35337889474,9986857
      Connecticut,9,2020-8-14,144,,,Prediction,3.6515613729417,4461.42705713061,3565287
      Louisiana,22,2020-8-14,148,,,Prediction,41.3494200447312,4438.52841074134,4648794
      Georgia,13,2020-8-14,149,,,Prediction,57.5086107590787,4510.4608830914,10617423
      Arizona,4,2020-8-14,141,,,Prediction,81.5186645281448,4602.59712433262,7278717
      Ohio,39,2020-8-14,127,,,Prediction,32.8917820953103,3854.36531861646,11689100
      Maryland,24,2020-8-14,123,,,Prediction,13.1174312869389,3651.97691341654,6045680
      Indiana,18,2020-8-14,128,,,Prediction,9.54184826732676,3092.67996577311,6732219
      Virginia,51,2020-8-14,138,,,Prediction,19.7010820313568,2433.75526618539,8535519
      North Carolina,37,2020-8-14,136,,,Prediction,34.1261460612709,2378.76394135665,10488084
      South Carolina,45,2020-8-14,138,,,Prediction,64.3427352971292,2358.54496297355,5148714
      Mississippi,28,2020-8-14,140,,,Prediction,33.9191008037197,2067.79306648451,2976149
      Colorado,8,2020-8-14,144,,,Prediction,6.76369420680918,1895.42753510233,5758736
      Alabama,1,2020-8-14,138,,,Prediction,25.9842043435128,1905.64260812195,4903185
      Minnesota,27,2020-8-14,122,,,Prediction,6.42151117714077,1725.55675383135,5639632
      Washington,53,2020-8-14,150,,,Prediction,11.2213464205823,1754.84062066683,7614893
      Missouri,29,2020-8-14,122,,,Prediction,8.22548128784657,1313.70470783506,6137428
      Tennessee,47,2020-8-14,123,,,Prediction,18.2326419779199,1319.96212844044,6829174
      Rhode Island,44,2020-8-14,119,,,Prediction,0.393978213820137,1016.80944258292,1059361
      Wisconsin,55,2020-8-14,140,,,Prediction,9.34146118250161,1047.52487600712,5822434
      Nevada,32,2020-8-14,123,,,Prediction,20.5229684371709,1060.05098437659,3080156
      Iowa,19,2020-8-14,132,,,Prediction,7.40847569806027,969.288932649367,3155070
      Oklahoma,40,2020-8-14,126,,,Prediction,8.07520131038443,649.587366322351,3956971
      Kentucky,21,2020-8-14,136,,,Prediction,5.9366928943156,806.990405623208,4467673
      New York,36,2020-8-15,139,,,Prediction,9.19285532966498,32835.7079757726,26161672
      New Jersey,34,2020-8-15,135,,,Prediction,10.173136658558,15940.6775537272,8882190
      California,6,2020-8-15,136,,,Prediction,140.173382357107,11242.222523736,39512223
      Texas,48,2020-8-15,145,,,Prediction,299.915187424171,10993.1218042677,28995881
      Massachusetts,25,2020-8-15,130,,,Prediction,16.0170532804044,8830.09540253236,6892503
      Florida,12,2020-8-15,144,,,Prediction,211.513027251374,9470.81189061182,21477737
      Illinois,17,2020-8-15,130,,,Prediction,15.503477207103,7947.10045521454,12671821
      Pennsylvania,42,2020-8-15,130,,,Prediction,15.4765741462909,7413.90348628509,12801989
      Michigan,26,2020-8-15,132,,,Prediction,6.64934452742945,6492.00272342217,9986857
      Connecticut,9,2020-8-15,145,,,Prediction,3.93374740194638,4465.36080453255,3565287
      Louisiana,22,2020-8-15,149,,,Prediction,42.2689819396025,4480.79739268095,4648794
      Georgia,13,2020-8-15,150,,,Prediction,58.7661065704365,4569.22698966184,10617423
      Arizona,4,2020-8-15,142,,,Prediction,83.5287594849254,4686.12588381755,7278717
      Ohio,39,2020-8-15,128,,,Prediction,33.7039423362003,3888.06926095266,11689100
      Maryland,24,2020-8-15,124,,,Prediction,13.2024557961924,3665.17936921273,6045680
      Indiana,18,2020-8-15,129,,,Prediction,9.67462910679586,3102.3545948799,6732219
      Virginia,51,2020-8-15,139,,,Prediction,20.8043930535173,2454.5596592389,8535519
      North Carolina,37,2020-8-15,137,,,Prediction,34.9514469188659,2413.71538827552,10488084
      South Carolina,45,2020-8-15,139,,,Prediction,66.5450538891901,2425.09001686274,5148714
      Mississippi,28,2020-8-15,141,,,Prediction,34.9181446465165,2102.71121113103,2976149
      Colorado,8,2020-8-15,145,,,Prediction,7.05243606634922,1902.47997116868,5758736
      Alabama,1,2020-8-15,139,,,Prediction,26.4254047606557,1932.0680128826,4903185
      Minnesota,27,2020-8-15,123,,,Prediction,6.53686098418558,1732.09361481554,5639632
      Washington,53,2020-8-15,151,,,Prediction,11.4013053141078,1766.24192598094,7614893
      Missouri,29,2020-8-15,123,,,Prediction,8.39495556066563,1322.09966339573,6137428
      Tennessee,47,2020-8-15,124,,,Prediction,18.7158826772378,1338.67801111768,6829174
      Rhode Island,44,2020-8-15,120,,,Prediction,0.368580261894102,1017.17802284482,1059361
      Wisconsin,55,2020-8-15,141,,,Prediction,9.67389560369089,1057.19877161081,5822434
      Nevada,32,2020-8-15,124,,,Prediction,21.3714152928423,1081.42239966943,3080156
      Iowa,19,2020-8-15,133,,,Prediction,7.57831414054322,976.86724678991,3155070
      Oklahoma,40,2020-8-15,127,,,Prediction,8.17462497226319,657.761991294615,3956971
      Kentucky,21,2020-8-15,137,,,Prediction,6.03655802258726,813.026963645795,4467673
      New York,36,2020-8-16,140,,,Prediction,9.00496785155446,32844.7129436241,26161672
      New Jersey,34,2020-8-16,136,,,Prediction,10.3557681079586,15951.0333218351,8882190
      California,6,2020-8-16,137,,,Prediction,142.177039321928,11384.3995630579,39512223
      Texas,48,2020-8-16,146,,,Prediction,307.214985959568,11300.3367902273,28995881
      Massachusetts,25,2020-8-16,131,,,Prediction,16.0756724731575,8846.17107500552,6892503
      Florida,12,2020-8-16,145,,,Prediction,216.600744867487,9687.41263547931,21477737
      Illinois,17,2020-8-16,131,,,Prediction,15.6041437770759,7962.70459899162,12671821
      Pennsylvania,42,2020-8-16,131,,,Prediction,15.776524685544,7429.68001097064,12801989
      Michigan,26,2020-8-16,133,,,Prediction,6.78014436736447,6498.78286778953,9986857
      Connecticut,9,2020-8-16,146,,,Prediction,4.29376579594843,4469.6545703285,3565287
      Louisiana,22,2020-8-16,150,,,Prediction,43.0722017905096,4523.86959447146,4648794
      Georgia,13,2020-8-16,151,,,Prediction,59.9481674235347,4629.17515708537,10617423
      Arizona,4,2020-8-16,143,,,Prediction,85.6534335465407,4771.77931736409,7278717
      Ohio,39,2020-8-16,129,,,Prediction,34.5725436334735,3922.64180458614,11689100
      Maryland,24,2020-8-16,125,,,Prediction,13.3647902599297,3678.54415947266,6045680
      Indiana,18,2020-8-16,130,,,Prediction,9.79154783152874,3112.14614271143,6732219
      Virginia,51,2020-8-16,140,,,Prediction,21.8193023529244,2476.37896159183,8535519
      North Carolina,37,2020-8-16,138,,,Prediction,35.7363983050197,2449.45178658054,10488084
      South Carolina,45,2020-8-16,140,,,Prediction,68.7686952877111,2493.85871215046,5148714
      Mississippi,28,2020-8-16,142,,,Prediction,35.9088000416896,2138.62001117272,2976149
      Colorado,8,2020-8-16,146,,,Prediction,7.37786258883111,1909.85783375751,5758736
      Alabama,1,2020-8-16,140,,,Prediction,26.8296504215098,1958.89766330411,4903185
      Minnesota,27,2020-8-16,124,,,Prediction,6.8217651047253,1738.91537992026,5639632
      Washington,53,2020-8-16,152,,,Prediction,11.6366832705971,1777.87860925153,7614893
      Missouri,29,2020-8-16,124,,,Prediction,8.62030094662094,1330.71996434235,6137428
      Tennessee,47,2020-8-16,125,,,Prediction,19.0896643521703,1357.76767546985,6829174
      Rhode Island,44,2020-8-16,121,,,Prediction,0.349183496503014,1017.52720634132,1059361
      Wisconsin,55,2020-8-16,142,,,Prediction,10.0404094888493,1067.23918109966,5822434
      Nevada,32,2020-8-16,125,,,Prediction,22.1587147274365,1103.58111439687,3080156
      Iowa,19,2020-8-16,134,,,Prediction,7.88733810408222,984.754584893992,3155070
      Oklahoma,40,2020-8-16,128,,,Prediction,8.24837535569915,666.010366650314,3956971
      Kentucky,21,2020-8-16,138,,,Prediction,6.11568399670979,819.142647642505,4467673
      New York,36,2020-8-17,141,,,Prediction,8.95322360221982,32853.6661672263,26161672
      New Jersey,34,2020-8-17,137,,,Prediction,10.3202295306277,15961.3535513658,8882190
      California,6,2020-8-17,138,,,Prediction,146.010956923308,11530.4105199812,39512223
      Texas,48,2020-8-17,147,,,Prediction,320.419958400048,11620.7567486273,28995881
      Massachusetts,25,2020-8-17,132,,,Prediction,16.1039030793162,8862.27497808483,6892503
      Florida,12,2020-8-17,146,,,Prediction,223.756685748732,9911.16932122804,21477737
      Illinois,17,2020-8-17,132,,,Prediction,15.5163069021353,7978.22090589375,12671821
      Pennsylvania,42,2020-8-17,132,,,Prediction,16.0554964337189,7445.73550740436,12801989
      Michigan,26,2020-8-17,134,,,Prediction,6.78757405895534,6505.57044184849,9986857
      Connecticut,9,2020-8-17,147,,,Prediction,4.46442331448691,4474.11899364299,3565287
      Louisiana,22,2020-8-17,151,,,Prediction,44.4979194378733,4568.36751390933,4648794
      Georgia,13,2020-8-17,152,,,Prediction,62.6405536151073,4691.81571070048,10617423
      Arizona,4,2020-8-17,144,,,Prediction,87.3333756048497,4859.11269296894,7278717
      Ohio,39,2020-8-17,130,,,Prediction,34.7061679716309,3957.34797255777,11689100
      Maryland,24,2020-8-17,126,,,Prediction,13.5514038392606,3692.09556331193,6045680
      Indiana,18,2020-8-17,131,,,Prediction,9.83850707121241,3121.98464978264,6732219
      Virginia,51,2020-8-17,141,,,Prediction,22.2834495973946,2498.66241118922,8535519
      North Carolina,37,2020-8-17,139,,,Prediction,36.4979275648216,2485.94971414536,10488084
      South Carolina,45,2020-8-17,141,,,Prediction,72.4765043667733,2566.33521651723,5148714
      Mississippi,28,2020-8-17,143,,,Prediction,36.9081330457116,2175.52814421843,2976149
      Colorado,8,2020-8-17,147,,,Prediction,7.56666835069296,1917.4245021082,5758736
      Alabama,1,2020-8-17,141,,,Prediction,27.2852061430275,1986.18286944714,4903185
      Minnesota,27,2020-8-17,125,,,Prediction,7.11908655494312,1746.03446647521,5639632
      Washington,53,2020-8-17,153,,,Prediction,11.6927202355435,1789.57132948708,7614893
      Missouri,29,2020-8-17,125,,,Prediction,8.67688276687701,1339.39684710923,6137428
      Tennessee,47,2020-8-17,126,,,Prediction,19.4088545227035,1377.17652999256,6829174
      Rhode Island,44,2020-8-17,122,,,Prediction,0.32068715547677,1017.8478934968,1059361
      Wisconsin,55,2020-8-17,143,,,Prediction,10.2034893515993,1077.44267045126,5822434
      Nevada,32,2020-8-17,126,,,Prediction,23.2001051097974,1126.78121950667,3080156
      Iowa,19,2020-8-17,135,,,Prediction,8.20896326206504,992.963548156057,3155070
      Oklahoma,40,2020-8-17,129,,,Prediction,8.47316087368046,674.483527523994,3956971
      Kentucky,21,2020-8-17,139,,,Prediction,6.15759871995529,825.30024636246,4467673
      New York,36,2020-8-18,142,,,Prediction,8.88388597641603,32862.5500532028,26161672
      New Jersey,34,2020-8-18,138,,,Prediction,10.2957364262857,15971.6492877921,8882190
      California,6,2020-8-18,139,,,Prediction,149.948259179793,11680.358779161,39512223
      Texas,48,2020-8-18,148,,,Prediction,332.939099684156,11953.6958483115,28995881
      Massachusetts,25,2020-8-18,133,,,Prediction,16.1833103930291,8878.45828847786,6892503
      Florida,12,2020-8-18,147,,,Prediction,231.33265195843,10142.5019731865,21477737
      Illinois,17,2020-8-18,133,,,Prediction,15.4222889462517,7993.64319484,12671821
      Pennsylvania,42,2020-8-18,133,,,Prediction,16.3530284121443,7462.0885358165,12801989
      Michigan,26,2020-8-18,135,,,Prediction,6.79196560705347,6512.36240745554,9986857
      Connecticut,9,2020-8-18,148,,,Prediction,4.6479643108621,4478.76695795385,3565287
      Louisiana,22,2020-8-18,152,,,Prediction,45.5837577712447,4613.95127168057,4648794
      Georgia,13,2020-8-18,153,,,Prediction,64.7280384607174,4756.54374916119,10617423
      Arizona,4,2020-8-18,145,,,Prediction,89.1477469719492,4948.26043994089,7278717
      Ohio,39,2020-8-18,131,,,Prediction,34.7304171965128,3992.07838975428,11689100
      Maryland,24,2020-8-18,127,,,Prediction,13.7293213564923,3705.82488466842,6045680
      Indiana,18,2020-8-18,132,,,Prediction,9.88271464246094,3131.8673644251,6732219
      Virginia,51,2020-8-18,142,,,Prediction,22.7965315752902,2521.45894276451,8535519
      North Carolina,37,2020-8-18,140,,,Prediction,37.2966416403146,2523.24635578568,10488084
      South Carolina,45,2020-8-18,142,,,Prediction,76.1445212432548,2642.47973776048,5148714
      Mississippi,28,2020-8-18,144,,,Prediction,37.8953712574907,2213.42351547592,2976149
      Colorado,8,2020-8-18,148,,,Prediction,7.7219061496433,1925.14640825785,5758736
      Alabama,1,2020-8-18,142,,,Prediction,27.7408430106427,2013.92371245778,4903185
      Minnesota,27,2020-8-18,126,,,Prediction,7.21887433543432,1753.25334081064,5639632
      Washington,53,2020-8-18,154,,,Prediction,11.7490270489825,1801.32035653606,7614893
      Missouri,29,2020-8-18,126,,,Prediction,8.72899812797146,1348.1258452372,6137428
      Tennessee,47,2020-8-18,127,,,Prediction,19.7403822447726,1396.91691223733,6829174
      Rhode Island,44,2020-8-18,123,,,Prediction,0.292345637085839,1018.14023913388,1059361
      Wisconsin,55,2020-8-18,144,,,Prediction,10.4037803606244,1087.84645081188,5822434
      Nevada,32,2020-8-18,127,,,Prediction,24.3167648210176,1151.09798432769,3080156
      Iowa,19,2020-8-18,136,,,Prediction,8.37029093311867,1001.33383908918,3155070
      Oklahoma,40,2020-8-18,130,,,Prediction,8.70407226820294,683.187599792197,3956971
      Kentucky,21,2020-8-18,140,,,Prediction,6.20154602316887,831.501792385629,4467673
      New York,36,2020-8-19,143,,,Prediction,8.70231334505482,32871.2523665478,26161672
      New Jersey,34,2020-8-19,139,,,Prediction,10.2822106140255,15981.9314984061,8882190
      California,6,2020-8-19,140,,,Prediction,152.170340026858,11832.5291191879,39512223
      Texas,48,2020-8-19,149,,,Prediction,341.042685144847,12294.7385334563,28995881
      Massachusetts,25,2020-8-19,134,,,Prediction,16.1809804276119,8894.63926890547,6892503
      Florida,12,2020-8-19,148,,,Prediction,237.462088997015,10379.9640621835,21477737
      Illinois,17,2020-8-19,134,,,Prediction,15.5627851952844,8009.20598003529,12671821
      Pennsylvania,42,2020-8-19,134,,,Prediction,16.3533758225714,7478.44191163907,12801989
      Michigan,26,2020-8-19,136,,,Prediction,6.80856122562264,6519.17096868117,9986857
      Connecticut,9,2020-8-19,149,,,Prediction,4.85177894587602,4483.61873689973,3565287
      Louisiana,22,2020-8-19,153,,,Prediction,46.5482611915517,4660.49953287213,4648794
      Georgia,13,2020-8-19,154,,,Prediction,65.9734073808943,4822.51715654209,10617423
      Arizona,4,2020-8-19,146,,,Prediction,90.999812329862,5039.26025227075,7278717
      Ohio,39,2020-8-19,132,,,Prediction,35.5505207919199,4027.6289105462,11689100
      Maryland,24,2020-8-19,128,,,Prediction,13.8638682948412,3719.68875296326,6045680
      Indiana,18,2020-8-19,133,,,Prediction,9.91815548582434,3141.78551991093,6732219
      Virginia,51,2020-8-19,143,,,Prediction,23.3814969920625,2544.84043975658,8535519
      North Carolina,37,2020-8-19,141,,,Prediction,38.1342622006995,2561.38061798638,10488084
      South Carolina,45,2020-8-19,143,,,Prediction,78.4419952893742,2720.92173304986,5148714
      Mississippi,28,2020-8-19,145,,,Prediction,38.7251690327834,2252.1486845087,2976149
      Colorado,8,2020-8-19,149,,,Prediction,7.89336970510561,1933.03977796295,5758736
      Alabama,1,2020-8-19,143,,,Prediction,28.1419113624464,2042.06562382023,4903185
      Minnesota,27,2020-8-19,127,,,Prediction,7.37714442509538,1760.63048523574,5639632
      Washington,53,2020-8-19,155,,,Prediction,11.8104620343694,1813.13081857043,7614893
      Missouri,29,2020-8-19,127,,,Prediction,8.83511109016777,1356.96095632737,6137428
      Tennessee,47,2020-8-19,128,,,Prediction,20.0846954902466,1417.00160772758,6829174
      Rhode Island,44,2020-8-19,124,,,Prediction,0.275326496448553,1018.41556563033,1059361
      Wisconsin,55,2020-8-19,145,,,Prediction,10.8640231205389,1098.71047393242,5822434
      Nevada,32,2020-8-19,128,,,Prediction,25.2946366368109,1176.3926209645,3080156
      Iowa,19,2020-8-19,137,,,Prediction,8.51294040530273,1009.84677949448,3155070
      Oklahoma,40,2020-8-19,131,,,Prediction,8.7825992549959,691.970199047193,3956971
      Kentucky,21,2020-8-19,141,,,Prediction,6.24404921420935,837.745841599839,4467673
      New York,36,2020-8-20,144,,,Prediction,8.53818250182054,32879.7905490496,26161672
      New Jersey,34,2020-8-20,140,,,Prediction,10.2632537100325,15992.1947521161,8882190
      California,6,2020-8-20,141,,,Prediction,154.26565765113,11986.794776839,39512223
      Texas,48,2020-8-20,150,,,Prediction,349.081065451718,12643.8195989081,28995881
      Massachusetts,25,2020-8-20,135,,,Prediction,16.6249583919689,8911.26422729744,6892503
      Florida,12,2020-8-20,149,,,Prediction,243.560462809693,10623.5245249932,21477737
      Illinois,17,2020-8-20,135,,,Prediction,15.5355713543836,8024.74155138967,12671821
      Pennsylvania,42,2020-8-20,135,,,Prediction,17.064025338445,7495.50593697752,12801989
      Michigan,26,2020-8-20,137,,,Prediction,6.7946608745751,6525.96562955574,9986857
      Connecticut,9,2020-8-20,150,,,Prediction,5.06453091402494,4488.68326781375,3565287
      Louisiana,22,2020-8-20,154,,,Prediction,47.6337589411857,4708.13329181331,4648794
      Georgia,13,2020-8-20,155,,,Prediction,67.2427372271896,4889.75989376928,10617423
      Arizona,4,2020-8-20,147,,,Prediction,92.819847707432,5132.08009997818,7278717
      Ohio,39,2020-8-20,133,,,Prediction,36.1227339500477,4063.75164449625,11689100
      Maryland,24,2020-8-20,129,,,Prediction,14.5158843666031,3734.20463732986,6045680
      Indiana,18,2020-8-20,134,,,Prediction,9.95372342517541,3151.7392433361,6732219
      Virginia,51,2020-8-20,144,,,Prediction,23.9198617847493,2568.76030154132,8535519
      North Carolina,37,2020-8-20,142,,,Prediction,39.653717107355,2601.03433509373,10488084
      South Carolina,45,2020-8-20,144,,,Prediction,80.9358849684117,2801.85761801827,5148714
      Mississippi,28,2020-8-20,146,,,Prediction,40.1183190811944,2292.2670035899,2976149
      Colorado,8,2020-8-20,150,,,Prediction,8.06197258914398,1941.1017505521,5758736
      Alabama,1,2020-8-20,144,,,Prediction,28.865555704803,2070.93117952503,4903185
      Minnesota,27,2020-8-20,128,,,Prediction,7.57410370674121,1768.20458894248,5639632
      Washington,53,2020-8-20,156,,,Prediction,11.8478262249059,1824.97864479533,7614893
      Missouri,29,2020-8-20,128,,,Prediction,8.92271669315093,1365.88367302052,6137428
      Tennessee,47,2020-8-20,129,,,Prediction,20.4205231538645,1437.42213088144,6829174
      Rhode Island,44,2020-8-20,125,,,Prediction,0.258531983413076,1018.67409761374,1059361
      Wisconsin,55,2020-8-20,146,,,Prediction,11.1574343668504,1109.86790829927,5822434
      Nevada,32,2020-8-20,129,,,Prediction,26.3974796262921,1202.79010059079,3080156
      Iowa,19,2020-8-20,138,,,Prediction,8.74724799032697,1018.59402748481,3155070
      Oklahoma,40,2020-8-20,132,,,Prediction,8.85462492632132,700.824823973515,3956971
      Kentucky,21,2020-8-20,142,,,Prediction,6.28153725020422,844.027378850043,4467673
      New York,36,2020-8-21,145,,,Prediction,8.37040867442816,32888.1609577241,26161672
      New Jersey,34,2020-8-21,141,,,Prediction,10.2280326205066,16002.4227847366,8882190
      California,6,2020-8-21,142,,,Prediction,156.389826863339,12143.1846037023,39512223
      Texas,48,2020-8-21,151,,,Prediction,358.654074062087,13002.4736729701,28995881
      Massachusetts,25,2020-8-21,136,,,Prediction,17.1678159470896,8928.43204324453,6892503
      Florida,12,2020-8-21,150,,,Prediction,249.419046904152,10872.9435718973,21477737
      Illinois,17,2020-8-21,136,,,Prediction,15.521833599488,8040.26338498916,12671821
      Pennsylvania,42,2020-8-21,136,,,Prediction,17.8501440166065,7513.35608099412,12801989
      Michigan,26,2020-8-21,138,,,Prediction,6.78078890246884,6532.74641845821,9986857
      Connecticut,9,2020-8-21,151,,,Prediction,5.21763180769188,4493.90089962144,3565287
      Louisiana,22,2020-8-21,155,,,Prediction,49.0546754654869,4757.1879672788,4648794
      Georgia,13,2020-8-21,156,,,Prediction,68.8310626541559,4958.59095642343,10617423
      Arizona,4,2020-8-21,148,,,Prediction,94.5685110476036,5226.64861102579,7278717
      Ohio,39,2020-8-21,134,,,Prediction,36.7041573220076,4100.45580181825,11689100
      Maryland,24,2020-8-21,130,,,Prediction,15.1237131643442,3749.32835049421,6045680
      Indiana,18,2020-8-21,135,,,Prediction,9.98340359115809,3161.72264692726,6732219
      Virginia,51,2020-8-21,145,,,Prediction,24.4496486958897,2593.20995023721,8535519
      North Carolina,37,2020-8-21,143,,,Prediction,40.9795687186133,2642.01390381234,10488084
      South Carolina,45,2020-8-21,145,,,Prediction,83.6404042966458,2885.49802231492,5148714
      Mississippi,28,2020-8-21,147,,,Prediction,41.3652069618208,2333.63221055172,2976149
      Colorado,8,2020-8-21,151,,,Prediction,8.2205728856829,1949.32232343778,5758736
      Alabama,1,2020-8-21,145,,,Prediction,29.3880917829428,2100.31927130798,4903185
      Minnesota,27,2020-8-21,129,,,Prediction,7.75822070269031,1775.96280964517,5639632
      Washington,53,2020-8-21,157,,,Prediction,11.8755350238991,1836.85417981923,7614893
      Missouri,29,2020-8-21,129,,,Prediction,9.07130497290207,1374.95497799342,6137428
      Tennessee,47,2020-8-21,130,,,Prediction,20.7398855075783,1458.16201638902,6829174
      Rhode Island,44,2020-8-21,126,,,Prediction,0.243661520497719,1018.91775913424,1059361
      Wisconsin,55,2020-8-21,147,,,Prediction,11.4143706130357,1121.28227891231,5822434
      Nevada,32,2020-8-21,130,,,Prediction,27.5484064319953,1230.33850702278,3080156
      Iowa,19,2020-8-21,139,,,Prediction,8.99953118358839,1027.59355866839,3155070
      Oklahoma,40,2020-8-21,133,,,Prediction,9.01485979844122,709.839683771956,3956971
      Kentucky,21,2020-8-21,143,,,Prediction,6.31391654707569,850.341295397119,4467673
      New York,36,2020-8-22,146,,,Prediction,8.21914924846963,32896.3801069725,26161672
      New Jersey,34,2020-8-22,142,,,Prediction,10.4337777775349,16012.8565625142,8882190
      California,6,2020-8-22,143,,,Prediction,158.543244936966,12301.7278486393,39512223
      Texas,48,2020-8-22,152,,,Prediction,368.489607635635,13370.9632806058,28995881
      Massachusetts,25,2020-8-22,137,,,Prediction,17.2088516559085,8945.64089490044,6892503
      Florida,12,2020-8-22,151,,,Prediction,255.418552916707,11128.362124814,21477737
      Illinois,17,2020-8-22,137,,,Prediction,15.5282547141454,8055.79163970331,12671821
      Pennsylvania,42,2020-8-22,137,,,Prediction,18.1506451270952,7531.50672612122,12801989
      Michigan,26,2020-8-22,139,,,Prediction,6.87398641972589,6539.62040487794,9986857
      Connecticut,9,2020-8-22,152,,,Prediction,5.67275603530615,4499.57365565675,3565287
      Louisiana,22,2020-8-22,156,,,Prediction,50.2517077700172,4807.43967504881,4648794
      Georgia,13,2020-8-22,157,,,Prediction,70.3361376652967,5028.92709408873,10617423
      Arizona,4,2020-8-22,149,,,Prediction,97.0108213742513,5323.65943240004,7278717
      Ohio,39,2020-8-22,135,,,Prediction,37.3538955834227,4137.80969740168,11689100
      Maryland,24,2020-8-22,131,,,Prediction,15.2719251006733,3764.60027559488,6045680
      Indiana,18,2020-8-22,136,,,Prediction,10.1101419029501,3171.83278883021,6732219
      Virginia,51,2020-8-22,146,,,Prediction,25.7746516301004,2618.98460186731,8535519
      North Carolina,37,2020-8-22,144,,,Prediction,41.8999016977981,2683.91380551014,10488084
      South Carolina,45,2020-8-22,146,,,Prediction,86.5032421380798,2972.00126445299,5148714
      Mississippi,28,2020-8-22,148,,,Prediction,42.4940219936932,2376.12623254541,2976149
      Colorado,8,2020-8-22,152,,,Prediction,8.55027570909788,1957.87259914688,5758736
      Alabama,1,2020-8-22,146,,,Prediction,29.8623638765849,2130.18163518456,4903185
      Minnesota,27,2020-8-22,130,,,Prediction,7.72166061431606,1783.68447025948,5639632
      Washington,53,2020-8-22,158,,,Prediction,12.1007772260328,1848.95495704527,7614893
      Missouri,29,2020-8-22,130,,,Prediction,9.25307792295583,1384.20805591638,6137428
      Tennessee,47,2020-8-22,131,,,Prediction,21.289578568441,1479.45159495746,6829174
      Rhode Island,44,2020-8-22,127,,,Prediction,0.229306867186723,1019.14706600143,1059361
      Wisconsin,55,2020-8-22,148,,,Prediction,11.7226454270961,1133.0049243394,5822434
      Nevada,32,2020-8-22,131,,,Prediction,28.6872942535859,1259.02580127637,3080156
      Iowa,19,2020-8-22,140,,,Prediction,9.08861321514337,1036.68217188354,3155070
      Oklahoma,40,2020-8-22,134,,,Prediction,9.12585274314119,718.965536515097,3956971
      Kentucky,21,2020-8-22,144,,,Prediction,6.41290295197535,856.754198349094,4467673
      New York,36,2020-8-23,147,,,Prediction,8.0511627884276,32904.431269761,26161672
      New Jersey,34,2020-8-23,143,,,Prediction,10.5929389966541,16023.4495015108,8882190
      California,6,2020-8-23,144,,,Prediction,160.809483159954,12462.5373317993,39512223
      Texas,48,2020-8-23,153,,,Prediction,377.742253352302,13748.7055339581,28995881
      Massachusetts,25,2020-8-23,138,,,Prediction,17.2390722463288,8962.87996714677,6892503
      Florida,12,2020-8-23,152,,,Prediction,261.978074990141,11390.3401998042,21477737
      Illinois,17,2020-8-23,138,,,Prediction,15.5212388739696,8071.31287857727,12671821
      Pennsylvania,42,2020-8-23,138,,,Prediction,18.5332970180293,7550.04002313925,12801989
      Michigan,26,2020-8-23,140,,,Prediction,6.94974159565936,6546.57014647359,9986857
      Connecticut,9,2020-8-23,153,,,Prediction,6.14332623328679,4505.71698189004,3565287
      Louisiana,22,2020-8-23,157,,,Prediction,50.6682428232616,4858.10791787208,4648794
      Georgia,13,2020-8-23,158,,,Prediction,71.7509258781693,5100.6780199669,10617423
      Arizona,4,2020-8-23,150,,,Prediction,99.5918001004104,5423.25123250045,7278717
      Ohio,39,2020-8-23,136,,,Prediction,37.9151880225508,4175.72488542423,11689100
      Maryland,24,2020-8-23,132,,,Prediction,15.4851681483292,3780.08544374321,6045680
      Indiana,18,2020-8-23,137,,,Prediction,10.1984809471642,3182.03126977738,6732219
      Virginia,51,2020-8-23,147,,,Prediction,26.9163792473853,2645.9009811147,8535519
      North Carolina,37,2020-8-23,145,,,Prediction,42.8649895821596,2726.7787950923,10488084
      South Carolina,45,2020-8-23,147,,,Prediction,89.1833157111701,3061.18458016416,5148714
      Mississippi,28,2020-8-23,149,,,Prediction,43.6306745096143,2419.75690705502,2976149
      Colorado,8,2020-8-23,153,,,Prediction,8.9374262435725,1966.81002539045,5758736
      Alabama,1,2020-8-23,147,,,Prediction,30.3610368155024,2160.54267200006,4903185
      Minnesota,27,2020-8-23,131,,,Prediction,7.72717602565297,1791.41164628514,5639632
      Washington,53,2020-8-23,159,,,Prediction,12.3862082847339,1861.34116533,7614893
      Missouri,29,2020-8-23,131,,,Prediction,9.45419519707903,1393.66225111346,6137428
      Tennessee,47,2020-8-23,132,,,Prediction,21.7533048520182,1501.20489980948,6829174
      Rhode Island,44,2020-8-23,128,,,Prediction,0.216117399409003,1019.36318340084,1059361
      Wisconsin,55,2020-8-23,149,,,Prediction,11.9859481966859,1144.99087253609,5822434
      Nevada,32,2020-8-23,132,,,Prediction,29.7763408208971,1288.80214209727,3080156
      Iowa,19,2020-8-23,141,,,Prediction,9.05588812199472,1045.73806000553,3155070
      Oklahoma,40,2020-8-23,135,,,Prediction,9.20069341970603,728.166229934803,3956971
      Kentucky,21,2020-8-23,145,,,Prediction,6.4914781701671,863.245676519261,4467673
      New York,36,2020-8-24,148,,,Prediction,8.01456773448577,32912.4458374954,26161672
      New Jersey,34,2020-8-24,144,,,Prediction,10.5453862360797,16033.9948877469,8882190
      California,6,2020-8-24,145,,,Prediction,165.316794627833,12627.8541264271,39512223
      Texas,48,2020-8-24,154,,,Prediction,390.148312571355,14138.8538465294,28995881
      Massachusetts,25,2020-8-24,139,,,Prediction,17.3460179833484,8980.22598513012,6892503
      Florida,12,2020-8-24,153,,,Prediction,271.709752074826,11662.049951879,21477737
      Illinois,17,2020-8-24,139,,,Prediction,15.5276597425994,8086.84053831987,12671821
      Pennsylvania,42,2020-8-24,139,,,Prediction,18.908246275764,7568.94826941501,12801989
      Michigan,26,2020-8-24,141,,,Prediction,6.95423806585944,6553.52438453945,9986857
      Connecticut,9,2020-8-24,154,,,Prediction,6.36237683884973,4512.07935872889,3565287
      Louisiana,22,2020-8-24,158,,,Prediction,51.7950442470773,4909.90296211915,4648794
      Georgia,13,2020-8-24,159,,,Prediction,74.7807148312654,5175.45873479817,10617423
      Arizona,4,2020-8-24,151,,,Prediction,101.660843112302,5524.91207561275,7278717
      Ohio,39,2020-8-24,137,,,Prediction,38.3433334763552,4214.06821890058,11689100
      Maryland,24,2020-8-24,133,,,Prediction,15.6755703360772,3795.76101407929,6045680
      Indiana,18,2020-8-24,138,,,Prediction,10.2288909348998,3192.26016071228,6732219
      Virginia,51,2020-8-24,148,,,Prediction,27.3478903963842,2673.24887151108,8535519
      North Carolina,37,2020-8-24,146,,,Prediction,43.778426451463,2770.55722154377,10488084
      South Carolina,45,2020-8-24,148,,,Prediction,94.0657075621006,3155.25028772627,5148714
      Mississippi,28,2020-8-24,150,,,Prediction,44.8921296028114,2464.64903665784,2976149
      Colorado,8,2020-8-24,154,,,Prediction,9.1813113103674,1975.99133670082,5758736
      Alabama,1,2020-8-24,148,,,Prediction,30.8765539323941,2191.41922593246,4903185
      Minnesota,27,2020-8-24,132,,,Prediction,7.97054328020573,1799.38218956534,5639632
      Washington,53,2020-8-24,160,,,Prediction,12.4509750540843,1873.79214038408,7614893
      Missouri,29,2020-8-24,132,,,Prediction,9.47941306286145,1403.14166417632,6137428
      Tennessee,47,2020-8-24,133,,,Prediction,22.0935109567419,1523.29841076622,6829174
      Rhode Island,44,2020-8-24,129,,,Prediction,0.198627268100736,1019.56181066894,1059361
      Wisconsin,55,2020-8-24,150,,,Prediction,12.3096599524135,1157.3005324885,5822434
      Nevada,32,2020-8-24,133,,,Prediction,31.2433522125371,1320.0454943098,3080156
      Iowa,19,2020-8-24,142,,,Prediction,9.31707293986674,1055.0551329454,3155070
      Oklahoma,40,2020-8-24,136,,,Prediction,9.45143160109914,737.617661535902,3956971
      Kentucky,21,2020-8-24,146,,,Prediction,6.52126751238716,869.766944031648,4467673
      New York,36,2020-8-25,149,,,Prediction,7.96851451164267,32920.4143520071,26161672
      New Jersey,34,2020-8-25,145,,,Prediction,10.5091969336225,16044.5040846805,8882190
      California,6,2020-8-25,146,,,Prediction,169.950441037342,12797.8045674644,39512223
      Texas,48,2020-8-25,155,,,Prediction,402.961819736674,14541.8156662661,28995881
      Massachusetts,25,2020-8-25,140,,,Prediction,17.4536271778037,8997.67961230792,6892503
      Florida,12,2020-8-25,154,,,Prediction,280.909315849541,11942.9592677285,21477737
      Illinois,17,2020-8-25,140,,,Prediction,15.8121636716721,8102.65270199155,12671821
      Pennsylvania,42,2020-8-25,140,,,Prediction,19.2425953560342,7588.19086477105,12801989
      Michigan,26,2020-8-25,142,,,Prediction,6.95561776018819,6560.48000229964,9986857
      Connecticut,9,2020-8-25,155,,,Prediction,6.61525216902013,4518.69461089791,3565287
      Louisiana,22,2020-8-25,159,,,Prediction,52.5010947930657,4962.40405691222,4648794
      Georgia,13,2020-8-25,160,,,Prediction,77.4054464585617,5252.86418125673,10617423
      Arizona,4,2020-8-25,152,,,Prediction,103.851698099041,5628.76377371179,7278717
      Ohio,39,2020-8-25,138,,,Prediction,39.4767287800235,4253.54494768061,11689100
      Maryland,24,2020-8-25,134,,,Prediction,15.8552618643524,3811.61627594364,6045680
      Indiana,18,2020-8-25,139,,,Prediction,10.2501261530432,3202.51028686532,6732219
      Virginia,51,2020-8-25,149,,,Prediction,27.8578892710331,2701.10676078212,8535519
      North Carolina,37,2020-8-25,147,,,Prediction,44.7364656537607,2815.29368719753,10488084
      South Carolina,45,2020-8-25,149,,,Prediction,99.215388759653,3254.46567648592,5148714
      Mississippi,28,2020-8-25,151,,,Prediction,46.092927966065,2510.7419646239,2976149
      Colorado,8,2020-8-25,155,,,Prediction,9.36967513090788,1985.36101183172,5758736
      Alabama,1,2020-8-25,149,,,Prediction,31.3661929233293,2222.78541885579,4903185
      Minnesota,27,2020-8-25,133,,,Prediction,8.09483222742698,1807.47702179277,5639632
      Washington,53,2020-8-25,161,,,Prediction,12.5006452109845,1886.29278559507,7614893
      Missouri,29,2020-8-25,133,,,Prediction,9.50469819410024,1412.64636237042,6137428
      Tennessee,47,2020-8-25,134,,,Prediction,22.4469979934039,1545.74540875962,6829174
      Rhode Island,44,2020-8-25,130,,,Prediction,0.180939189418462,1019.74274985836,1059361
      Wisconsin,55,2020-8-25,151,,,Prediction,12.9042150795282,1170.20474756803,5822434
      Nevada,32,2020-8-25,134,,,Prediction,32.8537414146162,1352.89923572442,3080156
      Iowa,19,2020-8-25,143,,,Prediction,9.46372113092491,1064.51885407632,3155070
      Oklahoma,40,2020-8-25,137,,,Prediction,9.70900292351115,747.326664459413,3956971
      Kentucky,21,2020-8-25,147,,,Prediction,6.56041991219211,876.32736394384,4467673
      New York,36,2020-8-26,150,,,Prediction,7.81193456292818,32928.22628657,26161672
      New Jersey,34,2020-8-26,146,,,Prediction,10.4453746131682,16054.9494592937,8882190
      California,6,2020-8-26,147,,,Prediction,172.379735238086,12970.1843027025,39512223
      Texas,48,2020-8-26,156,,,Prediction,412.769726187821,14954.5853924539,28995881
      Massachusetts,25,2020-8-26,141,,,Prediction,17.4732161905427,9015.15282849847,6892503
      Florida,12,2020-8-26,155,,,Prediction,287.666286298834,12230.6255540274,21477737
      Illinois,17,2020-8-26,141,,,Prediction,16.0740318100181,8118.72673380156,12671821
      Pennsylvania,42,2020-8-26,141,,,Prediction,19.4526869785076,7607.64355174955,12801989
      Michigan,26,2020-8-26,143,,,Prediction,6.96636283940063,6567.44636513904,9986857
      Connecticut,9,2020-8-26,156,,,Prediction,6.85113008572977,4525.54574098364,3565287
      Louisiana,22,2020-8-26,160,,,Prediction,53.2730470548641,5015.67710396708,4648794
      Georgia,13,2020-8-26,161,,,Prediction,78.9624314864124,5331.82661274314,10617423
      Arizona,4,2020-8-26,153,,,Prediction,106.0494967955,5734.81327050729,7278717
      Ohio,39,2020-8-26,139,,,Prediction,40.6008492101445,4294.14579689075,11689100
      Maryland,24,2020-8-26,135,,,Prediction,15.9974740866994,3827.61375003034,6045680
      Indiana,18,2020-8-26,140,,,Prediction,10.2806901372499,3212.79097700257,6732219
      Virginia,51,2020-8-26,150,,,Prediction,28.3773988921556,2729.48415967427,8535519
      North Carolina,37,2020-8-26,148,,,Prediction,45.7154704134695,2861.009157611,10488084
      South Carolina,45,2020-8-26,150,,,Prediction,102.45019376257,3356.91587024849,5148714
      Mississippi,28,2020-8-26,152,,,Prediction,47.0774471600509,2557.81941178395,2976149
      Colorado,8,2020-8-26,156,,,Prediction,9.56981199369183,1994.93082382542,5758736
      Alabama,1,2020-8-26,150,,,Prediction,31.8284548233047,2254.61387367909,4903185
      Minnesota,27,2020-8-26,134,,,Prediction,8.25305192437856,1815.73007371715,5639632
      Washington,53,2020-8-26,162,,,Prediction,12.5453521466038,1898.83813774167,7614893
      Missouri,29,2020-8-26,134,,,Prediction,9.64692942951877,1422.29329179994,6137428
      Tennessee,47,2020-8-26,135,,,Prediction,22.814231260104,1568.55964001973,6829174
      Rhode Island,44,2020-8-26,131,,,Prediction,0.170279651017941,1019.91302950938,1059361
      Wisconsin,55,2020-8-26,152,,,Prediction,13.6027195921955,1183.80746716023,5822434
      Nevada,32,2020-8-26,135,,,Prediction,34.2119588520989,1387.11119457652,3080156
      Iowa,19,2020-8-26,144,,,Prediction,9.58806946336799,1074.10692353969,3155070
      Oklahoma,40,2020-8-26,138,,,Prediction,9.7568096777527,757.083474137166,3956971
      Kentucky,21,2020-8-26,148,,,Prediction,6.59980737525855,882.927171319099,4467673
      New York,36,2020-8-27,151,,,Prediction,7.66151347001885,32935.88780004,26161672
      New Jersey,34,2020-8-27,147,,,Prediction,10.4040049400563,16065.3534642337,8882190
      California,6,2020-8-27,148,,,Prediction,174.843754093133,13145.0280567957,39512223
      Texas,48,2020-8-27,157,,,Prediction,421.864151717267,15376.4495441712,28995881
      Massachusetts,25,2020-8-27,142,,,Prediction,17.9867672538366,9033.1395957523,6892503
      Florida,12,2020-8-27,156,,,Prediction,294.819789921025,12525.4453439484,21477737
      Illinois,17,2020-8-27,142,,,Prediction,16.0667693816103,8134.79350318317,12671821
      Pennsylvania,42,2020-8-27,142,,,Prediction,20.2135870654775,7627.85713881503,12801989
      Michigan,26,2020-8-27,144,,,Prediction,6.98338458350032,6574.42974972254,9986857
      Connecticut,9,2020-8-27,157,,,Prediction,7.10474386182609,4532.65048484546,3565287
      Louisiana,22,2020-8-27,161,,,Prediction,54.2280260590797,5069.90513002616,4648794
      Georgia,13,2020-8-27,162,,,Prediction,80.5507347546177,5412.37734749776,10617423
      Arizona,4,2020-8-27,154,,,Prediction,108.211608353604,5843.02487886089,7278717
      Ohio,39,2020-8-27,140,,,Prediction,41.2326356856071,4335.37843257636,11689100
      Maryland,24,2020-8-27,136,,,Prediction,16.6947939011821,3844.30854393152,6045680
      Indiana,18,2020-8-27,141,,,Prediction,10.3237748424094,3223.11475184498,6732219
      Virginia,51,2020-8-27,151,,,Prediction,28.9562123120741,2758.44037198635,8535519
      North Carolina,37,2020-8-27,149,,,Prediction,47.4035928712851,2908.41275048228,10488084
      South Carolina,45,2020-8-27,151,,,Prediction,105.790465906601,3462.70633615509,5148714
      Mississippi,28,2020-8-27,153,,,Prediction,48.6941362324505,2606.5135480164,2976149
      Colorado,8,2020-8-27,157,,,Prediction,9.79039883449034,2004.72122265991,5758736
      Alabama,1,2020-8-27,151,,,Prediction,32.6018945124383,2287.21576819153,4903185
      Minnesota,27,2020-8-27,135,,,Prediction,8.41436414651165,1824.14443786366,5639632
      Washington,53,2020-8-27,163,,,Prediction,12.5798657058035,1911.41800344748,7614893
      Missouri,29,2020-8-27,135,,,Prediction,9.71024982057984,1432.00354162052,6137428
      Tennessee,47,2020-8-27,136,,,Prediction,23.1792495235049,1591.73888954323,6829174
      Rhode Island,44,2020-8-27,132,,,Prediction,0.160960956885953,1020.07399046626,1059361
      Wisconsin,55,2020-8-27,153,,,Prediction,13.9778464946745,1197.7853136549,5822434
      Nevada,32,2020-8-27,136,,,Prediction,35.6649404648684,1422.77613504139,3080156
      Iowa,19,2020-8-27,145,,,Prediction,9.76397845130754,1083.870901991,3155070
      Oklahoma,40,2020-8-27,139,,,Prediction,9.79687483901044,766.880348976176,3956971
      Kentucky,21,2020-8-27,149,,,Prediction,6.63382725188845,889.560998570987,4467673
      New York,36,2020-8-28,152,,,Prediction,7.52306430050708,32943.4108643405,26161672
      New Jersey,34,2020-8-28,148,,,Prediction,10.3463114927103,16075.6997757264,8882190
      California,6,2020-8-28,149,,,Prediction,177.159602481498,13322.1876592772,39512223
      Texas,48,2020-8-28,158,,,Prediction,433.433123960347,15809.8826681315,28995881
      Massachusetts,25,2020-8-28,143,,,Prediction,18.5271331644176,9051.66672891672,6892503
      Florida,12,2020-8-28,157,,,Prediction,302.871787586131,12828.3171315345,21477737
      Illinois,17,2020-8-28,143,,,Prediction,16.066461576182,8150.85996475936,12671821
      Pennsylvania,42,2020-8-28,143,,,Prediction,21.0042500814963,7648.86138889653,12801989
      Michigan,26,2020-8-28,145,,,Prediction,6.97225305756895,6581.40200278011,9986857
      Connecticut,9,2020-8-28,158,,,Prediction,7.36774586243732,4540.0182307079,3565287
      Louisiana,22,2020-8-28,162,,,Prediction,55.7866550068043,5125.69178503297,4648794
      Georgia,13,2020-8-28,163,,,Prediction,82.3827097119095,5494.76005720967,10617423
      Arizona,4,2020-8-28,155,,,Prediction,110.333989495181,5953.35886835607,7278717
      Ohio,39,2020-8-28,141,,,Prediction,41.9183720412602,4377.29680461762,11689100
      Maryland,24,2020-8-28,137,,,Prediction,17.3081978128628,3861.61674174438,6045680
      Indiana,18,2020-8-28,142,,,Prediction,10.3545584334137,3233.46931027839,6732219
      Virginia,51,2020-8-28,152,,,Prediction,29.5468317814602,2787.98720376781,8535519
      North Carolina,37,2020-8-28,150,,,Prediction,48.9335296600265,2957.34628014231,10488084
      South Carolina,45,2020-8-28,152,,,Prediction,109.153839697537,3571.86017585263,5148714
      Mississippi,28,2020-8-28,154,,,Prediction,50.1811479100196,2656.69469592642,2976149
      Colorado,8,2020-8-28,158,,,Prediction,9.99125869717656,2014.71248135708,5758736
      Alabama,1,2020-8-28,152,,,Prediction,33.2470534826619,2320.46282167419,4903185
      Minnesota,27,2020-8-28,136,,,Prediction,8.55886053616298,1832.70329839982,5639632
      Washington,53,2020-8-28,164,,,Prediction,12.609286543313,1924.02728999079,7614893
      Missouri,29,2020-8-28,136,,,Prediction,9.87742404455202,1441.88096566507,6137428
      Tennessee,47,2020-8-28,137,,,Prediction,23.525062171985,1615.26395171522,6829174
      Rhode Island,44,2020-8-28,133,,,Prediction,0.151702667414014,1020.22569313368,1059361
      Wisconsin,55,2020-8-28,154,,,Prediction,14.3235437899011,1212.1088574448,5822434
      Nevada,32,2020-8-28,137,,,Prediction,37.0991666190973,1459.87530166049,3080156
      Iowa,19,2020-8-28,146,,,Prediction,9.89227200747148,1093.76317399847,3155070
      Oklahoma,40,2020-8-28,140,,,Prediction,9.91749612559183,776.797845101768,3956971
      Kentucky,21,2020-8-28,150,,,Prediction,6.6717772602029,896.23277583119,4467673
      New York,36,2020-8-29,153,,,Prediction,7.3811748007398,32950.7920391413,26161672
      New Jersey,34,2020-8-29,149,,,Prediction,10.5656458048506,16086.2654215313,8882190
      California,6,2020-8-29,150,,,Prediction,179.506124849529,13501.6937841267,39512223
      Texas,48,2020-8-29,159,,,Prediction,445.654153035844,16255.5368211674,28995881
      Massachusetts,25,2020-8-29,144,,,Prediction,18.5831746549518,9070.24990357167,6892503
      Florida,12,2020-8-29,158,,,Prediction,311.638202777737,13139.9553343123,21477737
      Illinois,17,2020-8-29,144,,,Prediction,16.0175584291584,8166.87752318851,12671821
      Pennsylvania,42,2020-8-29,144,,,Prediction,21.2512845908959,7670.11267348742,12801989
      Michigan,26,2020-8-29,146,,,Prediction,7.09030289336647,6588.49230567348,9986857
      Connecticut,9,2020-8-29,159,,,Prediction,8.04204539460797,4548.06027610251,3565287
      Louisiana,22,2020-8-29,163,,,Prediction,57.2688937259434,5182.96067875891,4648794
      Georgia,13,2020-8-29,164,,,Prediction,84.0398107486419,5578.79986795831,10617423
      Arizona,4,2020-8-29,156,,,Prediction,113.269431908978,6066.62830026505,7278717
      Ohio,39,2020-8-29,142,,,Prediction,42.6155128182326,4419.91231743585,11689100
      Maryland,24,2020-8-29,138,,,Prediction,17.363143114164,3878.97988485855,6045680
      Indiana,18,2020-8-29,143,,,Prediction,10.4891671236236,3243.95847740202,6732219
      Virginia,51,2020-8-29,153,,,Prediction,31.1747870398298,2819.16199080764,8535519
      North Carolina,37,2020-8-29,151,,,Prediction,49.9762848449065,3007.32256498721,10488084
      South Carolina,45,2020-8-29,153,,,Prediction,112.889949601019,3684.75012545365,5148714
      Mississippi,28,2020-8-29,155,,,Prediction,51.5234197249162,2708.21811565134,2976149
      Colorado,8,2020-8-29,159,,,Prediction,10.3833904681896,2025.09587182527,5758736
      Alabama,1,2020-8-29,153,,,Prediction,33.7370347229434,2354.19985639713,4903185
      Minnesota,27,2020-8-29,137,,,Prediction,8.70583830245298,1841.40913670228,5639632
      Washington,53,2020-8-29,165,,,Prediction,12.853731810526,1936.88102180131,7614893
      Missouri,29,2020-8-29,137,,,Prediction,10.0753501988235,1451.95631586389,6137428
      Tennessee,47,2020-8-29,138,,,Prediction,24.1400101961779,1639.4039619114,6829174
      Rhode Island,44,2020-8-29,134,,,Prediction,0.143082714080906,1020.36877584776,1059361
      Wisconsin,55,2020-8-29,155,,,Prediction,14.6371453590788,1226.74600280388,5822434
      Nevada,32,2020-8-29,138,,,Prediction,38.4658591147934,1498.34116077528,3080156
      Iowa,19,2020-8-29,147,,,Prediction,10.1125688755331,1103.875742874,3155070
      Oklahoma,40,2020-8-29,141,,,Prediction,10.047777157884,786.845622259652,3956971
      Kentucky,21,2020-8-29,151,,,Prediction,6.78209850546644,903.014874336656,4467673`)

    this.state_records = {}

    for (var i=0;i<this.records.data.length;i++) {
      var this_state = this.records.data[i][0].trim()
      if (this_state in this.state_records) {
        this.state_records[this_state].push({
          'FIPS': this.records.data[i][1],
          'Date': this.records.data[i][2],
          'Days_from_Ref': this.records.data[i][3],
          'RelativeMobility': this.records.data[i][4],
          'CumulativeMobility': this.records.data[i][5],
          'Actual': this.records.data[i][6],
          'FatalityRA': this.records.data[i][7],
          'CumFatality': this.records.data[i][8],
          'Population': this.records.data[i][9],
        })
      }
      else {
        this.state_records[this_state] = [{
          'FIPS': this.records.data[i][1],
          'Date': this.records.data[i][2],
          'Days_from_Ref': this.records.data[i][3],
          'RelativeMobility': this.records.data[i][4],
          'CumulativeMobility': this.records.data[i][5],
          'Actual': this.records.data[i][6],
          'FatalityRA': this.records.data[i][7],
          'CumFatality': this.records.data[i][8],
          'Population': this.records.data[i][9],
        }]
      }
    }
  }



  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleSubmit(e) {
    e.preventDefault()
    //this.setState({ response_data: [] })
    //this.getResponse("http://127.0.0.1:5000/", this.state)

  }
  //componentDidMount(e) {
  //  this.getResponse()
  //}
  getPlotData(search_term) {
    return this.state_records[search_term]
  }


  async getResponse(url, data) {
    var out_data = []
    var decoder = new TextDecoder()
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      body: JSON.stringify(data)
    })
    .then(response => response.body.getReader().read())
    .then(({ done, value }) => {
      out_data.push(decoder.decode(value))
    })
    .then(() => this.setState({ response_data: JSON.parse(out_data[0]) }))
    .catch(error => console.log(error))
  }

  render () {
    if (this.state.search_term === "") {
      var output = <p>Please enter a state name to see predicted fatalities due to COVID.</p>
    } else {
      // hack, idk why this.state.response_data is still a string and needs to be parsed again
      //var response_string = this.state.response_data
      //var out_data = JSON.parse(response_string).record_data
      var out_data = this.getPlotData(this.state.search_term)
      //var metadata = JSON.parse(response_string).metadata
      var prediction_date = "" // use this to change line color on plot, will need to get it as a percentage of total dates
      for (var i=0;i<out_data.length;i++) {
        if (out_data[i].Actual == "Prediction") {
          prediction_date = out_data[i].Date
          break
        }
      }
      console.log(prediction_date)
      var line_percent = i*100/(out_data.length) // change color of line at this percentage
      console.log(line_percent)

      console.log(out_data)
      var output =
        <div className = "output">
          <p>Predicted fatalities for {this.state.search_term} start from <strong>{prediction_date}</strong> (Y-M-D)</p>
          <div className="plot-container">
            <div className="plot-legend">
              <svg width="1500" height="75">
                <circle cx="1115" cy="70" r="5" stroke="#0d47a1" fill="#0d47a1" />
                <text x="1145" y="75" class="small">Actual</text>
                <circle cx="1320" cy="70" r="5" stroke="#eb3710" fill="#eb3710" />
                <text x="1350" y="75" class="small">Predicted</text>
              </svg>
            </div>
            <LineChart
              width = {1500}
              height = {600}
              data = {out_data}
              margin = {{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="linecolor" x1="0%" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#0d47a1" />
                  <stop offset={`${line_percent}%`} stopColor="#0d47a1"/>
                  <stop offset={`${line_percent}%`} stopColor="#eb3710"/>
                  <stop offset="100%" stopColor="#eb3710"/>
                </linearGradient>
              </defs>
              <YAxis domain={[0, 40000]}/>
              <XAxis dataKey="Date" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line
                type="monotone"
                dataKey="CumFatality"
                stroke="url(#linecolor)"
                yAxisId={0}
                dot={false}
                strokeWidth={4}
              />
            </LineChart>
          </div>
        </div>
    }
    return (
      <div className="App">
        <h3>Mobility-informed collision model for Covid transmission</h3>
        <p>See <a href="https://github.com/reichlab/covid19-forecast-hub/blob/master/data-processed/RPI-UW-Mob-Collision/metadata-RPI-UW-Mob-Collision.txt">github page</a> for details.</p>
        <div className="searchform">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <select value={this.state.search_term} onChange={this.handleChange}>
              <option value="" selected disabled hidden>Choose state</option>
              <option value="New York" onClick={(e) => this.setState({ search_term: "New York" })}>New York</option>
              <option value="New Jersey" onClick={(e) => this.setState({ search_term: "New Jersey" })}>New Jersey</option>
              <option value="California" onClick={(e) => this.setState({ search_term: "California" })}>California</option>
              <option value="Texas" onClick={(e) => this.setState({ search_term: "Texas" })}>Texas</option>
              <option value="Massachusetts" onClick={(e) => this.setState({ search_term: "Massachusetts" })}>Massachusetts</option>
              <option value="Florida" onClick={(e) => this.setState({ search_term: "Florida" })}>Florida</option>
              <option value="Illinois" onClick={(e) => this.setState({ search_term: "Illinois" })}>Illinois</option>
              <option value="Pennsylvania" onClick={(e) => this.setState({ search_term: "Pennsylvania" })}>Pennsylvania</option>
              <option value="Michigan" onClick={(e) => this.setState({ search_term: "Michigan" })}>Michigan</option>
              <option value="Connecticut" onClick={(e) => this.setState({ search_term: "Connecticut" })}>Connecticut</option>
              <option value="Louisiana" onClick={(e) => this.setState({ search_term: "Louisiana" })}>Louisiana</option>
              <option value="Georgia" onClick={(e) => this.setState({ search_term: "Georgia" })}>Georgia</option>
              <option value="Arizona" onClick={(e) => this.setState({ search_term: "Arizona" })}>Arizona</option>
              <option value="Ohio" onClick={(e) => this.setState({ search_term: "Ohio" })}>Ohio</option>
              <option value="Maryland" onClick={(e) => this.setState({ search_term: "Maryland" })}>Maryland</option>
              <option value="Indiana" onClick={(e) => this.setState({ search_term: "Indiana" })}>Indiana</option>
              <option value="Virginia" onClick={(e) => this.setState({ search_term: "Virginia" })}>Virginia</option>
              <option value="North Carolina" onClick={(e) => this.setState({ search_term: "North Carolina" })}>North Carolina</option>
              <option value="South Carolina" onClick={(e) => this.setState({ search_term: "South Carolina" })}>South Carolina</option>
              <option value="Mississippi" onClick={(e) => this.setState({ search_term: "Mississippi" })}>Mississippi</option>
              <option value="Colorado" onClick={(e) => this.setState({ search_term: "Colorado" })}>Colorado</option>
              <option value="Alabama" onClick={(e) => this.setState({ search_term: "Alabama" })}>Alabama</option>
              <option value="Minnesota" onClick={(e) => this.setState({ search_term: "Minnesota" })}>Minnesota</option>
              <option value="Washington" onClick={(e) => this.setState({ search_term: "Washington" })}>Washington</option>
              <option value="Missouri" onClick={(e) => this.setState({ search_term: "Missouri" })}>Missouri</option>
              <option value="Tennessee" onClick={(e) => this.setState({ search_term: "Tennessee" })}>Tennessee</option>
              <option value="Rhode Island" onClick={(e) => this.setState({ search_term: "Rhode Island" })}>Rhode Island</option>
              <option value="Wisconsin" onClick={(e) => this.setState({ search_term: "Wisconsin" })}>Wisconsin</option>
              <option value="Nevada" onClick={(e) => this.setState({ search_term: "Nevada" })}>Nevada</option>
              <option value="Iowa" onClick={(e) => this.setState({ search_term: "Iowa" })}>Iowa</option>
              <option value="Oklahoma" onClick={(e) => this.setState({ search_term: "Oklahoma" })}>Oklahoma</option>
              <option value="Kentucky" onClick={(e) => this.setState({ search_term: "Kentucky" })}>Kentucky</option>
            </select>
          </form>
        </div>
        <div className="output-container">
          {output}
        </div>
      </div>
    )
  }
}

export default App;
