# Extendedlabel Extension from Smartface
[![Twitter: @Smartface_io](https://img.shields.io/badge/contact-@Smartface_io-blue.svg?style=flat)](https://twitter.com/smartface_io)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/smartface/sf-extension-extendedlabel/master/LICENSE)

## Installation
Smartface Extendedlabel can be installed via npm easily from our public npm repository. The installation is pretty easy via Smartface Cloud IDE.

- Open scripts/package.json file inside your workspace.
- Add Extendedlabel extension dependency as:`"sf-extension-extendedlabel": "^1.0.0"`
- Run command `npm install` under the folder `scripts`

## How to use

### Initialize
```javascript
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const Font = require('sf-core/ui/font');

var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                this.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });
        
     const ExtendedLabel = require('sf-extension-extendedlabel');
     const AttributedString = require('sf-extension-extendedlabel/attributedstring');
     const System = require('sf-core/device/system');
 
     var extendedlabel = new ExtendedLabel({
         flexGrow: 1
     });

     if (System.OS === "iOS") {
         extendedlabel.letterSpacing = 5;
     }else{
         extendedlabel.letterSpacing = 0.3;
     }
      
     extendedlabel.onClick = function(string){
         console.log("String " + string);
     };
     
     var attributeString = new AttributedString();
     attributeString.string = "First ";
     attributeString.foregroundColor = Color.GREEN;
     
     var attributeString2 = new AttributedString();
     attributeString2.string = "Second";
     attributeString2.link = "Second Link ";
     
     var attributeString3 = new AttributedString();
     attributeString3.string = " Third";
     attributeString3.link = "Third Link";
     attributeString3.backgroundColor = Color.RED;
     attributeString3.underline = true;
     attributeString3.font = Font.create("Times New Roman",30,Font.NORMAL);
     attributeString3.ios.underlineColor = Color.YELLOW;
     
     extendedlabel.text = [attributeString,attributeString2,attributeString3];

     this.layout.addChild(extendedlabel);
    
    }
);
module.exports = Page1;
```
### Create From Existing Label
```javascript
var extendedlabel = ExtendedLabel.createFromLabel(label);

var attributeString = new AttributedString();
attributeString.string = "Text";
attributeString.link = "Text Link";
attributeString.backgroundColor = Color.RED;
attributeString.underline = true;
attributeString.font = Font.create("Times New Roman",30,Font.NORMAL);
attributeString.ios.underlineColor = Color.YELLOW;

extendedlabel.text = [attributeString];
```
## License
This project is licensed under the terms of the MIT license. See the [LICENSE](https://raw.githubusercontent.com/smartface/sf-extension-extendedlabel/master/LICENSE) file. Within the scope of this license, all modifications to the source code, regardless of the fact that it is used commercially or not, shall be committed as a contribution back to this repository.
