import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '29319280-fde4903173ec234f4d94cddfd';
const PER_PAGE = 12;

export const fetchImages = async (searchQuery, page) => {
  try {
    const URL = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};
