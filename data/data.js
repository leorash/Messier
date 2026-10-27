/* ============================================================
 *  M 天体题库数据（图片已本地化，路径相对于 index.html）
 *  维护说明：
 *  - 新增天体时，把图片放入 assets/images/，并在下方按同样格式
 *    追加一条记录；id 必须唯一。
 *  - info 字段为答题后展示的知识讲解，支持纯文本。
 * ============================================================ */

/* 主菜单三个模式的配图：留空 "" 则使用默认图标 */
window.CUSTOM_ICONS = {
    imageToKnowledge: "assets/images/M20.jpg",              // 看图识星
    nameToImage: "assets/images/M65-M66-NGC3628.png",       // 寻星索骥
    flashcards: "assets/images/M104.jpg"                    // 星空闪卡
};

/* M 天体数据源 */
window.MESSIER_DATA = [
    { id: "M1", name: "蟹状星云", url: "assets/images/M1.jpg", type: "超新星残骸", const: "金牛座", mag: "8.4", info: "著名的超新星遗迹，源于中国宋代天文学家记录的“天关客星”爆炸，中心包含一颗高速旋转的脉冲星。" },
    { id: "M6", name: "蝴蝶星团", url: "assets/images/M6.jpeg", type: "疏散星团", const: "天蝎座", mag: "4.2", info: "疏散的星群排列形状酷似一只展翅飞舞的蝴蝶，在夏季银河中不难辨认。" },
    { id: "M7", name: "托勒密星团", url: "assets/images/M7.jpg", type: "疏散星团", const: "天蝎座", mag: "3.3", info: "天空中最明亮、最巨大的疏散星团之一，早在公元130年就被古希腊天文学家托勒密肉眼观测并记录。" },
    { id: "M8", name: "礁湖星云", url: "assets/images/M8.jpg", type: "发射星云与疏散星团", const: "人马座", mag: "6", info: "外观有一条贯穿星云的暗带，形似被陆地环绕的浅水湖泊，是夏季银河中著名的恒星诞生区。" },
    { id: "M11", name: "野鸭星团", url: "assets/images/M11.jpg", type: "疏散星团", const: "盾牌座", mag: "6.3", info: "已知最密集、最紧凑的疏散星团之一，星群呈现的V字形排列让人联想到一群正在飞行的野鸭。" },
    { id: "M13", name: "武仙座球状星团", url: "assets/images/M13.jpg", type: "球状星团", const: "武仙座", mag: "5.8", info: "北半球天空中最明亮、最壮观的球状星团，包含数十万颗恒星，曾是1974年人类发送“阿雷西博信息”以寻找外星文明的目标。" },
    { id: "M16", name: "鹰星云", url: "assets/images/M16.jpg", type: "发射星云、电离氢区与疏散星团", const: "巨蛇座", mag: "6", info: "著名的恒星孕育场，哈勃空间望远镜拍摄的经典天体照片“创生之柱”就位于该星云的核心区域。" },
    { id: "M17", name: "天鹅星云", url: "assets/images/M17.jpg", type: "发射星云、电离氢区与疏散星团", const: "人马座", mag: "6", info: "它的形状既像在水面上游动的白天鹅，又像希腊字母Ω，是一个极其明亮且活跃的电离氢区。" },
    { id: "M20", name: "三裂星云", url: "assets/images/M20.jpg", type: "发射星云、电离氢区与疏散星团", const: "人马座", mag: "6.3", info: "它被暗星云的尘埃带分割成三个明显的发光区域，同时包含了红色发射星云、蓝色反射星云和暗星云三种形态，色彩对比极为鲜明。" },
    { id: "M22", name: "人马座星团", url: "assets/images/M22.jpg", type: "球状星团", const: "人马座", mag: "5.1", info: "天空中最明亮的球状星团之一，也是已知少数几个内部含有行星状星云的罕见球状星团。" },
    { id: "M24", name: "人马座恒星密集区", url: "assets/images/M24.png", type: "银河系恒星密集区", const: "人马座", mag: "4.6", info: "并非单一的星团或星云，而是银河系旋臂在星际尘埃缝隙中露出的壮丽恒星密集区，被称为“银河的窗户”。" },
    { id: "M27", name: "哑铃星云", url: "assets/images/M27.jpg", type: "行星状星云", const: "狐狸座", mag: "7.5", info: "它是人类历史上发现的第一个行星状星云，其外观呈现明显的双瓣结构，形似举重用的哑铃或一个吃了一半的苹果。" },
    { id: "M31", name: "仙女座星系", url: "assets/images/M31.jpg", type: "螺旋星系", const: "仙女座", mag: "3.4", info: "距离我们最近的大型螺旋星系，也是肉眼可见最遥远的天体之一，未来几十亿年后预计将与我们的银河系发生碰撞融合。" },
    { id: "M33", name: "三角座星系", url: "assets/images/M33.jpg", type: "螺旋星系", const: "三角座", mag: "5.7", info: "本星系群中第三大星系，因其盘面正面对着地球，是天文学家研究螺旋星系旋臂结构的绝佳观测目标。" },
    { id: "M42", name: "猎户座大星云", url: "assets/images/M42.jpg", type: "发射星云、电离氢区", const: "猎户座", mag: "4", info: "夜空中最明亮、肉眼最容易观测到的发射星云，犹如一只展翅的火鸟，是距离我们最近的大型恒星孕育场。" },
    { id: "M44", name: "蜂巢星团/鬼星团", url: "assets/images/M44.jpg", type: "疏散星团", const: "巨蟹座", mag: "3.7", info: "中国古代被称为“积尸气”，是一个非常古老的疏散星团，肉眼看去像一团模糊的星光，形似蜂巢。" },
    { id: "M45", name: "昴宿星团", url: "assets/images/M45.jpg", type: "疏散星团", const: "金牛座", mag: "1.6", info: "夜空中最著名的疏散星团之一，肉眼通常能清晰地看到六到七颗亮星，周围被迷人的蓝色反射星云所环绕。" },
    { id: "M51", name: "涡状星系", url: "assets/images/M51.jpg", type: "螺旋星系", const: "猎犬座", mag: "8.4", info: "拥有非常完美且醒目的螺旋旋臂结构，并且可以清晰观测到它正在与其伴星系NGC 5195发生着强烈的引力相互作用。" },
    { id: "M57", name: "指环星云", url: "assets/images/M57.jpg", type: "行星状星云", const: "天琴座", mag: "8.8", info: "外观像一个多彩的烟圈或彩色甜甜圈，是行星状星云最经典、最著名的代表天体之一。" },
    { id: "M63", name: "向日葵星系", url: "assets/images/M63.jpg", type: "螺旋星系", const: "猎犬座", mag: "9.3", info: "由众多紧密缠绕的螺旋臂组成，整体外观呈现出斑驳的絮状，看起来非常像一朵盛开的葵花。" },
    { id: "M64", name: "黑眼星系", url: "assets/images/M64.jpg", type: "螺旋星系", const: "后发座", mag: "9.4", info: "核心极其明亮，但在其前方有一条非常厚重、醒目的半环形暗尘埃带，仿佛一只被打青了的“黑眼圈”。" },
    { id: "M65、M66和NGC3628", name: "狮子座三重奏", url: "assets/images/M65-M66-NGC3628.png", type: "螺旋星系", const: "狮子座", mag: "8.9-10.3", info: "包含NGC3628、M66和M65。它们都是大型旋涡星系，因面朝我们的方向不同而形态迥异。NGC 3628也称汉堡星系(侧视)，而M66和M65有明显倾角展示旋涡。" },
    { id: "M76", name: "小哑铃星云", url: "assets/images/M76.jpg", type: "行星状星云", const: "英仙座", mag: "10.1", info: "梅西耶天体中最暗、最难观测的一个，因形状与M27相似但尺寸更小、更暗淡，故得名小哑铃星云。" },
    { id: "M77", name: "鲸鱼A星系", url: "assets/images/M77.jpg", type: "棒旋星系", const: "鲸鱼座", mag: "9.6", info: "是一个非常活跃的赛弗特星系（活动星系核），其中心隐藏着一个超大质量黑洞，并释放出强烈的射电辐射。" },
    { id: "M78", name: "鬼马小精灵星云", url: "assets/images/M78.jpg", type: "反射星云", const: "猎户座", mag: "8.3", info: "夜空中最明亮的反射星云之一，在照片中仿佛是两个发光的眼睛从黑暗的尘埃云中探出，形似卡通里的幽灵或晴天娃娃。" },
    { id: "M81", name: "波德星系", url: "assets/images/M81.jpg", type: "螺旋星系", const: "大熊座", mag: "6.9", info: "大熊座中最明亮的螺旋星系之一，拥有极其完美、对称的经典“宏象旋臂”结构。" },
    { id: "M82", name: "雪茄星系", url: "assets/images/M82.jpg", type: "星暴星系", const: "大熊座", mag: "8.4", info: "受到旁边M81巨大引力拉扯的影响，它是一个正在经历剧烈恒星爆发的星暴星系，核心区域向外垂直喷发着巨大的红色氢气流。" },
    { id: "M83", name: "南风车星系", url: "assets/images/M83.jpg", type: "棒旋星系", const: "长蛇座", mag: "7.5", info: "不仅拥有壮丽的正面棒旋结构，而且还是发现超新星爆发频率最高的星系之一，常被称为“千个红宝石星系”。" },
    { id: "M87", name: "室女A星系", url: "assets/images/M87.jpg", type: "椭圆星系", const: "室女座", mag: "9.6", info: "室女座星系团的中心巨型椭圆星系，拥有一道长达数千光年的高能等离子体喷流，也是人类史上首张黑洞照片的拍摄目标诞生地。" },
    { id: "M97", name: "猫头鹰星云", url: "assets/images/M97.jpg", type: "行星状星云", const: "大熊座", mag: "9.9", info: "圆形的星云盘面上有两个相对暗淡的空洞，看起来酷似猫头鹰的两只大眼睛，是一个特征非常鲜明的行星状星云。" },
    { id: "M101", name: "风车星系", url: "assets/images/M101.jpg", type: "螺旋星系", const: "大熊座", mag: "7.9", info: "正面对着地球的大型螺旋星系，由于其分布面积广且旋臂明显不对称，看起来像一个巨大的转动风车。" },
    { id: "M104", name: "墨西哥草帽星系", url: "assets/images/M104.jpg", type: "螺旋星系", const: "室女座", mag: "9", info: "拥有一个极其明亮且巨大的核心隆起，并且在赤道盘面上有一条非常明显的暗尘埃带贯穿，侧面看极像一顶宽边墨西哥草帽。" }
];
