#!python
import requests
import time
import sys
import os

url = 'http://127.0.0.1:3000/ctrl/donation/add'
#url = 'https://v1.l2market.app/ctrl/donation/add'

if len(sys.argv) < 3:
    print('USAGE: %s <amount> <name>' % (sys.argv[0],));
    sys.exit()

if 'L2MARKET_API_KEY' not in os.environ:
    print('error: Environment variable L2MARKET_API_KEY not set');
    sys.exit()

obj={
    'amount': round(float(sys.argv[1]), 2),
    'name': ' '.join(sys.argv[2:]),
    'createdAt': int(time.time())
}
res = requests.post(url, json=obj, headers={'content-type':'application/json', 'x-api-token':os.environ['L2MARKET_API_KEY']})
print(res.status_code)
