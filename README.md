# Windy 地區選擇（Notion 嵌入用）

純靜態網頁，不需要後端。放到任何靜態空間（例如 GitHub Pages）後，把網址貼進 Notion 的 embed 區塊。

## 網址參數

| 參數 | 說明 | 例 |
|---|---|---|
| `loc` | 預設地區 id（見 `index.html` 的 `PRESETS`） | `?loc=niseko` |
| `gmap` | Google Maps 完整連結，或「緯度, 經度」（需 URL encode） | `?gmap=36.69,137.86` |
| `lat` / `lon` | 直接給座標 | `?lat=36.69&lon=137.86` |
| `label` | 顯示在收合按鈕上的標題（需 URL encode） | `&label=白馬八方尾根` |
| `overlay` | `snowcover` `snow` `wind` `rain` `temp` `clouds` | `&overlay=wind` |
| `zoom` | 縮放等級（覆蓋預設值） | `&zoom=10` |
| `ui=0` | 隱藏上方控制列，只顯示地圖 | `&ui=0` |

## Google Maps 連結

支援含座標的完整網址：`/@lat,lng,zoomz`、`!3d…!4d…`、`?q=` / `?query=`、`/place/lat,lng`。

`maps.app.goo.gl` 短網址沒辦法在瀏覽器裡直接展開（會被 CORS 擋住）。請先在瀏覽器打開它，再複製網址列上的完整網址；或在 Google Maps 的地點上按右鍵，點座標複製「緯度, 經度」。

## 不架站的用法

在本機打開 `index.html`，選好地點後按「分享網址」，第二個欄位會顯示 **Windy 直連網址**，直接貼到 Notion embed 區塊即可。缺點是之後不能在 Notion 裡切換地點。
