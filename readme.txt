1、安装node_modules的过程中出现的红色提示是没有问题的，$ cnpm install
2、schrmas文件夹原本用来保存数据模式的文件，现在将数据模式直接放到models中，直接进行实例化。
3、应用Handelbars模版引擎。
4、利用软件usr-tcp232-test来模拟上传数据，使用的ip和端口都与程序一样。
   关键中的关键就是要算好上传的content-length的长度，如果出现长度的计算数值与实际的上传的数据不一样，就会出现读不到数据的情况。


   POST http://10.8.208.180:3000/testStream/dataValue HTTP/1.1
   Host: localhost:3000
   Connection: keep-alive
   Content-Length: 78
   Cache-Control: max-age=0
   Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
   Origin: http://10.8.208.180:3000
   Upgrade-Insecure-Requests: 1
   User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53
   Content-Type: application/x-www-form-urlencoded
   Referer: http://10.8.208.180:3000/dataPointUploadTest
   Accept-Encoding: gzip, deflate
   Accept-Language: zh-CN,zh;q=0.8
   Cookie: connect.sid=s%3A0AgmDmNGewyXhJ-EK4DmoKpTHHExdPdb.PASDcZ4AHhlnK8wIs%2BppIBMgcKwS6LVE3GJ7y0Kibgo

   dataStream%5Bvalue%5D=50&dataStream%5BdataPointKey%5D=568f48b6d2100c1c09d2ad68

这样写是能上传的，不过应该可以省略一些内容不然，上传的数据就太多了，不便于实际的使用。

5、视图文件按文件夹分类，文件名统一以分隔符 - 来分割。

6、Error:Can't canonicalize query: BadValue Unsupported projection option 有问题

7、遇到问题，使用mongoVUE的时候遇到：“MongoDB.Bson.ObjectId”的类型初始值设定项引发异常。的问题
   