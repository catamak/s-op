import React from 'react';
import Modal from 'react-modal';
import './LoginModal.css'; // Modal stil dosyanız varsa

// Modal'ın uygulama elemanına bağlı olduğunu belirtir
Modal.setAppElement('#root');

const LoginModal = ({ onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Formun sayfayı yenilemesini engeller
    // Burada giriş işlemlerini yapabilirsiniz
    console.log('Giriş yapıldı!');
    onClose(); // Giriş işlemi sonrası modalı kapat
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      contentLabel="Giriş Yap"
    >
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Kullanıcı Adı</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Şifre</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
      <button className="modal-close" onClick={onClose}>Kapat</button>
    </Modal>
  );
};

export default LoginModal;
