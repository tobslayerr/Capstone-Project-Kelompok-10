import React, { useContext, useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCourse = () => {
  const { backendUrl, getToken } = useContext(AppContext);

  const [isFree, setIsFree] = useState(false);

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  // State untuk input form
  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);

  // Preorder - coming soon
  const [isPreorder, setIsPreorder] = useState(false);
  const [preorderStart, setPreorderStart] = useState('');
  const [preorderEnd, setPreorderEnd] = useState('');
  const [preorderPhases, setPreorderPhases] = useState([]);

  // Event Type - coming soon
  const [eventType, setEventType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        toast.error('Thumbnail Not Selected');
        return;
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        // eventType & preorder belum dikirim ke backend
      };

      const formData = new FormData();
      formData.append('courseData', JSON.stringify(courseData));
      formData.append('image', image);

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + '/api/educator/add-course',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setCourseTitle('');
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        quillRef.current.root.innerHTML = '';
        setIsFree(false);
        setIsPreorder(false);
        setPreorderStart('');
        setPreorderEnd('');
        setPreorderPhases([]);
        setEventType('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full text-gray-500"
      >
        {/* Event Title */}
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

        {/* Event Description */}
        <div className="flex flex-col gap-1">
          <p>Event Description</p>
          <div ref={editorRef}></div>
        </div>

        {/* Event Price & Thumbnail Upload */}
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col gap-1">
            <p>Event Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              disabled={isFree}
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            {/* Thumbnail */}
            <div className="flex flex-col gap-1">
              <p>Event Thumbnail</p>
              <label htmlFor="thumbnailImage" className="flex items-center gap-3">
                <img
                  src={assets.file_upload_icon}
                  alt=""
                  className="p-3 bg-blue-500 rounded"
                />
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

            {/* Free Event */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="freeEvent"
                checked={isFree}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setIsFree(checked);
                  if (checked) {
                    setCoursePrice(0);
                    setDiscount(0);
                  }
                }}
              />
              <label htmlFor="freeEvent">Free Event</label>
            </div>
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
            disabled={isFree}
            required
          />
        </div>

        {/* Event Type (Coming Soon) */}
        <div className="flex flex-col gap-1 text-gray-400 mt-4 ">
          <label htmlFor="eventTypeSelect">Event Type (Coming Soon)</label>
          <select
            id="eventTypeSelect"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            disabled
            className="border rounded px-3 py-2"
          >
            <option value="">Choose</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
          <p className="text-xs italic mt-1">This feature is under development</p>
        </div>

        {/* Preorder Section (Coming Soon) */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="preorderEvent"
              checked={isPreorder}
              onChange={(e) => setIsPreorder(e.target.checked)}
            />
            <label htmlFor="preorderEvent">Enable Preorder (Coming Soon)</label>
          </div>

          {isPreorder && (
            <div className="flex flex-col gap-2 pl-4 text-sm text-gray-400">
              <p className="italic">Fitur ini sedang dalam tahap pengembangan</p>

              <div className="flex flex-col gap-1">
                <label>Preorder Start</label>
                <input
                  type="date"
                  value={preorderStart}
                  onChange={(e) => setPreorderStart(e.target.value)}
                  className="border rounded px-3 py-2"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Preorder End</label>
                <input
                  type="date"
                  value={preorderEnd}
                  onChange={(e) => setPreorderEnd(e.target.value)}
                  className="border rounded px-3 py-2"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Preorder Phases</label>
                <p className="italic text-xs">Multiple phase input will be added here later.</p>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white w-max py-2.5 px-8 rounded my-4"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
