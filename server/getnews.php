<?php
    header("Content-type:application/json; charset=utf-8");

    require_once('db.php');

    if($link){
        //执行成功的过程
        //根据新闻类型展示新闻内容
        if(@$_GET['newsType']){   //此处有一个notice提醒（Undefined index），新闻数据不能展示，在出现notice代码之前加上@，表示不要输出错误和警告
            $newsType = $_GET['newsType'];
            $sql = " SELECT * FROM `news` WHERE `newsType` = '{$newsType}' " ;
            mysqli_query($link,'SET NAMES utf8'); //防止中文变成问号
            $result = mysqli_query($link,$sql);

            $sendData = array();

            while($row = mysqli_fetch_assoc($result)){    //依次输出结果到前台，$row 每一行都会被解析
                array_push($sendData,array(
                    'id' => $row['id'],
                    'newsType' => $row['newsType'],
                    'newsTitle' => $row['newsTitle'],
                    'newsImg' => $row['newsImg'],
                    'newsTime' => $row['newsTime'],
                    'newsSrc' => $row['newsSrc'],
                ));
            }
            echo json_encode($sendData);    //发送前端
        }else{
            $sql = 'SELECT * FROM news';
            mysqli_query($link,'SET NAMES utf8'); //防止中文变成问号
            $result = mysqli_query($link,$sql);
            
            $sendData = array();

            while($row = mysqli_fetch_assoc($result)){    //依次输出结果到前台，$row 每一行都会被解析
                array_push($sendData,array(
                    'id' => $row['id'],
                    'newsType' => $row['newsType'],
                    'newsTitle' => $row['newsTitle'],
                    'newsImg' => $row['newsImg'],
                    'newsTime' => $row['newsTime'],
                    'newsSrc' => $row['newsSrc'],
                ));
            }
            echo json_encode($sendData);    //发送前端
            // echo json_encode(array('连接信息' => '连接成功'));
        }
    }else{
        echo json_encode(array('连接信息' => '连接失败'));
    }

    mysqli_close($link);


    //测试数据
    // $arr = array(
    //     'newsType' => '百家',
    //     'newsImg' => 'img/002.jpg',
    //     'newsTime' => '2016-12-21',
    //     'newsSrc' => '百度新闻',
    //     'newsTitle' => '测试动态获取新闻标题'
    // );

    // echo json_encode($arr);
?>