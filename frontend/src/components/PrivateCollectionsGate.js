import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { useAuthReady, useCurrentUser } from "../contexts/CurrentUserContext";

// This gate is UX only. Owner-scoped API querysets enforce the actual boundary.
export default function PrivateCollectionsGate({ children }) {
  const ready = useAuthReady();
  const user = useCurrentUser();
  const [expired, setExpired] = useState(false);
  useEffect(() => { setExpired(false); }, [user]);
  useEffect(() => {
    const id = axiosReq.interceptors.response.use(
      response => response,
      error => {
        const url = error.config?.url || "";
        if (error.response?.status === 401 && /^\/?(tasks|wishes)(\/|$)/.test(url)) {
          setExpired(true);
        }
        return Promise.reject(error);
      }
    );
    return () => axiosReq.interceptors.response.eject(id);
  }, []);
  if (!ready) return <p role="status">Checking sign-in...</p>;
  if (!user || expired) return (
    <section aria-labelledby="private-collections-title" className="p-3">
      <h1 id="private-collections-title">Sign in to view your tasks and wishes</h1>
      <p>These items are private to your account. Public demo posts are still available without signing in.</p>
      <p><Link className="btn btn-outline-dark" style={{minHeight:44, padding:"10px 16px"}} to="/signin">Sign in</Link></p>
      <p><Link className="btn btn-outline-dark" style={{minHeight:44, padding:"10px 16px"}} to="/">Back to public demo</Link></p>
    </section>
  );
  return children;
}
