from flask import Flask
from flask import request as flask_req
from flask_cors import CORS
import requests
import hmac
import hashlib
import time

app = Flask(__name__)
cors = CORS(app)

TIME_PERIOD_DAY = 'day'
TIME_PERIOD_HR = "hour"
TIME_PERIOD_MIN = "minute"

def get_input_param(param_key):
    return flask_req.args.get(param_key).strip() #TODO validation?

def get_cryptocompare_req(url, payload):
    # Get key from incoming request
    key = get_input_param('key')
    headers = {'authorization': 'Apikey ' + key}
    return requests.get(url, headers=headers, params=payload)

def get_cryptocompare_histo_req(time_range):
    url = 'https://min-api.cryptocompare.com/data/histoday' # Default to day
    if time_range == TIME_PERIOD_DAY:
        url = 'https://min-api.cryptocompare.com/data/histoday'
    elif time_range == TIME_PERIOD_HR:
        url = 'https://min-api.cryptocompare.com/data/histohour'
    elif time_range == TIME_PERIOD_MIN:
        url = 'https://min-api.cryptocompare.com/data/histominute'
    # Get params
    num_datapoints = flask_req.args.get('limit') #TODO validation?
    ticker = flask_req.args.get('ticker')
    return get_cryptocompare_req(url, {'fsym': ticker, 'tsym': 'USD', 'limit': num_datapoints})

@app.route('/')
def test():
    return 'Hello world!'

@app.route('/cryptocompare/top')
def cryptocompare_all():
    cryptocompare_all_url = "https://min-api.cryptocompare.com/data/top/mktcapfull"
    resp = get_cryptocompare_req(cryptocompare_all_url, {'limit': 100, 'tsym': 'USD'})
    return resp.text, resp.status_code

@app.route('/cryptocompare/histoday')
def cryptocompare_histoday():
    resp = get_cryptocompare_histo_req(TIME_PERIOD_DAY)
    return resp.text, resp.status_code

@app.route('/cryptocompare/histohour')
def cryptocompare_histohour():
    resp = get_cryptocompare_histo_req(TIME_PERIOD_HR)
    return resp.text, resp.status_code

@app.route('/cryptocompare/histominute')
def cryptocompare_histominute():
    resp = get_cryptocompare_histo_req(TIME_PERIOD_MIN)
    return resp.text, resp.status_code

@app.route('/cryptopanic/news')
def cryptopanic_news():
    #TODO loop through the param page=2 , 3, etc to get more posts
    url = 'https://cryptopanic.com/api/v1/posts/'
    key = get_input_param('key')
    resp = requests.get(url, params={'auth_token': key, 'public': 'true'})
    return resp.text, resp.status_code

@app.route('/binance/portfolio')
def binance_portfolio():
    url = 'https://api.binance.com/api/v3/account'
    key = get_input_param('key')
    secret = get_input_param('secret')
    curr_time_unix = str(int(time.time()*1000))
    query_string = 'timestamp=' + curr_time_unix
    hmac_string = hmac.new(bytes(secret, 'latin-1'), msg=bytes(query_string, 'latin-1'), digestmod=hashlib.sha256).hexdigest()
    headers = {'X-MBX-APIKEY': key}
    resp = requests.get(url, headers=headers, params={'timestamp': curr_time_unix, 'signature': hmac_string})
    return resp.text, resp.status_code

if __name__ == '__main__':
    app.run()