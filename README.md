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
GOOGLE_APPLICATION_CREDENTIALS=your_google_application_credentials
GOOGLE_APPLICATION_SCOPES=https://www.googleapis.com/auth/analytics.readonly
GA_EMAIL=your_google_service_account_email
GA_PROFILE_IDS=comma_separated_profile_ids
GA_PROFILE_NAMES=comma_separated_profile_names
DEBUG=garter
```

In addition, the "Per User Limit" setting for Analytics API in [Google Developers Console](https://console.developers.google.com) may need to be increased. It is recommended to change the limit to 10 requests/second/user. 

Google also imposes a 50,000 requests/day for most Analytics API developers. By default, Garter will query the Google Analytics API once every minute for each profile id provided, which translates to 1440 requests/profile/day. 

### Credits
Garter is made possible by a number of great open-source tools:

* [expressjs](http://expressjs.com)
* [highcharts](http://www.highcharts.com/)
* [googleapis](https://github.com/google/google-api-nodejs-client/)
