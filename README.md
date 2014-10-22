##GARTER

### Introduction
Google Analytics web interface does not allows users to monitor realtime traffic from multiple Google Analytics profiles on a single screen. I created Garter in hope to alleviate this problem. 


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

In addition, you may need to go to the [Google Developers Console](https://console.developers.google.com) to increase the Analytics API setting for "Per User Limit". I recommend changing the limit to 10 requests/second/user. 

Google also impose a 50,000 requests/day for most Analytics API developers so please keep that in mind. By default, Garter will query the Google Analytics API once every minute for each profile id provided which translates to 1440 requests/profile/day. 

### Credits
Garter is made possible by a number of great open-source tools:

* [expressjs](http://expressjs.com)
* [highcharts](http://www.highcharts.com/)
* [node-googleanalytics](https://github.com/ncb000gt/node-googleanalytics)
