import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { sendMessage } from '../api/artistApi.js';

const initialForm = {
  name: '',
  email: '',
  message: ''
};

export function ContactSection({ artist }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: 'loading', text: 'Sending message through the cosmic API...' });

    try {
      await sendMessage(form);
      setStatus({ type: 'success', text: 'Message sent. The universe received your signal.' });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: 'error',
        text: 'Server chưa chạy hoặc form chưa hợp lệ. Hãy kiểm tra backend Express và thử lại.'
      });
    }
  }

  return (
    <section className="section contact-section" id="connect">
      <div className="contact-card">
        <div>
          <div className="section-kicker">transmit signal</div>
          <h2>Connect with {artist.name}</h2>
          <p>
            Booking, press, playlist pitching, fan messages, hoặc chỉ đơn giản là gửi một tín hiệu từ hành tinh của bạn.
          </p>
          <a className="mini-link" href={`mailto:hello@example.com?subject=Deanjames%20Tran%20Inquiry`}>
            <Mail size={16} />
            hello@example.com
          </a>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} minLength="2" required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" value={form.message} onChange={handleChange} minLength="10" required />
          </label>
          <button type="submit" disabled={status.type === 'loading'}>
            <Send size={17} />
            Send Signal
          </button>
          {status.text && <p className={`form-status ${status.type}`}>{status.text}</p>}
        </form>
      </div>
    </section>
  );
}
