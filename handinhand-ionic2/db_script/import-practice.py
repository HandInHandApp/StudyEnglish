import leancloud
import json
from pprint import pprint


leancloud.init("Eul6rG90rOjIO5imP853JOmn-gzGzoHsz", "XdmDTh1MQGHCYrJjp1B5Jyh1")

FILE_PATH = '../src/assets/data/exercise/practise-10001.json'
# read json file
with open(FILE_PATH) as json_file:
    json_data = json.load(json_file)

    # import material 
    json_m = json_data['material']
    Material = leancloud.Object.extend('Material')
    material = Material()
    material.set("id",json_m['id'])
    material.set("domain",json_m['domain'])
    material.set("title",json_m['title'])
    material.set("content",json_m['content'])
    material.save()

    # import qestion 
    json_qs = json_data['question']
    for json_q in json_qs:
        qid = str(json_q['id']) if (json_q['id']>9) else '0'+str(json_q['id'])
        Question = leancloud.Object.extend('Question') 
        question = Question()
        question.set('id',int(str(json_m['id'])+qid))
        question.set('type',json_q['type'])
        question.set('level',json_q['level'])
        question.set('title',json_q['title'])
        question.set('anchor',json_q['anchor'])
        question.set('choice',json_q['choice'])
        question.set('material',material)
        question.save()


