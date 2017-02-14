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
        try {
            $pageSize = 4;
            $Message = new Message();

            $messages = $Message->paginate($pageSize);

            $this->assign('messages', $messages);

            $htmls = $this->fetch();

            return $htmls;
        } catch (\Exception $e) {
            return '系统错误' . $e->getMessage();
        }
    }
}
