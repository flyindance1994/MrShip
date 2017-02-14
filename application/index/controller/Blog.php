<?php
/**
 * Created by PhpStorm.
 * User: dengzhou
 * Date: 2017/2/14
 * Time: 16:52
 */
namespace app\index\controller;

use think\Controller;
use think\Loader;

class Blog extends Controller
{
    public function index()
    {
        $message=Loader::model("Message");

        $message->select();

        dump($message);
//        $message->add($_POST);
    }
}
