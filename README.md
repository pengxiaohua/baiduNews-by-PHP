# baiduNews-by-PHP
仿百度新闻移动端及新闻发布系统（PHP+MySql+Bootstrap）
   
   下载代码，安装xampp，将代码放到xampp安装文件htdocs/里，开启apache和mysql，浏览器输入localhost\baidunews即可
   此时是没有sql文件的，所有没有新闻数据，最稳妥的方式就是自己创建一个，根据`('localhost','root','123456','baidunews',3306)`可以知道库名baidunews,表名news,端口号3306（windows下下载xampp，mysql默认端口号就是3306），然后创建字段`id`,`newsType`,`newsSrc`,`newsTime`,`newsTitle`,`newsImg`，其中id设为主键，创建表时候，排序规则选择`utf8_general_ci`,回到新闻页面，点击左上角第二个小人icon，进入后台控制页面（新闻页面和后台页面都是在手机模式下查看），后台可以进行增删该查，图片默认了7张，填写图片newsImg时候用这样的格式：`img\001.jpg`,后续会慢慢改进功能。
   效果查看地址：[百度移动新闻系统demo](http://xiaohuapeng.com/baidunews/)
