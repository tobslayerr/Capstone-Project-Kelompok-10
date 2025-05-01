import React, { useContext, useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill'; // hanya perlu import Quill besar
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCourse = () => {
  const { backendUrl, getToken } = useContext(AppContext);

  const quillRef = useRef(null); // Reference ke instance Quill
  const editorRef = useRef(null); // Reference ke div editor

  // State untuk input form
  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Hindari reload page

    try {
      if (!image) {
        toast.error('Thumbnail Not Selected');
        return;
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML, // perbaiki innerHTML
        coursePrice: Number(coursePrice),
        discount: Number(discount),
      };

      // Siapkan FormData untuk mengirim file + data
      const formData = new FormData();
      formData.append('courseData', JSON.stringify(courseData));
      formData.append('image', image);

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + '/api/educator/add-course',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset form setelah berhasil
        setCourseTitle('');
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Inisialisasi Quill editor sekali saja saat mount
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      {/* Form input untuk course */}
      <form
        onSubmit={handleSubmit} // Tambahkan ini supaya submit ke handleSubmit
        className="flex flex-col gap-4 max-w-md w-full text-gray-500"
      >
        {/* Course Title */}
        <div className="flex flex-col gap-1">
          <p>Event Title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Course Description */}
        <div className="flex flex-col gap-1">
          <p>Event Description</p>
          <div ref={editorRef}></div> {/* Quill editor di sini */}
        </div>

        {/* Course Price & Thumbnail Upload */}
        <div className="flex items-center justify-between flex-wrap">
          {/* Course Price */}
          <div className="flex flex-col gap-1">
            <p>Event Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
            />
          </div>

          {/* Course Thumbnail Upload */}
          <div className="flex md:flex-row flex-col items-center gap-3">
            <p>Event Thumbnail</p>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3">
              <img src={assets.file_upload_icon} alt="" className="p-3 bg-blue-500 rounded" />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              {image && (
                <img
                  className="max-h-10"
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                />
              )}
            </label>
          </div>
        </div>

        {/* Discount */}
        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            type="number"
            placeholder="0"
            min={0}
            max={100}
            className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white w-max py-2.5 px-8 rounded my-4"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
