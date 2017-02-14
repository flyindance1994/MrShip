<?php
/**
 * Created by PhpStorm.
 * User: dengzhou
 * Date: 2017/2/14
 * Time: 16:52
 */
namespace app\index\controller;

use think\Controller;
use app\index\model\Message;

class Blog extends Controller
{
    public function index()
    {
        $message=new Message();

        $result = $message->find();
	
	//$result = json_decode(json_encode($result),true);
	
	dump($result);	

	echo "*********************************\n";

	foreach($result as $key=>$item){ 
	    dump($item->getAttr('content')); 
	} 
	
	echo "*********************************";
        //dump($message);
//        $message->add($_POST);
    }
}
