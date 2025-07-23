1. 基本概念
	•	Origin（同源） Origin 由三個部分組成：
	•	協議（Scheme），如 HTTP 或 HTTPS
	•	主機名稱（Hostname）
	•	連接埠（Port，若未指定則使用預設連接埠） 例如，URL `https://www.example.com:443/foo` 的 Origin 是 `https://www.example.com:443`。
	•	Site（同站） Site 是基於「有效頂級域名加一層（eTLD+1）」， 通常為主域名加上一級網域，例如：`example.com`（`eTLD+1` 中的 eTLD 可能是 `.com`， `example.com` 則為做為 site）。 Site 不區分連接埠，且包含所有該域名下的子域名。
2. same-origin（同源）
	•	判斷規則： 協議、主機名稱與連接埠完全相同，則為 same-origin。
	•	範例（同源）：
	•	`https://www.example.com:443` 與 `https://www.example.com:443`
	•	範例（非同源）：
	•	`https://www.example.com` 與 `https://login.example.com`（子域名不同）
	•	`http://www.example.com` 與 `https://www.example.com`（協議不同）
	•	`https://www.example.com:80` 與 `https://www.example.com:443`（連接埠不同）
3. same-site（同站）
	•	判斷規則： eTLD+1（有效頂級域名加一層）相同，且協議相同，視為 same-site。 不同連接埠會被視為同站，子域名稱不同也視為同站。
	•	範例（同站）：
	•	`https://login.example.com` 與 `https://www.example.com`（同一站）
	•	`https://www.example.com:80` 與 `https://www.example.com:443`（同一站）
	•	範例（非同站）：
	•	`https://www.example.com` 與 `http://www.example.com`（協議不同）
	•	`https://www.example.com` 與 `https://www.evil.com`（不同有效頂級域名）
4. 端口的影響
	•	same-origin：端口不同即非同源。
	•	same-site：端口不同仍視為同站。
5. 子域名的影響
	•	same-origin：子域名不同即非同源。
	•	same-site：子域名不同仍視為同站。

總結
	•	same-origin 是更嚴格的定義，凡是協議、主機、連接埠任一不同即非同源。
	•	same-site 是範圍較寬鬆的定義，僅看協議和主域名（包括所有子域），端口可不同也視為同站。
	•	兩者在網頁安全政策（如 Cookie、CORS、fetch、iframe 等）中均有應用，但概念不同，容易混淆，理解兩者差異有助於正確設計與排錯。