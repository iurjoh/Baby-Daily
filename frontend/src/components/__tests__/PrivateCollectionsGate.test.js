import React from 'react';
import { render, screen, cleanup, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AuthReadyContext, CurrentUserContext } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import PrivateCollectionsGate from '../PrivateCollectionsGate';

afterEach(cleanup);
function show(ready, user, path='/tasks') {
  const Child = vi.fn(() => <p>Private child fixture</p>);
  render(<MemoryRouter initialEntries={[path]}><AuthReadyContext.Provider value={ready}><CurrentUserContext.Provider value={user}><PrivateCollectionsGate><Child /></PrivateCollectionsGate></CurrentUserContext.Provider></AuthReadyContext.Provider></MemoryRouter>);
  return Child;
}
it('waits for auth readiness without mounting private child', () => {
  const child = show(false, null);
  expect(screen.getByRole('status')).toHaveTextContent('Checking sign-in');
  expect(child).not.toHaveBeenCalled();
});
it.each(['/tasks','/tasks/create','/tasks/1','/tasks/1/edit','/wishes','/wishes/create','/wishes/1','/wishes/1/edit'])('anonymous %s shows sign-in and public demo links', path => {
  const child = show(true, null, path);
  expect(screen.getByRole('heading')).toHaveTextContent('Sign in to view your tasks and wishes');
  expect(screen.getByRole('link', {name:'Sign in'})).toHaveAttribute('href','/signin');
  expect(screen.getByRole('link', {name:'Back to public demo'})).toHaveAttribute('href','/');
  expect(child).not.toHaveBeenCalled();
});
it('authenticated users can mount private child', () => {
  show(true, {username:'fixture'});
  expect(screen.getByText('Private child fixture')).toBeInTheDocument();
});
it('session expiry for private request unmounts child and shows sign-in', async () => {
  let reject;
  const spy = vi.spyOn(axiosReq.interceptors.response, 'use').mockImplementation((ok, error) => { reject=error; return 321; });
  const eject=vi.spyOn(axiosReq.interceptors.response,'eject');
  show(true, {username:'fixture'});
  await act(async () => { await reject({config:{url:'/tasks/'},response:{status:401}}).catch(()=>{}); });
  expect(screen.queryByText('Private child fixture')).not.toBeInTheDocument();
  expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
  cleanup();
  expect(eject).toHaveBeenCalledWith(321);
  spy.mockRestore(); eject.mockRestore();
});
