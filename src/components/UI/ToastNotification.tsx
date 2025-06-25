import { useEffect } from 'react';

const typeStyles: any = {
  payment: { background: '#38a169', icon: '✔️' },
  delivery: { background: '#3182ce', icon: '📦' },
  dispute: { background: '#e53e3e', icon: '⚠️' },
  review: { background: '#d69e2e', icon: '⭐' },
  info: { background: '#222', icon: 'ℹ️' },
};

export function ToastNotification({ notification, onClose }: { notification: any, onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!notification) return null;
  const style = typeStyles[notification.type] || typeStyles.info;

  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 9999,
      background: style.background, color: '#fff', padding: 16, borderRadius: 8,
      boxShadow: '0 2px 8px #0008', minWidth: 260, display: 'flex', alignItems: 'center',
      animation: 'toast-in 0.4s cubic-bezier(.36,1.01,.32,1)'
    }}>
      <span style={{ fontSize: 24, marginRight: 12 }}>{style.icon}</span>
      <div style={{ flex: 1 }}>
        <strong>{notification.title}</strong>
        <div>{notification.message}</div>
        {notification.actionUrl && (
          <a href={notification.actionUrl} style={{ color: '#fff', textDecoration: 'underline' }}>Ver detalhes</a>
        )}
      </div>
      <button onClick={onClose} style={{ marginLeft: 16, background: 'none', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 20 }}>×</button>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(-30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
} 