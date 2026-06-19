import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, ListGroup, Badge, Spinner, Alert, Image, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export const Profile = () => {
  const { username: paramUsername } = useParams();
  const username = paramUsername || localStorage.getItem("Username") || "Guest";
  const email = localStorage.getItem("Email");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    moodHistory: [],
    favorites: [],
    history: [],
  });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/dash/profile/${encodeURIComponent(username)}`
      );
      setData({
        moodHistory: Array.isArray(res.data.moodHistory) ? res.data.moodHistory : [],
        favorites: Array.isArray(res.data.favorites) ? res.data.favorites : [],
        history: Array.isArray(res.data.history) ? res.data.history : [],
      });
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError("Failed to load profile data.");
      setData({ moodHistory: [], favorites: [], history: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!username) return;
    fetchProfile();
  }, [username]);

  const clearHistory = async () => {
    setActionLoading(true);
    try {
      await axios.post(`http://localhost:3001/dash/clearHistory/${encodeURIComponent(username)}`);
      setData(prev => ({ ...prev, history: [] }));
    } catch (err) {
      console.error("Clear history error:", err);
      setError("Failed to clear history.");
    } finally {
      setActionLoading(false);
    }
  };

  const clearFavorites = async () => {
    setActionLoading(true);
    try {
      await axios.post(`http://localhost:3001/dash/clearFavorites/${encodeURIComponent(username)}`);
      setData(prev => ({ ...prev, favorites: [] }));
    } catch (err) {
      console.error("Clear favorites error:", err);
      setError("Failed to clear favorites.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-light">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "white", padding: "2rem 1rem" }}>
      <Container>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row className="gy-4">
          {/* Left: Profile Card */}
          <Col xs={12} md={4}>
            <Card bg="dark" text="light" className="shadow text-center h-100">
              <Card.Body>
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: "#ffc107",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    fontWeight: "bold",
                    margin: "0 auto 15px",
                  }}
                >
                  {username?.charAt(0).toUpperCase()}
                </div>
                <Card.Title>{username}</Card.Title>
                <Card.Text>{email || "No email provided"}</Card.Text>
                <Card.Text>Joined: January 2024</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Right: Mood History, Favorites, and History */}
          <Col xs={12} md={8}>
            {/* Mood History */}
            <Card bg="dark" text="light" className="shadow mb-3">
              <Card.Header>Mood History</Card.Header>
              <Card.Body className="d-flex flex-wrap gap-2">
                {data.moodHistory?.length > 0 ? (
                  data.moodHistory.map((mood, idx) => (
                    <Badge key={idx} bg="warning" text="dark">
                      {mood}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted">No mood history yet.</p>
                )}
              </Card.Body>
            </Card>

            {/* Favorites */}
            <Card bg="dark" text="light" className="shadow mb-3">
              <Card.Header className="d-flex justify-content-between align-items-center">
                Favorites
                {data.favorites?.length > 0 && (
                  <Button size="sm" variant="danger" onClick={clearFavorites} disabled={actionLoading}>
                    Clear All
                  </Button>
                )}
              </Card.Header>
              <Card.Body>
                {data.favorites?.length > 0 ? (
                  <ListGroup variant="flush">
                    {data.favorites.map((fav, idx) => (
                      <ListGroup.Item key={idx} className="bg-dark text-light border-bottom d-flex align-items-center gap-2">
                        {fav.thumbnail && <Image src={fav.thumbnail} width={60} height={40} rounded />}
                        <span>{fav.title || "Untitled"}</span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="text-muted">No favorites yet.</p>
                )}
              </Card.Body>
            </Card>

            {/* Recent History */}
            <Card bg="dark" text="light" className="shadow">
              <Card.Header className="d-flex justify-content-between align-items-center">
                Recent History (Last 10)
                {data.history?.length > 0 && (
                  <Button size="sm" variant="danger" onClick={clearHistory} disabled={actionLoading}>
                    Clear All
                  </Button>
                )}
              </Card.Header>
              <Card.Body>
                {data.history?.length > 0 ? (
                  <ListGroup variant="flush">
                    {data.history.slice(-10).reverse().map((item, idx) => (
                      <ListGroup.Item key={idx} className="bg-dark text-light border-bottom d-flex align-items-center gap-2">
                        {item.thumbnail && <Image src={item.thumbnail} width={60} height={40} rounded />}
                        <span>{item.title || "Untitled"}</span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="text-muted">No recent activity.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
