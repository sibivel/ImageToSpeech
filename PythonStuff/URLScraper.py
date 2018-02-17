import requests
import urllib.request
from bs4 import BeautifulSoup

def URLScraper(url):
    sources = []
    request = requests.get(url)
    html_content = request.text
    soup = BeautifulSoup(html_content, 'html.parser')
    images = soup.find_all('img')
    for image in images:
        sources.append(image['src'])
    return sources

if __name__ == "__main__":
    print(URLScraper("http://yahoo.com"))