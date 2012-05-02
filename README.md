SubMenuBox
======================
サブメニューの表示アニメーションを制御する jQuery ライブラリ

使い方
------
JavaScript, CSS の読み込み

    <link href="../css/submenubox.css" media="screen" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="src/jquery.hoverIntent.js"></script>
    <script type="text/javascript" src="src/jquery.submenubox.js"></script>
    <script type="text/javascript">
    $(function() {
      $('ul.side-menu').submenubox();
    });
    </script>

    <body>
        <ul class="side-menu1">
            <li><a href="#">Home</a></li>
            <li><a href="#">Menu1</a>
                <div style="width:300px; height:100px;display:none;">
                   <h2>SubMenu1</h2>
                   <p>This is submenu1.</p>
                </div>                  
            </li>
            <li><a href="#">Menu2</a>
                <div style="width:400px; height:150px;display:none">
                    <h2>SubMenu2</h2>
                    <p>This is submenu2.</p>
                </div>
            </li>
        </ul>
    </body>

ライセンス
----------
Copyright nak0yui  
Dual licensed under the [MIT license][MIT] and [GPL license][GPL].

[MIT]: http://www.opensource.org/licenses/mit-license.php
[GPL]: http://www.gnu.org/licenses/gpl.html
