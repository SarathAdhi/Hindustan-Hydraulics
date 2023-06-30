# import requests
# import random
# import json


# doc_type = ["so_no", "proforma_no", "dc_no", "uhp_dc_no", "sam_dc_no"]
# store = ["smc", "general", "instrumentation", "hydraulics", "hose"]
# supply = ['part','full']
# routing = [
#     "transport",
#     "travel",
#     "courier",
#     "hand_delivery",
#     "auto",
#     "from_uhp",
#     "from_sam",
#     "branch_office",
# ]

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMTMxYjgwNjZiMGFiNDg1ZTlkOTJmYWI1YzliZjYyMmIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODgxMDQzMjcsImV4cCI6MTY4ODE5MDcyN30.LCQxJstzNrnPASGsMfSsfCCGNMBWlXWT5AkZr6L-K_c",
}


# for i in range(50):

#     doc_no = f"SO NO.2022-23/45{i + 1}"
#     po_no = f"PO NO/{i + 1}"
#     read_to_bill_index = i%2
#     for j in range(5):
#         payload = {
#             "store": random.choice(store),
#             "doc_type": doc_type[i%5],
#             "doc_no": doc_no,
#             "doc_date": "2033-05-3",
#             "po_no": po_no,
#             "po_date": "2023-06-25",
#             "supply": random.choice(supply),
#             "customer_name": "Zuva Labs",
#             "ready": True,
#             "ready_to_bill": random.choice([True, False])
#         }
#         payload = json.dumps(payload)

#         url = "http://127.0.0.1:4000/supply/store/entry"
#         response = requests.request("PUT", url, headers=headers, data=payload)
#         print(response.text)

#     # if payload['ready_to_bill']:
#     #     billing_payload = json.dumps({
#     #         "doc_type": doc_no,
#     #         "doc_no": payload.get("doc_type"),
#     #         "order_status": "part",
#     #         "bill_no": f"HHP/10{i + 1}",
#     #         "bill_date": "2023-06-25",
#     #         "routing": routing[i%8],
#     #         "bill_ready": random.choice([True, False])
#     #         })

#     #     url = "http://lab.zuvatech.com:4000/supply/bill/generate"
#     #     response = requests.request("POST", url, headers=headers, data=billing_payload)

#     # security_payload = json.dumps({
#     #     "type": "store",
#     #     "doc_no": payload.get("doc_no"),
#     #     "security_out": random.choice([False, True]),
#     #     "book_register_no": random.randint(1000, 9999)
#     #     })


#     # payload = json.dumps(payload)


#     # url = "http://lab.zuvatech.com:4000/supply/security/entry"
#     # response = requests.request("POST", url, headers=headers, data=payload)

#         print(response.text)

import pymongo
import requests
import json
import random

myclient = pymongo.MongoClient(
    "mongodb://root:zuvaLabs@lab.zuvatech.com:27017/?authMechanism=DEFAULT&authSource=admin"
)

# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["hindustan"]

# mycol = mydb["supply-billings"]
mycol = mydb["supply-orders"]

data = mycol.find()
# j = 0
# for i in data:
#     j += 1
    # if i["ready_to_bill"]:
    #     print(i["doc_no"])
    #     billing_payload = {
    #         "doc_type": i["doc_type"],
    #         "doc_no": i["doc_no"],
    #         "order_status": random.choice(["part", "full"]),
    #         "bill_no": f"HHP/1{random.randint(111,999)}",
    #         "bill_date": "2023-06-25",
    #         "routing": random.choice(routing),
    #         "bill_ready": random.choice([True, False]),
    #     }
    #     import time 

        # time.sleep(5)

#     bill_col = mydb["supply-billing"]

# print(
#     bill_col.update_one(
#         {"doc_no": i["doc_no"]}, {"$set": billing_payload}, upsert=True
#     )
# )

for i in data:

    order_col  = mydb["supply-orders"]

    # order_col.update_one(
    #     {"doc_no": i["doc_no"]}, {"$set": {"order_status": i["order_status"]}})
    
    if i['bill_ready']:

        order_col.update_one(
            {"doc_no": i["doc_no"]}, {"$set": {"security_out": True,"reg_no":random.randint(1000,9999)}})





    # url = "http://127.0.0.1:4000/supply/bill/generate"

    # response = requests.request(
    #     "POST", url, headers=headers, data=json.dumps(billing_payload)
    # )

    # print(response.text)

    # if i['bill_ready']:
    #     payload = json.dumps({
    #         "type": "store",
    #         "doc_no": i["doc_no"],
    #         "security_out": random.choice([False, True]),
    #         "book_register_no": random.randint(1000, 9999)
    #         })

    #     url = "http://127.0.0.1:4000/supply/security/entry"
    #     response = requests.request("POST", url, headers=headers, data=payload)


# for i in range(50):
#     payload = json.dumps(
#         {
#             "store": random.choice(
#                 ["smc", "general", "instrumentation", "hydraulics", "hose"]
#             ),
#             "supplier_name": "Baumer India",
#             "doc_type": random.choice(
#                 [
#                     "bill_no",
#                     "dc_no",
#                     "note_no",
#                     "uhp_dc_no",
#                     "sam_dc_no",
#                     "return_invoice_no",
#                     "service_materials_no",
#                 ]
#             ),
#             "doc_no": f"S{i + 1}",
#             "doc_date": "2023-06-25",
#             "received": True,
#         }
#     )

#     url = "http://lab.zuvatech.com:4000/inward/store/create"

#     response = requests.request("POST", url, headers=headers, data=payload)

# for i in data:

#     payload = json.dumps({
#         "doc_no": i["doc_no"],
#         "security_entry": True,
#         "reg_no": random.randint(1000, 9999),
#         })
    
#     url = "http://lab.zuvatech.com:4000/inward/security/create"

#     response = requests.request("POST", url, headers=headers, data=payload)

#     print(response.text)


# for i in data:

#     if i["ready_to_bill"]:
#         billing_payload = {
#             "order_status": random.choice(["part", "full"]),
#         }
