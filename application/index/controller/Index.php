<?php
namespace app\index\controller;

use think\Controller;
use think\Loader;

class Index extends Controller
{
    public function index()
    {
//        return '<style type="text/css">*{ padding: 0; margin: 0; } .think_default_text{ padding: 4px 48px;} a{color:#2E5CD5;cursor: pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family: "Century Gothic","Microsoft yahei"; color: #333;font-size:18px} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"> <h1>:)</h1><p> ThinkPHP V5<br/><span style="font-size:30px">十年磨一剑 - 为API开发设计的高性能框架</span></p><span style="font-size:22px;">[ V5.0 版本由 <a href="http://www.qiniu.com" target="qiniu">七牛云</a> 独家赞助发布 ]</span></div><script type="text/javascript" src="http://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script><script type="text/javascript" src="http://ad.topthink.com/Public/static/client.js"></script><thinkad id="ad_bd568ce7058a1091"></thinkad>';
        if (isMobile()) {
           return view('mobile_index');
        } else {
            return view();
        }
    }

    public function getMessage()
    {
//        var_dump(input('post.name'));
//        exit;
//        $message=new Message($_POST);
        $message = Loader::model("Message");
        $message->name = input('post.name');
        $message->contact = input('post.contact');
        $message->content = input('post.content');
        $message->save();
//        $message->add($_POST);
        $this->success('成功');
//        $this->ajaxreturn('成功');

    }

    public function redisTest()
    {
        $redis = new Redis();

        $redis->connect('127.0.0.1', 6379);
        $redis->set('site', 'xcroom');
        $this->success($redis->get('site'));
        echo 'name is:' . $redis->get('site'), '<br />';

        echo 'xcroom';
        exit();
    }
}
