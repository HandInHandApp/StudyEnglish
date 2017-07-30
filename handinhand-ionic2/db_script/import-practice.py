import leancloud

leancloud.init("Eul6rG90rOjIO5imP853JOmn-gzGzoHsz", "XdmDTh1MQGHCYrJjp1B5Jyh1")

TestObject = leancloud.Object.extend('TestObject')
test_object = TestObject()
test_object.set('foo', "bar")
test_object.save()