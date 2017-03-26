//当打开后台页面时候，发送请求，刷新新闻列表
$(document).ready(function(){
    var $newsTable = $('#newsTable tbody');
    
    refreshNews();

    //添加新闻
    $('#btnsubmit').click(function(e){
        e.preventDefault();
        //输入判断
        if($('#newsTitle').val() === '' || $('#newsImg').val() ==='' || $('#newsTime').val() ==='' || $('#newsType').val() ===''){
            if($('#newsTitle').val() === ''){
                $('#newsTitle').parent().addClass('has-error');
            }else{
                $('#newsTitle').parent().removeClass('has-error');
            }
            if($('#newsImg').val() === ''){
                $('#newsImg').parent().addClass('has-error');
            }else{
                $('#newsImg').parent().removeClass('has-error');
            }
            if($('#newsTime').val() === ''){
                $('#newsTime').parent().addClass('has-error');
            }else{
                $('#newsTime').parent().removeClass('has-error');
            }
            if($('#newsSrc').val() === ''){
                $('#newsSrc').parent().addClass('has-error');
            }else{
                $('#newsSrc').parent().removeClass('has-error');
            }
        }else{
            var jsonNews = {
                newsTitle:$('#newsTitle').val(),
                newsType:$('#newsType').val(),
                newsImg:$('#newsImg').val(),
                newsTime:$('#newsTime').val(),
                newsSrc:$('#newsSrc').val(),
            };
            //提交添加
            $.ajax({
                url:'../baidunews/server/insert.php',
                type:'post',
                data:jsonNews,
                datatype:'json',
                success:function(data){
                    $('#newsTitle').val(''); //增加新闻后，输入内容区清除
                    $('#newsImg').val('');
                    $('#newsTime').val('');
                    $('#newsSrc').val('');
                    console.log(data);
                    refreshNews();
                }
            })
        }
    })

    //删除新闻功能   事件委托
    var deleteId =null;
    $newsTable.on('click','.btn-danger',function(e){
        $('#deleteModal').modal('show');
        deleteId = $(this).parent().prevAll().eq(4).html();  //往前5个元素定位到新闻的id（倒推第一个是newsTime，第二个是newsSrc...,去掉了新闻时间）
    });

    $('#deleteModal #confirmDelete').click(function(e){
        if(deleteId){
            $.ajax({
                url:'../baidunews/server/delete.php',
                type:'post',
                data:{newsId:deleteId},
                success:function(data){
                    console.log('删除成功！')
                    $('#deleteModal').modal('hide');
                    refreshNews(); //刷新
                }
            })
        }
    })

    //修改新闻
    var updateId =null;
    $newsTable.on('click','.btn-primary',function(e){
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(4).html();
        $.ajax({
            url:'../baidunews/server/current.php',     
            type:'get',
            datatype:'json',
            data:{newsId:updateId},
            success:function(data){
                //在表单中获取当前要修改新闻的内容
               console.log(data);
               $('#unewsTitle').val(data[0].newsTitle);
               $('#unewsType').val(data[0].newsType);
               $('#unewsImg').val(data[0].newsImg);
               $('#unewsSrc').val(data[0].newsSrc);
               var utime = data[0].newsTime.split(' ')[0];   //去掉时分秒，保留年月日部分
               $('#unewsTime').val(utime);
            }
        });
    });

    $('#updateModal #confirmUpdate').click(function(e){
       $.ajax({
           url:'../baidunews/server/update.php',
           type:'post',
           data:{
               newsTitle:$('#unewsTitle').val(),
               newsType:$('#unewsType').val(),
               newsImg:$('#unewsImg').val(),
               newsTime:$('#unewsTime').val(),
               newsSrc:$('#unewsSrc').val(), 
               id:updateId,
           },
           success:function(data){
               $('#updateModal').modal('hide');
               refreshNews();
           }
       });
    });


    //刷新新闻列表（查）
    function refreshNews(){
    //清空所有新闻
    $newsTable.empty();

    $.ajax({
        type:'get',
        url:'../baidunews/server/getnews.php',
        datatype:'json',
        success:function(data){
            data.forEach(function(item,index,array){
                console.log(data);
                //工厂函数
                var $tdid = $('<td>').html(item.id);
                var $tdtype = $('<td>').html(item.newsType);
                var $tdtitle = $('<td>').html(item.newsTitle);
                var $tdimg = $('<td>').html(item.newsImg);
                var $tdsrc = $('<td>').html(item.newsSrc);
                var $tdtime = $('<td>').html(item.newsTime);
                var $tdctrl = $('<td>');
                var $btupdate = $('<button>').addClass('btn btn-primary btn-xs').html('修改');
                var $btdelete = $('<button>').addClass('btn btn-danger btn-xs').html('删除');
                $tdctrl.append($btupdate,$btdelete);
                var $tRow = $('<tr>');
                $tRow.append($tdid,$tdtype,$tdtitle,$tdimg,$tdsrc,$tdctrl);
                $newsTable.prepend($tRow);
            })
        }
    })
    }
})


