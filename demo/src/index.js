import './style.css'
import React from 'react';
import {render} from 'react-dom';

import RxInput from '../../src/index';
import RX from 'incr-regex-package'
import { Tab, Tabs } from 'react-bootstrap';

///(((North|South)  )?(America|Africa|Atlantic|Pacific)|East Asia|The Arctic|Atlantis|Middle East|Mediterranian|Greenland|Arabia|Central (Asia|Africa|America)|Siberia|Asia|Australia|Oceanea|Antarctica|India|Europe|Ring of Fire|Polynisia|Micronesia)/


const US = [
    ["AL", "Alabama"],
    ["AK", "Alaska"],
    ["AS", "American Samoa"],
    ["AZ", "Arizona"],
    ["AR", "Arkansas"],
    ["CA", "California"],
    ["CO", "Colorado"],
    ["CT", "Connecticut"],
    ["DE", "Delaware"],
    ["DC", "District Of Columbia"],
    ["FM", "Federated States Of Micronesia"],
    ["FL", "Florida"],
    ["GA", "Georgia"],
    ["GU", "Guam"],
    ["HI", "Hawaii"],
    ["ID", "Idaho"],
    ["IL", "Illinois"],
    ["IN", "Indiana"],
    ["IA", "Iowa"],
    ["KS", "Kansas"],
    ["KY", "Kentucky"],
    ["LA", "Louisiana"],
    ["ME", "Maine"],
    ["MH", "Marshall Islands"],
    ["MD", "Maryland"],
    ["MA", "Massachusetts"],
    ["MI", "Michigan"],
    ["MN", "Minnesota"],
    ["MS", "Mississippi"],
    ["MO", "Missouri"],
    ["MT", "Montana"],
    ["NE", "Nebraska"],
    ["NV", "Nevada"],
    ["NH", "New Hampshire"],
    ["NJ", "New Jersey"],
    ["NM", "New Mexico"],
    ["NY", "New York"],
    ["NC", "North Carolina"],
    ["ND", "North Dakota"],
    ["MP", "Mariana Islands"],
    ["MP", "Northern Mariana Islands"],
    ["OH", "Ohio"],
    ["OK", "Oklahoma"],
    ["OR", "Oregon"],
    ["PW", "Palau"],
    ["PA", "Pennsylvania"],
    ["PR", "Puerto Rico"],
    ["RI", "Rhode Island"],
    ["SC", "South Carolina"],
    ["SD", "South Dakota"],
    ["TN", "Tennessee"],
    ["TX", "Texas"],
    ["UT", "Utah"],
    ["VT", "Vermont"],
    ["VI", "Virgin Islands"],
    ["VA", "Virginia"],
    ["WA", "Washington"],
    ["WV", "West Virginia"],
    ["WI", "Wisconsin"],
    ["WY", "Wyoming"]
];

function genRegExStringForUS() {
  return US.map( ([stateAbbrv, name]) => `(${stateAbbrv}-${name}|${name}-${stateAbbrv})` ).join("|");
}

const rxtokenStr =     '(?:\\[(?:\\\\u|\\\\\\]|\\\\\\\\|(\\\\)?\\[|[^\\]\\[\\\\])*?\\])|(?:\\{(?:\\d+,\\d+|'+
                       '\\d+|\\d+,|,\\d+)\\})|(?:\\\\(?:\\.|\\||\\+|\\*|\\?|\\(|\\)|\\^|\\$|d|D|s|S|b|'+
                       'B|w|W|\\[|\\]|\\{|\\}|\\\\))|(?:\\(\\?:|\\?\\?|\\*\\?|\\+\\?)|(?:\\.|\\||\\+|'+
                       '\\*|\\?|\\(|\\)|\\^|\\$)|(?:[^.+?{}\\]\\[|()\\\\])';

