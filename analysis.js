/*globals Color */

/**
 * @class UI.ExtendedLabel
 * @extends UI.Label
 * ExtendedLabel is a view attributedtext on the screen.
 *
 *      @example
 *      const ExtendedLabel = require('sf-extension-extendedlabel');
 *      const AttributedString = require('sf-extension-extendedlabel/attributedstring');
 *      const System = require('sf-core/device/system');
 *  
 *      var extendedlabel = new ExtendedLabel({
 *          flexGrow: 1
 *      }); 
 * 
 *      if (System.OS === "iOS") {
 *          extendedlabel.letterSpacing = 5;
 *      }else{
 *          extendedlabel.letterSpacing = 0.3;
 *      }
 *       
 *      extendedlabel.onClick = function(string){
 *          console.log("String " + string);
 *      };
 *      
 *      var attributeString = new AttributedString();
 *      attributeString.string = "First ";
 *      attributeString.foregroundColor = Color.GREEN;
 *      
 *      var attributeString2 = new AttributedString();
 *      attributeString2.string = "Second";
 *      attributeString2.link = "Second Link ";
 *      
 *      var attributeString3 = new AttributedString();
 *      attributeString3.string = " Third";
 *      attributeString3.link = "Third Link";
 *      attributeString3.backgroundColor = Color.RED;
 *      attributeString3.underline = true;
 *      attributeString3.font = Font.create("Times New Roman",30,Font.NORMAL);
 *      attributeString3.ios.underlineColor = Color.YELLOW;
 *      
 *      extendedlabel.text = [attributeString,attributeString2,attributeString3];
 *       
 */
function ExtendedLabel(params) {}

/**
 * Gets/sets text on ExtendedLabel.
 *
 * @property {Array} [text = []]
 * @android
 * @ios
 */
ExtendedLabel.prototype.text = "";

/**
 * This event is called when user click link string.
 *
 *     @example
 *     myTextBox.onClick: function(e) {
 *         console.log(e.string);
 *     };
 *
 * @param {String} e.string
 * @event onClick
 * @android
 * @ios
 */
ExtendedLabel.prototype.onClick = function(e) {};

/**
 * Gets/sets letterSpacing on ExtendedLabel.
 * 
 * For iOS,
 * This value specifies the number of points by which to adjust kern-pair characters. 
 * Kerning prevents unwanted space from occurring between specific characters and depends on the font. 
 * The value 0 means kerning is disabled. The default value for this attribute is 0.
 * 
 * For Android,
 * Sets text letterSpacing in em units. Typical values for slight expansion will be around 0.05. Negative values tighten text.
 * The em is simply the font size. In an element with a 2in font, 1em thus means 2in. 
 * Expressing sizes, such as margins and paddings, in em means they are related to the font size, and if the user has a big font (e.g., on a big screen) or a small font (e.g., on a handheld device), the sizes will be in proportion. 
 * Declarations such as 'text-indent: 1.5em' and 'margin: 1em' are extremely common in CSS.
 * 
 * @property {Number} [letterSpacing = 0]
 * @android
 * @ios
 */
ExtendedLabel.prototype.letterSpacing = 0;

/**
 * @method createFromLabel
 * @android
 * @ios
 * Creates an extendedLabel instance with exist label.
 *
 *     @example
 *     const ExtendedLabel = require('sf-extension-extendedlabel');
 *     var extendedlabel = ExtendedLabel.createFromLabel(label);
 *
 * @param {UI.Label} Label instance
 * @return {ExtendedLabel} An ExtendedLabel instance.
 *
 * @static
 */
ExtendedLabel.createFromLabel = function(label) {};

/**
 * @class AttributedString
 *
 *      @example
 *      const AttributedString = require('sf-extension-extendedlabel/attributedstring');
 *      var attributeString = new AttributedString();
 *      attributeString.string = " Third";
 *      attributeString.link = "Third Link";
 *      attributeString.backgroundColor = Color.RED;
 *      attributeString.underline = true;
 *      attributeString.font = Font.create("Times New Roman",30,Font.NORMAL);
 *      attributeString.ios.underlineColor = Color.YELLOW;
 */
function AttributedString(params) {}

/**
 * Gets/sets string on AttributedString.
 *
 * @property {String} [string = ""]
 * @android
 * @ios
 */
AttributedString.prototype.string = "";

/**
 * Gets/sets font on AttributedString.
 *
 * @property {UI.Font} [font = null]
 * @android
 * @ios
 */
AttributedString.prototype.font = null;

/**
 * Gets/sets foregroundColor on AttributedString.
 *
 * @property {UI.Color} foregroundColor
 * @android
 * @ios
 */
AttributedString.prototype.foregroundColor = Color.BLACK;

/**
 * Gets/sets underline on AttributedString.
 *
 * @property {boolean} [underline = false]
 * @android
 * @ios
 */
AttributedString.prototype.underline = false;

/**
 * Gets/sets underlineColor on AttributedString.
 *
 * @property {UI.Color} underlineColor
 * @ios
 */
AttributedString.prototype.underlineColor = Color.WHITE;


/**
 * Gets/sets backgroundColor on AttributedString.
 *
 * @property {UI.Color} backgroundColor
 * @android
 * @ios
 */
AttributedString.prototype.backgroundColor = Color.WHITE;

/**
 * Gets/sets link on AttributedString. If you want handle label click method, must set link string.
 *
 * @property {String} link
 * @android
 * @ios
 */
AttributedString.prototype.link = undefined;

module.exports = {
    ExtendedLabel: ExtendedLabel,
    AttributedString: AttributedString
};
