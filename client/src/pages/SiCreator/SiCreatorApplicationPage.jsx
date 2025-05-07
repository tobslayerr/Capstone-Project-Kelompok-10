import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import Navbar from '../../components/Customer/Navbar';
import Footer from '../../components/Customer/Footer';

const SiCreatorApplicationPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    phone: '',
    experience: '',
    ktp: null,
    certificate: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, [e.target.name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.ktp) return alert('Upload KTP wajib.');

    const data = new FormData();
    data.append('userId', user.id);
    data.append('fullName', form.fullName);
    data.append('email', form.email);
    data.append('phone', form.phone);
    data.append('experience', form.experience);
    data.append('ktp', form.ktp);
    if (form.certificate) data.append('certificate', form.certificate);

    try {
      setLoading(true);
      const res = await axios.post('/api/educator/apply', data);
      alert(res.data.message);
      setSubmitted(true); // ✅ Tambahkan ini di sini
      localStorage.setItem('educatorFormSubmitted', 'true');
      window.location.reload();
    } catch (err) {
      console.error('Error saat submit:', err);
      if (err.response) {
        console.error('Response:', err.response.data);
        alert(`Gagal mengirim data: ${err.response.data.message || 'Terjadi kesalahan.'}`);
      } else {
        alert('Gagal mengirim data: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const alreadySubmitted = localStorage.getItem('educatorFormSubmitted');
    if (alreadySubmitted === 'true') {
      setSubmitted(true);
    }

    if (user) {
      setForm((prev) => ({
        ...prev,
        email: user?.primaryEmailAddress?.emailAddress || '',
      }));
    }
  }, [user]);

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Formulir Pendaftaran SiCreator</h2>

        <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 border border-yellow-400 rounded">
          ⚠️ <strong>Perhatian:</strong> Harap berhati-hati dalam mengisi formulir. Anda hanya dapat mengisi dan mengirimkan formulir ini satu kali.
        </div>

        {submitted ? (
          <div className="text-center text-green-700 bg-green-100 p-6 rounded-lg border border-green-300">
            ✅ <strong>Terima kasih!</strong> Harap menunggu 1 x 24 jam untuk disetujui oleh pihak kami.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Nama Lengkap</label>
              <input type="text" name="fullName" className="w-full px-3 py-2 border rounded" value={form.fullName} onChange={handleChange} required />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" name="email" className="w-full px-3 py-2 border rounded" value={form.email} onChange={handleChange} required readOnly />
            </div>

            <div>
              <label className="block mb-1 font-medium">No HP</label>
              <input type="text" name="phone" className="w-full px-3 py-2 border rounded" value={form.phone} onChange={handleChange} required />
            </div>

            <div>
              <label className="block mb-1 font-medium">Pengalaman Mengajar</label>
              <textarea name="experience" className="w-full px-3 py-2 border rounded" rows="4" value={form.experience} onChange={handleChange} required></textarea>
            </div>

            <div>
              <label htmlFor="ktp" className="block mb-1 font-medium">
                Upload KTP (wajib)
              </label>
              <input type="file" name="ktp" id="ktp" className="w-full" onChange={handleFile} required />
            </div>

            <div>
              <label htmlFor="certificate" className="block mb-1 font-medium">
                Upload Sertifikat (opsional)
              </label>
              <input type="file" name="certificate" id="certificate" className="w-full" onChange={handleFile} />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
              {loading ? 'Mengirim...' : 'Kirim'}
            </button>
          </form>
        )}
      </div>

      <Footer />
    </>
  );
};

export default SiCreatorApplicationPage;
