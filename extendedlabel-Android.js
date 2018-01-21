/*globals requireClass */
const extend = require('js-base/core/extend');
const Label = require('sf-core/ui/label');
const NativeBuild = requireClass("android.os.Build");
const NativeColor = requireClass("android.graphics.Color");
const NativeLinkMovementMethod = requireClass("android.text.method.LinkMovementMethod");
const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");
const NativeBackgroundColorSpan = requireClass("android.text.style.BackgroundColorSpan");
const NativeClickableSpan = requireClass("android.text.style.ClickableSpan");
const NativeForegroundColorSpan = requireClass("android.text.style.ForegroundColorSpan");
const NativeAbsoluteSizeSpan = requireClass("android.text.style.AbsoluteSizeSpan");
const NativeUnderlineSpan = requireClass("android.text.style.UnderlineSpan");
const NativeTypefaceSpan = requireClass("android.text.style.TypefaceSpan");
// const NativeScaleXSpan = requireClass("android.text.style.ScaleXSpan");
const NativeTypeface = requireClass("android.graphics.Typeface");
var SPAN_EXCLUSIVE_EXCLUSIVE = 33;
const ExtendedLabel = extend(Label)(
    function(_super, params) {
        var self = this;
        _super(this);
        self.myBuilder = new NativeSpannableStringBuilder();
        // Handling iOS-specific properties
        self.ios = {};
        var _spanArray = [];
        Object.defineProperties(self, {
            'text': {
                get: function() {
                    return _spanArray;
                },
                set: function(values) {
                    _spanArray = values;
                    self.myBuilder.clear();
                    for (var i = 0; i < _spanArray.length; i++) {
                        createSpannyText(_spanArray[i]);
                    }
                    self.nativeObject.setText(self.myBuilder);
                    self.nativeObject.setSingleLine(false);
                    self.nativeObject.setMovementMethod(NativeLinkMovementMethod.getInstance());
                    self.nativeObject.setHighlightColor(NativeColor.TRANSPARENT);
                },
                enumerable: true,
                configurable: true
            },
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
                if(NativeBuild.VERSION.SDK_INT >= 21) {                
                    self.nativeObject.setLetterSpacing(value);
                    
                }
            },
            enumerable: true,
            configurable: true
        });
        function createSpannyText(value) {
            self.myBuilder.append(value.string);
            var start = self.myBuilder.length() - value.string.length;
            var end = self.myBuilder.length();
            // Link 
            // --------------------------------------------------------------------------------
            if (value.link !== undefined) {
                var clickableSpanOverrideMethods = {
                    onClick: function(view) {
                        self.onClick(value.link);
                    },
                    updateDrawState: function(ds) {
                        ds.setUnderlineText(false);
                    }
                };
                var clickSpan = NativeClickableSpan.extend("NativeClickableSpan", clickableSpanOverrideMethods, null);
                self.myBuilder.setSpan(clickSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
            }
            // Foreground Color 
            // --------------------------------------------------------------------------------
            self.myBuilder.setSpan(new NativeForegroundColorSpan(value.foregroundColor.nativeObject), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
            // Background Color 
            // --------------------------------------------------------------------------------
            self.myBuilder.setSpan(new NativeBackgroundColorSpan(value.backgroundColor.nativeObject), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
            // Underline 
            // --------------------------------------------------------------------------------
            if (value.underline === true) {
                self.myBuilder.setSpan(new NativeUnderlineSpan(), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
            }
            // Font
            // --------------------------------------------------------------------------------
            var newType = value.font.nativeObject;
            var typeSpanOverrideMethods = {
                updateDrawState: function(ds) {
                    applyCustomTypeFace(ds, newType);
                },
                updateMeasureState: function(paint) {
                    applyCustomTypeFace(paint, newType);
                }
            };
            var typeSpan = NativeTypefaceSpan.extend("NativeTypefaceSpan", typeSpanOverrideMethods, ["SF"]);
            self.myBuilder.setSpan(typeSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
            // Size
            // --------------------------------------------------------------------------------
            self.myBuilder.setSpan(new NativeAbsoluteSizeSpan(value.font.size, true), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        function applyCustomTypeFace(paint, tf) {
            var oldStyle;
            var old = paint.getTypeface();
            if (old == null) {
                oldStyle = 0;
            }
            else {
                oldStyle = old.getStyle();
            }
            var fake = oldStyle & ~tf.getStyle();
            if ((fake & NativeTypeface.BOLD) != 0) {
                paint.setFakeBoldText(true);
            }
            if ((fake & NativeTypeface.ITALIC) != 0) {
                paint.setTextSkewX(-0.25);
            }
            paint.setTypeface(tf);
        }
        if (params) {
            for (var param in params) {
                self[param] = params[param];
            }
        }
    }
);

ExtendedLabel.createFromLabel = function(value) {
    if (value instanceof Label) {
        var result = new ExtendedLabel();
        result.nativeObject = value.nativeObject;
        return result;
    }
    else {
        throw new Error("Given parameter should be an instance of Label.");
    }
};

module.exports = ExtendedLabel;
