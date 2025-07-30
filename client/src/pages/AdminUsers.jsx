import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1); // Optional: if your API returns total pages
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    license: null,
    is_approved: false,
    is_active: false,
    role: "",
    image_url: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, [e.target.name]: file });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUserData({ ...userData, [name]: checked });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("password", userData.password);
      formData.append("license", userData.license);
      formData.append("is_approved", userData.is_approved ? "true" : "false");
      formData.append("is_active", userData.is_active ? "true" : "false");
      formData.append("role", userData.role);

      if (userData.image_url) {
        formData.append("image_url", userData.image_url);
      }

      try {
        const response = await fetch(
          isEditing ? `/api/users/${editingUserId}` : "/api/users",
          {
            method: isEditing ? "PATCH" : "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (response.ok) {
          alert(isEditing ? "User updated!" : "User added!");
          setShowModal(false);
          setUserData({
            name: "",
            email: "",
            phone: "",
            password: "",
            license: null,
            is_approved: false,
            is_active: false,
            role: "",
            image_url: null,
          });
          setIsEditing(false);
          setEditingUserId(null);
          setCurrentPage(1);
        } else {
          console.error("Error:", result);
          alert(result.error || "Failed to save user.");
        }
      } catch (err) {
        console.error("Submit error:", err);
        alert("Unexpected error occurred.");
      }
    };


  useEffect(() => {
    fetch(`/api/users?page=${currentPage}/per_page=10`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
        setUsers(data.data); 
        console.log(data)
        setLastPage(data.total_pages || 1); 
      })
      .catch((err) => console.error(err.message));
  }, [currentPage]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Users</h2>
        <button className="btn btn-light" onClick={() => setShowModal(true)}>
          Add User
        </button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* <div className="mb-4 d-flex gap-2">
        <button className="btn btn-outline-secondary btn-sm">Role</button>
        <button className="btn btn-outline-secondary btn-sm">Permissions</button>
      </div> */}

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-link text-primary fw-medium p-0"
                      onClick={() => {
                        setUserData({
                          name: user.name || "",
                          email: user.email || "",
                          phone: user.phone || "",
                          password: "",
                          license: null,
                          is_approved: user.is_approved,
                          is_active: user.is_active,
                          role: user.role || "",
                          image_url: null,
                        });
                        setIsEditing(true);
                        setEditingUserId(user.id);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    {' '}
                    |{' '}
                    <button
                        className="btn btn-link text-danger fw-medium p-0"
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to deactivate this user?")) {
                            try {
                              const res = await fetch(`/api/users/${user.id}`, {
                                method: "DELETE",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ is_active: false }),
                              });

                              if (res.ok) {
                                alert("User deactivated.");
                                setCurrentPage(1);
                              } else {
                                const err = await res.json();
                                alert(err.message || "Failed to deactivate.");
                              }
                            } catch (err) {
                              console.error(err);
                              alert("An error occurred.");
                            }
                          }
                        }}
                      >
                        Deactivate
                      </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
          <div className="modal show fade d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{isEditing?'Edit User Info':'Add New User'}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowModal(false)
                      setIsEditing(false)
                      setUserData({
                        name: "",
                        email: "",
                        phone: "",
                        password: "",
                        license: null,
                        is_approved: false,
                        is_active: false,
                        role: "",
                        image_url: null,
                      })
                    }}
                  ></button>
                </div>

                <form onSubmit={handleSubmit} encType='multipart/formdata'>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label>Name</label>
                      <input name="name" className="form-control" onChange={handleChange} value={userData.name} required />
                    </div>

                    <div className="mb-3">
                      <label>Email</label>
                      <input type="email" name="email" className="form-control" onChange={handleChange} value={userData.email}required />
                    </div>

                    <div className="mb-3">
                      <label>Phone</label>
                      <input type="tel" name="phone" className="form-control" onChange={handleChange} value={userData.phone}/>
                    </div>

                    <div className="mb-3">
                      <label>Password</label>
                      <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                      <label>Image Upload</label>
                      <input type="file" name="image_url" className="form-control" onChange={handleFileChange} />
                    </div>

                    <div className="mb-3">
                      <label>License</label>
                      <input type="file" name="license" className="form-control" onChange={handleFileChange} />
                    </div>

                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" name="is_approved" onChange={handleCheckboxChange} value={userData.is_approved} />
                      <label className="form-check-label">Approved</label>
                    </div>

                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" name="is_active" onChange={handleCheckboxChange} value={userData.is_active}/>
                      <label className="form-check-label">Active</label>
                    </div>

                    <div className="mb-3">
                      <label>Role</label>
                      <select name="role" className="form-control" onChange={handleChange} value={userData.role} required>
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Driver">Driver</option>
                      </select>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn-cancel" onClick={() => {
                      setShowModal(false)
                      setIsEditing(false)
                      setUserData({
                        name: "",
                        email: "",
                        phone: "",
                        password: "",
                        license: null,
                        is_approved: false,
                        is_active: false,
                        role: "",
                        image_url: null,
                      })
                      }}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save User</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}



      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {lastPage}
        </span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
