import requests
import json
import openai
OPENAI_API_KEY = "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"
# openai.organization = "org-BHQXyPnwJp3y0jfJ8OS3KDrT"
# openai.api_key = OPENAI_API_KEY
# openai.Model.list()

url = "https://api.openai.com/v1/chat/completions"

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + OPENAI_API_KEY
}

data = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "今天是周几"}],
    "temperature": 0.7
}

response = requests.post(url, headers=headers, data=json.dumps(data))
result = response.json()

# 处理响应结果
print(result)
