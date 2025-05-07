import React, { useEffect, useState } from 'react';
import { useUser, RedirectToSignIn, useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SuperAdminPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { user, isLoaded } = useUser();
  const { signOut, clerkClient } = useClerk(); // Import clerkClient untuk akses API Clerk

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get('/api/educator/pending');
        if (data.success) {
          setApplications(data.applications);
        } else {
          toast.error(data.message || 'Gagal mengambil data aplikasi');
        }
      } catch (error) {
        toast.error(error.message || 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    if (isLoaded && user && user.publicMetadata.role !== 'superadmin') {
      signOut();
    }
  }, [isLoaded, user, signOut]);

  const confirmApprove = (appId) => {
    setSelectedAppId(appId);
    setShowModal(true);
  };

  const approveApplication = async () => {
    try {
      const { data } = await axios.put(`/api/educator/approve/${selectedAppId}`);
      if (data.success) {
        toast.success('Aplikasi berhasil disetujui dan role diubah menjadi educator!');
        setApplications((prev) => prev.filter((app) => app._id !== selectedAppId));
      } else {
        toast.error(data.message || 'Gagal menyetujui aplikasi.');
      }
    } catch (error) {
      toast.error(error.message || 'Terjadi kesalahan saat menyetujui.');
    } finally {
      setShowModal(false);
      setSelectedAppId(null);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <RedirectToSignIn />;
  if (loading) return <div>Loading aplikasi...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg relative">
      <h2 className="text-2xl font-semibold mb-6 text-center">Aplikasi Educator yang Pending</h2>

      {applications.length === 0 ? (
        <p className="text-center">Tidak ada aplikasi yang pending.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Telepon</th>
              <th className="px-4 py-2 border">Pengalaman Mengajar</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="px-4 py-2 border">{app.fullName}</td>
                <td className="px-4 py-2 border">{app.email}</td>
                <td className="px-4 py-2 border">{app.phone}</td>
                <td className="px-4 py-2 border">{app.experience}</td>
                <td className="px-4 py-2 border">
                  <button onClick={() => confirmApprove(app._id)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL KONFIRMASI */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Persetujuan</h3>
            <p>Apakah Anda yakin ingin menyetujui aplikasi ini sebagai SiCreator?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Batal
              </button>
              <button onClick={approveApplication} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Ya, Setujui
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminPage;
