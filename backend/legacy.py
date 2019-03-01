@app.route('/binance/portfolio_old')
def binance_portfolio_old():
    url = 'https://api.binance.com/api/v3/account'
    key = get_input_param('key')
    secret = get_input_param('secret')
    curr_time_unix = str(int(time.time()*1000))
    query_string = 'timestamp=' + curr_time_unix
    hmac_string = hmac.new(bytes(secret, 'latin-1'), msg=bytes(query_string, 'latin-1'), digestmod=hashlib.sha256).hexdigest()
    headers = {'X-MBX-APIKEY': key}
    resp = requests.get(url, headers=headers, params={'timestamp': curr_time_unix, 'signature': hmac_string})
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