import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Post from "../../pages/posts/Post";
import Profile from "../../pages/profiles/Profile";
import SignInForm from "../../pages/auth/SignInForm";
import SignUpForm from "../../pages/auth/SignUpForm";
import CommentEditForm from "../../pages/comments/CommentEditForm";
import PostEditForm from "../../pages/posts/PostEditForm";
import PostCreateForm from "../../pages/posts/PostCreateForm";
import { MoreDropdown, ProfileEditDropdown } from "../MoreDropdown";
vi.mock("../../contexts/CurrentUserContext", () => ({useCurrentUser: () => ({username:"viewer"}), useSetCurrentUser: () => vi.fn()}));
vi.mock("../../contexts/ProfileDataContext", () => ({useSetProfileData: () => ({handleFollow:vi.fn(),handleUnfollow:vi.fn()})}));
vi.mock("../../hooks/useRedirect", () => ({useRedirect:vi.fn()}));
const wrap = (el) => render(<BrowserRouter>{el}</BrowserRouter>);
test("post controls have named button/link semantics", () => {
 wrap(<Post id={1} owner="alex_demo" title="A rainbow afternoon" comments_count={3} likes_count={0} setPosts={vi.fn()} />);
 expect(screen.getByRole("button",{name:"0 likes: Like A rainbow afternoon"})).toHaveAttribute("aria-pressed","false");
 expect(screen.getByRole("link",{name:"3 comments on A rainbow afternoon"})).toHaveAttribute("href","/posts/1");
});
test("profile avatar identifies its owner", () => {
 wrap(<Profile profile={{id:1,owner:"alex_demo"}} mobile />);
 expect(screen.getByRole("link",{name:"Profile of alex_demo"})).toHaveAttribute("href","/profiles/1");
});
test("dropdown triggers are named buttons", () => {
 wrap(<ProfileEditDropdown id={1}/>);
 const button=screen.getByRole("button",{name:"Profile options"});
 fireEvent.click(button);
 expect(screen.getByRole("button",{name:"edit-profile"})).toBeInTheDocument();
});
test("sign in text fields have names", () => {
 wrap(<SignInForm/>);
 expect(screen.getByLabelText("Username")).toBeInTheDocument();
 expect(screen.getByLabelText("Password")).toBeInTheDocument();
});
test("sign up text fields have names", () => {
 wrap(<SignUpForm/>);
 expect(screen.getByLabelText("username")).toBeInTheDocument();
 expect(screen.getByLabelText("Password")).toBeInTheDocument();
 expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
});
test("both post form layouts associate labels and unique input ids", () => {
 wrap(<PostCreateForm/>);
 expect(screen.getAllByLabelText("Title")).toHaveLength(2);
 expect(screen.getAllByLabelText("Content")).toHaveLength(2);
 expect(new Set(screen.getAllByLabelText("Title").map(e=>e.id)).size).toBe(2);
});

test("both edit form layouts have unique labelled inputs and image alternative", () => {
 wrap(<PostEditForm/>);
 expect(screen.getAllByLabelText("Title")).toHaveLength(2);
 expect(screen.getAllByLabelText("Content")).toHaveLength(2);
 expect(new Set(screen.getAllByLabelText("Title").map(e=>e.id)).size).toBe(2);
 expect(screen.getByAltText("Post image preview")).toBeInTheDocument();
});

test("comment edit textbox has an accessible name", () => {
 wrap(<CommentEditForm id={1} content="Fictional comment" setShowEditForm={vi.fn()} setComments={vi.fn()}/>);
 expect(screen.getByRole("textbox",{name:"Edit comment"})).toBeInTheDocument();
});
