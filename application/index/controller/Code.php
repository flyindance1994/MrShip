<?php
/**
 * Created by PhpStorm.
 * User: dengzhou
 * Date: 2017/2/17
 * Time: 15:32
 */
namespace app\index\controller;

use think\Controller;
use app\index\model\Post;

class Code extends Controller{
    public function index(){
        try {
            $pageSize = 5;
            $post = new Post();

            $posts = $post->paginate($pageSize);

            $this->assign('posts', $posts);

            $htmls = $this->fetch();

            return $htmls;
        } catch (\Exception $e) {
            return '系统错误' . $e->getMessage();
        }
    }
}