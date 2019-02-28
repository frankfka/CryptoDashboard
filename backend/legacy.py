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