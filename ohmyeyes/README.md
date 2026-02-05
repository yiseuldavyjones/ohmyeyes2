# React 자외선 알리미 🕶️

## 빠른 시작

### 1. React 프로젝트 생성
```bash
npx create-react-app uv-app
cd uv-app
```

### 2. 아이콘 설치
```bash
npm install lucide-react
```

### 3. 파일 교체
- `UVApp.jsx` → `src/App.js`로 복사

### 4. API 키 설정
`src/App.js` 파일의 **28번째 줄**:
```javascript
const API_KEY = 'YOUR_API_KEY';  // OpenWeatherMap에서 발급
```

### 5. 실행
```bash
npm start
```

끝! 브라우저에서 자동으로 열립니다.

---

## API 키 받기
1. https://openweathermap.org 회원가입
2. API Keys 메뉴에서 키 복사
3. 코드에 붙여넣기

---

## 사용법
1. "알림 허용" 클릭
2. "자외선 확인" 클릭  
3. 자외선 3 이상이면 자동 푸시! 🕶️
