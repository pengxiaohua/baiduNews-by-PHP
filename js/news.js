$(document).ready(function(){
    refreshNews('精选');

    //点击不同栏目新闻，显示不同类型新闻内容
    $('nav a').click(function(e){
        e.preventDefault();
        var type = $(this).text();
        refreshNews(type);
    });

    //新闻类型下划线
    $('nav a').each(function(index){
        $(this).click(function(){
            $('nav a.currentNews').removeClass('currentNews');//隐藏当前class
            $(this).addClass('currentNews');      //移到那个li标签就给那个li标签添加class属性currentNews
        });
    });
});

function refreshNews(type){
    var $lists = $('article ul');
    $lists.empty();  //每次加入新闻，都将以前的新闻清除掉
    $.ajax({
        url:'../baidunews/server/getnews.php',
        type:'get',
        datatype:'json',
        data:{newsType:type},
        success:function(data){
            data.forEach(function(item,index,array){
                //工厂模式
                var $list = $('<li></li>').addClass('newsList').prependTo($lists);  //prependTo将新加入的新闻插入最前
                var $newsImg = $('<div></div>').addClass('newsImg').appendTo($list);
                var $img = $('<img>').attr('src',item.newsImg).appendTo($newsImg);
                var $newsContent = $('<div></div>').addClass('newsContent').appendTo($list);
                var $h1 = $('<h1></h1>').html(item.newsTitle).appendTo($newsContent);
                var $p = $('<p></p>').appendTo($newsContent);
                var $newsTime = $('<span></span>').addClass('newsTime').html(item.newsTime).appendTo($p);
                var newsSrc = $('<span></span>').addClass('newsSrc').html(item.newsSrc).appendTo($p);
            });
            console.log(data);
        }
    });
    
}