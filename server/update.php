<?php
    header("Content-type:application/json; charset=utf-8");

    require_once('db.php');

    if($link){
        //执行插入新闻
        $newsTitle = $_POST['newsTitle'];  //$_POST['newsTitle'] 是从前端传过来的值
        $newsType = $_POST['newsType'];
        $newsImg = $_POST['newsImg'];
        $newsTime = $_POST['newsTime'];
        $newsSrc = $_POST['newsSrc'];
        $newsId = $_POST['id'];

        $sql = "UPDATE `news` SET `newsTitle`='{$newsTitle}',`newsType`='{$newsType}',
        `newsImg`='{$newsImg}',`newsTime`='{$newsTime}',`newsSrc`='{$newsSrc}'
         WHERE `id`='{$newsId}' ";
        
        mysqli_query($link,'SET NAMES utf8'); //防止中文变成问号
        $result = mysqli_query($link,$sql);

        echo json_encode(array('success'=>$sql));
    }

    mysqli_close($link);  //关闭连接
?>