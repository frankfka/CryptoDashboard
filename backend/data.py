from flask import Flask
from flask import request as flask_req
from flask import jsonify
from flask_cors import CORS
import requests
import hmac
import hashlib
import time

# Library for interacting with exchanges
import ccxt

# Flask & CORS init
app = Flask(__name__)
cors = CORS(app)

# Static variables
TIME_PERIOD_DAY = 'day'
TIME_PERIOD_HR = "hour"
TIME_PERIOD_MIN = "minute"

'''
Helper functions
'''
def get_input_param(param_key):
    return flask_req.args.get(param_key).strip() #TODO validation?

def get_input_param_list(param_key):
    return flask_req.args.getlist(param_key)

def get_cryptocompare_req(url, payload=None):
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

'''Testing Endpoint'''
@app.route('/')
def test():
    return 'Hello world!'

'''
Gets top 100 tickers.
    key: Cryptocompare API Key
'''
@app.route('/cryptocompare/top')
def cryptocompare_all():
    cryptocompare_all_url = "https://min-api.cryptocompare.com/data/top/mktcapfull"
    resp = get_cryptocompare_req(cryptocompare_all_url, {'limit': 100, 'tsym': 'USD'})
    return resp.text, resp.status_code

'''
Gets historical price data.
    key: Cryptocompare API Key
    ticker: ticker to retrieve data for
    limit: # of data points to get 
'''
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

'''
Gets current prices in BTC and USD for a list of tickers.
    key: Cryptocompare API Key
    tickers: tickers to retrieve data for (should be less than 300)
'''
@app.route('/cryptocompare/prices')
def cryptocompare_prices():
    cryptocompare_prices_url = "https://min-api.cryptocompare.com/data/pricemulti"
    resp = get_cryptocompare_req(cryptocompare_prices_url)
    return resp.text, resp.status_code

'''
Gets latest news articles from Cryptocompare
    key: Cryptocompare API Key
'''
@app.route('/cryptocompare/news')
def cryptocompare_news():
    cryptocompare_news_url = "https://min-api.cryptocompare.com/data/v2/news/"
    resp = get_cryptocompare_req(cryptocompare_news_url)
    return resp.text, resp.status_code

'''
Gets 20 latest news articles from cryptopanic
    key: Cryptopanic API Key
'''
@app.route('/cryptopanic/news')
def cryptopanic_news():
    #TODO loop through the param page=2 , 3, etc to get more posts
    url = 'https://cryptopanic.com/api/v1/posts/'
    key = get_input_param('key')
    resp = requests.get(url, params={'auth_token': key, 'public': 'true'})
    return resp.text, resp.status_code

'''
Gets list of (non-zero) total balances in Binance portfolio
    key: Binance API Key
    secret: Binance API secret
'''
@app.route('/binance/portfolio')
def binance_portfolio():
    key = get_input_param('key')
    secret = get_input_param('secret')
    # Get total balances. This returns a dictionary with keys as tickers and values as amounts
    balances_dict = ccxt.binance({
        'apiKey': key,
        'secret': secret
    }).fetch_balance()['total']
    # Clean 0 balances
    clean_balances_dict = {ticker: amount for ticker, amount in balances_dict.items() if amount > 0}
    return jsonify(clean_balances_dict)


# Required for Flask
if __name__ == '__main__':
    app.run()