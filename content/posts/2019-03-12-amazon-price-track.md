---
title: Tracking Amazon Prices for Free
date: "2019-03-12T12:00:00.000Z"
template: "post"
usesKatex: true
draft: false
slug: "/blog/tracking-amazon-prices-for-free/"
img: "https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png"
category: "Automation"
tags:
  - "Automation"
  - "Selenium"
  - "Programming"
  - "Python"
description: How to use Python, GroupMe, and Google Cloud to track pricing changes on Amazon.
prev: "/blog/welcome-post/"
next: "/blog/best-room-in-cambridge-hall/"
---

The Problem:
------------

I want to be notified when a product on Amazon goes down in price. But the websites that do offer this service require $$ or have lots of restrictions.

The Plan:
---------
1.  Program a Python script that continuously tracks a webpage for any price changes
2.  Add a feature to be notified through a GroupMe chat bot.
3.  Have the program run on a Google Cloud Computing server for free
4.  Save $$

Python Programming:
-------------------

We're going to need a few things first.

1.  A good text editor. I'd recommend [Visual Studio Code](https://code.visualstudio.com/) (VSC)
2.  If you are not on a MacOS computer, download Python3
3.  Download the Python extension for VSC
4.  In the terminal window in VSC, type `pip install selenium`
5.  Download the chrome webdriver: [here](https://chromedriver.storage.googleapis.com/index.html?path=73.0.3683.20/)
6.  Unzip the file, and you should be good to go. If there are any problems on windows follow [this guide](http://jonathansoma.com/lede/foundations-2018/classes/selenium/selenium-windows-install/)

In order to track the elements on a website, we will be using Selenium & the ChromeDriver, but there are other options like bs4. 

### Create a new python file. It can be named anything, but just make sure you have the .py extension at the end

ex. amazon_price.py

### Importing Libraries:
```python
import requests
from selenium import webdriver
import selenium as se
from selenium.common.exceptions import NoSuchElementException  
import time
from time import sleep
from random import randint
```
### Setting Up Chrome Driver:
```python
options = se.webdriver.ChromeOptions()
```
### chrome is set to headless
```python
options.add_argument('headless')

driver = se.webdriver.Chrome(options=options)
```
### Getting the Web Page & Price:

Place Amazon product you want to track
```python
driver.get("https://www.amazon.com/Sony-Noise-Cancelling-Headphones-WH1000XM3/dp/B07G4MNFS1/ref=sr_1_2?crid=N5OCS4NJDH4M&keywords=sony+wh-1000xm3&qid=1551040801&s=gateway&sprefix=sony+%2Caps%2C120&sr=8-2")
```
### sets base price once
```python
global_base_price = driver.find_element_by_xpath('//*[@id="priceblock_ourprice"]').text
```
### Creating Check Changes Function:
```python
def check_change_by_xpath(xpath, base_price):
    try:
        # refreshes the page, finds the price
        # if the price changed, the current price is returned
        driver.refresh
        current_price = driver.find_element_by_xpath('//*[@id="priceblock_ourprice"]').text
        if current_price != base_price:
            return current_price
    except requests.exceptions.RequestException as e:
        sleep(60)
    return False
```
### The Loop:
```python
while True:
    current_state = check_change_by_xpath('//*[@id="priceblock_ourprice"]', global_base_price)
    print("curr state ", current_state)
    if current_state != False:
        global_base_price = current_state
    sleep(randint(3,5))
```
### Now we're done writting the Python script, let's try running it!

In terminal, `python3 name_of_file.py`

If everything worked out with no errors, lets move on to getting GroupMe setup.

GroupMe:
--------
Go to the GroupMe dev page [here](https://dev.groupme.com/), and have a Groupme account and make a group with only you in it.\
1. Click on the Bots tab -> login -> Create Bot 
2. Select a group, name the bot something, and you can leave the other fields blank
3. copy the bot id and you can copy and paste it into the code below: 
```python
post_params = { 'bot_id' : 'insert_botID_here', 'text': "your string response" }
        requests.post('https://api.groupme.com/v3/bots/post', params = post_params)
```
4. Place the cope snippet anywhere you want to send a message to your phone

Now Your Done!!!
----------------

For my version of the finished product go to my github [repository](https://github.com/peterchun2000/amazonBot)

