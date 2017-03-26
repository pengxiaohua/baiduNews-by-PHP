<?php
    header("Content-type:application/json; charset=utf-8");
    require_once('db.php');

    if($link){
        @$newsId = $_POST['newsId'];
        mysqli_query($link,'SET NAMES utf8'); //防止中文变成问号或乱码
        $sql = "DELETE FROM `news` WHERE `news`.`id` = {$newsId}";

        mysqli_query($link,$sql);

        echo json_encode(array('删除状态'=>'成功'));
    }

    mysqli_close($link);  //关闭数据库连接
?>