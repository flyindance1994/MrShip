<?php
/**
 * Created by PhpStorm.
 * User: flyin
 * Date: 2017/2/18
 * Time: 17:59
 */
namespace app\index\controller;

use think\Controller;
use think\Loader;
use app\index\model\Post;

class Admin extends Controller
{
    public function index()
    {
        return view();
    }

    /**
     *
     */
    public function imageUpload()
    {
        $posts=new Post;
        $posts->title=input('post.name');
        $posts->type=1;
        $posts->content=input('post.content');
        $posts->introduce=input('post.introduce');
//        dump($posts);
        $posts->save();
        $this->success('成功');
    }
}