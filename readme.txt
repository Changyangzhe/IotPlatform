1、安装node_modules的过程中出现的红色提示是没有问题的，$ cnpm install
2、schrmas文件夹原本用来保存数据模式的文件，现在将数据模式直接放到models中，直接进行实例化。
3、应用Handelbars模版引擎。
4、利用软件usr-tcp232-test来模拟上传数据，使用的ip和端口都与程序一样。
   关键中的关键就是要算好上传的content-length的长度，如果出现长度的计算数值与实际的上传的数据不一样，就会出现读不到数据的情况。

测试数据上传
POST http://localhost:3000/testStream/dataValue HTTP/1.1
Host: localhost:3000
Connection: keep-alive
Content-Length: 78
Cache-Control: max-age=0
Origin: <http://localhost:3000>
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2783.4 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: <http://localhost:3000/dataPointUploadTest>
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8
Cookie: connect.sid=s%3ASJIwjRvD0za49Pg9m-t-usMkDj7lageF.1xV5MAKSso2o6FcX01akfr008kkLSSRAOyEhGj8VAnE

dataStream%5Bvalue%5D=88&dataStream%5BdataPointKey%5D=577907c5d7e8982c10357ec2


简化如下：
POST /testStream/dataValue HTTP/1.1
Host: localhost:3000
Content-Length: 78
Content-Type: application/x-www-form-urlencoded

dataStream%5Bvalue%5D=88&dataStream%5BdataPointKey%5D=577907c5d7e8982c10357ec2

不同的编码方式，其实这两种都可以再简化

POST /devices/55/data-points?jquery=555 HTTP/1.1
Host: 10.8.207.185:3000
Content-Length: 47
Content-Type: application/x-www-form-urlencoded; charset=UTF-8

dataPointKey=5779f94bb6a50ab809ee5a1a&value=100


多条数据的上传
POST /devices/55/data-points?jquery=555 HTTP/1.1
Host: 10.8.207.185:3000
Content-Length: 189
Content-Type: application/x-www-form-urlencoded; charset=UTF-8

dataStreams%5B0%5D%5BdataPointKey%5D=5779f94bb6a50ab809ee5a1a&dataStreams%5B0%5D%5Bvalue%5D=29&dataStreams%5B1%5D%5BdataPointKey%5D=5779fb2cb6a50ab809ee5e81&dataStreams%5B1%5D%5Bvalue%5D=39




这样写是能上传的，不过应该可以省略一些内容不然，上传的数据就太多了，不便于实际的使用。

5、视图文件按文件夹分类，文件名统一以分隔符 - 来分割。

6、Error:Can't canonicalize query: BadValue Unsupported projection option 有问题

7、遇到问题，使用mongoVUE的时候遇到：“MongoDB.Bson.ObjectId”的类型初始值设定项引发异常。的问题。

8、在上传数据的时候，每次上传成功就会刷新页面，这里需要做改进，以保证每次上传的时候返回的是一个标志上传正确与否的状态。不能返回一个页面。数据接收方式也应该改成json形式。