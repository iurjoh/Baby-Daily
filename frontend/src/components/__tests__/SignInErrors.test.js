import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { vi } from "vitest";
import SignInForm from "../../pages/auth/SignInForm";
vi.mock("../../contexts/CurrentUserContext", () => ({useSetCurrentUser: () => vi.fn()}));
vi.mock("../../hooks/useRedirect", () => ({useRedirect:vi.fn()}));
test("fresh CSRF bootstrap precedes login and 403 detail is visible", async () => {
 const order=[];
 const get=vi.spyOn(axios,"get").mockImplementation(async()=>{order.push("bootstrap");return {data:{}}});
 const post=vi.spyOn(axios,"post").mockImplementation(async()=>{order.push("login");throw {response:{status:403,data:{detail:"CSRF Failed: CSRF cookie not set."}}}});
 render(<BrowserRouter><SignInForm/></BrowserRouter>);
 fireEvent.click(screen.getByRole("button",{name:"Sign in"}));
 expect(await screen.findByRole("alert")).toHaveTextContent("CSRF Failed");
 expect(order).toEqual(["bootstrap","login"]);
 get.mockRestore();post.mockRestore();
});
test("network failure renders a safe message instead of a blank form", async () => {
 const get=vi.spyOn(axios,"get").mockRejectedValue(new Error("network"));
 const post=vi.spyOn(axios,"post");
 render(<BrowserRouter><SignInForm/></BrowserRouter>);
 fireEvent.click(screen.getByRole("button",{name:"Sign in"}));
 expect(await screen.findByRole("alert")).toHaveTextContent("Sign in failed. Please try again.");
 expect(post).not.toHaveBeenCalled();
 get.mockRestore();post.mockRestore();
});
