## 说明
> 本组件为nvue组件，必须在nvue页面！主要功能是视频拍摄、视频添加背景音乐

## 使用方法

```
<videoEdit ref="videoEditRefs" :params="params" @finish="finish" ></videoEdit>

import videoEdit from '@/components/videoEdit/index'
components: { videoEdit }
```

#### 传递参数params（Object）
参数 | 类型  | 默认值 | 说明
---|---|---|---
ptdata   |String | |透传参数传啥返啥，业务需要就写上
serverUrl| String  |  | 服务器地址，现应用于音乐服务器
token | String  |  |接口token，现用于自己音乐服务器交互，根据自己音乐接口处理；没有传空值
maxDuration | number | 60 | 最长拍摄时间(秒)
minDuration | number | 7 | 最短录制时间(秒)
setTip | String | 拍摄90秒 | 设置拍摄按钮下部提示文字
camera | String | back | 设置打开时默认前置或后置摄像头, 后置摄像头：back，前置摄像头：first

#### ref事件
事件 | 说明
---|---
startRecored| 打开拍摄功能

```
this.$refs.videoEditRefs.startRecored()
```

#### 事件
事件 | 说明
---|---
finish| 返回视频信息

#### 取消拍摄时返回Object
字段 | 类型  | 说明
---|---|---
ptdata   |String |透传参数传啥返啥，业务需要就写上
code     |number | 取消拍摄的状态码：1001

#### 返回视频信息Object
字段 | 类型  | 说明
---|---|---
ptdata   |String|透传参数传啥返啥，业务需要就写上
videoPath|String |视频路径
cover	  |String |封面路径
duration |number|视频时长,单位为秒,视频时长通常不会少于最短录制时间	
width	  |number  |视频分辨率宽度	
height   |number|视频分辨率高度	
type	  |number	|视频是拍摄还是导入的，1.拍摄 2.导入
length	  |number    |视频文件大小，单位为字节	   



---

## 添加音乐相关接口
#### 5.1 推荐歌曲
#### api: /Video/Song/recommendSongs

参数名字	|	类型|	是否必须	|说明
--|:--:|:--|:--
number	|	int	|否	|推荐歌曲个数

返回字段	|类型	|说明
--|:--:|--
id	|int	|歌曲id
name	|String	|歌曲名
singer	|String	|歌手
duration	|int	|歌曲时长,单位为秒
cover	|String	|歌曲封面


### 5.2 歌曲列表
#### api： /Video/Song/newSongs
描述：可以自定义排序规则

参数名字	|	类型|	是否必须	|说明
--|:--:|:--|:--
page		|int|否	|当前页|
pagesize	|int|否	|每页加载数量，默认20	|

返回字段	|类型	|说明
--|:--:|--
id			|int	|歌曲id				|
name		|String	|歌曲名				|
singer		|String	|歌手				|
duration	|int	|歌曲时长,单位为秒	|
cover		|String	|歌曲封面			|


### 5.3 搜索歌曲
#### api： /Video/Song/searchSong
描述：可以自定义排序规则

参数名字	|	类型|	是否必须	|说明
--|:--:|:--|:--
name		|String	|是	|搜索歌曲关键词			|
page		|int	|否	|当前几页|
pagesize	|int	|否	|每页加载数量，默认20	|

返回字段	|类型	|说明
--|:--:|--
id			|int	|歌曲id				|
name		|String	|歌曲名				|
singer		|String	|歌手				|
duration	|int	|歌曲时长,单位为秒	|
cover		|String	|歌曲封面			|


### 5.4 下载歌曲
#### api： /Video/Song/downloadSong
描述：可以自定义排序规则

参数名字	|	类型|	是否必须	|说明
--|:--:|:--|:--
songId	|int	|是	|歌曲id|


返回字段	|类型	|说明
--|:--:|--
无	|Binary	|整个返回数据只有歌曲二进制内容，无通用返回格式