const App = React.createClass({
  getInitialState() {
    return {
      various:  '',
      rgb: '',
      changing: '',
      color: '',
      custom: /Yes|No|Nada|Yep/,
      rxinput:  "Yes|No|Nada|Yep",          //"Custom: ((North|South) America|Africa|Asia|Australia|Antartica|Europe)",
      customrx: "",
    }
  },

  _setValue(exp) {
    console.log(exp);
    this.setState({rxinput: exp, custom: new RegExp(exp), customrx: ''});
  },

  showLink(key,str) {
    const doClick = () => this._setValue(str);
    return (<div className="small-text form-field"><span 
               style={{minWidth: "200px", 
                       display: 'inline-block', 
                       overflow: 'hidden'
                     }} >{key}:</span> <a onClick={doClick}>{str}</a></div>);
  },

  _onChange(e) {
    const stateChange = {}
    stateChange[e.target.name] = e.target.value
    this.setState(stateChange)
  },


  _changePattern(e) {
    try {
      console.log("rxinput: "+e.target.value);
      let custom = new RegExp(e.target.value);
      var o = {rxinput: e.target.value};
      if( custom ) o.custom = custom;
      this.setState(o);
    } catch(e) {
        this.setState({ "rxinput": e.target.value});
    }
  },

  _createHeader() {
   return (
    <div>
        <h1>
          Demo of Dynamic Masked Input
        </h1>
        <p></p>
        <p className="lead">A React component which creates a masked using 
          <a href="https://github.com/nurulc/incr-regex-package">incremental regular expression matching</a>
          to validate input as you type
          <code>&lt;RxInput/&gt;</code>
        </p>

    </div>
    );
  },

  rxString(regex) {
    return encodeURI(regex.toString().replace(/^\//,"").replace(/\/$/,""));
  },

  customEditor(doRender) {
    const expDate = "(exp: )?(0[1-9]|1[012])/\\d{2}";
    let rxStr = this.rxString(this.state.custom);
    let tmpRxS = `(${rxtokenStr})*`;
    let rxtoken;
    try {
      console.log(tmpRxS);
       rxtoken = new RegExp(tmpRxS);
     } catch(e) {
        throw new Error("invalid Rx" + tmpRxS);
     } 
    return (<div>
                 <div className="form-field">
                  <div style={{padding: "3px 0px 3px 0px", width: "800px"}} className="form-field" >
                    <div className="row">
                            <div className="col-md-10 col-md-offset-2">
                              <blockquote style={{fontSize: "100%"}}>
                               
                                 <em>Click on one of the regular expressions links below, that will copy the text into into the input field.
                                 You can edit it and then <i>tabs</i> forward to the second input field to test
                                 the RxInput behavior.</em>
                                 
                              </blockquote>   
                            </div> 
                    </div>  
                    <div className="row">
                      <div className="col-md-10 col-md-offset-2" style={{paddingTop: "0px", paddingBottom: "0px"}}>
                        {this.showLink("Continents","((North|South) America|Africa|Asia|Australia|Antarctica|Europe)")}
                        {this.showLink("email","[a-zA-Z_0-9][a-zA-Z_.0-9-]*@([a-zA-Z_0-9][a-zA-Z_.0-9-]*)+")}
                        {this.showLink("better email","[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]{2,})*(\\.[a-zA-Z0-9_-]{2,8})")}
                        {this.showLink("Colors","Red|Gr(een|ay)|Blue|Yellow|O(range|live)")}
                        {this.showLink("Month/Year",expDate)}
                        {this.showLink("IP","((25[0-5]|2[0-4]\\d|[10]?\\d{1,2})\\.){3}(25[0-5]|2[0-4]\\d|[10]?\\d{1,2})")}
                        {this.showLink("URL","((http|https)://[A-Za-z0-9._-]+(\\?([a-z0-9+*.=_&-]|%[0-9a-f][0-9a-f])*)?)|(ftp|mail)://[a-zA-z0-9_-]+@[A-Za-z0-9._-]+")}
                      </div>
                    </div>
                  </div>
                  <div className="form-field">
                          <div className="row">
                            <div className="col-md-10 col-md-offset-2">
                              <blockquote style={{fontSize: "100%"}}>
                                 <b>Note:</b> <em>The input box below uses RegExp to validate that you are entering valid RegExp tokens</em>
                              </blockquote>   
                            </div>
                          </div>  
                          <label htmlFor="rxinput">Enter a Regular expression:</label>
                          { /*<div  style={{marginBotton: "0px", paddingLeft: "100px"}}> */}
                             <RxInput name="rxinput" id="rxinput" 
                                    mask={rxtoken}
                                    size="100"
                                    key="rxinput"  
                                    onChange={this._changePattern} 
                                    style={{padding: "3px 0px 3px 0px"}} 
                                    popover="yes"
                                    placeholder="Enter a regular expression here, see above for examples (try continent) "
                                    value={this.state.rxinput}
                                    tabIndex="1"
                                    showAll="no"
                                    
                              />
                              <div className="row">
                                
                                <div className="col-md-4 col-md-offset-2">
                                  <a href={`https://regexper.com/#${rxStr}`} target="rxdiagram" tabIndex="3">
                                       <span className="small-text">
                                          RegExp Railroad Diagram<img src="railroad.png" />
                                       </span>
                                  </a>
                                </div>
                                <div className="col-md-4">
                                  <a href={`https://regexper.com/#${this.rxString(rxtoken)}`} target="rxdiagram" tabIndex="3">
                                       <span className="small-text">
                                           For tokenizer (above)<img src="railroad.png" />
                                       </span>
                                  </a>
                                </div>
                              </div>
                  </div>
                  
                </div>
 

                    <div className="form-field">
                      <div className="row">
                          <div className="col-md-2"><b>Regex Tester:</b></div>
                          <div className="col-md-10">
                            <blockquote style={{fontSize: "100%"}}>
                               <b>RegEx:</b> {this.state.custom.toString()} &nbsp; &nbsp;
                               <b>Note:</b> <em>The input box below to test the expresseion you entered in the RxInput field above</em>
                            </blockquote>   
                          </div>
                      </div>    
                      <RxInput mask={this.state.custom} name="customrx" id="customrx" 
                               size="40" selection={{start:0,stop:0}} popover="yes"
                               value={this.state.customrx} 
                               onChange={this._onChange}
                               tabIndex="2" />
                    </div>
                
        </div>);
  },

  stateSsnCcPhoneEmail(rxStatePhoneCcSsn) {
    return ( <div>
              <div className="form-field">
                <p className="small-text form-field">Input allowed: <code>State Name| Phone: |Ssn:  |Cc: |Email: </code></p>
              </div>
              <div className="form-field" style={ {verticalAlign: 'top', width: "600px"} } >
                <label htmlFor="card">Various:</label>
                <RxInput mask={rxStatePhoneCcSsn} name="card" id="card" popover="yes" placeholder="State Name| Phone: |Ssn:  |Cc: |Email: " 
                             size="50" value={this.state.various} onChange={this._onChange} selection={{start:0,stop:0}} 
                />
                <div className="row" style={{marginTop: "0px"}} >                                
                                <div className="col-md-4 col-md-offset-2">
                                  <a href={`https://regexper.com/#${this.rxString(rxStatePhoneCcSsn)}`} target="rxdiagram" tabindex="3">
                                   <span className="small-text">
                                      Show RegEx Diagram(https://regexper.com)<img src="railroad.png" />
                                   </span>
                                 </a>
                                </div>
                                
                              </div>
              </div>
            </div>);
  },


  render() {
    
    const states = genRegExStringForUS(); // Regex string that matches state names or abbreviations
    const ssn = "Ssn: \\d{3}-\\d{2}-\\d{4}"; // RegEx string that matched social security number (US)

    const optionalInternationalDialing = "(\\+\\d{1,3} )?";
    const digits3 = "\\d{3}";
    const areaCode=`\\(${digits3}\\)`, 
          exchg = digits3;
    const digits4 = "\\d{4}";
    const phonebase = `${optionalInternationalDialing}${areaCode}-${exchg}-${digits4}`;
    const optionalExtension = "( Ext: \\d+)?";             //
    const phone = `Phone: ${phonebase}${optionalExtension}`;
    // or you could write out in full as shown below (if you are couragious)
    // const phone = "Phone: (\\+\\d{1,3} )?\\(\\d{3}\\)-\\d{3}-\\d{4}( Ext: \\d+)?";


    const hwc_phone = new RegExp(`(Home|Cell): ${phonebase}|Work: ${phonebase}${optionalExtension}`);
    const zip = "Zip: \\d{5}(-\\d{4})?";
    const creditcard = "CC: (\\d{4}-){3}\\d{4} exp: (0[1-9]|1[012])/\\d{2}";

    
    const emails = "[a-zA-Z_0-9][a-zA-Z_.0-9-]*@([a-zA-Z_0-9][a-zA-Z_.0-9-]*)+";

    // the previous regexp(s) were written as strings so I can join them before making it into a regular expression
    const rxStatePhoneCcSsn = new RegExp([states,ssn,phone,zip,creditcard, "Email: " + emails].join("|"));

    const rz2 = /aa[a-zA-Z]+@-@\d+!!/;
    const email = new RegExp(emails);
    const yesno = /Yes|No/;
    const color = /Red|Gr(een|ay)|Blue|Yellow|O(range|live)/;
  
    return (
      <div className="App">
        { window.hide_header?undefined: this._createHeader() }
        <div>
        <Tabs defaultActiveKey={1} id="rx-example">
         <Tab eventKey={1} title="Edit Regexp">
             {this.customEditor(true)}
         </Tab>
         <Tab eventKey={2} title="Multiple Regexp Pattern">
          {this.stateSsnCcPhoneEmail(rxStatePhoneCcSsn)}
         </Tab>
         <Tab eventKey={3} title="Multiple Regexp Pattern">
         
          <div className="form-field">
            <p  className="small-text form-field">RegEx: {hwc_phone.toString()}</p>
          </div>
          <div className="form-field">
            <label htmlFor="hwc_phone">Home/Work/Cell:</label>
            <RxInput mask={hwc_phone} name="hwc_phone" id="hwc_phone" size="40" popover="yes"
                         placeholder="{Work: , Home:, Cell:} +<country> (ddd)-ddd-dddd Ext: dd" 
                         value={this.state.various} onChange={this._onChange} selection={{start:0,stop:0}} />
            <div  style={{marginBotton: "0px", marginLeft: "100px", display: "block"}}> 
            Click Here: <a href={`https://regexper.com/#${this.rxString(hwc_phone)}`} target="rxdiagram" tabindex="3">
                                   <span className="small-text">
                                      Show RegEx Diagram(https://regexper.com)<img src="railroad.png" />
                                   </span>
                              </a>
                              <p>&nbsp;</p>
            </div>                              
          </div>
          </Tab>
          <Tab eventKey={4} title="Another Example">
         
          <div className="form-field">
            <p  className="small-text form-field">RegEx: {rz2.toString()}</p>
          </div>
          <div className="form-field">
            <label htmlFor="tester">Tester:</label>
            <RxInput mask={rz2} name="mail" id="tester" size="40" value={this.state.tester} selection={{start:0,stop:0}} onChange={this._onChange}/>
          </div>
          </Tab>
          <Tab eventKey={5} title="Alt Drop Down">
            <p> This is to Demonstrate an alternative to drop-down list</p>         
            <div className="form-field">
              <p  className="small-text form-field">RegEx: {yesno.toString()}</p>
            </div>
            <div className="form-field">
              <label htmlFor="yesno">Yes No:</label>
              <RxInput mask={yesno} name="yesno" id="yesno" size="40" value={this.state.yesno} popover="yes" selection={{start:0,stop:0}}  onChange={this._onChange}/>
            </div>
          </Tab>
          <Tab eventKey={6} title="Another example">
         
           <div className="form-field">
            <p  className="small-text form-field">RegEx: {color.toString()}</p>
          </div>
          <div className="form-field">
            <label htmlFor="color">Color:</label>
            <RxInput mask={color} name="color" id="color" size="40" value={this.state.color} popover="yes" selection={{start:0,stop:0}}  onChange={this._onChange}/>
          </div>
          </Tab>
          </Tabs>
          <div className="container">
                <div className="jumbotron">
                  <h2>RxInput Tutorial</h2> 
                  <p>Very powerful input validation and input behavior React component</p> 
                </div>
          </div>
        </div>
      </div>  
      )
  }
});

//console.log("I am here");
render(<App name="test"/>, document.querySelector('#demo'));