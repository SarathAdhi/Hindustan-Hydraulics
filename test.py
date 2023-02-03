import requests

url = "https://api.clashofclans.com/v1/clans/%232G2P8LY2J/members"

payload={}
headers = {
  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjgwZDAxMTVhLThkZDctNGFiYS04YzcwLWE0ZWIzYWZmMzY2MSIsImlhdCI6MTY3NDA2MTQ2NCwic3ViIjoiZGV2ZWxvcGVyLzM0N2VkNWU5LTFhMzktMThiYS0zODM3LTU4MDg2NzZkMDQ5YyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEyMi4xODcuMTE3LjE3OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.AyOsP1DMKNHtK2F8lILOvjR_Rl-2OfH5msniMaPbdzrycjY0dl-ZtsU5v3IDkx-w_bnzIhnWnjo9qh48RUHiCw'
}

response = requests.request("GET", url, headers=headers, data=payload)

data = response.json()
tag = []

for i in data['items']:
    tag.append(i['tag'])



