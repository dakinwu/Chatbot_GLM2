import os
import json
import codecs
import requests
import datetime
from urllib.parse import quote
from django.urls import reverse
from django.shortcuts import render
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseRedirect

@csrf_exempt
def chatbot(request):
    upload = True
    show_file_upload = False
    today = datetime.date.today()
    filename = today.strftime('%Y-%m-%d') + '.json'
    filepath = r"c:/Users/dakin/Downloads/Makalot/chatbot_project/chatbot_app/static/knowledge_base/"+filename
    if request.method == 'POST':
        # Get user input
        user_input = request.POST['user_input']
        url = "http://192.168.1.103:7860/chat"
        try:
            his = []
            with open(filepath, 'r', encoding='utf-8') as file:
                for line in file:
                    json_dict = json.loads(line)
                    his.append(json_dict)
        except:
            his = []
        myobj ={
          "question": user_input,
          "history": his
        }
        bot_response = requests.post(url, json = myobj)
        history = json.loads(bot_response.text)["history"]
        with codecs.open(filepath, "w", encoding = "utf-8") as f:
            for dict in history:
                f.write(json.dumps(dict, ensure_ascii = False) + "\n")
        bot_response = json.loads(bot_response.text)["response"]
        # Return the response as JSON
        return JsonResponse({'bot_response': bot_response})
    else:
        if os.path.exists(filepath):
            os.remove(filepath)
        url = "http://192.168.1.103:7860/local_doc_qa/list_knowledge_base"
        knowledge_base_list = requests.get(url)
        knowledge_base_list = json.loads(knowledge_base_list.text)["data"]
        # If the request is not a POST, render the chatbot template
        return render(request, 'chatbot.html', locals())

def knowledge_base(request):
    url = "http://192.168.1.103:7860/local_doc_qa/list_knowledge_base"
    bot_response = requests.get(url)
    bot_response = json.loads(bot_response.text)["data"]
    # Return the response as JSON
    return JsonResponse({'bot_response': bot_response})
    # else:
    # # If the request is not a POST, render the chatbot template
    #     return render(request, 'chatbot.html')

@csrf_exempt
def knowledge_chat(request, knowledge_base):
    show_file_upload = True
    if request.method == 'POST':
        user_input = request.POST['user_input']
        url = "http://192.168.1.103:7860/local_doc_qa/list_files?knowledge_base_id=" + knowledge_base
        data_list = requests.get(url)
        data_list = json.loads(data_list.text)["data"]
        if data_list == []:
            upload = True
            show_file_upload = False
            today = datetime.date.today()
            filename = today.strftime('%Y-%m-%d') + '.json'
            filepath = r"c:/Users/dakin/Downloads/Makalot/chatbot_project/chatbot_app/static/knowledge_base/"+filename
            if request.method == 'POST':
                # Get user input
                user_input = request.POST['user_input']
                url = "http://192.168.1.103:7860/chat"
                try:
                    his = []
                    with open(filepath, 'r', encoding='utf-8') as file:
                        for line in file:
                            json_dict = json.loads(line)
                            his.append(json_dict)
                except:
                    his = []
                myobj ={
                  "question": user_input,
                  "history": his
                }
                bot_response = requests.post(url, json = myobj)
                history = json.loads(bot_response.text)["history"]
                with codecs.open(filepath, "w", encoding = "utf-8") as f:
                    for dict in history:
                        f.write(json.dumps(dict, ensure_ascii = False) + "\n")
                bot_response = json.loads(bot_response.text)["response"]
                # Return the response as JSON
                return JsonResponse({'bot_response': bot_response})
            else:
                if os.path.exists(filepath):
                    os.remove(filepath)
                url = "http://192.168.1.103:7860/local_doc_qa/list_knowledge_base"
                knowledge_base_list = requests.get(url)
                knowledge_base_list = json.loads(knowledge_base_list.text)["data"]
                # If the request is not a POST, render the chatbot template
                return render(request, 'chatbot.html', locals())
        else:
            know = "http://192.168.1.103:7860/local_doc_qa/local_doc_chat"
            # today = datetime.date.today()
            # filename = today.strftime('%Y-%m-%d') + '.json'
            # try:
            #     his = []
            #     with open(r"c:/Users/dakin/Downloads/Makalot/chatbot_project/chatbot_app/static/knowledge_base/"+knowledge_base+"/"+filename, 'r', encoding='utf-8') as file:
            #         for line in file:
            #             json_dict = json.loads(line)
            #             his.append(json_dict)
            # except:
            #     his = []
            myobj ={
              "knowledge_base_id": knowledge_base,
              "question": user_input,
              "history": [["你是由聚陽數位轉型部的軟體開發實習生，目前就讀台大統計與數據科學所碩一的Dakin所開發的知識庫平台。", "了解，我是由聚陽數位轉型部的軟體開發實習生，目前就讀台大統計與數據科學所碩一的Dakin所開發的知識庫平台。"]] # his
            }
            bot_res = requests.post(know, json = myobj)
            # history = json.loads(bot_res.text)["history"]
            # with codecs.open(r"C:/Users/dakin/Downloads/Makalot/chatbot_project/chatbot_app/static/knowledge_base/"+knowledge_base+"/"+filename, "w", encoding = "utf-8") as f:
            #     for dict in history:
            #         f.write(json.dumps(dict, ensure_ascii = False) + "\n")
            bot_response = json.loads(bot_res.text)["response"]
            src = json.loads(bot_res.text)["source_documents"]
            src = [i[:-2] for i in src]
            src = "\n\n".join(src)
            if src == "":
                return JsonResponse({'bot_response': bot_response})
            else:
                return JsonResponse({'bot_response': bot_response, "source" : "\n資料來源："+src})
    else:
        url = "http://192.168.1.103:7860/local_doc_qa/list_knowledge_base"
        knowledge_base_list = requests.get(url)
        knowledge_base_list = json.loads(knowledge_base_list.text)["data"]
        url = "http://192.168.1.103:7860/local_doc_qa/list_files?knowledge_base_id=" + knowledge_base
        data_list = requests.get(url)
        data_list = json.loads(data_list.text)["data"]
        return render(request, 'chatbot.html', locals())

