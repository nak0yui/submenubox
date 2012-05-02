/*
 * Submenu Box 1.0.0
 * http://github.com/nak0yui/submenubox
 * 
 * Copyright nak0yui.
 * 
 * Dual licensed under the MIT and GPL licenses:
 *     http://www.opensource.org/licenses/mit-license.php
 *     http://www.gnu.org/licenses/gpl.html
 *
 * Depend on hoverIntent
 *     http://cherne.net/brian/resources/jquery.hoverIntent.html
 */
;(function($){
    var defaults = {
            actionName           : "hover",
            tagNameSubMenu       : 'div',
            classMenu            : 'smb-menu',
            classParent          : 'smb-parent',
            classParentLink      : 'smb-parent-link',
            classParentLinkHover : 'smb-parent-link-hover',
            classContainer       : 'smb-sub-container',
            classSubMenu         : 'smb-sub',
            classHover           : 'smb-hover',
            zIndexSubMenu        : '1000',
            speed                : 'fast',
            sensitivity          : 7,
            delay                : 0,
            interval             : 100,
            animation            : {opacity:'show'},
            direction            : 'right',
            position             : 'auto', // ['auto', 'static']
            onInit       : function(){}, // callback functions
            onBeforeShow : function(){},
            onShow       : function(){},
            onHide       : function(){}
    };

    $.fn.submenubox = function( options ) {
        return this.each(function() {
            var submenubox = new Submenubox;
            submenubox.init($(this), options);
        });
    };

    function Submenubox() {};
    
    Submenubox.prototype = $.extend({
        init : function(elem, options) {
            var smb = this,
                $$ = elem;
            this.setOptions(options);
            
            options = this.options;
            
            $$.addClass(options.classMenu)
            .css({position: 'relative'})
            .children('li').each(function() {
                var $parent = $(this),
                    $sub = $parent.children(options.tagNameSubMenu);
                
                $parent.addClass(options.classParent)
                    .css({position: 'relative'})
                    .children('a').addClass(options.classParentLink)
                    .css({position: 'relative'});

                if ($sub.size() == 0) return true;
                
                $sub.addClass(options.classSubMenu)
                    .show()
                    .wrap('<div class="'+ options.classContainer +'">');
                
                var $container = $('.'+ options.classContainer, $parent),
                    isHorizontal = false,
                    isVertical = false,
                    // Get flyout height
                    subHeight = $container.height(),
                    itemHeight = $parent.outerHeight(true),
                    subOuterWidth = $sub.outerWidth(true),
                    subPaddingHeight = $container.outerHeight(true) - subHeight,
                    // Get flyout width
                    subWidth = $container.width(),
                    itemWidth = $parent.outerWidth(true),
                    subOuterHeight = $sub.outerHeight(true),
                    subPaddingWidth = $container.outerWidth(true) - subWidth;
                $container.hide(); //.css({position: 'absolute'});
                
                switch (options.direction) {
                case 'down':
                    $container.css({top : itemHeight});
                    isHorizontal = true;
                    break;
                case 'up':
                    $container.css({bottom: itemHeight});
                    isHorizontal = true;
                    break;
                case 'left':
                    $container.css({right : itemWidth});
                    isVertical = true;
                    break;
                default:
                    $container.css({left : itemWidth});
                    isVertical = true;
                }

                if (options.position == 'auto') {
                    if (isHorizontal) {
                        $container.css({
                            left: (itemWidth - subWidth - subPaddingWidth) / 2
                        });
                    }
                    if (isVertical) {
                        $container.css({
                            top: (itemHeight - subHeight - subPaddingHeight) / 2
                        });
                    }
                }

                $container.css({
                    zIndex: options.zIndexSubMenu
                });
                
                if (options.actionName == "hover") {
                    // HoverIntent Configuration
                    var config = {
                        sensitivity: options.sensitivity, // number = sensitivity threshold (must be 1 or higher)
                        interval: options.interval, // number = milliseconds for onMouseOver polling interval
                        over: function(elem) {smb.over(elem);}, // function = onMouseOver callback (REQUIRED)
                        timeout: options.delay, // number = milliseconds delay before onMouseOut
                        out: function(elem) {smb.out(elem);} // function = onMouseOut callback (REQUIRED)
                    };
                    $parent.hoverIntent(config);
                } else if (options.actionName == "click") {
                    $parent.data("submenubox-close", true)
                        .children("a").click(function() {
                            if ($parent.data("submenubox-close")) {
                                // open
                                smb.over($parent);
                                $parent.data("submenubox-close", false);
                            } else {
                                // close
                                smb.out($parent);
                                $parent.data("submenubox-close", true);
                            }
                            return false;
                        });
                }
                options.onInit.call(smb);
                return true;
            });
            return this;
        },
        setOptions : function(options) {
            this.options = $.extend({}, defaults, options);
            return this;
        },
        over : function(elem) {
            var $$ = $(elem.currentTarget || elem),
                options = this.options,
                $container = $$.children('.'+ options.classContainer);
            options.onBeforeShow.call($$);
            $$.addClass(options.classHover);
            $$.children('.'+options.classParentLink)
                .addClass(options.classParentLinkHover);
            if (options.animation === 'none') {
                $container.show();
                options.onShow.call($$);
            } else {
                $container.animate(options.animation,
                                   options.speed,
                                   function(){ options.onShow.call($$); });
            }
            return this;
        }, 
       out : function(elem) {
            var $$ = $(elem.currentTarget || elem),
                options = this.options,
                $container = $$.children('.'+ options.classContainer);
            $$.removeClass(options.classHover);
            $$.children('.'+options.classParentLink)
                .removeClass(options.classParentLinkHover);
            $container.hide();
            options.onHide.call($$);
            return this;
        }
    }, Submenubox.prototype);


})(jQuery);