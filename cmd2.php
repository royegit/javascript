<?php

header("Content-Type:text/html;charset=utf8");
echo file_get_contents("cmd.php");
?>

<?php	
header("Content-Type:text/html;charset=utf8"); 
$dirname='../WWW/web2'; 
function fordir($dirname){ 
//打开目录 
$dir=opendir($dirname);
 readdir($dir).'<br/>';
//此时打开浏览器显示的是点表示当前文件夹 readdir($dir).'<br/>';
//此时打开浏览器显示的是点点表示上级文件夹 while($file=readdir($dir)){ $nfile=$dirname.'/'.$file; //赋予 目录的路径 这样才能打印出目录名 if(is_dir($nfile)){ //判断如果是目录则输出是目录文件名 echo "目录：{$nfile}<br/>"; fordir($nfile); }else{ echo "文件：{$nfile}<br/>"; //不是目录则输出文件名 } } closedir($dir); //资源有打开就有关闭 } fordir($dirname);

 ?>