def upload(request):
    if request.method == 'POST':
        0
        uploaded = json.loads(uploaded.text)["msg"]
        # messages.success(request, uploaded)
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
    else:
        return render(request, 'chatbot.html', locals())

def upload_files(request, knowledge_base):
    if request.method == 'POST':
        folder_path = "C:/Users/dakin/Downloads/Makalot/chatbot_project/chatbot_app/static/knowledge_base/"+knowledge_base+"/content"
        uploaded_files = request.FILES.getlist('files')
        for i in uploaded_files:
            if os.path.exists(os.path.join(folder_path, i.name)):
                name_without_extension = os.path.splitext(i.name)[0]
                url_name = quote(name_without_extension)
                extension = os.path.splitext(i.name)[1]
                url = "http://192.168.1.103:7860/local_doc_qa/delete_file?knowledge_base_id="+knowledge_base+"&doc_name="+url_name+extension
                deleted = requests.delete(url)
                # deleted = json.loads(deleted.text)["msg"]
        files = [('files', file) for file in uploaded_files]
        data = {"knowledge_base_id": knowledge_base}
        url = "http://192.168.1.103:7860/local_doc_qa/upload_files"
        uploaded = requests.post(url, files = files, data = data)
        # uploaded = json.loads(uploaded.text)["msg"]
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
    else:
        return render(request, 'chatbot.html', locals())

def delete_files(request, knowledge_base):
    if request.method == 'POST':
        detete_file = request.POST.getlist('file_to_delete')
        for file in detete_file:
            name_without_extension = os.path.splitext(file)[0]
            url_name = quote(name_without_extension)
            extension = os.path.splitext(file)[1]
            url = "http://192.168.1.103:7860/local_doc_qa/delete_file?knowledge_base_id="+knowledge_base+"&doc_name="+url_name+extension
            deleted = requests.delete(url)
            deleted = json.loads(deleted.text)["msg"]
        # messages.success(request, deleted)
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
    else:
        return render(request, 'chatbot.html', locals())

def delete_base(request, knowledge_base):
    if request.method == 'POST':
        url = "http://192.168.1.103:7860/local_doc_qa/delete_knowledge_base?knowledge_base_id="+knowledge_base
        deleted = requests.delete(url)
        deleted = json.loads(deleted.text)["msg"]
        return HttpResponseRedirect(reverse('chatbot'))
    else:
        return render(request, 'chatbot.html', locals())

def get_signup(request):
    return render(request, "signup.html")

def post_signup(request):
    username = request.POST('username')
    email = request.POST('email')
    password = request.POST('password')
    print(username, email, password)
    return render(request, "signup.html")