<?php
    header("Content-type:application/json; charset=utf-8");
    require_once('db.php');

    if($link){
        @$newsId = $_GET['newsId'];
        mysqli_query($link,'SET NAMES utf8'); //防止中文变成问号
        $sql = " SELECT * FROM `news` WHERE `id` = {$newsId} ";

        $result = mysqli_query($link,$sql);
        $sendData = array();
        while($row = mysqli_fetch_assoc($result)){    //依次输出结果到前台
            array_push($sendData,array(
                'id' => $row['id'],
                'newsType' => $row['newsType'],
                'newsTitle' => $row['newsTitle'],
                'newsImg' => $row['newsImg'],
                'newsTime' => $row['newsTime'],
                'newsSrc' => $row['newsSrc'],
            ));
        };
        echo json_encode($sendData);
    }

    mysqli_close($link);  //关闭连接
?>