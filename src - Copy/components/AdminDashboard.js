import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert, Spinner } from "react-bootstrap";
import api from "../api/axiosConfig";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);


  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users/");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await api.post(`/api/users/${id}/approve/`);
      setMessage(res.data.message);
      fetchUsers();
    } catch (error) {
      setMessage("Error approving user");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await api.post(`/api/users/${id}/reject/`);
      setMessage(res.data.message);
      fetchUsers();
    } catch (error) {
      setMessage("Error rejecting user");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> <p>Loading users...</p>
      </div>
    );

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 text-primary">Admin Dashboard</h2>

      {message && <Alert variant="info">{message}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span
                  className={`badge ${
                    user.approval_status === "Approved"
                      ? "bg-success"
                      : user.approval_status === "Rejected"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {user.approval_status}
                </span>
              </td>
              <td>
                {user.approval_status === "Pending" && (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleApprove(user.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleReject(user.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDashboard;
