# 基於本地知識庫的 ChatGLM 等大語言模型應用實現

## 介紹

🌍 [_READ THIS IN ENGLISH_](README_en.md)

🤖️ 一種利用 [langchain](https://github.com/hwchase17/langchain) 思想實現的基於本地知識庫的問答應用，目標期望建立一套對中文場景與開源模型支持友好、可離線運行的知識庫問答解決方案。

💡 受 [GanymedeNil](https://github.com/GanymedeNil) 的項目 [document.ai](https://github.com/GanymedeNil/document.ai) 和 [AlexZhangji](https://github.com/AlexZhangji) 創建的 [ChatGLM-6B Pull Request](https://github.com/THUDM/ChatGLM-6B/pull/216) 啟發，建立了全流程可使用開源模型實現的本地知識庫問答應用。現已支持使用 [ChatGLM-6B](https://github.com/THUDM/ChatGLM-6B) 等大語言模型直接接入，或通過 [fastchat](https://github.com/lm-sys/FastChat) api 形式接入 Vicuna, Alpaca, LLaMA, Koala, RWKV 等模型。

✅ 本項目中 Embedding 默認選用的是 [GanymedeNil/text2vec-large-chinese](https://huggingface.co/GanymedeNil/text2vec-large-chinese/tree/main)，LLM 默認選用的是 [ChatGLM-6B](https://github.com/THUDM/ChatGLM-6B)。依托上述模型，本項目可實現全部使用**開源**模型**離線私有部署**。

⛓️ 本項目實現原理如下圖所示，過程包括加載文件 -> 讀取文本 -> 文本分割 -> 文本向量化 -> 問句向量化 -> 在文本向量中匹配出與問句向量最相似的`top k`個 -> 匹配出的文本作為上下文和問題一起添加到`prompt`中 -> 提交給`LLM`生成回答。

📺 [原理介紹視頻](https://www.bilibili.com/video/BV13M4y1e7cN/?share_source=copy_web&vd_source=e6c5aafe684f30fbe41925d61ca6d514) 

![實現原理圖](img/langchain+chatglm.png)

從文檔處理角度來看，實現流程如下：

![實現原理圖2](img/langchain+chatglm2.png)


🚩 本項目未涉及微調、訓練過程，但可利用微調或訓練對本項目效果進行優化。

🐳 Docker鏡像：registry.cn-beijing.aliyuncs.com/isafetech/chatmydata:1.0 （感謝 @InkSong🌲 ）

💻 運行方式：docker run -d -p 80:7860 --gpus all registry.cn-beijing.aliyuncs.com/isafetech/chatmydata:1.0 

🌐 [AutoDL 鏡像](https://www.codewithgpu.com/i/imClumsyPanda/langchain-ChatGLM/langchain-ChatGLM)

📓 [ModelWhale 在線運行項目](https://www.heywhale.com/mw/project/643977aa446c45f4592a1e59)

## 變更日志

參見 [版本更新日志](https://github.com/imClumsyPanda/langchain-ChatGLM/releases)。

## 硬件需求

- ChatGLM-6B 模型硬件需求

    注：如未將模型下載至本地，請執行前檢查`$HOME/.cache/huggingface/`文件夾剩余空間，模型文件下載至本地需要 15 GB 存儲空間。
    注：一些其它的可選啟動項見[項目啟動選項](docs/StartOption.md)
    模型下載方法可參考 [常見問題](docs/FAQ.md) 中 Q8。
  
    | **量化等級**   | **最低 GPU 顯存**（推理） | **最低 GPU 顯存**（高效參數微調） |
    | -------------- | ------------------------- | --------------------------------- |
    | FP16（無量化） | 13 GB                     | 14 GB                             |
    | INT8           | 8 GB                     | 9 GB                             |
    | INT4           | 6 GB                      | 7 GB                              |

- MOSS 模型硬件需求
    
    注：如未將模型下載至本地，請執行前檢查`$HOME/.cache/huggingface/`文件夾剩余空間，模型文件下載至本地需要 70 GB 存儲空間

    模型下載方法可參考 [常見問題](docs/FAQ.md) 中 Q8。

    | **量化等級**  | **最低 GPU 顯存**（推理） | **最低 GPU 顯存**（高效參數微調） |
    |-------------------|-----------------------| --------------------------------- |
    | FP16（無量化） | 68 GB             | -                     |
    | INT8      | 20 GB          | -                     |

- Embedding 模型硬件需求

    本項目中默認選用的 Embedding 模型 [GanymedeNil/text2vec-large-chinese](https://huggingface.co/GanymedeNil/text2vec-large-chinese/tree/main) 約占用顯存 3GB，也可修改為在 CPU 中運行。

## Docker 整合包
🐳 Docker鏡像地址：`registry.cn-beijing.aliyuncs.com/isafetech/chatmydata:1.0 `🌲

💻 一行命令運行：
```shell
docker run -d -p 80:7860 --gpus all registry.cn-beijing.aliyuncs.com/isafetech/chatmydata:1.0
```

- 該版本鏡像大小`25.2G`，使用[v0.1.16](https://github.com/imClumsyPanda/langchain-ChatGLM/releases/tag/v0.1.16)，以`nvidia/cuda:12.1.1-cudnn8-runtime-ubuntu22.04`為基礎鏡像
- 該版本內置兩個`embedding`模型：`m3e-base`，`text2vec-large-chinese`，內置`fastchat+chatglm-6b`
- 該版本目標為方便一鍵部署使用，請確保您已經在Linux發行版上安裝了NVIDIA驅動程序
- 請注意，您不需要在主機系統上安裝CUDA工具包，但需要安裝`NVIDIA Driver`以及`NVIDIA Container Toolkit`，請參考[安裝指南](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
- 首次拉取和啟動均需要一定時間，首次啟動時請參照下圖使用`docker logs -f <container id>`查看日志
- 如遇到啟動過程卡在`Waiting..`步驟，建議使用`docker exec -it <container id> bash`進入`/logs/`目錄查看對應階段日志
![](img/docker_logs.png)


## Docker 部署
為了能讓容器使用主機GPU資源，需要在主機上安裝 [NVIDIA Container Toolkit](https://github.com/NVIDIA/nvidia-container-toolkit)。具體安裝步驟如下：
```shell
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit-base
sudo systemctl daemon-reload 
sudo systemctl restart docker
```
安裝完成後，可以使用以下命令編譯鏡像和啟動容器：
```
docker build -f Dockerfile-cuda -t chatglm-cuda:latest .
docker run --gpus all -d --name chatglm -p 7860:7860  chatglm-cuda:latest

#若要使用離線模型，請配置好模型路徑，然後此repo掛載到Container
docker run --gpus all -d --name chatglm -p 7860:7860 -v ~/github/langchain-ChatGLM:/chatGLM  chatglm-cuda:latest
```


## 開發部署

### 軟件需求

本項目已在 Python 3.8.1 - 3.10，CUDA 11.7 環境下完成測試。已在 Windows、ARM 架構的 macOS、Linux 系統中完成測試。

vue前端需要node18環境

### 從本地加載模型

請參考 [THUDM/ChatGLM-6B#從本地加載模型](https://github.com/THUDM/ChatGLM-6B#從本地加載模型)

### 1. 安裝環境

參見 [安裝指南](docs/INSTALL.md)。

### 2. 設置模型默認參數

在開始執行 Web UI 或命令行交互前，請先檢查 [configs/model_config.py](configs/model_config.py) 中的各項模型參數設計是否符合需求。

如需通過 fastchat 以 api 形式調用 llm，請參考 [fastchat 調用實現](docs/fastchat.md)

### 3. 執行腳本體驗 Web UI 或命令行交互

> 注：鑒於環境部署過程中可能遇到問題，建議首先測試命令行腳本。建議命令行腳本測試可正常運行後再運行 Web UI。

執行 [cli_demo.py](cli_demo.py) 腳本體驗**命令行交互**：
```shell
$ python cli_demo.py
```

或執行 [webui.py](webui.py) 腳本體驗 **Web 交互**

```shell
$ python webui.py
```

或執行 [api.py](api.py) 利用 fastapi 部署 API
```shell
$ python api.py
```
或成功部署 API 後，執行以下腳本體驗基於 VUE 的前端頁面
```shell
$ cd views 

$ pnpm i

$ npm run dev
```

VUE 前端界面如下圖所示：
1. `對話` 界面
![](img/vue_0521_0.png)
2. `知識庫問答` 界面
![](img/vue_0521_1.png)
3. `Bing搜索` 界面
![](img/vue_0521_2.png)

WebUI 界面如下圖所示：
1. `對話` Tab 界面
![](img/webui_0521_0.png)
2. `知識庫測試 Beta` Tab 界面
![](img/webui_0510_1.png)
3. `模型配置` Tab 界面
![](img/webui_0510_2.png)

Web UI 可以實現如下功能：

1. 運行前自動讀取`configs/model_config.py`中`LLM`及`Embedding`模型枚舉及默認模型設置運行模型，如需重新加載模型，可在 `模型配置` Tab 重新選擇後點擊 `重新加載模型` 進行模型加載；
2. 可手動調節保留對話歷史長度、匹配知識庫文段數量，可根據顯存大小自行調節；
3. `對話` Tab 具備模式選擇功能，可選擇 `LLM對話` 與 `知識庫問答` 模式進行對話，支持流式對話；
4. 添加 `配置知識庫` 功能，支持選擇已有知識庫或新建知識庫，並可向知識庫中**新增**上傳文件/文件夾，使用文件上傳組件選擇好文件後點擊 `上傳文件並加載知識庫`，會將所選上傳文檔數據加載至知識庫中，並基於更新後知識庫進行問答；
5. 新增 `知識庫測試 Beta` Tab，可用於測試不同文本切分方法與檢索相關度閾值設置，暫不支持將測試參數作為 `對話` Tab 設置參數。
6. 後續版本中將會增加對知識庫的修改或刪除，及知識庫中已導入文件的查看。

### 常見問題

參見 [常見問題](docs/FAQ.md)。

## Demo

以問題`chatglm-6b 的局限性具體體現在哪里，如何實現改進`為例：

未使用 langchain 接入本地文檔時：

>ChatGLM-6B 是一個基於 GPT-3 的聊天機器人,它的局限性主要體現在以下幾個方面:
>1. 語言模型的精度:GPT-3 是一種大型的語言模型,它的精度比較高,但是仍然有一些局限性。例如,它可能無法準確地理解某些方言、口音或者覆雜的句子結構。
>2. 知識圖譜的完整性:GPT-3 可以生成一些知識圖譜,但是其完整性和準確性可能不夠。例如,它可能無法準確地理解某些領域的專業知識和術語。
>3. 對話生成的連貫性:GPT-3 可以生成一些連貫的對話,但是其生成的對話可能不夠自然。例如,它可能會生成一些虛假的、不連貫的對話或者誤解用戶的意圖。
>
>為了改進 ChatGLM-6B,可以考慮以下幾個方面:
>1. 提高語言模型的精度:可以通過增加訓練數據、使用更好的語言模型架構、優化模型訓練過程等方式來提高語言模型的精度。
>2. 增強知識圖譜的完整性:可以通過增加知識圖譜的維度、使用更好的知識圖譜構建方法、優化知識圖譜的匹配算法等方式來增強知識圖譜的完整性。
>3. 提高對話生成的連貫性:可以通過增加對話生成模型的上下文信息、使用更好的上下文信息提取方法、優化對話生成模型的算法等方式來提高對話生成的連貫性。
>4. 引入更多的人類反饋:人類反饋可以幫助 ChatGLM-6B 更好地理解用戶的意圖和需求,從而提高對話生成的質量和準確性。可以通過引入更多的人類客服、使用人類反饋收集器等方式來引入更多的人類反饋。

使用 langchain 接入 ChatGLM-6B 項目的 README.md 文件後 ChatGLM 的回答：
>ChatGLM-6B 是一個基於深度學習的自然語言處理模型,它在回答問題方面表現出色。但是,它也有一些局限性,具體如下:
>1. 語言理解有限:ChatGLM-6B 只學習了中文自然語言,對於其他語言可能會存在理解上的局限性。
>2. 知識儲備不足:ChatGLM-6B 的訓練數據集只包含了中文語料,因此它可能無法回答一些非中文的問題或者某些特定領域的問題。
>3. 數據量有限:ChatGLM-6B 的訓練數據集只有幾百萬條記錄,因此它可能無法回答一些非常具體或者覆雜的問題。
>
>為了改進 ChatGLM-6B,可以考慮以下幾個方面:
>1. 學習更多的語言知識:可以學習其他語言的自然語言處理技術,擴大語言理解的範圍。
>2. 擴大知識儲備:可以收集更多的中文語料,或者使用其他語言的數據集來擴充知識儲備。
>3. 增加數據量:可以使用更大的數據集來訓練 ChatGLM-6B,提高模型的表現。
>4. 引入更多的評估指標:可以引入更多的評估指標來評估模型的表現,從而發現 ChatGLM-6B 存在的不足和局限性。
>5. 改進模型架構:可以改進 ChatGLM-6B 的模型架構,提高模型的性能和表現。例如,可以使用更大的神經網絡或者改進的卷積神經網絡結構。

## 路線圖

- [ ] Langchain 應用
  - [x] 接入非結構化文檔（已支持 md、pdf、docx、txt 文件格式）
  - [x] jpg 與 png 格式圖片的 OCR 文字識別
  - [x] 搜索引擎接入
  - [ ] 本地網頁接入
  - [ ] 結構化數據接入（如 csv、Excel、SQL 等）
  - [ ] 知識圖譜/圖數據庫接入
  - [ ] Agent 實現
- [x] 增加更多 LLM 模型支持
  - [x] [THUDM/chatglm2-6b](https://huggingface.co/THUDM/chatglm2-6b)
  - [x] [THUDM/chatglm-6b](https://huggingface.co/THUDM/chatglm-6b)
  - [x] [THUDM/chatglm-6b-int8](https://huggingface.co/THUDM/chatglm-6b-int8)
  - [x] [THUDM/chatglm-6b-int4](https://huggingface.co/THUDM/chatglm-6b-int4)
  - [x] [THUDM/chatglm-6b-int4-qe](https://huggingface.co/THUDM/chatglm-6b-int4-qe)
  - [x] [ClueAI/ChatYuan-large-v2](https://huggingface.co/ClueAI/ChatYuan-large-v2)
  - [x] [fnlp/moss-moon-003-sft](https://huggingface.co/fnlp/moss-moon-003-sft)
  - [x] [bigscience/bloomz-7b1](https://huggingface.co/bigscience/bloomz-7b1)
  - [x] [bigscience/bloom-3b](https://huggingface.co/bigscience/bloom-3b)
  - [x] [baichuan-inc/baichuan-7B](https://huggingface.co/baichuan-inc/baichuan-7B)
  - [x] [lmsys/vicuna-13b-delta-v1.1](https://huggingface.co/lmsys/vicuna-13b-delta-v1.1)
  - [x] 支持通過調用 [fastchat](https://github.com/lm-sys/FastChat) api 調用 llm
- [x] 增加更多 Embedding 模型支持
  - [x] [nghuyong/ernie-3.0-nano-zh](https://huggingface.co/nghuyong/ernie-3.0-nano-zh)
  - [x] [nghuyong/ernie-3.0-base-zh](https://huggingface.co/nghuyong/ernie-3.0-base-zh)
  - [x] [shibing624/text2vec-base-chinese](https://huggingface.co/shibing624/text2vec-base-chinese)
  - [x] [GanymedeNil/text2vec-large-chinese](https://huggingface.co/GanymedeNil/text2vec-large-chinese)
  - [x] [moka-ai/m3e-small](https://huggingface.co/moka-ai/m3e-small)
  - [x] [moka-ai/m3e-base](https://huggingface.co/moka-ai/m3e-base)
- [ ] Web UI
  - [x] 基於 gradio 實現 Web UI DEMO
  - [x] 基於 streamlit 實現 Web UI DEMO
  - [x] 添加輸出內容及錯誤提示
  - [x] 引用標注
  - [ ] 增加知識庫管理
    - [x] 選擇知識庫開始問答
    - [x] 上傳文件/文件夾至知識庫
    - [x] 知識庫測試
    - [x] 刪除知識庫中文件
  - [x] 支持搜索引擎問答
- [ ] 增加 API 支持
  - [x] 利用 fastapi 實現 API 部署方式
  - [ ] 實現調用 API 的 Web UI Demo
- [x] VUE 前端

## 項目交流群
<img src="img/qr_code_46.jpg" alt="二維碼" width="300" height="300" />


🎉 langchain-ChatGLM 項目微信交流群，如果你也對本項目感興趣，歡迎加入群聊參與討論交流。
