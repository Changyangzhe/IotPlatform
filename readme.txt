1����װnode_modules�Ĺ����г��ֵĺ�ɫ��ʾ��û������ģ�$ cnpm install
2��schrmas�ļ���ԭ��������������ģʽ���ļ������ڽ�����ģʽֱ�ӷŵ�models�У�ֱ�ӽ���ʵ������
3��Ӧ��Handelbarsģ�����档
4���������usr-tcp232-test��ģ���ϴ����ݣ�ʹ�õ�ip�Ͷ˿ڶ������һ����
   �ؼ��еĹؼ�����Ҫ����ϴ���content-length�ĳ��ȣ�������ֳ��ȵļ�����ֵ��ʵ�ʵ��ϴ������ݲ�һ�����ͻ���ֶ��������ݵ������

���������ϴ�
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


�����£�
POST /testStream/dataValue HTTP/1.1
Host: localhost:3000
Content-Length: 78
Content-Type: application/x-www-form-urlencoded

dataStream%5Bvalue%5D=88&dataStream%5BdataPointKey%5D=577907c5d7e8982c10357ec2

��ͬ�ı��뷽ʽ����ʵ�����ֶ������ټ�

POST /devices/55/data-points?jquery=555 HTTP/1.1
Host: 10.8.207.185:3000
Content-Length: 47
Content-Type: application/x-www-form-urlencoded; charset=UTF-8

dataPointKey=5779f94bb6a50ab809ee5a1a&value=100


�������ݵ��ϴ�
POST /devices/55/data-points?jquery=555 HTTP/1.1
Host: 10.8.207.185:3000
Content-Length: 189
Content-Type: application/x-www-form-urlencoded; charset=UTF-8

dataStreams%5B0%5D%5BdataPointKey%5D=5779f94bb6a50ab809ee5a1a&dataStreams%5B0%5D%5Bvalue%5D=29&dataStreams%5B1%5D%5BdataPointKey%5D=5779fb2cb6a50ab809ee5e81&dataStreams%5B1%5D%5Bvalue%5D=39




����д�����ϴ��ģ�����Ӧ�ÿ���ʡ��һЩ���ݲ�Ȼ���ϴ������ݾ�̫���ˣ�������ʵ�ʵ�ʹ�á�

5����ͼ�ļ����ļ��з��࣬�ļ���ͳһ�Էָ��� - ���ָ

6��Error:Can't canonicalize query: BadValue Unsupported projection option ������

7���������⣬ʹ��mongoVUE��ʱ����������MongoDB.Bson.ObjectId�������ͳ�ʼֵ�趨�������쳣�������⡣

8�����ϴ����ݵ�ʱ��ÿ���ϴ��ɹ��ͻ�ˢ��ҳ�棬������Ҫ���Ľ����Ա�֤ÿ���ϴ���ʱ�򷵻ص���һ����־�ϴ���ȷ����״̬�����ܷ���һ��ҳ�档���ݽ��շ�ʽҲӦ�øĳ�json��ʽ��