import { http, HttpResponse } from "msw";
export const handlers = [
  http.get("*/api/", () => HttpResponse.json({message: "Demo"})),
  http.get("*/api/dj-rest-auth/user/", () => HttpResponse.json({
    pk: 2, username: "test_pilot", email: "", first_name: "", last_name: "",
    profile_id: 2, profile_image: "/demo-avatar.png"
  })),
  http.post("*/api/dj-rest-auth/logout/", () => HttpResponse.json({})),
];
