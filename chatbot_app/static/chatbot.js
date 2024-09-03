
document.addEventListener('DOMContentLoaded', function() {
    if (showFileUpload){
        document.querySelector('#up').addEventListener('submit', function() {
            document.getElementById('loadingScreen').style.display = 'flex';
        });
    }
    else{
        document.querySelector('#up2').addEventListener('submit', function() {
            document.getElementById('loadingScreen2').style.display = 'flex';
        });
    }
    // document.querySelector('#up').addEventListener('submit', function() {
    //     document.getElementById('loadingScreen').style.display = 'flex';
    // });

    // var buttons = document.querySelectorAll('#preset-questions button');

    // buttons.forEach(function(button) {
    //     button.addEventListener('click', function() {
    //         var presetQuestions = document.getElementById('preset-questions');
    //         presetQuestions.style.opacity = 0;
    //         setTimeout(function() {
    //             presetQuestions.style.display = 'none';
    //         }, 500);
    //     });
    // });
    function setUserMessage(question) {
        document.getElementById("user-input").value = question;
    }
    const presetQuestions = document.querySelectorAll("#preset-questions button");
    presetQuestions.forEach(button => {
        button.addEventListener('click', function() {
            setUserMessage(this.textContent);
        });
    });
    const chatbot = document.getElementById('chatbot');
    const chatlog = document.getElementById('chatlog');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const parent = document.getElementById('parent-container');
    // fetch('/knowledge_base/')
    //     .then(response => response.json()) // 將回應轉換為 JSON 格式
    //     .then(data => {
    //         const dataArray = data.message;
    //         // 取得下拉式選單的容器元素
    //         const dropdownMenu = document.getElementById('dropdownMenu');
    //         // 將資料轉換成下拉選單的選項
    //         dataArray.forEach(item => {
    //           const option = document.createElement('li');
    //           const link = document.createElement('a');
    //           link.textContent = item;
    //           link.href = "#"; // 或者可以指定下拉選項的連結
    //           option.appendChild(link);
    //           dropdownMenu.appendChild(option);
    //         });
    //         // // 清空初始的空白選項
    //         // dropdownMenu.innerHTML = '';
    //         // // 用取得的 data 字段生成下拉式選單的選項
    //         // dataArray.forEach(item => {
    //         //   const dropdownItem = document.createElement('a');
    //         //   dropdownItem.classList.add('dropdown-item');
    //         //   dropdownItem.href = '#'; // 可以設定選項的連結，若無需連結可以設定為 '#' 或 'javascript:void(0)'
    //         //   dropdownItem.textContent = item;
    //         //   dropdownMenu.appendChild(dropdownItem);
    //         // });
    //     })
    //     .catch(error => {
    //         console.error('無法獲取下拉式選單的資料：', error);
    //         // 在無法獲取資料時顯示錯誤訊息
    //         const errorMessage = document.createElement('a');
    //         errorMessage.classList.add('dropdown-item');
    //         errorMessage.href = '#';
    //         errorMessage.textContent = '無法獲取下拉式選單的資料。';
    //         dropdownMenu.appendChild(errorMessage);
    //     });
    // const uploadButton = document.getElementById('upload-button');
    // uploadButton.addEventListener('click', function() { //async
    //     event.preventDefault();
    //     event.stopPropagation();
    //     const regex = /\/upload_files\/([^/]+)\/$/;
    //     const currentURL = window.location.href;
    //     const match = currentURL.match(regex);
    //     // if (match) {
    //     //     const formData = new FormData();
    //     //     const filesInput = document.getElementById('formFileMultiple');
    //     //     for (const file of filesInput.files) {
    //     //         formData.append('files', file);
    //     //     }
    //     //     formData.append('knowledge_base_id', match[1]);
    //     //     const response = await fetch('/upload_files/' + match[1] + '/', {
    //     //         method: 'POST',
    //     //         body: formData
    //     //     });
    //     //     const data = await response.json();
    //     //     console.log(data);
    //     // }
    //     console.log(currentURL)
    //     if (match) {
    //         const formData = new FormData();
    //         const filesInput = document.getElementById('formFileMultiple');
    //         for (const file of filesInput.files) {
    //             formData.append('files', file);
    //         }
    //         fetch('/upload_files/'+match[1]+'/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': ' multipart/form-data'
    //             },
    //             data: formData
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             const botResponse = data.uploaded;
    //             let botResponseDiv = document.createElement('div');
    //             botResponseDiv.classList.add('chatbot-message', 'chatbot-reply');
    //             const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", second: "2-digit"  });
    //             botResponseDiv.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${botResponse}</p>`;
    //             chatlog.appendChild(botResponseDiv);
    //             botResponseDiv.scrollIntoView({ behavior: "smooth" });
    //             console.log(data);
    //     })}
    // });

    parent.addEventListener('submit', function(event) {
        
        if (event.target.id != "chat-form") {
            return;  // 如果不是，直接返回，不執行下面的程式碼
        }
        event.preventDefault();

        // Get user input
        const userMessage = userInput.value;

        // Clear the input field
        userInput.value = '';
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", second: "2-digit"  });

        // 創建使用者訊息的元素
        let userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('chatbot-message', 'user-message');
        userMessageDiv.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${userMessage}</p>`;
        
        let userImg = document.createElement('img');
        userImg.src = "/static/images/man.png";
        userImg.alt = 'User';
        userImg.classList.add('message-avatar');
        userMessageDiv.appendChild(userImg);
        // 將使用者訊息添加到對話視窗
        chatlog.appendChild(userMessageDiv);
        userMessageDiv.scrollIntoView({ behavior: "smooth" });

        let loadingDiv = document.createElement('div');
        loadingDiv.classList.add('chatbot-message', 'chatbot-loading');
        const windowWidth = window.innerWidth;

        if (windowWidth <= 750) {
            // 視窗寬度小於或等於 767px (通常認為是手機畫面)
            loadingDiv.innerHTML = `
                <div class="spinner-grow text-info custom-spinner" role="status"><span class="sr-only"></span></div>
                <div class="spinner-grow text-primary custom-spinner" role="status"><span class="sr-only"></span></div>
                <div class="spinner-grow text-secondary custom-spinner" role="status"><span class="sr-only"></span></div>
            `;
        } else {
            // 較大的畫面（例如桌面或平板）
            loadingDiv.innerHTML = `
                <div class="spinner-grow text-info custom-spinner" role="status"><span class="sr-only"></span></div>
                <div class="spinner-grow text-primary custom-spinner" role="status"><span class="sr-only"></span></div>
                <div class="spinner-grow text-secondary custom-spinner" role="status"><span class="sr-only"></span></div>
                <div class="spinner-grow text-dark custom-spinner" role="status"><span class="sr-only"></span></div>
            `;
        }
        chatlog.appendChild(loadingDiv);
        loadingDiv.scrollIntoView({ behavior: "smooth" });

        const regex = /\/knowledge_chat\/([^/]+)\/$/;
        const currentURL = window.location.href;
        const match = currentURL.match(regex);

        if (match){
            const extractedString = match[1];
            fetch('/knowledge_chat/'+extractedString+'/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: 'user_input=' + encodeURIComponent(userMessage)
            })
            .then(response => response.json())
            .then(data => {
                const botResponse = data.bot_response;
                // 創建聊天機器人回應的元素
                let botResponseDiv = document.createElement('div');
                botResponseDiv.classList.add('chatbot-message', 'chatbot-reply');

                let botImg = document.createElement('img');
                botImg.src = "/static/images/bot.png";
                botImg.alt = 'User';
                botImg.classList.add('message-avatar');
                botResponseDiv.appendChild(botImg);

                const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", second: "2-digit" });
                if (data.source){
                    const srcdoc = data.source;
                    let botText = document.createElement('p');
                    botText.className = 'chatbot-text';
                    botText.setAttribute("sentTime", currentTime);
                    botText.textContent = botResponse+"\n"+srcdoc;
                    // 將文字添加到bot訊息div
                    botResponseDiv.appendChild(botText);
                }
                else{
                    let botText = document.createElement('p');
                    botText.className = 'chatbot-text';
                    botText.setAttribute("sentTime", currentTime);
                    botText.textContent = botResponse;
                    // 將文字添加到bot訊息div
                    botResponseDiv.appendChild(botText);
                }
                
                chatlog.removeChild(loadingDiv);
                // 將聊天機器人回應添加到對話視窗
                chatlog.appendChild(botResponseDiv);

                // 捲動到最新訊息處
                botResponseDiv.scrollIntoView({ behavior: "smooth" });
            });
        }
        else{
            fetch('/chatbot/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: 'user_input=' + encodeURIComponent(userMessage)
            })
            .then(response => response.json())
            .then(data => {
                const botResponse = data.bot_response;
                let botResponseDiv = document.createElement('div');
                botResponseDiv.classList.add('chatbot-message', 'chatbot-reply');

                let botImg = document.createElement('img');
                botImg.src = "/static/images/bot.png";
                botImg.alt = 'User';
                botImg.classList.add('message-avatar');
                botResponseDiv.appendChild(botImg);

                // let messageContentDiv = document.createElement('div');
                // messageContentDiv.classList.add('message-content');
                // botResponseDiv.appendChild(messageContentDiv);

                // chatlog.appendChild(botResponseDiv);

                // // 加入加載圖標到message-content中
                // let loadingDiv = document.createElement('div');
                // loadingDiv.classList.add('chatbot-loading');
                // loadingDiv.innerHTML = `
                //     <div class="spinner-grow text-info custom-spinner" role="status"><span class="sr-only"></span></div>
                //     <div class="spinner-grow text-primary custom-spinner" role="status"><span class="sr-only"></span></div>
                //     <div class="spinner-grow text-secondary custom-spinner" role="status"><span class="sr-only"></span></div>
                //     <div class="spinner-grow text-dark custom-spinner" role="status"><span class="sr-only"></span></div>
                // `;
                // messageContentDiv.appendChild(loadingDiv);

                const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", second: "2-digit"  });
                let botText = document.createElement('p');
                botText.className = 'chatbot-text';
                botText.setAttribute("sentTime", currentTime);
                botText.textContent = botResponse;
                // 將文字添加到bot訊息div
                botResponseDiv.appendChild(botText);

                // 創建和添加文本消息
                // const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", second: "2-digit"  });
                // let botText = document.createElement('p');
                // botText.className = 'chatbot-text';
                // botText.setAttribute("sentTime", currentTime);
                // botText.textContent = data.bot_response;
                // messageContentDiv.removeChild(loadingDiv);
                // messageContentDiv.appendChild(botText);
                // botResponseDiv.scrollIntoView({ behavior: "smooth" });

                // botResponseDiv.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${botResponse}</p>`;
                chatlog.removeChild(loadingDiv);
                chatlog.appendChild(botResponseDiv);
                botResponseDiv.scrollIntoView({ behavior: "smooth" });
            });
        }
    });
});
    