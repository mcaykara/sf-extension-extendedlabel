/* globals __SF_ExtendedTextView */
const extend = require('js-base/core/extend');
const Label = require('sf-core/ui/label');
const Invocation    = require('sf-core/util').Invocation;
const AttributedString = require('sf-extension-extendedlabel/attributedstring');

const NSUnderlineStyle = {
    None : 0,
    Single : 1,
    Thick : 2,
    Double : 9
};

const ExtendedLabel = extend(Label)(
    function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new __SF_ExtendedTextView();
        }
        
        _super(this);
        
        var _text = [];
        Object.defineProperty(self, 'text', {
            get: function() {
                return _text;
            },
            set: function(value) {
                _text = value;
                if (Array.isArray(value)) {
                    setText(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        
        var _onClick = undefined;
        Object.defineProperty(self, 'onClick', {
            get: function() {
                return _onClick;
            },
            set: function(value) {
                _onClick = value;
            },
            enumerable: true,
            configurable: true
        });
        
        var _letterSpacing = 0;
        Object.defineProperty(self, 'letterSpacing', {
            get: function() {
                return _letterSpacing;
            },
            set: function(value) {
                _letterSpacing = value;
                self.text = self.text;
            },
            enumerable: true,
            configurable: true
        });
        
        self.nativeObject.didTapLinkWithURL = function(e){
            if (typeof self.onClick == 'function') {
                self.onClick(e.URL);
            }
        };
        
        var _lineSpacing = 0;
        Object.defineProperty(self, 'lineSpacing', {
            get: function() {
                return _lineSpacing;
            },
            set: function(value) {
                _lineSpacing = value;
                self.text = self.text;
            },
            enumerable: true,
            configurable: true
        });
        
        function setText(value){
            var paragraphAlloc = Invocation.invokeClassMethod("NSMutableParagraphStyle","alloc",[],"id");
            var paragraphStyle = Invocation.invokeInstanceMethod(paragraphAlloc,"init",[],"NSObject");
            var argLineSpacing = new Invocation.Argument({
                type:"CGFloat",
                value: self.lineSpacing
            });
            Invocation.invokeInstanceMethod(paragraphStyle,"setLineSpacing:",[argLineSpacing]);

            var alloc = Invocation.invokeClassMethod("NSMutableAttributedString","alloc",[],"id");
            var mutableString = Invocation.invokeInstanceMethod(alloc,"init",[],"NSObject");

            for (var i in value) {
                var attributeString = value[i];
                
                var allocNSAttributedString = Invocation.invokeClassMethod("NSAttributedString","alloc",[],"id");
        
                var argString = new Invocation.Argument({
                    type:"NSString",
                    value: attributeString.string
                });
                    
                var argAttributes = new Invocation.Argument({
                    type:"id",
                    value: {
                        "NSColor" : attributeString.foregroundColor.nativeObject,
                        "NSFont" : attributeString.font,
                        "NSUnderline" : attributeString.underline ? NSUnderlineStyle.Single : NSUnderlineStyle.None,
                        "NSLink": attributeString.link,
                        "NSBackgroundColor" : attributeString.backgroundColor.nativeObject,
                        "NSUnderlineColor" : attributeString.ios.underlineColor.nativeObject,
                        "NSKern" : self.letterSpacing,
                        "NSParagraphStyle" : paragraphStyle
                    }
                });
                var nativeAttributeString = Invocation.invokeInstanceMethod(allocNSAttributedString,"initWithString:attributes:",[argString,argAttributes],"NSObject");
                
                var argAppend = new Invocation.Argument({
                        type:"NSObject",
                        value: nativeAttributeString
                    });
                Invocation.invokeInstanceMethod(mutableString,"appendAttributedString:",[argAppend]);
            }

            var argAttributeString = new Invocation.Argument({
                type:"NSObject",
                value: mutableString
            });
            
            Invocation.invokeInstanceMethod(self.nativeObject,"setAttributedText:",[argAttributeString]);
            self.textAlignment = self.textAlignment;
        }
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

ExtendedLabel.createFromLabel = function(value){
    var extendedlabel = new ExtendedLabel();
    for(var k in value) {
        if (k === "nativeObject" || k === "htmlText" || k === "text") {
            continue;
        }else if (k === "ios"){
            for(var j in value[k]) {
                extendedlabel[k][j]=value[k][j];
            }
            continue;
        }
        extendedlabel[k]=value[k];
    }
    
    var attributeString = new AttributedString();
    attributeString.string = value.text;
    extendedlabel.text = [attributeString];
    
    extendedlabel.top = value.nativeObject.yoga.getYGValueForKey("top");
    extendedlabel.left = value.nativeObject.yoga.getYGValueForKey("left");
    extendedlabel.width = value.nativeObject.yoga.getYGValueForKey("width");
    extendedlabel.height = value.nativeObject.yoga.getYGValueForKey("height");
    
    if (value.nativeObject.superview) {
        var argInsertSubview = new Invocation.Argument({
            type:"NSObject",
            value: extendedlabel.nativeObject
        });
        var argBelowSubview = new Invocation.Argument({
            type:"NSObject",
            value: value.nativeObject
        });
        Invocation.invokeInstanceMethod(value.nativeObject.superview,"insertSubview:belowSubview:",[argInsertSubview,argBelowSubview]);
        
        value.nativeObject.removeFromSuperview();
    }
    
    return extendedlabel;
};

module.exports = ExtendedLabel;