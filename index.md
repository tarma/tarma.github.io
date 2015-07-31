---
layout: page
title: Hello world!
---
{% include JB/setup %}

{% for post in site.posts %}
### [{{ post.title }}]({{ BASE_PATH }}{{ post.url }})
> {{ post.description }}

Date: {{ post.date | date_to_string }}

* * *
{% endfor %}

