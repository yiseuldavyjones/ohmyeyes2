import React, { useState } from 'react';
import { Sun, Glasses } from 'lucide-react';

export default function UVApp() {
  const [uv, setUV] = useState(null);
  const [loading, setLoading] = useState(false);

  // 알림 권한 요청
  const enableNotification = async () => {
    if ('Notification' in window) {
      await Notification.requestPermission();
    }
  };

  // 자외선 확인
  const checkUV = async () => {
    setLoading(true);
    
    try {
      // 위치 가져오기
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      
      // API 호출 (본인의 API 키 필요)
      const API_KEY = '22b06efb8cd4a3cc9eaad35388f78712';
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      
      const data = await res.json();
      const uvValue = Number(data.value) || 0;
      
      setUV(uvValue);
      
      // 자외선 3 이상이면 알림
      if (uvValue >= 3 && Notification.permission === 'granted') {
        new Notification('🕶️ 선글라스 착용!', {
          body: `자외선 지수: ${uvValue.toFixed(1)}`
        });
      }
      
    } catch (err) {
      alert('API 키를 설정하거나 위치 권한을 허용해주세요');
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
            {/* 제목 */}
        </h1>
        
        <div style={{
          fontSize: '80px',
          fontWeight: 'bold',
          margin: '30px 0',
          padding: '40px',
          borderRadius: '15px',
          background: '#f5f5f5',
          color: uv === null ? '#999' : uv < 3 ? '#4caf50' : uv < 6 ? '#ff9800' : '#f44336'
        }}>
          {uv === null ? '-' : Number(uv).toFixed(1)}
        </div>
        
        <div style={{ fontSize: '20px', margin: '20px 0', fontWeight: 'bold' }}>
          {uv === null ? '자외선을 확인하세요' : 
           Number(uv) < 3 ? '선글라스 ㄴㄴ' : 
           '🕶️ 선글라스 ㄱㄱ'}
        </div>
        
        <button 
          onClick={checkUV}
          disabled={loading}
          style={{
            background: loading ? '#ccc' : '#667eea',
            color: 'white',
            border: 'none',
            padding: '15px 40px',
            fontSize: '18px',
            borderRadius: '30px',
            cursor: loading ? 'not-allowed' : 'pointer',
            margin: '10px',
            transition: 'all 0.3s'
          }}
        >
          {loading ? '확인 중...' : '자외선 확인'}
        </button>
        
        <button 
          onClick={enableNotification}
          style={{
            background: '#fff',
            color: '#667eea',
            border: '2px solid #667eea',
            padding: '15px 40px',
            fontSize: '18px',
            borderRadius: '30px',
            cursor: 'pointer',
            margin: '10px'
          }}
        >
          알림 허용
        </button>
        
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f9f9f9',
          borderRadius: '10px',
          fontSize: '14px',
          color: '#666'
        }}>
          <strong>기준:</strong> 0-2 낮음 | 3-5 보통🕶️ | 6+ 높음🕶️
        </div>
      </div>
    </div>
  );
}
