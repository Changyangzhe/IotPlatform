1����װnode_modules�Ĺ����г��ֵĺ�ɫ��ʾ��û������ģ�$ cnpm install
2��schrmas�ļ���ԭ��������������ģʽ���ļ������ڽ�����ģʽֱ�ӷŵ�models�У�ֱ�ӽ���ʵ������
3��Ӧ��Handelbarsģ�����档
4���������usr-tcp232-test��ģ���ϴ����ݣ�ʹ�õ�ip�Ͷ˿ڶ������һ����
   �ؼ��еĹؼ�����Ҫ����ϴ���content-length�ĳ��ȣ�������ֳ��ȵļ�����ֵ��ʵ�ʵ��ϴ������ݲ�һ�����ͻ���ֶ��������ݵ������


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

����д�����ϴ��ģ�����Ӧ�ÿ���ʡ��һЩ���ݲ�Ȼ���ϴ������ݾ�̫���ˣ�������ʵ�ʵ�ʹ�á�

5����ͼ�ļ����ļ��з��࣬�ļ���ͳһ�Էָ��� - ���ָ

6��Error:Can't canonicalize query: BadValue Unsupported projection option ������

7���������⣬ʹ��mongoVUE��ʱ����������MongoDB.Bson.ObjectId�������ͳ�ʼֵ�趨�������쳣��������
   