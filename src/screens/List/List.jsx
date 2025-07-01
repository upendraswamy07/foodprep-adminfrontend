import { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error.message);
    }
  };

  const removeFood = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove?id=${id}`);
      toast.success(response.data.message);
      fetchList(); // Refresh after deletion
    } catch (error) {
      toast.error("Failed to delete item");
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchList(); // On first render
  }, []);

  return (
    <div className='list screen flex-col'>
      <div className="list-header">
        <p>All Foods List</p>
        <button className="refresh-btn" onClick={fetchList}>🔄 Refresh</button>
      </div>

      <div className="list-table">
        <div className="list-table-format title">
          <p><b>Image</b></p>
          <p><b>Name</b></p>
          <p><b>Category</b></p>
          <p><b>Price</b></p>
          <p><b>Action</b></p>
        </div>

        {list.length === 0 ? (
          <p style={{ padding: '1rem' }}>No items found.</p>
        ) : (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/uploads/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p className='cursor' onClick={() => removeFood(item._id)}>❌</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
