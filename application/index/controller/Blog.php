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

        $message->select();

        dump($message);
//        $message->add($_POST);
    }
}
