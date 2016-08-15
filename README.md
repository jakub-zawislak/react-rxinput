# react-rxinput

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]


[build-badge]: https://img.shields.io/travis/user/repo/master.svg?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.svg?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
# react-rxinput

## Summary

A flexible input validation widget that validates you input as you type. You use a regular expression to validate the input. 

[Demo](https://nurulc.github.io/)


## Highlights:

- Easy to use (__my opinin__)
- Use regular expression to define 'masked input' [react-maskinput](project inspired by https://github.com/insin/react-maskinput)
- RegExp matching/validation as you type
- Auto complete
- Matching suggestions
- An alternative for [react-maskinput]() 
- Handles very large regular expressions
- Pretty extensive test scripts

### Dependencies
- [incr-regex-package](https://github.com/nurulc/incr-regex-package)
- [react-bootstrap](https://react-bootstrap.github.io/) (Planning to remove this dependency)
- [React](https://facebook.github.io/react/)


### Demo notes:

- Has some pre-canned regular expressions
- You can try your own regular expression
- Note: Does not error check your regular expression (bare with me I will fix that)

[Please try out the demo](https://nurulc.github.io/)

## Screenshot

![rxinput demo](https://raw.githubusercontent.com/nurulc/react-rxinput/master/demo-screensho.png)

## Introduction

JavaScript regular expression is great and really fast, and it would be pointless to try to create a RegExp alternative that does the same thing. But having said that, this project is a specific use case  - validating input as you type using RegExp. 

I needed a regular expression matcher that would work incrementally; By that I mean that it should let you know if a string matches the beginning part of a regular expression (good so far, but needs more input scenario). I tried to figure out if that was possible using JavaScript's regular expression matcher. I could not figure out any easy to do that. I decided that I would write an incremental regular expression matcher. I was much more difficult that I expected. But I have build an npm package that does perform incremental regular expression matching.

- npm [incr-regex-package](https://github.com/nurulc/incr-regex-package)

The widget was inspired by another github project (https://github.com/insin/react-maskinput) that provides mask input for things like phone number, credit card number, date and so on. Although the capability is very nice, but it was limited. THe input mask you could enter has very little flexibility, wile a regular expression has all the flexibility you could need (even regexp has its limitations, cannot match recursive patterns, but that is for another day).

While building the widget it became obvious that it could be a swiss army knife and provide the following (so I implemented them):

- Auto completion
- Dropdown list alternative
- Radio button alternative
- Mask input replacement
- As you type validation
- Force upper case
- Limit the character you can enter
- Only allow valid input as you type

### Limitations

- Does not support look back
- Does not fupport look forward
- Is not a replacement JavaScript RegExp
- Not sure of all RegExp edge cases are handles
- Assome all reagep are anchored to the beging of input (meaning the regexp matching always starts at the begining
- Currently only works as React component, requiring **bootstrap 3** and also **react-boorstrap**
- Working on lifting the limitation and offering jQuery plugin (i have never built a jquery plugin, so it might take a little time). Further I would like to offer a version that does not depend on any external js library.

 
## Known bugs
- Rare: but deleting input text in the middle of the input box (very complex regular expressions) sometimes misbehaves. The algorithm for handling this is rather complex. I am trying to figure out how to imp-lement the capability more elegantly.

### Installation

  npm install react-rxinput --save


git:

```
    git clone https://github.com/nurulc/react-rxinput.git
    cd react-rxinput
    npm install
    npm start
```


The commands above will start the demo application
point youy browser at http://localhost:3000


How to use the component:

Use it where you might have used ```<input```  element, take all the properties of a regular input element

**RxInput** specific properties:

- mask - **regular expression**
- value - _value to set_
- selection - selection
- popover - _Yes| No_ whether to show hints or nor
- onChange - function to execute when a chnage happens

```
const App = React.createClass({
  getInitialState() {
    return {
      color: "",
    }
  },

  _onChange(e) {
    this.setState({color: e.target.value})
  },




  render() {
    // Some regular expression you could try
    // const email = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+/;
    // const phone = /(\\+\\d{1,3} )?\\(\\d{3}\\)-\\d{3}-\\d{4}( Ext: \\d+)?/;
    // const color = /Red|Gr(een|ay)|Blue|Yellow|O(range|live)/;
    
    // A rather complex regular expression (please feel free to user your own)
    const color = /Color: (Red|Gr(een|ay)|Blue|Yellow|O(range|live))|Email: [a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+|(Phone: (\\+\\d{1,3} )?\\(\\d{3}\\)-\\d{3}-\\d{4}( Ext: \\d+)?)/;
  
    return (
      <div className="App">
        <div>
          <div className="form-field">
            <label htmlFor="color">Color:</label>
            <RxInput name="color" id="color" size="40" 
                     mask={color} 
                     value={this.state.color} 
                     popover="yes" 
                     placeholder="Color: <scome colors>  |  Email: <email> | Phone: <phone number>"
                     onChange={this._onChange}/>
          </div>
        </div>
      </div>  
      )
  }
});


render(<App name="test"/>, document.querySelector('#demo'));
```


**_Documentation to come_**
