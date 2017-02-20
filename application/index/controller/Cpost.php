<?php
/**
 * Created by PhpStorm.
 * User: flyin
 * Date: 2017/2/19
 * Time: 22:39
 */
namespace app\index\controller;

use think\Controller;
use think\View;
use app\index\model\Post;

class Cpost extends Controller
{
    public function index($id)
    {
        $view = new View();
        $result = Post::get($id);
//        $data['title'] = $result->getData('title');
        $view->content = $result->getData('content');
//        $view->assign('data',$data);
        return $view->fetch();
    }
}