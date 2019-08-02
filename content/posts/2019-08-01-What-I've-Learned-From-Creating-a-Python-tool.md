---
title: "What I've Learned From Creating a Python Tool"
date: "2019-08-01T12:00:00.000Z"
template: "post"
usesKatex: true
draft: false
slug: "/blog/learned-from-creating-a-tool/"
img: "https://www.provost.umd.edu/images/UMDAerial.jpg"
category: "Programming"
tags:
  - "Tips"
  - "Programming"
  - "Web Development"
description: Let me tell you what I've learned from creating something useful from start to finish.
prev: "/blog/tracking-amazon-prices-for-free/"
next: "/blog/how-to-make-the-most-of-your-summer/"
---

## Background:

​	  As I was nearing the end of my research assistant job, I was tasked with "coding "some interview data. "Coding" in qualitative research isn't about programming, but rather placing theme/sub-themes beside relevant text (usually an interview transcript). However, when you have tens of different themes in one interview and hundreds more across multiple interviews, it can get pretty hectic. For my particle research group, we used google docs or Microsoft word to place comments next to text as our "coding".

​	  I came up with the idea for the user to upload a file or multiple file and have a python program count the number of times a theme came up and display that in a nice pretty table.

## The Process

​	  This was the first project in which I intended to be used by non-technically literate people. So that meant no command line programs. I actually had to make a UI. However, I didn't design the program surrounding around this principle. Instead, I wanted to create an MVP (Minimal Viable Product), which is essentially just a prototype. 

​	  I had to first figure out how I was going to extract the comments from a Google .docx or .doc file. Well, you can't. But what you can do is download the file as a .html from Google Docs, which contains all the comments with anchor links attaching the comment to the associated text. This kind of made me happy, because I could use beautiful soup (bs4) to parse through the html file, which I've had plenty of experience with. So, I began my journey of figuring out the structure of the html file. 

​	  One of the first things I noticed was that each file named their comment span's class differently; it would be c6 in one file and c8 in another. Fortunately, the anchor tag neighboring the span contained an id that had the same format across all files, "cmnt**#**". BOOOM! Now, I'm in business!

```html
<p class="c7">
  <a href="#cmnt_ref2" id="cmnt2">[b]</a>
  <span class="c6">Pre-College: Educational background</span>
</p>
```

I was now able to grab each individual comment and the text associated with it. Next step was to do what I do best and program til I want to gouge my eyes out. 



### Fuzzy String Matcher

​	  One of the principles that I **did** have in mind from the beginning was for the program to automatically take care of formatting and spelling. This was something I was most worried about, since everyone seemed to have a different way of formatting their comments and some would use abbreviations for words like community college (CC). 

​	  Luckily, after doing a bit of research I found out about fuzzy string matching, which took care of my spelling problem. However, some comments may look like this:

```html
Student Factors: motivation (intrinsic) 
```

Or 

```html
Student Factors: motivation intrinsic 
```

Or 

```html
Student Factors motivation intrinsic 
```

This possess a problem because, simple fussy string matching snippets only work for comparisons like:

```python
presentation <==> presntions 
```

​	  They can't find matching words within a larger body of text. So if I just wanted to check if the comment contained the word "motivation", I'd have to do some string manipulation to isolate just that word, which is pretty hard when everyone uses a different format: colon between the main theme, parentheses, lack of main theme, etc. 

​	  So, the better option would be to use a more complex fuzzy string matcher that went through each group of letters in a body of text and make multiple checks per comment. For reference this is the code I used:

```python
def fuzzy_finder(needle, hay):
    needles = needle.split('|')  
    overall_max_sim_val = 0
    
    for nddle in needles:
        needle_length  = len(nddle.split())
        max_sim_val    = 0
        max_sim_string = u""

        for ngram in ngrams(hay.split(), needle_length + int(.2*needle_length)):
            hay_ngram = u" ".join(ngram)
            similarity = SM(None, hay_ngram, nddle).ratio() 
            if similarity > max_sim_val:
                max_sim_val = similarity
                max_sim_string = hay_ngram

                if max_sim_val >= overall_max_sim_val:
                    overall_max_sim_val = max_sim_val
    return max_sim_val
```



Your probably wondering what this does:

```python
needles = needle.split('|')  
```



Well I guess this would be a good transition into how I structured my data. 

### Data Structure





