
      // let object_list = document.querySelectorAll('img');
      // console.log(object_list);
       
      //初始化对象数组
      const img_list = [
        {url:'./IMG/月光馆.jpg',name:"结成理",color:'#00679f'},
        {url:'./IMG/总攻击雨宫莲.png',name:"雨宫莲",color:'red'},
        {url:'./IMG/总攻击高卷杏.png',name:"高卷杏",color:'pink'},
        {url:'./IMG/总攻击龙司.png',name:"龙司", color:'yellow'},
        {url:'./IMG/总攻击喜多川.png',name:"喜多川", color:'blue'},
        {url:'./IMG/总攻击新岛真.png',name:"新岛真", color:'#772523'},
        {url:'./IMG/总攻击奥村春.png',name:"奥村春",   color:'purple'},
        {url:'./IMG/总攻击双叶.png',name:"双叶",   color:'green'},
        {url:'./IMG/总攻击摩纳.png',name:"摩纳",   color:'grey'},
        {url:'./IMG/总攻击明智.png',name:"明智",   color:'#d4b664'},
      ];

      //获取元素
      const carousel_img = document.querySelector('.Carousel img');
      const carousel_name = document.querySelector('.Carousel_name p')

      // 全局变量；定义第一张的索引(也叫信号量)
      let playThePicture_index  = 0;
      //封装切换图片的函数
      function change_img(){
        //更换图片
        carousel_img.src = img_list[playThePicture_index].url;
        carousel_name.innerHTML = img_list[playThePicture_index].name;
        carousel_name.style.color = img_list[playThePicture_index].color;

        // 第一步选择当前的圆点active类并清除
        const carousel_now_highlight = document.querySelector('.Carousel .highlight li.active');
        //错误写法 草！草！草！草！草！草！
        // const carousel_now_highlight = document.querySelector('.active');

        // 移除活动的类
        carousel_now_highlight.classList.remove('active');
         // 获取底部的圆点
        const carousel_highlight = document.querySelector(`.Carousel .highlight li:nth-child(${playThePicture_index + 1})`);
        // 添加一个活动用于高亮的类
        carousel_highlight.classList.add('active');
      }
      //封装定时器函数，每隔2秒切换图片
      function playThePicture(){
         // 直接调用切换图片的函数
         change_img();
        playThePicture_index++;
        //判断是否到最后一张，循环播放
        if(playThePicture_index >= img_list.length){
          playThePicture_index = 0;
        }
      }
      // 定时器，每隔2秒按顺序切换图片
      let carousel_timer = setInterval( playThePicture,2000);
      
      // 点击左右按钮切换图片
      //先获取左右箭头的DOM 对象
      const carousel_prev = document.querySelector('.Carousel .prev');
      const carousel_next = document.querySelector('.Carousel .next');
      // 点击左箭头
      carousel_prev.addEventListener('click',function(){
        playThePicture_index--;
        // 判断是否到第一张，循环播放
        if(playThePicture_index < 0){
          playThePicture_index = img_list.length - 1;
        }
        change_img();
      });
      // 点击右箭头 切换图片
      carousel_next.addEventListener('click',function(event){
        playThePicture_index++;
        // 判断是否到最后一张，循环播放
        if(playThePicture_index >= img_list.length){
          playThePicture_index = 0;
        }
        change_img();
      });
      //获取轮播图div版心
      const carousel_div = document.querySelector('.Carousel .wrapper');
      // 鼠标移入停止播放
      carousel_div.addEventListener('mouseenter',function(event){
        clearInterval(carousel_timer);

      });
      // 鼠标移出继续播放
      carousel_div.addEventListener('mouseleave',function(event){
        //先关再开好习惯
        clearInterval(carousel_timer);
        carousel_timer = setInterval( playThePicture,2000);
      });



      // 设置下banner区域鼠标移入切换图片的效果,此时的nodelist存入了所有的li标签
      const banner_img_a = document.querySelectorAll('.banner .left  li a');
      const banner_img_a_all_p = document.querySelectorAll('.banner .left  li a p');
      const banner_bg = document.querySelector('.banner');
      const banner_right = document.querySelector('.banner .right ');
      const banner_right_title = document.querySelector('.banner .right  h3');
      console.log(banner_img_a);
      console.log(banner_img_a_all_p);
      
      for(let i = 0;i < banner_img_a.length;i++){
        banner_img_a[i].addEventListener('mouseenter',function(event){
          // 先选择目前的active类
          const banner_img_a_active = document.querySelector('.banner .left .active');
          //清除颜色 去除类
          banner_img_a_active.style.color = '#fff';
          banner_img_a_active.classList.remove('active');
          // 给当前选择的li标签添加active类
          this.classList.add('active');
          // 更换图片
          const banner_bg_img = document.querySelector('.banner .wrapper ');
          banner_bg_img.style.backgroundImage = `url(${img_list[i].url})`;
          console.log('鼠标移入切换图片');

           // 更换文字颜色为角色主题色
           // 先清除所有颜色
           for(let j = 0;j < banner_img_a_all_p.length;j++){
            banner_img_a_all_p[j].style.color = '#fff';
          }
          const banner_img_a_p = document.querySelector(`.banner .left  li:nth-child(${i+1})  p`);
          banner_img_a_p.style.color = img_list[i].color;
          
          //banner主题一致
          banner_bg.style.backgroundColor = img_list[i].color;
          banner_right.style.backgroundColor = img_list[i].color;
          banner_right_title.innerHTML = img_list[i].name;
          });

          console.log('添加成功');
          
      }

