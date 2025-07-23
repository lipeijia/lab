---
title: "Web Socket 斷線後自動重連"
description: "確保 WebSocket 連線穩定與斷線後自動重連的完整處理策略"
---

在使用 WebSocket 時，確保「連線穩定」與「斷線後自動重連」是非常常見的需求。以下是完整的處理策略，包含偵測、重連與最佳實務。

---

### ✅ 基本概念：WebSocket 中斷的可能原因

- 使用者網路不穩定（Wi-Fi 切換、斷線）
    
- 伺服器重啟或斷線
    
- 瀏覽器進入休眠或省電模式
    
- Proxy/防火牆中斷連線（如空閒太久）
    

---

### 🔁 解法：實作「自動重連」與「心跳檢測」

###  1. 自動重連邏輯


```js
class ReconnectingWebSocket {   
private url: string;   
private socket: WebSocket | null = null;   
private reconnectDelay = 1000; // 初始重連間隔   
private maxDelay = 10000;   
private shouldReconnect = true;    
constructor(url: string) {     this.url = url;     this.connect();   }    private connect() {     this.socket = new WebSocket(this.url);      

this.socket.onopen = () => {       
console.log("🔌 WebSocket connected");   
this.reconnectDelay = 1000; // reset delay     
};  

this.socket.onmessage = (event) => {       
console.log("📩 Message:", event.data);     
};      

this.socket.onerror = (err) => {       
console.error("❗ WebSocket error:", err);     
};      

this.socket.onclose = () => {       
console.warn("⚠️ WebSocket closed");       
if (this.shouldReconnect) {         
setTimeout(() => this.connect(), this.reconnectDelay);         this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxDelay);      }};   
}    

public send(data: string) {     
if (this.socket && this.socket.readyState === WebSocket.OPEN) {       this.socket.send(data);     
	} else {       
console.warn("🚫 WebSocket not connected"); 
	}   
}    
public close() {     
this.shouldReconnect = false;     
this.socket?.close();   
	} 
}
```

---

### 2. 心跳機制（Ping-Pong）

目的：檢查連線是否存活。  
原理是定時送一個訊息（如 `"ping"`），如果未回應就重啟連線。


```js
private heartbeatInterval: number = 30000; private heartbeatTimer: any;  private startHeartbeat() {   
this.heartbeatTimer = setInterval(() => {     
	if (this.socket?.readyState === WebSocket.OPEN) {       
	this.socket.send(JSON.stringify({ type: 'ping' }));     }   }, 
	this.heartbeatInterval); }  private stopHeartbeat() {   
	clearInterval(this.heartbeatTimer); 
}
```

可以在 `onopen` 開始心跳、在 `onclose` 停止心跳：

```js
this.socket.onopen = () => {   
console.log("connected");   
this.startHeartbeat(); 
};  

this.socket.onclose = () => {   
console.log("closed");   
this.stopHeartbeat();   // reconnect... 
};
```


---

###  補充：如何更安全

- **加上 Token 驗證**（JWT）建立連線前的授權
    
- 使用 `wss://`（加密通訊）
    
- 若是長時間空閒，伺服器設 `timeout` 時間 + client 心跳保持活性
    
- 限制重連次數避免無限重試
    

---

###  Debug 工具

- 在瀏覽器開發工具 → Network → WS 可以看到每個 frame
    
- 使用 Charles 或 Wireshark 監控封包
    
- 在伺服器記錄 `onclose` 原因（如 code、reason）
    

---

**WebSocket「重新連線」指的是：
「開一個新的連線（new WebSocket）來取代舊的已斷線連線」。**

WebSocket 一旦進入 `CLOSED` 狀態（即 `.readyState === 3`），  
就無法再使用它，**不能復活**、**不能重啟**。

因此所謂的「重連」，其實就是：
會產生一個全新的連線，走一遍 TCP / 握手流程。

```js
socket = new WebSocket(url); // 新的 WebSocket 實體
```


### 📊 WebSocket 狀態說明（`readyState`）

|狀態值|名稱|說明|
|---|---|---|
|0|CONNECTING|建立中|
|1|OPEN|已連線|
|2|CLOSING|正在關閉|
|3|CLOSED|已關閉，無法重用|

一旦進入 `CLOSED`，就無法再透過這個 socket 發送訊息或 reconnect，只能 `new WebSocket()`。


### 那「舊的 socket」怎麼辦？

- 自動重連前要確保舊的 `socket.close()` 已執行或自然斷線。
    
- 建議主動 `socket.close()` 可以防止殘留內存或 zombie connection。
    

### 補充：如何避免多開連線（重連風暴）

```js
if (this.socket?.readyState === WebSocket.OPEN || this.socket?.readyState === WebSocket.CONNECTING) {   // 正在連或已連，避免重複連線   return; }`
```


### 總結

> WebSocket 無法「重連同一個連線實體」，  
> 所謂的「自動重連」就是關掉舊的，再開一個新的 WebSocket 實例來重建連線。

### 參考套件

- [`reconnecting-websocket`](https://github.com/pladaria/reconnecting-websocket)（npm）
- 使用 `Socket.IO`（內建自動重連與心跳）