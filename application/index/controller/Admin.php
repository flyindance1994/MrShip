<?php
/**
 * Created by PhpStorm.
 * User: flyin
 * Date: 2017/2/18
 * Time: 17:59
 */
namespace app\index\controller;

use think\Controller;
use think\File;

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
        dump($_POST);

        exit;
    }
}