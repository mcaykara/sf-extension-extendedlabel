const extend = require('js-base/core/extend');
const Label = require('sf-core/ui/label');
const Invocation    = require('sf-core/util').Invocation;

const NSUnderlineStyle = {
    None : 0,
    Single : 1,
    Thick : 2,
    Double : 9
}
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
                setText(value);
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
            },
            enumerable: true,
            configurable: true
        });
        
        self.nativeObject.didTapLinkWithURL = function(e){
            if (typeof self.onClick == 'function') {
                self.onClick(e.URL);
            }
        };
        
        function setText(value){
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
                        "NSKern" : self.letterSpacing
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
        };
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ExtendedLabel;