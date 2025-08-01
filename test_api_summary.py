import requests

response = requests.get('http://127.0.0.1:5000/api/summary')
print('Status code:', response.status_code)
print('Response text:', response.text)
print('Response JSON:', response.json())
