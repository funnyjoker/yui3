if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["scrollview-scrollbars"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "scrollview-scrollbars",
    code: []
};
_yuitest_coverage["scrollview-scrollbars"].code=["YUI.add('scrollview-scrollbars', function (Y, NAME) {","","/**"," * Provides a plugin, which adds support for a scroll indicator to ScrollView instances"," *"," * @module scrollview"," * @submodule scrollview-scrollbars"," */","","var getClassName = Y.ClassNameManager.getClassName,","    _classNames,","","    Transition = Y.Transition,","    NATIVE_TRANSITIONS = Transition.useNative,    ","    SCROLLBAR = 'scrollbar',","    SCROLLVIEW = 'scrollview',","","    VERTICAL_NODE = \"verticalNode\",","    HORIZONTAL_NODE = \"horizontalNode\",","","    CHILD_CACHE = \"childCache\",","","    TOP = \"top\",","    LEFT = \"left\",","    WIDTH = \"width\",","    HEIGHT = \"height\",","    SCROLL_WIDTH = \"scrollWidth\",","    SCROLL_HEIGHT = \"scrollHeight\",","","    HORIZ_CACHE = \"_sbh\",","    VERT_CACHE = \"_sbv\",","","    TRANSITION_PROPERTY = Transition._VENDOR_PREFIX + \"TransitionProperty\",","    TRANSFORM = \"transform\",","","    TRANSLATE_X = \"translateX(\",","    TRANSLATE_Y = \"translateY(\",","","    SCALE_X = \"scaleX(\",","    SCALE_Y = \"scaleY(\",","    ","    SCROLL_X = \"scrollX\",","    SCROLL_Y = \"scrollY\",","","    PX = \"px\",","    CLOSE = \")\",","    PX_CLOSE = PX + CLOSE;","","/**"," * ScrollView plugin that adds scroll indicators to ScrollView instances"," *"," * @class ScrollViewScrollbars"," * @namespace Plugin"," * @extends Plugin.Base"," * @constructor"," */","function ScrollbarsPlugin() {","    ScrollbarsPlugin.superclass.constructor.apply(this, arguments);","}","","ScrollbarsPlugin.CLASS_NAMES = {","    showing: getClassName(SCROLLVIEW, SCROLLBAR, 'showing'),","    scrollbar: getClassName(SCROLLVIEW, SCROLLBAR),","    scrollbarV: getClassName(SCROLLVIEW, SCROLLBAR, 'vert'),","    scrollbarH: getClassName(SCROLLVIEW, SCROLLBAR, 'horiz'),","    scrollbarVB: getClassName(SCROLLVIEW, SCROLLBAR, 'vert', 'basic'),","    scrollbarHB: getClassName(SCROLLVIEW, SCROLLBAR, 'horiz', 'basic'),","    child: getClassName(SCROLLVIEW, 'child'),","    first: getClassName(SCROLLVIEW, 'first'),","    middle: getClassName(SCROLLVIEW, 'middle'),","    last: getClassName(SCROLLVIEW, 'last')","};","","_classNames = ScrollbarsPlugin.CLASS_NAMES;","","/**"," * The identity of the plugin"," *"," * @property NAME"," * @type String"," * @default 'pluginScrollViewScrollbars'"," * @static"," */","ScrollbarsPlugin.NAME = 'pluginScrollViewScrollbars';","    ","/**"," * The namespace on which the plugin will reside."," *"," * @property NS"," * @type String"," * @default 'scrollbars'"," * @static"," */","ScrollbarsPlugin.NS = 'scrollbars';","","/**"," * HTML template for the scrollbar"," *"," * @property SCROLLBAR_TEMPLATE"," * @type Object"," * @static"," */","ScrollbarsPlugin.SCROLLBAR_TEMPLATE = [","    '<div>',","    '<span class=\"' + _classNames.child + ' ' + _classNames.first + '\"></span>',","    '<span class=\"' + _classNames.child + ' ' + _classNames.middle + '\"></span>',","    '<span class=\"' + _classNames.child + ' ' + _classNames.last + '\"></span>',","    '</div>'","].join('');","","/**"," * The default attribute configuration for the plugin"," *"," * @property ATTRS"," * @type Object"," * @static"," */","ScrollbarsPlugin.ATTRS = {","    ","    /**","     * Vertical scrollbar node","     *","     * @attribute verticalNode","     * @type Y.Node","     */","    verticalNode: {","        setter: '_setNode',","        valueFn: '_defaultNode'","    },","","    /**","     * Horizontal scrollbar node","     *","     * @attribute horizontalNode","     * @type Y.Node","     */","    horizontalNode: {","        setter: '_setNode',","        valueFn: '_defaultNode'","    }","};","","Y.namespace(\"Plugin\").ScrollViewScrollbars = Y.extend(ScrollbarsPlugin, Y.Plugin.Base, {","","    /**","     * Designated initializer","     *","     * @method initializer","     */    ","    initializer: function() {","        this._host = this.get(\"host\");","","        this.afterHostEvent('scrollEnd', this._hostScrollEnd);","        this.afterHostMethod('scrollTo', this._update);","        this.afterHostMethod('_uiDimensionsChange', this._hostDimensionsChange);","    },","","    /**","     * Set up the DOM nodes for the scrollbars. This method is invoked whenever the","     * host's _uiDimensionsChange fires, giving us the opportunity to remove un-needed","     * scrollbars, as well as add one if necessary.","     *","     * @method _hostDimensionsChange","     * @protected","     */    ","    _hostDimensionsChange: function() {","        var host = this._host,","            axis = host.axis;","","        this._renderBar(this.get(VERTICAL_NODE), axis.y, 'vert');","        this._renderBar(this.get(HORIZONTAL_NODE), axis.x, 'horiz');","","        this._update();","","        Y.later(500, this, 'flash', true);","    },","","    /**","     * Handler for the scrollEnd event fired by the host. Default implementation flashes the scrollbar","     *","     * @method _hostScrollEnd","     * @param {Event.Facade} e The event facade.","     * @protected","     */","    _hostScrollEnd : function(e) {","        if (!this._host._flicking) {","            this.flash();","        }","    },","","    /**","     * Adds or removes a scrollbar node from the document.","     * ","     * @method _renderBar","     * @private","     * @param {Node} bar The scrollbar node","     * @param {boolean} add true, to add the node, false to remove it","     */","    _renderBar: function(bar, add) {","        var inDoc = bar.inDoc(),","            bb = this._host._bb,","            className = bar.getData(\"isHoriz\") ? _classNames.scrollbarHB : _classNames.scrollbarVB;","","        if (add && !inDoc) {","            bb.append(bar);","            bar.toggleClass(className, this._basic);","            this._setChildCache(bar);","        } else if(!add && inDoc) {","            bar.remove();","            this._clearChildCache(bar);","        }","    },","","    /**","     * Caches scrollbar child element information,","     * to optimize _update implementation ","     * ","     * @method _setChildCache","     * @private","     * @param {Node} node","     */","    _setChildCache : function(node) {","        var c = node.get(\"children\"),","            fc = c.item(0),","            mc = c.item(1),","            lc = c.item(2),","            size = node.getData(\"isHoriz\") ? \"offsetWidth\" : \"offsetHeight\";","","        node.setStyle(TRANSITION_PROPERTY, TRANSFORM);","        mc.setStyle(TRANSITION_PROPERTY, TRANSFORM);","        lc.setStyle(TRANSITION_PROPERTY, TRANSFORM);","","        node.setData(CHILD_CACHE, {","            fc : fc,","            lc : lc,","            mc : mc,","            fcSize : fc && fc.get(size),","            lcSize : lc && lc.get(size)","        });","    },","","    /**","     * Clears child cache","     * ","     * @method _clearChildCache","     * @private","     * @param {Node} node","     */","    _clearChildCache : function(node) {","        node.clearData(CHILD_CACHE);","    },","","    /**","     * Utility method, to move/resize either vertical or horizontal scrollbars","     *","     * @method _updateBar","     * @private","     *","     * @param {Node} scrollbar The scrollbar node.","     * @param {Number} current The current scroll position.","     * @param {Number} duration The transition duration.","     * @param {boolean} horiz true if horizontal, false if vertical.","     */","    _updateBar : function(scrollbar, current, duration, horiz) {","","        var host = this._host,","            basic = this._basic,","            cb = host._cb,","","            scrollbarSize = 0,","            scrollbarPos = 1,","","            childCache = scrollbar.getData(CHILD_CACHE),","            lastChild = childCache.lc,","            middleChild = childCache.mc,","            firstChildSize = childCache.fcSize,","            lastChildSize = childCache.lcSize,","            middleChildSize,","            lastChildPosition,","","            transition,","            translate,","            scale,","","            dim,","            dimOffset,","            dimCache,","            widgetSize,","            contentSize;","","        if (horiz) {","            dim = WIDTH;","            dimOffset = LEFT;","            dimCache = HORIZ_CACHE;","            widgetSize = host.get('width');","            contentSize = host._scrollWidth;","            translate = TRANSLATE_X;","            scale = SCALE_X;","            current = (current !== undefined) ? current : host.get(SCROLL_X);","        } else {","            dim = HEIGHT;","            dimOffset = TOP;","            dimCache = VERT_CACHE;","            widgetSize = host.get('height');","            contentSize = host._scrollHeight;","            translate = TRANSLATE_Y;","            scale = SCALE_Y;","            current = (current !== undefined) ? current : host.get(SCROLL_Y);","        }","","        scrollbarSize = Math.floor(widgetSize * (widgetSize/contentSize));","        scrollbarPos = Math.floor((current/(contentSize - widgetSize)) * (widgetSize - scrollbarSize));","","        if (scrollbarSize > widgetSize) {","            scrollbarSize = 1;","        }","","        if (scrollbarPos > (widgetSize - scrollbarSize)) {","            scrollbarSize = scrollbarSize - (scrollbarPos - (widgetSize - scrollbarSize));","        } else if (scrollbarPos < 0) {","            scrollbarSize = scrollbarPos + scrollbarSize;","            scrollbarPos = 0;","        }","","        middleChildSize = (scrollbarSize - (firstChildSize + lastChildSize));","","        if (middleChildSize < 0) {","            middleChildSize = 0;","        }","","        if (middleChildSize === 0 && scrollbarPos !== 0) {","            scrollbarPos = widgetSize - (firstChildSize + lastChildSize) - 1;","        }","","        if (duration !== 0) {","            // Position Scrollbar","            transition = {","                duration : duration","            };","","            if (NATIVE_TRANSITIONS) {","                transition.transform = translate + scrollbarPos + PX_CLOSE;","            } else {","                transition[dimOffset] = scrollbarPos + PX;","            }","","            scrollbar.transition(transition);","","        } else {","            if (NATIVE_TRANSITIONS) {","                scrollbar.setStyle(TRANSFORM, translate + scrollbarPos + PX_CLOSE);","            } else {","                scrollbar.setStyle(dimOffset, scrollbarPos + PX);","            }","        }","","        // Resize Scrollbar Middle Child","        if (this[dimCache] !== middleChildSize) {","            this[dimCache] = middleChildSize;","","            if (middleChildSize > 0) {","","                if (duration !== 0) {","                    transition = {","                        duration : duration             ","                    };","","                    if(NATIVE_TRANSITIONS) {","                        transition.transform = scale + middleChildSize + CLOSE;","                    } else {","                        transition[dim] = middleChildSize + PX;","                    }","","                    middleChild.transition(transition);","                } else {","                    if (NATIVE_TRANSITIONS) {","                        middleChild.setStyle(TRANSFORM, scale + middleChildSize + CLOSE);","                    } else {","                        middleChild.setStyle(dim, middleChildSize + PX);","                    }","                }","    ","                // Position Last Child","                if (!horiz || !basic) {","","                    lastChildPosition = scrollbarSize - lastChildSize;","    ","                    if(duration !== 0) { ","                        transition = {","                            duration : duration","                        };","                ","                        if (NATIVE_TRANSITIONS) {","                            transition.transform = translate + lastChildPosition + PX_CLOSE; ","                        } else {","                            transition[dimOffset] = lastChildPosition; ","                        }","","                        lastChild.transition(transition);","                    } else {","                        if (NATIVE_TRANSITIONS) {","                            lastChild.setStyle(TRANSFORM, translate + lastChildPosition + PX_CLOSE); ","                        } else {","                            lastChild.setStyle(dimOffset, lastChildPosition + PX); ","                        }","                    }","                }","            }","        }","    },","","    /**","     * AOP method, invoked after the host's _uiScrollTo method, ","     * to position and resize the scroll bars","     *","     * @method _update","     * @param x {Number} The current scrollX value","     * @param y {Number} The current scrollY value","     * @param duration {Number} Number of ms of animation (optional) - used when snapping to bounds ","     * @param easing {String} Optional easing equation to use during the animation, if duration is set","     * @protected","     */","    _update: function(x, y, duration, easing) {","","        var vNode = this.get(VERTICAL_NODE),","            hNode = this.get(HORIZONTAL_NODE),","            host = this._host,","            axis = host.axis;","","        duration = (duration || 0)/1000;","","        if (!this._showing) {","            this.show();","        }","","        if (axis.y && vNode) {","            this._updateBar(vNode, y, duration, false);","        }","","        if (axis.x && hNode) {","            this._updateBar(hNode, x, duration, true);","        }","    },","","    /**","     * Show the scroll bar indicators","     *","     * @method show","     * @param animated {Boolean} Whether or not to animate the showing ","     */","    show: function(animated) {","        this._show(true, animated);","    },","","    /**","     * Hide the scroll bar indicators","     *","     * @method hide","     * @param animated {Boolean} Whether or not to animate the hiding","     */","    hide: function(animated) {","        this._show(false, animated);","    },","","    /**","     * Internal hide/show implementation utility method","     *","     * @method _show","     * @param {boolean} show Whether to show or hide the scrollbar ","     * @param {bolean} animated Whether or not to animate while showing/hide","     * @protected","     */","    _show : function(show, animated) {","","        var verticalNode = this.get(VERTICAL_NODE),","            horizontalNode = this.get(HORIZONTAL_NODE),","","            duration = (animated) ? 0.6 : 0,","            opacity = (show) ? 1 : 0,","","            transition;","","        this._showing = show;","","        if (this._flashTimer) {","            this._flashTimer.cancel();","        }","","        transition = {","            duration : duration,","            opacity : opacity","        };","","        if (verticalNode) {","            verticalNode.transition(transition);","        }","","        if (horizontalNode) {","            horizontalNode.transition(transition);","        }","    },","","    /**","     * Momentarily flash the scroll bars to indicate current scroll position","     *","     * @method flash","     */","    flash: function() {","        var host = this._host;","","        this.show(true);","        this._flashTimer = Y.later(800, this, 'hide', true);","    },","","    /**","     * Setter for the verticalNode and horizontalNode attributes","     *","     * @method _setNode","     * @param node {Node} The Y.Node instance for the scrollbar","     * @param name {String} The attribute name","     * @return {Node} The Y.Node instance for the scrollbar","     * ","     * @protected","     */","    _setNode: function(node, name) {","        var horiz = (name === HORIZONTAL_NODE);","            node = Y.one(node);","","        if (node) {","            node.addClass(_classNames.scrollbar);","            node.addClass( (horiz) ? _classNames.scrollbarH : _classNames.scrollbarV );","            node.setData(\"isHoriz\", horiz);","        }","","        return node;","    },","","    /**","     * Creates default node instances for scrollbars","     *","     * @method _defaultNode","     * @return {Node} The Y.Node instance for the scrollbar","     * ","     * @protected","     */","    _defaultNode: function() {","        return Y.Node.create(ScrollbarsPlugin.SCROLLBAR_TEMPLATE);","    },    ","","    _basic: Y.UA.ie && Y.UA.ie <= 8","","});","","","}, '@VERSION@', {\"requires\": [\"classnamemanager\", \"transition\", \"plugin\"], \"skinnable\": true});"];
_yuitest_coverage["scrollview-scrollbars"].lines = {"1":0,"10":0,"57":0,"58":0,"61":0,"74":0,"84":0,"94":0,"103":0,"118":0,"143":0,"151":0,"153":0,"154":0,"155":0,"167":0,"170":0,"171":0,"173":0,"175":0,"186":0,"187":0,"200":0,"204":0,"205":0,"206":0,"207":0,"208":0,"209":0,"210":0,"223":0,"229":0,"230":0,"231":0,"233":0,"250":0,"266":0,"291":0,"292":0,"293":0,"294":0,"295":0,"296":0,"297":0,"298":0,"299":0,"301":0,"302":0,"303":0,"304":0,"305":0,"306":0,"307":0,"308":0,"311":0,"312":0,"314":0,"315":0,"318":0,"319":0,"320":0,"321":0,"322":0,"325":0,"327":0,"328":0,"331":0,"332":0,"335":0,"337":0,"341":0,"342":0,"344":0,"347":0,"350":0,"351":0,"353":0,"358":0,"359":0,"361":0,"363":0,"364":0,"368":0,"369":0,"371":0,"374":0,"376":0,"377":0,"379":0,"384":0,"386":0,"388":0,"389":0,"393":0,"394":0,"396":0,"399":0,"401":0,"402":0,"404":0,"425":0,"430":0,"432":0,"433":0,"436":0,"437":0,"440":0,"441":0,"452":0,"462":0,"475":0,"483":0,"485":0,"486":0,"489":0,"494":0,"495":0,"498":0,"499":0,"509":0,"511":0,"512":0,"526":0,"527":0,"529":0,"530":0,"531":0,"532":0,"535":0,"547":0};
_yuitest_coverage["scrollview-scrollbars"].functions = {"ScrollbarsPlugin:57":0,"initializer:150":0,"_hostDimensionsChange:166":0,"_hostScrollEnd:185":0,"_renderBar:199":0,"_setChildCache:222":0,"_clearChildCache:249":0,"_updateBar:264":0,"_update:423":0,"show:451":0,"hide:461":0,"_show:473":0,"flash:508":0,"_setNode:525":0,"_defaultNode:546":0,"(anonymous 1):1":0};
_yuitest_coverage["scrollview-scrollbars"].coveredLines = 130;
_yuitest_coverage["scrollview-scrollbars"].coveredFunctions = 16;
_yuitest_coverline("scrollview-scrollbars", 1);
YUI.add('scrollview-scrollbars', function (Y, NAME) {

/**
 * Provides a plugin, which adds support for a scroll indicator to ScrollView instances
 *
 * @module scrollview
 * @submodule scrollview-scrollbars
 */

_yuitest_coverfunc("scrollview-scrollbars", "(anonymous 1)", 1);
_yuitest_coverline("scrollview-scrollbars", 10);
var getClassName = Y.ClassNameManager.getClassName,
    _classNames,

    Transition = Y.Transition,
    NATIVE_TRANSITIONS = Transition.useNative,    
    SCROLLBAR = 'scrollbar',
    SCROLLVIEW = 'scrollview',

    VERTICAL_NODE = "verticalNode",
    HORIZONTAL_NODE = "horizontalNode",

    CHILD_CACHE = "childCache",

    TOP = "top",
    LEFT = "left",
    WIDTH = "width",
    HEIGHT = "height",
    SCROLL_WIDTH = "scrollWidth",
    SCROLL_HEIGHT = "scrollHeight",

    HORIZ_CACHE = "_sbh",
    VERT_CACHE = "_sbv",

    TRANSITION_PROPERTY = Transition._VENDOR_PREFIX + "TransitionProperty",
    TRANSFORM = "transform",

    TRANSLATE_X = "translateX(",
    TRANSLATE_Y = "translateY(",

    SCALE_X = "scaleX(",
    SCALE_Y = "scaleY(",
    
    SCROLL_X = "scrollX",
    SCROLL_Y = "scrollY",

    PX = "px",
    CLOSE = ")",
    PX_CLOSE = PX + CLOSE;

/**
 * ScrollView plugin that adds scroll indicators to ScrollView instances
 *
 * @class ScrollViewScrollbars
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 */
_yuitest_coverline("scrollview-scrollbars", 57);
function ScrollbarsPlugin() {
    _yuitest_coverfunc("scrollview-scrollbars", "ScrollbarsPlugin", 57);
_yuitest_coverline("scrollview-scrollbars", 58);
ScrollbarsPlugin.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("scrollview-scrollbars", 61);
ScrollbarsPlugin.CLASS_NAMES = {
    showing: getClassName(SCROLLVIEW, SCROLLBAR, 'showing'),
    scrollbar: getClassName(SCROLLVIEW, SCROLLBAR),
    scrollbarV: getClassName(SCROLLVIEW, SCROLLBAR, 'vert'),
    scrollbarH: getClassName(SCROLLVIEW, SCROLLBAR, 'horiz'),
    scrollbarVB: getClassName(SCROLLVIEW, SCROLLBAR, 'vert', 'basic'),
    scrollbarHB: getClassName(SCROLLVIEW, SCROLLBAR, 'horiz', 'basic'),
    child: getClassName(SCROLLVIEW, 'child'),
    first: getClassName(SCROLLVIEW, 'first'),
    middle: getClassName(SCROLLVIEW, 'middle'),
    last: getClassName(SCROLLVIEW, 'last')
};

_yuitest_coverline("scrollview-scrollbars", 74);
_classNames = ScrollbarsPlugin.CLASS_NAMES;

/**
 * The identity of the plugin
 *
 * @property NAME
 * @type String
 * @default 'pluginScrollViewScrollbars'
 * @static
 */
_yuitest_coverline("scrollview-scrollbars", 84);
ScrollbarsPlugin.NAME = 'pluginScrollViewScrollbars';
    
/**
 * The namespace on which the plugin will reside.
 *
 * @property NS
 * @type String
 * @default 'scrollbars'
 * @static
 */
_yuitest_coverline("scrollview-scrollbars", 94);
ScrollbarsPlugin.NS = 'scrollbars';

/**
 * HTML template for the scrollbar
 *
 * @property SCROLLBAR_TEMPLATE
 * @type Object
 * @static
 */
_yuitest_coverline("scrollview-scrollbars", 103);
ScrollbarsPlugin.SCROLLBAR_TEMPLATE = [
    '<div>',
    '<span class="' + _classNames.child + ' ' + _classNames.first + '"></span>',
    '<span class="' + _classNames.child + ' ' + _classNames.middle + '"></span>',
    '<span class="' + _classNames.child + ' ' + _classNames.last + '"></span>',
    '</div>'
].join('');

/**
 * The default attribute configuration for the plugin
 *
 * @property ATTRS
 * @type Object
 * @static
 */
_yuitest_coverline("scrollview-scrollbars", 118);
ScrollbarsPlugin.ATTRS = {
    
    /**
     * Vertical scrollbar node
     *
     * @attribute verticalNode
     * @type Y.Node
     */
    verticalNode: {
        setter: '_setNode',
        valueFn: '_defaultNode'
    },

    /**
     * Horizontal scrollbar node
     *
     * @attribute horizontalNode
     * @type Y.Node
     */
    horizontalNode: {
        setter: '_setNode',
        valueFn: '_defaultNode'
    }
};

_yuitest_coverline("scrollview-scrollbars", 143);
Y.namespace("Plugin").ScrollViewScrollbars = Y.extend(ScrollbarsPlugin, Y.Plugin.Base, {

    /**
     * Designated initializer
     *
     * @method initializer
     */    
    initializer: function() {
        _yuitest_coverfunc("scrollview-scrollbars", "initializer", 150);
_yuitest_coverline("scrollview-scrollbars", 151);
this._host = this.get("host");

        _yuitest_coverline("scrollview-scrollbars", 153);
this.afterHostEvent('scrollEnd', this._hostScrollEnd);
        _yuitest_coverline("scrollview-scrollbars", 154);
this.afterHostMethod('scrollTo', this._update);
        _yuitest_coverline("scrollview-scrollbars", 155);
this.afterHostMethod('_uiDimensionsChange', this._hostDimensionsChange);
    },

    /**
     * Set up the DOM nodes for the scrollbars. This method is invoked whenever the
     * host's _uiDimensionsChange fires, giving us the opportunity to remove un-needed
     * scrollbars, as well as add one if necessary.
     *
     * @method _hostDimensionsChange
     * @protected
     */    
    _hostDimensionsChange: function() {
        _yuitest_coverfunc("scrollview-scrollbars", "_hostDimensionsChange", 166);
_yuitest_coverline("scrollview-scrollbars", 167);
var host = this._host,
            axis = host.axis;

        _yuitest_coverline("scrollview-scrollbars", 170);
this._renderBar(this.get(VERTICAL_NODE), axis.y, 'vert');
        _yuitest_coverline("scrollview-scrollbars", 171);
this._renderBar(this.get(HORIZONTAL_NODE), axis.x, 'horiz');

        _yuitest_coverline("scrollview-scrollbars", 173);
this._update();

        _yuitest_coverline("scrollview-scrollbars", 175);
Y.later(500, this, 'flash', true);
    },

    /**
     * Handler for the scrollEnd event fired by the host. Default implementation flashes the scrollbar
     *
     * @method _hostScrollEnd
     * @param {Event.Facade} e The event facade.
     * @protected
     */
    _hostScrollEnd : function(e) {
        _yuitest_coverfunc("scrollview-scrollbars", "_hostScrollEnd", 185);
_yuitest_coverline("scrollview-scrollbars", 186);
if (!this._host._flicking) {
            _yuitest_coverline("scrollview-scrollbars", 187);
this.flash();
        }
    },

    /**
     * Adds or removes a scrollbar node from the document.
     * 
     * @method _renderBar
     * @private
     * @param {Node} bar The scrollbar node
     * @param {boolean} add true, to add the node, false to remove it
     */
    _renderBar: function(bar, add) {
        _yuitest_coverfunc("scrollview-scrollbars", "_renderBar", 199);
_yuitest_coverline("scrollview-scrollbars", 200);
var inDoc = bar.inDoc(),
            bb = this._host._bb,
            className = bar.getData("isHoriz") ? _classNames.scrollbarHB : _classNames.scrollbarVB;

        _yuitest_coverline("scrollview-scrollbars", 204);
if (add && !inDoc) {
            _yuitest_coverline("scrollview-scrollbars", 205);
bb.append(bar);
            _yuitest_coverline("scrollview-scrollbars", 206);
bar.toggleClass(className, this._basic);
            _yuitest_coverline("scrollview-scrollbars", 207);
this._setChildCache(bar);
        } else {_yuitest_coverline("scrollview-scrollbars", 208);
if(!add && inDoc) {
            _yuitest_coverline("scrollview-scrollbars", 209);
bar.remove();
            _yuitest_coverline("scrollview-scrollbars", 210);
this._clearChildCache(bar);
        }}
    },

    /**
     * Caches scrollbar child element information,
     * to optimize _update implementation 
     * 
     * @method _setChildCache
     * @private
     * @param {Node} node
     */
    _setChildCache : function(node) {
        _yuitest_coverfunc("scrollview-scrollbars", "_setChildCache", 222);
_yuitest_coverline("scrollview-scrollbars", 223);
var c = node.get("children"),
            fc = c.item(0),
            mc = c.item(1),
            lc = c.item(2),
            size = node.getData("isHoriz") ? "offsetWidth" : "offsetHeight";

        _yuitest_coverline("scrollview-scrollbars", 229);
node.setStyle(TRANSITION_PROPERTY, TRANSFORM);
        _yuitest_coverline("scrollview-scrollbars", 230);
mc.setStyle(TRANSITION_PROPERTY, TRANSFORM);
        _yuitest_coverline("scrollview-scrollbars", 231);
lc.setStyle(TRANSITION_PROPERTY, TRANSFORM);

        _yuitest_coverline("scrollview-scrollbars", 233);
node.setData(CHILD_CACHE, {
            fc : fc,
            lc : lc,
            mc : mc,
            fcSize : fc && fc.get(size),
            lcSize : lc && lc.get(size)
        });
    },

    /**
     * Clears child cache
     * 
     * @method _clearChildCache
     * @private
     * @param {Node} node
     */
    _clearChildCache : function(node) {
        _yuitest_coverfunc("scrollview-scrollbars", "_clearChildCache", 249);
_yuitest_coverline("scrollview-scrollbars", 250);
node.clearData(CHILD_CACHE);
    },

    /**
     * Utility method, to move/resize either vertical or horizontal scrollbars
     *
     * @method _updateBar
     * @private
     *
     * @param {Node} scrollbar The scrollbar node.
     * @param {Number} current The current scroll position.
     * @param {Number} duration The transition duration.
     * @param {boolean} horiz true if horizontal, false if vertical.
     */
    _updateBar : function(scrollbar, current, duration, horiz) {

        _yuitest_coverfunc("scrollview-scrollbars", "_updateBar", 264);
_yuitest_coverline("scrollview-scrollbars", 266);
var host = this._host,
            basic = this._basic,
            cb = host._cb,

            scrollbarSize = 0,
            scrollbarPos = 1,

            childCache = scrollbar.getData(CHILD_CACHE),
            lastChild = childCache.lc,
            middleChild = childCache.mc,
            firstChildSize = childCache.fcSize,
            lastChildSize = childCache.lcSize,
            middleChildSize,
            lastChildPosition,

            transition,
            translate,
            scale,

            dim,
            dimOffset,
            dimCache,
            widgetSize,
            contentSize;

        _yuitest_coverline("scrollview-scrollbars", 291);
if (horiz) {
            _yuitest_coverline("scrollview-scrollbars", 292);
dim = WIDTH;
            _yuitest_coverline("scrollview-scrollbars", 293);
dimOffset = LEFT;
            _yuitest_coverline("scrollview-scrollbars", 294);
dimCache = HORIZ_CACHE;
            _yuitest_coverline("scrollview-scrollbars", 295);
widgetSize = host.get('width');
            _yuitest_coverline("scrollview-scrollbars", 296);
contentSize = host._scrollWidth;
            _yuitest_coverline("scrollview-scrollbars", 297);
translate = TRANSLATE_X;
            _yuitest_coverline("scrollview-scrollbars", 298);
scale = SCALE_X;
            _yuitest_coverline("scrollview-scrollbars", 299);
current = (current !== undefined) ? current : host.get(SCROLL_X);
        } else {
            _yuitest_coverline("scrollview-scrollbars", 301);
dim = HEIGHT;
            _yuitest_coverline("scrollview-scrollbars", 302);
dimOffset = TOP;
            _yuitest_coverline("scrollview-scrollbars", 303);
dimCache = VERT_CACHE;
            _yuitest_coverline("scrollview-scrollbars", 304);
widgetSize = host.get('height');
            _yuitest_coverline("scrollview-scrollbars", 305);
contentSize = host._scrollHeight;
            _yuitest_coverline("scrollview-scrollbars", 306);
translate = TRANSLATE_Y;
            _yuitest_coverline("scrollview-scrollbars", 307);
scale = SCALE_Y;
            _yuitest_coverline("scrollview-scrollbars", 308);
current = (current !== undefined) ? current : host.get(SCROLL_Y);
        }

        _yuitest_coverline("scrollview-scrollbars", 311);
scrollbarSize = Math.floor(widgetSize * (widgetSize/contentSize));
        _yuitest_coverline("scrollview-scrollbars", 312);
scrollbarPos = Math.floor((current/(contentSize - widgetSize)) * (widgetSize - scrollbarSize));

        _yuitest_coverline("scrollview-scrollbars", 314);
if (scrollbarSize > widgetSize) {
            _yuitest_coverline("scrollview-scrollbars", 315);
scrollbarSize = 1;
        }

        _yuitest_coverline("scrollview-scrollbars", 318);
if (scrollbarPos > (widgetSize - scrollbarSize)) {
            _yuitest_coverline("scrollview-scrollbars", 319);
scrollbarSize = scrollbarSize - (scrollbarPos - (widgetSize - scrollbarSize));
        } else {_yuitest_coverline("scrollview-scrollbars", 320);
if (scrollbarPos < 0) {
            _yuitest_coverline("scrollview-scrollbars", 321);
scrollbarSize = scrollbarPos + scrollbarSize;
            _yuitest_coverline("scrollview-scrollbars", 322);
scrollbarPos = 0;
        }}

        _yuitest_coverline("scrollview-scrollbars", 325);
middleChildSize = (scrollbarSize - (firstChildSize + lastChildSize));

        _yuitest_coverline("scrollview-scrollbars", 327);
if (middleChildSize < 0) {
            _yuitest_coverline("scrollview-scrollbars", 328);
middleChildSize = 0;
        }

        _yuitest_coverline("scrollview-scrollbars", 331);
if (middleChildSize === 0 && scrollbarPos !== 0) {
            _yuitest_coverline("scrollview-scrollbars", 332);
scrollbarPos = widgetSize - (firstChildSize + lastChildSize) - 1;
        }

        _yuitest_coverline("scrollview-scrollbars", 335);
if (duration !== 0) {
            // Position Scrollbar
            _yuitest_coverline("scrollview-scrollbars", 337);
transition = {
                duration : duration
            };

            _yuitest_coverline("scrollview-scrollbars", 341);
if (NATIVE_TRANSITIONS) {
                _yuitest_coverline("scrollview-scrollbars", 342);
transition.transform = translate + scrollbarPos + PX_CLOSE;
            } else {
                _yuitest_coverline("scrollview-scrollbars", 344);
transition[dimOffset] = scrollbarPos + PX;
            }

            _yuitest_coverline("scrollview-scrollbars", 347);
scrollbar.transition(transition);

        } else {
            _yuitest_coverline("scrollview-scrollbars", 350);
if (NATIVE_TRANSITIONS) {
                _yuitest_coverline("scrollview-scrollbars", 351);
scrollbar.setStyle(TRANSFORM, translate + scrollbarPos + PX_CLOSE);
            } else {
                _yuitest_coverline("scrollview-scrollbars", 353);
scrollbar.setStyle(dimOffset, scrollbarPos + PX);
            }
        }

        // Resize Scrollbar Middle Child
        _yuitest_coverline("scrollview-scrollbars", 358);
if (this[dimCache] !== middleChildSize) {
            _yuitest_coverline("scrollview-scrollbars", 359);
this[dimCache] = middleChildSize;

            _yuitest_coverline("scrollview-scrollbars", 361);
if (middleChildSize > 0) {

                _yuitest_coverline("scrollview-scrollbars", 363);
if (duration !== 0) {
                    _yuitest_coverline("scrollview-scrollbars", 364);
transition = {
                        duration : duration             
                    };

                    _yuitest_coverline("scrollview-scrollbars", 368);
if(NATIVE_TRANSITIONS) {
                        _yuitest_coverline("scrollview-scrollbars", 369);
transition.transform = scale + middleChildSize + CLOSE;
                    } else {
                        _yuitest_coverline("scrollview-scrollbars", 371);
transition[dim] = middleChildSize + PX;
                    }

                    _yuitest_coverline("scrollview-scrollbars", 374);
middleChild.transition(transition);
                } else {
                    _yuitest_coverline("scrollview-scrollbars", 376);
if (NATIVE_TRANSITIONS) {
                        _yuitest_coverline("scrollview-scrollbars", 377);
middleChild.setStyle(TRANSFORM, scale + middleChildSize + CLOSE);
                    } else {
                        _yuitest_coverline("scrollview-scrollbars", 379);
middleChild.setStyle(dim, middleChildSize + PX);
                    }
                }
    
                // Position Last Child
                _yuitest_coverline("scrollview-scrollbars", 384);
if (!horiz || !basic) {

                    _yuitest_coverline("scrollview-scrollbars", 386);
lastChildPosition = scrollbarSize - lastChildSize;
    
                    _yuitest_coverline("scrollview-scrollbars", 388);
if(duration !== 0) { 
                        _yuitest_coverline("scrollview-scrollbars", 389);
transition = {
                            duration : duration
                        };
                
                        _yuitest_coverline("scrollview-scrollbars", 393);
if (NATIVE_TRANSITIONS) {
                            _yuitest_coverline("scrollview-scrollbars", 394);
transition.transform = translate + lastChildPosition + PX_CLOSE; 
                        } else {
                            _yuitest_coverline("scrollview-scrollbars", 396);
transition[dimOffset] = lastChildPosition; 
                        }

                        _yuitest_coverline("scrollview-scrollbars", 399);
lastChild.transition(transition);
                    } else {
                        _yuitest_coverline("scrollview-scrollbars", 401);
if (NATIVE_TRANSITIONS) {
                            _yuitest_coverline("scrollview-scrollbars", 402);
lastChild.setStyle(TRANSFORM, translate + lastChildPosition + PX_CLOSE); 
                        } else {
                            _yuitest_coverline("scrollview-scrollbars", 404);
lastChild.setStyle(dimOffset, lastChildPosition + PX); 
                        }
                    }
                }
            }
        }
    },

    /**
     * AOP method, invoked after the host's _uiScrollTo method, 
     * to position and resize the scroll bars
     *
     * @method _update
     * @param x {Number} The current scrollX value
     * @param y {Number} The current scrollY value
     * @param duration {Number} Number of ms of animation (optional) - used when snapping to bounds 
     * @param easing {String} Optional easing equation to use during the animation, if duration is set
     * @protected
     */
    _update: function(x, y, duration, easing) {

        _yuitest_coverfunc("scrollview-scrollbars", "_update", 423);
_yuitest_coverline("scrollview-scrollbars", 425);
var vNode = this.get(VERTICAL_NODE),
            hNode = this.get(HORIZONTAL_NODE),
            host = this._host,
            axis = host.axis;

        _yuitest_coverline("scrollview-scrollbars", 430);
duration = (duration || 0)/1000;

        _yuitest_coverline("scrollview-scrollbars", 432);
if (!this._showing) {
            _yuitest_coverline("scrollview-scrollbars", 433);
this.show();
        }

        _yuitest_coverline("scrollview-scrollbars", 436);
if (axis.y && vNode) {
            _yuitest_coverline("scrollview-scrollbars", 437);
this._updateBar(vNode, y, duration, false);
        }

        _yuitest_coverline("scrollview-scrollbars", 440);
if (axis.x && hNode) {
            _yuitest_coverline("scrollview-scrollbars", 441);
this._updateBar(hNode, x, duration, true);
        }
    },

    /**
     * Show the scroll bar indicators
     *
     * @method show
     * @param animated {Boolean} Whether or not to animate the showing 
     */
    show: function(animated) {
        _yuitest_coverfunc("scrollview-scrollbars", "show", 451);
_yuitest_coverline("scrollview-scrollbars", 452);
this._show(true, animated);
    },

    /**
     * Hide the scroll bar indicators
     *
     * @method hide
     * @param animated {Boolean} Whether or not to animate the hiding
     */
    hide: function(animated) {
        _yuitest_coverfunc("scrollview-scrollbars", "hide", 461);
_yuitest_coverline("scrollview-scrollbars", 462);
this._show(false, animated);
    },

    /**
     * Internal hide/show implementation utility method
     *
     * @method _show
     * @param {boolean} show Whether to show or hide the scrollbar 
     * @param {bolean} animated Whether or not to animate while showing/hide
     * @protected
     */
    _show : function(show, animated) {

        _yuitest_coverfunc("scrollview-scrollbars", "_show", 473);
_yuitest_coverline("scrollview-scrollbars", 475);
var verticalNode = this.get(VERTICAL_NODE),
            horizontalNode = this.get(HORIZONTAL_NODE),

            duration = (animated) ? 0.6 : 0,
            opacity = (show) ? 1 : 0,

            transition;

        _yuitest_coverline("scrollview-scrollbars", 483);
this._showing = show;

        _yuitest_coverline("scrollview-scrollbars", 485);
if (this._flashTimer) {
            _yuitest_coverline("scrollview-scrollbars", 486);
this._flashTimer.cancel();
        }

        _yuitest_coverline("scrollview-scrollbars", 489);
transition = {
            duration : duration,
            opacity : opacity
        };

        _yuitest_coverline("scrollview-scrollbars", 494);
if (verticalNode) {
            _yuitest_coverline("scrollview-scrollbars", 495);
verticalNode.transition(transition);
        }

        _yuitest_coverline("scrollview-scrollbars", 498);
if (horizontalNode) {
            _yuitest_coverline("scrollview-scrollbars", 499);
horizontalNode.transition(transition);
        }
    },

    /**
     * Momentarily flash the scroll bars to indicate current scroll position
     *
     * @method flash
     */
    flash: function() {
        _yuitest_coverfunc("scrollview-scrollbars", "flash", 508);
_yuitest_coverline("scrollview-scrollbars", 509);
var host = this._host;

        _yuitest_coverline("scrollview-scrollbars", 511);
this.show(true);
        _yuitest_coverline("scrollview-scrollbars", 512);
this._flashTimer = Y.later(800, this, 'hide', true);
    },

    /**
     * Setter for the verticalNode and horizontalNode attributes
     *
     * @method _setNode
     * @param node {Node} The Y.Node instance for the scrollbar
     * @param name {String} The attribute name
     * @return {Node} The Y.Node instance for the scrollbar
     * 
     * @protected
     */
    _setNode: function(node, name) {
        _yuitest_coverfunc("scrollview-scrollbars", "_setNode", 525);
_yuitest_coverline("scrollview-scrollbars", 526);
var horiz = (name === HORIZONTAL_NODE);
            _yuitest_coverline("scrollview-scrollbars", 527);
node = Y.one(node);

        _yuitest_coverline("scrollview-scrollbars", 529);
if (node) {
            _yuitest_coverline("scrollview-scrollbars", 530);
node.addClass(_classNames.scrollbar);
            _yuitest_coverline("scrollview-scrollbars", 531);
node.addClass( (horiz) ? _classNames.scrollbarH : _classNames.scrollbarV );
            _yuitest_coverline("scrollview-scrollbars", 532);
node.setData("isHoriz", horiz);
        }

        _yuitest_coverline("scrollview-scrollbars", 535);
return node;
    },

    /**
     * Creates default node instances for scrollbars
     *
     * @method _defaultNode
     * @return {Node} The Y.Node instance for the scrollbar
     * 
     * @protected
     */
    _defaultNode: function() {
        _yuitest_coverfunc("scrollview-scrollbars", "_defaultNode", 546);
_yuitest_coverline("scrollview-scrollbars", 547);
return Y.Node.create(ScrollbarsPlugin.SCROLLBAR_TEMPLATE);
    },    

    _basic: Y.UA.ie && Y.UA.ie <= 8

});


}, '@VERSION@', {"requires": ["classnamemanager", "transition", "plugin"], "skinnable": true});
