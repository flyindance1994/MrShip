<?php
/**
 * Created by PhpStorm.
 * User: flyin
 * Date: 2017/2/18
 * Time: 17:59
 */
namespace app\index\controller;

use think\Controller;
use app\index\model\Admin;
use app\index\model\Post;
use think\Session;

class Admins extends Controller
{
    public function index()
    {
        if (Session::get('login') == null) {
            return view('login');
        } else {
            return view();
        }
    }

    public function login()
    {

        $Admin = new Admin();

        $condition['account'] = input('post.account');
        $condition['password'] = input('post.password');

        $user = $Admin::get($condition);

        if($user!=null){
            return view('index');
        }else{
            $this->error("用户名或密码错误");
        }
    }

    /**
     *
     */
    public function imageUpload()
    {
        $posts = new Post;
        $posts->title = input('post.title');
        $posts->type = 1;
        $posts->content = input('post.content');
        $posts->introduce = input('post.introduce');
        // dump($posts);
        $posts->save();
        $this->success('成功');
    }
}
