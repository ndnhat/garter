##GARTER

![Screenshot](http://ndnhat.github.io/garter/images/dashboard.png)

### Introduction
Google Analytics web interface does not allow users to monitor realtime traffic from multiple Google Analytics profiles on a single screen. Garter was created in hope to alleviate this problem. 


### Setup

```
git clone https://github.com/ndnhat/garter.git
cd garter
npm install
npm start
```
Garter requires a number of environment variables:
```
GA_USER=your_google_analytics_username
GA_PASSWORD=your_google_analytics_password
GA_PROFILE_IDS=comma_separated_profile_ids
GA_PROFILE_NAME=comma_separated_profile_names
```

In addition, the "Per User Limit" setting for Analytics API in [Google Developers Console](https://console.developers.google.com) may need to be increased. It is recommended to change the limit to 10 requests/second/user. 

Google also imposes a 50,000 requests/day for most Analytics API developers. By default, Garter will query the Google Analytics API once every minute for each profile id provided, which translates to 1440 requests/profile/day. 

### Credits
Garter is made possible by a number of great open-source tools:

* [expressjs](http://expressjs.com)
* [highcharts](http://www.highcharts.com/)
* [googleanalytics](https://github.com/ncb000gt/node-googleanalytics)
